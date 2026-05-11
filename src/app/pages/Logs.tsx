import { 
  Box, Typography, Stack, Button, Card, TextField, 
  Select, MenuItem, FormControl, InputAdornment
} from '@mui/material';
import { Pause, DeleteOutline, Search } from '@mui/icons-material';

const logLines = [
  { time: "2025-05-08 14:32:01", level: "INFO", message: "Strategy SMA Cross #1: BUY signal generated for BTC/USDT at 67450.32" },
  { time: "2025-05-08 14:32:02", level: "INFO", message: "OrderExecutor: LIMIT BUY order placed #12345" },
  { time: "2025-05-08 14:32:15", level: "WARNING", message: "RiskManager: Position size exceeds threshold warning level (5%)" },
  { time: "2025-05-08 14:33:01", level: "ERROR", message: "ExchangeAdapter: connection timeout, retrying in 5000ms..." },
  { time: "2025-05-08 14:33:06", level: "INFO", message: "ExchangeAdapter: connection re-established successfully" },
  { time: "2025-05-08 14:40:00", level: "INFO", message: "Strategy RSI ETH: monitoring condition RSI < 30" },
];

export function Logs() {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2} mb={4}>
        <Typography variant="h1">Журнал событий</Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" color="inherit" startIcon={<Pause />}>Пауза</Button>
          <Button variant="outlined" color="error" startIcon={<DeleteOutline />}>Очистить</Button>
        </Stack>
      </Stack>

      <Card sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', bgcolor: 'rgba(19, 23, 34, 0.5)' }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'stretch', md: 'center' }}>
            <Stack direction="row" spacing={1}>
              <Button size="small" variant="outlined" sx={{ color: 'info.main', borderColor: 'info.dark' }}>INFO</Button>
              <Button size="small" variant="outlined" sx={{ color: 'warning.main', borderColor: 'warning.dark' }}>WARNING</Button>
              <Button size="small" variant="outlined" sx={{ color: 'error.main', borderColor: 'error.dark' }}>ERROR</Button>
            </Stack>
            <Box sx={{ display: { xs: 'none', md: 'block' }, width: 1, height: 24, bgcolor: 'divider' }} />
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <Select defaultValue="all"><MenuItem value="all">Все стратегии</MenuItem></Select>
            </FormControl>
            <TextField 
              size="small" 
              placeholder="Поиск по тексту..." 
              sx={{ flexGrow: 1, maxWidth: { md: 300 } }}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment>
              }}
            />
          </Stack>
        </Box>

        <Box sx={{ flex: 1, overflowY: 'auto', p: 2, bgcolor: '#000', fontFamily: 'monospace' }}>
          <Stack spacing={1}>
            {logLines.map((log, i) => (
              <Box key={i} sx={{ display: 'flex', gap: 2, py: 0.5, px: 1, borderRadius: 1, '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}>
                <Typography variant="body2" fontFamily="monospace" color="text.secondary" sx={{ flexShrink: 0, width: { xs: 80, sm: 150 } }} noWrap>
                  [{log.time.split(' ')[1]}]
                </Typography>
                <Typography 
                  variant="body2" 
                  fontFamily="monospace" 
                  fontWeight="bold" 
                  sx={{ 
                    flexShrink: 0, width: 80,
                    color: log.level === 'INFO' ? 'info.main' : log.level === 'WARNING' ? 'warning.main' : 'error.main' 
                  }}
                >
                  [{log.level}]
                </Typography>
                <Typography variant="body2" fontFamily="monospace" sx={{ wordBreak: 'break-all' }}>
                  {log.message}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Card>
    </Box>
  );
}