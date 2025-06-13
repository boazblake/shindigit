export const isValidPubKey = (pubkey: string): boolean =>
  typeof pubkey === 'string' && /^[0-9a-fA-F]{40,}$/.test(pubkey);

export const isValidEventName = (name: string): boolean =>
  typeof name === 'string' && name.trim().length > 2 && name.length < 100;

export const isValidRSVP = (status: string): boolean =>
  ['yes', 'no', 'maybe'].includes(status);
