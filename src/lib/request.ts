import { request as _request, getStorageSync } from "@tarojs/taro";
import { HttpStatus, LocalStorageKey } from "@/enums";
import { merge } from "lodash";
import { isDev } from "./utils";

type RequestOptions<T, U> = Parameters<typeof _request<T, U>>[number];

const baseUrl = (() => {
  if (isDev()) {
    return "https://rent.jianjie.fun/api";
  }
  return "https://rent.jianjie.fun/api";
})();

export const request = async <T, U = any>(optoins: RequestOptions<T, U>) => {
  const defaultOptions: Partial<RequestOptions<T, U>> = {
    header: {
      openid: getStorageSync(LocalStorageKey.openId),
    },
  };
  const mergedOptinos = merge(defaultOptions, optoins);
  mergedOptinos.url = `${baseUrl}${mergedOptinos.url}`;

  try {
    const result = await _request(mergedOptinos);
    if (result.statusCode === HttpStatus.UNAUTHORIZED) {
    }

    if (
      result.statusCode !== HttpStatus.OK &&
      result.statusCode !== HttpStatus.CREATED
    ) {
      /**
       * http status 统一报错输出
       * 业务码 code，自行处理
       *  */
      throw new Error((result.data as any)?.msg);
    }

    return result;
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    } else {
      throw new Error(e);
    }
  }
};
