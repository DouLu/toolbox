// 学习地址：https://blog.csdn.net/m0_57521762/article/details/131686432
/**
 * https://www.ruanyifeng.com/blog/2017/04/css_in_js.html
 * 由于 CSS 的封装非常弱，导致了一系列的第三方库，用来加强 React 的 CSS 操作。它们统称为 CSS in JS，意思就是使用 JS 语言写 CSS。
 * 根据不完全统计，各种 CSS in JS 的库至少有47种。老实说，现在也看不出来，哪一个库会变成主流。
 */
import classNames from "classnames";
import styles from "./BlogList.module.css";

export default function Dashboard() {
  const style = {
    color: "red",
    fontSize: "46px",
  };
  return (
    <div>
      <h3>react中三种样式隔离方案</h3>
      <div className={styles.content}>css module</div>
      <div style={style}>内联样式</div>
      <div className={classNames("a", { b: true }, { c: false })}>
        classnames
      </div>
    </div>
  );
}
