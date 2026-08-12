import { useEffect, useRef } from "react";
import { mobileHero } from "@/lib/assets";

const DESKTOP_VIDEO = "/assets/video/hero-desktop.mp4";
const DESKTOP_POSTER = "/assets/video/hero-poster-desktop.jpg";
const DESKTOP_QUERY = "(min-width: 1024px)";

/**
 * Starts the hero video, on desktop only.
 *
 * This runs as an inline script placed immediately after the <video> in the
 * prerendered HTML, so it executes while the page is still parsing — before the
 * browser has committed to downloading anything. Phones never get a `src`
 * assigned, so they never fetch the clip at all: the mobile hero is the
 * owner-supplied collage above, which is a still image.
 */
const PICK_SCRIPT = `
(function(){
  var v = document.getElementById('hero-video');
  if (!v || v.src) return;
  if (!window.matchMedia('${DESKTOP_QUERY}').matches) return;
  v.src = '${DESKTOP_VIDEO}';
  v.muted = true; v.defaultMuted = true;
  var p = v.play();
  if (p && p.catch) p.catch(function(){});
})();
`;

export function HeroShell({ children }: { children: React.ReactNode }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Covers client-side navigation into the home route, where the inline script
  // above does not re-run.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || v.src) return;
    if (!window.matchMedia(DESKTOP_QUERY).matches) return;
    v.src = DESKTOP_VIDEO;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  return (
    <section
      aria-label="Introduction"
      className="relative overflow-hidden bg-ink text-cream lg:flex lg:min-h-svh lg:items-end"
    >
      {/*
        Mobile: the three-panel collage the owner assembled, at its own aspect
        ratio (1170x1290). Cropping it to a full-height phone viewport would
        cut away two of the three panels, so it sits at the top of the hero and
        the copy runs beneath it on charcoal.

        This is the mobile LCP, so it is eager and high priority — the one image
        on the page that should not wait.
      */}
      {/*
        The header is fixed, so without this padding it covers the top of the
        collage and you have to scroll up to see the whole thing. Matching the
        header's own height (h-16, h-18 from sm) drops the image clear of it.
        Desktop is unaffected: there the video is meant to run under the header.
      */}
      <div className="relative pt-16 sm:pt-18 lg:hidden lg:pt-0">
        {/*
          The <source> is what stops desktop from downloading the collage:
          hiding the wrapper with CSS does not prevent a fetch, but an
          unmatched media query does. Above 1024px the browser resolves to the
          desktop poster, which the <video> below needs anyway — same URL, so
          it costs nothing extra and this element stays display:none.

          Doing it this way rather than assigning the src from script keeps the
          hero working with JavaScript switched off.
        */}
        <picture>
          <source media="(min-width: 1024px)" srcSet={DESKTOP_POSTER} />
          <img
            src={mobileHero.src}
            srcSet={mobileHero.srcSet}
            sizes="100vw"
            width={mobileHero.width}
            height={mobileHero.height}
            alt={mobileHero.alt}
            decoding="async"
            fetchPriority="high"
            className="w-full"
          />
        </picture>
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent"
        />
      </div>

      <video
        id="hero-video"
        ref={videoRef}
        poster={DESKTOP_POSTER}
        className="pointer-events-none absolute inset-0 hidden size-full object-cover object-center lg:block"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      />
      <script dangerouslySetInnerHTML={{ __html: PICK_SCRIPT }} />

      {/* Contrast scrim between the desktop video and the text over it. */}
      <div
        aria-hidden
        className="absolute inset-0 hidden bg-gradient-to-t from-ink/90 via-ink/45 to-ink/30 lg:block"
      />

      <div className="relative z-10 w-full pb-16 pt-10 sm:pb-20 lg:pb-24 lg:pt-28">
        {children}
      </div>
    </section>
  );
}
