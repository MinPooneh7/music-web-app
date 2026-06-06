import { Link } from "react-router-dom";
import type { Artist } from "../../type/artist";

export default function Artist({ artist }: { artist: Artist }) {
  return (
    <Link
      to={`/artists/${artist.id}`}
      className="duration-300 hover:-translate-y-2"
    >
      <div
        className="
          relative
          h-105
          overflow-hidden
          rounded-3xl
          bg-black
          border border-white/10
          shadow-[0_8px_40px_rgba(0,0,0,.5)]
        "
      >
        <img
          src={artist.imageUrl}
          alt={artist.name}
          className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-500
            hover:scale-105
          "
        />

        <div
          className="
            absolute
            inset-0
            z-10
            bg-linear-to-t
            from-black
            via-black/70
            via-30%
            to-transparent
          "
        />

        <div
          className="absolute inset-0 z-20"
          style={{
            background:
              "radial-gradient(circle at center, transparent 35%, rgba(0,0,0,.55) 100%)",
          }}
        />

        <div className="absolute bottom-0 left-0 z-30 p-6">
          <h2 className="text-white text-4xl font-semibold">{artist.name}</h2>

          <p className="text-gray-300 text-lg">{artist.activeYears}</p>
        </div>
      </div>
    </Link>
  );
}
