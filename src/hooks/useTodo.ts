import { useState } from "react";
import { ColumsType } from "../components/TodoColumsModal";
import { API_HOST } from "../utils";
import { CategoriesType } from "./../components/CategoriesCard";
import { TodoItemType } from "./../components/TodoModal";

export default function useTodo() {
  const [todoList, setTodoList] = useState<CategoriesType[]>();
  const [columsInfo, setColumsInfo] = useState<ColumsType>();
  const [todoInfo, setTodoInfo] = useState<TodoItemType>();

  // @ts-ignore
  const setUnionList = ([columnList, todoList]) => {
    const unionList = (columnList as ColumsType[]).map((c) => {
      const items = (todoList as TodoItemType[]).filter(
        (t) => t.categoryId === c.id
      );
      return { ...c, items };
    });
    setTodoList(unionList);
  };

  const getTodoColumnList = () =>
    fetch(API_HOST + "todoColumnList")
      .then((res) => res.json())
      .catch((err) => console.log(err));

  const getTodoList = () =>
    fetch(API_HOST + "todoList")
      .then((res) => res.json())
      .catch((err) => console.log(err));

  const getUnionList = () => {
    Promise.all([getTodoColumnList(), getTodoList()])
      .then(setUnionList)
      .catch((err) => {
        console.log("🚀 ~ file: useTodo.ts:31 ~ Promise.all ~ err:", err);
      });
  };

  const getTodoColumsById = (id: number) => {
    fetch(API_HOST + "todoColumnList/" + id)
      .then((res) => res.json())
      .then((res) => {
        setColumsInfo(res);
      })
      .catch((err) => console.log(err));
  };

  const postTodoColums = (data: CategoriesType) => {
    fetch(API_HOST + "todoColumnList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {})
      .catch((err) => console.log(err));
  };

  const deleteTodo = (id: number, callback?: () => void) => {
    fetch(API_HOST + "todoList/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        callback?.();
      })
      .catch((err) => console.log(err));
  };

  const deleteTodoColums = (id: number, todoIdList?: number[]) => {
    todoIdList &&
      todoIdList.forEach((tId) => {
        deleteTodo(tId);
      });
    fetch(API_HOST + "todoColumnList/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {})
      .catch((err) => console.log(err));
  };

  const patchTodoColums = (data: CategoriesType) => {
    fetch(API_HOST + "todoColumnList/" + data.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {})
      .catch((err) => console.log(err));
  };

  const postTodoItem = (data: TodoItemType) => {
    return fetch(API_HOST + "todoList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const patchTodoItem = (data: TodoItemType) => {
    return fetch(API_HOST + "todoList/" + data.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const getTodoInfo = (id: number, callback?: (res: TodoItemType) => void) => {
    fetch(API_HOST + "todoList/" + id)
      .then((res) => res.json())
      .then((res) => {
        setTodoInfo(res);
        callback?.(res);
      })
      .catch((err) => console.log(err));
  };

  const searchTodos = (val: string) => {
    const requestString = val ? `todoList?title=${val}` : "todoList";
    fetch(API_HOST + requestString)
      .then((res) => res.json())
      .then((res) => {
        setUnionList([todoList, res]);
      })
      .catch((err) => console.log(err));
  };

  return {
    todoList,
    getUnionList,
    postTodoColums,
    patchTodoColums,
    columsInfo,
    setColumsInfo,
    getTodoColumsById,
    deleteTodoColums,
    todoInfo,
    setTodoInfo,
    postTodoItem,
    getTodoInfo,
    patchTodoItem,
    deleteTodo,
    searchTodos,
  };
}
