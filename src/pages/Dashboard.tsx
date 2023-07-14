import { Card, Col, Row } from "antd";

export default function Dashboard() {
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card title="Card title" bordered={false}>
          jump to todo lists
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Card title" bordered={false}>
          jump to 日签
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Card title" bordered={false}>
          数据统计
        </Card>
      </Col>
    </Row>
  );
}
