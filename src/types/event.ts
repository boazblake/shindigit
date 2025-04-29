export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  isPrivate: string;
  createdBy: string;
  capacity: number;
  rsvps: Record<string, RSVPstatus>;
  invited: Record<string, boolean>;
  timestamp: number;
  items: Record<string, EventItem>;
}

export type EventItem = {
  name: string;
  quantity: number;
  claimed: Record<string, number>;
};

export type RSVPstatus = "yes" | "no" | "maybe";
