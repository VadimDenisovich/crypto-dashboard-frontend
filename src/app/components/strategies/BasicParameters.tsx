import { Card, CardContent, Typography, Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface BasicParametersProps {
  marketType: string;
  setMarketType: (val: string) => void;
}

export function BasicParameters({ marketType, setMarketType }: BasicParametersProps) {
  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h2" mb={3}>
          1. Основные параметры
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Биржа</InputLabel>
              <Select defaultValue="binance" label="Биржа">
                <MenuItem value="binance">Binance Testnet</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Тип рынка</InputLabel>
              <Select
                value={marketType}
                label="Тип рынка"
                onChange={(e) => setMarketType(e.target.value)}
              >
                <MenuItem value="spot">Spot</MenuItem>
                <MenuItem value="futures">Futures</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Торговая пара</InputLabel>
              <Select defaultValue="btc" label="Торговая пара">
                <MenuItem value="btc">BTC/USDT</MenuItem>
                <MenuItem value="eth">ETH/USDT</MenuItem>
                <MenuItem value="sol">SOL/USDT</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
