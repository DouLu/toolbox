import { useState } from "react";
import { ColumsType } from "../components/TodoColumsModal";
import { TodoItemType } from "../components/TodoModal";
import { API_HOST } from "../utils";
import { CategoriesType } from "./../components/CategoriesCard";

export default function useTodo() {
  const [todoList, setTodoList] = useState<CategoriesType[]>();
  const [columsInfo, setColumsInfo] = useState<ColumsType>();
  const [todoInfo, setTodoInfo] = useState<TodoItemType>();

  const getTodoList = () => {
    fetch(API_HOST + "todos")
      .then((res) => res.json())
      .then((res) => {
        setTodoList(res);
      })
      .catch((err) => console.log(err));
  };

  const getTodoColumsById = (id: number) => {
    fetch(API_HOST + "todos/" + id)
      .then((res) => res.json())
      .then((res) => {
        setColumsInfo(res);
      })
      .catch((err) => console.log(err));
  };

  const postTodoColums = (data: CategoriesType) => {
    fetch(API_HOST + "todos", {
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

  const deleteTodoColums = (id: number) => {
    fetch(API_HOST + "todos/" + id, {
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
    fetch(API_HOST + "todos/" + data.id, {
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
  return {
    todoList,
    getTodoList,
    postTodoColums,
    patchTodoColums,
    columsInfo,
    setColumsInfo,
    getTodoColumsById,
    deleteTodoColums,
  };
}
