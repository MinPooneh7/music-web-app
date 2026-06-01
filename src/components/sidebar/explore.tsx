import { House, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function Explore() {
  return (
    <div>
      <Link
        to="/"
        className="flex gap-2 py-2 hover:border-0 hover:rounded-3xl hover:bg-secondary/50 p-2 w-full justify-start"
      >
        <House />
        HOME
      </Link>

      <Link
        to="/search"
        className="flex gap-2 py-2 hover:border-0 hover:rounded-3xl hover:bg-secondary/50 p-2 w-full justify-start"
      >
        <Search />
        SEARCH
      </Link>
    </div>
  );
}
