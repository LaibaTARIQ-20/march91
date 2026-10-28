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

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (reducedMotion || isPaused || hasFocus) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide, isPaused, hasFocus, reducedMotion, current]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
    }
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
      if (diffX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const slide = slides[current];

  const renderHeadline = (title: string) => {
    if (title.toLowerCase().includes("terry")) {
      const parts = title.split(/terry/i);
      return (
        <>
          {parts[0]}
          <em className="font-medium italic text-gold-text font-display">terry</em>
          {parts.slice(1).join("terry")}
        </>
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
      className="outline-none grid grid-cols-1 desk:grid-cols-[5fr_7fr] desk:min-h-190 border-b border-line bg-cream"
    >
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {current + 1} of {total}: {slide.title}
      </div>

      <div className="px-5 desk:pl-[max(2.5rem,calc((100vw-1320px)/2+2.5rem))] desk:pr-14 py-12 desk:py-16 flex flex-col justify-center order-2 desk:order-1">
        <div key={slide.id} className="w-full">
          <span
            className="kicker block transition-all duration-600 ease-out"
            style={
              reducedMotion
                ? undefined
                : { animation: "wordRise 600ms cubic-bezier(0.16, 1, 0.3, 1) 0ms both" }
            }
          >
            {slide.label}
          </span>

          <h2
            className="font-display font-black text-[clamp(52px,6.4vw,104px)] leading-[0.95] tracking-tight text-navy mt-6 mb-5 max-w-[calc(100%-2rem)] transition-all duration-600 ease-out"
            style={
              reducedMotion
                ? undefined
                : { animation: "wordRise 600ms cubic-bezier(0.16, 1, 0.3, 1) 90ms both" }
            }
          >
            {renderHeadline(slide.title)}
          </h2>

          {slide.text ? (
            <p
              className="font-display italic text-[22px] text-ink m-0 mb-8 leading-snug transition-all duration-600 ease-out"
              style={
                reducedMotion
                  ? undefined
                  : { animation: "wordRise 600ms cubic-bezier(0.16, 1, 0.3, 1) 180ms both" }
              }
            >
              {slide.text}
            </p>
          ) : (
            <div className="mb-8" />
          )}

          <div
            className="transition-all duration-600 ease-out"
            style={
              reducedMotion
                ? undefined
                : { animation: "wordRise 600ms cubic-bezier(0.16, 1, 0.3, 1) 270ms both" }
            }
          >
            <ButtonLink href={slide.href ?? "/archive"} variant="outline" tone="light">
              Read the issue &rarr;
            </ButtonLink>
          </div>

          {reducedMotion && (
            <div
              className="flex items-center gap-2 mt-8 pt-4 border-t border-line/40"
              role="tablist"
              aria-label="Cover slides"
            >
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={idx === current}
                  aria-label={`Slide ${idx + 1}: ${s.title}`}
                  onClick={() => setCurrent(idx)}
                  className={`w-3 h-3 transition-colors ${idx === current ? "bg-navy" : "bg-line hover:bg-navy/50"
                    }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 desk:grid-cols-[1fr_240px] gap-9 desk:pr-12 desk:pb-12 desk:pt-0 p-5 desk:p-0 items-stretch order-1 desk:order-2">
        <div className="relative aspect-810/1013 w-full self-center overflow-hidden bg-cream-dark border border-line desk:border-none">
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
                  sizes="(max-width: 820px) 100vw, 50vw"
                  className={`object-contain transition-transform duration-3000 ease-out ${isActive && !reducedMotion ? "scale-100" : "scale-[1.04]"
                    }`}
                />
              </div>
            );
          })}
        </div>

        <AlsoInThisIssue coverLines={coverLines} />
      </div>
    </section>
  );
}
