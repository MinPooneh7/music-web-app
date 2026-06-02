import { X } from "lucide-react";
import type { Song } from "../../type/artist";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { convertTime } from "@/lib/utils";
import useStore from "@/store/use-store";

export default function ExpandedPlayer({
  onClose,
  song,
}: {
  onClose: () => void;
  song: Song | undefined;
}) {
  const setPlayingSong = useStore((state) => state.setPlayingSong);

  return (
    <div className="h-screen w-screen fixed inset-0 flex flex-col p-20 bg-black">
      <X onClick={onClose} className="text-red-500" size={20} />
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
              <MiniPlayer
                song={data}
                key={songId}
                playlistId={playlistId}
                onLikeSuccess={onSongLikeSuccess}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
