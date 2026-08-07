import type { ProjectImage } from "@/lib/assets";
import { projectImages } from "@/lib/assets";
import { serviceContent, type Detail } from "@/content";

export interface Service {
  slug: string;
  href: string;
  title: string;
  summary: string;
  description: string;
  intro: string;
  details: Detail[];
  image?: ProjectImage;
}

/**
 * Services come from /content/services.json (editable in the admin). The
 * `image` key there names an entry in the approved photo manifest, so content
 * edits can never point at an unapproved photograph.
 */
const byKey = projectImages as Record<string, ProjectImage>;

export const services: Service[] = serviceContent.map((s) => ({
  slug: s.slug,
  href: s.href,
  title: s.title,
  summary: s.summary,
  description: s.description,
  intro: s.intro,
  details: s.details,
  image: byKey[s.image],
}));

export function serviceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
