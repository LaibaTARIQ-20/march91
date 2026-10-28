"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sections } from "@/content/sections";
import { cn } from "@/lib/cn";

/**
 * Sticky nav per spec:
 * - Hidden below desk (821px); visible from desk up.
 * - Cream bg, hairline above and below, centred items, gap 40px, padding 16px 0.
 * - 11px uppercase tracking .16em navy. Hover: gold-text. Active: underlined.
 * - Items: section links, a "|" separator (aria-hidden), Videos, Archive.
 * - When scrolled past the masthead, shows a small "March '91" text wordmark at left.
 */
export default function CategoryNav() {
  const pathname = usePathname();
  const [scrolledPast, setScrolledPast] = useState(false);

  useEffect(() => {
    const masthead = document.getElementById("site-masthead");
    if (!masthead) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolledPast(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px" }
    );

    observer.observe(masthead);
    return () => observer.disconnect();
  }, []);

  const extraLinks = [
    { label: "Videos", href: "/videos" },
    { label: "Archive", href: "/archive" },
  ];

  return (
    <nav
      aria-label="Magazine Sections"
      className="hidden desk:flex relative justify-center items-center gap-[40px] py-4 px-5 desk:px-10 border-t border-b border-line sticky top-0 z-40 bg-cream text-[11px] uppercase tracking-[0.16em] font-body font-[400] text-navy"
    >
      {/* Mini wordmark — appears after scrolling past masthead */}
      <Link
        href="/"
        aria-hidden={!scrolledPast}
        className={cn(
          "absolute left-5 desk:left-10 text-[20px] font-[900] tracking-[-0.03em] leading-none text-navy transition-opacity duration-200",
          scrolledPast ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        style={{ fontFamily: "var(--font-display)" }}
      >
        March &#8217;91
      </Link>

      {/* Section links */}
      <div className="flex items-center gap-[40px]">
        {sections.map((item) => {
          const isActive =
            pathname === `/${item.slug}` ||
            pathname.startsWith(`/${item.slug}/`);
          return (
            <Link
              key={item.slug}
              href={`/${item.slug}`}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "transition-colors hover:text-gold-text py-0.5",
                isActive && "underline underline-offset-4 decoration-navy font-[500]"
              )}
            >
              {item.label}
            </Link>
          );
        })}

        {/* Separator */}
        <span className="opacity-30 select-none" aria-hidden="true">|</span>

        {/* Extra links */}
        {extraLinks.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "transition-colors hover:text-gold-text py-0.5",
                isActive && "underline underline-offset-4 decoration-navy font-[500]"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
