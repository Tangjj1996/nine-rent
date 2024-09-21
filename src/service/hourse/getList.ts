import { request } from "@/lib/request";
import { ListData } from "./List";

export const getList = () => {
  return request<Api<ListData[]>>({
    url: "/house/getList",
    method: "GET",
  });
};
