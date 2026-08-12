import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GlassEdge } from "@/components/ui/GlassEdge";

/**
 * Dark intro band for internal pages. Gives the fixed transparent header a
 * readable backdrop and sets the page context.
 */
export function PageIntro({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <section className="bg-ink pb-10 pt-28 text-cream sm:pb-20 sm:pt-40">
      <Container>
        <Eyebrow tone="dark">{eyebrow}</Eyebrow>
        <GlassEdge tone="dark" className="mt-2" />
        <h1 className="mt-5 max-w-3xl text-4xl leading-[1.1] sm:text-5xl">
          {title}
        </h1>
        {copy ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-dark sm:text-lg">
            {copy}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
