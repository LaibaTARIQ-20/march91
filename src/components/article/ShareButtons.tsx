"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

type ShareButtonsProps = {
  url: string;
};

export default function ShareButtons({ url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(url)}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is not available
    }
  }

  return (
    <div className="flex items-center gap-3 py-6 my-8 border-y border-line">
      <span className="font-heading text-xs font-semibold uppercase tracking-[0.14em] text-muted mr-2">
        Share
      </span>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center font-heading font-semibold uppercase tracking-[0.14em] transition-all border border-solid text-xs px-4 py-1.5 bg-transparent border-navy text-navy hover:bg-navy hover:text-cream"
      >
        WhatsApp
      </a>
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopy}
      >
        {copied ? "Copied" : "Copy Link"}
      </Button>
    </div>
  );
}
