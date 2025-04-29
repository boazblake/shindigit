import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LandingPage from '@routes/LandingPage'
import HomePage from '@routes/HomePage'
import ProfilePage from '@routes/ProfilePage'
import EventPage from '@routes/EventPage'
import CreateEventPage from '@routes/CreateEventPage'
import LayoutContainer from '@components/LayoutContainer'
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "@contexts/UserContext"; // Adjust path based on your setup
import {EventProvider} from "@contexts/EventContext"; // Adjust path based on your setup
import {useCacheBuster} from '@hooks/bustCache'

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useUserContext(); // Fetch user from context
  return user ? <LayoutContainer><EventProvider><Outlet/></EventProvider></LayoutContainer> : <Navigate to="/" replace />;
};

const AppRouter = () => {
  useCacheBuster()
  return (
    <Router>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route element={<PrivateRoute/>}>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/event/:id" element={<EventPage/>}/>
          <Route path="/create" element={<CreateEventPage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
      </Route>
    </Routes>
    </Router>
  )
}

export default AppRouter
