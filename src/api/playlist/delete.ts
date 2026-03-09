import type { PlayList } from "@/type/play-list";
import axiosInstance from "../base";

export async function deletePlayList(id :string) {
  const { data } = await axiosInstance.delete<PlayList>(`/playlists/${id}`);

  return data;
}
