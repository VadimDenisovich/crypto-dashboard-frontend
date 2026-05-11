import { Link as RouterLink } from "react-router";
import {
  Box,
  Grid,
  Card,
  Typography,
  Stack,
  Button,
  IconButton,
  Chip,
} from "@mui/material";
import {
  Add,
  Pause,
  Stop,
  Settings as SettingsIcon,
} from "@mui/icons-material";

const strategies = [
  {
    id: 1,
    name: "SMA Cross BTC",
    status: "Активна",
    pair: "BTC/USDT",
    timeframe: "15m",
    exchange: "Binance Testnet",
    pnl: "+1.8%",
    pnlColor: "success.main",
  },
  {
    id: 2,
    name: "RSI ETH",
    status: "Приостановлена",
    pair: "ETH/USDT",
    timeframe: "5m",
    exchange: "Binance Testnet",
    pnl: "-0.4%",
    pnlColor: "error.main",
  },
  {
    id: 3,
    name: "Спотовый Grid #1",
    status: "Остановлена",
    pair: "SOL/USDT",
    timeframe: "-",
    exchange: "Bybit Testnet",
    pnl: "+5.2%",
    pnlColor: "success.main",
  },
];

export function Strategies() {
  return (
    <Box sx={{ maxWidth: 1200, mx: "auto" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        mb={4}
      >
        <Typography variant="h1">Стратегии</Typography>
        <Button
          component={RouterLink}
          to="/strategies/new"
          variant="contained"
          color="primary"
          startIcon={<Add />}
        >
          Создать стратегию
        </Button>
      </Stack>

      <Grid container spacing={2}>
        {strategies.map((strat) => (
          <Grid size={{ xs: 12, sm: 12, md: 3, lg: 4 }} key={strat.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                p: 2,
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                mb={2}
              >
                <Typography
                  variant="h3"
                  noWrap
                  title={strat.name}
                  sx={{ maxWidth: "60%" }}
                >
                  {strat.name}
                </Typography>
                <Chip
                  label={strat.status}
                  size="small"
                  color={
                    strat.status === "Активна"
                      ? "success"
                      : strat.status === "Приостановлена"
                        ? "warning"
                        : "default"
                  }
                  variant="outlined"
                />
              </Stack>

              <Stack spacing={1.5} mb={3} flexGrow={1}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Пара
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {strat.pair}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Таймфрейм
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {strat.timeframe}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Биржа
                  </Typography>
                  <Typography variant="body2" fontWeight="medium" noWrap>
                    {strat.exchange}
                  </Typography>
                </Stack>
                <Box pt={1.5} mt={1} borderTop={1} borderColor="divider">
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      Прибыль
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      color={strat.pnlColor}
                    >
                      {strat.pnl}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>

              <Grid container spacing={1} mt="auto">
                <Grid size={{ xs: 4 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="inherit"
                    disabled={
                      strat.status === "Остановлена" ||
                      strat.status === "Приостановлена"
                    }
                    sx={{ p: 1, minWidth: 0 }}
                  >
                    <Pause fontSize="small" />
                  </Button>
                </Grid>
                <Grid size={{ xs: 4 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    disabled={strat.status === "Остановлена"}
                    sx={{ p: 1, minWidth: 0 }}
                  >
                    <Stop fontSize="small" />
                  </Button>
                </Grid>
                <Grid size={{ xs: 4 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="inherit"
                    sx={{ p: 1, minWidth: 0 }}
                  >
                    <SettingsIcon fontSize="small" />
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
