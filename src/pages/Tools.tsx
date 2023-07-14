import { Row, Col, Card } from "antd";

export default function Tools() {
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card title="Card title" bordered={false}>
          tools1
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Card title" bordered={false}>
          tools2
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Card title" bordered={false}>
          tools3
        </Card>
      </Col>
    </Row>
  );
}
