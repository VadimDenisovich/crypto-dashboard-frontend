import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";

const chartData = [
  { time: "10:00", price: 67200, sma50: 67100, sma200: 66900, signal: null },
  { time: "10:15", price: 67350, sma50: 67150, sma200: 66920, signal: "buy" },
  { time: "10:30", price: 67450, sma50: 67220, sma200: 66940, signal: null },
  { time: "10:45", price: 67520, sma50: 67300, sma200: 66960, signal: null },
  { time: "11:00", price: 67610, sma50: 67380, sma200: 66980, signal: null },
  { time: "11:15", price: 67500, sma50: 67420, sma200: 67000, signal: "sell" },
  { time: "11:30", price: 67300, sma50: 67430, sma200: 67020, signal: null },
];

export function ChartWidget() {
  return (
    <Card
      sx={{
        height: "100%",
        minHeight: 400,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent
        sx={{ flex: 1, display: "flex", flexDirection: "column", p: 3 }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
          mb={3}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <FormControl size="small">
              <Select defaultValue="BTC/USDT" sx={{ minWidth: 120 }}>
                <MenuItem value="BTC/USDT">BTC/USDT</MenuItem>
                <MenuItem value="ETH/USDT">ETH/USDT</MenuItem>
              </Select>
            </FormControl>
            <Stack
              direction="row"
              spacing={0.5}
              bgcolor="background.default"
              p={0.5}
              borderRadius={1}
              border={1}
              borderColor="divider"
            >
              {["1m", "5m", "15m", "1h"].map((tf) => (
                <Button
                  key={tf}
                  size="small"
                  variant={tf === "15m" ? "contained" : "text"}
                  color={tf === "15m" ? "primary" : "inherit"}
                  sx={{ minWidth: 0, px: 1.5, py: 0.5 }}
                >
                  {tf}
                </Button>
              ))}
            </Stack>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Stack direction="row" alignItems="center">
              <Box sx={{ width: 12, height: 2, bgcolor: "#3b82f6", mr: 1 }} />
              <Typography variant="caption">Цена</Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
              <Box sx={{ width: 12, height: 2, bgcolor: "#a855f7", mr: 1 }} />
              <Typography variant="caption">SMA 50</Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
              <Box sx={{ width: 12, height: 2, bgcolor: "#f97316", mr: 1 }} />
              <Typography variant="caption">SMA 200</Typography>
            </Stack>
          </Stack>
        </Stack>

        <Box sx={{ flex: 1, width: "100%", minHeight: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
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
              <Area
                type="monotone"
                dataKey="price"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPrice)"
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="sma50"
                stroke="#a855f7"
                strokeWidth={1.5}
                dot={false}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="sma200"
                stroke="#f97316"
                strokeWidth={1.5}
                dot={false}
                isAnimationActive={false}
              />
              {chartData.map((entry, index) => {
                if (entry.signal === "buy")
                  return (
                    <ReferenceDot
                      key={`buy-${index}`}
                      x={entry.time}
                      y={entry.price}
                      r={4}
                      fill="#22c55e"
                      stroke="none"
                    />
                  );
                if (entry.signal === "sell")
                  return (
                    <ReferenceDot
                      key={`sell-${index}`}
                      x={entry.time}
                      y={entry.price}
                      r={4}
                      fill="#ef4444"
                      stroke="none"
                    />
                  );
                return null;
              })}
            </ComposedChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
