import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LandingPage from '@routes/LandingPage'
import HomePage from '@routes/HomePage'
import EventPage from '@routes/EventPage'
import CreateEventPage from '@routes/CreateEventPage'
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "@contexts/UserContext"; // Adjust path based on your setup

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useUserContext(); // Fetch user from context
  console.log('WTF',user)

  return user ? <Outlet/> : <Navigate to="/" replace />;
};

const AppRouter = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route element={<PrivateRoute/>}>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/event/:id" element={<EventPage/>}/>
        <Route path="/create" element={<CreateEventPage/>}/>
      </Route>
    </Routes>
    </Router>
  )
}

export default AppRouter
