import { AppstoreAddOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Button, Col, Dropdown, Input, Row, message } from "antd";
import { useState } from "react";
import { useEffectOnce } from "react-use";
import CategoriesCard from "../components/CategoriesCard";
import TodoColumsModal from "../components/TodoColumsModal";
import TodoList from "../components/TodoList";
import TodoModal, { TodoItemType } from "../components/TodoModal";
import useTodo from "../hooks/useTodo";

export default function Todo() {
  // const categories: CategoriesType[] = useLoaderData() as CategoriesType[];
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const {
    postTodoColums,
    getUnionList,
    todoList = [],
    columsInfo,
    setColumsInfo,
    deleteTodoColums,
    patchTodoColums,
    getTodoColumsById,
    todoInfo,
    postTodoItem,
    getTodoInfo,
    patchTodoItem,
    searchTodos,
  } = useTodo();

  useEffectOnce(() => {
    getUnionList();
  });

  const closeColumsModal = () => {
    setColumsInfo(undefined);
    setOpen(false);
  };

  const refreshTodo = (res?: TodoItemType) => {
    if (res?.id) {
      getTodoInfo(res.id);
      getUnionList();
    } else {
      message.error("fetch error");
    }
  };
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
              setVisible(true);
            }}
            disabled={!todoList.length}
          >
            Add item
          </Button>
        </Col>
      </Row>
      <div className="todo-panel">
        {todoList.map(({ id, items, ...c }) => (
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
                        getTodoColumsById(id);
                        setOpen(true);
                        break;
                      case "delete":
                        deleteTodoColums(
                          id,
                          items?.map((i) => i.id)
                        );
                        getUnionList();
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
            <TodoList
              dataSource={items}
              handleEdit={(id) => {
                getTodoInfo(id);
                setVisible(true);
              }}
            />
          </CategoriesCard>
        ))}
        <Col key="add-colums">
          <Button
            onClick={() => {
              setOpen(true);
            }}
            icon={<AppstoreAddOutlined />}
          />
        </Col>
      </div>
      <TodoColumsModal
        open={open}
        initialValue={columsInfo}
        handleCancel={closeColumsModal}
        handleSave={(values) => {
          if (values?.id) {
            patchTodoColums(values);
          } else {
            postTodoColums(values);
          }
          closeColumsModal();
          getUnionList();
        }}
      />
      <TodoModal
        open={visible}
        initialValue={todoInfo}
        handleClose={() => {
          setVisible(false);
        }}
        handleSave={(todo) => {
          if (todo.categoryId && !todo.id) {
            postTodoItem(todo).then(refreshTodo);
          } else {
            patchTodoItem(todo).then(refreshTodo);
          }
        }}
        columnList={todoList}
      />
    </>
  );
}
