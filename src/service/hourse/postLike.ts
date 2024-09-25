import { request } from "@/lib/request";
import { LikeReq, LikeData } from "./Like";

export const postLike = (data: LikeReq) => {
  return request<Api<LikeData>>({
    url: "/house/like",
    method: "POST",
    data,
  });
};

export const postCancelLike = (data: LikeReq) => {
  return request<Api<LikeData>>({
    url: "/house/cancelLike",
    method: "POST",
    data,
  });
};
