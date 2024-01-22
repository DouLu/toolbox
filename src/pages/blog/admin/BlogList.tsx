import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  RadarChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Divider, Input, Space } from "antd";
import { useState } from "react";
import styles from "./BlogList.module.css";

const menusData1 = [
  { text: "工作台", icon: <PieChartOutlined /> },
  { text: "收藏", icon: <PieChartOutlined /> },
  { text: "待办", icon: <PieChartOutlined /> },
];
const menusData2 = [
  { text: "迭代", icon: <PieChartOutlined /> },
  { text: "应用", icon: <PieChartOutlined /> },
  { text: "组件", icon: <PieChartOutlined /> },
  { text: "配置", icon: <PieChartOutlined /> },
  { text: "产品", icon: <PieChartOutlined /> },
];
const menusData3 = [
  { text: "监控", icon: <PieChartOutlined /> },
  { text: "文件", icon: <PieChartOutlined /> },
];
export default function BlogList() {
  const [isFold, setIsFold] = useState(false);
  const handleFold = (val: boolean) => {
    setIsFold(val);
  };
  const handleSearch = () => {};
  return (
    <div className={styles.content}>
      {isFold ? (
        <FoldBar handleFold={handleFold} />
      ) : (
        <UnFoldBar handleFold={handleFold} />
      )}
      <div className={styles.rightContent}>
        <TopBar handleSearch={handleSearch} />
        <p className={styles.conTitle}>晚上好，今天又是忙碌的一天💪</p>
      </div>
    </div>
  );
}

const TopBar = ({ handleSearch }: { handleSearch: (val: string) => void }) => {
  return (
    <div className={styles.topBar}>
      <Input.Search
        onSearch={(value) => {
          handleSearch(value);
        }}
        className={styles.search}
      />
      <div className={styles.rightBar}>
        <Space>
          <Button type="primary">新建+</Button>
          {/* 写一个下拉菜单 */}
          <Avatar size={32} icon={<UserOutlined />} />
        </Space>
      </div>
    </div>
  );
};

const UnFoldBar = ({
  handleFold,
}: {
  handleFold: (isFold: boolean) => void;
}) => {
  return (
    <div className={styles.leftMenu}>
      <div className={styles.logoBar}>
        <div
          className={styles.foldIcon}
          onClick={() => {
            handleFold(true);
          }}
        >
          <MenuUnfoldOutlined />
        </div>
        <Divider type="vertical" className={styles.divider} />
        <Space>
          <RadarChartOutlined />
          <span className={styles.logoText}>雨燕</span>
        </Space>
      </div>
      <div className={styles.rightMenu}>
        <Menus menus={menusData1} />
        <Menus
          title="研发管理"
          topBorder={true}
          bottomBorder={true}
          menus={menusData2}
        />
        <Menus menus={menusData3} />
      </div>
    </div>
  );
};

const FoldBar = ({ handleFold }: { handleFold: (isFold: boolean) => void }) => {
  return (
    <div
      className={`${styles.foldIcon} ${styles.foldBar}`}
      onClick={() => {
        handleFold(false);
      }}
    >
      <MenuFoldOutlined />
    </div>
  );
};

const Menus = ({
  title,
  menus,
  topBorder = false,
  bottomBorder = false,
}: {
  title?: string;
  menus: { text: string; url?: string; icon?: any }[];
  topBorder?: boolean;
  bottomBorder?: boolean;
}) => {
  return (
    <div>
      {topBorder && <Divider />}
      {title && <div className={styles.title}>{title}</div>}
      {menus.map(({ text, url, icon }) => (
        <div
          className={styles.menus}
          onClick={() => {
            // react路由
          }}
        >
          {icon}
          <span className={styles.marginLeft10}>{text}</span>
        </div>
      ))}
      {bottomBorder && <Divider />}
    </div>
  );
};
