import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import MyLayout from "../layout";
import DailyCheckIn from "../pages/DailyCheckIn";
import Dashboard from "../pages/Dashboard";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import ReducerTodos from "../pages/ReducerTodos";
import Todo from "../pages/Todo";
import { getPathByRouterName } from "./routerMap";

const LazyTools = lazy(() => import("../pages/Tools"));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MyLayout />,
    errorElement: <ErrorPage />,
    // loader: rootLoader,
    children: [
      {
        path: getPathByRouterName("home"),
        element: <Home />,
      },
      {
        path: getPathByRouterName("todos"),
        element: <Todo />,
        // loader: async () => {
        //   return fetch(API_HOST + "todos").then((res) => res.json());
        // },
      },
      {
        path: getPathByRouterName("reducer_todos"),
        element: <ReducerTodos />,
      },
      {
        path: getPathByRouterName("dashboard"),
        element: <Dashboard />,
      },
      {
        path: getPathByRouterName("lazy_tools"),
        element: <LazyTools />,
      },
      {
        path: getPathByRouterName("dailyCheckIn"),
        element: <DailyCheckIn />,
      },
    ],
  },
];
