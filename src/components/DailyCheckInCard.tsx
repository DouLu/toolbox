import {
  CheckCircleFilled,
  CopyOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Modal, Space } from "antd";
import { CheckInType } from "../pages/DailyCheckIn";

const DailyCheckInCard = ({
  checkInData,
  checked = false,
  open = false,
  onCancel,
  handleReload,
  handleCkeckIn,
}: {
  checkInData: CheckInType | undefined;
  checked: boolean;
  open: boolean;
  onCancel: () => void;
  handleReload: () => void;
  handleCkeckIn: () => void;
}) => {
  const { quotes, img, avatar } = checkInData || {};
  return (
    <Modal open={open} title={false} footer={false} onCancel={onCancel}>
      <Space>
        <Card
          style={{ width: 300 }}
          cover={<img alt="example" src={img} />}
          actions={[
            <ReloadOutlined
              key="reload"
              onClick={() => {
                !checked && handleReload();
              }}
            />,
            <CopyOutlined key="copy" onClick={() => {}} />,
          ]}
        >
          <Card.Meta
            avatar={<Avatar src={avatar} />}
            title="今日寄语 - Quotes"
            description={quotes}
          />
        </Card>
        <Button
          size="large"
          icon={<CheckCircleFilled />}
          onClick={handleCkeckIn}
          disabled={checked}
        >
          check in
        </Button>
      </Space>
    </Modal>
  );
};

export default DailyCheckInCard;
