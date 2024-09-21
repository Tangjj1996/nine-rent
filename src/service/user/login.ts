import { request } from "@/lib/request";
import type { LoginReq, LoginData } from "./LoginType";

export const login = (data: LoginReq) => {
  return request<Api<LoginData>>({
    url: "/getLogin",
    method: "GET",
    data,
  });
};
