import { useEffect, useState } from "react";
import style from "./index.module.css";
const TEXT = "发送验证码";
function VerificationCode({ sendCode }: { sendCode?: (tel: number) => void }) {
  const [disabled, setDisabled] = useState(false);
  const [tel, setTel] = useState<number>();
  const [text, setText] = useState(TEXT);
  const [time, setTime] = useState(60);
  const [timer, setTimer] = useState<any>();

  const handleChange = (e: any) => {
    setTel(e.target.value);
  };

  const handleSend = () => {
    if (disabled) return;
    setDisabled(true);
    setText("秒后可以再次发送验证码");

    console.log(tel);
    tel && sendCode?.(tel);

    const t = setInterval(() => {
      setTime((pre) => pre - 1);
    }, 1000);
    setTimer(t);
  };

  useEffect(() => {
    if (time <= 0) {
      clearInterval(timer);
      setDisabled(false);
      setText(TEXT);
    }
  }, [time]);

  return (
    <div>
      <input
        className={style.telInput}
        type="tel"
        value={tel}
        onChange={handleChange}
      />
      <span
        className={disabled ? style.disabled : style.active}
        onClick={handleSend}
      >
        {text === TEXT ? TEXT : time + text}
      </span>
    </div>
  );
}

export default VerificationCode;
