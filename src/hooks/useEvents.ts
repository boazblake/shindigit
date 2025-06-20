import { useEffect, useState, useCallback } from 'react';
import type { Event, RSVPstatus } from '../types/event';
import { useGun } from './useGun';

interface CreateEventInput {
  title: string;
  description: string;
  location: string;
  capacity: number;
  isPrivate: boolean;
  startDateTime: string;
  endDateTime: string;
  isAllDay: boolean;
  itemInputs: { name: string; quantity: number }[];
}

export const useEvents = () => {
  const { gun, user } = useGun();
  const [events, setEvents] = useState<Event[]>([]);

  // Subscribe to all events
  useEffect(() => {
    if (!gun || !user?.is) return;

    let isSubscribed = true;

    const eventsRef = gun.get('events');
    eventsRef.map().on((data: any, key: string) => {
      if (!isSubscribed) return;
      if (data && key) {
        const event = { ...data, id: key };
        setEvents(prev => {
          const exists = prev.find(e => e.id === key);
          if (exists) {
            return prev.map(e => (e.id === key ? event : e));
          }
          return [...prev, event];
        });
      }
    });

    return () => {
      isSubscribed = false;
      eventsRef.off();
    };
  }, [gun, user]);

  // Create event
const createEvent = async (input: CreateEventInput) => {
  if (!gun || !user?.is) throw new Error('Not authenticated');

  const userPub = user.is.pub;
  const eventsRef = gun.get('events');
  const itemsObj = Object.fromEntries(
    input.itemInputs.map(item => {
      const id = crypto.randomUUID();
      return [
        id,
        { id, name: item.name, quantity: item.quantity, claimed: {} }
      ];
    })
  );
  const eventData = {
    title: input.title,
    description: input.description,
    location: input.location,
    capacity: input.capacity,
    isPrivate: input.isPrivate,
    startDateTime: input.startDateTime,
    endDateTime: input.endDateTime,
    isAllDay: input.isAllDay,
    createdBy: userPub,
    createdOn: Date.now(),
    rsvps: {},
    items: itemsObj,
  };
  const eventRef = eventsRef.set(eventData);

  return new Promise((resolve, reject) => {
    eventRef.once((data: any, key: string) => {
      if (data) {
        resolve({ ...data, id: key });
      } else {
        reject(new Error('Failed to create event'));
      }
    });
  });
};

  // Generic event updater
  const updateEvent = useCallback(
    async (eventId: string, updates: Partial<Event>) => {
      if (!gun || !user?.is) throw new Error('Not authenticated');
      const eventRef = gun.get('events').get(eventId);
      const event = { ...updates, updatedOn: new Date() };
      return new Promise((resolve, reject) => {
        eventRef.once((data: Event) => {
          if (!data) {
            reject(new Error('Event not found'));
            return;
          }
          eventRef.put(event, (ack: any) => {
            if (ack.err) {
              reject(new Error('Failed to update event'));
            } else {
              resolve({ ...data, ...event });
            }
          });
        });
      });
    },
    [gun, user]
  );

  // RSVP to an event
  const rsvpEvent = useCallback(
    async (eventId: string, rsvp: RSVPstatus) => {
      if (!gun || !user?.is) throw new Error('Not authenticated');
      const userPub = user.is.pub;
      const eventRef = gun.get('events').get(eventId);

      return new Promise((resolve, reject) => {
        eventRef.once((data: Event) => {
          if (!data) {
            reject(new Error('Event not found'));
            return;
          }

          const isCreator = data.createdBy === userPub;
          const isInvited = data.isPrivate
            ? data.rsvps[userPub] !== undefined
            : true;

          if (!isCreator && !isInvited) {
            reject(new Error('Not invited to this event'));
            return;
          }

          if (rsvp === 'no' && data.capacity > 0) {
            const currentGoing = Object.values(data.rsvps).filter(
              r => r === 'no'
            ).length;
            if (currentGoing >= data.capacity) {
              reject(new Error('Event is at capacity'));
              return;
            }
          }

          // Use updateEvent to patch the rsvps map
          updateEvent(eventId, { rsvps: { ...data.rsvps, [userPub]: rsvp } })
            .then(updated => resolve(updated))
            .catch(reject);
        });
      });
    },
    [gun, user, updateEvent]
  );

  // Claim an item in an event
  const claimItem = useCallback(
    async (eventId: string, itemId: string, quantity: number) => {
      if (!gun || !user?.is) throw new Error('Not authenticated');
      const userPub = user.is.pub;
      const eventRef = gun.get('events').get(eventId);

      return new Promise((resolve, reject) => {
        eventRef.once((data: Event) => {
          if (!data) {
            reject(new Error('Event not found'));
            return;
          }

          const item = data.items.find(i => i.id === itemId);
          if (!item) {
            reject(new Error('Item not found'));
            return;
          }

          const currentClaimed = Object.values(item.claimed).reduce(
            (sum, qty) => sum + qty,
            0
          );
          if (currentClaimed + quantity > item.quantity) {
            reject(new Error('Not enough items available'));
            return;
          }

          const currentUserClaimed = item.claimed[userPub] || 0;
          eventRef
            .get('items')
            .get(itemId)
            .get('claimed')
            .get(userPub)
            .put(currentUserClaimed + quantity, (ack: any) => {
              if (ack.err) {
                reject(new Error('Failed to claim item'));
              } else {
                resolve({
                  ...data,
                  items: data.items.map(i =>
                    i.id === itemId
                      ? {
                          ...i,
                          claimed: {
                            ...i.claimed,
                            [userPub]: currentUserClaimed + quantity,
                          },
                        }
                      : i
                  ),
                });
              }
            });
        });
      });
    },
    [gun, user]
  );

  // Fetch an event by id
  const getEventById = useCallback(
    async (eventId: string) =>
      new Promise<Event | null>(resolve => {
        if (!gun) return resolve(null);
        gun
          .get('events')
          .get(eventId)
          .once((data: Event) => {
            if (data) {
              resolve({ ...data, id: eventId });
            } else {
              resolve(null);
            }
          });
      }),
    [gun]
  );

  return {
    events,
    createEvent,
    rsvpEvent,
    claimItem,
    updateEvent,
    getEventById,
  };
};
