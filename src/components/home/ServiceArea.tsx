import { business } from "@/lib/business";
import { projectImages } from "@/lib/assets";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { home } from "@/content";
import { Img } from "@/components/ui/Img";

export function ServiceArea() {
  return (
    <section aria-labelledby="area-heading" className="bg-ink py-20 text-cream sm:py-28">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              tone="dark"
              eyebrow={home.areaEyebrow}
              title={home.areaHeading}
              copy={home.areaCopy}
            />
            <h2 id="area-heading" className="sr-only">
              Los Angeles service area
            </h2>
            <p className="mt-6 text-sm text-muted-dark">
              {business.hours.days} · {business.hours.time}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/contact" variant="primary-dark" icon="arrow">
                Request a free quote
              </Button>
              <Button href={business.phone.href} variant="secondary" icon="phone">
                {business.phone.display}
              </Button>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative aspect-[3/4] max-h-[560px] overflow-hidden rounded-card border border-line-dark">
              <Img sizes={"(min-width: 1024px) 45vw, 100vw"} image={projectImages.showerBlackHillside} className="object-cover" />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
