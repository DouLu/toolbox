import { Card, Col, Row } from "antd";
import useTodoList from "../hooks/useTodoList";

export default function Tools() {
  const { todoList } = useTodoList();

  return (
    <Row gutter={[16, 16]}>
      {todoList.map((t) => (
        <Col span={8} key={t.id}>
          <Card title={t.title} bordered={false}>
            {t.desc}
          </Card>
        </Col>
      ))}
    </Row>
  );
}
