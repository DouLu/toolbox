import { message } from "antd";
import { API_HOST, sleep } from ".";

export type methodType = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";

export function doRequest(
  url: string,
  method: methodType,
  params?: any,
  delay?: boolean
) {
  const bodyParmas =
    method === "DELETE" ? {} : { body: JSON.stringify(params) };
  const mFetch =
    method === "GET"
      ? fetch(API_HOST + url)
      : fetch(API_HOST + url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          ...bodyParmas,
        });
  return mFetch
    .then(async (res) => {
      // FIXME: 201、304、这种如何处理？
      if (res.status !== 200 && res.status !== 201) {
        message.error(`${res.status} : ${res.statusText}`);
        return undefined;
      }
      if (delay) await sleep();
      return res.json();
    })
    .catch((err) => {
      console.log(
        "%c [ err ]-22",
        "font-size:13px; background:pink; color:#bf2c9f;",
        err
      );
    });
}
