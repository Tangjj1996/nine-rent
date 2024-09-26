import { ListData } from "@/service/hourse/List";
import { create } from "zustand";

export type LikeStore = Partial<ListData>;

export const useLikeStore = create<LikeStore>()((set) => ({}));
