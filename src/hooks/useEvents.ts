import { useEffect, useState, useCallback } from "react"; // Added useCallback
import { gun } from "@services/gunService";
import { Event } from "@types/event";
import { authService } from "@services/authService";

// Define Event type structure (example)
// interface Event {
//   id: string;
//   title: string;
//   description: string;
//   createdBy: string; // User public key
//   rsvps: Record<string, boolean>; // Map of user pubKey key to true
//   timestamp: number;
// }

export const useEvents = () => {
  const [events, setEvents] = useState<Record<string, Event>>({});

  useEffect(() => {
    const eventsRef = gun.get("events");
    console.log("Subscribing to eventsRef", eventsRef);

    const listener = eventsRef?.map().on((data: unknown, key: string) => {
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
        // Basic check if data looks like an event object - adjust as needed
        // You might want more robust validation/typing here
        const eventData = data as Omit<Event, "id">;
        setEvents((prev) => ({
          ...prev,
          [key]: { ...eventData, id: key }, // Add the gun key as the id
        }));
      }
    });

    // Cleanup function
    return () => {
      console.log("Unsubscribing from eventsRef");
      // Gun's 'off()' might require the specific listener reference,
      // although often calling it on the ref works. Check Gun documentation if issues arise.
      if (listener) {
        listener.off(); // More specific cleanup
      } else {
        eventsRef?.off(); // General cleanup for the ref
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount/unmount

  // --- Action Functions ---

  const createEvent = useCallback((title: string, description: string) => {
    const user = authService.getCurrentUser();
    console.log(user);
    if (!user || !user.pubKey) {
      // Also check if user.pubKey exists
      console.error("User not authenticated or public key missing.");
      // Consider returning a failure status or throwing a specific error type
      throw new Error("User not authenticated or public key missing.");
    }

    const eventData: Omit<Event, "id"> = {
      title,
      description,
      createdBy: user.pubKey,
      rsvps: {}, // Initialize rsvps as an empty object
      timestamp: Date.now(),
    };

    console.log("Creating event:", eventData);
    // Use 'set' to add an item to a collection (Gun generates the key)
    const newEventRef = gun.get("events").set(eventData);
    // Note: The 'useEvents' hook will pick up this new event via its 'on' listener.
    return newEventRef; // Return the ref if needed elsewhere
  }, []); // useCallback ensures function identity remains stable if dependencies are stable

  const rsvpEvent = useCallback((eventId: string) => {
    const user = authService.getCurrentUser();
    if (!user || !user.pubKey) {
      // Also check if user.pubKey exists
      console.error("User not authenticated or public key missing.");
      throw new Error("User not authenticated or public key missing.");
    }

    console.log(`User ${user.pubKey} RSVPing to event ${eventId}`);
    // Navigate to the specific event's rsvps field and add the user's pubKey key
    gun.get("events").get(eventId).get("rsvps").get(user.pubKey).put(true);
    // Note: The 'useEvents' hook will pick up this change if the event object itself is updated
    // (or if you were listening specifically to the rsvps field).
  }, []); // useCallback

  // --- Return Value ---

  return {
    // Provide events typically as an array for easier rendering in React
    events: Object.values(events),
    // Provide the action functions
    createEvent,
    rsvpEvent,
  };
};
