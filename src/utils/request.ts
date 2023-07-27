import { message } from "antd";
import { API_HOST } from ".";

export type methodType = "GET" | "POST" | "PATCH" | "DELETE";

export function doRequest(url: string, method: methodType, params?: any) {
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
    .then((res) => {
      // FIXME: 201、304、这种如何处理？
      if (res.status !== 200 && res.status !== 201) {
        message.error(`${res.status} : ${res.statusText}`);
        return undefined;
      }
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
