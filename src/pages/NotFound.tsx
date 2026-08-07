import { Seo } from "@/components/Seo";
import { PageIntro } from "@/components/layout/PageIntro";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { pages } from "@/content";

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page not found"
        description="That page could not be found. Browse LA Glass services, the project gallery, or request a free quote."
        path="/404"
        noindex
      />
      <PageIntro
        eyebrow={pages.notFoundEyebrow}
        title={pages.notFoundTitle}
        copy="The page you're looking for may have moved. The work, the services, and the free estimates are all still here."
      />
      <section className="bg-cream py-16 sm:py-24">
        <Container className="flex flex-wrap gap-4">
          <Button href="/" icon="arrow">
            Back to the homepage
          </Button>
          <Button href="/gallery" variant="secondary">
            View our work
          </Button>
        </Container>
      </section>
    </>
  );
}
