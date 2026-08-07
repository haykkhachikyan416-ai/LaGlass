import type { ProjectImage } from "@/lib/assets";
import { cn } from "@/lib/cn";

/**
 * Project photo with responsive candidates.
 *
 * `sizes` tells the browser how wide the image will actually be so it can pick
 * the smallest sufficient variant — without it, srcset defaults to assuming
 * full viewport width and downloads far more than needed.
 *
 * Width/height are always set to reserve layout space and avoid shift.
 */
export function Img({
  image,
  sizes = "100vw",
  className,
  priority = false,
}: {
  image: ProjectImage;
  sizes?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={sizes}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : undefined}
      className={cn("absolute inset-0 size-full object-cover", className)}
    />
  );
}
