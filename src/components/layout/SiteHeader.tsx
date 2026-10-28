import Link from "next/link";
import CategoryNav from "@/components/layout/CategoryNav";
import MobileMenu from "@/components/layout/MobileMenu";

/**
 * Site header — matches docs/reference/homepage-mockup.html.
 * Masthead: centred "March '91" (curly apostrophe), Playfair 900,
 * clamp(48px,7vw,104px), tracking -0.03em, navy.
 * Padding 34px top, 22px bottom. No top bar.
 * Sticky CategoryNav below. Hamburger shown below desk breakpoint (821px).
 */
export default function SiteHeader() {
  return (
    <header className="bg-cream">
      {/* ── Centred Masthead ── */}
      <div
        id="site-masthead"
        className="relative text-center pt-[34px] pb-[22px] px-5"
      >
        <p
          className="font-display font-[900] text-[clamp(48px,7vw,104px)] tracking-[-0.03em] leading-none text-navy m-0"
        >
          <Link href="/" className="hover:opacity-95 transition-opacity inline-block">
            March &#8217;91
          </Link>
        </p>

        {/* Hamburger — visible only below desk (821px) */}
        <div className="desk:hidden absolute right-5 top-1/2 -translate-y-1/2">
          <MobileMenu />
        </div>
      </div>

      {/* ── Sticky Category Navigation (hidden below desk) ── */}
      <CategoryNav />
    </header>
  );
}
