import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { home } from "@/content";

export function Process() {
  return (
    <section aria-labelledby="process-heading" className="bg-cream pb-20 sm:pb-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={home.processEyebrow}
            title={home.processHeading}
            copy={home.processCopy}
          />
        </Reveal>
        <h2 id="process-heading" className="sr-only">
          Installation process
        </h2>
        <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {home.processSteps.map((step, index) => (
            <li key={step.number}>
              <Reveal delay={Math.min(index, 3) * 80} className="border-t border-line pt-5">
                <span aria-hidden className="font-display text-3xl text-brass tabular-nums">
                  {step.number}
                </span>
                <h3 className="mt-3 font-sans text-base font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.copy}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
