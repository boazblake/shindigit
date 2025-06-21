import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useEvents } from '../hooks/useEvents';
import { useUserContext } from '../contexts/UserContext';
import type { Event } from '../types/event';
import {
  IonText,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonIcon,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonPage,
  IonContent,
} from '@ionic/react';
import {
  calendar,
  people,
  gift,
  time,
  location,
} from 'ionicons/icons';

export default function HomePage() {
  const history = useHistory();
  const { events } = useEvents();
  const { user } = useUserContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  const now = new Date();
  const upcomingEvents = events.filter(
    event => new Date(event.startDateTime) > now
  );
  const pastEvents = events.filter(
    event => new Date(event.startDateTime) <= now
  );

  const filteredEvents = (events: Event[]) =>
    events.filter(event =>
      event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const displayEvents =
    filter === 'upcoming'
      ? filteredEvents(upcomingEvents)
      : filter === 'past'
        ? filteredEvents(pastEvents)
        : filteredEvents(events);

  const totalRSVPs = events.reduce(
    (acc, event) => acc + Object.values(event.rsvps || {}).filter(status => status === 'yes').length,
    0
  );

  const totalItems = events.reduce(
    (acc, event) => acc + (event.items?.length || 0),
    0
  );

  const EventCard = ({ event }: { event: Event }) => (
    <IonCard button onClick={() => history.push(`/tabs/event/${event.id}`)}>
      <IonCardHeader>
        <IonCardTitle>{event.title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonText color="medium">
          <p>{event.description}</p>
        </IonText>
        <div style={{ marginTop: '12px' }}>
          <IonItem lines="none">
            <IonIcon icon={time} slot="start" color="medium" />
            <IonLabel>
              <IonText color="medium">
                {new Date(event.startDateTime).toLocaleString()}
              </IonText>
            </IonLabel>
          </IonItem>
          <IonItem lines="none">
            <IonIcon icon={location} slot="start" color="medium" />
            <IonLabel>
              <IonText color="medium">{event.location}</IonText>
            </IonLabel>
          </IonItem>
          <IonItem lines="none">
            <IonIcon icon={people} slot="start" color="medium" />
            <IonLabel>
              <IonText color="medium">
                {Object.values(event.rsvps || {}).filter(status => status === 'yes').length} RSVPs
              </IonText>
            </IonLabel>
          </IonItem>
        </div>
      </IonCardContent>
    </IonCard>
  );

  const EventSection = ({ title, events }: { title: string; events: Event[] }) =>
    events.length > 0 && (
      <div style={{ marginBottom: '32px' }}>
        <IonText>
          <h2 style={{ padding: '0 16px' }}>{title}</h2>
        </IonText>
        <IonGrid>
          <IonRow>
            {events.map(event => (
              <IonCol key={event.id} size="12" sizeMd="6" sizeLg="4">
                <EventCard event={event} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </div>
    );

  return (
    <IonPage>
      <IonContent>
        {/* Welcome Section */}
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <IonText>
            <h1>Welcome back, {user?.alias || 'Friend'}!</h1>
          </IonText>
        </div>

        {/* Search Events */}
        <div style={{ padding: '0 16px' }}>
          <IonSearchbar
            value={searchTerm}
            onIonInput={(e: any) => setSearchTerm(e.detail.value)}
            placeholder="Search events..."
            showClearButton="focus"
          />
        </div>

        {/* Stats and Filter Section */}
        <div style={{ padding: '16px' }}>
          <IonGrid>
            <IonRow className="ion-align-items-center">
              <IonCol size="3">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <IonIcon icon={calendar} color="primary" />
                  <IonText>
                    <p>{upcomingEvents.length} Events</p>
                  </IonText>
                </div>
              </IonCol>
              <IonCol size="3">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <IonIcon icon={people} color="success" />
                  <IonText>
                    <p>{totalRSVPs} RSVPs</p>
                  </IonText>
                </div>
              </IonCol>
              <IonCol size="3">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <IonIcon icon={gift} color="tertiary" />
                  <IonText>
                    <p>{totalItems} Items</p>
                  </IonText>
                </div>
              </IonCol>
              <IonCol size="3">
                <IonSelect
                  value={filter}
                  onIonChange={(e: any) => setFilter(e.detail.value)}
                  placeholder="Filter"
                  interface="popover"
                >
                  <IonSelectOption value="all">All</IonSelectOption>
                  <IonSelectOption value="upcoming">Upcoming</IonSelectOption>
                  <IonSelectOption value="past">Past</IonSelectOption>
                </IonSelect>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        {/* Events Display */}
        <div style={{ padding: '16px' }}>
          {displayEvents.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <IonIcon icon={calendar} size="large" color="medium" />
              <IonText>
                <h3>No events found</h3>
                <p>Check out events on the Events tab.</p>
              </IonText>
            </div>
          ) : (
            <>
              {filter !== 'past' && <EventSection title="Upcoming Events" events={filteredEvents(upcomingEvents)} />}
              {filter !== 'upcoming' && <EventSection title="Past Events" events={filteredEvents(pastEvents)} />}
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
}
