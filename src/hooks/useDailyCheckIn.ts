import { useState } from "react";
import { CheckInType } from "../pages/DailyCheckIn";
import { API_HOST } from "../utils";

export default function useDailyCheckIn() {
  const [checkInData, setCheckInData] = useState<CheckInType>();
  const [checkedInList, setCheckedInList] = useState<CheckInType[]>([]);

  const getRandomQuotes = () => {
    fetch(API_HOST + "randomQuotes")
      .then((res) => res.json())
      .then((res) => {
        setCheckInData(res);
      })
      .catch((err) => {
        console.error("get randomQuotes----", err);
      });
  };

  const getCheckedInList = () => {
    fetch(API_HOST + "checkIn")
      .then((res) => res.json())
      .then((res) => {
        setCheckedInList(res);
      })
      .catch((err) => {
        console.error("get checkIn----", err);
      });
  };

  const getCheckInDataById = (id: number) => {
    fetch(API_HOST + "checkIn/" + id)
      .then((res) => res.json())
      .then((res) => {
        setCheckInData(res);
      })
      .catch((err) => {
        console.error("get checkIn by id----", err);
      });
  };

  const postCheckIn = (data: CheckInType | {}, callBack: () => void) => {
    fetch(API_HOST + "checkIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        callBack();
      })
      .catch((err) => {
        console.error("post checkIn----", err);
      });
  };

  const checked = checkedInList.some((r) => r.date === checkInData?.date);

  return {
    getCheckedInList,
    getCheckInDataById,
    getRandomQuotes,
    postCheckIn,
    checkedInList,
    checkInData,
    setCheckInData,
    checked,
  };
}
