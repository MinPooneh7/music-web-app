import { findSong } from "@/api/songs/find-song";
import { useDebounce } from "@/hooks/use-debounce";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SearchResult from "./songs/search-result";
import { Search as SearchIcon } from "lucide-react";

export default function Search() {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const { isFetching, error, data } = useQuery({
    queryKey: ["search-song", debouncedSearch],
    queryFn: () => findSong(debouncedSearch),
    enabled: !!debouncedSearch,
  });

  return (
    <div>
      <div className="flex flex-col text-6xl text-text gap-1 p-10 px-40">
        <span className="text-4xl px-2 text-white">Search</span>
        <span className="text-xl px-2 text-gray-300">
          Find your favorite artist
        </span>
      </div>
      <div className="items-center justify-center flex gap-2">
        <SearchIcon className="absolute text-amber-300 py-3" />
        <input
          className="flex items-center justify-center border rounded-sm bg-gray-300/50 border-text py-2 hover:ring-10 ring-primary w-328 text-text px-2"
          value={search}
          onChange={handleChange}
        />
      </div>
      {data && (
        <div className="absolute z-100 flex flex-col py-2 bg-primary justify-center w-358 divide-y divide-gray-300">
          {data.results.map((song) => (
            <SearchResult song={song} key={song.id} />
          ))}
          {data.results.length === 0 && (
            <span className="text-text">Song not found :(</span>
          )}
        </div>
      )}

      {isFetching && <span>loading...</span>}
      {error && <span>erorrr!</span>}
    </div>
  );
}
