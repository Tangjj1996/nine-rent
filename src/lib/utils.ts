import { getStorageSync } from "@tarojs/taro";
import { LocalStorageKey } from "@/enums";
import { isNil } from "lodash";

/** 开发环境 */
export const isDev = () => {
  return process.env.NODE_ENV === "development";
};

/** 生产环境 */
export const isProd = () => {
  return process.env.NODE_ENV === "production";
};

/** 是否登录 */
export const isLogined = () => {
  return !!getStorageSync(LocalStorageKey.openId);
};

/**
 * biz error
 */
export const exceptionBiz = (msg: string | Error) => {
  if (msg instanceof Error) {
    console.error(msg);
  } else {
    console.error(new Error(msg));
  }
};

/**
 * 数字友好展示
 * @param num
 * @returns
 */
export const prettyCount = (num: number | undefined) => {
  if (isNil(num)) {
    return 0;
  }

  if (num >= 10_000) {
    return "1万+";
  }
  if (num >= 1_000) {
    return "1千+";
  }
  return num;
};
