"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { sections } from "@/content/sections";
import { siteConfig } from "@/content/site-config";
import { cn } from "@/lib/cn";

const subscribe = () => () => { };

/** True after hydration, so the portal never renders on the server. */
function useIsClient(): boolean {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

const secondaryLinks = [
  { href: "/videos", label: "Videos" },
  { href: "/archive", label: "Archive" },
  { href: "/about", label: "About" },
] as const;

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const isClient = useIsClient();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  // Lock page scroll while the menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Move focus to the close button when the panel opens
  useEffect(() => {
    if (open) closeButtonRef.current?.focus();
  }, [open]);

  // Escape closes the menu
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
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
      {/* Hamburger: 44x44 tap target, visible below the desk breakpoint only */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-11 w-11 flex-col items-center justify-center border border-line text-navy transition-colors hover:border-navy focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold desk:hidden"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className="flex w-5 flex-col gap-1">
          <span className="block h-0.5 w-full bg-navy" />
          <span className="block h-0.5 w-full bg-navy" />
          <span className="block h-0.5 w-full bg-navy" />
        </span>
      </button>

      {/* Rendered in document.body so no header transform/blur can trap it */}
      {isClient &&
        createPortal(
          <>
            {open && (
              <div
                aria-hidden="true"
                className="fixed inset-0 z-50 bg-navy/40 backdrop-blur-xs desk:hidden"
                onClick={close}
              />
            )}

            <div
              id={panelId}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              inert={!open}
              className={cn(
                "fixed inset-y-0 right-0 z-50 flex w-full flex-col overflow-y-auto border-l border-line bg-cream transition-transform duration-300 ease-out sm:w-105 desk:hidden",
                open ? "translate-x-0" : "translate-x-full",
              )}
            >
              <div className="flex items-center justify-between border-b border-line p-6">
                <div>
                  <span className="kicker block text-gold-text">{siteConfig.issueLabel}</span>
                  <p className="mt-1 font-display text-2xl font-black text-navy">Contents</p>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={close}
                  className="flex h-11 w-11 items-center justify-center border border-line bg-cream text-2xl text-navy transition-colors hover:border-navy focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold"
                  aria-label="Close menu"
                >
                  &times;
                </button>
              </div>

              <nav className="flex flex-1 flex-col justify-between px-8 py-8">
                <ul className="flex flex-col gap-1">
                  {sections.map((item, index) => (
                    <li key={item.slug}>
                      <Link
                        href={`/${item.slug}`}
                        onClick={close}
                        className="group flex items-baseline gap-4 border-b border-line py-3"
                      >
                        <span className="w-8 shrink-0 font-display text-xl font-medium text-gold-text">
                          0{index + 1}
                        </span>
                        <span className="font-display text-3xl font-medium italic leading-tight text-navy transition-colors group-hover:text-gold-text">
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 border-t border-line pt-8">
                  <span className="kicker mb-4 block text-muted">The Publication</span>
                  <div className="grid grid-cols-2 gap-3 font-body text-[11px] uppercase tracking-[0.12em] text-navy">
                    {secondaryLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={close}
                        className="flex min-h-11 items-center py-2 transition-colors hover:text-gold-text"
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Link
                      href="/send-your-word"
                      onClick={close}
                      className="col-span-2 flex min-h-11 items-center py-2 font-medium text-gold-text transition-colors hover:text-navy"
                    >
                      Send Your Word &rarr;
                    </Link>
                  </div>
                </div>
              </nav>
            </div>
          </>,
          document.body,
        )}
    </>
  );
}