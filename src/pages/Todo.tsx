import { AppstoreAddOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Button, Col, Dropdown, Input, Row } from "antd";
import { useState } from "react";
import { useEffectOnce } from "react-use";
import CategoriesCard from "../components/CategoriesCard";
import TodoColumsModal from "../components/TodoColumsModal";
import TodoList from "../components/TodoList";
import TodoModal from "../components/TodoModal";
import useTodo from "../hooks/useTodo";

export default function Todo() {
  // const categories: CategoriesType[] = useLoaderData() as CategoriesType[];
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const {
    postTodoColums,
    getTodoList,
    todoList = [],
    columsInfo,
    setColumsInfo,
    deleteTodoColums,
    patchTodoColums,
    getTodoColumsById,
  } = useTodo();

  useEffectOnce(() => {
    getTodoList();
  });

  const closeColumsModal = () => {
    setColumsInfo(undefined);
    setOpen(false);
  };
  return (
    <>
      <Row gutter={16} style={{ marginBottom: 15 }}>
        <Col flex={"auto"}>
          <Input.Search />
        </Col>
        <Col flex={100}>
          <Button disabled={!todoList.length}>Add item</Button>
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
                        deleteTodoColums(id);
                        getTodoList();
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
            <TodoList dataSource={items} handleEdit={() => {}} />
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
          getTodoList();
        }}
      />
      <TodoModal
        open={visible}
        initialValue={undefined}
        handleClose={() => {
          setVisible(false);
        }}
      />
    </>
  );
}
