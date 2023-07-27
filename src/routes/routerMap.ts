const routerMap = new Map();
routerMap.set("home", { title: "home", path: "/" });
routerMap.set("dailyCheckIn", {
  title: "daily Check In",
  path: "/dailyCheckIn",
});
routerMap.set("todos", { title: "todos", path: "/todos" });
routerMap.set("reducer_todos", {
  title: "reducer todos",
  path: "/reducer_todos",
});
routerMap.set("lazy_tools", { title: "lazy tools", path: "/lazy_tools" });
routerMap.set("dashboard", { title: "dashboard", path: "/dashboard" });

const getPathByRouterName = (name: string) => routerMap.get(name)?.path;

const getRouterArray = () => {
  const routerArray: { title: string; path: string }[] = [];
  routerMap.forEach((v, k) => {
    routerArray.push(v);
  });
  return routerArray;
};
export { getPathByRouterName, getRouterArray, routerMap };
