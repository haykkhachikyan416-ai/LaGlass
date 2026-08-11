import { Head } from "vite-react-ssg";
import { business } from "@/lib/business";
import { services } from "@/lib/services";

const SITE = import.meta.env.VITE_SITE_URL ?? "";

/**
 * LocalBusiness structured data.
 *
 * This is how Google understands a trade business: what it is, where it works,
 * how to contact it, and when it is open. It is the highest-leverage SEO work
 * for a company whose customers search "shower glass near me".
 *
 * Only verified facts are published. Deliberately absent:
 *   - postal address     — never supplied, and a wrong one is worse than none
 *   - aggregateRating    — there are no real reviews yet; inventing them is
 *                          both dishonest and against Google's guidelines
 *   - priceRange         — not confirmed
 *   - license number     — not confirmed
 */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: business.name,
    description: business.description,
    ...(SITE ? { url: SITE, "@id": `${SITE}#business` } : {}),
    telephone: business.phone.display,
    email: business.email,
    areaServed: {
      "@type": "City",
      name: "Los Angeles",
      containedInPlace: { "@type": "State", name: "California" },
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "21:00",
      },
    ],
    sameAs: [business.social.instagram, business.social.tiktok].filter(Boolean),
    knowsAbout: services.map((s) => s.title),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Custom glass installation",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.summary },
      })),
    },
  };

  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Head>
  );
}
