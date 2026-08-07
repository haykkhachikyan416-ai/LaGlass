import { cn } from "@/lib/cn";

export function Eyebrow({
  tone = "light",
  className,
  children,
}: {
  tone?: "light" | "dark";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "text-xs font-semibold uppercase tracking-[0.18em]",
        tone === "dark" ? "text-brass-soft" : "text-brass-strong",
        className,
      )}
    >
      {children}
    </p>
  );
}
