import type { Song } from "../../type/artist";

import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { cn, convertTime } from "@/lib/utils";
import useStore from "@/store/use-store";
import { Play } from "lucide-react";

export default function Song({
  song,
  isFromFavorites,
}: {
  song: Song;
  isFromFavorites?: boolean;
}) {
  const setPlayingSong = useStore((state) => state.setPlayingSong);
  const playingSong = useStore((state) => state.playingSong);

  const isPlaying = playingSong?.songId === song.id;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-3 w-full h-17 rounded-xl hover:bg-white/10 px-3",
            isPlaying ? "bg-white/10" : " bg-black/25",
          )}
          onClick={() =>
            setPlayingSong({
              songId: song.id,
              playlistId: isFromFavorites ? "favorites" : undefined,
            })
          }
        >
          <img
            className="w-17 h-17 rounded-xl shrink-0 p-1"
            src={song.coverUrl}
            alt={song.title}
          />

          <div className="flex-1 text-start text-white text-2xl gap-1">
            {song.title}
          </div>
          <span className="flex flex-col text-sm text-gray-400">
            {convertTime(song.durationSec)}
          </span>
          <span className="border-0 rounded-full bg-primary-muted p-2">
            <Play className="text-primary-dark" size={15} />
          </span>
        </button>
      </TooltipTrigger>
    </Tooltip>
  );
}
