import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const CLIP = "/assets/video/hero-mobile.mp4";
const POSTER = "/assets/video/hero-poster-mobile.jpg";

/**
 * A short loop of finished shower glass, shown beside the copy.
 *
 * This is the portrait clip that used to be the phone hero. It is 389 KB and
 * sits well below the fold, so it must not be part of the initial page load:
 * `preload="none"` keeps the bytes unrequested until an IntersectionObserver
 * sees the section approaching, and playback pauses again once it leaves. If
 * the observer or the file is unavailable, the poster frame stands in and the
 * section still reads correctly.
 */
export function WorkInMotion() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) video.src = CLIP;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section aria-labelledby="motion-heading" className="bg-ink py-20 text-cream sm:py-28">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)] lg:gap-16">
          <Reveal>
            <SectionHeading
              tone="dark"
              eyebrow="A closer look"
              title="Glass that disappears into the room"
              copy="A few seconds of finished work: clear panels, aligned hardware, and clean silicone lines. Every enclosure is measured on site and cut for that bathroom alone."
            />
            <h2 id="motion-heading" className="sr-only">
              A closer look at finished shower glass
            </h2>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/gallery" variant="primary-dark" icon="arrow">
                View the full gallery
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120}>
            {/*
              The clip is 720x1102 but its picture only occupies rows 66-1027 —
              the black bars are baked into the file. Rather than re-encode the
              owner's footage, the frame is set to the aspect ratio of the
              picture (720x950, the largest centred window that clears both
              bars) and object-cover crops the rest away. The poster is a frame
              of the same clip, so it crops identically.
            */}
            <div className="relative mx-auto aspect-[720/950] w-full max-w-sm overflow-hidden rounded-card border border-line-dark bg-charcoal">
              <video
                ref={ref}
                poster={POSTER}
                width={720}
                height={950}
                className="absolute inset-0 size-full object-cover"
                muted
                loop
                playsInline
                preload="none"
                aria-label="Short loop of completed LA Glass shower enclosures"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
