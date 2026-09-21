"use client";

import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

type VideoCardProps = {
  src: string;
  caption: string;
  className?: string;
};

export function VideoCard({ src, caption, className }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className={cn("relative aspect-[4/3] overflow-hidden rounded-3xl", className)}>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover"
      />
      <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4 rounded-2xl bg-black/40 px-5 py-4 backdrop-blur">
        <button
          type="button"
          onClick={toggle}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-white"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" fill="currentColor" />
          ) : (
            <Play className="h-4 w-4" fill="currentColor" />
          )}
        </button>
        <div>
          <p className="text-sm text-white">{caption}</p>
          <button type="button" onClick={toggle} className="mt-0.5 text-xs font-medium text-white/80 hover:text-white">
            Watch Video →
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
