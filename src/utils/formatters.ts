export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

export const formatPubKey = (pubkey: string): string =>
  pubkey.length > 12 ? pubkey.slice(0, 6) + '...' + pubkey.slice(-6) : pubkey;

export const capitalize = (s: string): string =>
  s.charAt(0).toUpperCase() + s.slice(1);
