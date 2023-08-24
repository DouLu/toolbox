import { useState } from "react";
import { CheckInType } from "../pages/DailyCheckIn";
import { API_HOST } from "../utils";
import { doRequest } from "../utils/request";

export default function useDailyCheckIn() {
  const [checkInData, setCheckInData] = useState<CheckInType>();
  const [checkedInList, setCheckedInList] = useState<CheckInType[]>([]);

  const getInitialQuotes = () => {
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((res) => {
        // @ts-ignore
        setCheckInData({
          img: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
          avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel",
          quotes: res?.content + "-" + res?.author,
        });
      })
      .catch((err) => {
        console.log("🚀 ~ file: useDailyCheckIn.ts:13 ~ fetch ~ err:", err);
      });
  };

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

  const patchRandom = (data: CheckInType | {}, callBack?: () => void) => {
    fetch(API_HOST + "randomQuotes", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        callBack?.();
      })
      .catch((err) => {
        console.error("post checkIn----", err);
      });
  };

  const putRandom = (data: any) => {
    doRequest("randomQuotes/", "PUT", data);
  };

  return {
    getCheckedInList,
    getCheckInDataById,
    getRandomQuotes,
    postCheckIn,
    checkedInList,
    checkInData,
    setCheckInData,
    patchRandom,
    putRandom,
    getInitialQuotes,
  };
}
