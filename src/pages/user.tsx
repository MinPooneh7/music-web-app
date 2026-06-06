import useStore from "@/store/use-store";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SettingsAvatar from "@/components/settings-avatar";

import { useQuery } from "@tanstack/react-query";
import { getPlayList } from "@/api/playlist/play-list";
import ThemePicker from "@/components/theme-picker";
import Logout from "@/components/logout";
import Delete from "@/components/ui/delete";
import MusicPlayer from "@/components/player/player";
import type { PlayList } from "@/type/play-list";

export default function UserPage() {
  const user = useStore((state) => state.user);
  const navigate = useNavigate();

  const { data, refetch } = useQuery({
    queryKey: ["song"],
    queryFn: () => getPlayList(),
  });

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const setPlayingSong = useStore((state) => state.setPlayingSong);

  const onClick = (playlist: PlayList) => {
    if (playlist.playlistTrack?.length)
      setPlayingSong({
        songId: playlist.playlistTrack[0].songId,
        playlistId: playlist.id,
      });
  };

  return (
    <div className="flex gap-4 h-full py-17">
      <div className="max-w-7xl mx-auto bg-gray-300/40 overflow-auto border-primary rounded-4xl flex flex-col justify-between gap-9 p-7 w-full">
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between w-full px-50">
            <div className="flex gap-3 items-center">
              <SettingsAvatar />

              <div className="flex flex-col">
                <div className="text-text font-bold text-4xl">
                  {user?.username}
                </div>

                <div className="text-text">{user?.email}</div>
              </div>
            </div>

            <ThemePicker />
          </div>

          <div className="border-0 rounded-xl overflow-clip px-5 py-2 bg-white/20  hover:bg-gray-300/40 backdrop-blur-xl border-primary h-15">
            <Link
              to="/likes"
              className="flex items-center justify-center w-full h-full text-2xl font-bold text-text"
            >
              Favorite
            </Link>
          </div>

          <div className="flex flex-col gap-5 w-full">
            {data?.playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="flex items-center justify-between gap-2 rounded-xl bg-white/20 px-5 py-2 hover:bg-gray-300/40 backdrop-blur-2xl h-15"
              >
                <button
                  key={playlist.id}
                  className="border-gray-300 w-full flex justify-start"
                  onClick={() => onClick(playlist)}
                >
                  <span className="text-text text-2xl font-bold">
                    {playlist.name}
                  </span>
                </button>

                <Delete id={playlist.id} onSuccess={() => refetch()} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center w-full">
          <Logout />
        </div>
      </div>
    </div>
  );
}
