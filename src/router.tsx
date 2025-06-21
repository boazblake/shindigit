import { Route, Switch, Redirect, useParams } from 'react-router-dom';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { homeOutline, calendarOutline, personOutline } from 'ionicons/icons';
import { useUserContext } from './contexts/UserContext';
import { EventProvider } from './contexts/EventContext';
import HomePage from './pages/HomePage';
import CreateEventPage from './pages/CreateEventPage';
import ProfilePage from './pages/ProfilePage';
import EventPage from './pages/EventPage';
import LandingPage from './pages/LandingPage';

const EventPageWrapper = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <EventProvider eventId={id}>
      <EventPage />
    </EventProvider>
  );
};

const AppRouter = () => {
  const { user } = useUserContext();
  return (
    <Switch>
      <Route exact path="/">
        {user ? <Redirect to="/tabs/home" /> : <LandingPage />}
      </Route>
      <Route path="/tabs">
        {!user ? (
          <Redirect to="/" />
        ) : (
          <IonTabs>
            <IonRouterOutlet>
              <Switch>
                <Route path="/tabs/home" component={HomePage} />
                <Route path="/tabs/createEvent" component={CreateEventPage} />
                <Route path="/tabs/profile" component={ProfilePage} />
                <Route path="/tabs/event/:id" component={EventPageWrapper} />
                <Route render={() => <Redirect to="/tabs/home" />} />
              </Switch>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/tabs/home">
                <IonIcon icon={homeOutline} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>
              <IonTabButton tab="createEvent" href="/tabs/createEvent">
                <IonIcon icon={calendarOutline} />
                <IonLabel>Create Event</IonLabel>
              </IonTabButton>
              <IonTabButton tab="profile" href="/tabs/profile">
                <IonIcon icon={personOutline} />
                <IonLabel>Profile</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        )}
      </Route>
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default AppRouter;
