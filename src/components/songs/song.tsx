import type { Song } from "../../type/artist";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { convertTime } from "@/lib/utils";
import useStore from "@/store/use-store";

export default function Artist({ song }: { song: Song }) {
  const setPlayingSong = useStore((state) => state.setPlayingSong);

  return (
    <Tooltip>
      <TooltipTrigger>
        <button
          className="flex flex-col gap-4 h-full border rounded-3xl p-2.5 bg-black hover:ring-4 ring-white/50"
          onClick={() =>
            setPlayingSong({
              songId: song.id,
              playlistId: undefined,
            })
          }
        >
          <img
            className="object-cover h-full rounded-3xl"
            src={song.coverUrl}
          />
          <div className="text-white text-2xl text-center">{song.title}</div>
        </button>
      </TooltipTrigger>
      <TooltipContent className="border-3 bg-primary text-text">
        {convertTime(song.durationSec)}
      </TooltipContent>
    </Tooltip>
  );
}
