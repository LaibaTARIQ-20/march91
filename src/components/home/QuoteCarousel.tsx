"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Wrap from "@/components/ui/Wrap";
import { notes } from "@/content/notes";

export default function QuoteCarousel() {
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

  const total = notes.length;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const nextNote = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  useEffect(() => {
    if (reducedMotion || isPaused || hasFocus) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextNote();
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextNote, isPaused, hasFocus, reducedMotion, current]);

  const activeNote = notes[current];
  const words = activeNote.quote.split(/\s+/);
  const totalStaggerMs = words.length * 35;

  const tabLabels = ["Editor in Chief", "MARCOMS Director"];

  return (
    <section
      className="bg-cream-dark py-16 desk:py-24 relative overflow-hidden"
      aria-label="Editorial Notes"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setHasFocus(true)}
      onBlurCapture={() => setHasFocus(false)}
    >
      <Wrap>
        {reducedMotion ? (
          // Under prefers-reduced-motion: stack both notes, no animation
          <div className="flex flex-col gap-14 max-w-250 mx-auto text-center">
            {notes.map((note, idx) => (
              <div key={idx} className="flex flex-col items-center gap-6">
                <span className="kicker block">{note.kicker}</span>
                <p className="font-display italic font-medium text-[clamp(26px,3.6vw,52px)] leading-[1.18] tracking-[-0.01em] text-navy m-0 max-w-250">
                  {note.quote}
                </p>
                <span className="byline text-muted">{note.attribution}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative max-w-250 mx-auto text-center">
            {/* Outline Opening Quote Mark: Playfair, text-transparent, -webkit-text-stroke 1px var(--color-line), 240px */}
            <span
              aria-hidden="true"
              className="absolute -top-16 -left-6 desk:-left-12 font-display text-[240px] leading-none select-none pointer-events-none text-transparent"
              style={{
                WebkitTextStroke: "1px var(--color-line)",
              }}
            >
              “
            </span>

            {/* Note content */}
            <div key={`note-${current}`} className="relative z-10 flex flex-col items-center">
              <span className="kicker block mb-6">{activeNote.kicker}</span>

              {/* Word-by-word reveal */}
              <blockquote className="font-display italic font-medium text-[clamp(26px,3.6vw,52px)] leading-[1.18] tracking-[-0.01em] text-navy m-0 max-w-250">
                {words.map((word, i) => (
                  <span
                    key={i}
                    className="inline-block overflow-hidden align-top mr-[0.28em]"
                  >
                    <span
                      className="inline-block"
                      style={
                        {
                          "--i": i,
                          animation: "wordRise 400ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--i) * 35ms) both",
                        } as React.CSSProperties
                      }
                    >
                      {word}
                    </span>
                  </span>
                ))}
              </blockquote>

              {/* Attribution fades in after the last word */}
              <span
                className="byline text-muted mt-6 block"
                style={{
                  animation: `wordRise 500ms ease-out ${totalStaggerMs + 100}ms both`,
                }}
              >
                {activeNote.attribution}
              </span>
            </div>

            {/* Two tabs under the quote */}
            <div
              className="flex justify-center items-center gap-8 mt-14"
              role="tablist"
              aria-label="Editorial Notes Tabs"
            >
              {tabLabels.map((label, idx) => {
                const isActive = idx === current;
                return (
                  <button
                    key={label}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setCurrent(idx)}
                    className="group relative pb-2 font-body text-[11px] uppercase tracking-[0.16em] font-medium text-navy cursor-pointer focus-visible:outline-2 focus-visible:outline-gold"
                  >
                    <span className={isActive ? "text-navy" : "text-muted group-hover:text-navy transition-colors"}>
                      {label}
                    </span>
                    {/* 2px bottom line */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-navy/15 overflow-hidden">
                      {isActive && (
                        <div
                          key={`tabfill-${current}`}
                          className="h-full bg-navy w-full origin-left"
                          style={{
                            animation: "tabFill 5s linear forwards",
                            animationPlayState: isPaused || hasFocus ? "paused" : "running",
                          }}
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </Wrap>
    </section>
  );
}
