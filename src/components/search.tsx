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
    <div className="relative w-full">
      <SearchIcon className="absolute right-2 top-1/115 text-text" />
      <input
        className="bg-gray-300/50 border-text py-2 px-200 hover:ring-10 ring-primary w-full text-text"
        value={search}
        onChange={handleChange}
      />
      {data ? (
        <div className="absolute z-100 flex flex-col py-2 bg-primary w-full px-2 divide-y divide-gray-300">
          {data.results.map((song) => (
            <SearchResult song={song} key={song.id} />
          ))}
          {data.results.length === 0 && (
            <span className="text-text">Song not found :(</span>
          )}
        </div>
      ) : (
        <div className="flex flex-col text-6xl text-text items-center justify-center h-screen gap-2">
          <SearchIcon size={200} />
          Search..!
        </div>
      )}

      {isFetching && <span>loading...</span>}
      {error && <span>erorrr!</span>}
    </div>
  );
}
