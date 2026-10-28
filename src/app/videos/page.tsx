import type { Metadata } from "next";
import Wrap from "@/components/ui/Wrap";
import WatchListen from "@/components/home/WatchListen";
import ShortsSection from "@/components/home/ShortsSection";
import { videos } from "@/content/videos";
import { shorts } from "@/content/shorts";
import { showMediaPlaceholders } from "@/lib/flags";

export const metadata: Metadata = {
  title: "Videos",
  description: "Video features, recaps, and interviews from March '91.",
};

export default function VideosPage() {
  return (
    <div className="py-12">
      <Wrap>
        <div className="mb-10 text-center">
          <h1 className="h2 font-display font-[900] text-navy">
            Videos
          </h1>
        </div>
      </Wrap>

      {/* The same Watch & Listen band */}
      <WatchListen videos={videos} showPlaceholders={showMediaPlaceholders} />

      {/* The same Shorts slot */}
      <ShortsSection shorts={shorts} showPlaceholders={showMediaPlaceholders} />
    </div>
  );
}
