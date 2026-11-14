"use client";

import { useState } from "react";
import Image from "next/image";

type VideoPlayerProps = {
  poster: string;
  title: string;
  src?: string;
  youtubeId?: string;
  className?: string;
  priority?: boolean;
};
export default function VideoPlayer({
  poster,
  title,
  src,
  youtubeId,
  className = "",
  priority = false,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      className={`relative aspect-video bg-cream-dark overflow-hidden flex items-center justify-center group ${className}`}
    >
      {!isPlaying ? (
        <>
          <Image
            src={poster}
            alt={title}
            fill
            priority={priority}
            sizes="(max-width: 820px) 100vw, 60vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/30 transition-colors" />

          {/* 84px Circle Play button with expanding ring and 1.08 scale */}
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            className="group/play relative z-10 w-21 h-21 rounded-full border-[1.5px] border-cream flex items-center justify-center text-cream transition-transform duration-300 ease-out @media(hover:hover):hover:scale-[1.08] focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-[3px] before:content-[''] before:absolute before:inset-0 before:rounded-full before:border before:border-cream before:transition-all before:duration-700 before:ease-out before:opacity-0 before:scale-100 @media(hover:hover):hover:before:scale-150 @media(hover:hover):hover:before:opacity-0 motion-reduce:transform-none motion-reduce:before:hidden"
            aria-label={`Play video: ${title}`}
          >
            <span className="text-[26px] ml-1 select-none leading-none" aria-hidden="true">
              ▶
            </span>
          </button>
        </>
      ) : youtubeId ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-none"
        />
      ) : src ? (
        <video
          controls
          autoPlay
          playsInline
          preload="none"
          className="w-full h-full object-cover"
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : null}
    </div>
  );
}
