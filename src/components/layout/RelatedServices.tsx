import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GlassEdge } from "@/components/ui/GlassEdge";

export function RelatedServices({ current }: { current: string }) {
  const related = services.filter(
    (service) => service.slug !== current && service.slug !== "shower-doors",
  );
  return (
    <section aria-label="Related services" className="border-t border-line bg-cream pb-16 sm:pb-24">
      <Container>
        <Eyebrow className="pt-12">Related services</Eyebrow>
        <GlassEdge className="mt-2" />
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
          {related.map((service) => (
            <li key={service.slug}>
              <Link
                to={service.href}
                className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-ink transition-colors duration-200 hover:text-brass-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass motion-reduce:transition-none"
              >
                {service.title}
                <ArrowRight aria-hidden className="size-4 text-brass" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
