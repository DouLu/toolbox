import { Avatar, Button, Calendar, Card, Modal } from "antd";
import { DATE_FORMATER, FULL_DATE_FORMATER } from "../utils";
import { useState } from "react";
import { CopyFilled, CopyOutlined } from "@ant-design/icons";
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
        handleCancel={() => {
          setOpen(false);
        }}
        handleCheckIn={() => {
          setChecked(true);
          setOpen(false);
          //   TODO: 将签到数据写入本地
        }}
      />
    </div>
  );
}

const DailyCheckInCard = ({
  checked = false,
  open = false,
  handleCancel,
  handleCheckIn,
}: {
  checked: boolean;
  open: boolean;
  handleCancel: () => void;
  handleCheckIn: () => void;
}) => {
  return (
    <Modal open={open} title={false} footer={false} onCancel={handleCancel}>
      <Card
        style={{ width: 300 }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[<CopyFilled key="setting" />, <CopyOutlined key="edit" />]}
      >
        <Card.Meta
          avatar={
            <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
          }
          title="今日寄语 - Quotes"
          description="Everyone simles in the same language"
        />
      </Card>
      <Button onClick={handleCheckIn} disabled={checked}>
        check in
      </Button>
    </Modal>
  );
};
