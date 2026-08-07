import { BadgeCheck, HandCoins, MapPin } from "lucide-react";
import { business } from "@/lib/business";
import { Container } from "@/components/ui/Container";

const items = [
  { icon: BadgeCheck, label: "Insured" },
  { icon: HandCoins, label: "Free estimates" },
  { icon: MapPin, label: "Los Angeles–area service" },
] as const;

export function TrustStrip() {
  return (
    <section aria-label="At a glance" className="border-b border-line bg-cream">
      <Container>
        {/* Hairline dividers between items echo the polished edge of cut glass. */}
        <ul className="flex flex-wrap items-center justify-center divide-x divide-line py-5">
          {items.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-2 px-4 text-sm font-medium text-muted sm:px-6"
            >
              <Icon aria-hidden className="size-4 shrink-0 text-brass" />
              {label}
            </li>
          ))}
          <li className="flex items-baseline gap-2 px-4 text-sm font-medium text-muted sm:px-6">
            <span className="font-display text-base text-ink tabular-nums">
              {business.stats.yearsExperience}
            </span>
            years of experience
          </li>
          <li className="flex items-baseline gap-2 px-4 text-sm font-medium text-muted sm:px-6">
            <span className="font-display text-base text-ink tabular-nums">
              {business.stats.completedProjects}
            </span>
            completed projects
          </li>
        </ul>
      </Container>
    </section>
  );
}
