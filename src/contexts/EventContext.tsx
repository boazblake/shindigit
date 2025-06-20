import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { useParams } from 'react-router-dom';
import { gun } from '@services/gunService';
import { useUserContext } from './UserContext';
import { Event } from '../types/event.ts';

interface EventContextType {
  event: Event | null;
  accessAllowed: boolean;
  isCreator: boolean;
  isInvited: boolean;
  isPublicEvent: boolean;
  loading: boolean;
  invitations: Record<string, boolean | null>;
}

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const { id } = useParams<{ id: string }>();
  const { user } = useUserContext();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isCreator, setIsCreator] = useState<boolean>(false);
  const [isInvited, setIsInvited] = useState<boolean>(false);
  const [isPublicEvent, setIsPublicEvent] = useState<boolean>(false);
  const [accessAllowed, setAccessAllowed] = useState<boolean>(false);
  const [invitations, setInvitations] = useState<
    EventContextType['invitations']
  >({});

  const reset = () => {
    setEvent(null);
    setLoading(false);
  };

  useEffect(() => {
    if (!id) {
      reset();
      return;
    }

    let isSubscribed = true;
    const eventRef = gun.get('events').get(id);

    const listener = eventRef.on((data: unknown) => {
      if (!isSubscribed) return;

      try {
        if (!data || typeof data !== 'object' || !('title' in data)) {
          reset();
          return;
        }

        const loadedEvent: Event = { ...data, id } as Event;
        const userPub = user?.pub || '';

        // Only update state if the data has actually changed
        setEvent(prev => {
          if (prev && JSON.stringify(prev) === JSON.stringify(loadedEvent)) {
            return prev;
          }
          return loadedEvent;
        });

        setIsCreator(loadedEvent.createdBy === userPub);
        setIsInvited(
          loadedEvent.invited?.[userPub] || loadedEvent.createdBy === userPub
        );
        setInvitations(loadedEvent.invited || {});
        setIsPublicEvent(!loadedEvent.isPrivate);
        setAccessAllowed(
          loadedEvent.createdBy === userPub ||
            loadedEvent.invited?.[userPub] ||
            !loadedEvent.isPrivate
        );
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching event: ${error}`);
        reset();
      }
    });

    return () => {
      isSubscribed = false;
      eventRef.off();
      listener?.off();
    };
  }, [id, user]);

  return (
    <EventContext.Provider
      value={{
        event,
        loading,
        accessAllowed,
        isCreator,
        isInvited,
        invitations,
        isPublicEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

const EventContext = createContext<EventContextType | null>(null);
export const useEventContext = () => {
  const context = useContext(EventContext);
  console.log('event', context);
  if (!context) {
    throw new Error('Use Event context must be inside event provider!');
  }
  return context;
};
