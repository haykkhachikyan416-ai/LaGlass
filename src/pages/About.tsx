import { Users } from "lucide-react";
import { Seo } from "@/components/Seo";
import { projectImages } from "@/lib/assets";
import { about, pages } from "@/content";
import { icon } from "@/lib/icons";
import { PageIntro } from "@/components/layout/PageIntro";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GlassEdge } from "@/components/ui/GlassEdge";
import { Reveal } from "@/components/ui/Reveal";
import { Img } from "@/components/ui/Img";
import { Stats } from "@/components/home/Stats";
import { Process } from "@/components/home/Process";
import { FinalCta } from "@/components/home/FinalCta";

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About"
        description="LA Glass brings 15+ years of custom glass installation experience and 2,500+ completed projects to homes and businesses across the Los Angeles area."
        path="/about"
      />

      <PageIntro
        eyebrow={pages.aboutIntroEyebrow}
        title={pages.aboutIntroTitle}
        copy={pages.aboutIntroCopy}
      />

      <section className="bg-cream py-16 sm:py-24">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <Eyebrow>{about.introEyebrow}</Eyebrow>
              <GlassEdge className="mt-2" />
              <h2 className="mt-4 font-display text-3xl text-ink sm:text-4xl">
                {about.introHeading}
              </h2>
              {about.introParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="mt-4 leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </Reveal>
            <Reveal delay={120}>
              <div className="glass-sweep group relative aspect-[4/5] overflow-hidden rounded-panel border border-line">
                <Img
                  image={projectImages.railingCurvedBrass}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="media-zoom"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <Stats />

      <section aria-labelledby="craft-heading" className="bg-cream pb-16 sm:pb-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <SectionHeading
                  eyebrow={about.craftEyebrow}
                  title={about.craftHeading}
                  copy={about.craftCopy}
                />
                <h2 id="craft-heading" className="sr-only">
                  How we work
                </h2>
              </Reveal>
              <Reveal delay={120} className="mt-8">
                <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-line">
                  <Img
                    image={projectImages.showerNickelCorner}
                    sizes="(min-width: 1024px) 45vw, 100vw"
                  />
                </div>
              </Reveal>
            </div>
            <ol className="space-y-8">
              {about.craftPoints.map((item, index) => (
                <li key={item.title}>
                  <Reveal delay={Math.min(index, 4) * 70} className="flex gap-5">
                    <span aria-hidden className="font-display text-2xl text-brass tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-sans text-lg font-semibold text-ink">{item.title}</h3>
                      <p className="mt-1.5 leading-relaxed text-muted">{item.copy}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <Process />

      <section aria-labelledby="serve-heading" className="bg-ink py-20 text-cream sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              tone="dark"
              eyebrow={about.serveEyebrow}
              title={about.serveHeading}
              copy={about.serveCopy}
            />
            <h2 id="serve-heading" className="sr-only">
              Who LA Glass serves
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {about.audiences.map((audience, index) => {
              const Icon = icon(audience.icon);
              return (
                <li key={audience.label}>
                  <Reveal delay={Math.min(index, 3) * 80}>
                    <div className="flex h-full items-center gap-4 rounded-card border border-line-dark bg-charcoal-card p-5">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-btn bg-ink">
                        <Icon aria-hidden className="size-5 text-brass-soft" strokeWidth={1.75} />
                      </span>
                      <span className="font-sans text-base font-medium text-cream">
                        {audience.label}
                      </span>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
          <p className="mt-8 flex items-center gap-2 text-sm text-muted-dark">
            <Users aria-hidden className="size-4 shrink-0 text-brass-soft" />
            {about.serveFootnote}
          </p>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
