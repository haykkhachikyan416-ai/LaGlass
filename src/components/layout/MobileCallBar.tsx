import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { business } from "@/lib/business";
import { cn } from "@/lib/cn";

/**
 * Thumb-reachable call / quote bar for phones.
 *
 * A glass installer's business runs on phone calls, and on a phone the header
 * scrolls away. This keeps both actions one tap away at the bottom of the
 * screen, which is the easiest place to reach one-handed.
 *
 * Deliberate details:
 * - appears only after the hero has scrolled past, so it never competes with
 *   the hero's own buttons
 * - hidden on the contact page, where the form already is
 * - sits below the mobile menu in the stacking order, so the drawer covers it
 * - respects the iPhone home-indicator inset
 */
export function MobileCallBar() {
  const { pathname } = useLocation();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/contact")) return null;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/95 backdrop-blur-sm lg:hidden",
        "transition-transform duration-300 ease-glass motion-reduce:transition-none",
        shown ? "translate-y-0" : "translate-y-full",
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-stretch gap-2 p-3">
        <a
          href={business.phone.href}
          className="btn-shine group flex min-h-12 flex-1 items-center justify-center gap-2 rounded-btn border border-brass/60 font-medium text-cream transition-[background-color,border-color] duration-200 ease-glass hover:bg-brass/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream active:scale-[0.98]"
        >
          <Phone aria-hidden className="size-4 text-brass-soft" />
          Call
        </a>
        <Link
          to="/contact"
          className="btn-shine group flex min-h-12 flex-[1.4] items-center justify-center gap-2 rounded-btn bg-brass font-medium text-ink transition-[background-color] duration-200 ease-glass hover:bg-brass-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream active:scale-[0.98]"
        >
          Free quote
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-200 ease-glass group-hover:translate-x-1 motion-reduce:transition-none"
          />
        </Link>
      </div>
    </div>
  );
}
