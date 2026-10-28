"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { sections } from "@/content/sections";
import { siteConfig } from "@/content/site-config";
import { cn } from "@/lib/cn";

/**
 * Full-screen mobile menu — shown below desk (821px).
 * Sections listed in Playfair Display italic, large.
 * Keeps inert, aria, ESC-key and focus-trap handling.
 */
export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelId = "mobile-nav-panel";

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Move focus to close button when panel opens
  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus();
    }
  }, [open]);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <>
      {/* ── Hamburger trigger ── */}
      <button
        ref={triggerRef}
        onClick={() => setOpen(true)}
        className="flex items-center justify-center p-2 text-navy hover:text-gold-text transition-colors focus-visible:outline-none"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className="sr-only">Open menu</span>
        <div className="flex flex-col justify-center gap-1.5 w-6 h-5">
          <span className="block w-full h-0.5 bg-navy" />
          <span className="block w-full h-0.5 bg-navy" />
          <span className="block w-full h-0.5 bg-navy" />
        </div>
      </button>

      {/* ── Backdrop ── */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-navy/40 backdrop-blur-xs desk:hidden"
          onClick={close}
        />
      )}

      {/* ── Full-screen cream drawer ── */}
      <div
        id={panelId}
        inert={!open}
        className={cn(
          "fixed top-0 right-0 bottom-0 z-50 w-full sm:w-105 bg-cream border-l border-line flex flex-col desk:hidden overflow-y-auto transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between p-6 border-b border-line">
          <div>
            <span className="kicker block text-gold-text">
              {siteConfig.issueLabel}
            </span>
            <p
              className="font-black text-2xl text-navy mt-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Contents
            </p>
          </div>
          <button
            ref={closeButtonRef}
            onClick={close}
            className="w-10 h-10 flex items-center justify-center text-navy text-2xl hover:text-gold-text transition-colors border border-line bg-cream"
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>

        {/* Section list — Playfair italic, large */}
        <nav className="flex-1 px-8 py-8 flex flex-col justify-between">
          <div className="flex flex-col gap-1">
            {sections.map((item, idx) => (
              <Link
                key={item.slug}
                href={`/${item.slug}`}
                onClick={close}
                className="group flex items-baseline gap-4 py-3 border-b border-line transition-colors"
              >
                <span
                  className="text-xl text-gold-text font-medium shrink-0 w-8"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  0{idx + 1}
                </span>
                <span
                  className="italic font-medium text-3xl text-navy group-hover:text-gold-text transition-colors leading-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Secondary pages */}
          <div className="pt-8 mt-8 border-t border-line">
            <span className="kicker block mb-4 text-muted">The Publication</span>
            <div className="grid grid-cols-2 gap-3 text-[11px] uppercase tracking-[0.12em] font-body text-navy">
              <Link href="/videos" onClick={close} className="hover:text-gold-text py-1">
                Videos
              </Link>
              <Link href="/archive" onClick={close} className="hover:text-gold-text py-1">
                Archive
              </Link>
              <Link href="/about" onClick={close} className="hover:text-gold-text py-1">
                About
              </Link>
              <Link
                href="/send-your-word"
                onClick={close}
                className="hover:text-navy py-1 col-span-2 text-gold-text font-medium"
              >
                Send Your Word &rarr;
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
