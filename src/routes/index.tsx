import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import MyLayout from "../layout";
import DailyCheckIn from "../pages/DailyCheckIn";
import Dashboard from "../pages/Dashboard";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Tools from "../pages/Tools";

const LazyTools = lazy(() => import("../pages/Tools"));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MyLayout />,
    errorElement: <ErrorPage />,
    // loader: rootLoader,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "tools",
        element: <Tools />,
      },
      {
        path: "lazy_tools",
        element: <LazyTools />,
      },
      {
        path: "dailyCheckIn",
        element: <DailyCheckIn />,
      },
    ],
  },
];
