import {
  CheckCircleFilled,
  CopyOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  BadgeProps,
  Button,
  Card,
  Input,
  Modal,
  Space,
  Typography,
} from "antd";
import { useState } from "react";
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
  handleCkeckIn: (content?: string | React.MouseEvent) => void;
}) => {
  const { quotes, img, avatar, doneList } = checkInData || {};
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState("");

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
        <div>
          <Button
            size="large"
            icon={<CheckCircleFilled />}
            onClick={handleCkeckIn}
            disabled={checked}
          >
            check in
          </Button>

          {doneList?.length && (
            <>
              <Typography.Title level={5}>today summary</Typography.Title>
              <DoneList dataSource={doneList} />
            </>
          )}

          {isEdit ? (
            <div>
              <Input.TextArea
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
              <Button
                size="large"
                type="primary"
                onClick={() => {
                  setValue("");
                  handleCkeckIn(value);
                  setIsEdit(false);
                }}
              >
                Save
              </Button>
            </div>
          ) : (
            <>
              {!checked && (
                <Button
                  size="large"
                  type="primary"
                  onClick={() => {
                    setIsEdit(true);
                  }}
                >
                  Add summary
                </Button>
              )}
            </>
          )}
        </div>
      </Space>
    </Modal>
  );
};

export default DailyCheckInCard;

export const DoneList: React.FC<{
  dataSource?: { status: BadgeProps["status"]; content: string }[];
}> = ({ dataSource }) => {
  return (
    <>
      {!!dataSource?.length && (
        <div>
          {dataSource?.map((d, index) => (
            <>
              <Badge key={index} status={d.status} text={d.content} />
              <br />
            </>
          ))}
        </div>
      )}
    </>
  );
};
