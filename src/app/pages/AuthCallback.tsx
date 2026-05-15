import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Alert, Box, CircularProgress, Stack, Typography } from "@mui/material";

import { useAuth } from "../../auth/AuthContext";

export function AuthCallback() {
  const { consumeCallbackTokens } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const access = params.get("access");
    const refresh = params.get("refresh");

    if (!access || !refresh) {
      navigate("/login", { replace: true });
      return;
    }

    // Стираем токены из адресной строки сразу — чтобы не светились в истории.
    window.history.replaceState({}, "", "/auth/callback");

    consumeCallbackTokens(access, refresh)
      .then(() => navigate("/", { replace: true }))
      .catch((e: Error) => {
        setError(e.message ?? "Не удалось завершить вход");
      });
  }, [consumeCallbackTokens, location.search, navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Stack alignItems="center" spacing={2}>
        {error ? (
          <>
            <Alert severity="error">{error}</Alert>
            <Box
              component="a"
              href="/login"
              sx={{ color: "primary.main", textDecoration: "underline" }}
            >
              Вернуться к входу
            </Box>
          </>
        ) : (
          <>
            <CircularProgress />
            <Typography variant="body2" color="text.secondary">
              Завершаем вход…
            </Typography>
          </>
        )}
      </Stack>
    </Box>
  );
}
