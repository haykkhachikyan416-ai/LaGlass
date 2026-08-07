import { Seo } from "@/components/Seo";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { business } from "@/lib/business";
import { PageIntro } from "@/components/layout/PageIntro";
import { Container } from "@/components/ui/Container";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { InstagramIcon, TikTokIcon } from "@/components/ui/SocialIcons";
import { pages } from "@/content";


const iconLink =
  "flex size-11 items-center justify-center rounded-btn text-muted transition-[color,transform] duration-200 ease-glass hover:-translate-y-0.5 hover:text-brass-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass motion-reduce:transition-none";

export default function ContactPage() {
  return (
    <>
      <Seo
        title="Request a Glass Installation Quote"
        description="Tell LA Glass about your custom glass project in the Los Angeles area and request a free estimate."
        path="/contact"
      />
      <PageIntro
        eyebrow={pages.contactIntroEyebrow}
        title={pages.contactIntroTitle}
        copy={pages.contactIntroCopy}
      />
      <section className="bg-cream py-16 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
            <QuoteForm />

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="font-display text-2xl text-ink">
                {pages.contactAsideHeading}
              </h2>
              <p className="mt-3 leading-relaxed text-muted">
                Call or text with your project details and LA Glass will get
                back to you. Estimates are always free.
              </p>

              <ul className="mt-8 space-y-5 text-sm">
                <li className="flex items-start gap-3">
                  <Phone aria-hidden className="mt-0.5 size-5 shrink-0 text-brass" />
                  <div>
                    <span className="block font-semibold uppercase tracking-[0.14em] text-muted">
                      Phone
                    </span>
                    <a
                      href={business.phone.href}
                      className="mt-1 inline-block font-display text-xl text-ink tabular-nums transition-colors duration-200 hover:text-brass-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass motion-reduce:transition-none"
                    >
                      {business.phone.display}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail aria-hidden className="mt-0.5 size-5 shrink-0 text-brass" />
                  <div className="min-w-0">
                    <span className="block font-semibold uppercase tracking-[0.14em] text-muted">
                      Email
                    </span>
                    <a
                      href={`mailto:${business.email}`}
                      className="mt-1 inline-flex min-h-11 items-center break-all text-ink underline-offset-4 transition-colors duration-200 hover:text-brass-strong hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass motion-reduce:transition-none sm:min-h-0"
                    >
                      {business.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock aria-hidden className="mt-0.5 size-5 shrink-0 text-brass" />
                  <div>
                    <span className="block font-semibold uppercase tracking-[0.14em] text-muted">
                      Hours
                    </span>
                    <p className="mt-1 text-ink">
                      {business.hours.days}
                      <br />
                      {business.hours.time}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-brass" />
                  <div>
                    <span className="block font-semibold uppercase tracking-[0.14em] text-muted">
                      Service area
                    </span>
                    <p className="mt-1 text-ink">Los Angeles area</p>
                  </div>
                </li>
              </ul>

              <div className="mt-8 flex items-center gap-1 border-t border-line pt-6">
                <a
                  href={business.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={iconLink}
                >
                  <InstagramIcon className="size-5" />
                  <span className="sr-only">LA Glass on Instagram</span>
                </a>
                <a
                  href={business.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={iconLink}
                >
                  <TikTokIcon className="size-5" />
                  <span className="sr-only">LA Glass on TikTok</span>
                </a>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
