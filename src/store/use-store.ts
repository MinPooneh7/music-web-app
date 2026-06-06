import type { User } from "@/type/user";
import { create } from "zustand";

interface PlayingSong {
  songId: string | undefined;
  playlistId: string | undefined; // "favorites" for liked song
}

interface Store {
  user: User | undefined | null;
  setUser: (user: User | null) => void;
  playingSong: PlayingSong | undefined;
  setPlayingSong: (song: PlayingSong | undefined) => void;
}

const useStore = create<Store>((set) => ({
  user: undefined,
  setUser: (user) => set({ user }),
  playingSong: undefined,
  setPlayingSong: (playingSong) => set({ playingSong }),
}));

export default useStore;
