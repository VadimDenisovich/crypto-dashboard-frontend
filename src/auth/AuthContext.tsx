import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import * as authApi from "../api/auth";
import { clearTokens, getAccessToken } from "../api/client";
import type { UserOut } from "../api/types";

interface AuthContextValue {
  user: UserOut | null;
  isReady: boolean; // initial /auth/me проверка завершена
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserOut | null>(null);
  const [isReady, setIsReady] = useState(false);

  // На монтировании: если есть access_token — попробуем /auth/me.
  useEffect(() => {
    const access = getAccessToken();
    if (!access) {
      setIsReady(true);
      return;
    }
    authApi
      .me()
      .then((u) => setUser(u))
      .catch(() => {
        clearTokens();
        setUser(null);
      })
      .finally(() => setIsReady(true));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    await authApi.login(email, password);
    const u = await authApi.me();
    setUser(u);
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    await authApi.register(email, password);
    // После регистрации сразу логиним — бэк не выдаёт токен на /register.
    await authApi.login(email, password);
    const u = await authApi.me();
    setUser(u);
  }, []);

  const logout = useCallback(() => {
    authApi.logout();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isReady,
      isAuthenticated: user !== null,
      login,
      register,
      logout,
    }),
    [user, isReady, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (ctx === null) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}
