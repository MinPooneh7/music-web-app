import { useQuery } from "@tanstack/react-query";
import Song from "../components/songs/song";
import { getLike } from "@/api/like/list-like";
import { Heart } from "lucide-react";

export default function LikesPage() {
  const { isPending, error, data } = useQuery({
    queryKey: ["likes"],
    queryFn: () => getLike(),
  });

  return (
    <div className="flex p-3 bg-linear-to-r from-primary to-secondary overflow-auto h-screen justify-start items-start">
      {data && (
        <div className="flex flex-col gap-2 w-full">
          <div className="flex w-full gap-1 py-5 px-4 border-0 rounded-2xl bg-black/50 items-center">
            <div className="flex items-center justify-center border-0 rounded-3xl bg-linear-to-r from-secondary to-primary-muted/10 w-30 h-30">
              <Heart
                className="flex justify-center items-center text-white"
                fill={"#fff"}
                size={40}
              />
            </div>
            <div className="flex flex-col px-2.5">
              <span className="text-3xl font-bold text-text">Liked Songs</span>
              <span className="text-xl text-text">
                Your favorite songs in one place
              </span>
            </div>
          </div>
          <div className="flex flex-col w-full gap-1 py-5 px-4 border-0 rounded-2xl bg-black/50">
            {data.map((like) => (
              <Song song={like.song} key={like.id} isFromFavorites />
            ))}
          </div>
        </div>
      )}
      {isPending && <span>loading...</span>}
      {error && <span>Something went wrong!</span>}
    </div>
  );
}
