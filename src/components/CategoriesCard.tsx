import { EllipsisOutlined } from "@ant-design/icons";
import { Badge, Space, Typography } from "antd";
import { TodoItemType } from "./AddItem";
import "./style.css";

export type CategoriesType = {
  id: number;
  title: string;
  desc: string;
  color: string;
  items: TodoItemType[] | null;
};

export default function CategoriesCard({
  title,
  desc,
  color,
  number = 0,
  children,
}: {
  title: string;
  color: string;
  desc?: string;
  number?: number;
  children: JSX.Element;
}) {
  return (
    <div className="category-card">
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
        <EllipsisOutlined onClick={() => {}} />
      </Space>
      <p>{desc}</p>
      <div>{children}</div>
    </div>
  );
}
