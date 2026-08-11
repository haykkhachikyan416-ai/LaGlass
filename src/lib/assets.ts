
/**
 * Typed manifest of approved LA Glass project photography.
 *
 * Originals live untouched in src/assets/ and are imported so Vite fingerprints
 * and copies them into the build. Descriptive ids and alt text live here instead
 * of renaming files. Every entry below was visually verified on 2026-07-10.
 *
 * Excluded pending owner approval (do NOT import):
 * - "Shower3.webp"          — photographer clearly reflected in the glass
 * - "Shower 5.webp"         — two people visibly reflected in the dark marble
 * - "Shower13.webp"         — installer reflections in the polished black marble
 * - "Shower15.webp"         — person visible in the vanity-mirror reflection
 * - "IMG_2296.webp"         — two people reflected in the polished wall tile
 * - "glass railing 10.webp" — carries an AI-generator watermark; not a real project photo
 * - "mirror3.webp"          — staged/rendered look; authenticity unconfirmed
 * - "mirror5.webp"          — photographer fully visible in the mirror
 */

import manifest from "@/lib/images.generated.json";
import galleryDoc from "@content/gallery.json";

export type ProjectCategory = "showers" | "railings" | "custom";

export interface ProjectImage {
  id: string;
  /** Largest generated variant — used as the plain src fallback. */
  src: string;
  /** Responsive candidates so the browser downloads only what it needs. */
  srcSet: string;
  width: number;
  height: number;
  alt: string;
  category: ProjectCategory;
}

type Manifest = Record<string, { src: string; srcSet: string; width: number; height: number }>;
const files = manifest as Manifest;

function image(file: string, id: string, alt: string, category: ProjectCategory): ProjectImage {
  const m = files[file];
  if (!m) throw new Error(`Missing generated variants for ${file} — run \`npm run images\`.`);
  return { id, src: m.src, srcSet: m.srcSet, width: m.width, height: m.height, alt, category };
}

export const brand = { logo: files["Logo.webp"].src } as const;

export const projectImages = {
  showerSteam: image("shower enclosure.webp", "shower-steam", "Floor-to-ceiling glass steam-shower enclosure with polished-nickel hinges in a marble primary bathroom", "showers"),
  showerBlackHardware: image("Shower.webp", "shower-black-hardware", "Frameless corner shower enclosure with matte-black hinges and clips in a white marble bathroom", "showers"),
  showerSubwayCorner: image("Shower1.webp", "shower-subway-corner", "Frameless corner shower with matte-black hardware in a black-and-white subway-tile bathroom", "showers"),
  showerRainGlass: image("Shower2.webp", "shower-rain-glass", "Rain-textured glass shower doors with a slim dark handle against black marble walls", "showers"),
  showerNickelCorner: image("Shower6.webp", "shower-nickel-corner", "Frameless corner shower with a brushed-nickel header and hinges in a white marble bathroom", "showers"),
  showerBrassCalacatta: image("Shower7.webp", "shower-brass-calacatta", "Frameless shower enclosure with brushed-brass hinges and handle in a calacatta-gold marble bathroom", "showers"),
  showerFrostedDoors: image("Shower8.webp", "shower-frosted-doors", "Frosted-glass shower door and panel with a brushed-nickel handle for full privacy", "showers"),
  showerGoldHillside: image("Shower9.webp", "shower-gold-hillside", "Gold-framed glass shower enclosure beside a freestanding tub with hillside views of Los Angeles", "showers"),
  showerOnyx: image("Shower10.webp", "shower-onyx", "Frameless shower door with a brushed-nickel handle set in dramatic gray onyx-look stone", "showers"),
  showerPandaMarble: image("Shower11.webp", "shower-panda-marble", "Frameless corner glass panels in a panda-marble shower with black-and-white veining", "showers"),
  showerChromeHalfWall: image("Shower12.webp", "shower-chrome-half-wall", "Frameless corner shower glass mounted over a half wall, with chrome hardware and a pebble-tile pan", "showers"),
  showerChromeCalacatta: image("IMG_2297.webp", "shower-chrome-calacatta", "Frameless panel-and-door shower with chrome hardware and a marble bench", "showers"),
  railingBrassStandoffs: image("Glass Railing 1.webp", "railing-brass-standoffs", "Frameless glass stair railing mounted with brass standoffs on light oak stairs", "railings"),
  railingBlackCapFoyer: image("glass railing 2.webp", "railing-black-cap-foyer", "Glass stair railing with a slim black cap rail in a two-story foyer", "railings"),
  railingCurvedBrass: image("glass railing 13.webp", "railing-curved-brass", "Curved glass railing with brass standoff fittings following a winding staircase", "railings"),
  railingBlackPostsOak: image("railing15.webp", "railing-black-posts-oak", "Glass stair railing with matte-black posts and handrail on oak treads", "railings"),
} as const satisfies Record<string, ProjectImage>;

/** Hero poster / video fallback image (clean, no people or reflections). */
export const heroPoster = projectImages.showerSteam;

/**
 * Featured Projects (home). Curated mix of showers and railings.
 * This list is the future data source for the 21st.dev Image Shuffle component.
 */
export const featuredProjects: ProjectImage[] = [
  projectImages.showerPandaMarble,
  projectImages.railingBlackCapFoyer,
  projectImages.showerChromeCalacatta,
  projectImages.railingBlackPostsOak,
  projectImages.showerSubwayCorner,
  projectImages.showerOnyx,
];

/** The committed photo set, used whenever nothing has been uploaded in Sanity. */
const committedGallery: ProjectImage[] = [
  projectImages.showerSteam,
  projectImages.railingBrassStandoffs,
  projectImages.showerBrassCalacatta,
  projectImages.showerBlackHardware,
  projectImages.railingCurvedBrass,
  projectImages.showerPandaMarble,
  projectImages.showerGoldHillside,
  projectImages.railingBlackCapFoyer,
  projectImages.showerOnyx,
  projectImages.showerRainGlass,
  projectImages.railingBlackPostsOak,
  projectImages.showerNickelCorner,
  projectImages.showerChromeCalacatta,
  projectImages.showerFrostedDoors,
  projectImages.showerChromeHalfWall,
  projectImages.showerSubwayCorner,
];

/* ------------------------------------------------------------------ *
 * Photos uploaded through the studio
 * ------------------------------------------------------------------ */

type UploadedPhoto = {
  asset?: { asset?: { _ref?: string }; _ref?: string };
  alt?: string;
  category?: string;
};

type ManifestEntry = {
  src: string;
  srcSet: string;
  width: number;
  height: number;
  alt?: string;
  category?: string;
};

/** Sanity nests the reference one level deeper than a plain image field. */
function refOf(photo: UploadedPhoto): string | undefined {
  return photo.asset?.asset?._ref ?? photo.asset?._ref;
}

/**
 * Photos the owner uploaded, resolved against the variants the build
 * generated for them. Anything without generated variants is skipped rather
 * than rendered broken.
 */
const uploadedGallery: ProjectImage[] = ((galleryDoc as { items?: UploadedPhoto[] }).items ?? [])
  .map((photo, index): ProjectImage | null => {
    const ref = refOf(photo);
    const entry = ref ? (files as Record<string, ManifestEntry>)[ref] : undefined;
    if (!entry) return null;
    const category = (photo.category ?? entry.category ?? "custom") as ProjectCategory;
    return {
      id: ref ?? `uploaded-${index}`,
      src: entry.src,
      srcSet: entry.srcSet,
      width: entry.width,
      height: entry.height,
      alt: photo.alt ?? entry.alt ?? "",
      category,
    };
  })
  .filter((image): image is ProjectImage => image !== null);

/**
 * The gallery the site renders. Uploaded photos win when there are any, so the
 * owner is in control; otherwise the committed, vetted set is used, which means
 * the site can never end up with an empty gallery.
 */
export const galleryImages: ProjectImage[] =
  uploadedGallery.length > 0 ? uploadedGallery : committedGallery;

/** Look up a photo the owner attached to a service, if there is one. */
export function uploadedServicePhoto(photo: unknown): ProjectImage | undefined {
  const ref = refOf((photo ?? {}) as UploadedPhoto);
  const entry = ref ? (files as Record<string, ManifestEntry>)[ref] : undefined;
  if (!entry || !ref) return undefined;
  const p = photo as UploadedPhoto;
  return {
    id: ref,
    src: entry.src,
    srcSet: entry.srcSet,
    width: entry.width,
    height: entry.height,
    alt: p.alt ?? entry.alt ?? "",
    category: (p.category ?? "custom") as ProjectCategory,
  };
}
