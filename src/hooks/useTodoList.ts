import { useEffect, useState } from "react";
import { API_HOST } from "../utils";

export default function useTodoList() {
  const [todoList, setTodoList] = useState<
    { id: number; title: string; desc: string }[]
  >([]);

  const getTodoList = () => {
    setTimeout(() => {
      fetch(API_HOST + "test")
        .then((res) => res.json())
        .then((res) => {
          setTodoList(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 2000);
  };
  // FIXME: 不要在这里使用，放到页面渲染的地方去，不然每次调用该hooks都触发了request
  useEffect(() => {
    getTodoList();
  }, []);

  return { todoList };
}
