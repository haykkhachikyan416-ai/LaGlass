/**
 * Turns photos uploaded in Sanity into local responsive variants.
 *
 * The owner uploads from their phone; this downloads each original once,
 * runs it through the same sharp pipeline as the committed photos, and adds it
 * to the shared image manifest. The deployed site therefore serves its own
 * images — no runtime dependency on Sanity's CDN, and the photos keep working
 * even if the Sanity account later lapses.
 *
 * Downloads are cached by asset id in .image-cache/, so rebuilds only fetch
 * photos that are actually new.
 */
import sharp from "sharp";
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import path from "node:path";

const PROJECT_ID = process.env.SANITY_PROJECT_ID ?? "6i8hnrv7";
const DATASET = process.env.SANITY_DATASET ?? "production";
const OUT = "public/img";
const CACHE = ".image-cache";
const MANIFEST = "src/lib/images.generated.json";
const WIDTHS = [480, 768, 1200, 1600];
const QUALITY = 76;

/** "image-<id>-<w>x<h>-<ext>" -> a downloadable CDN url. */
function assetUrl(ref) {
  const m = /^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/.exec(ref);
  if (!m) return null;
  const [, id, dims, ext] = m;
  return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${id}-${dims}.${ext}`;
}

const exists = (p) => access(p).then(() => true).catch(() => false);

async function readJson(file, fallback) {
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch {
    return fallback;
  }
}

/** Collect every {ref, alt, category} used anywhere in the pulled content. */
function collect(gallery, services) {
  const found = [];
  for (const item of gallery.items ?? []) {
    const ref = item?.asset?.asset?._ref ?? item?.asset?._ref;
    if (ref) found.push({ ref, alt: item.alt ?? "", category: item.category ?? "custom" });
  }
  for (const s of services.items ?? []) {
    const ref = s?.photo?.asset?._ref;
    if (ref) found.push({ ref, alt: s.photo.alt ?? "", category: s.photo.category ?? "custom", slug: s.slug });
  }
  return found;
}

const gallery = await readJson("content/gallery.json", { items: [] });
const services = await readJson("content/services.json", { items: [] });
const photos = collect(gallery, services);

if (photos.length === 0) {
  console.log("[images] no photos uploaded in Sanity — using the committed set.");
  process.exit(0);
}

await mkdir(OUT, { recursive: true });
await mkdir(CACHE, { recursive: true });

const manifest = await readJson(MANIFEST, {});
let built = 0;
let cached = 0;

for (const photo of photos) {
  const url = assetUrl(photo.ref);
  if (!url) {
    console.warn(`[images] unrecognised asset reference, skipping: ${photo.ref}`);
    continue;
  }

  const key = photo.ref;
  const original = path.join(CACHE, `${photo.ref}${path.extname(new URL(url).pathname)}`);

  if (!(await exists(original))) {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`[images] download failed (${response.status}) for ${photo.ref} — skipping.`);
      continue;
    }
    await writeFile(original, Buffer.from(await response.arrayBuffer()));
    built++;
  } else {
    cached++;
  }

  const meta = await sharp(original).metadata();
  const base = photo.ref.replace(/^image-/, "sanity-").slice(0, 48);
  const widths = WIDTHS.filter((w) => w <= meta.width);
  if (widths.length === 0) widths.push(meta.width);

  const entries = [];
  for (const w of widths) {
    const name = `${base}-${w}.webp`;
    const target = path.join(OUT, name);
    if (!(await exists(target))) {
      await sharp(original).resize({ width: w, withoutEnlargement: true })
        .webp({ quality: QUALITY }).toFile(target);
    }
    entries.push({ w, url: `/img/${name}` });
  }

  manifest[key] = {
    src: entries[entries.length - 1].url,
    srcSet: entries.map((e) => `${e.url} ${e.w}w`).join(", "),
    width: meta.width,
    height: meta.height,
    alt: photo.alt,
    category: photo.category,
    ...(photo.slug ? { slug: photo.slug } : {}),
  };
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(
  `[images] ${photos.length} Sanity photo(s): ${built} downloaded, ${cached} from cache.`,
);
