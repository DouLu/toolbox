import { CopyOutlined, ReloadOutlined } from "@ant-design/icons";
import { Avatar, BadgeProps, Card, Col, DatePicker, Row, Space } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { useState } from "react";
import { CheckInType } from "../pages/DailyCheckIn";
import CheckIn from "./CheckIn";
/**
 * 补卡日期，年月日
 * 补卡寄语
 * 添加补卡总结语
 */
const MakeUpClockingIn = ({
  checkedInList,
  quotes,
  handleReload,
  handleCheckIn,
}: {
  quotes: string;
  checkedInList: CheckInType[] | undefined;
  handleReload: () => void;
  handleCheckIn: (
    val: { status: BadgeProps["status"]; content: string }[],
    date?: string
  ) => void;
}) => {
  const [date, setDate] = useState<string>();

  // eslint-disable-next-line arrow-body-style
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    // 已打卡的、今天和今天之后的所有日期都不能再选择了
    const checkedDays = checkedInList
      ?.map((c) => c.date)
      .some((d) => d && current.isSame(d, "day"));
    const today = dayjs().isSame(current, "day");
    const aftherDays = current && current > dayjs().endOf("day");
    return current && (checkedDays || aftherDays || today);
  };

  return (
    <Row>
      <Col span={16}>
        <Space>
          <h3>补卡日期:</h3>
          <DatePicker
            showToday={false}
            format="YYYY-MM-DD"
            disabledDate={disabledDate}
            onChange={(date, val) => {
              setDate(val);
            }}
          />
        </Space>
        <Card
          cover={
            <img
              alt="example"
              src={
                "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              }
            />
          }
          style={{ width: 300, margin: "20px 0" }}
          actions={[
            <ReloadOutlined
              key="reload"
              onClick={() => {
                handleReload();
              }}
            />,
            <CopyOutlined key="copy" onClick={() => {}} />,
          ]}
        >
          <Card.Meta
            avatar={
              <Avatar
                src={"https://xsgames.co/randomusers/avatar.php?g=pixel"}
              />
            }
            title="今日寄语 - Quotes"
            description={quotes}
          />
        </Card>
      </Col>
      <Col span={8}>
        <CheckIn
          handleCkeckIn={(val) => {
            handleCheckIn(val, date);
          }}
        />
      </Col>
    </Row>
  );
};
export default MakeUpClockingIn;
