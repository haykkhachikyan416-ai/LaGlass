/**
 * Generates public/sitemap.xml and keeps robots.txt pointing at it.
 *
 * Search engines find pages far more reliably when they are listed explicitly,
 * and local visibility is this site's main job. Routes are listed here rather
 * than crawled so the file cannot silently go stale without someone noticing.
 */
import { writeFile } from "node:fs/promises";

const SITE = (process.env.SITE_URL ?? "https://laglass.haykkhachikyan416.workers.dev")
  .replace(/\/$/, "");

/** priority reflects how much each page matters for winning local searches. */
const ROUTES = [
  { path: "/", priority: "1.0", changefreq: "monthly" },
  { path: "/services", priority: "0.9", changefreq: "monthly" },
  { path: "/services/shower-enclosures", priority: "0.9", changefreq: "monthly" },
  { path: "/services/glass-railings", priority: "0.9", changefreq: "monthly" },
  { path: "/gallery", priority: "0.8", changefreq: "monthly" },
  { path: "/reviews", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.8", changefreq: "yearly" },
  { path: "/about", priority: "0.6", changefreq: "yearly" },
  // /privacy is intentionally omitted — it carries no search value.
];

const today = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (r) => `  <url>
    <loc>${SITE}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
).join("\n")}
</urlset>
`;

await writeFile("public/sitemap.xml", xml);

await writeFile(
  "public/robots.txt",
  `User-agent: *
Allow: /
Disallow: /admin/

Sitemap: ${SITE}/sitemap.xml
`,
);

console.log(`[sitemap] ${ROUTES.length} routes -> public/sitemap.xml (${SITE})`);
