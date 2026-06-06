import { useQuery } from "@tanstack/react-query";
import { findAllArtists } from "../api/artists/find-all";

import Artist from "../components/artists/artist";

export default function HomePage() {
  const { isPending, error, data } = useQuery({
    queryKey: ["artists"],
    queryFn: () => findAllArtists(),
  });

  return (
    <div className="flex flex-col">
      <span className="text-white text-5xl font-bold left-0 py-5 px-6 ">
        Popular Artists
      </span>
      <span className="text-white text-xl left-0 px-7">
        What do you want to listen?!
      </span>
      <div className="flex flex-col items-center py-5">
        {data && (
          <div className="grid gap-5 grid-cols-1 lg:grid-cols-3">
            {data.map((artist) => (
              <Artist artist={artist} key={artist.id} />
            ))}
          </div>
        )}
        {isPending && <span>loading...</span>}
        {error && <span>Something went wrong!</span>}
      </div>
    </div>
  );
}
