import { Card, CardContent, Typography, Stack } from "@mui/material";
import { CallMade } from "@mui/icons-material";

export function BalanceWidget() {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Баланс и P&L
        </Typography>
        <Stack direction="row" alignItems="baseline" spacing={1} mb={0.5}>
          <Typography variant="h4" fontWeight="bold">
            12 345.67
          </Typography>
          <Typography variant="body1" color="text.secondary">
            USDT
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" color="success.main" mb={3}>
          <CallMade fontSize="small" sx={{ mr: 0.5 }} />
          <Typography variant="body2" fontWeight="bold">
            +3.42% за сессию
          </Typography>
        </Stack>

        <Stack spacing={1.5} pt={2} borderTop={1} borderColor="divider">
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">
              Открытая прибыль/убыток
            </Typography>
            <Typography variant="body2" color="success.main" fontWeight="bold">
              +187.23 USDT
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">
              Количество позиций
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              2
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
