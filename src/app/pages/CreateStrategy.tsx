import { useState } from "react";
import { Link as RouterLink } from "react-router";
import {
  Box,
  Typography,
  Stack,
  IconButton,
  Button,
  Alert,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

import { BasicParameters } from "../components/strategies/BasicParameters";
import { StrategySelection } from "../components/strategies/StrategySelection";
import { GridParameters } from "../components/strategies/GridParameters";
import { RiskManagement } from "../components/strategies/RiskManagement";

export function CreateStrategy() {
  const [marketType, setMarketType] = useState("spot");
  const [strategyType, setStrategyType] = useState("grid-spot");

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", pb: 6 }}>
      <Stack direction="row" alignItems="center" mb={4} spacing={2}>
        <IconButton component={RouterLink} to="/strategies" color="inherit">
          <ArrowBack />
        </IconButton>
        <Typography variant="h1">Новая стратегия</Typography>
      </Stack>

      <Stack spacing={4}>
        <BasicParameters
          marketType={marketType}
          setMarketType={setMarketType}
        />

        <StrategySelection
          marketType={marketType}
          strategyType={strategyType}
          setStrategyType={setStrategyType}
        />

        <GridParameters />

        <RiskManagement />

        {/* Warning Banner */}
        {marketType === "futures" && (
          <Alert severity="warning" variant="outlined" sx={{ borderRadius: 2 }}>
            <Typography variant="body2">
              <strong>Высокое кредитное плечо.</strong> Использование плеча
              значительно увеличивает риск ликвидации. Пожалуйста, убедитесь,
              что вы настроили Stop-Loss.
            </Typography>
          </Alert>
        )}

        {/* Actions */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="flex-end"
          spacing={2}
          pt={2}
        >
          <Button
            component={RouterLink}
            to="/strategies"
            variant="outlined"
            color="inherit"
          >
            Отмена
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              bgcolor: "#2a2e39",
              color: "white",
              "&:hover": { bgcolor: "#3b4050" },
            }}
          >
            Сохранить
          </Button>
          <Button variant="contained" color="primary">
            Сохранить и запустить
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
