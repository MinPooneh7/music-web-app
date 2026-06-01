import { getSong } from "@/api/song";
import MusicPlayer from "@/components/songs/player";
import { useQuery } from "@tanstack/react-query";

import { motion } from "motion/react";

import { useParams } from "react-router-dom";

export default function SongDetailsPage() {
  const { songId, playlistId } = useParams();

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["song", songId],
    queryFn: () => getSong(songId!, playlistId),
  });

  const onSongLikeSuccess = () => {
    refetch();
  };

  return (
    <motion.div
      key={songId}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="h-screen bg-linear-to-r from-primary to-secondary"
    >
      {data && (
        <div className="flex flex-col gap-7 justify-center items-center w-screen p-17">
          <div className="text-text text-xl">{data.artist.shortBio}</div>
          <div className="flex flex-col gap-2 p-9 rounded-xl border bg-white">
            <div className="flex flex-col">
              <img
                className="w-120 border border-black rounded-4xl"
                src={data.coverUrl}
              />
            </div>
            <div className="text-black text-4xl">{data.title}</div>
            <div className="text-black text-2xl">{data.artist.name}</div>

            <div className="flex flex-co">
              <MusicPlayer
                song={data}
                key={songId}
                playlistId={playlistId}
                onLikeSuccess={onSongLikeSuccess}
              />
            </div>
          </div>
        </div>
      )}
      {isPending && <span>loading...</span>}
      {error && <span>Something went wrong!</span>}
    </motion.div>
  );
}
