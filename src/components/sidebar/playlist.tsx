import { getPlayList } from "@/api/playlist/play-list";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";

export default function Playlist() {
  const { pathname } = useLocation();

  const { data, isLoading, error } = useQuery({
    queryKey: ["song"],
    queryFn: getPlayList,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error loading playlists</div>;

  return (
    <div>
      <span className="py-2 p-2 text-gray-400 w-full flex justify-start">
        PLAYLISTS
      </span>

      {data?.playlists?.map((playlist, index) => {
        const isActive = pathname.includes(`/playlists/${playlist.id}`);

        return (
          <div key={playlist.id}>
            <div
              className={`overflow-clip px-5 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-gray-300/40 backdrop-blur-2xl"
                  : "hover:bg-gray-300/40"
              }`}
            >
              <Link
                to={
                  playlist.playlistTrack?.length
                    ? `/playlists/${playlist.id}/songs/${playlist.playlistTrack[0].songId}`
                    : "#"
                }
              >
                <p className="truncate w-fit text-white">{playlist.name}</p>
              </Link>
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
