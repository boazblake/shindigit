import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import { homeOutline, personOutline } from 'ionicons/icons';

import HomePage from '@routes/HomePage';
import ProfilePage from '@routes/ProfilePage';
import EventPage from '@routes/EventPage';
import CreateEventPage from '@routes/CreateEventPage';
import LayoutContainer from '@components/LayoutContainer';
import { useUserContext } from '@contexts/UserContext';
import { EventProvider } from '@contexts/EventContext';

const Tabs = () => (
  <IonTabs>
    <IonRouterOutlet>
      <EventPrivateRoute exact path="/tabs/home" component={HomePage} />
      <PrivateRoute exact path="/tabs/profile" component={ProfilePage} />
      <EventPrivateRoute exact path="/tabs/event/:id" component={EventPage} />
      <EventPrivateRoute exact path="/tabs/event/:id/edit" component={CreateEventPage} />
      <EventPrivateRoute exact path="/tabs/createEvent" component={CreateEventPage} />
      <Redirect exact from="/tabs" to="/tabs/home" />
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="home" href="/tabs/home">
        <IonIcon icon={homeOutline} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>
      <IonTabButton tab="profile" href="/tabs/profile">
        <IonIcon icon={personOutline} />
        <IonLabel>Profile</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default Tabs;
