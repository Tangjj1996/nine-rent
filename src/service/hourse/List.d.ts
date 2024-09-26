import { HouseType } from "./shared";

export interface ListReq {
  current: number;
  page_size: number;
  type?: HouseType;
}

export interface ListPageData {
  id: number;
  key: string;
  cover: string;
  title: string;
  content: string;
  like_count: number;
  avatar: string;
  nick_name: string;
  is_liked: boolean;
}

export interface ListData {
  list: ListPageData[];
  total: number;
  current: number;
  page_size: number;
}
