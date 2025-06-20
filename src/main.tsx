import { createRoot } from 'react-dom/client';
import { IonApp, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import AppRouter from './router';
import { GunProvider } from '@contexts/GunContext';
import { UserProvider } from '@contexts/UserContext';

/* Core Ionic CSS */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional Ionic CSS for additional features */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
/* Your app's CSS */
// import './index.css';

setupIonicReact();

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <IonApp>
    <GunProvider>
      <UserProvider>
        <IonReactRouter>
          <AppRouter />
        </IonReactRouter>
      </UserProvider>
    </GunProvider>
  </IonApp>
);
