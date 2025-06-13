export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  capacity: number;
  isPrivate: boolean;
  startDateTime: string;
  endDateTime: string;
  isAllDay: boolean;
  creator: string;
  rsvps: Record<string, RSVPstatus>;
  items: EventItem[];
  invited?: Record<string, boolean>;
}

export interface EventItem {
  id: string;
  name: string;
  quantity: number;
  claimed: Record<string, number>;
}

export type RSVPstatus = 'going' | 'not_going' | 'maybe';
