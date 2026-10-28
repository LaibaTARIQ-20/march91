import type { Metadata } from "next";
import Image from "next/image";
import { videos } from "@/content/videos";
import Container from "@/components/layout/Container";
import Divider from "@/components/ui/Divider";

export const metadata: Metadata = {
  title: "Videos",
  description: "Video features, recaps, and interviews from March '91.",
};

export default function VideosPage() {
  return (
    <Container className="py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="font-display font-bold text-4xl md:text-5xl text-navy mb-6">
          Videos
        </h1>
        <Divider />
      </div>

      {videos.length === 0 ? (
        <p className="font-heading text-sm text-muted text-center py-16">
          Nothing posted yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <a
              key={video.id}
              href={video.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block space-y-3"
            >
              <div className="relative aspect-video overflow-hidden bg-cream-dark">
                {video.thumbnail && (
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                )}
              </div>
              <h2 className="font-display font-bold text-lg text-navy group-hover:underline underline-offset-4">
                {video.title}
              </h2>
            </a>
          ))}
        </div>
      )}
    </Container>
  );
}
