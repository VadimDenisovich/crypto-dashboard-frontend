import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import { QueryStats } from "@mui/icons-material";

export function EngineStatusWidget() {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: "50%",
              bgcolor: "rgba(59, 130, 246, 0.1)",
              color: "primary.main",
              display: "flex",
            }}
          >
            <QueryStats />
          </Box>
          <Box>
            <Typography variant="body1" fontWeight="medium">
              Статус движка
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              spacing={0.5}
              color="success.main"
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: "success.main",
                }}
              />
              <Typography variant="caption">Запущен</Typography>
            </Stack>
          </Box>
        </Stack>
        <Stack spacing={1}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">
              Uptime:
            </Typography>
            <Typography variant="body2">3ч 12м</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">
              Активных стратегий:
            </Typography>
            <Typography variant="body2">2</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
