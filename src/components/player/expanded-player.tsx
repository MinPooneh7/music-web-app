import { X } from "lucide-react";
import type { Song } from "../../type/artist";
import { motion } from "motion/react";

import useStore from "@/store/use-store";
import ExpandedMusicPlayer from "./old";

export default function ExpandedPlayer({
  onClose,
  song,
  onLikeSuccess,
}: {
  onClose: () => void;
  song: Song | undefined;
  onLikeSuccess: () => void;
}) {
  const playingSong = useStore((state) => state.playingSong);
  const handleClick = () => {
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.5,
      }}
      className="h-screen w-screen fixed inset-0 flex flex-col items-center justify-start bg-linear-to-r from-primary to-secondary  pt-5 px-5"
    >
      <div className="w-full flex">
        <X onClick={handleClick} className="text-primary-muted" size={30} />
      </div>
      {song && (
        <div className="flex flex-col gap-7 justify-center items-center w-full">
          <div className="text-text text-xl">{song?.artist.shortBio}</div>
          <div className="flex flex-col gap-2 p-9 rounded-xl border bg-white">
            <div className="flex flex-col">
              <img
                className="w-120 border border-black rounded-4xl"
                src={song?.coverUrl}
              />
            </div>
            <div className="text-black text-4xl">{song?.title}</div>
            <div className="text-black text-2xl">{song?.artist.name}</div>
            <div className="flex flex-co">
              <ExpandedMusicPlayer
                song={song}
                key={song.id}
                playlistId={playingSong?.playlistId}
                onLikeSuccess={onLikeSuccess}
              />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
