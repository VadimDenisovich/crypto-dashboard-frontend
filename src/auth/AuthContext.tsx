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
  isReady: boolean; // первая проверка /auth/me завершена
  isAuthenticated: boolean;
  /** Запросить email-код (бэк отправит письмо через Resend). */
  requestCode: (email: string, captchaToken: string) => Promise<void>;
  /** Проверить код, после чего пользователь становится залогинен. */
  verifyCode: (email: string, code: string) => Promise<void>;
  /** Залогинить через Telegram Login Widget payload. */
  loginWithTelegram: (payload: authApi.TelegramAuthPayload) => Promise<void>;
  /** Принять токены из OAuth callback URL и подгрузить /auth/me. */
  consumeCallbackTokens: (access: string, refresh: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserOut | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const access = getAccessToken();
    if (!access) {
      setIsReady(true);
      return;
    }
    authApi
      .me()
      .then(setUser)
      .catch(() => {
        clearTokens();
        setUser(null);
      })
      .finally(() => setIsReady(true));
  }, []);

  const refreshMe = useCallback(async () => {
    const u = await authApi.me();
    setUser(u);
  }, []);

  const requestCode = useCallback(async (email: string, captchaToken: string) => {
    await authApi.requestEmailCode(email, captchaToken);
  }, []);

  const verifyCode = useCallback(
    async (email: string, code: string) => {
      await authApi.verifyEmailCode(email, code);
      await refreshMe();
    },
    [refreshMe],
  );

  const loginWithTelegram = useCallback(
    async (payload: authApi.TelegramAuthPayload) => {
      await authApi.loginWithTelegramPayload(payload);
      await refreshMe();
    },
    [refreshMe],
  );

  const consumeCallbackTokens = useCallback(
    async (access: string, refresh: string) => {
      authApi.consumeCallbackTokens(access, refresh);
      await refreshMe();
    },
    [refreshMe],
  );

  const logout = useCallback(() => {
    authApi.logout();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isReady,
      isAuthenticated: user !== null,
      requestCode,
      verifyCode,
      loginWithTelegram,
      consumeCallbackTokens,
      logout,
    }),
    [user, isReady, requestCode, verifyCode, loginWithTelegram, consumeCallbackTokens, logout],
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
