import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useEvents } from '../hooks/useEvents';
import { useUserContext } from '../contexts/UserContext';
import type { Event } from '../types/event';
import {
  IonText,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
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
  IonFab,
  IonFabButton,
} from '@ionic/react';
import {
  calendar,
  funnel,
  add,
  people,
  gift,
  time,
  location,
  person,
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

  const filteredEvents = (events: Event[]) => {
    return !events.length
      ? []
      : events.filter(event => {
          const matchesSearch =
            event?.title
              ?.toLowerCase()
              .includes(searchTerm?.toLowerCase() ?? '') ||
            event?.description
              .toLowerCase()
              .includes(searchTerm?.toLowerCase());
          return matchesSearch;
        });
  };

  const displayEvents =
    filter === 'upcoming'
      ? filteredEvents(upcomingEvents)
      : filter === 'past'
        ? filteredEvents(pastEvents)
        : filteredEvents(events);

  const totalRSVPs = events.reduce((acc: number, event: Event) => {
    const rsvpCount = Object.values(event.rsvps || {}).filter(
      status => status === 'yes'
    ).length;
    return acc + rsvpCount;
  }, 0);

  const totalItems = events.reduce((acc: number, event: Event) => {
    const itemCount = event.items?.length || 0;
    return acc + itemCount;
  }, 0);

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
              <IonText color="medium">{event.rsvps?.length || 0} RSVPs</IonText>
            </IonLabel>
          </IonItem>
        </div>
      </IonCardContent>
    </IonCard>
  );

  return (
    <>
      {/* Welcome Section */}
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <IonText>
          <h1>Welcome back, {user?.alias || 'Friend'}!</h1>
        </IonText>
        <IonButton 
          fill="outline" 
          onClick={() => history.push('/tabs/profile')}
          style={{ marginTop: '12px' }}
        >
          <IonIcon icon={person} slot="start" />
          View Profile
        </IonButton>
      </div>

      {/* Stats Section */}
      <IonGrid>
        <IonRow>
          <IonCol size="12" sizeMd="4">
            <IonCard>
              <IonCardContent>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <IonIcon icon={calendar} color="primary" size="large" />
                  <div>
                    <IonText color="medium">
                      <p>Upcoming Events</p>
                    </IonText>
                    <IonText>
                      <h2>{upcomingEvents.length}</h2>
                    </IonText>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol size="12" sizeMd="4">
            <IonCard>
              <IonCardContent>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <IonIcon icon={people} color="success" size="large" />
                  <div>
                    <IonText color="medium">
                      <p>Total RSVPs</p>
                    </IonText>
                    <IonText>
                      <h2>{totalRSVPs}</h2>
                    </IonText>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol size="12" sizeMd="4">
            <IonCard>
              <IonCardContent>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <IonIcon icon={gift} color="tertiary" size="large" />
                  <div>
                    <IonText color="medium">
                      <p>Items Shared</p>
                    </IonText>
                    <IonText>
                      <h2>{totalItems}</h2>
                    </IonText>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>

      {/* Search and Filters */}
      <div style={{ padding: '0 16px' }}>
        <IonSearchbar
          value={searchTerm}
          onIonInput={(e: any) => setSearchTerm(e.detail.value)}
          placeholder="Search events..."
          showClearButton="focus"
        />
        
        <IonItem>
          <IonIcon icon={funnel} slot="start" />
          <IonSelect
            value={filter}
            onIonChange={(e: any) => setFilter(e.detail.value)}
            placeholder="Filter events"
          >
            <IonSelectOption value="all">All Events</IonSelectOption>
            <IonSelectOption value="upcoming">Upcoming</IonSelectOption>
            <IonSelectOption value="past">Past</IonSelectOption>
          </IonSelect>
        </IonItem>
      </div>

      {/* Quick Actions */}
      <div style={{ padding: '16px', textAlign: 'center' }}>
        <IonButton onClick={() => history.push('/tabs/createEvent')}>
          <IonIcon icon={add} slot="start" />
          Create Event
        </IonButton>
        <IonButton fill="outline" onClick={() => history.push('/tabs/events')}>
          <IonIcon icon={calendar} slot="start" />
          View All Events
        </IonButton>
      </div>

      {/* Events Display */}
      <div style={{ padding: '16px' }}>
        {displayEvents.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <IonIcon icon={calendar} size="large" color="medium" />
            <IonText>
              <h3>No events found</h3>
              <p>Get started by creating a new event.</p>
            </IonText>
            <IonButton 
              onClick={() => history.push('/tabs/createEvent')}
              style={{ marginTop: '20px' }}
            >
              <IonIcon icon={add} slot="start" />
              Create Event
            </IonButton>
          </div>
        ) : (
          <>
            {/* Upcoming Events */}
            {filter !== 'past' && upcomingEvents.length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <IonText>
                  <h2 style={{ padding: '0 16px' }}>Upcoming Events</h2>
                </IonText>
                <IonGrid>
                  <IonRow>
                    {filteredEvents(upcomingEvents).map(event => (
                      <IonCol key={event.id} size="12" sizeMd="6" sizeLg="4">
                        <EventCard event={event} />
                      </IonCol>
                    ))}
                  </IonRow>
                </IonGrid>
              </div>
            )}

            {/* Past Events */}
            {filter !== 'upcoming' && pastEvents.length > 0 && (
              <div>
                <IonText>
                  <h2 style={{ padding: '0 16px' }}>Past Events</h2>
                </IonText>
                <IonGrid>
                  <IonRow>
                    {filteredEvents(pastEvents).map(event => (
                      <IonCol key={event.id} size="12" sizeMd="6" sizeLg="4">
                        <EventCard event={event} />
                      </IonCol>
                    ))}
                  </IonRow>
                </IonGrid>
              </div>
            )}
          </>
        )}
      </div>

      {/* Floating Action Button */}
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => history.push('/tabs/createEvent')}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
    </>
  );
}
