import { getPlayList } from "@/api/playlist/play-list";
import CreatePlayList from "../playlist/create-playlist";
import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Library() {
  const onCreateSuccess = () => refetch();

  const { refetch } = useQuery({
    queryKey: ["song"],
    queryFn: () => getPlayList(),
  });

  const linkClass =
    "flex gap-2 py-2 p-2 w-full justify-start rounded-3xl transition-colors";

  return (
    <div>
      <span className="text-gray-400 flex w-full justify-start p-2">
        LIBRARY
      </span>

      <CreatePlayList onSuccess={onCreateSuccess} />

      <div className="flex">
        <NavLink
          to="/likes"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive ? "bg-primary-dark/90" : "hover:bg-primary-dark/50"
            }`
          }
        >
          <Heart />
          FAVORITE
        </NavLink>
      </div>
    </div>
  );
}
