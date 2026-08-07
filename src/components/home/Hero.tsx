import { Phone } from "lucide-react";
import { business } from "@/lib/business";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GlassEdge } from "@/components/ui/GlassEdge";
import { HeroShell } from "@/components/home/HeroShell";
import { home } from "@/content";

export function Hero() {
  return (
    <HeroShell>
      <Container>
        <div className="max-w-2xl">
          <div className="animate-hero-in">
            <Eyebrow tone="dark">{business.tagline}</Eyebrow>
            <GlassEdge tone="dark" className="mt-2" />
          </div>
          <h1
            className="mt-5 text-4xl leading-[1.08] sm:text-5xl lg:text-[4.25rem] animate-hero-in"
            style={{ animationDelay: "120ms" }}
          >
            {home.heroHeading}
          </h1>
          <p
            className="mt-5 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg animate-hero-in"
            style={{ animationDelay: "240ms" }}
          >
            {home.heroBody}
          </p>
          <div
            className="mt-8 flex flex-wrap items-center gap-4 animate-hero-in"
            style={{ animationDelay: "360ms" }}
          >
            <Button href="/contact" variant="primary-dark" size="lg" icon="arrow">
              {home.heroPrimaryCta}
            </Button>
            <Button href="/gallery" variant="secondary" size="lg">
              {home.heroSecondaryCta}
            </Button>
          </div>
          <a
            href={business.phone.href}
            className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-cream/80 transition-colors duration-200 hover:text-brass-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream motion-reduce:transition-none animate-hero-in"
            style={{ animationDelay: "440ms" }}
          >
            <Phone aria-hidden className="size-4 text-brass-soft" />
            Or call <span className="tabular-nums">{business.phone.display}</span>
          </a>
        </div>
      </Container>
    </HeroShell>
  );
}
