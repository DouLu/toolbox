type MenuRouterProps = {
  title: string;
  path: string;
  children?: MenuRouterProps[];
};

const MENU_ROUTERS: MenuRouterProps[] = [
  { title: "home", path: "/home" },
  {
    title: "daily Check In",
    path: "/dailyCheckIn",
  },
  { title: "todos", path: "/todos" },
  {
    title: "reducer todos",
    path: "/reducer_todos",
  },
  { title: "tools", path: "/tools" },
  { title: "h5下拉刷新", path: "/pullRefresh" },
  {
    title: "blog management",
    path: "/blogManagement",
    children: [
      { title: "dashboard", path: "/blogManagement/dashboard" },
      { title: "blog list", path: "/blogManagement/blogList" },
      { title: "new blog", path: "/blogManagement/newBlog/:blogId?" },
    ],
  },
];

const getMenuItems = (
  routers: MenuRouterProps[],
  renderLabel?: (router: { path: string; title: string }) => React.ReactElement
): any[] => {
  return routers.map(({ title, path, children }) => {
    if (children?.length) {
      return {
        key: title,
        label: title,
        children: getMenuItems(children, renderLabel),
      };
    }
    return {
      key: title,
      label: renderLabel?.({ path, title }) || title,
    };
  });
};

export { MENU_ROUTERS, getMenuItems };
