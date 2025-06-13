export type GunEvent = {
  id: string;
  name: string;
  description?: string;
  creator: string; // pubkey
  date: string; // ISO string
  location?: string;
  invited: string[]; // pubkeys
  rsvps: { [pubkey: string]: 'yes' | 'no' | 'maybe' };
  items?: GunItem[];
  createdAt: string;
  updatedAt?: string;
};

export type GunItem = {
  id: string;
  name: string;
  claimedBy?: string; // pubkey
  quantity?: number;
};
