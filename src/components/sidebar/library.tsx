import { useState } from "react";

import { motion, AnimatePresence } from "motion/react";
import Playlist from "../playlist";
import { Heart, ListMusic } from "lucide-react";
import { Link } from "react-router-dom";

export default function Library() {
  const [playlistHover, setPlaylistHover] = useState(false);
  return (
    <div>
      <span className="py-2 p-2 text-gray-400 w-full flex justify-start">
        LIBRARY
      </span>
      <>
        <div
          className="relative"
          onMouseEnter={() => setPlaylistHover(true)}
          onMouseLeave={() => setPlaylistHover(false)}
        >
          <div className="flex gap-2 py-2 cursor-pointer hover:border-0 hover:rounded-3xl hover:bg-secondary/50 p-2 w-full justify-start">
            <ListMusic />
            PLAYLIST
          </div>

          <AnimatePresence>{playlistHover && <Playlist />}</AnimatePresence>
        </div>

        <motion.div
          animate={{
            y: playlistHover ? 180 : 0,
          }}
          transition={{
            duration: 0.3,
          }}
        >
          <Link
            to="/likes"
            className="flex gap-2 py-2 hover:border-0 hover:rounded-3xl hover:bg-secondary/50 p-2 w-full justify-start"
          >
            <Heart />
            FAVORITE
          </Link>
        </motion.div>
      </>
    </div>
  );
}
