// @ts-nocheck
import { useEffectOnce } from "react-use";
import "./clock.css";

const Clock: React.FC<{ width?: number; height?: number }> = ({
  width = 200,
  height = 200,
}) => {
  useEffectOnce(() => {
    const time = new Date();
    const hour = -3600 * (time.getHours() % 12);
    const mins = -60 * time.getMinutes();
    const app = document.getElementById("clock");
    app?.style.setProperty("--_dm", `${mins}s`);
    app?.style.setProperty("--_dh", `${hour + mins}s`);
  });
  return (
    <div>
      <p className="clock-refer">
        <small>author - https://codepen.io/stoumann/pen/wvxOQKo</small>
        <small>
          CSS sin() and cos() does <strong>NOT</strong> work in your browser.
        </small>
      </p>
      <div className="clock" style={{ width, height }}>
        <div className="clock-face" id="clock">
          <time dateTime="12:00">12</time>
          <time dateTime="1:00">1</time>
          <time dateTime="2:00">2</time>
          <time dateTime="3:00">3</time>
          <time dateTime="4:00">4</time>
          <time dateTime="5:00">5</time>
          <time dateTime="6:00">6</time>
          <time dateTime="7:00">7</time>
          <time dateTime="8:00">8</time>
          <time dateTime="9:00">9</time>
          <time dateTime="10:00">10</time>
          <time dateTime="11:00">11</time>
          <span className="arm seconds"></span>
          <span className="arm minutes"></span>
          <span className="arm hours"></span>
        </div>
      </div>
    </div>
  );
};
export default Clock;
