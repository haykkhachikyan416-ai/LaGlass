/**
 * Typed manifest of LA Glass project photography.
 *
 * Originals live untouched in src/assets/. `scripts/build-images.mjs` resizes
 * them into public/img and writes images.generated.json; this file gives each
 * one a stable id and honest alt text. Every entry was viewed upright — the
 * phone originals carry EXIF orientation 6, so the raw files display sideways.
 *
 * Owner decision, 2026-08-12: publish the entire supplied library, all 46
 * photographs. An earlier pass held 17 back — 9 because a person is visible or
 * reflected in the glass, 6 because the room was still under construction, and
 * 2 for technical faults. The owner reviewed that list and asked for all of
 * them. The two technical faults were fixed rather than waved through:
 * closet-2's baked-in letterbox is cropped in the build script, and mirror-2
 * turned out to be correctly oriented (it is a stairwell shot from above).
 *
 * Alt text describes the installation, never the person who happens to be
 * reflected in it.
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

/** The hand-built three-panel collage the owner supplied for the mobile hero. */
export const mobileHero = image(
  "header mobile.png",
  "mobile-hero",
  "Three LA Glass installations: a marble shower enclosure, a curved glass stair railing, and black-framed frosted closet doors",
  "custom",
);

export const projectImages = {
  /* ---- Shower enclosures ---- */
  showerPandaQuartzite: image("shower-3.jpeg", "shower-panda-quartzite", "Frameless corner shower enclosure with brushed-brass clips against bookmatched black-and-white quartzite", "showers"),
  showerNeoAngleBronze: image("shower-4.jpeg", "shower-neo-angle-bronze", "Neo-angle frameless shower enclosure with oil-rubbed bronze hinges and a marble hex-tile floor", "showers"),
  showerBrassBench: image("shower-6.jpeg", "shower-brass-bench", "Frameless corner shower with brushed-brass hardware, a built-in stone bench and gray marble walls", "showers"),
  showerMarbleChrome: image("shower-7.jpeg", "shower-marble-chrome", "Frameless shower door and return panel with chrome hardware in a white marble bathroom", "showers"),
  showerSteamBench: image("shower-8.jpeg", "shower-steam-bench", "Full-height frameless steam-shower enclosure with a marble bench and transom panel", "showers"),
  showerBlackHillside: image("shower-9.jpeg", "shower-black-hillside", "Black marble steam shower with brushed-brass hardware beside a freestanding tub and a hillside window", "showers"),
  showerCalacattaDoor: image("shower-10.jpeg", "shower-calacatta-door", "Frameless shower door and inline panel with polished-chrome hinges against calacatta-look porcelain", "showers"),
  showerWhiteMatteBlack: image("shower-13.jpeg", "shower-white-matte-black", "Frameless shower enclosure with matte-black hinges, a corner bench and a white oak vanity", "showers"),
  showerPandaBrass: image("shower-14.jpeg", "shower-panda-brass", "Frameless shower enclosure with brushed-brass clips and a floating bench in bookmatched panda marble", "showers"),
  showerBlackSteamRoom: image("shower-18.jpeg", "shower-black-steam-room", "Two frameless glass doors set into a black marble steam room with brushed-brass hardware", "showers"),
  showerCornerBronze: image("shower-20.jpeg", "shower-corner-bronze", "Frameless corner shower with oil-rubbed bronze clips and a marble mosaic pan", "showers"),
  showerBrassTub: image("shower-21.jpeg", "shower-brass-tub", "Frameless corner shower with brushed-brass hardware next to a freestanding soaking tub", "showers"),
  showerCheckerPan: image("shower-22.jpeg", "shower-checker-pan", "Frameless shower enclosure with matte-black hardware, a marble bench and a checkerboard mosaic pan", "showers"),
  showerNeoAngleChrome: image("shower-24.jpeg", "shower-neo-angle-chrome", "Neo-angle frameless shower enclosure with chrome hardware and a pebble-mosaic floor", "showers"),
  showerSlidingBarn: image("shower-26.jpeg", "shower-sliding-barn", "Sliding glass shower door on an exposed brushed-nickel track over a marble-look alcove", "showers"),
  showerSteamMatteBlack: image("shower-27.jpeg", "shower-steam-matte-black", "Frameless steam-shower enclosure with matte-black hardware, a marble bench and a slate floor", "showers"),
  showerNeoAngleBlackCurb: image("shower-2.jpeg", "shower-neo-angle-black-curb", "Full-height neo-angle shower enclosure on a black marble curb, with a mosaic pan and marble walls", "showers"),
  showerTubScreenHerringbone: image("shower-5.jpeg", "shower-tub-screen-herringbone", "Floor-to-ceiling glass panels with brass hinges enclosing a freestanding tub against herringbone tile", "showers"),
  showerBrassFramedGrid: image("shower-11.jpeg", "shower-brass-framed-grid", "Brass-framed shower enclosure with a divided-light grid pattern beside a garden window", "showers"),
  showerMarbleWalkIn: image("shower-12.jpeg", "shower-marble-walk-in", "Wide walk-in shower with frameless glass panels, brass clips and bookmatched marble around three windows", "showers"),
  showerVeinedMarbleBench: image("shower-15.jpeg", "shower-veined-marble-bench", "Large frameless enclosure with brass clips and a stone bench in dramatically veined white marble", "showers"),
  showerBrassCheckerboard: image("shower-19.jpeg", "shower-brass-checkerboard", "Frameless corner shower with brushed-brass hardware over a black-and-white checkerboard floor", "showers"),
  showerCornerChromeSimple: image("shower-23.jpeg", "shower-corner-chrome-simple", "Frameless corner shower enclosure with chrome hardware and a built-in stone bench", "showers"),
  showerNeoAngleBlackVanity: image("shower-25.jpeg", "shower-neo-angle-black-vanity", "Neo-angle frameless shower with matte-black hardware, marble walls and a black floating vanity", "showers"),

  /* ---- Glass railings ---- */
  railingStairBlackCap: image("railing-1.jpeg", "railing-stair-black-cap", "Frameless glass stair railing with a slim black cap rail following a straight run of stairs", "railings"),
  railingStoneLanding: image("railing-3.jpeg", "railing-stone-landing", "Glass stair and landing railing with a black cap rail above a stacked-stone wall", "railings"),
  railingOakStair: image("railing-6.jpeg", "railing-oak-stair", "Glass stair railing with a black cap rail alongside light oak treads", "railings"),
  railingMezzanine: image("railing-7.jpeg", "railing-mezzanine", "Glass mezzanine railing with a black cap rail overlooking a double-height living room", "railings"),
  railingLandingShoe: image("railing-8.jpeg", "railing-landing-shoe", "Glass landing railing set in a black base shoe on a wide-plank oak floor", "railings"),
  railingCurvedBrass: image("railing-9.jpeg", "railing-curved-brass", "Curved glass stair railing on brass standoffs following a winding staircase", "railings"),
  railingStandoffStair: image("railing-2.jpeg", "railing-standoff-stair", "Glass stair railing on stainless standoffs with a slim metal handrail, against a panelled wall", "railings"),
  railingTwoStorey: image("railing-4.jpeg", "railing-two-storey", "Glass railing with a black cap rail running up a staircase and along the floor above it", "railings"),
  railingEntryLanding: image("railing-5.jpeg", "railing-entry-landing", "Glass landing railing with a black cap rail overlooking a tiled entry hall", "railings"),
  railingBronzeStairwell: image("mirror-2.jpeg", "railing-bronze-stairwell", "Bronze-tinted glass railing panel enclosing a stairwell, with a black wall-mounted handrail alongside", "railings"),

  /* ---- Mirrors, doors, partitions and other custom glass ---- */
  mirroredClosetDoors: image("mirror-1.jpeg", "mirrored-closet-doors", "Full-height mirrored sliding closet doors in a slim gold frame, spanning a bedroom wall", "custom"),
  partitionBrickRoom: image("shower-1.jpeg", "partition-brick-room", "Frameless glass partition panels with matte-black clamps enclosing a brick-walled tasting room", "custom"),
  partitionPowderRoom: image("shower-16.jpeg", "partition-powder-room", "Clear glass partition panels above green panelled wainscot in a wallpapered powder room", "custom"),
  doorsBrassPulls: image("shower-17.jpeg", "doors-brass-pulls", "Double frameless glass doors with full-height brass pulls opening off a marble entry", "custom"),
  wineCellarDoors: image("door-3.jpeg", "wine-cellar-doors", "Frameless glass wine-cellar doors set flush into a paneled wall", "custom"),
  pantryDoorWoodPull: image("door-4.jpeg", "pantry-door-wood-pull", "Single frameless glass door with a wood pull opening into a walk-in pantry", "custom"),
  closetBlackFramed: image("door-1.jpeg", "closet-black-framed", "Sliding closet doors in a black frame with frosted glass panels", "custom"),
  closetBlackGrid: image("closet-3.jpeg", "closet-black-grid", "Floor-to-ceiling sliding closet doors with a black grid frame and frosted glass", "custom"),
  closetFrostedBand: image("closet-1.jpeg", "closet-frosted-band", "Sliding closet doors with a slim aluminium frame and a frosted glass band", "custom"),
  closetWoodBlackGlass: image("closet-2.jpeg", "closet-wood-black-glass", "Sliding closet doors combining oak-look panels with bands of black glass in a dark frame", "custom"),
  closetWhiteFrosted: image("closet-4.jpeg", "closet-white-frosted", "Sliding closet doors with a white frame and four frosted glass panels per leaf", "custom"),
  storefrontDoubleDoor: image("door-2.jpeg", "storefront-double-door", "Dark-framed commercial storefront double doors with a full-height pull handle", "custom"),
} as const satisfies Record<string, ProjectImage>;

/**
 * Names held by the service documents in Sanity.
 *
 * `content/services.json` is pulled from Sanity at build time and still stores
 * the photo keys from the previous library. Those documents are not editable
 * from here, so the four names they use are kept pointing at the closest
 * equivalent in the current set. Removing them would blank every service photo.
 */
const legacyKeys = {
  showerBrassCalacatta: projectImages.showerPandaBrass,
  showerFrostedDoors: projectImages.showerSlidingBarn,
  showerRainGlass: projectImages.partitionBrickRoom,
  railingBrassStandoffs: projectImages.railingCurvedBrass,
} satisfies Record<string, ProjectImage>;

/** Lookup used by services.ts, including the legacy names above. */
export const imagesByKey: Record<string, ProjectImage> = { ...projectImages, ...legacyKeys };

/** Featured Projects (home). A curated mix across all three categories. */
export const featuredProjects: ProjectImage[] = [
  projectImages.showerPandaQuartzite,
  projectImages.railingCurvedBrass,
  projectImages.showerBlackHillside,
  projectImages.wineCellarDoors,
  projectImages.showerPandaBrass,
  projectImages.railingStoneLanding,
];

/**
 * The committed photo set, used whenever nothing has been uploaded in Sanity.
 * Ordered so the categories interleave rather than arriving in three blocks —
 * scrolling the gallery should feel like a portfolio, not a filing cabinet.
 */
const committedGallery: ProjectImage[] = [
  projectImages.showerPandaQuartzite,
  projectImages.railingCurvedBrass,
  projectImages.showerBlackHillside,
  projectImages.wineCellarDoors,
  projectImages.showerPandaBrass,
  projectImages.railingStoneLanding,
  projectImages.showerSteamBench,
  projectImages.closetBlackGrid,
  projectImages.showerBlackSteamRoom,
  projectImages.railingMezzanine,
  projectImages.showerCheckerPan,
  projectImages.doorsBrassPulls,
  projectImages.showerVeinedMarbleBench,
  projectImages.railingTwoStorey,
  projectImages.showerNeoAngleBronze,
  projectImages.mirroredClosetDoors,
  projectImages.showerMarbleWalkIn,
  projectImages.railingOakStair,
  projectImages.showerBrassBench,
  projectImages.partitionBrickRoom,
  projectImages.showerSteamMatteBlack,
  projectImages.railingBronzeStairwell,
  projectImages.showerTubScreenHerringbone,
  projectImages.closetBlackFramed,
  projectImages.showerBrassCheckerboard,
  projectImages.railingStairBlackCap,
  projectImages.showerNeoAngleBlackCurb,
  projectImages.partitionPowderRoom,
  projectImages.showerBrassTub,
  projectImages.railingStandoffStair,
  projectImages.showerWhiteMatteBlack,
  projectImages.closetWoodBlackGlass,
  projectImages.showerNeoAngleBlackVanity,
  projectImages.railingLandingShoe,
  projectImages.showerBrassFramedGrid,
  projectImages.pantryDoorWoodPull,
  projectImages.showerNeoAngleChrome,
  projectImages.railingEntryLanding,
  projectImages.showerMarbleChrome,
  projectImages.closetFrostedBand,
  projectImages.showerCalacattaDoor,
  projectImages.storefrontDoubleDoor,
  projectImages.showerCornerBronze,
  projectImages.closetWhiteFrosted,
  projectImages.showerCornerChromeSimple,
  projectImages.showerSlidingBarn,
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
