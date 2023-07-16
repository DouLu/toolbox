import { Button, Calendar, Typography } from "antd";
import type { SelectInfo } from "antd/es/calendar/generateCalendar";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import { useEffect, useState } from "react";
import DailyCheckInCard from "../components/DailyCheckInCard";
import useDailyCheckIn from "../hooks/useDailyCheckIn";
import { DATE_FORMATER, FULL_DATE_FORMATER } from "../utils";

export type CheckInType = {
  id: number; // 当天的时间戳
  date: string;
  quotes: string;
  img: string;
  avatar: string;
};

export default function DailyCheckIn() {
  const [open, setOpen] = useState(false);

  const {
    getCheckedInList,
    getCheckInDataById,
    getRandomQuotes,
    postCheckIn,
    checkedInList,
    checkInData,
    checked,
  } = useDailyCheckIn();

  useEffect(() => {
    getCheckedInList();
  }, []);

  const verifyExistence = (date: dayjs.Dayjs) => {
    return (
      checkedInList.map((c) => c.date).indexOf(date.format(DATE_FORMATER)) >= 0
    );
  };

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (verifyExistence(current)) {
      return <div>checked ✅</div>;
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
      {/* FIXME: 换成⏰时钟组件 */}
      <p>welcome! today is {dayjs().format(FULL_DATE_FORMATER)}</p>
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
        view today words
      </Button>
      <Typography.Title>打卡记录</Typography.Title>
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
