import { message } from "antd";
import { ColumsType } from "../components/TodoColumsModal";
import { TodoItemType } from "../components/TodoModal";
import { doRequest } from "../utils/request";

export default function useReducerTodos(
  dispatch: React.Dispatch<{
    type:
      | "set_column_modal_open"
      | "set_todo_modal_open"
      | "set_column_info"
      | "set_todo_info"
      | "set_todo_list"
      | "set_column_list";
    payload: any;
  }>
) {
  const handleColumnModal = (payload: boolean) =>
    dispatch({ type: "set_column_modal_open", payload });

  const handleTodoModal = (payload: boolean) =>
    dispatch({ type: "set_todo_modal_open", payload });

  const searchTodos = async (val: string) => {
    const requestString = val ? `todoList?title=${val}` : "todoList";
    const todoList = await doRequest(requestString, "GET");
    if (todoList) {
      dispatch({ type: "set_todo_list", payload: todoList });
    }
  };

  const handleEditColumn = async (id: number) => {
    const res = await doRequest("todoColumnList/" + id, "GET");
    if (res) {
      dispatch({ type: "set_column_info", payload: res });
      dispatch({ type: "set_column_modal_open", payload: true });
    }
  };

  const getUnionList = async () => {
    const columnList = await doRequest("todoColumnList", "GET");
    if (columnList) {
      dispatch({ type: "set_column_list", payload: columnList });
    }
    const todoList = await doRequest("todoList", "GET");
    if (todoList) {
      dispatch({ type: "set_todo_list", payload: todoList });
    }
  };

  const deleteColumn = async (id: number) => {
    const res = await doRequest("todoColumnList/" + id, "DELETE");
    if (res) {
      getUnionList();
    }
  };

  const handleDeleteColumn = async (
    id: number,
    todoItems?: TodoItemType[] | null
  ) => {
    if (todoItems?.length) {
      if (
        await Promise.all(
          todoItems.map((i) => doRequest("todoList/" + i.id, "DELETE"))
        )
      ) {
        deleteColumn(id);
      } else {
        message.error("column下的todo子项删除失败！请重新删除！");
      }
    } else {
      deleteColumn(id);
    }
  };

  const handleEditTodo = async (id: number) => {
    const res = await doRequest("todoList/" + id, "GET");
    if (res) {
      dispatch({ type: "set_todo_info", payload: res });
      dispatch({ type: "set_todo_modal_open", payload: true });
    }
  };

  const closeColumsModal = () => {
    dispatch({ type: "set_column_info", payload: undefined });
    dispatch({ type: "set_column_modal_open", payload: false });
  };

  const handleSaveColumnInfo = async (values: ColumsType) => {
    let res;
    if (values?.id) {
      res = await doRequest("todoColumnList/" + values.id, "PATCH", values);
    } else {
      res = await doRequest("todoColumnList", "POST", values);
    }
    if (res) {
      closeColumsModal();
      const columnList = await doRequest("todoColumnList", "GET");
      if (columnList) {
        dispatch({ type: "set_column_list", payload: columnList });
      }
    }
  };

  const handleCloseTodoModal = () => {
    dispatch({ type: "set_todo_modal_open", payload: false });
    dispatch({ type: "set_todo_info", payload: undefined });
  };

  const handleSaveTodoInfo = async (values: TodoItemType) => {
    let res;
    if (values?.categoryId && !values?.id) {
      res = await doRequest("todoList", "POST", values);
    } else {
      res = await doRequest("todoList/" + values.id, "PATCH", values);
    }
    if (res) {
      dispatch({ type: "set_todo_info", payload: res });
      getUnionList();
    }
  };

  const handleDeleteTodo = async (id: number) => {
    const res = await doRequest("todoList/" + id, "DELETE");
    if (res) {
      dispatch({ type: "set_todo_modal_open", payload: false });
      getUnionList();
    }
  };

  return {
    handleColumnModal,
    handleTodoModal,
    searchTodos,
    handleEditColumn,
    handleDeleteColumn,
    handleEditTodo,
    closeColumsModal,
    handleSaveColumnInfo,
    handleCloseTodoModal,
    handleSaveTodoInfo,
    handleDeleteTodo,
    getUnionList,
  };
}
