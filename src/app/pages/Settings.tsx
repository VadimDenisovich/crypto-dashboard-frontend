import { useEffect, useState, type FormEvent } from "react";
import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Chip,
  IconButton,
} from "@mui/material";
import { Key, CheckCircleOutline, DeleteOutline } from "@mui/icons-material";

import { ApiHttpError } from "../../api/client";
import {
  createCredential,
  deleteCredential,
  listCredentials,
} from "../../api/credentials";
import type { CredentialOut } from "../../api/types";

export function Settings() {
  const [creds, setCreds] = useState<CredentialOut[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [label, setLabel] = useState("Binance Testnet");
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const refresh = async () => {
    setLoadError(null);
    try {
      const data = await listCredentials();
      setCreds(data);
    } catch (err) {
      setLoadError(err instanceof ApiHttpError ? err.message : "Не удалось загрузить ключи");
      setCreds([]);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);
    setSubmitting(true);
    try {
      await createCredential({
        exchange: "binance",
        label: label.trim() || "Binance Testnet",
        api_key: apiKey.trim(),
        api_secret: apiSecret.trim(),
        testnet: true,
      });
      setApiKey("");
      setApiSecret("");
      setSubmitSuccess(true);
      await refresh();
    } catch (err) {
      setSubmitError(
        err instanceof ApiHttpError ? err.message : "Не удалось сохранить ключи",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Удалить эти ключи? Боты, использующие их, перестанут работать.")) return;
    try {
      await deleteCredential(id);
      await refresh();
    } catch (err) {
      setLoadError(err instanceof ApiHttpError ? err.message : "Не удалось удалить");
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", pb: 6 }}>
      <Box mb={4}>
        <Typography variant="h1" gutterBottom>
          Настройки
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Управление API ключами тестовых сетей. Бэк валидирует ключ через биржу в
          sandbox-режиме, а затем шифрует и сохраняет в БД (Fernet).
        </Typography>
      </Box>

      <Stack spacing={3}>
        {/* Существующие ключи */}
        <Card>
          <Box p={3} borderBottom={1} borderColor="divider">
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Key color="primary" />
              <Typography variant="h2">Подключённые ключи</Typography>
            </Stack>
          </Box>
          <CardContent sx={{ p: 3 }}>
            {loadError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {loadError}
              </Alert>
            )}
            {creds === null ? (
              <Box display="flex" justifyContent="center" py={4}>
                <CircularProgress size={28} />
              </Box>
            ) : creds.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                Ещё ничего не добавлено. Заполните форму ниже.
              </Typography>
            ) : (
              <Stack spacing={1.5}>
                {creds.map((c) => (
                  <Box
                    key={c.id}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    p={2}
                    border={1}
                    borderColor="divider"
                    borderRadius={2}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Chip
                        label={c.exchange}
                        size="small"
                        color="primary"
                        sx={{ textTransform: "uppercase" }}
                      />
                      <Box>
                        <Typography variant="body2" fontWeight="bold">
                          {c.label}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          добавлен{" "}
                          {new Date(c.created_at).toLocaleString("ru-RU", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })}
                        </Typography>
                      </Box>
                    </Stack>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => onDelete(c.id)}
                      aria-label="Удалить ключи"
                    >
                      <DeleteOutline fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Stack>
            )}
          </CardContent>
        </Card>

        {/* Форма добавления */}
        <Card>
          <Box p={3} borderBottom={1} borderColor="divider">
            <Typography variant="h2">Добавить ключ Binance Testnet</Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              Получить ключи: <code>testnet.binance.vision</code> → API Management →
              Generate.
            </Typography>
          </Box>
          <CardContent sx={{ p: 3 }}>
            <form onSubmit={onSubmit}>
              <Stack spacing={2.5}>
                {submitError && <Alert severity="error">{submitError}</Alert>}
                {submitSuccess && (
                  <Alert severity="success" icon={<CheckCircleOutline />}>
                    Ключ проверен и сохранён.
                  </Alert>
                )}
                <TextField
                  label="Название (для удобства)"
                  size="small"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  fullWidth
                  disabled={submitting}
                />
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="API Key"
                      size="small"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      fullWidth
                      required
                      disabled={submitting}
                      autoComplete="off"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Secret Key"
                      size="small"
                      type="password"
                      value={apiSecret}
                      onChange={(e) => setApiSecret(e.target.value)}
                      fullWidth
                      required
                      disabled={submitting}
                      autoComplete="off"
                    />
                  </Grid>
                </Grid>
                <Box>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={submitting || !apiKey || !apiSecret}
                  >
                    {submitting ? "Проверяем ключ..." : "Сохранить"}
                  </Button>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                    mt={1.5}
                  >
                    Проверка занимает 2–5 секунд: бэк делает fetch_balance к Binance
                    Testnet, чтобы убедиться что ключ валиден.
                  </Typography>
                </Box>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
