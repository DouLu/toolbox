import { ColumsType } from "../components/TodoColumsModal";
import { TodoItemType } from "../components/TodoModal";

export const initialTodosState = {
  openColumnModal: false,
  openTodoModal: false,
  columnInfo: undefined,
  todoInfo: undefined,
  columnList: [],
  todoList: [],
};

export type todoStateType = {
  openColumnModal: boolean;
  openTodoModal: boolean;
  columnInfo?: ColumsType;
  todoInfo?: TodoItemType;
  columnList?: ColumsType[];
  todoList?: TodoItemType[];
};

const todoReducer = (
  state: todoStateType,
  action: {
    type:
      | "set_column_modal_open"
      | "set_todo_modal_open"
      | "set_column_info"
      | "set_todo_info"
      | "set_column_list"
      | "set_todo_list";
    payload: any;
  }
) => {
  const { type, payload } = action;
  switch (type) {
    case "set_column_modal_open":
      return { ...state, openColumnModal: payload };
    case "set_todo_modal_open":
      return { ...state, openTodoModal: payload };
    case "set_column_info":
      return { ...state, columnInfo: payload };
    case "set_todo_info":
      return { ...state, todoInfo: payload };
    case "set_column_list":
      return { ...state, columnList: payload };
    case "set_todo_list":
      return { ...state, todoList: payload };
    default:
      return state;
  }
};

export default todoReducer;
