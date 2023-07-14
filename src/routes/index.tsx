import { RouteObject } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Tools from "../pages/Tools";
import ErrorPage from "../pages/ErrorPage";
import MyLayout from "../layout";

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
    ],
  },
];
