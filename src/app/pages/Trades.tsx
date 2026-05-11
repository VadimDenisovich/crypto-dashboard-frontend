import { 
  Box, Typography, Stack, Select, MenuItem, FormControl, InputLabel, 
  Button, Card, TableContainer, Table, TableHead, TableRow, TableCell, TableBody
} from '@mui/material';
import { Download, FilterList } from '@mui/icons-material';

const tradesData = [
  { id: "ORD-98231", time: "2025-05-08 14:32:01", pair: "BTC/USDT", strat: "SMA Cross BTC", type: "Buy", price: "67,450.00", amount: "0.05", fee: "0.67", total: "3,372.50" },
  { id: "ORD-98230", time: "2025-05-08 14:15:22", pair: "ETH/USDT", strat: "RSI ETH", type: "Sell", price: "3,450.20", amount: "1.20", fee: "0.41", total: "4,140.24" },
  { id: "ORD-98229", time: "2025-05-08 13:50:10", pair: "BTC/USDT", strat: "SMA Cross BTC", type: "Buy", price: "67,200.50", amount: "0.02", fee: "0.26", total: "1,344.01" },
  { id: "ORD-98228", time: "2025-05-08 13:10:05", pair: "SOL/USDT", strat: "Спотовый Grid #1", type: "Sell", price: "145.40", amount: "5.00", fee: "0.15", total: "727.00" },
  { id: "ORD-98227", time: "2025-05-08 12:45:33", pair: "BTC/USDT", strat: "SMA Cross BTC", type: "Sell", price: "67,800.00", amount: "0.05", fee: "0.68", total: "3,390.00" },
];

export function Trades() {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Stack direction={{ xs: 'column', lg: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', lg: 'center' }} spacing={2} mb={4}>
        <Typography variant="h1">История сделок</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} width={{ xs: '100%', lg: 'auto' }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select defaultValue="all"><MenuItem value="all">Все пары</MenuItem><MenuItem value="btc">BTC/USDT</MenuItem></Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select defaultValue="all"><MenuItem value="all">Все стратегии</MenuItem><MenuItem value="sma">SMA Cross</MenuItem></Select>
          </FormControl>
          <Button variant="outlined" color="inherit" startIcon={<FilterList />} sx={{ whiteSpace: 'nowrap' }}>
            Фильтры
          </Button>
        </Stack>
      </Stack>

      <Card sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TableContainer sx={{ flex: 1, overflowX: 'auto' }}>
          <Table stickyHeader sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell>ID Ордера</TableCell>
                <TableCell>Время</TableCell>
                <TableCell>Пара</TableCell>
                <TableCell>Стратегия</TableCell>
                <TableCell>Тип</TableCell>
                <TableCell align="right">Цена</TableCell>
                <TableCell align="right">Объём</TableCell>
                <TableCell align="right">Комиссия</TableCell>
                <TableCell align="right">Итого (USDT)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tradesData.map((trade) => (
                <TableRow key={trade.id} hover>
                  <TableCell><Typography variant="caption" fontFamily="monospace" color="text.secondary">{trade.id}</Typography></TableCell>
                  <TableCell><Typography variant="body2" noWrap>{trade.time}</Typography></TableCell>
                  <TableCell><Typography variant="body2" fontWeight="medium" noWrap>{trade.pair}</Typography></TableCell>
                  <TableCell><Typography variant="body2" color="text.secondary" noWrap>{trade.strat}</Typography></TableCell>
                  <TableCell><Typography variant="body2" color={trade.type === 'Buy' ? 'success.main' : 'error.main'}>{trade.type}</Typography></TableCell>
                  <TableCell align="right"><Typography variant="body2" noWrap>{trade.price}</Typography></TableCell>
                  <TableCell align="right"><Typography variant="body2" noWrap>{trade.amount}</Typography></TableCell>
                  <TableCell align="right"><Typography variant="body2" color="text.secondary" noWrap>{trade.fee}</Typography></TableCell>
                  <TableCell align="right"><Typography variant="body2" fontWeight="bold" noWrap>{trade.total}</Typography></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        {/* Footer */}
        <Box sx={{ p: 2, bgcolor: 'rgba(19, 23, 34, 0.5)', borderTop: 1, borderColor: 'divider', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Stack direction="row" spacing={{ xs: 2, md: 4 }} flexWrap="wrap" rowGap={1}>
            <Box><Typography variant="caption" color="text.secondary">Всего сделок:</Typography> <Typography variant="body2" component="span" fontWeight="bold">47</Typography></Box>
            <Box><Typography variant="caption" color="text.secondary">Общий объём:</Typography> <Typography variant="body2" component="span" fontWeight="bold">2.34 BTC</Typography></Box>
            <Box><Typography variant="caption" color="text.secondary">Комиссии:</Typography> <Typography variant="body2" component="span" fontWeight="bold">12.45 USDT</Typography></Box>
          </Stack>
          <Button variant="outlined" color="inherit" size="small" startIcon={<Download />}>
            Экспорт CSV
          </Button>
        </Box>
      </Card>
    </Box>
  );
}