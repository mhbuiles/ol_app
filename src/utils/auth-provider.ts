import { publicRequest } from "@utils/public-request";

const AUTH_KEY = "auth";
const TOKEN_KEY = "token";

type AuthAttr = Array<{
  id: number;
  user_id: number;
  user: string;
  password: string;
}>;

const removeAuthInCache = (): void => window.localStorage.removeItem(AUTH_KEY);
const removeToken = (): void => window.localStorage.removeItem(TOKEN_KEY);

const setAuthInCache = (auth: AuthAttr): void =>
  window.localStorage.setItem(AUTH_KEY, JSON.stringify(auth));

/**
 *
 * @description Retrieves the user's auth state from localStorage
 */
function getAuthFromCache(throwOnNoCache: true): AuthAttr;
function getAuthFromCache(throwOnNoCache?: false): AuthAttr | null;
function getAuthFromCache(throwOnNoCache = false): AuthAttr | null {
  const serializedAuthState = localStorage.getItem(AUTH_KEY);

  if (serializedAuthState) {
    return JSON.parse(serializedAuthState) as AuthAttr;
  }

  if (throwOnNoCache) {
    throw new Error(
      "throwOnNoCache = true must be used after a successful user's login",
    );
  }

  return null;
}

/**
 * @description Retrieves the user's auth information and creates a cache with it in localStorage
 */
const login = async ({
  user,
  password,
}: {
  user: string;
  password: string;
}): Promise<AuthAttr> => {
  const response = await publicRequest.get<AuthAttr>("/login", {
    params: {
      user,
      password,
    },
  });

  const auth = response.data;

  if (!auth.length) {
    throw new Error("Invalid credentials");
  }

  setAuthInCache(auth);

  return auth;
};

/**
 * @description Revokes the user's refresh token and clears the auth cache. It must be used after a successful user's login
 */
const logout = async (): Promise<void> => {
  removeAuthInCache();
  removeToken();
};

export { login, logout, getAuthFromCache, removeAuthInCache };
export type { AuthAttr };
