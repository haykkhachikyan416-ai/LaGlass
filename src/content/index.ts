import siteJson from "@content/site.json";
import homeJson from "@content/home.json";
import faqJson from "@content/faq.json";
import servicesJson from "@content/services.json";
import aboutJson from "@content/about.json";
import pagesJson from "@content/pages.json";

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
