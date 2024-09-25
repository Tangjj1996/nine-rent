export interface ListReq {
  current: number;
  page_size: number;
}

export interface ListPageData {
  author: string;
  avatar: string;
  cover: string;
  id: number;
  key: string;
  like_count: number;
  text: string;
  is_liked: boolean;
}

export interface ListData {
  list: ListPageData[];
  total: number;
  current: number;
  page_size: number;
}
