import {
  GithubFilled,
  NotificationFilled,
  SettingFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button, Input, Layout, Menu, Space } from "antd";
import { Suspense } from "react";
import { NavLink, Outlet, useMatch } from "react-router-dom";
import "./index.css";
const { Header, Sider, Footer, Content } = Layout;

const siderStyle: React.CSSProperties = {
  height: "100%",
  overflow: "scroll",
};
const contentStyle: React.CSSProperties = {
  height: "100%",
  overflow: "scroll",
};
const headerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
const footerStyle: React.CSSProperties = {
  textAlign: "center",
};

export default function MyLayout() {
  const todoPage = useMatch("/todo");
  return (
    <Layout>
      <Sider style={siderStyle}>
        <Menu
          theme="dark"
          mode="vertical"
          defaultSelectedKeys={["2"]}
          items={[
            { title: "home", path: "/" },
            { title: "todo", path: "/todo" },
            { title: "tools", path: "/tools" },
            { title: "lazy tools", path: "/lazy_tools" },
            { title: "dashboard", path: "/dashboard" },
          ].map(({ title, path }) => ({
            key: title,
            label: <NavLink to={path}>{title}</NavLink>,
          }))}
        />
      </Sider>
      <Content style={contentStyle}>
        <Header style={headerStyle}>
          <Input.Search style={{ width: 300 }} />
          <Space>
            <Button shape="circle" icon={<UserOutlined />} />
            <Button shape="circle" icon={<NotificationFilled />} />
            <Button shape="circle" icon={<SettingFilled />} />
            <Button shape="circle" icon={<GithubFilled />} />
          </Space>
        </Header>

        <div className={`content ${todoPage && "vh-content"}`}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Suspense fallback={<p>loading.....</p>}>
            <Outlet />
          </Suspense>
        </div>

        <Footer style={footerStyle}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Content>
    </Layout>
  );
}
