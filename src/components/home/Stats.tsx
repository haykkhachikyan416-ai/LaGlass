import { business } from "@/lib/business";
import { Container } from "@/components/ui/Container";

const stats = [
  { value: business.stats.yearsExperience, label: "Years of experience" },
  { value: business.stats.completedProjects, label: "Completed projects" },
] as const;

/** Verified numbers from docs/BUSINESS-INFO.md, displayed statically. */
export function Stats() {
  return (
    <section aria-label="Experience" className="bg-cream pb-20 sm:pb-28">
      <Container>
        <div className="rounded-panel bg-ink px-6 py-10 text-cream sm:px-12 sm:py-12">
          <dl className="grid gap-8 text-center sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            <div className="flex flex-col gap-2">
              <dt className="order-2 text-sm font-medium uppercase tracking-[0.14em] text-muted-dark">
                {stats[0].label}
              </dt>
              <dd className="font-display text-5xl text-brass-soft tabular-nums sm:text-6xl">
                {stats[0].value}
              </dd>
            </div>
            <div aria-hidden className="hidden h-16 w-px bg-line-dark sm:block" />
            <div className="flex flex-col gap-2">
              <dt className="order-2 text-sm font-medium uppercase tracking-[0.14em] text-muted-dark">
                {stats[1].label}
              </dt>
              <dd className="font-display text-5xl text-brass-soft tabular-nums sm:text-6xl">
                {stats[1].value}
              </dd>
            </div>
          </dl>
          <p className="mt-8 text-center text-sm text-muted-dark">
            Insured · Free estimates · {business.serviceAreaStatement}
          </p>
        </div>
      </Container>
    </section>
  );
}
