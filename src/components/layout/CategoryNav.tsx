"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sections } from "@/content/sections";
import { cn } from "@/lib/cn";

export default function CategoryNav() {
  const pathname = usePathname();
  const [scrolledPast, setScrolledPast] = useState(false);
  const [scrolledPast8px, setScrolledPast8px] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolledPast8px(window.scrollY > 8);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      className={cn(
        "hidden desk:flex justify-center items-center gap-10 py-4 px-5 desk:px-10 border-t sticky top-0 z-40 transition-all duration-200 text-[11px] uppercase tracking-[0.16em] font-body font-normal text-navy",
        scrolledPast8px
          ? "bg-cream/90 backdrop-blur-md border-b border-line shadow-none"
          : "bg-cream border-b border-line"
      )}
    >
      {/* Mini wordmark */}
      <Link
        href="/"
        aria-hidden={!scrolledPast}
        className={cn(
          "absolute left-5 desk:left-10 text-[20px] font-black tracking-[-0.03em] leading-none text-navy transition-opacity duration-200",
          scrolledPast ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        style={{ fontFamily: "var(--font-display)" }}
      >
        March &#8217;91
      </Link>

      {/* Section links */}
      <div className="flex items-center gap-10">
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
                "py-0.5 relative inline-block transition-colors hover:text-gold-text",
                isActive
                  ? "font-medium after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-navy"
                  : "link-sweep font-normal"
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
                "py-0.5 relative inline-block transition-colors hover:text-gold-text",
                isActive
                  ? "font-medium after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-navy"
                  : "link-sweep font-normal"
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
