import { Music } from "lucide-react";
import { Link } from "react-router-dom";
import useStore from "@/store/use-store";
import Profile from "@/assets/profile.jpg";
import Library from "./library";
import Explore from "./explore";
import Playlist from "./playlist";

export default function Sidebar() {
  const user = useStore((state) => state.user);
  return (
    <div className="flex flex-col text-white gap-2 h-full bg-black/60 justify-between p-3 w-80">
      <div className="flex flex-col gap-7">
        <div className="flex gap-2 py-2 p-2 w-full justify-start text-2xl">
          <Music className="text-secondary" size={28} />
          Melody
        </div>
        <Explore />
        <Library />
        <Playlist />
      </div>

      {user ? (
        <Link to="/user" className="flex gap-2 items-center p-2">
          <img
            className="border-0 rounded-full w-15 h-15"
            src={user.avatar || Profile}
            alt=""
          />
          <div className="text-2xl text-text">{user.username}</div>
        </Link>
      ) : (
        <Link to="/login" className="text-2xl font-bold text-text">
          Login
        </Link>
      )}
    </div>
  );
}
