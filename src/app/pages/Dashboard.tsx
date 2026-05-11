import { Grid } from "@mui/material";
import { BalanceWidget } from "../components/dashboard/BalanceWidget";
import { PositionsWidget } from "../components/dashboard/PositionsWidget";
import { ChartWidget } from "../components/dashboard/ChartWidget";
import { RecentTradesWidget } from "../components/dashboard/RecentTradesWidget";
import { EngineStatusWidget } from "../components/dashboard/EngineStatusWidget";

export function Dashboard() {
  return (
    <Grid container spacing={2}>
      {/* Widget 1: Balance & P&L */}
      <Grid size={{ xs: 12, md: 6, lg: 6 }}>
        <BalanceWidget />
      </Grid>

      {/* Widget 2: Open Positions */}
      <Grid size={{ xs: 12, md: 6, lg: 6 }}>
        <PositionsWidget />
      </Grid>

      {/* Widget 3: Chart */}
      <Grid size={{ xs: 12, md: 12, lg: 12 }}>
        <ChartWidget />
      </Grid>

      {/* Widget 4: Recent Trades */}
      <Grid size={{ xs: 12, md: 8, lg: 8 }}>
        <RecentTradesWidget />
      </Grid>

      {/* Widget 5: Engine Status */}
      <Grid size={{ xs: 12, md: 4, lg: 4 }}>
        <EngineStatusWidget />
      </Grid>
    </Grid>
  );
}
