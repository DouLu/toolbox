import { AppstoreAddOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row } from "antd";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import AddColums from "../components/AddColums";
import CategoriesCard, { CategoriesType } from "../components/CategoriesCard";
import { TodoItemList } from "../components/TodoItemCard";

export default function Todo() {
  const categories: CategoriesType[] = useLoaderData() as CategoriesType[];
  const [open, setOpen] = useState(false);
  return (
    <>
      <Row gutter={16} style={{ marginBottom: 15 }}>
        <Col flex={"auto"}>
          <Input.Search />
        </Col>
        <Col flex={100}>
          <Button>Add item</Button>
        </Col>
      </Row>
      <div className="todo-panel">
        {categories.map(({ id, items, ...c }) => (
          <CategoriesCard key={id} {...c} number={items?.length}>
            <TodoItemList dataSource={items} />
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
      <AddColums
        open={open}
        handleCancel={() => {
          setOpen(false);
        }}
        saveColums={() => {}}
      />
    </>
  );
}
