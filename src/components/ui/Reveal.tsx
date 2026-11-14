"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: React.ReactNode;
  variant?: "up" | "mask" | "clip";
  delay?: number;
  className?: string;
};

/**
 * Reveal: IntersectionObserver (threshold 0.1, once).
 * - "up": translateY(24px) and opacity 0 to normal over 700ms.
 * - "mask": text rises out of overflow-hidden wrapper.
 * - "clip": clip-path inset(0 0 100% 0) to inset(0) over 900ms.
 * Fallback: Sets isVisible to true after 1200ms in case observer fails to trigger.
 */
export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  className,
}: RevealProps) {
  const [prefersReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  const [isVisible, setIsVisible] = useState(() => prefersReducedMotion);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    // If element is already in viewport on mount, show immediately (no flash)
    if (domRef.current) {
      const rect = domRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight + 100) {
        setIsVisible(true);
        return;
      }
    }

    // Safety fallback so content is never permanently hidden if observer is delayed or blocked
    const fallbackTimer = setTimeout(() => {
      setIsVisible(true);
    }, 600 + delay);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            clearTimeout(fallbackTimer);
            if (domRef.current) {
              observer.unobserve(domRef.current);
            }
          }
        });
      },
      { threshold: 0.05, rootMargin: "80px" }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      clearTimeout(fallbackTimer);
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [prefersReducedMotion, delay]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const delaySec = `${delay}ms`;

  if (variant === "mask") {
    return (
      <div ref={domRef} className={cn("overflow-hidden", className)}>
        <div
          style={{
            transitionDuration: "700ms",
            transitionTimingFunction: "var(--ease-out)",
            transitionDelay: delaySec,
            transform: isVisible ? "translateY(0)" : "translateY(100%)",
            opacity: isVisible ? 1 : 0,
          }}
        >
          {children}
        </div>
      </div>
    );
  }

  if (variant === "clip") {
    return (
      <div
        ref={domRef}
        className={className}
        style={{
          transitionDuration: "900ms",
          transitionTimingFunction: "var(--ease-out)",
          transitionDelay: delaySec,
          clipPath: isVisible ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
          transitionProperty: "clip-path",
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={domRef}
      className={className}
      style={{
        transitionDuration: "700ms",
        transitionTimingFunction: "var(--ease-out)",
        transitionDelay: delaySec,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        opacity: isVisible ? 1 : 0,
        transitionProperty: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}
