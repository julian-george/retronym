import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";

import BASE_API_URL from "../url";

const API_URL = BASE_API_URL + "/auth";

interface User {
  username: string;
  id: string;
}

interface UserContextType {
  user: User | null;
  token: string | null;
  tokenLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string) => Promise<boolean>;
  loginFromToken: (token: string) => Promise<boolean>;
  logout: () => boolean;
}

// Create the context with a default value
const UserContext = createContext<UserContextType | null>(null);

const TOKEN_NAME = "retronym_auth_token=";

// https://www.w3schools.com/js/js_cookies.asp
function getCookie() {
  return sessionStorage.getItem(TOKEN_NAME);
}

function deleteCookie() {
  sessionStorage.removeItem(TOKEN_NAME);
}

// Provider component that wraps your app and makes user info available everywhere
const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [tokenLoading, setTokenLoading] = useState<boolean>(true);
  useEffect(() => {
    setTokenLoading(true);
    const storedToken = getCookie();
    if (storedToken)
      loginFromToken(storedToken).then((success) => {
        if (success) {
          setToken(storedToken);
        } else {
          deleteCookie();
        }
        setTokenLoading(false);
      });
    else setTokenLoading(false);
  }, []);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem(TOKEN_NAME, token);
    }
  }, [token]);
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
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
  const loginFromToken = useCallback(
    async (storedToken: string) => {
      console.log("loginfrom");
      return axios
        .post<{ token: string }, { success: boolean; data: any }>(
          API_URL + "/login-token",
          {
            token: storedToken,
          }
        )
        .then(({ data: { success, data } }) => {
          if (success) {
            // using stored token, not up to date token
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${storedToken}`;
            setUser(data);
            return true;
          }
          return false;
        })
        .catch((err) => {
          console.error(err);
          return false;
        });
    },
    [setUser]
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
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    deleteCookie();
    return true;
  }, [setUser, setToken]);

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        tokenLoading,
        login,
        register,
        loginFromToken,
        logout,
      }}
    >
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
