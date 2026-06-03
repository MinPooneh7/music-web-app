import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { findOneArtist } from "../api/artists/find-one";
import Song from "../components/songs/song";

export default function ArtistPage() {
  const { artistId } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["artist", artistId],
    queryFn: () => findOneArtist(artistId!),
  });

  return (
    <div className="items-center justify-center flex w-full">
      {data && (
        <div className="flex flex-col gap-2 p-1">
          <div className="flex gap-2 items-center p-2 h-full w-full backdrop-blur-2xl border-gray-100 border-0 rounded-2xl bg-black/30">
            <div className="flex flex-col">
              <div className="flex flex-col items-center justify-center text-white">
                <div className="text-3xl font-bold"> {data.name}</div>
                <div className="text-sm text-nowrap">{data.activeYears} </div>
              </div>
              <div className="leading-loose text-lg text-text text-center px-2">
                {data.description}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full gap-1 py-5 px-4 border-0 rounded-2xl bg-black/30">
            {data.songs.map((song) => (
              <Song song={song} key={song.id} />
            ))}
          </div>
        </div>
      )}
      {isPending && <span>loading...</span>}
      {error && <span>Something went wrong!</span>}
    </div>
  );
}
