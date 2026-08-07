import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { home } from "@/content";

/** Practical guidance that helps a customer prepare — content-driven. */
export function WhatToExpect() {
  return (
    <section aria-labelledby="expect-heading" className="bg-charcoal py-20 text-cream sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            tone="dark"
            eyebrow={home.expectEyebrow}
            title={home.expectHeading}
            copy={home.expectCopy}
          />
        </Reveal>
        <h2 id="expect-heading" className="sr-only">
          What to expect
        </h2>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {home.expectPoints.map((point, index) => (
            <li key={point.title}>
              <Reveal delay={Math.min(index, 3) * 70}>
                <div className="h-full rounded-card border border-line-dark bg-charcoal-card p-6">
                  <h3 className="font-display text-lg text-cream">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-dark">{point.copy}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
