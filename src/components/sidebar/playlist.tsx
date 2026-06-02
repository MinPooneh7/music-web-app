import { getPlayList } from "@/api/playlist/play-list";
import useStore from "@/store/use-store";
import type { PlayList } from "@/type/play-list";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

export default function Playlist() {
  const { pathname } = useLocation();

  const setPlayingSong = useStore((state) => state.setPlayingSong);

  const { data, isLoading, error } = useQuery({
    queryKey: ["song"],
    queryFn: getPlayList,
  });

  const onClick = (playlist: PlayList) => {
    if (playlist.playlistTrack?.length)
      setPlayingSong({
        songId: playlist.playlistTrack[0].songId,
        playlistId: playlist.id,
      });
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error loading playlists</div>;

  return (
    <div>
      <span className="py-2 p-2 text-gray-400 w-full flex justify-start">
        PLAYLISTS
      </span>

      {data?.playlists?.map((playlist, index) => {
        const isActive = pathname.includes(`/playlists/${playlist.id}`);

        if (playlist.playlistTrack.length === 0) return;

        return (
          <div key={playlist.id}>
            <div
              className={`overflow-clip px-5 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-gray-300/40 backdrop-blur-2xl"
                  : "hover:bg-gray-300/40"
              }`}
            >
              <button
                key={playlist.id}
                className="border-b border-gray-300 last:border-b-0 w-full flex justify-start"
                onClick={() => onClick(playlist)}
              >
                <span className="block text-white truncate">
                  {playlist.name}
                </span>
              </button>
            </div>

            {index !== data.playlists.length - 1 && (
              <div className="h-px bg-gray-200 my-2" />
            )}
          </div>
        );
      })}
    </div>
  );
}
