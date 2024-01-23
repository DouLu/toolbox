import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  RadarChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Divider, Input, Space, Spin } from "antd";
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

const listData1 = [
  {
    title: "第一个迭代",
    desc: "try-basement/test-afc163 · 偏右 · 部署于12-14",
    icon: <PieChartOutlined />,
    extra: "test",
  },
  {
    title: "第二个迭代",
    desc: "try-basement/test-afc163 · 偏右 · 部署于12-14",
    icon: <PieChartOutlined />,
  },
  {
    title: "第三个迭代",
    desc: "try-basement/test-afc163 · 偏右 · 部署于12-14",
    icon: <PieChartOutlined />,
  },
];
export default function BlogList() {
  const [isFold, setIsFold] = useState(false);
  const handleFold = (val: boolean) => {
    setIsFold(val);
  };
  const [isLoading, setIsLoading] = useState(false);
  const [listData, setListData] = useState(listData1);
  const handleMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setListData([
        ...listData,
        ...[
          {
            title: "第4个迭代",
            desc: "try-basement/test-afc163 · 偏右 · 部署于12-14",
            icon: <PieChartOutlined />,
          },
          {
            title: "第5个迭代",
            desc: "try-basement/test-afc163 · 偏右 · 部署于12-14",
            icon: <PieChartOutlined />,
          },
        ],
      ]);
      setIsLoading(false);
    }, 3000);
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
        <Card
          title="进行中的迭代"
          content={listData.map((i) => (
            <ListItem {...i} />
          ))}
          isLoading={isLoading}
          handleMore={handleMore}
        />
      </div>
    </div>
  );
}

const Card = ({
  title,
  extra,
  content,
  isLoading,
  handleMore,
}: {
  title: string;
  content: any;
  extra?: any;
  isLoading: boolean;
  handleMore: () => void;
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <h5>{title}</h5>
        {extra}
      </div>
      <div className={styles.cardContent}>{content}</div>
      {isLoading ? (
        <Spin />
      ) : (
        <Button block type="link" onClick={handleMore}>
          查看更多
        </Button>
      )}
    </div>
  );
};

const ListItem = ({
  title,
  desc,
  icon,
  extra,
}: {
  title: string;
  desc?: string;
  icon?: any;
  extra?: any;
}) => {
  return (
    <div className={styles.listItem}>
      <Space>
        <div className={styles.itemIcon}>{icon}</div>
        <div>
          <h6>{title}</h6>
          <p>{desc}</p>
        </div>
      </Space>
      {extra}
    </div>
  );
};

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
