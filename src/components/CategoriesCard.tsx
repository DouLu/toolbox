import { Badge, Col, Row, Space, Typography } from "antd";
import { TodoItemType } from "./TodoModal";
import "./style.css";

export type CategoriesType = {
  id: number;
  title: string;
  color: string;
  desc?: string;
  items?: TodoItemType[] | null;
};

export default function CategoriesCard({
  title,
  desc,
  color,
  number = 0,
  extra,
  children,
}: {
  title: string;
  color: string;
  desc?: string;
  number?: number;
  extra?: React.JSX.Element;
  children: JSX.Element;
}) {
  return (
    <div className="category-card">
      <Row justify={"space-between"} wrap={false}>
        <Col flex="auto">
          <Space align="start">
            <span
              style={{
                display: "inline-block",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: color,
              }}
            />
            <Typography.Title level={5} style={{ margin: 0 }}>
              {title}
            </Typography.Title>
            <Badge count={number} showZero color="#faad14" />
          </Space>
        </Col>
        <Col flex="none">{extra}</Col>
      </Row>
      <p>{desc}</p>
      {children}
    </div>
  );
}
