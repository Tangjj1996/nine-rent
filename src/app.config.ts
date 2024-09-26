export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/search/index",
    "pages/mine/index",
    "pages/detail/index",
    "pages/like/index",
    "pages/collection/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    selectedColor: "#3b82f6",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "./assets/icon/house.png",
        selectedIconPath: "./assets/icon/house_blue.png",
      },
      {
        pagePath: "pages/search/index",
        text: "搜索",
        iconPath: "./assets/icon/search.png",
        selectedIconPath: "./assets/icon/search_blue.png",
      },
      {
        pagePath: "pages/mine/index",
        text: "我的",
        iconPath: "./assets/icon/user.png",
        selectedIconPath: "./assets/icon/user_blue.png",
      },
    ],
  },
});
