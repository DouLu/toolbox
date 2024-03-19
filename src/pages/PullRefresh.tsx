import BScroll from "@better-scroll/core";
import PullDown from "@better-scroll/pull-down";
import PullUp from "@better-scroll/pull-up";
import { useState } from "react";
BScroll.use(PullDown);
BScroll.use(PullUp);

//参考: https://zhuanlan.zhihu.com/p/516444739

export default function PullRefresh() {
  const style0 = {
    height: "100%",
    overflow: "auto",
  };
  const style = {
    background: "#fff",
    margin: 0,
    textAlign: "center" as "center",
  };
  const style1 = {
    padding: "5px",
    borderBottom: "solid 1px #333",
    textAlign: "center" as "center",
  };
  const [dataList, setDataList] = useState(Array(30).fill(1));
  const [info, setInfo] = useState({
    isMore: true,
    pageNo: 1,
    pageSize: 10,
    moreText: "查看更多",
    refreshText: "下拉刷新",
  });

  var scroll = new BScroll("#position-wrapper", {
    scrollY: true, //垂直方向滚动
    click: true, //默认会阻止浏览器的原生click事件，如果需要点击，这里要设为true
    pullUpLoad: true, //上拉加载更多
    pullDownRefresh: {
      threshold: 50, //触发pullingDown事件的位置
      stop: 0, //下拉回弹后停留的位置
    },
  });
  //监听下拉刷新
  scroll.on("pullingDown", pullingDownHandler);
  //监测实时滚动
  // scroll.on("scroll",scrollHandler);
  //上拉加载更多
  scroll.on("pullingUp", pullingUpHandler);

  async function pullingDownHandler() {
    setDataList([]);
    setInfo({ ...info, refreshText: "下拉刷新" + 1 });
    await getlist(); //请求数据
    scroll.finishPullDown(); //每次下拉结束后，需要执行这个操作
    scroll.refresh(); //当滚动区域的dom结构有变化时，需要执行这个操作
  }
  async function pullingUpHandler() {
    if (!info?.isMore) {
      setInfo({ ...info, moreText: "没有更多数据了" });
      scroll.finishPullUp(); //每次上拉结束后，需要执行这个操作
      return;
    }
    // pageNo++;
    setInfo({ ...info, pageNo: info.pageNo++ });
    await getlist(); //请求数据
    scroll.finishPullUp(); //每次上拉结束后，需要执行这个操作
    scroll.refresh(); //当滚动区域的dom结构有变化时，需要执行这个操作
  }
  // function scrollHandler(){
  //     if(this.y>50) $('.refresh').text("松手开始加载");
  //     else $('.refresh').text("下拉刷新");
  // }
  function getlist() {
    //返回的数据
    let result = [0, 9, 8, 7];
    setDataList(dataList.concat(result));
    //判断是否已加载完
    if (result.length < info.pageSize) {
      setInfo({ ...info, isMore: false });
    }
  }

  return (
    <div id="position-wrapper" style={style0}>
      <div>
        <p className="refresh" style={style}>
          {info?.refreshText}
        </p>
        <ul style={style} className="position-list">
          {dataList.map((i) => (
            <li style={style1}>{i}</li>
          ))}
        </ul>
        <p className="more" style={style}>
          {info?.moreText}
        </p>
      </div>
    </div>
  );
}
