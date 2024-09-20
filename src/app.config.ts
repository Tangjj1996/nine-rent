export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/search/index',
    'pages/mine/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页'
      },
      {
        pagePath: 'pages/search/index',
        text: '搜索'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的'
      },
    ]
  }
})
