/**
 * One-time migration: copies the current /content/*.json into Sanity so the
 * editor opens with the real website content already filled in.
 *
 * Run once, after creating the Sanity project:
 *   SANITY_PROJECT_ID=xxx SANITY_WRITE_TOKEN=yyy node scripts/seed-sanity.mjs
 *
 * Safe to re-run: it replaces the singleton documents wholesale. It never
 * touches the website itself.
 */
import { createClient } from "@sanity/client";
import { readFile } from "node:fs/promises";
import path from "node:path";

const PROJECT_ID = process.env.SANITY_PROJECT_ID ?? "6i8hnrv7";
const TOKEN = process.env.SANITY_WRITE_TOKEN;
const DATASET = process.env.SANITY_DATASET ?? "production";

if (!TOKEN) {
  console.error(
    "Missing config.\n" +
      "  SANITY_PROJECT_ID   your project id (Sanity → Project settings)\n" +
      "  SANITY_WRITE_TOKEN  an Editor token (Sanity → API → Tokens)\n\n" +
      "Example:\n" +
      "  SANITY_PROJECT_ID=ab12cd34 SANITY_WRITE_TOKEN=sk... node scripts/seed-sanity.mjs",
  );
  process.exit(1);
}

const MAP = {
  siteSettings: "site.json",
  homePage: "home.json",
  aboutPage: "about.json",
  pageHeadings: "pages.json",
  servicesList: "services.json",
  faqList: "faq.json",
};

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-10-01",
  token: TOKEN,
  useCdn: false,
});

/**
 * Sanity requires a _key on every item in an array of objects, otherwise the
 * editor cannot track them when reordering.
 */
function withKeys(value, seed = "k") {
  if (Array.isArray(value)) {
    return value.map((item, i) =>
      item && typeof item === "object" && !Array.isArray(item)
        ? { ...withKeys(item, `${seed}${i}`), _key: `${seed}${i}` }
        : withKeys(item, `${seed}${i}`),
    );
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, withKeys(v, `${seed}-${k}-`)]),
    );
  }
  return value;
}

const tx = client.transaction();

for (const [docId, file] of Object.entries(MAP)) {
  const raw = JSON.parse(await readFile(path.join("content", file), "utf8"));
  const doc = { _id: docId, _type: docId, ...withKeys(raw) };
  tx.createOrReplace(doc);
  console.log(`queued ${docId}  <-  content/${file}`);
}

await tx.commit();
console.log(
  `\nDone. ${Object.keys(MAP).length} documents written to project ${PROJECT_ID} (${DATASET}).\n` +
    "Open the studio and you should see the live website content.",
);
