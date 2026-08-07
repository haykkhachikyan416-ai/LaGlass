import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { home } from "@/content";
import { icon } from "@/lib/icons";

export function WhyUs() {
  return (
    <section aria-labelledby="why-heading" className="bg-cream py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={home.whyEyebrow}
            title={home.whyHeading}
            copy={home.whyCopy}
          />
        </Reveal>
        <h2 id="why-heading" className="sr-only">
          Why choose LA Glass
        </h2>
        <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {home.whyPoints.map((point, index) => {
            const Icon = icon(point.icon);
            return (
              <li key={point.title}>
                <Reveal delay={Math.min(index, 2) * 80} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-btn border border-line bg-surface">
                    <Icon aria-hidden className="size-5 text-brass-strong" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-sans text-base font-semibold text-ink">{point.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{point.copy}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
