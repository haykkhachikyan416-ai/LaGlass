import { useEffect, useRef } from "react";

const MOBILE_VIDEO = "/assets/video/hero-mobile.mp4";
const DESKTOP_VIDEO = "/assets/video/hero-desktop.mp4";
const MOBILE_POSTER = "/assets/video/hero-poster-mobile.jpg";
const DESKTOP_POSTER = "/assets/video/hero-poster-desktop.jpg";

/**
 * Picks the clip for the viewport and starts playback.
 *
 * This runs as an inline script placed immediately after the <video> in the
 * prerendered HTML, so it executes while the page is still parsing — before the
 * browser has committed to downloading anything. That keeps the old guarantee
 * that a device only ever fetches the clip it actually shows. (Under Next.js a
 * server route did this from the User-Agent; a static build has no server, so
 * the decision moves here.)
 */
const PICK_SCRIPT = `
(function(){
  var v = document.getElementById('hero-video');
  if (!v || v.src) return;
  var phone = window.matchMedia('(max-width: 1023px)').matches;
  v.poster = phone ? '${MOBILE_POSTER}' : '${DESKTOP_POSTER}';
  v.src = phone ? '${MOBILE_VIDEO}' : '${DESKTOP_VIDEO}';
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
    const phone = window.matchMedia("(max-width: 1023px)").matches;
    v.poster = phone ? MOBILE_POSTER : DESKTOP_POSTER;
    v.src = phone ? MOBILE_VIDEO : DESKTOP_VIDEO;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  return (
    <section
      aria-label="Introduction"
      className="relative flex min-h-svh items-end overflow-hidden bg-ink text-cream"
    >
      <video
        id="hero-video"
        ref={videoRef}
        poster={DESKTOP_POSTER}
        className="pointer-events-none absolute inset-0 size-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      />
      <script dangerouslySetInnerHTML={{ __html: PICK_SCRIPT }} />

      {/* Contrast scrim between media and text. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/45 to-ink/30"
      />

      <div className="relative z-10 w-full pb-16 pt-28 sm:pb-20 lg:pb-24">
        {children}
      </div>
    </section>
  );
}
