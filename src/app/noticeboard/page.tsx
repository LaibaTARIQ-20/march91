import type { Metadata } from "next";
import Link from "next/link";
import { notices } from "@/content/notices";
import Container from "@/components/layout/Container";
import Divider from "@/components/ui/Divider";
import Rubric from "@/components/ui/Rubric";

export const metadata: Metadata = {
  title: "Noticeboard",
  description: "Official announcements and notices from March '91.",
};

export default function NoticeboardPage() {
  return (
    <Container className="py-16 desk:py-24">
      <div className="text-center mb-12">
        <h1 className="font-display font-bold text-4xl md:text-5xl text-navy mb-6">
          Noticeboard
        </h1>
        <Divider />
      </div>

      {notices.length === 0 ? (
        <p className="font-heading text-sm text-muted text-center py-16">
          Nothing posted yet.
        </p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-6">
          {notices.map((notice) => (
            <div key={notice.id} className="border border-line p-6 bg-cream">
              <Rubric label={notice.label} className="mb-2" />
              <h2 className="font-display font-bold text-xl text-navy mb-3">
                {notice.title}
              </h2>
              {notice.href && (
                <Link
                  href={notice.href}
                  className="font-heading text-xs font-semibold uppercase tracking-[0.12em] text-navy hover:underline underline-offset-4"
                >
                  View Details &rarr;
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}
