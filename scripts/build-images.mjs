/**
 * Generates responsive WebP variants for every approved project photo.
 *
 * The sources in src/assets are full-size phone photos (up to 1650x2200,
 * 200-600 KB each). Nothing on the site displays them larger than ~700 CSS px,
 * so shipping the originals wastes most of their bytes. This emits a few widths
 * per photo plus a manifest the app turns into srcset, which is what next/image
 * used to do for us.
 */
import sharp from "sharp";
import { readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const SRC = "src/assets";
const OUT = "public/img";
const WIDTHS = [480, 768, 1200, 1600];
const QUALITY = 76;

// Photos the owner has approved (mirrors src/lib/assets.ts).
const APPROVED = new Set([
  "shower enclosure.webp", "Shower.webp", "Shower1.webp", "Shower2.webp",
  "Shower6.webp", "Shower7.webp", "Shower8.webp", "Shower9.webp",
  "Shower10.webp", "Shower11.webp", "Shower12.webp", "IMG_2297.webp",
  "Glass Railing 1.webp", "glass railing 2.webp", "glass railing 13.webp",
  "railing15.webp", "Logo.webp",
]);

const slug = (f) =>
  path.parse(f).name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => APPROVED.has(f));
const manifest = {};
let before = 0, after = 0;

for (const file of files) {
  const input = path.join(SRC, file);
  const image = sharp(input);
  const meta = await image.metadata();
  before += meta.size ?? 0;

  const base = slug(file);
  const widths = WIDTHS.filter((w) => w <= meta.width).concat(
    WIDTHS.some((w) => w <= meta.width) ? [] : [meta.width],
  );
  const entries = [];
  for (const w of widths) {
    const name = `${base}-${w}.webp`;
    const info = await sharp(input)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(path.join(OUT, name));
    after += info.size;
    entries.push({ w, url: `/img/${name}` });
  }
  const largest = entries[entries.length - 1];
  manifest[file] = {
    src: largest.url,
    srcSet: entries.map((e) => `${e.url} ${e.w}w`).join(", "),
    width: meta.width,
    height: meta.height,
  };
}

await writeFile("src/lib/images.generated.json", JSON.stringify(manifest, null, 2) + "\n");
const kb = (n) => `${Math.round(n / 1024)} KB`;
console.log(`${files.length} photos -> ${Object.values(manifest).reduce((n, m) => n + m.srcSet.split(",").length, 0)} variants`);
console.log(`originals ${kb(before)}  ->  variants ${kb(after)}`);
