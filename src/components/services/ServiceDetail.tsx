import { PageIntro } from "@/components/layout/PageIntro";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { RelatedServices } from "@/components/layout/RelatedServices";
import { FinalCta } from "@/components/home/FinalCta";
import { serviceBySlug } from "@/lib/services";
import type { ProjectImage } from "@/lib/assets";
import { Img } from "@/components/ui/Img";

/**
 * Shared layout for every service detail page. Copy comes from
 * /content/services.json, so pages can be lengthened or reworded from the
 * admin without touching this file.
 */
export function ServiceDetail({
  slug,
  eyebrow,
  title,
  images,
}: {
  slug: string;
  eyebrow: string;
  title: string;
  images: ProjectImage[];
}) {
  const service = serviceBySlug(slug);
  if (!service) return null;

  return (
    <>
      <PageIntro eyebrow={eyebrow} title={title} copy={service.description} />

      <section className="bg-cream py-16 sm:py-24">
        <Container>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {images.map((image, i) => (
              <Reveal key={image.id} delay={Math.min(i, 3) * 70}>
                <figure className="group lift glass-sweep relative aspect-[3/4] overflow-hidden rounded-card border border-line hover:border-brass/40 hover:shadow-lift">
                  <Img sizes={"(min-width: 1024px) 25vw, 50vw"} image={image} className="media-zoom  object-cover" />
                </figure>
              </Reveal>
            ))}
          </div>

          {service.intro ? (
            <Reveal className="mx-auto mt-16 max-w-2xl">
              <p className="text-lg leading-relaxed text-ink">{service.intro}</p>
            </Reveal>
          ) : null}

          {service.details.length > 0 ? (
            <ul className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
              {service.details.map((detail, i) => (
                <li key={detail.title}>
                  <Reveal delay={Math.min(i, 3) * 70}>
                    <div className="h-full rounded-card border border-line bg-surface p-6">
                      <h2 className="font-display text-xl text-ink">{detail.title}</h2>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{detail.copy}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          ) : null}
        </Container>
      </section>

      <RelatedServices current={slug} />
      <FinalCta />
    </>
  );
}
