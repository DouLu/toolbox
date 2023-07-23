import { Button, Calendar, Typography } from "antd";
import type { SelectInfo } from "antd/es/calendar/generateCalendar";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import { useState } from "react";
import { useEffectOnce } from "react-use";
import DailyCheckInCard from "../components/DailyCheckInCard";
import useClock from "../hooks/useClock";
import useDailyCheckIn from "../hooks/useDailyCheckIn";
import { DATE_FORMATER } from "../utils";

export type CheckInType = {
  id: number; // 当天的时间戳
  date: string;
  quotes: string;
  img: string;
  avatar: string;
};

export default function DailyCheckIn() {
  const [open, setOpen] = useState(false);
  const { time } = useClock();
  const {
    getCheckedInList,
    getCheckInDataById,
    getRandomQuotes,
    postCheckIn,
    checkedInList,
    checkInData,
    checked,
  } = useDailyCheckIn();

  useEffectOnce(getCheckedInList);

  const verifyExistence = (date: dayjs.Dayjs) => {
    return (
      checkedInList.map((c) => c.date).indexOf(date.format(DATE_FORMATER)) >= 0
    );
  };

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (verifyExistence(current)) {
      return <div style={{ textAlign: "center" }}>checked ✅</div>;
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

  const handleCheckIn = () => {
    if (!checked) {
      const date = dayjs().format(DATE_FORMATER);
      const data = {
        ...checkInData,
        id: dayjs(date).valueOf(),
        date,
      };
      postCheckIn(data, () => {
        setOpen(false);
        getCheckedInList();
      });
    }
  };

  const todayChecked = checkedInList.some(
    (r) => r.date === dayjs().format(DATE_FORMATER)
  );
  return (
    <div>
      <p>welcome! today is {time}</p>
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
