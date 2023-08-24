import { BadgeProps, Button, Calendar, Space, Typography } from "antd";
import type { SelectInfo } from "antd/es/calendar/generateCalendar";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import { useState } from "react";
import { useEffectOnce } from "react-use";
import DailyCheckInCard, { DoneList } from "../components/DailyCheckInCard";
import TimeClock from "../components/TimeClock";
import useDailyCheckIn from "../hooks/useDailyCheckIn";
import { DATE_FORMATER } from "../utils";

export type CheckInType = {
  id: number; // 当天的时间戳
  date: string;
  quotes: string;
  img: string;
  avatar: string;
  doneList?: { status: BadgeProps["status"]; content: string }[];
};

export default function DailyCheckIn() {
  const [modalConfig, setModalConfig] = useState({
    open: false,
    checked: true,
  });
  const {
    getCheckedInList,
    getCheckInDataById,
    getRandomQuotes,
    postCheckIn,
    checkedInList,
    checkInData,
    patchRandom,
    putRandom,
    getInitialQuotes,
  } = useDailyCheckIn();

  useEffectOnce(getCheckedInList);

  const verifyExistence = (date: dayjs.Dayjs) =>
    checkedInList.map((c) => c.date).some((d) => d && date.isSame(d, "day"));

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    const doneList = checkedInList.find((c) =>
      current.isSame(c.date, "day")
    )?.doneList;

    if (verifyExistence(current)) {
      return (
        <>
          <CheckIcon />
          <DoneList dataSource={doneList} />
        </>
      );
    }
    return null;
  };

  const handleDisable = (date: dayjs.Dayjs) => {
    return !verifyExistence(date);
  };

  const openModal = (checked: boolean) => {
    setModalConfig({ open: true, checked });
  };

  const closeModal = () => {
    setModalConfig({ open: false, checked: true });
  };

  const handleSelect = (date: dayjs.Dayjs, selectInfo: SelectInfo) => {
    if (verifyExistence(date) && selectInfo.source === "date") {
      const YMD = dayjs(date).format(DATE_FORMATER);
      getCheckInDataById(dayjs(YMD).valueOf());
      openModal(true);
    }
  };

  // @ts-ignore
  const handleCheckIn = (content) => {
    const data = structuredClone(checkInData!);

    if (typeof content !== "string") {
      const date = dayjs().format(DATE_FORMATER);
      data.id = dayjs(date).valueOf();
      data.date = date;
      postCheckIn(data, () => {
        closeModal();
        getCheckedInList();
        const { img, avatar, quotes } = data;
        putRandom({ img, avatar, quotes });
      });
    } else {
      const doneList = (checkInData?.doneList || []).concat([
        { status: "success", content },
      ]);
      data.doneList = doneList;
      patchRandom(data, () => {
        getRandomQuotes();
      });
    }
  };

  const todayChecked = checkedInList.some(
    (r) => r.date === dayjs().format(DATE_FORMATER)
  );

  return (
    <div>
      <Space>
        <span>Welcome!</span>
        <TimeClock />
        <Button
          size="large"
          type="primary"
          onClick={() => {
            openModal(false);
            getRandomQuotes();
          }}
        >
          daily quote
        </Button>
      </Space>
      <Typography.Title>Clock-in Records Calendar</Typography.Title>
      <Calendar
        cellRender={cellRender}
        onSelect={handleSelect}
        disabledDate={handleDisable}
      />
      <DailyCheckInCard
        checkInData={checkInData}
        todayChecked={todayChecked}
        {...modalConfig}
        onCancel={closeModal}
        handleReload={() => {
          getInitialQuotes();
        }}
        handleCkeckIn={handleCheckIn}
      />
    </div>
  );
}

const CheckIcon = () => (
  <div
    style={{
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      padding: "4px 0",
      textAlign: "center",
    }}
  >
    checked ✅
  </div>
);
