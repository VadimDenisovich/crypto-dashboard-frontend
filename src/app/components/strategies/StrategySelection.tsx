import { Card, CardContent, Typography, Grid } from "@mui/material";
import { GridOn, AttachMoney, Bolt, TrendingUp } from "@mui/icons-material";

interface StrategySelectionProps {
  marketType: string;
  strategyType: string;
  setStrategyType: (val: string) => void;
}

export function StrategySelection({ marketType, strategyType, setStrategyType }: StrategySelectionProps) {
  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h2" mb={3}>
          2. Выбор стратегии
        </Typography>
        <Grid container spacing={2}>
          {[
            {
              id: "grid-spot",
              icon: GridOn,
              title: "Спотовый Grid",
              desc: "Сетка диапазонов",
              type: "spot",
            },
            {
              id: "dca",
              icon: AttachMoney,
              title: "DCA-бот",
              desc: "Усреднение цены",
              type: "spot",
            },
            {
              id: "grid-futures",
              icon: Bolt,
              title: "Фьючерсный Grid",
              desc: "Сетка с плечом",
              type: "futures",
            },
            {
              id: "martingale",
              icon: TrendingUp,
              title: "Мартингейл",
              desc: "Докупка при просадке",
              type: "futures",
            },
          ].map((strat) => {
            const disabled =
              (marketType === "spot" && strat.type === "futures") ||
              (marketType === "futures" && strat.type === "spot");
            const selected = strategyType === strat.id;

            return (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={strat.id}>
                <Card
                  variant="outlined"
                  sx={{
                    p: 2,
                    cursor: disabled ? "not-allowed" : "pointer",
                    height: "100%",
                    borderColor: selected ? "primary.main" : "divider",
                    bgcolor: selected
                      ? "rgba(59, 130, 246, 0.05)"
                      : "background.paper",
                    opacity: disabled ? 0.5 : 1,
                    transition: "all 0.2s",
                    "&:hover": !disabled
                      ? { borderColor: "primary.main" }
                      : {},
                  }}
                  onClick={() => !disabled && setStrategyType(strat.id)}
                >
                  <strat.icon
                    color={selected ? "primary" : "action"}
                    sx={{ mb: 1.5, fontSize: 32 }}
                  />
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    gutterBottom
                  >
                    {strat.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {strat.desc}
                  </Typography>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
}
