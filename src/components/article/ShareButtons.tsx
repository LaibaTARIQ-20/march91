"use client";

import { useState } from "react";
import ButtonLink from "@/components/ui/ButtonLink";

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
      <ButtonLink
        href={whatsappUrl}
        external
        variant="outline"
        tone="light"
      >
        WhatsApp
      </ButtonLink>
      <ButtonLink
        variant="outline"
        tone="light"
        onClick={handleCopy}
      >
        {copied ? "Copied" : "Copy Link"}
      </ButtonLink>
    </div>
  );
}
