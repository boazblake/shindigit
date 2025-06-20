import { IonReactRouter } from '@ionic/react-router';
import { IonRouterOutlet } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import LandingPage from '@routes/LandingPage';
import Tabs from './components/tabs';

const AppRouter = () => {
  // useCacheBuster();

  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/" component={LandingPage} />
        <Route path="/tabs" component={Tabs} />
        <Route render={() => <Redirect to="/" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default AppRouter;
