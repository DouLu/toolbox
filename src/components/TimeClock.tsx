import { useState } from "react";
import { useEffectOnce } from "react-use";
import { getCurrentTime } from "../utils";

export default function TimeClock() {
  const [time, updateTime] = useState(getCurrentTime());

  useEffectOnce(() => {
    const timer = setInterval(() => {
      updateTime(getCurrentTime());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });

  return <span>{time}</span>;
}
