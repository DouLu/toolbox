import { BadgeProps, Button, Input, Space } from "antd";
import { useState } from "react";
import { DoneList } from "./DailyCheckInCard";

const CheckIn = ({
  handleCkeckIn,
}: {
  handleCkeckIn: (
    value: { status: BadgeProps["status"]; content: string }[]
  ) => void;
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [summary, setSummary] = useState("");
  const [doneList, setDoneList] =
    useState<{ status: BadgeProps["status"]; content: string }[]>();
  return (
    <>
      <h3>Today Summary</h3>
      <div>
        <DoneList dataSource={doneList} />
        {isEdit ? (
          <div>
            <Input.TextArea
              value={summary}
              onChange={(e) => {
                setSummary(e.target.value);
              }}
            />
            <Button
              size="large"
              type="primary"
              onClick={() => {
                setDoneList([
                  ...(doneList || []),
                  { status: "success", content: summary },
                ]);
                setSummary("");
                setIsEdit(false);
              }}
            >
              Save
            </Button>
          </div>
        ) : (
          <Space>
            <Button
              size="large"
              type="primary"
              onClick={() => {
                setIsEdit(true);
              }}
            >
              Add
            </Button>
            <Button
              size="large"
              type="primary"
              onClick={() => {
                if (doneList?.length) {
                  handleCkeckIn(doneList);
                }
              }}
            >
              CheckIn
            </Button>
          </Space>
        )}
      </div>
    </>
  );
};

export default CheckIn;
