import { request } from "@/lib/request";
import { DetailReq, DetailData } from "./Detail";

export const getDetail = (data: DetailReq) => {
  return request<Api<DetailData>>({
    url: "/house/getDetail",
    method: "GET",
    data,
  });
};
