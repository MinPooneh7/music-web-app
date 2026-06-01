import { getPlayList } from "@/api/playlist/play-list";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export default function Playlist() {
  const { data } = useQuery({
    queryKey: ["song"],
    queryFn: getPlayList,
  });

  return (
    <motion.div
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -200, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute left-0 top-full mt-2 w-full bg-primary rounded-lg overflow-hidden z-50"
    >
      {data?.playlists?.map((playlist) => (
        <div
          key={playlist.id}
          className="px-4 py-3 border-b border-gray-300 last:border-b-0"
        >
          <Link
            to={
              playlist.playlistTrack?.length
                ? `/playlists/${playlist.id}/songs/${playlist.playlistTrack[0].songId}`
                : "#"
            }
            className="block text-text truncate"
          >
            {playlist.name}
          </Link>
        </div>
      ))}
    </motion.div>
  );
}
