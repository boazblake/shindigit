import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import {
  IonContent,
  IonPage,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonSegment,
  IonSegmentButton,
  IonToast,
} from '@ionic/react';
import {
  calendar,
  people,
  gift,
  logIn,
  personAdd,
  lockClosed,
  person,
} from 'ionicons/icons';

const LandingPage = () => {
  const { login, signup } = useUserContext();
  const history = useHistory();

  const [isLogin, setIsLogin] = useState(true);
  const [alias, setAlias] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      isLogin ? await login(alias, password) : await signup(alias, password);
      history.push('/home');
    } catch (err) {
      console.error('Auth Error', err);
      const message = err instanceof Error ? err.message : 'An error occurred';
      setErrorMessage(message);
      setShowError(true);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        {/* Hero Section */}
        <div style={{ textAlign: 'center', paddingTop: '40px', paddingBottom: '40px' }}>
          <IonText>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '16px' }}>
              Plan Events,
              <br />
              <span style={{ 
                background: 'linear-gradient(45deg, var(--ion-color-primary), var(--ion-color-secondary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Share Moments
              </span>
            </h1>
          </IonText>
          <IonText color="medium">
            <p style={{ fontSize: '1.1rem', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
              Create and manage events with ease. Invite friends, track RSVPs,
              and coordinate items to bring.
            </p>
          </IonText>
        </div>

        {/* Features Grid */}
        <IonGrid style={{ marginBottom: '32px' }}>
          <IonRow>
            <IonCol size="12" sizeMd="4">
              <IonCard>
                <IonCardContent style={{ textAlign: 'center', padding: '24px' }}>
                  <div style={{ 
                    display: 'inline-flex', 
                    padding: '12px', 
                    backgroundColor: 'var(--ion-color-primary-tint)', 
                    borderRadius: '12px',
                    marginBottom: '16px'
                  }}>
                    <IonIcon icon={calendar} size="large" color="primary" />
                  </div>
                  <IonText>
                    <h3 style={{ margin: '0 0 8px 0' }}>Easy Planning</h3>
                  </IonText>
                  <IonText color="medium">
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>
                      Create and manage events in minutes
                    </p>
                  </IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="12" sizeMd="4">
              <IonCard>
                <IonCardContent style={{ textAlign: 'center', padding: '24px' }}>
                  <div style={{ 
                    display: 'inline-flex', 
                    padding: '12px', 
                    backgroundColor: 'var(--ion-color-success-tint)', 
                    borderRadius: '12px',
                    marginBottom: '16px'
                  }}>
                    <IonIcon icon={people} size="large" color="success" />
                  </div>
                  <IonText>
                    <h3 style={{ margin: '0 0 8px 0' }}>Track RSVPs</h3>
                  </IonText>
                  <IonText color="medium">
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>
                      Know who's coming to your event
                    </p>
                  </IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="12" sizeMd="4">
              <IonCard>
                <IonCardContent style={{ textAlign: 'center', padding: '24px' }}>
                  <div style={{ 
                    display: 'inline-flex', 
                    padding: '12px', 
                    backgroundColor: 'var(--ion-color-tertiary-tint)', 
                    borderRadius: '12px',
                    marginBottom: '16px'
                  }}>
                    <IonIcon icon={gift} size="large" color="tertiary" />
                  </div>
                  <IonText>
                    <h3 style={{ margin: '0 0 8px 0' }}>Item Sharing</h3>
                  </IonText>
                  <IonText color="medium">
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>
                      Coordinate what to bring
                    </p>
                  </IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Auth Form */}
        <IonCard style={{ maxWidth: '500px', margin: '0 auto' }}>
          <IonCardHeader>
            <IonSegment 
              value={isLogin ? 'login' : 'signup'} 
              onIonChange={(e) => setIsLogin(e.detail.value === 'login')}
            >
              <IonSegmentButton value="login">
                <IonIcon icon={logIn} />
                <IonLabel>Login</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="signup">
                <IonIcon icon={personAdd} />
                <IonLabel>Register</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonCardHeader>
          
          <IonCardContent>
            <form onSubmit={handleSubmit}>
              <IonItem>
                <IonIcon icon={person} slot="start" />
                <IonInput
                  type="text"
                  placeholder="Enter your alias"
                  value={alias}
                  onIonInput={(e: any) => setAlias(e.detail.value)}
                  required
                  clearInput
                />
              </IonItem>
              
              <IonItem style={{ marginTop: '16px' }}>
                <IonIcon icon={lockClosed} slot="start" />
                <IonInput
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onIonInput={(e: any) => setPassword(e.detail.value)}
                  required
                  clearInput
                />
              </IonItem>
              
              <IonButton
                expand="block"
                type="submit"
                style={{ marginTop: '24px' }}
              >
                <IonIcon 
                  icon={isLogin ? logIn : personAdd} 
                  slot="start" 
                />
                {isLogin ? 'Login' : 'Create Account'}
              </IonButton>
            </form>
          </IonCardContent>
        </IonCard>

        {/* Error Toast */}
        <IonToast
          isOpen={showError}
          onDidDismiss={() => setShowError(false)}
          message={errorMessage}
          duration={3000}
          color="danger"
          position="top"
          buttons={[
            {
              text: 'Dismiss',
              role: 'cancel'
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default LandingPage;
