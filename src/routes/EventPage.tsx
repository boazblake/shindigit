import {
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
  IonList,
  IonItem,
  IonLabel,
  useIonRouter,
} from '@ionic/react';
import { useEvents } from '../hooks/useEvents';
import { useEventContext } from '../contexts/EventContext';
import { useUserContext } from '../contexts/UserContext';
import InviteForm from '../components/InviteForm';
import type { RSVPstatus } from '../types/event';
import { gun } from '../services/gunService';
import {
  calendarOutline,
  locationOutline,
  peopleOutline,
  timeOutline,
  giftOutline,
  checkmarkOutline,
  closeOutline,
  helpCircleOutline
} from 'ionicons/icons';

const EventPage: React.FC = () => {
  const ionRouter = useIonRouter();
  const { event, loading, isCreator } = useEventContext();
  const { user } = useUserContext();
  const { rsvpEvent } = useEvents();

  if (!event) return null;

  const isInvited = !!event?.invited?.[user?.pub || ''];
  const canRSVP = () => !isCreator && (!event.isPrivate || isInvited);
  const isRSVPDisabled = !user || !canRSVP();

  const handleClaimItem = (itemId: string) => {
    if (!user) return;
    try {
      const itemRef = gun
        .get('events')
        .get(event.id)
        .get('items')
        .get(itemId)
        .get('claimed');

      itemRef.get(user.pub).once((currentClaimed: number = 0) => {
        const newClaim = currentClaimed + 1;
        itemRef.get(user.pub).put(newClaim, (ack: any) => {
          if (ack.err) {
            console.error('Failed to claim item:', ack.err);
          }
        });
      });
    } catch (error) {
      console.error('Error claiming item:', error);
    }
  };

  const handleRSVP = async (rsvp: RSVPstatus) => {
    try {
      await rsvpEvent(event.id, rsvp);
    } catch (error) {
      console.error('Failed to RSVP:', error);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 40 }}>
        <IonSpinner name="crescent" />
        <IonText color="medium">
          <p style={{ marginTop: 24 }}>Loading event...</p>
        </IonText>
      </div>
    );
  }

  if (!event) {
    return (
      <div style={{ textAlign: 'center', paddingTop: 40 }}>
        <IonText color="dark">
          <h1 style={{ fontWeight: 600, fontSize: 24 }}>Event not found</h1>
        </IonText>
        <IonText color="medium">
          <p style={{ marginTop: 12 }}>
            The event you're looking for doesn't exist or has been removed.
          </p>
        </IonText>
      </div>
    );
  }

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{event.title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonText color="medium">
          <p>{event.description}</p>
        </IonText>

        {/* Event Details */}
        <IonGrid className="ion-padding-vertical">
          <IonRow>
            <IonCol size="12" sizeMd="6">
              <IonItem lines="none">
                <IonIcon icon={calendarOutline} slot="start" color="primary" />
                <IonLabel>
                  <p className="ion-text-wrap" style={{ fontSize: 14, marginBottom: 0, color: '#888' }}>Date & Time</p>
                  <strong>{new Date(event.startDateTime).toLocaleString()}</strong>
                </IonLabel>
              </IonItem>
            </IonCol>
            <IonCol size="12" sizeMd="6">
              <IonItem lines="none">
                <IonIcon icon={locationOutline} slot="start" color="success" />
                <IonLabel>
                  <p className="ion-text-wrap" style={{ fontSize: 14, marginBottom: 0, color: '#888' }}>Location</p>
                  <strong>{event.location}</strong>
                </IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" sizeMd="6">
              <IonItem lines="none">
                <IonIcon icon={peopleOutline} slot="start" color="tertiary" />
                <IonLabel>
                  <p className="ion-text-wrap" style={{ fontSize: 14, marginBottom: 0, color: '#888' }}>Capacity</p>
                  <strong>{event.capacity > 0 ? event.capacity : 'Unlimited'}</strong>
                </IonLabel>
              </IonItem>
            </IonCol>
            <IonCol size="12" sizeMd="6">
              <IonItem lines="none">
                <IonIcon icon={timeOutline} slot="start" color="warning" />
                <IonLabel>
                  <p className="ion-text-wrap" style={{ fontSize: 14, marginBottom: 0, color: '#888' }}>Duration</p>
                  <strong>{event.isAllDay ? 'All Day' : 'Custom Duration'}</strong>
                </IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* RSVP Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 24 }}>
          <IonButton
            color="success"
            disabled={isRSVPDisabled}
            onClick={() => handleRSVP('yes')}
          >
            <IonIcon icon={checkmarkOutline} slot="start" />
            Attending
          </IonButton>
          <IonButton
            color="danger"
            disabled={isRSVPDisabled}
            onClick={() => handleRSVP('no')}
          >
            <IonIcon icon={closeOutline} slot="start" />
            Not Attending
          </IonButton>
          <IonButton
            color="medium"
            disabled={isRSVPDisabled}
            onClick={() => handleRSVP('maybe')}
          >
            <IonIcon icon={helpCircleOutline} slot="start" />
            Maybe
          </IonButton>
        </div>

        {/* Invite Form */}
        {isCreator && (
          <div style={{ marginBottom: 32 }}>
            <IonText color="dark">
              <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: 12 }}>Invite People</h2>
            </IonText>
            <InviteForm eventId={event.id} />
          </div>
        )}

        {/* Items Section */}
        {isInvited && event.items && Object.keys(event.items).length > 0 && (
          <div>
            <IonText color="dark">
              <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: 12 }}>Available Items</h2>
            </IonText>
            <IonList>
              {Object.entries(event.items).map(([itemId, item]: any) => {
                const total = item.claimed
                  ? Object.values(item.claimed).reduce(
                      (sum: number, quantity: number) => sum + quantity,
                      0
                    )
                  : 0;
                const remaining = item.quantity - total;
                return (
                  <IonItem key={itemId} lines="full">
                    <IonIcon icon={giftOutline} slot="start" color="primary" />
                    <IonLabel>
                      <p style={{ fontWeight: 500, margin: 0 }}>{item.name}</p>
                      <p style={{ fontSize: 13, color: '#888', margin: 0 }}>
                        {remaining > 0 ? `${remaining} remaining` : 'All taken'}
                      </p>
                    </IonLabel>
                    {remaining > 0 && (
                      <IonButton
                        fill="outline"
                        size="small"
                        color="primary"
                        onClick={() => handleClaimItem(itemId)}
                        slot="end"
                      >
                        Claim
                      </IonButton>
                    )}
                  </IonItem>
                );
              })}
            </IonList>
          </div>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default EventPage;
