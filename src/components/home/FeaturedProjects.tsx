import { Link } from "react-router-dom";
import { featuredProjects } from "@/lib/assets";
import { business } from "@/lib/business";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { InstagramIcon, TikTokIcon } from "@/components/ui/SocialIcons";
import { home } from "@/content";
import { Img } from "@/components/ui/Img";

const categoryLabels: Record<string, string> = {
  showers: "Shower glass",
  railings: "Glass railing",
  custom: "Custom glass",
};

/**
 * Static featured grid. The data source (featuredProjects in lib/assets.ts)
 * is the future feed for the 21st.dev Image Shuffle component, which will
 * replace the grid markup here once installed and approved.
 */
export function FeaturedProjects() {
  return (
    <section
      aria-labelledby="featured-heading"
      className="bg-ink py-20 text-cream sm:py-28"
    >
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            tone="dark"
            eyebrow={home.featuredEyebrow}
            title={home.featuredHeading}
            copy={home.featuredCopy}
          />
          <Button
            href="/gallery"
            variant="secondary"
            icon="arrow"
            className="text-cream"
          >
            View the gallery
          </Button>
        </Reveal>
        <h2 id="featured-heading" className="sr-only">
          Featured projects
        </h2>
        {/*
          Editorial layout rather than a uniform grid: the lead project runs
          full height down the left, with the rest stacked beside it. The size
          difference is the hierarchy — it reads as a chosen composition.
        */}
        <ul className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 lg:grid-rows-2">
          {featuredProjects.slice(0, 5).map((project, index) => (
            <li
              key={project.id}
              className={
                index === 0
                  ? "col-span-2 lg:col-span-1 lg:row-span-2"
                  : undefined
              }
            >
              <Reveal delay={Math.min(index, 3) * 80} className="h-full">
                <Link
                  to="/gallery"
                  aria-label={`${categoryLabels[project.category]} — view the gallery`}
                  className="group block h-full rounded-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-soft"
                >
                  <figure className="relative h-full overflow-hidden rounded-card border border-line-dark transition-[transform,box-shadow,border-color] duration-300 ease-glass group-hover:-translate-y-1 group-hover:border-brass/40 group-hover:shadow-lift-dark motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
                    <div
                      className={`glass-sweep relative ${
                        index === 0
                          ? "aspect-[4/5] lg:aspect-auto lg:h-full"
                          : "aspect-[3/4] lg:aspect-[4/3]"
                      }`}
                    >
                      <Img sizes={"(min-width: 1024px) 33vw, 50vw"} image={project} className="object-cover transition-transform duration-[900ms] ease-glass group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent"
                      />
                    </div>
                    <figcaption className="absolute inset-x-0 bottom-0 p-4">
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brass-soft">
                        {categoryLabels[project.category]}
                      </span>
                    </figcaption>
                  </figure>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Social follow — new work goes up on Instagram and TikTok first. */}
        <Reveal className="mt-12 border-t border-line-dark pt-10">
          <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h3 className="font-display text-xl text-cream sm:text-2xl">
                {home.socialHeading}
              </h3>
              <p className="mt-1.5 text-sm text-muted-dark">
                {home.socialCopy}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={business.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine group inline-flex min-h-12 items-center gap-2.5 rounded-btn border border-brass/60 px-5 font-medium text-cream transition-[background-color,border-color,transform,box-shadow] duration-200 ease-glass hover:-translate-y-0.5 hover:border-brass hover:bg-brass/15 hover:shadow-lift-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream active:translate-y-0 active:scale-[0.98]"
              >
                <InstagramIcon className="size-5 text-brass-soft" />
                Instagram
              </a>
              <a
                href={business.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine group inline-flex min-h-12 items-center gap-2.5 rounded-btn border border-brass/60 px-5 font-medium text-cream transition-[background-color,border-color,transform,box-shadow] duration-200 ease-glass hover:-translate-y-0.5 hover:border-brass hover:bg-brass/15 hover:shadow-lift-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream active:translate-y-0 active:scale-[0.98]"
              >
                <TikTokIcon className="size-5 text-brass-soft" />
                TikTok
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
