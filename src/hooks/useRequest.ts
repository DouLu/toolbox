import { useState } from "react";
import { useEffectOnce } from "react-use";
import { doRequest, methodType } from "../utils/request";

export default function useRequest(
  url: string,
  method: methodType,
  initialParams?: any
) {
  const [data, setData] = useState();
  const run = async (params?: any) => {
    const res = await doRequest(url, method, params || initialParams);
    setData(res);
    return res;
  };
  useEffectOnce(() => {
    run();
  });
  return { data, run };
}
