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

// Photos the owner has approved. This mirrors src/lib/assets.ts exactly — the
// exclusions (people visible in the glass, unfinished rooms) are listed there.
// Anything not in this set is never resized and never reaches the build.
const pick = (prefix, ...ns) => ns.map((n) => `${prefix}-${n}.jpeg`);
const APPROVED = new Set([
  "Logo.webp",
  "header mobile.png",
  ...pick("shower", 1, 3, 4, 6, 7, 8, 9, 10, 13, 14, 17, 18, 20, 21, 22, 24, 26, 27),
  ...pick("railing", 1, 3, 6, 7, 8, 9),
  ...pick("door", 1, 3, 4),
  ...pick("closet", 1, 3),
]);

const slug = (f) =>
  path.parse(f).name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => APPROVED.has(f));
const manifest = {};
let before = 0, after = 0;

for (const file of files) {
  const input = path.join(SRC, file);
  // .rotate() with no argument applies the EXIF orientation flag. Without it
  // the 40 phone photos that are stored sideways would render rotated 90°.
  const image = sharp(input).rotate();
  const meta = await image.metadata();
  before += meta.size ?? 0;

  // After auto-rotation the visual dimensions swap for orientation 6/8.
  const upright = (meta.orientation ?? 1) >= 5
    ? { width: meta.height, height: meta.width }
    : { width: meta.width, height: meta.height };

  const base = slug(file);
  // Ladder up to the source width, capped at the largest standard width. The
  // top rung is the source's own width when that falls between two rungs —
  // otherwise a 1170px-wide image would top out at 768w and look soft on a
  // 3x phone screen.
  const cap = Math.min(upright.width, WIDTHS[WIDTHS.length - 1]);
  const widths = [...new Set([...WIDTHS.filter((w) => w < cap), cap])];
  const entries = [];
  for (const w of widths) {
    const name = `${base}-${w}.webp`;
    const info = await sharp(input)
      .rotate()
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
    width: upright.width,
    height: upright.height,
  };
}

await writeFile("src/lib/images.generated.json", JSON.stringify(manifest, null, 2) + "\n");
const kb = (n) => `${Math.round(n / 1024)} KB`;
console.log(`${files.length} photos -> ${Object.values(manifest).reduce((n, m) => n + m.srcSet.split(",").length, 0)} variants`);
console.log(`originals ${kb(before)}  ->  variants ${kb(after)}`);
