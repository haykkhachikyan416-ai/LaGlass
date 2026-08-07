import { cn } from "@/lib/cn";

/**
 * Signature brand device: a 1px brass hairline ending in a short 45° mitre,
 * like the polished edge of a cut pane. Purely decorative.
 */
export function GlassEdge({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const color = tone === "dark" ? "bg-brass-soft" : "bg-brass";
  return (
    <span aria-hidden className={cn("inline-flex items-center", className)}>
      <span className={cn("h-px w-10", color)} />
      <span className={cn("h-px w-2 origin-left -rotate-45", color)} />
    </span>
  );
}
