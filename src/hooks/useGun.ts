import { useGunContext } from '../contexts/GunContext';

export const useGun = () => {
  const gun = useGunContext();
  if (!gun) {
    throw new Error('useGun must be used within a GunProvider');
  }
  return { gun, user: gun.user() };
};
