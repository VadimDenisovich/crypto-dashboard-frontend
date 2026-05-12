import { useState, type FormEvent } from "react";
import { Link as RouterLink, useNavigate } from "react-router";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
  Alert,
  Link,
} from "@mui/material";

import { useAuth } from "../../auth/AuthContext";
import { ApiHttpError } from "../../api/client";

export function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== passwordConfirm) {
      setError("Пароли не совпадают");
      return;
    }
    if (password.length < 8) {
      setError("Пароль должен быть не короче 8 символов");
      return;
    }
    setLoading(true);
    try {
      await register(email, password);
      navigate("/", { replace: true });
    } catch (err) {
      const msg =
        err instanceof ApiHttpError ? err.message : "Не удалось зарегистрироваться";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

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
      <Card sx={{ maxWidth: 420, width: "100%" }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h1" mb={1}>
            Регистрация
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Создайте аккаунт для начала торговли
          </Typography>

          <form onSubmit={onSubmit}>
            <Stack spacing={2}>
              {error && <Alert severity="error">{error}</Alert>}
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                fullWidth
              />
              <TextField
                label="Пароль"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                helperText="Минимум 8 символов"
              />
              <TextField
                label="Повторите пароль"
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={loading}
              >
                {loading ? "Создание..." : "Зарегистрироваться"}
              </Button>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                Уже есть аккаунт?{" "}
                <Link component={RouterLink} to="/login">
                  Войти
                </Link>
              </Typography>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
