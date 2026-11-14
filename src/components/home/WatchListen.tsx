"use client";

import { useState } from "react";
import Link from "next/link";
import Wrap from "@/components/ui/Wrap";
import Reveal from "@/components/ui/Reveal";
import videosData from "@/data/videos.json";

type VideoItem = {
  title: string;
  file: string;
  poster: string | null;
  date: string | null;
};

type WatchListenProps = {
  videos?: unknown;
  showPlaceholders?: boolean;
};

export default function WatchListen({}: WatchListenProps = {}) {
  const [activeVideo, setActiveVideo] = useState<VideoItem>(videosData[0]);
  const sideVideos = videosData.filter((v) => v.file !== activeVideo?.file);

  return (
    <section className="bg-navy text-cream py-16 desk:py-24" aria-label="Watch & Listen">
      <Wrap>
        {/* Header: h2 cream left, "All videos →" right */}
        <div className="flex justify-between items-end mb-11">
          <Reveal variant="mask">
            <h2 className="h2 font-display font-black text-cream">
              Watch &amp; <em className="font-medium italic">Listen</em>
            </h2>
          </Reveal>
          <Link
            href="/videos"
            className="text-[11px] tracking-[0.16em] uppercase font-body text-cream border-b border-cream pb-1 hover:text-gold-text hover:border-gold-text transition-colors"
          >
            All videos &rarr;
          </Link>
        </div>

        {/* Desktop: 60/40 split with 48px gap (gap-12). Mobile: stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-[60%_calc(40%-3rem)] gap-12 items-start">
          {/* Left: Main player (60% on desktop) */}
          <div className="w-full flex flex-col">
            {activeVideo ? (
              <div className="w-full aspect-video bg-navy overflow-hidden border border-cream/20 rounded-none">
                <video
                  key={activeVideo.file}
                  controls
                  playsInline
                  preload="metadata"
                  poster={activeVideo.poster ?? undefined}
                  className="w-full h-full object-cover"
                >
                  <source src={activeVideo.file} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : null}
            {activeVideo?.title && (
              <h3 className="font-display font-bold text-[24px] sm:text-[30px] leading-[1.1] text-cream mt-4">
                {activeVideo.title}
              </h3>
            )}
          </div>

          {/* Right: List (40% on desktop) */}
          <div className="flex flex-col justify-start gap-5 w-full">
            {sideVideos.length > 0 ? (
              sideVideos.map((video, idx) => (
                <button
                  key={`${video.file}-${idx}`}
                  type="button"
                  onClick={() => setActiveVideo(video)}
                  className="grid grid-cols-[160px_1fr] gap-4 items-center pb-5 border-b border-cream/[0.18] text-left cursor-pointer group focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
                >
                  <div className="relative aspect-video bg-navy overflow-hidden border border-cream/20 rounded-none flex items-center justify-center shrink-0">
                    <span className="text-[20px] text-cream/70 leading-none group-hover:text-gold-text transition-colors" aria-hidden="true">
                      ▶
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    {video.date && (
                      <span className="font-body text-xs uppercase tracking-wider text-gold-text mb-1 block">
                        {video.date}
                      </span>
                    )}
                    <h4 className="font-display text-[18px] sm:text-[20px] leading-[1.2] text-cream group-hover:text-gold-text transition-colors line-clamp-2">
                      {video.title}
                    </h4>
                  </div>
                </button>
              ))
            ) : (
              <div className="py-6 border-t border-cream/[0.18]">
                <p className="font-body text-cream text-[16px] leading-relaxed m-0">
                  More interviews coming soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </Wrap>
    </section>
  );
}
