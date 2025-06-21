import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonText,
} from '@ionic/react';
import { useIonRouter } from '@ionic/react';
import { useUserContext } from '@contexts/UserContext';

const ProfilePage: React.FC = () => {
  const { user, logout } = useUserContext();
  const router = useIonRouter();

  const handleLogout = () => {
    logout();
    router.push('/', 'root');
  };

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Profile</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonText color="dark">
          <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: 16 }}>
            User Information
          </h2>
        </IonText>
        <div style={{ marginBottom: 16 }}>
          <p>
            <strong>Alias:</strong> {user?.alias}
          </p>
          <p>
            <strong>Public Key:</strong> {user?.pub}
          </p>
        </div>
        <IonButton
          color="danger"
          expand="block"
          onClick={handleLogout}
        >
          Logout
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default ProfilePage;
