import type { Song } from "@/type/artist";
import { Link } from "react-router-dom";
export default function SearchResult({ song }: { song: Song }) {
  return (
    <Link
      to={`/songs/${song.id}`}
      className="flex gap-1.5 rounded-md bg-black/25 p-1 hover:bg-black/50"
    >
      <div>
        <img className="w-12 rounded-2xl" src={song.coverUrl} />
      </div>
      <div className="flex flex-col">
        <div className="text-white">{song.title}</div>
        <div className="text-gray-400">{song.artist.name}</div>
      </div>
    </Link>
  );
}
