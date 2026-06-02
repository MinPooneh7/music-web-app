import MiniPlayer from "./mini-player";
import { useQuery } from "@tanstack/react-query";
import { getSong } from "@/api/song";
import useStore from "@/store/use-store";
import { useState } from "react";
import ExpandedPlayer from "./expanded-player";

export default function MusicPlayer() {
  const playingSong = useStore((state) => state.playingSong);

  const [isExpanded, setExpanded] = useState(false);

  const { data, refetch } = useQuery({
    queryKey: ["song", playingSong?.songId],
    enabled: !!playingSong?.songId,
    queryFn: () => getSong(playingSong!.songId!, playingSong?.playlistId),
  });

  const onSongLikeSuccess = () => {
    refetch();
  };

  const onExpand = () => setExpanded(true);
  const onClose = () => setExpanded(false);

  return (
    <div className="flex">
      <div className="boarder-0 bg-black/50 w-full">
        {isExpanded ? (
          <ExpandedPlayer
            onClose={onClose}
            song={data}
            onLikeSuccess={onSongLikeSuccess}
          />
        ) : (
          <MiniPlayer
            song={data}
            playlistId={playingSong?.playlistId}
            onLikeSuccess={onSongLikeSuccess}
            onExpand={onExpand}
          />
        )}
      </div>
    </div>
  );
}
