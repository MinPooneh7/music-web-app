import type { Song } from "../../type/artist";

import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { convertTime } from "@/lib/utils";
import useStore from "@/store/use-store";
import { Play } from "lucide-react";

export default function Artist({ song }: { song: Song }) {
  const setPlayingSong = useStore((state) => state.setPlayingSong);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className="flex items-center gap-3 w-full h-17 rounded-xl bg-black/25 hover:bg-white/20 px-3"
          onClick={() =>
            setPlayingSong({
              songId: song.id,
              playlistId: undefined,
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
