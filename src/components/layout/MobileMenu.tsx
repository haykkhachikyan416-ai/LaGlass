import { X } from "lucide-react";
import { business, nav } from "@/lib/business";
import { InstagramIcon, TikTokIcon } from "@/components/ui/SocialIcons";

/**
 * Mobile navigation drawer — pure markup, no client JavaScript.
 *
 * Opening and closing is driven entirely by the #menu-toggle checkbox in
 * Header.tsx via CSS sibling selectors (see globals.css). This means the menu
 * works even when the JS bundle fails to load, which is the failure mode that
 * previously left it unresponsive on real phones.
 *
 * Links are plain <a> elements so navigating performs a full page load, which
 * also resets the checkbox — the menu is never left open after navigation.
 */
export function MobileMenu() {
  return (
    <div className="menu-overlay fixed inset-0 z-[70] lg:hidden">
      {/* Backdrop — tapping it unchecks the toggle and closes the drawer. */}
      <label
        htmlFor="menu-toggle"
        aria-label="Close menu"
        className="absolute inset-0 bg-ink/70"
      />

      <div
        id="mobile-menu"
        className="menu-panel absolute inset-y-0 right-0 flex h-dvh w-80 max-w-[85vw] flex-col overflow-y-auto overscroll-contain border-l border-white/10 bg-ink p-6 text-cream"
      >
        <div className="flex items-center justify-between">
          <span className="font-display text-lg tracking-[0.14em]" translate="no">
            LA GLASS
          </span>
          <label
            htmlFor="menu-toggle"
            aria-label="Close menu"
            className="flex size-11 cursor-pointer items-center justify-center rounded-btn text-cream hover:text-brass-soft"
          >
            <X aria-hidden className="size-6" />
          </label>
        </div>

        <nav aria-label="Mobile" className="mt-8">
          <ul className="space-y-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-btn px-3 py-3 font-display text-2xl text-cream hover:bg-white/5 hover:text-brass-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto space-y-3 pt-8">
          <a
            href="/contact"
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-btn bg-brass px-6 font-medium text-ink hover:bg-brass-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
          >
            Request a free quote
          </a>
          <a
            href={business.phone.href}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-btn border border-brass/70 px-6 font-medium text-cream hover:bg-brass/12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
          >
            {business.phone.display}
          </a>
          <div className="flex items-center gap-2 pt-2">
            <a
              href={business.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-11 items-center justify-center rounded-btn text-muted-dark hover:text-brass-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
            >
              <InstagramIcon className="size-5" />
              <span className="sr-only">LA Glass on Instagram</span>
            </a>
            <a
              href={business.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-11 items-center justify-center rounded-btn text-muted-dark hover:text-brass-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
            >
              <TikTokIcon className="size-5" />
              <span className="sr-only">LA Glass on TikTok</span>
            </a>
          </div>
          <p className="pt-2 text-sm text-muted-dark">
            {business.hours.days} · {business.hours.time}
          </p>
        </div>
      </div>
    </div>
  );
}
