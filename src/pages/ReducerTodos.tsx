import { AppstoreAddOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Button, Col, Dropdown, Input, Row } from "antd";
import { useReducer } from "react";
import { useEffectOnce } from "react-use";
import CategoriesCard from "../components/CategoriesCard";
import TodoColumsModal from "../components/TodoColumsModal";
import TodoList from "../components/TodoList";
import TodoModal from "../components/TodoModal";
import useReducerTodos from "../hooks/useReducerTodos";
import todoReducer, {
  initialTodosState,
  todoStateType,
} from "../reducers/todos";

export default function ReducerTodos() {
  const [state, dispatch] = useReducer(todoReducer, initialTodosState);
  const {
    openColumnModal,
    openTodoModal,
    todoInfo,
    columnInfo,
    columnList,
    todoList,
  } = state as todoStateType;
  const {
    handleColumnModal,
    handleTodoModal,
    searchTodos,
    handleEditColumn,
    handleDeleteColumn,
    handleEditTodo,
    closeColumsModal,
    handleSaveColumnInfo,
    handleCloseTodoModal,
    handleDeleteTodo,
    handleSaveTodoInfo,
    getUnionList,
  } = useReducerTodos(dispatch);

  useEffectOnce(() => {
    getUnionList();
  });

  const unionList = columnList?.map((c) => {
    const items = todoList?.filter((t) => t?.categoryId === c.id);
    return { ...c, items };
  });

  return (
    <>
      <Row gutter={16} style={{ marginBottom: 15 }}>
        <Col flex={"auto"}>
          <Input.Search
            onSearch={(val) => {
              searchTodos(val);
            }}
          />
        </Col>
        <Col flex={100}>
          <Button
            onClick={() => {
              handleTodoModal(true);
            }}
            disabled={!unionList?.length}
          >
            Add item
          </Button>
        </Col>
      </Row>
      <div className="todo-panel">
        {unionList?.map(({ id, items, ...c }) => (
          <CategoriesCard
            key={id}
            {...c}
            number={items?.length}
            extra={
              <Dropdown
                trigger={["click"]}
                menu={{
                  items: [
                    { key: "edit", label: "edit" },
                    { key: "delete", label: "delete" },
                  ],
                  onClick: (info) => {
                    switch (info.key) {
                      case "edit":
                        handleEditColumn(id);
                        break;
                      case "delete":
                        handleDeleteColumn(id, items);
                        break;
                      default:
                        return;
                    }
                  },
                }}
              >
                <EllipsisOutlined />
              </Dropdown>
            }
          >
            <TodoList dataSource={items} handleEdit={handleEditTodo} />
          </CategoriesCard>
        ))}
        <Col key="add-colums">
          <Button
            onClick={() => {
              handleColumnModal(true);
            }}
            icon={<AppstoreAddOutlined />}
          />
        </Col>
      </div>
      <TodoColumsModal
        open={openColumnModal}
        initialValue={columnInfo}
        handleCancel={closeColumsModal}
        handleSave={handleSaveColumnInfo}
      />
      <TodoModal
        open={openTodoModal}
        initialValue={todoInfo}
        columnList={columnList}
        handleClose={handleCloseTodoModal}
        handleSave={handleSaveTodoInfo}
        handleDelete={handleDeleteTodo}
      />
    </>
  );
}
