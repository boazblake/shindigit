export interface Event {
  createdOn: string;
  updatedOn: string;
  createdBy: string;
  updatedBy: string;
  id: string;
  title: string;
  description: string;
  location: string;
  capacity: number;
  isPrivate: boolean;
  startDateTime: string;
  endDateTime: string;
  isAllDay: boolean;
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

export type RSVPstatus = 'yes' | 'no' | 'maybe';
