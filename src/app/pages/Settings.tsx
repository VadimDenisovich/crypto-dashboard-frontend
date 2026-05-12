import { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Switch,
  Alert,
} from "@mui/material";
import { Key, Security, Save, CheckCircleOutline } from "@mui/icons-material";

export function Settings() {
  const [binanceTested, setBinanceTested] = useState(false);

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", pb: 6 }}>
      <Box mb={4}>
        <Typography variant="h1" gutterBottom>
          Настройки
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Управление API ключами и глобальными параметрами риска.
        </Typography>
      </Box>

      <Stack spacing={2}>
        {/* Секция API */}
        <Card>
          <Box p={3} borderBottom={1} borderColor="divider">
            <Stack direction="row" alignItems="center" spacing={1.5} mb={1}>
              <Key color="primary" />
              <Typography variant="h2">API ключи тестовых сетей</Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary">
              Для работы требуются ключи только от Testnet окружений.
            </Typography>
          </Box>
          <CardContent sx={{ p: 3 }}>
            <Box mb={4}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: "#eab308",
                    }}
                  />
                  <Typography variant="subtitle1" fontWeight="bold">
                    Binance Testnet
                  </Typography>
                </Stack>
                {binanceTested && (
                  <Alert
                    icon={<CheckCircleOutline fontSize="inherit" />}
                    severity="success"
                    sx={{ py: 0, px: 2, "& .MuiAlert-message": { py: 0.5 } }}
                  >
                    Соединение успешно
                  </Alert>
                )}
              </Stack>
              <Grid container spacing={3} mb={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="API Key"
                    size="small"
                    defaultValue="************************abc123"
                    fullWidth
                    type="password"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Secret Key"
                    size="small"
                    defaultValue="************************xyz890"
                    fullWidth
                    type="password"
                  />
                </Grid>
              </Grid>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => setBinanceTested(true)}
              >
                Проверить соединение
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Секция Рисков */}
        <Card>
          <Box p={3} borderBottom={1} borderColor="divider">
            <Stack direction="row" alignItems="center" spacing={1.5} mb={1}>
              <Security color="primary" />
              <Typography variant="h2">
                Общие параметры и Риск-менеджмент
              </Typography>
            </Stack>
          </Box>
          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={3} mb={4}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.primary" mb={1.5}>
                  Макс. доля капитала на одну сделку (%)
                </Typography>
                <TextField
                  type="number"
                  size="small"
                  defaultValue="10"
                  fullWidth
                />
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  mt={1}
                >
                  Ни одна стратегия не сможет использовать более указанного
                  процента.
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.primary" mb={1.5}>
                  Глобальный Stop-Loss (%)
                </Typography>
                <TextField
                  type="number"
                  size="small"
                  defaultValue="5"
                  fullWidth
                />
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  mt={1}
                >
                  Принудительное закрытие всех позиций стратегии.
                </Typography>
              </Grid>
            </Grid>

            <Box
              p={2}
              bgcolor="background.default"
              border={1}
              borderColor="divider"
              borderRadius={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box pr={2}>
                <Typography variant="body2" fontWeight="bold">
                  Остановка движка при критической ошибке
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Автоматически приостанавливать все торги при ошибках API
                  биржи.
                </Typography>
              </Box>
              <Switch defaultChecked />
            </Box>

            <Stack
              direction="row"
              justifyContent="flex-end"
              pt={4}
              mt={4}
              borderTop={1}
              borderColor="divider"
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<Save />}
                size="large"
              >
                Сохранить настройки
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
