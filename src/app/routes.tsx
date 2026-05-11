import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Strategies } from "./pages/Strategies";
import { CreateStrategy } from "./pages/CreateStrategy";
import { Trades } from "./pages/Trades";
import { Backtesting } from "./pages/Backtesting";
import { Logs } from "./pages/Logs";
import { Settings } from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "strategies", Component: Strategies },
      { path: "strategies/new", Component: CreateStrategy },
      { path: "trades", Component: Trades },
      { path: "backtesting", Component: Backtesting },
      { path: "logs", Component: Logs },
      { path: "settings", Component: Settings },
    ],
  },
]);
