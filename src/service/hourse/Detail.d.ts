export interface DetailReq {
  id: number;
}

export interface DetailData {
  id: number;
  key: string;
  cover: string;
  title: string;
  content: string;
  like_count: number;
  collection_count: number;
  avatar: string;
  nick_name: string;
  is_liked: boolean;
  is_collection: boolean;
  swiper: string[];
  tags: string[];
}
