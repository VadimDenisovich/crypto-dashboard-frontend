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
  Button,
} from "@mui/material";

export function PositionsWidget() {
  return (
    <Card sx={{ height: "100%" }}>
      <Box p={2} borderBottom={1} borderColor="divider">
        <Typography variant="subtitle2" color="text.secondary">
          Открытые позиции
        </Typography>
      </Box>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Пара / Тип</TableCell>
              <TableCell align="right">Объём / P&L</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hover>
              <TableCell>
                <Typography variant="body2" fontWeight="medium">
                  BTC/USDT
                </Typography>
                <Typography variant="caption" color="success.main">
                  Long
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2">0.05 BTC</Typography>
                <Typography variant="caption" color="success.main">
                  +0.24%
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Button size="small" variant="outlined" color="inherit">
                  Закрыть
                </Button>
              </TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell>
                <Typography variant="body2" fontWeight="medium">
                  ETH/USDT
                </Typography>
                <Typography variant="caption" color="success.main">
                  Long
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2">1.2 ETH</Typography>
                <Typography variant="caption" color="error.main">
                  -0.87%
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Button size="small" variant="outlined" color="inherit">
                  Закрыть
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
