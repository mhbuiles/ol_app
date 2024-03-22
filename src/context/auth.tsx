import { NavigateFunction } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { RoutePaths } from "@utils/constants";
import { useAsync } from "@utils/hooks";
import * as authProvider from "@utils/auth-provider";
import { createContext, useContext, useEffect } from "react";

type UserAttr = authProvider.AuthAttr[number];

const bootstrapAppData = async (): Promise<UserAttr | null> => {
  const auth = authProvider.getAuthFromCache();

  if (auth) {
    try {
      return auth[0];
    } catch (error) {
      authProvider.removeAuthInCache();

      return null;
    }
  }

  return null;
};

type AuthContextState = {
  user: UserAttr | null;
  setData: (data: UserAttr | null) => void;
};

const AuthContext = createContext<AuthContextState | null>(null);
if (import.meta.env.DEV) {
  AuthContext.displayName = "AuthContext";
}

type AuthProviderProps = {
  children?: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps): React.ReactElement => {
  const { run, setData, ...bootstrapAppDataQuery } =
    useAsync<UserAttr | null>();

  useEffect(() => {
    run(bootstrapAppData());
  }, [run]);

  return (
    <AuthContext.Provider
      value={{ user: bootstrapAppDataQuery.data!, setData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const login = async (
  setData: (data: UserAttr | null) => void,
  credentials: Parameters<typeof authProvider.login>[0],
): Promise<void> => {
  const auth = await authProvider.login(credentials);
  setData(auth[0]);
};

const logout = (
  setData: (data: UserAttr | null) => void,
  queryClient: QueryClient,
  navigate: NavigateFunction,
): void => {
  void authProvider.logout();
  queryClient.clear();
  setData(null);
  navigate(RoutePaths.login, { replace: true });
};

const useAuth = (): AuthContextState => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }

  return context;
};

const useUser = (): UserAttr => {
  const { user } = useAuth();

  if (!user) {
    throw new Error("useUser must be used after a successful user's login");
  }

  return user;
};

export { AuthProvider, useAuth, login, logout, useUser };
export type { AuthContextState, UserAttr };
