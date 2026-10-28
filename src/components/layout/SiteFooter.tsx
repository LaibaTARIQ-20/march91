import Link from "next/link";
import { sections } from "@/content/sections";
import { siteConfig } from "@/content/site-config";
import Container from "@/components/layout/Container";

/**
 * Footer per docs/DESIGN-SPEC.md section 14:
 * Navy bg, cream text, padding-top 80px.
 * Grid: 1.4fr / 1fr / 1fr / 1fr, gap 40px, padding-bottom 70px.
 * Column heads: kicker style (cream-dark), links 14px line-height 2.
 * Giant wordmark: Playfair 900, clamp(56px,14.5vw,240px), cream, centred.
 * Bottom bar: 11px uppercase tracking .12em, cream-dark.
 * Logo text, tagline and credit come from siteConfig (not the mockup).
 */
export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-cream pt-20">
      <Container>
        {/* Four columns: 1.4fr 1fr 1fr 1fr */}
        <div className="grid grid-cols-1 desk:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 pb-[70px]">

          {/* Column 1: Brand */}
          <div>
            <p
              className="font-[900] text-[30px] leading-tight text-cream tracking-[-0.03em]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              March &#8217;91
            </p>
            <p className="text-[13px] leading-[1.8] text-cream-dark max-w-[260px] font-body mt-3">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Column 2: Sections */}
          <div>
            <span className="kicker text-cream-dark block mb-3">Sections</span>
            <div className="flex flex-col text-[14px] leading-[2] font-body">
              {sections.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${item.slug}`}
                  className="text-cream-dark hover:text-cream transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: About — only pages that exist */}
          <div>
            <span className="kicker text-cream-dark block mb-3">About</span>
            <div className="flex flex-col text-[14px] leading-[2] font-body">
              <Link href="/about" className="text-cream-dark hover:text-cream transition-colors">
                About March &#8217;91
              </Link>
              <Link href="/archive" className="text-cream-dark hover:text-cream transition-colors">
                Archive
              </Link>
              <Link href="/videos" className="text-cream-dark hover:text-cream transition-colors">
                Videos
              </Link>
              <Link href="/send-your-word" className="text-cream-dark hover:text-cream transition-colors">
                Send Your Word
              </Link>
            </div>
          </div>

          {/* Column 4: Connect */}
          <div>
            <span className="kicker text-cream-dark block mb-3">Connect</span>
            <div className="flex flex-col text-[14px] leading-[2] font-body">
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-dark hover:text-cream transition-colors"
              >
                Instagram
              </a>
              <a
                href={`mailto:${siteConfig.magazineEmail}`}
                className="text-cream-dark hover:text-cream transition-colors break-all"
              >
                {siteConfig.magazineEmail}
              </a>
            </div>
          </div>
        </div>
      </Container>

      {/* Giant MARCH'91 wordmark */}
      <p
        aria-hidden="true"
        className="font-[900] text-[clamp(56px,14.5vw,240px)] leading-none tracking-[-0.03em] text-center whitespace-nowrap text-cream px-5 pb-6 select-none"
        style={{ fontFamily: "var(--font-display)" }}
      >
        MARCH&#8217;91
      </p>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <Container className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-[34px] pb-[24px] text-[11px] uppercase tracking-[0.12em] text-cream-dark font-body">
          <span>
            {siteConfig.issueLabel} &middot; &copy; {year} March &#8217;91 &middot; NUST, Islamabad
          </span>
          <span>{siteConfig.credit}</span>
        </Container>
      </div>
    </footer>
  );
}
