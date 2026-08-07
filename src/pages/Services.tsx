import { Seo } from "@/components/Seo";
import { Link } from "react-router-dom";
import { ArrowRight, Frame } from "lucide-react";
import { services } from "@/lib/services";
import { PageIntro } from "@/components/layout/PageIntro";
import { Container } from "@/components/ui/Container";
import { FinalCta } from "@/components/home/FinalCta";
import { Img } from "@/components/ui/Img";
import { pages } from "@/content";


export default function ServicesPage() {
  return (
    <>
      <Seo
        title="Custom Glass Installation Services"
        description="Explore custom shower enclosure, shower door, glass railing, and custom glass installation services from LA Glass in the Los Angeles area."
        path="/services"
      />
      <PageIntro
        eyebrow={pages.servicesIntroEyebrow}
        title={pages.servicesIntroTitle}
        copy={pages.servicesIntroCopy}
      />
      <section className="bg-cream py-16 sm:py-24">
        <Container>
          <ul className="space-y-6">
            {services.map((service) => (
              <li key={service.title}>
                <Link
                  to={service.href === "/services" ? "/contact" : service.href}
                  className="group grid gap-6 rounded-card border border-line bg-surface p-6 transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:grid-cols-[200px_1fr] sm:items-center"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-btn bg-charcoal sm:aspect-square">
                    {service.image ? (
                      <Img sizes={"(min-width: 640px) 200px, 100vw"} image={service.image} className="object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Frame aria-hidden className="size-10 text-brass-soft" strokeWidth={1.25} />
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="font-display text-2xl text-ink">{service.title}</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                      {service.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brass-strong">
                      {service.href === "/services" ? "Ask about your project" : "Learn more"}
                      <ArrowRight
                        aria-hidden
                        className="size-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
                      />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <FinalCta />
    </>
  );
}
