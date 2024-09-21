import { request } from "@/lib/request";
import { ProfileData } from "./Profile";

export const getProfile = () => {
  return request<Api<ProfileData>>({
    url: "/user/getProfile",
    method: "GET",
  });
};
