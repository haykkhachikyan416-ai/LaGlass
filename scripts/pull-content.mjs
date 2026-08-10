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
  faqList: "faq.json",
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

  const next = clean(doc);

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
