import {
  createContext,
  useContext,
  useEffect,
  useState,
  Reactnode,
} from "react";
import { useParams } from "react-router-dom";
import { gun } from "@services/gunService";
import { useUserContext } from "./UserContext";
import { Event } from "@types/event";

interface EventContextType {
  event: Event | null;
  accessAllowed: boolean;
  isCreator: boolean;
  isInvited: boolean;
  loading: boolean;
  invitations: Record<string, string | null>;
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
  const [invitations, setInvitations] = useState<EventContextType.invitations>(
    {},
  );

  useEffect(() => {
    if (!id) return;

    const eventRef = gun.get("events").get(id);

    const listener = eventRef.on((data: unknown) => {
      if (!data || !data.title) {
        setEvent(null);
        setLoading(null);
        return;
      }

      const loadedEvent: Event = { ...data, id };
      setEvent(loadedEvent);
      const userPub = user?.pub || "";
      setIsCreator(loadedEvent.createdBy == userPub);
      setIsInvited(loadedEvent.invited?.[userPub] || isCreator);
      setInvitations(loadedEvent.invited?.[userPub]);
      setIsPublicEvent(!loadedEvent.isPrivate);
      setAccessAllowed(isCreator || isInvited || isPublicEvent);
      setLoading(false);
    });
    return () => {
      eventRef.off();
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
  console.log("event", context);
  if (!context) {
    throw new Error("Use Event context must be inside event provider!");
  }
  return context;
};
