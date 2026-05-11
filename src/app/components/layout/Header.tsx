import { AppBar, Toolbar, Box, IconButton, Stack, Typography } from "@mui/material";
import { Menu as MenuIcon, KeyboardArrowDown } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

interface HeaderProps {
  drawerWidth: number;
  isResizing: boolean;
  handleDrawerToggle: () => void;
}

export function Header({ drawerWidth, isResizing, handleDrawerToggle }: HeaderProps) {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
        transition: isResizing
          ? "none"
          : theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              bgcolor: "background.default",
              border: 1,
              borderColor: "divider",
              borderRadius: 2,
              px: 1.5,
              py: 0.5,
              cursor: "pointer",
            }}
          >
            <Typography variant="body2" sx={{ mr: 1, fontWeight: 500 }}>
              Binance Testnet
            </Typography>
            <KeyboardArrowDown fontSize="small" color="action" />
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
