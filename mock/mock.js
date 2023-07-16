const Mock = require("mockjs");

const getQuotes = () => ({ today: Mock.mock("@cparagraph(1, 3)") });

module.exports = () => {
  return {
    quotes: getQuotes(),
    daily: [
      {
        id: 1,
        date: "2023/07/07",
        quotes: "Everyone simles in the same language",
        img: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel",
      },
      {
        id: 2,
        date: "2023/07/15",
        quotes:
          "统题经断她铁多身率品那命。青府引受月置改自权主务头断织。铁我子六张通东结没识下持着划团热全现。",
        img: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel",
      },
    ],
  };
};
