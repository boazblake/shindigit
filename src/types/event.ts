export interface Event {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  rsvps: Record<string, boolean>;
  timestamp: number;
}
