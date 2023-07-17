import { useEffect, useState } from "react";
import { API_HOST } from "../utils";

export default function useTodoList() {
  const [todoList, setTodoList] = useState<
    { id: number; title: string; desc: string }[]
  >([]);

  const getTodoList = () => {
    setTimeout(() => {
      fetch(API_HOST + "todoList")
        .then((res) => res.json())
        .then((res) => {
          setTodoList(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 2000);
  };

  useEffect(() => {
    getTodoList();
  }, []);

  return { todoList };
}
