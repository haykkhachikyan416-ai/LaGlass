import { Seo } from "@/components/Seo";
import { galleryImages } from "@/lib/assets";
import { PageIntro } from "@/components/layout/PageIntro";
import { Container } from "@/components/ui/Container";
import { FinalCta } from "@/components/home/FinalCta";
import { Img } from "@/components/ui/Img";
import { pages } from "@/content";


export default function GalleryPage() {
  return (
    <>
      <Seo
        title="Glass Installation Gallery"
        description="View real shower enclosure, glass railing, and custom glass projects completed by LA Glass in the Los Angeles area."
        path="/gallery"
      />
      <PageIntro
        eyebrow={pages.galleryIntroEyebrow}
        title={pages.galleryIntroTitle}
        copy={pages.galleryIntroCopy}
      />
      <section className="bg-cream py-16 sm:py-24">
        <Container>
          <ul className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
            {galleryImages.map((image, index) => (
              <li key={image.id} className="group">
                <figure className="lift glass-sweep relative aspect-[3/4] overflow-hidden rounded-card border border-line group-hover:border-brass/40 group-hover:shadow-lift">
                  <Img sizes={"(min-width: 1024px) 33vw, 50vw"} image={image} priority={index < 3} className="media-zoom object-cover" />
                </figure>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <FinalCta />
    </>
  );
}
