import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { business, nav } from "@/lib/business";
import { brand } from "@/lib/assets";
import { services } from "@/lib/services";
import { Container } from "@/components/ui/Container";
import { InstagramIcon, TikTokIcon } from "@/components/ui/SocialIcons";

// min-h-11 gives a 44px thumb target on phones; desktop tightens back up.
const footerLink =
  "link-underline inline-flex min-h-11 items-center text-sm text-muted-dark transition-colors duration-200 hover:text-brass-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream motion-reduce:transition-none sm:min-h-8";

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-3 rounded-btn focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
            >
              <img
                src={brand.logo}
                alt=""
                width={44}
                height={44}
                className="size-11 rounded-[6px]"
                loading="lazy"
              />
              <span className="font-display text-lg tracking-[0.14em]" translate="no">
                LA GLASS
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-dark">
              {business.description}
            </p>
            <div className="mt-5 flex items-center gap-1">
              <a
                href={business.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-11 items-center justify-center rounded-btn text-muted-dark transition-colors duration-200 hover:text-brass-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream motion-reduce:transition-none"
              >
                <InstagramIcon className="size-5" />
                <span className="sr-only">LA Glass on Instagram</span>
              </a>
              <a
                href={business.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-11 items-center justify-center rounded-btn text-muted-dark transition-colors duration-200 hover:text-brass-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream motion-reduce:transition-none"
              >
                <TikTokIcon className="size-5" />
                <span className="sr-only">LA Glass on TikTok</span>
              </a>
            </div>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-brass-soft">
              Pages
            </h2>
            <ul className="mt-3 space-y-0 sm:mt-4 sm:space-y-1.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className={footerLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/privacy" className={footerLink}>
                  Privacy
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Services">
            <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-brass-soft">
              Services
            </h2>
            <ul className="mt-3 space-y-0 sm:mt-4 sm:space-y-1.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link to={service.href} className={footerLink}>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-brass-soft">
              Contact
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-dark">
              <li>
                <a
                  href={business.phone.href}
                  className="inline-flex min-h-11 items-center gap-2.5 rounded-btn sm:min-h-0 text-cream transition-colors duration-200 hover:text-brass-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream motion-reduce:transition-none"
                >
                  <Phone aria-hidden className="size-4 text-brass-soft" />
                  <span className="tabular-nums">{business.phone.display}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${business.email}`}
                  className="inline-flex min-h-11 items-center gap-2.5 rounded-btn sm:min-h-0 break-all transition-colors duration-200 hover:text-brass-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream motion-reduce:transition-none"
                >
                  <Mail aria-hidden className="size-4 shrink-0 text-brass-soft" />
                  {business.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-brass-soft" />
                {business.serviceAreaStatement}
              </li>
              <li className="pl-[26px]">
                {business.hours.days}
                <br />
                {business.hours.time}
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-xs text-muted-dark sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} LA Glass. All rights reserved.
          </p>
          <p>{business.serviceAreaStatement}.</p>
        </Container>
      </div>
    </footer>
  );
}
