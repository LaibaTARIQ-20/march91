type EditorNoteProps = {
  eyebrow: string;
  quote: string;
  attribution: string;
};

/**
 * Editorial note panel — EIC or director quote, centered, serif italic.
 */
export default function EditorNote({
  eyebrow,
  quote,
  attribution,
}: EditorNoteProps) {
  return (
    <div className="py-10 md:py-14 text-center max-w-3xl mx-auto px-4">
      <p className="font-heading text-xs font-semibold uppercase tracking-[0.14em] text-navy mb-4">
        {eyebrow}
      </p>
      <p className="font-display text-xl md:text-2xl italic leading-relaxed text-navy mb-4 max-w-2xl mx-auto">
        &ldquo;{quote}&rdquo;
      </p>
      <p className="font-heading text-xs text-muted tracking-[0.06em]">
        {attribution}
      </p>
    </div>
  );
}
