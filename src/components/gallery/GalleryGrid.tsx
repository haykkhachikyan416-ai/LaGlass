import { useCallback, useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { ProjectImage } from "@/lib/assets";
import { Img } from "@/components/ui/Img";
import { cn } from "@/lib/cn";

const FILTERS = [
  { key: "all", label: "All work" },
  { key: "showers", label: "Showers" },
  { key: "railings", label: "Railings" },
  { key: "custom", label: "Mirrors & custom" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

/** Every fifth card runs the full width of the phone grid, for rhythm. */
const isWide = (index: number) => index % 5 === 0;

/**
 * Filterable gallery with a lightbox.
 *
 * For a glass installer the photographs are the product, so it is worth being
 * able to narrow to a category and then look at one properly. The lightbox is
 * a real dialog: focus moves into it, Escape, swipe and the arrow keys work,
 * and the page behind it cannot scroll.
 */
export function GalleryGrid({ images }: { images: ProjectImage[] }) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [openAt, setOpenAt] = useState<number | null>(null);

  const shown = images.filter((i) => filter === "all" || i.category === filter);

  const close = useCallback(() => setOpenAt(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpenAt((current) =>
        current === null ? null : (current + delta + shown.length) % shown.length,
      ),
    [shown.length],
  );

  return (
    <>
      {/*
        The chip row sticks below the header, so you can switch category from
        anywhere in a long scroll instead of returning to the top — the
        single biggest difference on a phone.

        It scrolls sideways rather than wrapping, so the filters stay on one
        line and the grid starts higher up the screen. The negative margin lets
        the row bleed to the screen edges, which is the cue that there is more
        to scroll to.
      */}
      <div className="sticky top-16 z-30 -mx-4 bg-cream/95 px-4 py-3 backdrop-blur-sm sm:top-18">
      <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 sm:flex-wrap">
        {FILTERS.map((f) => {
          const active = filter === f.key;
          const count =
            f.key === "all"
              ? images.length
              : images.filter((i) => i.category === f.key).length;
          if (!count) return null;
          return (
            <button
              key={f.key}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setFilter(f.key);
                setOpenAt(null);
              }}
              className={cn(
                "inline-flex min-h-11 shrink-0 snap-start items-center gap-2 rounded-btn border px-4 text-sm font-medium",
                "transition-[background-color,border-color,color,transform] duration-200 ease-glass",
                "hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass",
                "active:translate-y-0 motion-reduce:transition-none",
                active
                  ? "border-ink bg-ink text-cream"
                  : "border-line bg-surface text-ink hover:border-brass/50",
              )}
            >
              {f.label}
              <span className={cn("text-xs tabular-nums", active ? "text-brass-soft" : "text-muted")}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
      </div>

      <ul className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-6 lg:grid-cols-3">
        {shown.map((image, index) => {
          const wide = isWide(index);
          return (
            <li key={image.id} className={cn("group", wide && "col-span-2 sm:col-span-1")}>
              <button
                type="button"
                onClick={() => setOpenAt(index)}
                aria-label={`View larger: ${image.alt}`}
                className="block w-full rounded-card transition-transform duration-200 ease-glass active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass motion-reduce:transition-none"
              >
                <figure
                  className={cn(
                    "lift glass-sweep relative overflow-hidden rounded-card border border-line group-hover:border-brass/40 group-hover:shadow-lift",
                    wide ? "aspect-[4/5] sm:aspect-[3/4]" : "aspect-[3/4]",
                  )}
                >
                  <Img
                    image={image}
                    sizes={
                      wide
                        ? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        : "(min-width: 1024px) 33vw, 50vw"
                    }
                    priority={index < 2}
                    className="media-zoom"
                  />
                </figure>
              </button>
            </li>
          );
        })}
      </ul>

      {openAt !== null && shown[openAt] ? (
        <Lightbox
          image={shown[openAt]}
          index={openAt}
          total={shown.length}
          neighbours={[shown[(openAt + 1) % shown.length], shown[(openAt - 1 + shown.length) % shown.length]]}
          onClose={close}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
        />
      ) : null}
    </>
  );
}

/** Distance a horizontal drag must cover before it counts as a swipe. */
const SWIPE_PX = 40;

function Lightbox({
  image,
  index,
  total,
  neighbours,
  onClose,
  onPrev,
  onNext,
}: {
  image: ProjectImage;
  index: number;
  total: number;
  neighbours: ProjectImage[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const start = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const previously = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowLeft") onPrev();
      else if (event.key === "ArrowRight") onNext();
      else if (event.key === "Tab" && panelRef.current) {
        // Only the visible control set participates: the other one is
        // display:none at this breakpoint and cannot take focus.
        const focusable = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>("button"),
        ).filter((el) => el.offsetParent !== null);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previously?.focus();
    };
  }, [onClose, onPrev, onNext]);

  // Warm the photos on either side so a swipe lands on a decoded image rather
  // than a blank frame. The browser reuses these from cache.
  useEffect(() => {
    for (const next of neighbours) {
      const preloader = new Image();
      preloader.srcset = next.srcSet;
      preloader.sizes = "(min-width: 640px) 80vw, 100vw";
      preloader.src = next.src;
    }
    // Keyed by id so an unrelated re-render does not refetch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [neighbours.map((n) => n.id).join()]);

  const onPointerDown = (event: React.PointerEvent) => {
    start.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: React.PointerEvent) => {
    const from = start.current;
    start.current = null;
    if (!from) return;
    const dx = event.clientX - from.x;
    const dy = event.clientY - from.y;
    // Horizontal intent only, so a vertical flick never changes the photo.
    if (Math.abs(dx) < SWIPE_PX || Math.abs(dx) < Math.abs(dy)) return;
    if (dx > 0) onPrev();
    else onNext();
  };

  const arrow =
    "flex size-12 items-center justify-center rounded-full bg-ink/70 text-cream backdrop-blur-sm transition-[background-color,transform] duration-200 hover:bg-ink/90 hover:text-brass-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream motion-reduce:transition-none";

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      className="fixed inset-0 z-[80] flex flex-col bg-ink/95 p-4 backdrop-blur-sm sm:p-8"
    >
      <div className="flex items-center justify-between gap-4 text-cream">
        <span className="text-sm tabular-nums text-muted-dark">
          {index + 1} of {total}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex size-11 items-center justify-center rounded-btn text-cream transition-colors duration-200 hover:text-brass-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
        >
          <X aria-hidden className="size-6" />
        </button>
      </div>

      {/*
        `touch-action: pan-y` lets the browser keep vertical gestures while the
        horizontal ones reach the swipe handler below.
      */}
      <div
        className="relative flex min-h-0 flex-1 touch-pan-y select-none items-center justify-center"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (start.current = null)}
      >
        <img
          key={image.id}
          src={image.src}
          srcSet={image.srcSet}
          sizes="(min-width: 640px) 80vw, 100vw"
          alt={image.alt}
          width={image.width}
          height={image.height}
          draggable={false}
          className="lightbox-photo max-h-full min-h-0 w-auto max-w-full rounded-card object-contain"
        />

        {/*
          Side arrows are for pointers. On a phone they sit under the thumb's
          blind spot and overlap the photo, so the controls move to the bar
          below instead — swiping covers the same job more naturally there.
        */}
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous photo"
          className={cn(arrow, "absolute left-2 top-1/2 hidden -translate-y-1/2 hover:-translate-x-0.5 sm:flex")}
        >
          <ChevronLeft aria-hidden className="size-7" />
        </button>

        <button
          type="button"
          onClick={onNext}
          aria-label="Next photo"
          className={cn(arrow, "absolute right-2 top-1/2 hidden -translate-y-1/2 hover:translate-x-0.5 sm:flex")}
        >
          <ChevronRight aria-hidden className="size-7" />
        </button>
      </div>

      <div className="mt-4 flex items-center gap-3 sm:justify-center">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous photo"
          className={cn(arrow, "shrink-0 sm:hidden")}
        >
          <ChevronLeft aria-hidden className="size-7" />
        </button>

        {/* Clamped on a phone so a long description cannot squeeze the photo. */}
        <p className="line-clamp-2 min-w-0 flex-1 text-center text-sm leading-relaxed text-muted-dark sm:line-clamp-none sm:max-w-2xl sm:flex-none">
          {image.alt}
        </p>

        <button
          type="button"
          onClick={onNext}
          aria-label="Next photo"
          className={cn(arrow, "shrink-0 sm:hidden")}
        >
          <ChevronRight aria-hidden className="size-7" />
        </button>
      </div>
    </div>
  );
}
