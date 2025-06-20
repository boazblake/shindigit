import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { authService } from '@services/authService';

export type User = {
  pub: string;
  alias: string;
} | null;

export type UserContextProvider = {
  user: User;
  signup: (alias: string, password: string) => Promise<unknown>;
  login: (alias: string, password: string) => Promise<unknown>;
  logout: () => void;
};

export const UserContext = createContext<UserContextProvider | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser({ pub: currentUser.pub, alias: currentUser.alias });
    }
  }, []);

  const signup = async (alias: string, password: string) => {
    await authService.signup(alias, password);
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser({ pub: currentUser.pub, alias: currentUser.alias });
    }
  };

  const login = async (alias: string, password: string) => {
    await authService.login(alias, password);
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser({ pub: currentUser.pub, alias: currentUser.alias });
    }
  };
  const logout = () => {
    authService.logout(), setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  console.log('user', context);
  if (!context) {
    throw new Error('useUserContext must be used within a useprovider');
  }
  return context;
};
