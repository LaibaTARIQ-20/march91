import Link from "next/link";
import { sections } from "@/content/sections";
import { siteConfig } from "@/content/site-config";
import Container from "@/components/layout/Container";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-cream pt-20">
      <Container>
        {/* Four columns: 1 per row with 24px gap on mobile, 4 columns from desk */}
        <div className="grid grid-cols-1 desk:grid-cols-[1.4fr_1fr_1fr_1fr] gap-6 desk:gap-10 pb-12 desk:pb-17.5">

          {/* Column 1: Brand */}
          <div>
            <p
              className="font-black text-[30px] leading-tight text-cream tracking-[-0.03em]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              March &#8217;91
            </p>
            <p className="text-[13px] leading-[1.8] text-cream-dark max-w-65 font-body mt-3">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Column 2: Sections */}
          <div>
            <span className="kicker text-cream-dark block mb-3">Sections</span>
            <div className="flex flex-col text-[14px] leading-loose font-body">
              {sections.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${item.slug}`}
                  className="group text-cream-dark hover:text-cream transition-colors flex items-center gap-1.5"
                >
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-200 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:hidden"
                  >
                    &rarr;
                  </span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: About — only pages that exist */}
          <div>
            <span className="kicker text-cream-dark block mb-3">About</span>
            <div className="flex flex-col text-[14px] leading-loose font-body">
              <Link href="/about" className="group text-cream-dark hover:text-cream transition-colors flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-200 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:hidden"
                >
                  &rarr;
                </span>
                <span>About March &#8217;91</span>
              </Link>
              <Link href="/archive" className="group text-cream-dark hover:text-cream transition-colors flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-200 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:hidden"
                >
                  &rarr;
                </span>
                <span>Archive</span>
              </Link>
              <Link href="/videos" className="group text-cream-dark hover:text-cream transition-colors flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-200 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:hidden"
                >
                  &rarr;
                </span>
                <span>Videos</span>
              </Link>
              <Link href="/send-your-word" className="group text-cream-dark hover:text-cream transition-colors flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-200 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:hidden"
                >
                  &rarr;
                </span>
                <span>Send Your Word</span>
              </Link>
            </div>
          </div>

          {/* Column 4: Connect */}
          <div>
            <span className="kicker text-cream-dark block mb-3">Connect</span>
            <div className="flex flex-col text-[14px] leading-loose font-body">
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group text-cream-dark hover:text-cream transition-colors flex items-center gap-1.5"
              >
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-200 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:hidden"
                >
                  &rarr;
                </span>
                <span>Instagram</span>
              </a>
              <a
                href={`mailto:${siteConfig.magazineEmail}`}
                className="group text-cream-dark hover:text-cream transition-colors flex items-center gap-1.5 break-all"
              >
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-200 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:hidden"
                >
                  &rarr;
                </span>
                <span>{siteConfig.magazineEmail}</span>
              </a>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom bar directly under columns with cream 18% hairline - stacks on mobile */}
      <div className="border-t border-cream/18">
        <Container className="flex flex-col desk:flex-row justify-between items-start desk:items-center gap-2 pt-8.5 pb-6 text-[11px] uppercase tracking-[0.12em] text-cream-dark font-body">
          <span>
            {siteConfig.issueLabel} &middot; &copy; {year} March &#8217;91 &middot; NUST, Islamabad
          </span>
          <span>{siteConfig.credit}</span>
        </Container>
      </div>
    </footer>
  );
}
