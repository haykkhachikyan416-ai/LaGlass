import { Link } from "react-router-dom";
import { ArrowRight, Frame } from "lucide-react";
import { services } from "@/lib/services";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { home } from "@/content";
import { Img } from "@/components/ui/Img";

export function ServicesOverview() {
  return (
    <section aria-labelledby="services-heading" className="bg-cream py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={home.servicesEyebrow}
            title={home.servicesHeading}
            copy={home.servicesCopy}
          />
        </Reveal>
        <h2 id="services-heading" className="sr-only">
          Services
        </h2>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <li key={service.title} className="h-full">
              <Reveal className="h-full" delay={Math.min(index, 2) * 90}>
                <Link
                  to={service.href}
                  className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface transition-[box-shadow,transform,border-color] duration-300 ease-glass hover:-translate-y-1 hover:border-brass/40 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <div className="glass-sweep relative aspect-[4/3] overflow-hidden bg-charcoal">
                    {service.image ? (
                      <Img sizes={"(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"} image={service.image} className="object-cover transition-transform duration-[900ms] ease-glass group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
                    ) : (
                      // Defensive: every current service has approved photography.
                      <div className="flex h-full items-center justify-center">
                        <Frame
                          aria-hidden
                          className="size-12 text-brass-soft"
                          strokeWidth={1.25}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl text-ink">
                      {service.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                      {service.summary}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brass-strong">
                      Learn more
                      <ArrowRight
                        aria-hidden
                        className="size-4 transition-transform duration-200 ease-glass group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
