import { request } from "@/lib/request";
import type { LoginReq, LoginData } from "./LoginType";

export const getLogin = (data: LoginReq) => {
  return request<Api<LoginData>>({
    url: "/user/login",
    method: "GET",
    data,
  });
};
