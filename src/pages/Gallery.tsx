import { Seo } from "@/components/Seo";
import { galleryImages } from "@/lib/assets";
import { PageIntro } from "@/components/layout/PageIntro";
import { Container } from "@/components/ui/Container";
import { FinalCta } from "@/components/home/FinalCta";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
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
      <section className="bg-cream pb-16 pt-6 sm:py-24">
        <Container>
          <GalleryGrid images={galleryImages} />
        </Container>
      </section>
      <FinalCta />
    </>
  );
}
