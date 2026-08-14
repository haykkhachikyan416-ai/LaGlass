import { Seo } from "@/components/Seo";
import { PageIntro } from "@/components/layout/PageIntro";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ReviewList } from "@/components/reviews/ReviewList";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { FinalCta } from "@/components/home/FinalCta";
import { reviews } from "@/content";
import { business } from "@/lib/business";

export default function ReviewsPage() {
  const published = reviews.items;

  return (
    <>
      <Seo
        title="Customer Reviews"
        description="Read reviews from LA Glass customers in the Los Angeles area, and leave a review of your own shower enclosure, glass railing, mirror, or storefront installation."
        path="/reviews"
      />
      <PageIntro
        eyebrow={reviews.introEyebrow}
        title={reviews.introTitle}
        copy={reviews.introCopy}
      />

      <section aria-labelledby="reviews-heading" className="bg-cream py-16 sm:py-24">
        <Container>
          <h2 id="reviews-heading" className="sr-only">
            Customer reviews
          </h2>

          {published.length ? (
            <ReviewList reviews={published} />
          ) : (
            /*
              No sample cards, no placeholder names. Until real reviews are
              published this says so plainly — an empty reviews page is honest,
              and invented ones would not be.
            */
            <Reveal>
              <div className="rounded-panel border border-line bg-surface p-8 text-center sm:p-12">
                <h3 className="font-display text-2xl text-ink">
                  No reviews published yet
                </h3>
                <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted">
                  LA Glass would rather show nothing here than write reviews for
                  itself. If we have installed glass for you, the form below is
                  the place to say how it went — and yours may be the first one
                  on this page.
                </p>
              </div>
            </Reveal>
          )}
        </Container>
      </section>

      <section aria-labelledby="leave-review-heading" className="bg-charcoal py-16 text-cream sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <SectionHeading
                tone="dark"
                eyebrow="Your experience"
                title={reviews.formHeading}
                copy={reviews.formCopy}
              />
              <h2 id="leave-review-heading" className="sr-only">
                Leave a review
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-muted-dark">
                Reviews are sent straight to LA Glass and are published only
                after they have been read. Your email address is used to get
                back to you and is never shown on the site. Prefer to talk?
                Call{" "}
                <a
                  href={business.phone.href}
                  className="font-medium text-brass-soft underline-offset-4 hover:underline"
                >
                  {business.phone.display}
                </a>
                .
              </p>
            </Reveal>

            <Reveal delay={120}>
              <ReviewForm />
            </Reveal>
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
