import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import { getOAuthStartUrl } from "../../api/auth";
import { EmailCodeForm } from "../components/auth/EmailCodeForm";
import { TelegramButton } from "../components/auth/TelegramButton";
import {
  GitHubIcon,
  GoogleIcon,
  YandexIcon,
} from "../components/auth/SocialIcons";

interface LocationState {
  from?: string;
}

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as LocationState | null)?.from ?? "/";

  const [oauthError, setOauthError] = useState<string | null>(null);

  const goOAuth = (provider: "google" | "yandex" | "github") => {
    window.location.href = getOAuthStartUrl(provider);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        bgcolor: "background.default",
      }}
    >
      <Card sx={{ maxWidth: 440, width: "100%" }}>
        <CardContent sx={{ p: 4 }}>
          <Box textAlign="center" mb={3}>
            <Typography variant="h1" mb={0.5}>
              Crypto Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Вход или регистрация
            </Typography>
          </Box>

          {/* 4 круглые соц-кнопки */}
          <Stack
            direction="row"
            justifyContent="center"
            spacing={2.5}
            mb={3}
          >
            <Tooltip title="Войти через Google">
              <IconButton
                onClick={() => goOAuth("google")}
                aria-label="Google"
                sx={{
                  bgcolor: "#fff",
                  width: 56,
                  height: 56,
                  border: "1px solid #2a2e39",
                  "&:hover": { bgcolor: "#f1f5f9" },
                }}
              >
                <GoogleIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Войти через Яндекс">
              <IconButton
                onClick={() => goOAuth("yandex")}
                aria-label="Яндекс"
                sx={{
                  bgcolor: "#FC3F1D",
                  width: 56,
                  height: 56,
                  "&:hover": { bgcolor: "#e0361a" },
                }}
              >
                <YandexIcon />
              </IconButton>
            </Tooltip>
            <TelegramButton onError={setOauthError} />
            <Tooltip title="Войти через GitHub">
              <IconButton
                onClick={() => goOAuth("github")}
                aria-label="GitHub"
                sx={{
                  bgcolor: "#0d1117",
                  width: 56,
                  height: 56,
                  border: "1px solid #2a2e39",
                  "&:hover": { bgcolor: "#1f242c" },
                }}
              >
                <GitHubIcon />
              </IconButton>
            </Tooltip>
          </Stack>

          {oauthError && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setOauthError(null)}>
              {oauthError}
            </Alert>
          )}

          <Divider sx={{ mb: 3 }}>
            <Typography variant="caption" color="text.secondary">
              ИЛИ
            </Typography>
          </Divider>

          <EmailCodeForm onSuccess={() => navigate(from, { replace: true })} />

          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            textAlign="center"
            mt={3}
          >
            Регистрация автоматическая — войдите любым способом, и аккаунт будет создан.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
