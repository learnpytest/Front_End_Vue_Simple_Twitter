import Moment from "moment";

Moment.locale("zh-tw", {
  relativeTime: {
    future: "%s内",
    // past: "%s前",
    past: "%s",
    s: "幾秒",
    m: "1 分鐘",
    mm: "%d 分鐘",
    h: "1 小時",
    hh: "%d 小時",
    d: "1 天",
    dd: "%d 天",
    M: "1 個月",
    MM: "%d 个月",
    y: "1 年",
    yy: "%d 年",
  },
});

export const mixinFromNowFilters = {
  filters: {
    fromNow(datetime) {
      if (!datetime) {
        return "-";
      }
      const nowTime = new Date();
      const pastTime = new Date(datetime.toString().split(".")[0]).getTime();
      if (nowTime - pastTime < 86400000) {
        return Moment(datetime).fromNow();
      } else {
        return Moment().format(datetime);
      }
    },
  },
};

export const mixinEmptyImage = {
  filters: {
    emptyImage(src) {
      return src || "https://via.placeholder.com/350x220/DFDFDF?text=No+Image";
    },
  },
};