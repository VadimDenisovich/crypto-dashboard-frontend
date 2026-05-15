import { useEffect, useRef, useState } from "react";
import { IconButton, Tooltip, type SxProps, type Theme } from "@mui/material";

import { useAuth } from "../../../auth/AuthContext";
import { TelegramIcon } from "./SocialIcons";
import { getTelegramWidgetConfig } from "../../../api/auth";

interface Props {
  sx?: SxProps<Theme>;
  onError?: (msg: string) => void;
}

declare global {
  interface Window {
    Telegram?: {
      Login?: {
        auth: (
          options: { bot_id: string; request_access?: string },
          cb: (data: unknown) => void,
        ) => void;
      };
    };
  }
}

const SCRIPT_ID = "telegram-widget-loader";
const SCRIPT_SRC = "https://telegram.org/js/telegram-widget.js?22";

function ensureScriptLoaded(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Telegram?.Login) return Promise.resolve();
  if (document.getElementById(SCRIPT_ID)) {
    return new Promise((resolve, reject) => {
      const tag = document.getElementById(SCRIPT_ID) as HTMLScriptElement;
      tag.addEventListener("load", () => resolve());
      tag.addEventListener("error", () => reject(new Error("script load failed")));
    });
  }
  return new Promise((resolve, reject) => {
    const tag = document.createElement("script");
    tag.id = SCRIPT_ID;
    tag.src = SCRIPT_SRC;
    tag.async = true;
    tag.onload = () => resolve();
    tag.onerror = () => reject(new Error("script load failed"));
    document.head.appendChild(tag);
  });
}

export function TelegramButton({ sx, onError }: Props) {
  const { loginWithTelegram } = useAuth();
  const [botUsername, setBotUsername] = useState<string | null>(null);
  const inFlight = useRef(false);

  useEffect(() => {
    let cancelled = false;
    getTelegramWidgetConfig()
      .then((cfg) => {
        if (!cancelled) setBotUsername(cfg.bot_username);
      })
      .catch(() => {
        if (!cancelled && onError) onError("Telegram пока не настроен");
      });
    return () => {
      cancelled = true;
    };
  }, [onError]);

  const handleClick = async () => {
    if (inFlight.current) return;
    if (!botUsername) {
      onError?.("Telegram пока не настроен");
      return;
    }
    inFlight.current = true;
    try {
      await ensureScriptLoaded();
      if (!window.Telegram?.Login) {
        throw new Error("Telegram widget unavailable");
      }
      window.Telegram.Login.auth(
        { bot_id: botUsername, request_access: "write" },
        (data) => {
          if (!data) {
            onError?.("Telegram: вход отменён");
            inFlight.current = false;
            return;
          }
          loginWithTelegram(data as never)
            .catch((e: Error) => onError?.(e.message ?? "Telegram login failed"))
            .finally(() => {
              inFlight.current = false;
            });
        },
      );
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Telegram error";
      onError?.(msg);
      inFlight.current = false;
    }
  };

  return (
    <Tooltip title={botUsername ? "Войти через Telegram" : "Telegram пока не настроен"}>
      <span>
        <IconButton
          onClick={handleClick}
          disabled={!botUsername}
          aria-label="Войти через Telegram"
          sx={{
            bgcolor: "#26A5E4",
            width: 56,
            height: 56,
            "&:hover": { bgcolor: "#1f8fc8" },
            "&.Mui-disabled": { bgcolor: "rgba(38,165,228,0.3)" },
            ...sx,
          }}
        >
          <TelegramIcon />
        </IconButton>
      </span>
    </Tooltip>
  );
}
