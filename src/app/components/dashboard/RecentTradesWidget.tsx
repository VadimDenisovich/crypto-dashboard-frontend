import {
  Card,
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";
import { PlayCircleOutline } from "@mui/icons-material";

const recentTrades = [
  {
    id: 1,
    time: "14:32:01",
    pair: "BTC/USDT",
    type: "Buy",
    price: "67,450.00",
    amount: "0.05",
    fee: "0.67",
  },
  {
    id: 2,
    time: "14:15:22",
    pair: "ETH/USDT",
    type: "Sell",
    price: "3,450.20",
    amount: "1.20",
    fee: "0.41",
  },
  {
    id: 3,
    time: "13:50:10",
    pair: "BTC/USDT",
    type: "Buy",
    price: "67,200.50",
    amount: "0.02",
    fee: "0.26",
  },
  {
    id: 4,
    time: "13:10:05",
    pair: "BNB/USDT",
    type: "Sell",
    price: "580.40",
    amount: "5.00",
    fee: "0.29",
  },
];

export function RecentTradesWidget() {
  return (
    <Card sx={{ height: "100%" }}>
      <Box
        p={2}
        borderBottom={1}
        borderColor="divider"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="subtitle2" color="text.secondary">
          История последних сделок
        </Typography>
        <Chip
          size="small"
          icon={<PlayCircleOutline />}
          label="Автообновление"
          color="success"
          variant="outlined"
          sx={{ border: "none" }}
        />
      </Box>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Время</TableCell>
              <TableCell>Пара</TableCell>
              <TableCell>Тип</TableCell>
              <TableCell align="right">Цена</TableCell>
              <TableCell align="right">Объём</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentTrades.map((trade) => (
              <TableRow key={trade.id} hover>
                <TableCell>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {trade.time}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="medium" noWrap>
                    {trade.pair}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    color={trade.type === "Buy" ? "success.main" : "error.main"}
                  >
                    {trade.type}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" noWrap>
                    {trade.price}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" noWrap>
                    {trade.amount}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
