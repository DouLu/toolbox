import { useEffect, useState } from "react";
import { API_HOST } from "../utils";

/**
 * state tree
 * columnInfo
 * columns
 * todos
 * todoInfo
 * action type
 * 2. edit column - columnInfo数据要更新
 * 2. add column - todos数据更新
 * 2. delete column - todos数据更新
 * @returns
 */
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

  useEffect(() => {
    getTodoList();
  }, []);

  return { todoList };
}
