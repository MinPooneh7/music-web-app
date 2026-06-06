import { House, Search } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Explore() {
  const baseClass =
    "flex gap-2 py-2 p-2 w-full justify-start rounded-3xl transition-colors";

  return (
    <div>
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `${baseClass} ${
            isActive ? "bg-primary-dark/90" : "hover:bg-primary-dark/50"
          }`
        }
      >
        <House />
        HOME
      </NavLink>

      <NavLink
        to="/search"
        className={({ isActive }) =>
          `${baseClass} ${isActive ? "bg-primary-dark/90" : "hover:bg-primary-dark/50"}`
        }
      >
        <Search />
        SEARCH
      </NavLink>
    </div>
  );
}
