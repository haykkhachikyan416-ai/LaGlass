import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Fades and rises its children in when they scroll into view — but only as a
 * safe enhancement. Content renders fully visible by default (SSR, no-JS, no
 * IntersectionObserver, reduced motion, or anything already near the viewport),
 * so a missed observer can never leave a blank section. Only elements that are
 * clearly below the fold when JS runs are hidden first, then revealed on scroll
 * — that transition happens off-screen, so there is no visible flash.
 *
 * `delay` staggers grouped reveals (e.g. a row of cards) in milliseconds.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // "idle" renders visible (the safe default). We only switch to "hidden" for
  // below-the-fold elements once we know JS + observer are available.
  const [state, setState] = useState<"idle" | "hidden" | "shown">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Note: the reveal runs regardless of prefers-reduced-motion at the owner's
    // request — it is a 16px fade-rise, not large travel. Content is always
    // visible by default, so a missed observer can never blank a section.
    if (typeof IntersectionObserver === "undefined") {
      return; // stay visible, no animation
    }

    // Already in (or near) the viewport on load → don't hide, avoid any flash.
    if (el.getBoundingClientRect().top <= window.innerHeight * 0.85) {
      return;
    }

    setState("hidden");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setState("shown");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    observer.observe(el);

    // Safety net: never let content stay hidden. If the observer hasn't fired
    // within a few seconds (background tab, odd mobile behavior), reveal anyway.
    const fallback = window.setTimeout(() => {
      setState("shown");
      observer.disconnect();
    }, 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-glass",
        state === "hidden" ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100",
        className,
      )}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
