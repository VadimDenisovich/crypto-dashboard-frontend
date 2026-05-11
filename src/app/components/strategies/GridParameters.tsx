import { Card, CardContent, Typography, Grid, Stack, TextField, Button, FormControl, Select, MenuItem } from "@mui/material";

export function GridParameters() {
  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h2" mb={3}>
          3. Параметры: Спотовый Grid-бот
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" color="text.secondary" mb={1}>
              Ценовой диапазон (USDT)
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <TextField
                size="small"
                placeholder="Мин"
                defaultValue="60000"
                fullWidth
              />
              <Typography>-</Typography>
              <TextField
                size="small"
                placeholder="Макс"
                defaultValue="75000"
                fullWidth
              />
              <Button variant="outlined" sx={{ minWidth: "auto" }}>
                Авто
              </Button>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="body2" color="text.secondary" mb={1}>
              Количество сеток
            </Typography>
            <TextField
              size="small"
              type="number"
              defaultValue="10"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="body2" color="text.secondary" mb={1}>
              Тип сетки
            </Typography>
            <FormControl fullWidth size="small">
              <Select defaultValue="arithmetic">
                <MenuItem value="arithmetic">Арифметическая</MenuItem>
                <MenuItem value="geometric">Геометрическая</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" color="text.secondary" mb={1}>
              Инвестирование
            </Typography>
            <FormControl fullWidth size="small">
              <Select defaultValue="quote">
                <MenuItem value="quote">Quote (USDT)</MenuItem>
                <MenuItem value="base">Base (BTC)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" color="text.secondary" mb={1}>
              Объём инвестиций
            </Typography>
            <TextField
              size="small"
              defaultValue="1000"
              InputProps={{
                endAdornment: (
                  <Typography variant="caption" color="text.secondary">
                    USDT
                  </Typography>
                ),
              }}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" color="text.secondary" mb={1}>
              Цена входа (опц.)
            </Typography>
            <TextField size="small" placeholder="Рыночная" fullWidth />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
