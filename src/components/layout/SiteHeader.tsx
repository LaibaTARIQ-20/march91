import Link from "next/link";
import Image from "next/image";
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
        className="relative text-center pt-8.5 pb-5.5 px-5"
      >
        <p
          className="font-display font-black text-[clamp(48px,7vw,104px)] tracking-[-0.03em] leading-none text-navy m-0"
        >
          <Link href="/" className="hover:opacity-95 transition-opacity inline-block">
            March &#8217;91
          </Link>
        </p>

        {/* NUST logo — top-right corner, 16px from top and right */}
        <div className="absolute top-4 right-4 z-10 pointer-events-auto">
          <Image
            src="/images/logos/NUST-logo.png"
            alt="NUST official"
            width={104}
            height={28}
            className="nust-logo-spin w-[40px] md:w-[56px] h-auto object-contain"
            unoptimized
          />
        </div>

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
