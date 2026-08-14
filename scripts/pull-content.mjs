/**
 * Pulls published content from Sanity into /content/*.json before the build.
 *
 * The website reads those JSON files exactly as it always has, so switching the
 * content source changed nothing about how pages render.
 *
 * If Sanity is not configured (no SANITY_PROJECT_ID), this exits quietly and
 * the committed JSON is used instead. That means:
 *   - the site still builds before Sanity is set up,
 *   - a Sanity outage or a bad token can never produce an empty website.
 */
import { createClient } from "@sanity/client";
import { writeFile, readFile } from "node:fs/promises";
import path from "node:path";

const PROJECT_ID = process.env.SANITY_PROJECT_ID ?? "6i8hnrv7";
const DATASET = process.env.SANITY_DATASET ?? "production";

// Sanity document id -> content file it populates.
const MAP = {
  siteSettings: "site.json",
  homePage: "home.json",
  aboutPage: "about.json",
  pageHeadings: "pages.json",
  servicesList: "services.json",
  galleryList: "gallery.json",
  faqList: "faq.json",
  reviewsList: "reviews.json",
};

if (!PROJECT_ID) {
  console.log("[content] No Sanity project configured — using committed /content files.");
  process.exit(0);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-10-01",
  useCdn: false,
  // Only needed if the dataset is private; public datasets need no token.
  token: process.env.SANITY_READ_TOKEN,
  perspective: "published",
});

/** Strips Sanity's internal fields so the JSON stays clean and diffable. */
function clean(value) {
  if (Array.isArray(value)) return value.map(clean);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([k]) => !k.startsWith("_"))
        .map(([k, v]) => [k, clean(v)]),
    );
  }
  return value;
}

/**
 * Keeps services that exist in the repository but not yet in Sanity.
 *
 * A service is not only text: it has a card, a photo key, and sometimes a route
 * and a page. When one is added in code, the Sanity document does not know
 * about it yet, and a straight overwrite would silently drop it on the next
 * build — the site would look correct locally and be missing a service live.
 *
 * So the two lists are merged by slug: Sanity wins for every service it knows
 * (the owner's edits are authoritative), and anything only the repository has
 * is appended. Running `npm run content:seed` pushes the full list up, after
 * which Sanity knows every slug and this does nothing.
 *
 * Only the service list is merged. The other documents are singletons, where
 * merging fields would hide a deliberate deletion by the owner.
 */
function mergeServices(fromSanity, committed) {
  const known = new Set((fromSanity.items ?? []).map((s) => s.slug));
  const missing = (committed.items ?? []).filter((s) => !known.has(s.slug));
  if (!missing.length) return fromSanity;
  console.warn(
    `[content] servicesList: ${missing.map((s) => s.slug).join(", ")} ` +
      `not in Sanity yet — kept from the repository. Run \`npm run content:seed\` to push them up.`,
  );
  return { ...fromSanity, items: [...(fromSanity.items ?? []), ...missing] };
}

let updated = 0;
let skipped = 0;

for (const [docId, file] of Object.entries(MAP)) {
  const target = path.join("content", file);
  let doc;
  try {
    doc = await client.getDocument(docId);
  } catch (error) {
    console.warn(`[content] ${docId}: fetch failed (${error.message}) — keeping committed file.`);
    skipped++;
    continue;
  }

  if (!doc) {
    console.warn(`[content] ${docId}: no published document — keeping committed file.`);
    skipped++;
    continue;
  }

  let next = clean(doc);

  if (docId === "servicesList") {
    const committed = await readFile(target, "utf8")
      .then(JSON.parse)
      .catch(() => ({}));
    next = mergeServices(next, committed);
  }

  // Refuse to overwrite good content with an empty document. Without this an
  // accidentally-cleared field in the editor could blank a whole section.
  const meaningful = Object.values(next).filter(
    (v) => v !== null && v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0),
  ).length;
  if (meaningful === 0) {
    console.warn(`[content] ${docId}: document is empty — keeping committed file.`);
    skipped++;
    continue;
  }

  const previous = await readFile(target, "utf8").catch(() => "");
  const serialised = JSON.stringify(next, null, 2) + "\n";
  if (previous !== serialised) {
    await writeFile(target, serialised);
    updated++;
    console.log(`[content] ${file} updated from Sanity`);
  }
}

console.log(
  `[content] done — ${updated} file(s) updated, ${skipped} kept from the repository.`,
);
