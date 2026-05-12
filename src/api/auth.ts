import { apiFetch, setTokens, clearTokens } from "./client";
import type { TokenPair, UserOut } from "./types";

export async function register(email: string, password: string): Promise<UserOut> {
  return apiFetch<UserOut>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    skipAuthRetry: true,
  });
}

export async function login(email: string, password: string): Promise<TokenPair> {
  const pair = await apiFetch<TokenPair>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    skipAuthRetry: true,
  });
  setTokens(pair.access_token, pair.refresh_token);
  return pair;
}

export async function me(): Promise<UserOut> {
  return apiFetch<UserOut>("/auth/me");
}

export function logout(): void {
  clearTokens();
}
