import { gun } from "./gunService";

interface GunUser {
  is: { alias: string; pub: string } | null;
  leave: () => void;
  create: (
    alias: string,
    password: string,
    callback: (result: { err?: string; pub?: string }) => void,
  ) => void;
  auth: (
    alias: string,
    password: string,
    callback: (result: { err?: string; pub?: string }) => void,
  ) => void;
}

interface User {
  alias: string;
  pub: string;
}

const user = gun.user() as GunUser;

export const authService = {
  signup: (alias: string, password: string) =>
    new Promise<User>((resolve, reject) => {
      user.create(alias, password, (result) => {
        if (result.err) {
          reject(new Error(`Signup failed: ${result.err}`));
        } else {
          resolve({ alias, pub: result.pub || "" });
        }
      });
    }),

  login: (alias: string, password: string) =>
    new Promise<User>((resolve, reject) => {
      user.auth(alias, password, (result) => {
        if (result.err) {
          reject(new Error(`Login failed: ${result.err}`));
        } else {
          resolve({ alias, pub: result.pub || "" });
        }
      });
    }),

  logout: () => {
    if (user.is) {
      user.leave();
    }
  },

  getCurrentUser: (): User | null => {
    if (user.is) {
      return { alias: user.is.alias, pub: user.is.pub };
    }
    return null;
  },

  userInstance: user,
};
