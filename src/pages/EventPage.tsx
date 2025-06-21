import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonPage,
  IonContent,
  IonSpinner,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonAlert,
} from '@ionic/react';
import { useEvents } from '../hooks/useEvents';
import { useEventContext } from '../contexts/EventContext';
import { useUserContext } from '../contexts/UserContext';
import InviteForm from '../components/InviteForm';
import type { RSVPstatus } from '../types/event';
import {
  calendarOutline,
  locationOutline,
  peopleOutline,
  timeOutline,
} from 'ionicons/icons';

const EventPage: React.FC = () => {
  const history = useHistory();
  const { event, loading, isCreator } = useEventContext();
  const { user } = useUserContext();
  const { rsvpEvent } = useEvents();
  const [error, setError] = useState('');

  if (loading) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '40px' }}>
            <IonSpinner name="crescent" />
            <IonText color="medium">
              <p>Loading event...</p>
            </IonText>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  if (!event) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <div style={{ textAlign: 'center', paddingTop: '40px' }}>
            <IonText color="dark">
              <h1 style={{ fontSize: '24px', fontWeight: 600 }}>Event not found</h1>
            </IonText>
            <IonText color="medium">
              <p>The event you're looking for doesn't exist or has been removed.</p>
            </IonText>
            <IonButton onClick={() => history.push('/tabs/home')} style={{ marginTop: '16px' }}>
              Back to Home
            </IonButton>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  const isInvited = !!event?.invited?.[user?.pub || ''];
  const canRSVP = !isCreator && (!event.isPrivate || isInvited);
  const isRSVPDisabled = !user || !canRSVP;



  const handleRSVP = async (rsvp: RSVPstatus) => {
    try {
      await rsvpEvent(event.id, rsvp);
    } catch (error) {
      console.error('Failed to RSVP:', error);
      setError('Failed to update RSVP. Please try again.');
    }
  };

  // Debug items section
  console.log('Items Debug:', { isInvited, items: event.items, itemKeys: event.items ? Object.keys(event.items) : [] });

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{event.title}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonText color="medium">
              <p>{event.description}</p>
            </IonText>
            <IonGrid>
              <IonRow>
                <IonCol size="12" sizeMd="6">
                  <IonItem lines="none">
                    <IonIcon icon={calendarOutline} slot="start" color="primary" />
                    <IonLabel>
                      <IonText color="medium">Date & Time</IonText>
                      <p>{new Date(event.startDateTime).toLocaleString()}</p>
                    </IonLabel>
                  </IonItem>
                </IonCol>
                <IonCol size="12" sizeMd="6">
                  <IonItem lines="none">
                    <IonIcon icon={locationOutline} slot="start" color="success" />
                    <IonLabel>
                      <IonText color="medium">Location</IonText>
                      <p>{event.location}</p>
                    </IonLabel>
                  </IonItem>
                </IonCol>
                <IonCol size="12" sizeMd="6">
                  <IonItem lines="none">
                    <IonIcon icon={peopleOutline} slot="start" color="tertiary" />
                    <IonLabel>
                      <IonText color="medium">Capacity</IonText>
                      <p>{event.capacity > 0 ? event.capacity : 'Unlimited'}</p>
                    </IonLabel>
                  </IonItem>
                </IonCol>
                <IonCol size="12" sizeMd="6">
                  <IonItem lines="none">
                    <IonIcon icon={timeOutline} slot="start" color="warning" />
                    <IonLabel>
                      <IonText color="medium">Duration</IonText>
                      <p>{event.isAllDay ? 'All Day' : 'Custom Duration'}</p>
                    </IonLabel>
                  </IonItem>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonItem lines="none" style={{ margin: '24px 0' }}>
              <IonIcon icon={peopleOutline} slot="start" color="primary" />
              <IonSelect
                value={event.rsvps?.[user?.pub || ''] || ''}
                placeholder="Select RSVP"
                interface="action-sheet"
                disabled={isRSVPDisabled}
                onIonChange={(e) => handleRSVP(e.detail.value as RSVPstatus)}
              >
                <IonSelectOption value="yes">Attending</IonSelectOption>
                <IonSelectOption value="no">Not Attending</IonSelectOption>
                <IonSelectOption value="maybe">Maybe</IonSelectOption>
              </IonSelect>
            </IonItem>
            {isCreator && (
              <div style={{ marginBottom: '32px' }}>
                <IonText color="dark">
                  <h2>Invite People</h2>
                </IonText>
                <InviteForm eventId={event.id} />
              </div>
            )}
          </IonCardContent>
        </IonCard>
        <IonAlert
          isOpen={!!error}
          onDidDismiss={() => setError('')}
          header="Error"
          message={error}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default EventPage;
