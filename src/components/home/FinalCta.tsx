import { business } from "@/lib/business";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GlassEdge } from "@/components/ui/GlassEdge";
import { Button } from "@/components/ui/Button";
import { home } from "@/content";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-heading" className="bg-charcoal py-20 text-cream sm:py-28">
      <Container className="max-w-3xl text-center">
        <Eyebrow tone="dark">{home.ctaEyebrow}</Eyebrow>
        <GlassEdge tone="dark" className="mt-2 justify-center" />
        <h2 id="cta-heading" className="mt-5 text-3xl text-cream sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
          {home.ctaHeading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-dark sm:text-lg">
{home.ctaCopy}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="/contact" variant="primary-dark" size="lg" icon="arrow">
            {home.ctaButton}
          </Button>
          <Button href={business.phone.href} variant="secondary" size="lg" icon="phone">
            {business.phone.display}
          </Button>
        </div>
      </Container>
    </section>
  );
}
