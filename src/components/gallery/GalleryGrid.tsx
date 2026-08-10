import { useCallback, useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { ProjectImage } from "@/lib/assets";
import { Img } from "@/components/ui/Img";
import { cn } from "@/lib/cn";

const FILTERS = [
  { key: "all", label: "All work" },
  { key: "showers", label: "Showers" },
  { key: "railings", label: "Railings" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

/**
 * Filterable gallery with a lightbox.
 *
 * For a glass installer the photographs are the product, so it is worth being
 * able to narrow to a category and then look at one properly. The lightbox is
 * a real dialog: focus moves into it, Escape and the arrow keys work, and the
 * page behind it cannot scroll.
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
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = filter === f.key;
          const count =
            f.key === "all"
              ? images.length
              : images.filter((i) => i.category === f.key).length;
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
                "inline-flex min-h-11 items-center gap-2 rounded-btn border px-4 text-sm font-medium",
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

      <ul className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
        {shown.map((image, index) => (
          <li key={image.id} className="group">
            <button
              type="button"
              onClick={() => setOpenAt(index)}
              aria-label={`View larger: ${image.alt}`}
              className="block w-full rounded-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
            >
              <figure className="lift glass-sweep relative aspect-[3/4] overflow-hidden rounded-card border border-line group-hover:border-brass/40 group-hover:shadow-lift">
                <Img
                  image={image}
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  priority={index < 3}
                  className="media-zoom"
                />
              </figure>
            </button>
          </li>
        ))}
      </ul>

      {openAt !== null && shown[openAt] ? (
        <Lightbox
          image={shown[openAt]}
          position={`${openAt + 1} of ${shown.length}`}
          onClose={close}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
        />
      ) : null}
    </>
  );
}

function Lightbox({
  image,
  position,
  onClose,
  onPrev,
  onNext,
}: {
  image: ProjectImage;
  position: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previously = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowLeft") onPrev();
      else if (event.key === "ArrowRight") onNext();
      else if (event.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>("button");
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

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      className="fixed inset-0 z-[80] flex flex-col bg-ink/95 p-4 backdrop-blur-sm sm:p-8"
    >
      <div className="flex items-center justify-between gap-4 text-cream">
        <span className="text-sm tabular-nums text-muted-dark">{position}</span>
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
        The arrows are overlaid rather than placed beside the image. Sitting
        them in the flex row pushed them outside the viewport on a phone
        (measured at x = -32 and beyond the right edge), so they could not be
        tapped. Overlaid, they stay reachable at every screen size, and the
        translucent backing keeps them legible over pale photographs.
      */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center">
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes="(min-width: 640px) 80vw, 90vw"
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="max-h-full min-h-0 w-auto max-w-full rounded-card object-contain"
        />

        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous photo"
          className="absolute left-0 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-ink/70 text-cream backdrop-blur-sm transition-[background-color,transform] duration-200 hover:-translate-x-0.5 hover:bg-ink/90 hover:text-brass-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream motion-reduce:transition-none sm:left-2"
        >
          <ChevronLeft aria-hidden className="size-7" />
        </button>

        <button
          type="button"
          onClick={onNext}
          aria-label="Next photo"
          className="absolute right-0 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-ink/70 text-cream backdrop-blur-sm transition-[background-color,transform] duration-200 hover:translate-x-0.5 hover:bg-ink/90 hover:text-brass-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream motion-reduce:transition-none sm:right-2"
        >
          <ChevronRight aria-hidden className="size-7" />
        </button>
      </div>

      <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-muted-dark">
        {image.alt}
      </p>
    </div>
  );
}
