import { Star } from "lucide-react";
import type { Review } from "@/content";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

function Stars({ rating }: { rating: number }) {
  const value = Math.max(1, Math.min(5, Math.round(rating)));
  return (
    <p className="flex items-center gap-0.5">
      <span className="sr-only">{value} out of 5</span>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden
          className={cn("size-4", i < value ? "text-brass" : "text-line")}
          fill="currentColor"
          strokeWidth={0}
        />
      ))}
    </p>
  );
}

/**
 * Reviews the owner has published in the studio.
 *
 * Nothing here is generated: every card comes from a review document someone
 * actually wrote, which is why this renders nothing at all rather than sample
 * cards when the list is empty. The page above handles that case in words.
 */
export function ReviewList({ reviews }: { reviews: Review[] }) {
  if (!reviews.length) return null;

  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {reviews.map((review, index) => (
        <li key={`${review.name}-${index}`} className="h-full">
          <Reveal className="h-full" delay={Math.min(index, 2) * 90}>
            <figure className="flex h-full flex-col rounded-card border border-line bg-surface p-6 sm:p-8">
              {typeof review.rating === "number" ? <Stars rating={review.rating} /> : null}
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-ink">
                {review.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-line pt-4 text-sm">
                <span className="font-semibold text-ink">{review.name}</span>
                {review.location ? (
                  <span className="text-muted"> · {review.location}</span>
                ) : null}
                {review.service ? (
                  <span className="mt-1 block text-muted">{review.service}</span>
                ) : null}
                {review.source ? (
                  <span className="mt-1 block text-xs uppercase tracking-[0.12em] text-muted">
                    via {review.source}
                  </span>
                ) : null}
              </figcaption>
            </figure>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
