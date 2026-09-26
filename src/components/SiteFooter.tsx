import Link from "next/link";
import { navSections, siteConfig } from "@/content/site-config";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="flex justify-center bg-[#E9E2D0]">
      <div className="w-full max-w-6xl bg-[#F6F1E4] border-t" style={{ borderColor: "var(--rule)" }}>
        <div className="px-6 md:px-12 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">

            {/* Brand Column */}
            <div className="flex flex-col gap-4 md:col-span-2">
              <Link href="/">
                <span className="text-3xl font-black tracking-tight" style={{ fontFamily: "var(--font-body)", color: "var(--navy)" }}>
                  March &apos;91
                </span>
              </Link>
              <p className="text-sm leading-relaxed max-w-sm mt-2" style={{ color: "var(--text-muted)" }}>
                {siteConfig.editorNote}
              </p>
            </div>

            {/* Sections Column */}
            <div className="flex flex-col gap-4">
              <h3 className="text-[11px] font-bold tracking-widest uppercase mb-1" style={{ fontFamily: "var(--font-heading)", color: "var(--navy)" }}>
                Sections
              </h3>
              <nav className="flex flex-col gap-3 text-[13px]">
                {navSections.map((item) => (
                  <Link key={item.href} href={item.href} className="hover:opacity-70 transition-opacity" style={{ color: "var(--navy)" }}>
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact Column */}
            <div className="flex flex-col gap-4">
              <h3 className="text-[11px] font-bold tracking-widest uppercase mb-1" style={{ fontFamily: "var(--font-heading)", color: "var(--navy)" }}>
                Connect
              </h3>
              <div className="flex flex-col gap-3 text-[13px]" style={{ color: "var(--navy)" }}>
                <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                  Instagram
                </a>
                <a href={`mailto:${siteConfig.magazineEmail}`} className="hover:opacity-70 transition-opacity">
                  Email Us
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: "var(--rule-soft)" }}>
            <p className="text-[11px] tracking-[0.08em] uppercase" style={{ fontFamily: "var(--font-heading)", color: "var(--text-muted)" }}>
              © {year} MARCH &apos;91|MARCOMS NUST
            </p>
            <p className="text-[11px] tracking-[0.08em] uppercase" style={{ fontFamily: "var(--font-heading)", color: "var(--text-muted)" }}>
              {siteConfig.location}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}