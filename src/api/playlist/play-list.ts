import type { PlayList } from "@/type/play-list";
import axiosInstance from "../base";

export async function getPlayList() {
  const { data } = await axiosInstance.get<Response>(`/playlists`);

  return data;
}

interface Response {
  playlists: PlayList[];
}
