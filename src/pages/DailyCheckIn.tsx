import { BadgeProps, Button, Calendar, Typography } from "antd";
import type { SelectInfo } from "antd/es/calendar/generateCalendar";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import { useState } from "react";
import { useEffectOnce } from "react-use";
import DailyCheckInCard, { DoneList } from "../components/DailyCheckInCard";
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
  const [open, setOpen] = useState(false);
  // const { time } = useClock();
  const {
    getCheckedInList,
    getCheckInDataById,
    getRandomQuotes,
    postCheckIn,
    checkedInList,
    checkInData,
    checked,
    patchRandom,
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

  const handleSelect = (date: dayjs.Dayjs, selectInfo: SelectInfo) => {
    if (verifyExistence(date) && selectInfo.source === "date") {
      const YMD = dayjs(date).format(DATE_FORMATER);
      getCheckInDataById(dayjs(YMD).valueOf());
      setOpen(true);
    }
  };

  // @ts-ignore
  const handleCheckIn = (content) => {
    const data = structuredClone(checkInData!);

    if (!checked && typeof content !== "string") {
      const date = dayjs().format(DATE_FORMATER);
      data.id = dayjs(date).valueOf();
      data.date = date;
      postCheckIn(data, () => {
        setOpen(false);
        getCheckedInList();
        patchRandom({ ...data, doneList: null });
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
      {/* FIXME: 如何只更新time组件，而不触发calendar组件的渲染？ */}
      {/* <p>welcome! today is {time}</p> */}
      <Button
        size="large"
        type="primary"
        onClick={() => {
          setOpen(true);
          if (todayChecked) {
            const YMD = dayjs().format(DATE_FORMATER);
            getCheckInDataById(dayjs(YMD).valueOf());
          } else {
            getRandomQuotes();
          }
        }}
      >
        today words
      </Button>
      <Typography.Title>Clock-in Records Calendar</Typography.Title>
      <Calendar
        cellRender={cellRender}
        onSelect={handleSelect}
        disabledDate={handleDisable}
      />
      <DailyCheckInCard
        checkInData={checkInData}
        checked={checked}
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        handleReload={() => {
          getRandomQuotes();
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
