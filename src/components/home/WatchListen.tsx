import Link from "next/link";
import Wrap from "@/components/ui/Wrap";
import Reveal from "@/components/ui/Reveal";
import VideoPlayer from "@/components/ui/VideoPlayer";
import type { Video } from "@/types";

type WatchListenProps = {
  videos: Video[];
  showPlaceholders: boolean;
};

export default function WatchListen({ videos, showPlaceholders }: WatchListenProps) {
  const primaryVideo = videos[0];
  const sideVideos = videos.slice(1);
  const sideSlotsCount = 4;
  const missingCount = sideSlotsCount - sideVideos.length;

  return (
    <section className="bg-navy text-cream py-[100px]" aria-label="Watch & Listen">
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

        {/* Grid 1.6fr / 1fr, gap 48px */}
        <div className="grid grid-cols-1 desk:grid-cols-[1.6fr_1fr] gap-12">
          {/* Left: Primary video */}
          <div>
            {primaryVideo ? (
              <>
                <VideoPlayer
                  poster={primaryVideo.poster}
                  title={primaryVideo.title}
                  src={primaryVideo.src}
                  youtubeId={primaryVideo.youtubeId}
                />
                <h3 className="font-display font-bold text-[36px] leading-[1.05] text-cream mt-[22px]">
                  {primaryVideo.title}
                </h3>
              </>
            ) : (
              <div className="aspect-video bg-navy border border-cream/20 flex flex-col items-center justify-center p-6 text-center">
                <span className="text-3xl text-cream/40 mb-3">▶</span>
                <p className="font-display text-xl text-cream/60">Coming soon</p>
              </div>
            )}
          </div>

          {/* Right: Side video rows */}
          <div className="flex flex-col justify-between gap-5 desk:gap-0">
            {/* Real side videos */}
            {sideVideos.map((video) => (
              <div
                key={video.id}
                className="grid grid-cols-[150px_1fr] gap-[18px] items-center pb-5 border-b border-cream/[0.18]"
              >
                <div className="relative aspect-video bg-cream-dark overflow-hidden">
                  <VideoPlayer
                    poster={video.poster}
                    title={video.title}
                    src={video.src}
                    youtubeId={video.youtubeId}
                  />
                </div>
                <h4 className="font-display text-[19px] leading-[1.15] text-cream">
                  {video.title}
                </h4>
              </div>
            ))}

            {/* Ghost rows if fewer than 4 and showPlaceholders is true */}
            {showPlaceholders &&
              Array.from({ length: Math.max(0, missingCount) }).map((_, idx) => {
                const isLast = idx === missingCount - 1;
                return (
                  <div
                    key={`ghost-video-${idx}`}
                    className={`grid grid-cols-[150px_1fr] gap-[18px] items-center pb-5 select-none ${
                      isLast ? "" : "border-b border-cream/[0.18]"
                    }`}
                    aria-hidden="true"
                  >
                    <div className="aspect-video border border-cream/20 bg-cream/5 flex items-center justify-center">
                      <span className="text-cream/30 text-sm">▶</span>
                    </div>
                    <span className="font-display text-[19px] leading-[1.15] text-cream/60">
                      Coming soon
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      </Wrap>
    </section>
  );
}
