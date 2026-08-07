import { Link } from "react-router-dom";
import { ArrowRight, Loader2, Phone } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "primary-dark" | "secondary";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-ink text-cream shadow-sm hover:-translate-y-0.5 hover:bg-charcoal hover:shadow-lift focus-visible:outline-brass",
  "primary-dark":
    "bg-brass text-ink hover:-translate-y-0.5 hover:bg-brass-soft hover:shadow-lift-dark focus-visible:outline-cream",
  secondary:
    "border border-brass/70 text-current hover:border-brass hover:bg-brass/12 focus-visible:outline-brass",
};

interface ButtonBaseProps {
  variant?: Variant;
  size?: "md" | "lg";
  icon?: "arrow" | "phone";
  className?: string;
  children: React.ReactNode;
}

type ButtonProps = ButtonBaseProps &
  (
    | { href: string; type?: never; disabled?: never; loading?: never }
    | {
        href?: undefined;
        type?: "button" | "submit";
        disabled?: boolean;
        loading?: boolean;
      }
  );

export function Button({
  variant = "primary",
  size = "md",
  icon,
  className,
  children,
  ...rest
}: ButtonProps) {
  const loading = rest.href === undefined && rest.loading === true;

  const classes = cn(
    "btn-shine group relative inline-flex select-none items-center justify-center gap-2.5 rounded-btn px-6 font-medium",
    "transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-glass",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    "active:translate-y-0 active:scale-[0.98]",
    "disabled:pointer-events-none disabled:opacity-60",
    "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
    size === "lg" ? "min-h-13 px-7 text-base sm:text-lg" : "min-h-12 text-base",
    variantClasses[variant],
    className,
  );

  const content = (
    <>
      {loading ? (
        <Loader2 aria-hidden className="size-4 shrink-0 animate-spin" />
      ) : icon === "phone" ? (
        <Phone aria-hidden className="size-4 shrink-0" />
      ) : null}
      <span>{children}</span>
      {icon === "arrow" && !loading ? (
        <ArrowRight
          aria-hidden
          className="size-4 shrink-0 transition-transform duration-200 ease-glass group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none"
        />
      ) : null}
    </>
  );

  if (rest.href !== undefined) {
    const external =
      rest.href.startsWith("tel:") || rest.href.startsWith("mailto:");
    if (external) {
      return (
        <a href={rest.href} className={classes}>
          {content}
        </a>
      );
    }
    return (
      <Link to={rest.href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={rest.type ?? "button"}
      disabled={rest.disabled || loading}
      aria-busy={loading || undefined}
      className={classes}
    >
      {content}
    </button>
  );
}
