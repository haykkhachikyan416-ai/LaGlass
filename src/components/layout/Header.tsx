import { Link, useLocation } from "react-router-dom";
import { Menu, Phone } from "lucide-react";
import { business, nav } from "@/lib/business";
import { brand } from "@/lib/assets";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { HeaderScrollState } from "@/components/layout/HeaderScrollState";
import { cn } from "@/lib/cn";

/**
 * Site header — server-rendered with no required client JavaScript.
 *
 * It renders SOLID dark by default. That is the safe state: readable over both
 * the dark hero and the cream sections below, and it can never appear white.
 * HeaderScrollState is a small progressive enhancement that makes it
 * transparent while the visitor is at the very top of the page; if that script
 * never runs, the header simply stays solid.
 *
 * The mobile drawer is toggled by the #menu-toggle checkbox below using CSS
 * only, so tapping the menu works without JavaScript.
 */
export function Header() {
  const { pathname } = useLocation();

  return (
    <header
      id="site-header"
      // Solid ink by default (the safe state, and what shows once scrolled).
      // Over the hero it thins to a soft top-down scrim so the video reads
      // through it while the logo and nav keep their contrast.
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink text-cream shadow-lg shadow-ink/30 transition-[background-color,border-color] duration-500 motion-reduce:transition-none data-[at-top=true]:border-transparent data-[at-top=true]:bg-gradient-to-b data-[at-top=true]:from-ink/70 data-[at-top=true]:via-ink/35 data-[at-top=true]:to-transparent data-[at-top=true]:shadow-none"
    >
      <HeaderScrollState />

      {/* CSS-only mobile menu toggle. Must stay a sibling before .menu-overlay. */}
      <input
        type="checkbox"
        id="menu-toggle"
        className="sr-only"
        aria-label="Menu"
      />

      <Container>
        <nav
          aria-label="Main"
          className="flex h-16 items-center justify-between gap-4 sm:h-18"
        >
          <Link
            to="/"
            className="flex shrink-0 items-center gap-3 rounded-btn focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
          >
            <img
              src={brand.logo}
              alt=""
              width={40}
              height={40}
              className="size-10 rounded-[6px]"
        loading="eager"
        fetchPriority="high"
      />
            <span className="font-display text-lg tracking-[0.14em]" translate="no">
              LA GLASS
            </span>
          </Link>

          <ul className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group/nav relative py-2 text-sm font-medium tracking-wide transition-colors duration-200 hover:text-brass-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream motion-reduce:transition-none",
                      active ? "text-brass-soft" : "text-cream",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute -bottom-0.5 left-1/2 h-px w-6 -translate-x-1/2 bg-brass-soft transition-transform duration-300 ease-glass motion-reduce:transition-none",
                        active
                          ? "scale-x-100"
                          : "scale-x-0 group-hover/nav:scale-x-100 group-focus-visible/nav:scale-x-100",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={business.phone.href}
              className="hidden items-center gap-2 rounded-btn px-2 py-2 text-sm font-medium text-cream transition-colors duration-200 hover:text-brass-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream motion-reduce:transition-none md:flex"
            >
              <Phone aria-hidden className="size-4" />
              <span className="tabular-nums">{business.phone.display}</span>
            </a>
            {/*
              Visibility lives on a wrapper, not on the Button. Passing `hidden`
              to the Button loses to its own `inline-flex` base class (Tailwind
              resolves conflicting display utilities by stylesheet order, not by
              class order), which left the button visible and wrapping onto two
              lines on small phones.
            */}
            <span className="hidden sm:block">
              <Button
                href="/contact"
                variant="primary-dark"
                className="min-h-10 whitespace-nowrap px-4 text-sm"
              >
                Request a free quote
              </Button>
            </span>

            {/* Compact call button for phones, where the full CTA is hidden. */}
            <a
              href={business.phone.href}
              aria-label={`Call LA Glass at ${business.phone.display}`}
              className="flex size-11 items-center justify-center rounded-btn border border-brass/50 text-brass-soft transition-[background-color,border-color,transform] duration-200 ease-glass hover:-translate-y-0.5 hover:border-brass hover:bg-brass/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream motion-reduce:transition-none md:hidden"
            >
              <Phone aria-hidden className="size-5" />
            </a>

            {/* Label acts as the tap target for the hidden checkbox above. */}
            <label
              htmlFor="menu-toggle"
              aria-hidden="true"
              className="menu-button flex size-11 cursor-pointer items-center justify-center rounded-btn text-cream hover:text-brass-soft lg:hidden"
            >
              <Menu className="size-6" />
            </label>
          </div>
        </nav>
      </Container>

      <MobileMenu />
    </header>
  );
}
