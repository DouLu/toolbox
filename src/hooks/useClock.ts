import { useEffect, useState } from "react";
import { getCurrentTime } from "../utils";

export default function useClock() {
  const [time, updateTime] = useState(getCurrentTime());
  useEffect(() => {
    const timer = setInterval(() => {
      updateTime(getCurrentTime());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return { time };
}
