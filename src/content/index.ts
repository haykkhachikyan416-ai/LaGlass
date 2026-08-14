import siteJson from "@content/site.json";
import homeJson from "@content/home.json";
import faqJson from "@content/faq.json";
import servicesJson from "@content/services.json";
import aboutJson from "@content/about.json";
import pagesJson from "@content/pages.json";
import reviewsJson from "@content/reviews.json";

/**
 * Every word on the site comes from the JSON files in /content.
 *
 * They are plain data files on purpose: the admin at /admin edits exactly these
 * files, so anything editable here is editable from a phone without touching
 * code. Adding a new editable field means adding it to the JSON, to the types
 * below, and to public/admin/config.yml.
 */

export interface IconPoint {
  icon: string;
  title: string;
  copy: string;
}

export interface Step {
  number: string;
  title: string;
  copy: string;
}

export interface Detail {
  title: string;
  copy: string;
}

export interface ServiceContent {
  slug: string;
  href: string;
  title: string;
  image: string;
  summary: string;
  description: string;
  intro: string;
  details: Detail[];
}

export const site = siteJson;
export const home = homeJson as typeof homeJson & {
  whyPoints: IconPoint[];
  processSteps: Step[];
  expectPoints: Detail[];
};
export const faq = faqJson.items as { question: string; answer: string }[];
export const serviceContent = servicesJson.items as ServiceContent[];
export const about = aboutJson;
export const pages = pagesJson;

export interface Review {
  quote: string;
  name: string;
  rating?: number;
  location?: string;
  service?: string;
  source?: string;
}

/**
 * Reviews, and the words around them.
 *
 * The headings default in code rather than living in pages.json, because that
 * file is replaced wholesale by whatever Sanity holds — fields Sanity does not
 * know about yet would disappear on the next build. Here the owner can still
 * override them from the studio, and the site reads correctly until they do.
 */
const reviewsDoc = reviewsJson as {
  items?: Review[];
  introEyebrow?: string;
  introTitle?: string;
  introCopy?: string;
  formHeading?: string;
  formCopy?: string;
};

export const reviews = {
  items: reviewsDoc.items ?? [],
  introEyebrow: reviewsDoc.introEyebrow || "Reviews",
  introTitle: reviewsDoc.introTitle || "What customers say about the work",
  introCopy:
    reviewsDoc.introCopy ||
    "LA Glass only publishes reviews written by real customers, so this page grows as they arrive. If we have installed glass for you, we would be glad to hear how it went.",
  formHeading: reviewsDoc.formHeading || "Leave a review",
  formCopy:
    reviewsDoc.formCopy ||
    "Tell us how the project went. Reviews are read before they go on the site, so yours will not appear straight away.",
};
