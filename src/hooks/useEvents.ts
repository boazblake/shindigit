import { useEffect, useState, useCallback } from "react";
import { gun } from "@services/gunService";
import { Event } from "@types/event";
import { authService } from "@services/authService";

// Define RSVP status enum for better type safety
export enum RsvpStatus {
  GOING = "going",
  MAYBE = "maybe",
  NOT_GOING = "not_going",
}

// Update your Event interface (comment out since yours is likely defined elsewhere)
// interface Event {
//   id: string;
//   title: string;
//   description: string;
//   createdBy: string;
//   rsvps: Record<string, RsvpStatus>; // Updated to use RsvpStatus
//   timestamp: number;
//   capacity?: number; // Optional max capacity
//   location?: string; // Optional location
// }

export const useEvents = () => {
  const [events, setEvents] = useState<Record<string, Event>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const eventsRef = gun.get("events");
    console.log("Subscribing to eventsRef", eventsRef);

    const listener = eventsRef.map().on((data: object | null, key: string) => {
      console.log("Gun event data:", key, data);
      if (data === null) {
        // Handle deletion: remove the event from state
        setEvents((prev) => {
          const newState = { ...prev };
          delete newState[key];
          return newState;
        });
      } else if (typeof data === "object" && data !== null) {
        // Handle creation/update
        const eventData = data as Omit<Event, "id">;
        setEvents((prev) => ({
          ...prev,
          [key]: { ...eventData, id: key },
        }));
      }
      setIsLoading(false);
    });

    // Cleanup function
    return () => {
      console.log("Unsubscribing from eventsRef");
      if (listener) {
        listener.off();
      } else {
        eventsRef?.off();
      }
    };
  }, []);

  // --- Action Functions ---

  const createEvent = useCallback(
    (eventData: {
      title: string;
      description: string;
      location?: string;
      capacity?: number;
    }) => {
      const user = authService.getCurrentUser();
      if (!user || !user.pubKey) {
        console.error("User not authenticated or public key missing.");
        throw new Error("User not authenticated or public key missing.");
      }

      const newEventData: Omit<Event, "id"> = {
        title: eventData.title,
        description: eventData.description,
        createdBy: user.pubKey,
        rsvps: {
          [user.pubKey]: RsvpStatus.GOING, // Creator automatically RSVPs as going
        },
        timestamp: Date.now(),
        ...(eventData.location && { location: eventData.location }),
        ...(eventData.capacity && { capacity: eventData.capacity }),
      };

      console.log("Creating event:", newEventData);
      const newEventRef = gun.get("events").set(newEventData);
      return newEventRef;
    },
    [],
  );

  const updateRsvpStatus = useCallback(
    (eventId: string, status: RsvpStatus) => {
      const user = authService.getCurrentUser();
      if (!user || !user.pubKey) {
        console.error("User not authenticated or public key missing.");
        throw new Error("User not authenticated or public key missing.");
      }

      console.log(
        `User ${user.pubKey} updating RSVP to ${status} for event ${eventId}`,
      );

      // Update the RSVP status in Gun
      gun.get("events").get(eventId).get("rsvps").get(user.pubKey).put(status);
    },
    [],
  );

  const cancelRsvp = useCallback((eventId: string) => {
    const user = authService.getCurrentUser();
    if (!user || !user.pubKey) {
      console.error("User not authenticated or public key missing.");
      throw new Error("User not authenticated or public key missing.");
    }

    console.log(`User ${user.pubKey} canceling RSVP for event ${eventId}`);

    // Set the RSVP status to null to remove it
    gun.get("events").get(eventId).get("rsvps").get(user.pubKey).put(null);
  }, []);

  const deleteEvent = useCallback(
    (eventId: string) => {
      const user = authService.getCurrentUser();
      if (!user || !user.pubKey) {
        console.error("User not authenticated or public key missing.");
        throw new Error("User not authenticated or public key missing.");
      }

      const event = events[eventId];
      if (!event) {
        console.error("Event not found");
        throw new Error("Event not found");
      }

      if (event.createdBy !== user.pubKey) {
        console.error("Only the event creator can delete an event");
        throw new Error("Only the event creator can delete an event");
      }

      console.log(`Deleting event ${eventId}`);
      gun.get("events").get(eventId).put(null);
    },
    [events],
  );

  // --- Helper Functions ---

  const getEventAttendees = useCallback(
    (
      eventId: string,
    ): {
      going: string[];
      maybe: string[];
      notGoing: string[];
    } => {
      const event = events[eventId];
      if (!event) {
        return { going: [], maybe: [], notGoing: [] };
      }

      const rsvps = event.rsvps || {};

      return {
        going: Object.keys(rsvps).filter(
          (key) => rsvps[key] === RsvpStatus.GOING,
        ),
        maybe: Object.keys(rsvps).filter(
          (key) => rsvps[key] === RsvpStatus.MAYBE,
        ),
        notGoing: Object.keys(rsvps).filter(
          (key) => rsvps[key] === RsvpStatus.NOT_GOING,
        ),
      };
    },
    [events],
  );

  const getUserRsvpStatus = useCallback(
    (eventId: string): RsvpStatus | null => {
      const user = authService.getCurrentUser();
      if (!user || !user.pubKey) {
        return null;
      }

      const event = events[eventId];
      if (!event || !event.rsvps) {
        return null;
      }

      return event.rsvps[user.pubKey] || null;
    },
    [events],
  );

  const getAttendeeCount = useCallback(
    (eventId: string): number => {
      const event = events[eventId];
      if (!event || !event.rsvps) {
        return 0;
      }

      return Object.values(event.rsvps).filter(
        (status) => status === RsvpStatus.GOING,
      ).length;
    },
    [events],
  );

  const isEventFull = useCallback(
    (eventId: string): boolean => {
      const event = events[eventId];
      if (!event || !event.capacity) {
        return false; // No capacity limit
      }

      const attendeeCount = getAttendeeCount(eventId);
      return attendeeCount >= event.capacity;
    },
    [events, getAttendeeCount],
  );

  // --- Return Value ---

  return {
    events: Object.values(events),
    eventsMap: events, // Sometimes useful to have the map version too
    isLoading,
    createEvent,
    updateRsvpStatus,
    cancelRsvp,
    deleteEvent,
    getEventAttendees,
    getUserRsvpStatus,
    getAttendeeCount,
    isEventFull,
    // Original function for backward compatibility
    rsvpEvent: (eventId: string) => updateRsvpStatus(eventId, RsvpStatus.GOING),
  };
};
