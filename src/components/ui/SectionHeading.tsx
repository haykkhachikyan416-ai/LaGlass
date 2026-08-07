import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GlassEdge } from "@/components/ui/GlassEdge";

export function SectionHeading({
  eyebrow,
  title,
  copy,
  tone = "light",
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <GlassEdge
        tone={tone}
        className={cn("mt-2", align === "center" && "justify-center")}
      />
      <h2
        className={cn(
          "mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]",
          tone === "dark" ? "text-cream" : "text-ink",
        )}
      >
        {title}
      </h2>
      {copy ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            tone === "dark" ? "text-muted-dark" : "text-muted",
          )}
        >
          {copy}
        </p>
      ) : null}
    </div>
  );
}
