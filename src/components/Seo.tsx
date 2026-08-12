import { Head } from "vite-react-ssg";
const SITE_NAME = "LA Glass";
const SITE_URL = import.meta.env.VITE_SITE_URL ?? "";

/**
 * Link-preview image. The desktop hero poster is used rather than a gallery
 * photo because it is already landscape — Facebook, iMessage and X crop shares
 * to roughly 1.91:1, which amputates the portrait phone photos the rest of the
 * site is built from.
 */
const SHARE_IMAGE = "/assets/video/hero-poster-desktop.jpg";

/**
 * Per-route document metadata.
 *
 * Because the build prerenders each route, these tags are baked into the
 * generated HTML rather than only applied after hydration — so crawlers and
 * link previews see the right title and description for every page.
 */
export function Seo({
  title,
  description,
  path = "",
  noindex = false,
}: {
  title: string;
  description: string;
  path?: string;
  noindex?: boolean;
}) {
  const fullTitle =
    title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const url = SITE_URL ? `${SITE_URL}${path}` : undefined;
  const image = SITE_URL ? `${SITE_URL}${SHARE_IMAGE}` : SHARE_IMAGE;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {url ? <link rel="canonical" href={url} /> : null}
      {noindex ? <meta name="robots" content="noindex" /> : null}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {url ? <meta property="og:url" content={url} /> : null}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
}
