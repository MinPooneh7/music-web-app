import MusicPlayer from "./songs/player";
import { useQuery } from "@tanstack/react-query";
import { getSong } from "@/api/song";
import useStore from "@/store/use-store";

export default function MiniPlayer() {
  const playingSong = useStore((state) => state.playingSong);

  const { data, refetch } = useQuery({
    queryKey: ["song", playingSong?.songId],
    enabled: !!playingSong?.songId,
    queryFn: () => getSong(playingSong!.songId!, playingSong?.playlistId),
  });

  const onSongLikeSuccess = () => {
    refetch();
  };

  return (
    <div className="flex">
      <div className="boarder-0 bg-black/50 w-full">
        <MusicPlayer
          song={data}
          playlistId={playingSong?.playlistId}
          onLikeSuccess={onSongLikeSuccess}
        />
      </div>
    </div>
  );
}
