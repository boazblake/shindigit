import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const LayoutContainer = ({ children, title }) => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      {children}
    </IonContent>
  </IonPage>
);
export default LayoutContainer;
