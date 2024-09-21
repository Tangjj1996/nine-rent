import { request } from "@/lib/request";
import { ListData, ListReq } from "./List";

export const getList = (data: ListReq) => {
  return request<Api<ListData>>({
    url: "/house/getList",
    method: "GET",
    data,
  });
};
