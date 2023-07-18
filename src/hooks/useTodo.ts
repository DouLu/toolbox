import { useState } from "react";
import { CategoriesType } from "../components/CategoriesCard";
import { API_HOST } from "../utils";

export default function useTodo() {
  const [todoList, setTodoList] = useState();
  const getTodoList = () => {
    fetch(API_HOST + "todos")
      .then((res) => res.json())
      .then((res) => {
        setTodoList(res);
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

  const patchTodoColums = (data: CategoriesType) => {
    fetch(API_HOST + "todos", {
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
  return { todoList, getTodoList, postTodoColums, patchTodoColums };
}
