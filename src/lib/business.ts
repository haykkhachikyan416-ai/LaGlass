import { site } from "@/content";

/**
 * Verified business information, sourced from /content/site.json so it can be
 * edited from the admin. Values must stay consistent with docs/BUSINESS-INFO.md
 * — no license claim until verified wording exists.
 */
export const business = {
  name: site.name,
  tagline: site.tagline,
  description: site.description,
  phone: { display: site.phoneDisplay, href: site.phoneHref },
  email: site.email,
  social: { instagram: site.instagram, tiktok: site.tiktok },
  hours: { days: site.hoursDays, time: site.hoursTime },
  serviceAreaStatement: site.serviceAreaStatement,
  stats: {
    yearsExperience: site.yearsExperience,
    completedProjects: site.completedProjects,
  },
  insured: site.insured,
  freeEstimates: site.freeEstimates,
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Reviews", href: "/reviews" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
