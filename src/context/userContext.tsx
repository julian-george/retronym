import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import axios from "axios";

import BASE_API_URL from "../url";

const API_URL = BASE_API_URL + "/users";

interface User {
  username: string;
}

interface UserContextType {
  user: User | null;
  token: string | null;
  // setUser: Dispatch<SetStateAction<User | null>>;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string) => Promise<boolean>;
}

// Create the context with a default value
const UserContext = createContext<UserContextType | null>(null);

// Provider component that wraps your app and makes user info available everywhere
const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  console.log(user);
  const login = useCallback(
    async (username: string, password: string) => {
      return axios
        .post<
          { username: string; password: string },
          { success: boolean; token?: string; data: any }
        >(API_URL + "/login", {
          username,
          password,
        })
        .then(({ data: { success, token, data } }) => {
          if (success && token) {
            setUser(data);
            setToken(token);
            return true;
          } else return false;
        })
        .catch((err) => {
          console.error(err);
          return false;
        });
    },
    [setUser, setToken]
  );

  const register = useCallback(
    async (username: string, password: string) => {
      return axios
        .post<
          { username: string; password: string },
          { success: boolean; token?: string; data: any }
        >(API_URL + "/register", {
          username,
          password,
        })
        .then(({ data: { success, token, data } }) => {
          if (success && token) {
            setUser(data);
            setToken(token);
            return true;
          } else return false;
        })
        .catch((err) => {
          console.error(err);
          return false;
        });
    },
    [setUser, setToken]
  );

  return (
    <UserContext.Provider value={{ user, token, login, register }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook for child components to get the user object and re-render when it changes
const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, useUser };
