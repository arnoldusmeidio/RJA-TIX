import { User } from "@/types";
import { set } from "date-fns";
import { create } from "zustand";

interface UserStore {
  user: User | null;
  update: (user: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  update: (user) => set(() => ({ user })),
}));
