import useStore from "@/store/use-store";
import type { Song } from "@/type/artist";
export default function SearchResult({ song }: { song: Song }) {
  const setPlayingSong = useStore((state) => state.setPlayingSong);

  return (
    <button
      className="flex gap-1.5 rounded-md bg-black/25 p-1 hover:bg-black/50"
      onClick={() =>
        setPlayingSong({
          songId: song.id,
          playlistId: undefined,
        })
      }
    >
      <img className="w-12 rounded-2xl" src={song.coverUrl} />

      <div className="flex flex-col justify-start items-start">
        <div className="text-white text-nowrap">{song.title}</div>
        <div className="text-gray-400">{song.artist.name}</div>
      </div>
    </button>
  );
}
