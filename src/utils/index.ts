import dayjs from "dayjs";

// https://day.js.org/docs/zh-CN/parse/string-format
const DATE_FORMATER = "YYYY/MM/DD";
const FULL_DATE_FORMATER = "YYYY-MM-DD HH:mm:ss";
const getCurrentTime = () => dayjs().format(FULL_DATE_FORMATER);

const API_HOST =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8080/api/"
    : "https://mock.mengxuegu.com/mock/6643266ce4a3c47b459391e4/toolbox/";

const sleep = async (time = 1000) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

export { API_HOST, DATE_FORMATER, FULL_DATE_FORMATER, getCurrentTime, sleep };
