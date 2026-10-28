import ButtonLink from "@/components/ui/ButtonLink";
import Wrap from "@/components/ui/Wrap";

export default function CallToAction() {
  return (
    <section className="rule py-[110px] pb-[100px] text-center" aria-label="Call to action">
      <Wrap>
        <h2 className="h2 font-display font-black text-[clamp(40px,5.6vw,84px)] text-navy leading-none">
          Got a story worth <em className="font-medium italic text-gold-text">telling?</em>
        </h2>
        <div className="mt-9">
          <ButtonLink href="/send-your-word" variant="solid" tone="light">
            Send your word &rarr;
          </ButtonLink>
        </div>
      </Wrap>
    </section>
  );
}
