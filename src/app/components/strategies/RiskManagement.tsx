import { Card, CardContent, Typography, Grid, TextField, Box, Switch } from "@mui/material";

export function RiskManagement() {
  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h2" mb={3}>
          4. Риск-менеджмент
        </Typography>
        <Grid container spacing={3} mb={3}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Take-Profit (%)"
              size="small"
              defaultValue="10"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Stop-Loss (%)"
              size="small"
              defaultValue="5"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Макс. просадка (%)"
              size="small"
              defaultValue="15"
              fullWidth
            />
          </Grid>
        </Grid>
        <Box pt={3} borderTop={1} borderColor="divider">
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box
                p={2}
                bgcolor="background.default"
                border={1}
                borderColor="divider"
                borderRadius={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="body2" fontWeight="bold">
                    Trailing Stop
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    20% от пика прибыли
                  </Typography>
                </Box>
                <Switch />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }}>
              <TextField
                label="Цена Stop-Loss"
                size="small"
                placeholder="< 60000"
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }}>
              <TextField
                label="Цена Take-Profit"
                size="small"
                placeholder="> 75000"
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
