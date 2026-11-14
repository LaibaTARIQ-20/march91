"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import ButtonLink from "@/components/ui/ButtonLink";
import AlsoInThisIssue from "@/components/home/AlsoInThisIssue";
import type { Article, HeroSlide } from "@/types";

type HeroCarouselProps = {
  slides: HeroSlide[];
  coverLines: Article[];
};

export default function HeroCarousel({ slides, coverLines }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const total = slides.length;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const nextSlide = useCallback(() => setCurrent((p) => (p + 1) % total), [total]);
  const prevSlide = useCallback(() => setCurrent((p) => (p - 1 + total) % total), [total]);

  useEffect(() => {
    if (reducedMotion || isPaused || hasFocus) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => nextSlide(), 3000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide, isPaused, hasFocus, reducedMotion, current]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); prevSlide(); }
    else if (e.key === "ArrowRight") { e.preventDefault(); nextSlide(); }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "touch" || e.pointerType === "pen") {
      touchStartXRef.current = e.clientX;
      touchStartYRef.current = e.clientY;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const diffX = e.clientX - touchStartXRef.current;
    const diffY = e.clientY - touchStartYRef.current;
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) nextSlide(); else prevSlide();
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const slide = slides[current];

  const renderHeadline = (title: string) => {
    if (title.toLowerCase().includes("terry")) {
      const parts = title.split(/terry/i);
      return (
        <>{parts[0]}<em className="font-medium italic text-gold-text font-display">terry</em>{parts.slice(1).join("terry")}</>
      );
    }
    return title;
  };

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Magazine Cover Carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setHasFocus(true)}
      onBlur={() => setHasFocus(false)}
      className="outline-none border-b border-line bg-cream"
    >
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {current + 1} of {total}: {slide.title}
      </div>

      {/* Main Container: 
          Desktop (1024px+): Three columns [text, cover image, sidebar] sharing top & bottom edge (items-stretch).
          Tablet (768px - 1023px): Two columns [text, cover image] with sidebar below as full-width row.
          Mobile (<768px): Single column stacked [text, cover image, sidebar].
      */}
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 desk:px-12 py-6 desk:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.1fr_1fr_240px] gap-8 desk:gap-10 items-stretch">

          {/* ── Column 1: Text Panel ── */}
          <div className="flex flex-col justify-start pt-4 min-w-0">
            <div key={slide.id} className="w-full flex flex-col items-start text-left">
              {/* Kicker: Lexend, uppercase, --color-gold-text, 16px below top edge */}
              <span
                className="kicker block text-gold-text transition-all duration-600 ease-out"
                style={
                  reducedMotion
                    ? undefined
                    : { animation: "wordRise 600ms cubic-bezier(0.16, 1, 0.3, 1) 0ms both" }
                }
              >
                {slide.label}
              </span>

              {/* Headline: Playfair Display, --color-navy, max-width 100%, naturally wrapped.
                  Mobile font size 40px */}
              <h2
                className="font-display font-black text-[40px] sm:text-[48px] lg:text-[clamp(44px,4vw,68px)] leading-[1.05] tracking-tight text-navy mt-4 mb-0 max-w-full transition-all duration-600 ease-out"
                style={
                  reducedMotion
                    ? undefined
                    : { animation: "wordRise 600ms cubic-bezier(0.16, 1, 0.3, 1) 90ms both" }
                }
              >
                {renderHeadline(slide.title)}
              </h2>

              {/* 16px between headline and subtext. Subtext: Playfair Display italic, --color-ink */}
              {slide.text ? (
                <p
                  className="font-display italic text-[18px] sm:text-[20px] text-ink m-0 mt-4 leading-snug transition-all duration-600 ease-out"
                  style={
                    reducedMotion
                      ? undefined
                      : { animation: "wordRise 600ms cubic-bezier(0.16, 1, 0.3, 1) 180ms both" }
                  }
                >
                  {slide.text}
                </p>
              ) : null}

              {/* Buttons: 24px below subtext (mt-6), stacked vertically with 16px gap (gap-4).
                  Both buttons left-aligned to text column.
                  Mobile: full-width buttons, minimum height 44px */}
              <div
                className="mt-6 flex flex-col gap-4 w-full sm:w-auto items-stretch sm:items-start transition-all duration-600 ease-out"
                style={
                  reducedMotion
                    ? undefined
                    : { animation: "wordRise 600ms cubic-bezier(0.16, 1, 0.3, 1) 270ms both" }
                }
              >
                {/* Button 1: "Read the Issue", outline navy */}
                <ButtonLink
                  href={slide.href ?? "/archive"}
                  variant="outline"
                  tone="light"
                  className="w-full sm:w-auto min-h-[44px]"
                >
                  Read the Issue &rarr;
                </ButtonLink>

              </div>

              {reducedMotion && (
                <div className="flex items-center gap-2 mt-8 pt-4 border-t border-line/40 w-full" role="tablist" aria-label="Cover slides">
                  {slides.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      role="tab"
                      aria-selected={idx === current}
                      aria-label={`Slide ${idx + 1}: ${s.title}`}
                      onClick={() => setCurrent(idx)}
                      className={`w-3 h-3 transition-colors ${idx === current ? "bg-navy" : "bg-line hover:bg-navy/50"}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Column 2: Center Cover Image (full image, uncropped; natural aspect 810/1013) ── */}
          <div className="relative w-full aspect-[810/1013] max-w-[500px] mx-auto self-start bg-cream-dark overflow-hidden border border-line rounded-none">
            {slides.map((s, idx) => {
              const isActive = idx === current;
              return (
                <div
                  key={s.id}
                  aria-hidden={!isActive}
                  className={`absolute inset-0 transition-opacity duration-600 ease-out ${isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                >
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    priority={idx === 0}
                    loading={idx === 0 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 35vw"
                    className={`object-contain rounded-none transition-transform duration-3000 ease-out ${isActive && !reducedMotion ? "scale-100" : "scale-[1.04]"
                      }`}
                  />
                </div>
              );
            })}
          </div>

          {/* ── Column 3: Sidebar (Desktop: 3rd column; Tablet: full-width row; Mobile: below image) ── */}
          <div className="pt-4 md:col-span-2 lg:col-span-1 flex flex-col justify-start">
            <AlsoInThisIssue coverLines={coverLines} />
          </div>

        </div>
      </div>
    </section>
  );
}
