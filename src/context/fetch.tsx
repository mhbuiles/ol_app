import { type Component } from "@app/types";
import axios from "axios";
import { getAuthFromCache } from "@utils/auth-provider";
import type { AxiosInstance, AxiosRequestHeaders } from "axios";
import { createContext, useContext } from "react";
import { useEffect, useState } from "react";

type FetchState = {
  authRequest: AxiosInstance;
  publicRequest: AxiosInstance;
  hasToken: boolean;
  removeToken: () => void;
};

const FetchContext = createContext<FetchState | null>(null);

const TOKEN_KEY = "token";

const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const saveToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const getRequest = () =>
  axios.create({
    baseURL: import.meta.env.VITE_API_URL as string,
  });

const appendResponseInterceptors = (request: AxiosInstance) =>
  request.interceptors.response.use(
    (response) => {
      if (response.data) {
        // @ts-expect-error: this is a expected type error
        const transformKeys = (obj) => {
          if (typeof obj !== "object" || obj === null) {
            return obj;
          }

          if (Array.isArray(obj)) {
            return obj.map((item) => transformKeys(item));
          }

          const camelCaseObj = {};
          Object.keys(obj).forEach((key) => {
            const camelCaseKey = key.replace(/_([a-z])/g, (_match, p1) =>
              p1.toUpperCase(),
            );
            // @ts-expect-error: this is a expected type error
            camelCaseObj[camelCaseKey] = transformKeys(obj[key]);
          });
          return camelCaseObj;
        };

        // Transform keys in the response data
        response.data = transformKeys(response.data);
      }
      return response;
    },
    (error) => Promise.reject(error),
  );

const getAccessTokenFromCache = (): string => {
  const auth = getAuthFromCache(true);

  return auth[0].user + auth[0].password;
};

const FetchProvider: Component = ({ children }) => {
  const [token, setToken] = useState("");
  const accesTokenRef = getAccessTokenFromCache();

  const authRequest = getRequest();
  const publicRequest = getRequest();

  useEffect(() => {
    void (async () => {
      if (accesTokenRef) {
        const accessToken = accesTokenRef;
        setToken(accessToken);
        if (accessToken) {
          saveToken(accessToken);
        }
      }
    })();
  }, [accesTokenRef]);

  authRequest.interceptors.request.use(
    (config) => ({
      ...config,
      headers: {
        Authorization: `Bearer ${token}`,
      } as AxiosRequestHeaders,
    }),
    (error) => Promise.reject(error),
  );

  appendResponseInterceptors(publicRequest);
  appendResponseInterceptors(authRequest);

  return (
    <FetchContext.Provider
      value={{
        authRequest,
        publicRequest,
        hasToken: !!token,
        removeToken,
      }}
    >
      {children}
    </FetchContext.Provider>
  );
};

const useFetch = (): FetchState => {
  const context = useContext(FetchContext);
  if (!context) {
    throw new Error("useFetch must be used within a FetchProvider");
  }

  return context;
};
export { FetchProvider, useFetch };
