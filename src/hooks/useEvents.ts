import { useEffect, useState, useCallback } from 'react';
import { gun } from '@services/gunService';
import { Event, EventItem, RSVPstatus } from '../types/event';
import { authService } from '@services/authService';
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
  itemInputs: { name: string; quantity: number; }[];
}

export const useEvents = () => {
  const { gun, user } = useGun();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (!gun || !user?.is) return;

    let isSubscribed = true;

    gun.get('events').map().once((data: any, key: string) => {
      if (!isSubscribed) return;
      
      if (data) {
        const event = { ...data, id: key };
        setEvents(prev => {
          const exists = prev.find(e => e.id === key);
          if (exists) {
            return prev.map(e => e.id === key ? event : e);
          }
          return [...prev, event];
        });
      }
    });

    return () => {
      isSubscribed = false;
    };
  }, [gun, user]);

  const createEvent = async (input: CreateEventInput) => {
    if (!gun || !user?.is) throw new Error('Not authenticated');

    const userPub = user.is.pub;
    const eventRef = gun.get('events').set({
      title: input.title,
      description: input.description,
      location: input.location,
      capacity: input.capacity,
      isPrivate: input.isPrivate,
      startDateTime: input.startDateTime,
      endDateTime: input.endDateTime,
      isAllDay: input.isAllDay,
      creator: userPub,
      rsvps: {},
      items: input.itemInputs.map(item => ({
        id: crypto.randomUUID(),
        name: item.name,
        quantity: item.quantity,
        claimed: {}
      }))
    });

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

  const rsvpEvent = async (eventId: string, rsvp: RSVPstatus) => {
    if (!gun || !user?.is) throw new Error('Not authenticated');

    const userPub = user.is.pub;
    const eventRef = gun.get('events').get(eventId);

    return new Promise((resolve, reject) => {
      eventRef.once((data: Event) => {
        if (!data) {
          reject(new Error('Event not found'));
          return;
        }

        const isCreator = data.creator === userPub;
        const isInvited = data.isPrivate ? data.rsvps[userPub] !== undefined : true;

        if (!isCreator && !isInvited) {
          reject(new Error('Not invited to this event'));
          return;
        }

        if (rsvp === 'going' && data.capacity > 0) {
          const currentGoing = Object.values(data.rsvps).filter(r => r === 'going').length;
          if (currentGoing >= data.capacity) {
            reject(new Error('Event is at capacity'));
            return;
          }
        }

        eventRef.get('rsvps').get(userPub).put(rsvp, (ack: any) => {
          if (ack.err) {
            reject(new Error('Failed to update RSVP'));
          } else {
            resolve({ ...data, rsvps: { ...data.rsvps, [userPub]: rsvp } });
          }
        });
      });
    });
  };

  const claimItem = async (eventId: string, itemId: string, quantity: number) => {
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

        const currentClaimed = Object.values(item.claimed).reduce((sum, qty) => sum + qty, 0);
        if (currentClaimed + quantity > item.quantity) {
          reject(new Error('Not enough items available'));
          return;
        }

        const currentUserClaimed = item.claimed[userPub] || 0;
        eventRef.get('items').get(itemId).get('claimed').get(userPub).put(currentUserClaimed + quantity, (ack: any) => {
          if (ack.err) {
            reject(new Error('Failed to claim item'));
          } else {
            resolve({
              ...data,
              items: data.items.map(i => 
                i.id === itemId 
                  ? { ...i, claimed: { ...i.claimed, [userPub]: currentUserClaimed + quantity } }
                  : i
              )
            });
          }
        });
      });
    });
  };

  return {
    events,
    createEvent,
    rsvpEvent,
    claimItem
  };
};
