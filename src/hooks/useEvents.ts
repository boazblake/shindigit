import { useEffect, useState } from "react";
import { gun } from "../services/gunService";
import { Event, RSVPstatus } from "../types/event";
import { authService } from "../services/authService";

export const useEvents = () => {
  const [events, setEvents] = useState<Record<string, Event>>({});

  useEffect(() => {
    const eventsRef = gun.get("events");

    const listener = eventsRef.map().on((data: any, key: string) => {
      if (data && data.title) {
        setEvents((prev) => ({
          ...prev,
          [key]: { ...data, id: key },
        }));
      } else {
        // If the data is null (deleted), remove it
        setEvents((prev) => {
          const newEvents = { ...prev };
          delete newEvents[key];
          return newEvents;
        });
      }
    });

    return () => {
      eventsRef.off();
    };
  }, []);

  const createEvent = async ({
    title,
    description,
    location,
    isPrivate,
    capacity,
    items,
  }: {
    isPrivate: boolean;
    title: string;
    description: string;
    location: string;
    capacity: number;
    itemInputs: { name: string; quantity: number }[];
  }) => {
    const user = authService.getCurrentUser();
    if (!user) throw new Error("User not authenticated");
    const items: Record<string, EventItem> = {};

    for (const item of itemInputs) {
      items[nanoid(8)] = {
        name: item.name,
        quantity: item.quantity,
        claimed: [],
      };
    }

    const newEvent: Omit<Event, "id"> = {
      title,
      description,
      location,
      capacity,
      isPrivate,
      createdBy: user.pub,
      rsvps: {
        [user.pub]: "yes",
      },
      invited: {},
      timestamp: Date.now(),
      items,
    };

    gun.get("events").set(newEvent);
  };

  const rsvpEvent = async (eventId: string, rsvp: RSVPstatus) => {
    const user = authService.getCurrentUser();
    if (!user) throw new Error("User not authenticated");

    const eventRef = gun.get("events").get(eventId);
    eventRef.once((data: unknown) => {
      if (!data) throw new Error("event not found");
      const event: Event = { ...data, id: eventId };
      const userPub = user.pub;
      const isCreator = userPub == event.createdBy;
      const isInvited = event.isInvited?.[userPub] == true;
      const isPublic = !event.isPrivate;

      if (rsvp === "yes") {
        const yesCount = Object.values(event.rsvps).filter(
          (status: RSVPstatus) => status === "yesy",
        ).length;
        if (event.capacity > 0 && yesCount >= event.capacity) {
          throw new Error("Event full");
        }
      }
    });
  };

  return {
    events: Object.values(events),
    createEvent,
    rsvpEvent,
  };
};
