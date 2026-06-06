import React, { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  Repeat,
  SkipForward,
  SkipBack,
  Expand,
} from "lucide-react";
import Add from "../add-track";
import Like from "../ui/like";
import type { Song } from "@/type/artist";
import useStore from "@/store/use-store";

interface MusicPlayerProps {
  song: Song | undefined;
  playlistId?: string;
  onLikeSuccess: () => void;
  onExpand: () => void;
}

const MiniPlayer: React.FC<MusicPlayerProps> = ({
  song,
  playlistId,
  onLikeSuccess,
  onExpand,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const setPlayingSong = useStore((state) => state.setPlayingSong);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const onPrev = () => {
    setPlayingSong({
      songId: song!.prevSongId!,
      playlistId: playlistId,
    });
  };

  const onNext = () => {
    setPlayingSong({
      songId: song!.nextSongId!,
      playlistId: playlistId,
    });
  };

  // Load metadata
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  // Play / Pause toggle
  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      await audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  // Loop toggle
  const toggleLoop = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = !isLooping;
    setIsLooping(!isLooping);
  };

  // Seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = Number(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Format time
  const formatTime = (time: number) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const tryPlay = async () => {
      try {
        await audio.play();
      } catch (err: unknown) {
        setIsPlaying(false);
        console.error(err);
      }
    };

    tryPlay();
  }, [song?.previewUrl]);

  return (
    <div
      className={`flex gap-2 p-2 bg-black/20 text-white w-full justify-between`}
    >
      <audio ref={audioRef} src={song?.previewUrl} autoPlay />
      <div className="flex gap-2 w-50">
        <div className="flex gap-1 items-end">
          <img src={song?.coverUrl} className="w-15 h-15 border-0 rounded-md" />
          <div className="flex flex-col">
            <span>{song?.title}</span>
            <span className="whitespace-nowrap">{song?.artist.name}</span>
          </div>
        </div>

        <button
          onClick={toggleLoop}
          className={`transition ${
            isLooping
              ? "text-black hover:text-gray-700"
              : "text-white hover:text-gray-700"
          }`}
        ></button>
      </div>

      <div className="flex justify-center items-center gap-3">
        {song && <Like song={song} onSuccess={onLikeSuccess} />}
        <button
          onClick={onPrev}
          disabled={!song?.prevSongId}
          className="disabled:text-gray-500 hover:text-primary"
        >
          <SkipBack />
        </button>
        <button
          onClick={togglePlay}
          className="p-4 bg-black hover:bg-primary rounded-full transition"
        >
          {isPlaying ? <Pause /> : <Play />}
        </button>
        <button
          onClick={onNext}
          disabled={!song?.nextSongId}
          className="disabled:text-gray-400 hover:text-primary"
        >
          <SkipForward />
        </button>
        <Repeat className="hover:text-primary" />
      </div>

      <div className="flex gap-2 items-center justify-center">
        <span className="text-sm w-10">{formatTime(currentTime)}</span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={currentTime}
          onChange={handleSeek}
          className="flex justify-end items-end accent-primary cursor-pointer w-100"
        />
        <span className="text-sm">{formatTime(duration)}</span>
        {song && <Add songId={song.id} />}
        {song && (
          <Expand className="text-primary-muted" size={20} onClick={onExpand} />
        )}
      </div>
    </div>
  );
};

export default MiniPlayer;
