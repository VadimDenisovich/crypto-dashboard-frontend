import {
  Box,
  Typography,
  Stack,
  Grid,
  Card,
  CardContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
} from "@mui/material";
import { PlayArrow, Save } from "@mui/icons-material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
} from "recharts";

const equityData = [
  { time: "Jan", equity: 1000 },
  { time: "Feb", equity: 1020 },
  { time: "Mar", equity: 980 },
  { time: "Apr", equity: 1050 },
  { time: "May", equity: 1070 },
  { time: "Jun", equity: 1120 },
  { time: "Jul", equity: 1090 },
  { time: "Aug", equity: 1150 },
  { time: "Sep", equity: 1124 },
];

export function Backtesting() {
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        mb={3}
      >
        <Typography variant="h1">Бэктестинг стратегий</Typography>
        <Button variant="outlined" color="inherit" startIcon={<Save />}>
          Сохранить результат
        </Button>
      </Stack>

      <Grid container spacing={2} sx={{ flex: 1, minHeight: 0 }}>
        {/* Левая колонка: Форма */}
        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 2.5,
              }}
            >
              <Typography variant="h3">Параметры теста</Typography>

              <FormControl size="small" fullWidth>
                <InputLabel>Пара</InputLabel>
                <Select defaultValue="btc" label="Пара">
                  <MenuItem value="btc">BTC/USDT</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" fullWidth>
                <InputLabel>Таймфрейм</InputLabel>
                <Select defaultValue="15m" label="Таймфрейм">
                  <MenuItem value="15m">15m</MenuItem>
                  <MenuItem value="1h">1h</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" fullWidth>
                <InputLabel>Стратегия</InputLabel>
                <Select defaultValue="sma" label="Стратегия">
                  <MenuItem value="sma">SMA Cross</MenuItem>
                </Select>
              </FormControl>

              <Box
                p={2}
                bgcolor="background.default"
                borderRadius={2}
                border={1}
                borderColor="divider"
              >
                <Typography
                  variant="caption"
                  fontWeight="bold"
                  display="block"
                  mb={2}
                  color="text.secondary"
                >
                  Параметры стратегии
                </Typography>
                <Stack spacing={2}>
                  <TextField
                    label="Период MA1"
                    size="small"
                    type="number"
                    defaultValue="50"
                    fullWidth
                  />
                  <TextField
                    label="Период MA2"
                    size="small"
                    type="number"
                    defaultValue="200"
                    fullWidth
                  />
                  <TextField
                    label="Размер позиции"
                    size="small"
                    defaultValue="0.001 BTC"
                    fullWidth
                  />
                </Stack>
              </Box>

              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <TextField
                    label="Нач. депозит"
                    size="small"
                    type="number"
                    defaultValue="1000"
                    fullWidth
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <TextField
                    label="Комиссия (%)"
                    size="small"
                    defaultValue="0.1"
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Box mt="auto" pt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<PlayArrow />}
                  size="large"
                >
                  Запустить бэктест
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Правая колонка: Результаты */}
        <Grid
          size={{ xs: 12, md: 8, lg: 9 }}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          {/* Метрики над графиком */}
          <Card>
            <CardContent sx={{ py: 2.5, "&:last-child": { pb: 2.5 } }}>
              <Stack
                direction={{ xs: "column", sm: "row", md: "row" }}
                spacing={2}
                justifyContent="space-between"
                divider={
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ display: { xs: "none", sm: "block" } }}
                  />
                }
              >
                {[
                  {
                    label: "Общая доходность",
                    val: "+12.4%",
                    color: "success.main",
                  },
                  {
                    label: "Profit Factor",
                    val: "1.85",
                    color: "text.primary",
                  },
                  { label: "Sharpe Ratio", val: "1.12", color: "text.primary" },
                  { label: "Max Drawdown", val: "-8.7%", color: "error.main" },
                  {
                    label: "Прибыльных сделок",
                    val: "58%",
                    color: "text.primary",
                  },
                  { label: "Всего сделок", val: "89", color: "text.primary" },
                ].map((stat, i) => (
                  <Box key={i} sx={{ textAlign: "center", flex: 1 }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      mb={0.5}
                      noWrap
                    >
                      {stat.label}
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      color={stat.color}
                    >
                      {stat.val}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <CardContent
              sx={{ flex: 1, display: "flex", flexDirection: "column" }}
            >
              <Typography variant="subtitle2" color="text.secondary" mb={2}>
                Кривая доходности (Equity)
              </Typography>
              <Box sx={{ flex: 1, width: "100%", minHeight: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={equityData}
                    margin={{ top: 5, right: 0, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#2a2e39"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="time"
                      stroke="#64748b"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      domain={["auto", "auto"]}
                      stroke="#64748b"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e222d",
                        borderColor: "#2a2e39",
                        color: "#fff",
                      }}
                    />
                    <ReferenceArea
                      x1="Feb"
                      x2="Mar"
                      fill="#ef4444"
                      fillOpacity={0.1}
                    />
                    <ReferenceArea
                      x1="Jun"
                      x2="Jul"
                      fill="#ef4444"
                      fillOpacity={0.1}
                    />
                    <Line
                      type="monotone"
                      dataKey="equity"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ r: 3, fill: "#3b82f6", strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
