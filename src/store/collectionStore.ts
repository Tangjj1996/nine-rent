import { ListData } from "@/service/hourse/List";
import { create } from "zustand";

export type CollectionStore = Partial<ListData>;

export const useCollectionStore = create<CollectionStore>()((set) => ({}));
