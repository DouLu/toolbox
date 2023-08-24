import { RouteObject, defer, redirect } from "react-router-dom";
import MyLayout from "../layout";
import DailyCheckIn from "../pages/DailyCheckIn";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import ReducerTodos from "../pages/ReducerTodos";
import Todo from "../pages/Todo";
import Tools from "../pages/Tools";
import BlogList from "../pages/blog/admin/BlogList";
import Dashboard from "../pages/blog/admin/Dashboard";
import NewBlog from "../pages/blog/admin/NewBlog";
import Blog from "../pages/blog/user";
import BlogDetail from "../pages/blog/user/BlogDetail";
import { doRequest } from "../utils/request";

// const LazyTools = lazy(() => import("../pages/Tools"));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MyLayout />,
    errorElement: <ErrorPage />,
    loader: ({ request }) => {
      const pathname = new URL(request.url).pathname;
      if (pathname === "/") {
        return redirect("/home");
      }
      return null;
    },
    children: [
      {
        path: "/toolbox",
        loader: () => {
          return redirect("/home");
        },
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/todos",
        element: <Todo />,
      },
      {
        path: "/reducer_todos",
        element: <ReducerTodos />,
      },
      {
        path: "/tools",
        // element: <LazyTools />,
        element: <Tools />,
        loader: async () => {
          return defer({ list: doRequest("test", "GET", null, true) });
        },
      },
      {
        path: "/dailyCheckIn",
        element: <DailyCheckIn />,
      },
      // admin pages
      {
        path: "/blogManagement",
        loader: ({ request }) => {
          const pathname = new URL(request.url).hostname;
          if (pathname === "/blogManagement") {
            return redirect("/blogManagement/dashboard");
          }
          return null;
        },
      },
      {
        path: "/blogManagement/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/blogManagement/blogList",
        element: <BlogList />,
      },
      {
        path: "/blogManagement/newBlog/:blogId?",
        element: <NewBlog />,
      },
      // user pages
      {
        path: "/blog",
        element: <Blog />,
      },
      { path: "/blog/:blogId", element: <BlogDetail /> },
    ],
  },
];
