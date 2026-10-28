"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { heroSlides } from "@/content/hero-slides";

const coverTeasers = [
  {
    kicker: "Sports Feature",
    title: "Why Even Do Sports?",
    href: "/sports/why-even-do-sports",
  },
  {
    kicker: "Karobaar Column",
    title: "Mom, I Don't Need an Internship, My GPA is 3.8",
    href: "/karobaar/mom-i-dont-need-an-internship",
  },
  {
    kicker: "NUST Box'd",
    title: "What exactly is film for?",
    href: "/nust-boxd/what-exactly-is-film-for",
  },
];

export default function MagazineCoverHero() {
  const [current, setCurrent] = useState(0);
  const total = heroSlides.length;

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = heroSlides[current];

  // Helper to split headline so one keyword is italicized
  const formatHeadline = (title: string) => {
    const words = title.split(" ");
    if (words.length <= 2) return title;
    // Italicize the penultimate word for classic fashion magazine rhythm
    const italicIndex = Math.max(1, words.length - 2);
    return (
      <>
        {words.slice(0, italicIndex).join(" ")}{" "}
        <span className="italic font-normal">{words[italicIndex]}</span>{" "}
        {words.slice(italicIndex + 1).join(" ")}
      </>
    );
  };

  return (
    <section
      aria-label="Magazine Cover"
      className="relative w-full min-h-[85vh] lg:min-h-[90vh] bg-cream rule-b overflow-hidden flex flex-col justify-between"
    >
      <div className="w-full flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-full">
        {/* ── Left Editorial Panel (Desk / Headline) ── */}
        <div className="lg:col-span-5 p-6 sm:p-10 lg:p-14 flex flex-col justify-between z-10 rule-r bg-cream order-2 lg:order-1">
          {/* Top kicker + Issue stamp */}
          <div className="flex items-center justify-between rule-b pb-4">
            <span className="editorial-kicker text-gold-text">
              {slide.label}
            </span>
            <span className="font-heading text-xs tracking-[0.14em] text-navy/60 uppercase">
              Cover Story
            </span>
          </div>

          {/* Main Cover Typography */}
          <div className="py-8 lg:py-12">
            <h2 className="font-cover-headline text-navy">
              {formatHeadline(slide.title)}
            </h2>
            {slide.text && (
              <p className="font-body text-base sm:text-lg text-navy/80 italic mt-4 max-w-md leading-relaxed">
                {slide.text}
              </p>
            )}

            <div className="mt-8 flex items-center gap-4">
              {slide.href ? (
                <Link
                  href={slide.href}
                  className="editorial-pill group"
                >
                  <span>Read Feature</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </Link>
              ) : null}
              <Link
                href="/archive"
                className="font-heading text-xs uppercase tracking-[0.14em] text-navy/70 hover:text-navy underline underline-offset-4"
              >
                Full Issue Index
              </Link>
            </div>
          </div>

          {/* Slide Navigation & Number indicator (01 / 04) */}
          <div className="flex items-center justify-between rule-t pt-5">
            <div className="flex items-center gap-3">
              <span className="font-heading text-sm font-semibold tracking-widest text-navy">
                0{current + 1}
              </span>
              <div className="w-20 h-0.5 bg-navy/15 relative overflow-hidden">
                <div
                  className="h-full bg-navy transition-all duration-500 ease-out"
                  style={{ width: String(Math.round(((current + 1) / total) * 100)) + "%" }}
                />
              </div>
              <span className="font-heading text-xs text-navy/40 tracking-widest">
                0{total}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="w-9 h-9 flex items-center justify-center rule-all text-navy hover:bg-navy hover:text-cream transition-colors text-sm"
                aria-label="Previous cover slide"
              >
                &larr;
              </button>
              <button
                onClick={nextSlide}
                className="w-9 h-9 flex items-center justify-center rule-all text-navy hover:bg-navy hover:text-cream transition-colors text-sm"
                aria-label="Next cover slide"
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* ── Right Cover Art + Magazine Cover Lines ── */}
        <div className="lg:col-span-7 relative min-h-115 sm:min-h-140 lg:min-h-175 h-full bg-cream-dark order-1 lg:order-2 overflow-hidden">
          {/* Cover Photography */}
          <div className="absolute inset-0">
            <Image
              key={slide.id}
              src={slide.image}
              alt={slide.alt}
              fill
              priority
              className="object-cover object-center fade-in"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            {/* Paper contrast vignette for cover lines */}
            <div className="absolute inset-0 bg-linear-to-t from-navy/60 via-transparent to-navy/10 lg:bg-linear-to-r lg:from-navy/20 lg:via-transparent lg:to-transparent pointer-events-none" />
          </div>

          {/* ── Magazine Cover Lines (Stacked along image edge like print) ── */}
          <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 z-20 max-w-xs space-y-3 hidden sm:block">
            <span className="editorial-kicker text-cream/90 bg-navy/85 px-2.5 py-1 inline-block">
              Inside Issue No. 1
            </span>
            <div className="space-y-2">
              {coverTeasers.map((teaser, idx) => (
                <Link
                  key={idx}
                  href={teaser.href}
                  className="block p-3.5 bg-navy/95 text-cream backdrop-blur-xs hover:bg-navy transition-all group border border-cream/25"
                >
                  <p className="font-heading text-xs uppercase tracking-[0.14em] text-gold font-semibold">
                    {teaser.kicker}
                  </p>
                  <p className="font-display text-sm font-medium leading-snug text-cream group-hover:text-gold transition-colors mt-0.5">
                    {teaser.title} &rarr;
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
