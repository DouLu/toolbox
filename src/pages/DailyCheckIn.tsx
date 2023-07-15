import { Avatar, Button, Calendar, Card, Modal, Space } from "antd";
import { DATE_FORMATER, FULL_DATE_FORMATER } from "../utils";
import { useState } from "react";
import {
  CheckCircleFilled,
  CopyOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import type { CellRenderInfo } from "rc-picker/lib/interface";

// @ts-ignore
const CHECKED_DAYS: string[] = Array(7)
  .fill(1)
  .map((_, index) => {
    return dayjs(`2023-07-0${index + 1}`).format(DATE_FORMATER);
  });

export default function DailyCheckIn() {
  // FIXME:  checked可以通过存储的数据算出来，记得去掉
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (CHECKED_DAYS.indexOf(current.format(DATE_FORMATER)) >= 0) {
      return <div>checked</div>;
    }
    return null;
  };

  return (
    <div>
      {/* FIXME: 换成⏰时钟组件 */}
      <p>welcome! today is {dayjs().format(FULL_DATE_FORMATER)}</p>
      <Button
        size="large"
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        view today words
      </Button>
      <p>打卡记录</p>
      <Calendar cellRender={cellRender} />
      <DailyCheckInCard
        checked={checked}
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        onCheckIn={(quotes: string) => {
          setOpen(false);
          setChecked(true);
          alert(quotes);
          //   TODO: 将签到数据写入本地
        }}
      />
    </div>
  );
}

const DailyCheckInCard = ({
  checked = false,
  open = false,
  onCancel,
  onCheckIn,
}: {
  checked: boolean;
  open: boolean;
  onCancel: () => void;
  onCheckIn: (quotes: string) => void;
}) => {
  // FIXME: 应该存储日签的所有数据，图片、摘要等
  const [quotes, setQuotes] = useState("Everyone simles in the same language");

  // TODO: 请求每日签到的语录，抽离数据请求的hooks
  const handleReload = () => {};
  const handleCopy = () => {};
  const handleCheckIn = () => {
    onCheckIn(quotes);
  };
  return (
    <Modal open={open} title={false} footer={false} onCancel={onCancel}>
      <Space>
        <Card
          style={{ width: 300 }}
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
          actions={[
            <ReloadOutlined key="reload" onClick={handleReload} />,
            <CopyOutlined key="copy" onClick={handleCopy} />,
          ]}
        >
          <Card.Meta
            avatar={
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
            }
            title="今日寄语 - Quotes"
            description={quotes}
          />
        </Card>
        <Button
          size="large"
          icon={<CheckCircleFilled />}
          onClick={handleCheckIn}
          disabled={checked}
        >
          check in
        </Button>
      </Space>
    </Modal>
  );
};
