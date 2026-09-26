import Link from "next/link";
import { navSections, siteConfig } from "@/content/site-config";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 flex justify-center bg-[#E9E2D0]/95 backdrop-blur-sm">
      {/* Inner column — matches the body max-w-6xl */}
      <div className="w-full max-w-6xl bg-[#F6F1E4]">

        {/* ── Top dateline bar ── */}
        <div
          className="hidden sm:flex justify-between px-6 lg:px-10 py-2 text-[10px] tracking-[0.06em] uppercase"
          style={{ fontFamily: "var(--font-heading)", color: "var(--navy)" }}
        >
          <span>{siteConfig.location}</span>
          <span>{siteConfig.issueLabel}</span>
        </div>

        {/* ── Full-width rule ── */}
        <div className="h-px" style={{ background: "var(--rule)" }} />

        {/* ── Masthead ── */}
        <Link href="/" className="block text-center py-5 md:py-7 group">
          <p
            className="text-4xl md:text-6xl font-black leading-none transition-opacity group-hover:opacity-80"
            style={{ fontFamily: "var(--font-body)", color: "var(--navy)" }}
          >
            March &apos;91
          </p>
          <p
            className="mt-2 text-[9px] md:text-[10px] tracking-[0.18em]"
            style={{ fontFamily: "var(--font-heading)", color: "var(--text-muted)" }}
          >
            THE MAGAZINE OF MARCOMS NUST
          </p>
        </Link>

        {/* ── Full-width rule ── */}
        <div className="h-px" style={{ background: "var(--rule)" }} />

        {/* ── Navigation ── */}
        <nav
          className="flex flex-wrap justify-center gap-6 md:gap-10 px-4 py-3 text-[11px] tracking-[0.08em]"
          style={{ fontFamily: "var(--font-heading)", color: "var(--navy)" }}
        >
          {navSections.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative pb-0.5 after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label.toUpperCase()}
            </Link>
          ))}
        </nav>

        {/* ── Soft rule ── */}
        <div className="h-px" style={{ background: "var(--rule-soft)" }} />
      </div>
    </header>
  );
}
