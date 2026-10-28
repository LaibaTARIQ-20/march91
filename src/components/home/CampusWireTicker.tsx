import Link from "next/link";
import { articles } from "@/content/articles";

export default function CampusWireTicker() {
  // Use strictly authentic articles
  const headlines = articles.map((a) => ({
    title: a.title,
    href: `/${a.section}/${a.slug}`,
    badge: a.section.toUpperCase(),
  }));

  return (
    <div
      aria-label="Campus Wire Ticker"
      className="bg-navy text-cream overflow-hidden h-11 flex items-center border-b border-line relative z-20"
    >
      {/* Static Label with Gold Pulsing Dot */}
      <div className="bg-navy px-4 sm:px-6 h-full flex items-center gap-2.5 shrink-0 z-10 border-r border-cream/20">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
        </span>
        <span className="font-heading text-xs uppercase tracking-[0.16em] text-cream font-semibold whitespace-nowrap">
          Start The Day Here
        </span>
      </div>

      {/* Marquee Track */}
      <div className="flex-1 overflow-hidden">
        <div className="mq flex items-center">
          {[...headlines, ...headlines].map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="inline-flex items-center gap-3 px-6 text-xs font-body text-cream/90 hover:text-gold transition-colors whitespace-nowrap group"
            >
              <span className="font-heading text-xs uppercase tracking-[0.12em] text-gold border border-gold/30 px-1.5 py-0.5">
                {item.badge}
              </span>
              <span className="group-hover:underline underline-offset-4">
                {item.title}
              </span>
              <span className="text-cream/30 text-xs">&middot;</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
