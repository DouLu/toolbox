import { Card, Col, Row, Spin } from "antd";
import { Suspense } from "react";
import { Await, useAsyncValue, useLoaderData } from "react-router-dom";

export default function Tools() {
  const { list } = useLoaderData() as { list: any[] };
  // https://reactrouter.com/en/main/start/overview#skeleton-ui-with-suspense
  return (
    <div>
      <p>test defer & Suspense & Await</p>
      <Suspense fallback={<Spin size="large" />}>
        <Await resolve={list}>
          <List />
        </Await>
      </Suspense>
    </div>
  );
}

const List = () => {
  const list = useAsyncValue() as any[];
  return (
    <Row gutter={[16, 16]}>
      {list?.map((t) => (
        <Col span={8} key={t.id}>
          <Card title={t.title} bordered={false}>
            {t.desc}
          </Card>
        </Col>
      ))}
    </Row>
  );
};
