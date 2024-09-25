export interface DetailReq {
  id: number;
}

export interface DetailData {
  key: string;
  text: string;
  cover: string;
  avatar: string;
  like_count: number;
  author: string;
  isLiked: boolean;
}
