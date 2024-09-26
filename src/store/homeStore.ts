import { ListData } from "@/service/hourse/List";
import { create } from "zustand";

export type HomeStore = Partial<ListData>;

export const useHomeStore = create<HomeStore>()((set) => ({}));
