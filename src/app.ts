import { PropsWithChildren } from "react";
import { useLaunch, login, getStorageSync, setStorageSync } from "@tarojs/taro";
import { LocalStorageKey } from "@/enums";
import { getLogin } from "@/service/user/login";
import "./app.less";

function App({ children }: PropsWithChildren<any>) {
  useLaunch(async () => {
    if (getStorageSync(LocalStorageKey.openId)) return;
    try {
      const { code } = (await login()) || {};
      const { data } = (await getLogin({ code })) || {};
      setStorageSync(LocalStorageKey.openId, data.data.openid);
    } catch (e) {
      console.error(e);
    }
  });

  // children 是将要会渲染的页面
  return children;
}

export default App;
