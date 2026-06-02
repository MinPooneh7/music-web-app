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
    <div className="flex flex-col w-328 mx-auto">
      <div className="flex flex-col text-6xl text-text gap-1 py-10">
        <span className="text-4xl px-2 text-white items-start">Search</span>
        <span className="text-xl px-2 text-gray-300">
          Find your favorite music!
        </span>
      </div>

      <div className="items-center justify-center flex w-full">
        <div className="relative flex w-full">
          <div className="absolute top-0 left-0 ps-3 flex items-center justify-center h-full">
            <SearchIcon className="text-white" />
          </div>
          <input
            className="flex items-center justify-center w-full border-0 rounded-md ps-12 bg-gray-300/50 border-text py-2 hover:ring-5 ring-primary text-text px-2"
            placeholder="Search songs..."
            value={search}
            onChange={handleChange}
          />
        </div>
      </div>
      {data && (
        <div className="flex flex-col z-100  py-1 w-328 divide-y divide-gray-300">
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
