import { useState } from "react";

const isNumber = (value: unknown): value is number => typeof value === "number";

type Options = { min?: number; max?: number };
function getTargetValue(val: number, options: Options = {}) {
  const { min, max } = options;
  let target = val;
  if (isNumber(max)) {
    target = Math.min(max, target);
  }
  if (isNumber(min)) {
    target = Math.max(min, target);
  }
  return target;
}

function useCounter(
  initialValue: number,
  { min, max }: { min: number; max: number }
) {
  const targetValue = getTargetValue(initialValue, { min, max });
  const [count, setCount] = useState(targetValue);

  const reset = () => setCount(targetValue);

  const set = (value: number) => setCount(value);

  const inc = () => {
    if (count >= max) return;
    setCount((pre) => pre + 1);
  };

  const dec = () => {
    if (count <= min) return;
    setCount((pre) => pre - 1);
  };

  return [count, { inc, dec, set, reset }] as const;
}
export default useCounter;
