# Design System

> **Status:** Proposed visual direction, derived from the supplied reference image
> (`docs/references/website-reference.png.jpg`), the LA Glass logo (`src/assets/Logo.webp`),
> and the real project photography in `src/assets/`. Values below are design intent for
> owner review — they become final only after approval. No application code has been
> changed for this proposal.

## Visual direction

Quiet architectural luxury. Deep warm charcoal and soft warm cream alternate as section
backgrounds, with a restrained brass accent sampled from the LA Glass logo. Photography
of real installed glass carries the page; the interface around it stays calm, precise,
and editorial. The mood is "expensive craftsmanship, calmly presented" — never flashy,
never cluttered, and clearly rooted in Los Angeles light and materials (marble, brass,
black steel, clear glass) that appear throughout the actual project photos.

The design language is inspired by the reference image's tone (charcoal/cream/gold,
serif-led headings, hairline rules) but is not a copy: layout, wording, imagery, logo,
and graphic devices are original to LA Glass.

## Color tokens (proposed)

| Token | Hex | Use |
|---|---|---|
| `ink` | `#171512` | Primary text on light; dark-section background base |
| `charcoal` | `#211E1A` | Dark section surface (cards on dark: `#2A2621`) |
| `cream` | `#F4F1EA` | Light section background (matches warm off-white brief) |
| `surface` | `#FFFFFF` | Cards and form fields on cream |
| `brass` | `#B08D57` | Accent: eyebrows, rules, icons, active states |
| `brass-strong` | `#8F7348` | Accent hover / pressed on light backgrounds |
| `brass-soft` | `#C9AC79` | Accent text/lines on dark backgrounds (higher contrast) |
| `text-secondary` | `#6A6257` | Secondary text on light |
| `text-secondary-dark` | `#A9A297` | Secondary text on dark |
| `border` | `#E4DED2` | Hairlines on light |
| `border-dark` | `rgba(201,172,121,0.25)` | Brass hairlines on dark |

Rules:

- One accent only (brass). No competing accent colors, no gradients as decoration.
- Brass is never used for long body text; it marks small labels, rules, icons, numbers.
- Contrast must meet WCAG AA for every text/background pair; verify tokens with a
  contrast checker during Phase 1 before locking them in.
- The steel-blue accent from the earlier draft is superseded by brass, which matches
  the supplied logo. Confirm with owner.

## Section rhythm

Alternate dark and light bands so the page reads as a sequence of calm panels:

1. Hero — dark (video with charcoal gradient overlay)
2. Trust/value strip — cream
3. Services — cream (white cards)
4. Featured projects — dark (photography glows against charcoal)
5. Why LA Glass — cream
6. Process — cream with brass-numbered steps
7. Service area — dark
8. FAQ — cream
9. Final CTA — dark
10. Footer — ink

## Typography (proposed)

- **Display / headings:** Fraunces (variable; use the sharp end of its `SOFT` axis so it
  reads architectural rather than quaint). High-contrast serif that echoes both the
  reference's serif-led headings and the serif "GLASS" letterforms in the logo, without
  being the default Playfair look.
- **Body / UI:** Hanken Grotesk. Neutral, highly readable grotesk with real weights.
- **Eyebrow labels:** Hanken Grotesk, 11–12px, uppercase, +0.18em letterspacing, brass.
- Load both via `next/font` (self-hosted, `display: swap`, subsetted). No third-party
  font CDNs.
- Alternates if owner dislikes the pairing: Cormorant Garamond or Marcellus for display;
  Instrument Sans or Figtree for body.

Approximate scale (desktop → mobile):

- Hero heading: 56–68px → 34–40px, weight 450–550, tight leading (1.05–1.1)
- Section heading: 36–46px → 28–32px
- Card heading: 20–24px
- Body: 16–18px, line-height 1.6–1.7
- Small/legal: 14px minimum
- Stat numbers (15+, 2500+): display face, 40–56px, static — never animated counters

Keep heading line lengths under ~14 words; avoid viewport-unit font sizes beyond gentle
`clamp()` ranges.

## Spacing and layout

- 4px base scale; common steps 8/12/16/24/32/48/64/96/128.
- Section vertical padding: 96–128px desktop, 64–80px mobile.
- Centered container: max-width 1200px (text blocks ~65ch); media sections may extend
  to 1400px or full-bleed.
- Grids: services 3-up → 2-up → 1-up; gallery 3/2/1 with consistent gutters (24–32px).
- Vertical rhythm consistent between all sections; no decorative filler.

## Signature device: the glass edge

One recurring, ownable motif — a 1px brass hairline with a short 45° mitred end (like
the polished edge of a cut pane), used:

- under section eyebrows,
- as dividers between stat items,
- as the hover underline for nav links.

On image cards, hover adds a faint diagonal specular sweep (a soft light reflection
crossing the glass) plus a 4px lift. The sweep is subtle (≤12% white, ~600ms ease-out),
appears only on hover/focus, and is disabled under `prefers-reduced-motion`. This is the
one aesthetic risk; everything else stays quiet.

## Buttons

- **Primary (on cream):** ink fill, cream text, 8px radius, 48px min height; hover =
  slight lift + brass-tinted shadow; arrow icon nudges 2–4px on hover/focus.
- **Primary (on dark):** brass fill, ink text; hover shifts to `brass-soft`.
- **Secondary:** transparent with 1px brass border; text inherits section color; hover
  fills brass at 8–12% opacity.
- All buttons: visible 2px focus ring (brass on light, cream on dark) offset 2px,
  pressed state scales to 0.98, disabled/loading states, labels in sentence case with
  clear verbs ("Request a free quote", "Call LA Glass", "View our work").
- No hover-only information; identical affordances for touch and keyboard.

## Cards

- 14px radius, hairline border (`border` on light, `border-dark` on dark), no heavy
  shadows — elevation comes from tonal contrast.
- Strong photo crop top (4:3 or 3:4 as source allows), title, one line of copy, quiet
  text link with arrow.
- No glassmorphism, no blur backdrops.

## Image treatment

- Real LA Glass photos only; most sources are portrait iPhone shots (1440×1800,
  1440×1920, 1170×2080) — design grids around portrait and square crops rather than
  forcing wide crops that amputate the glasswork.
- 14px radius inside cards; full-bleed allowed for the featured-projects band.
- Neutral treatment: no heavy filters; a very slight warm grade may be applied at
  export time to harmonize mixed lighting, never baked into originals.
- Alt text describes the visible installation plainly (e.g., "Frameless corner shower
  enclosure with matte-black hinges and marble tile").

## Borders, shadows, radii

- Hairlines: 1px, warm gray on light, translucent brass on dark.
- Shadows: one soft ambient shadow token for interactive lift only
  (`0 8px 24px rgba(23,21,18,0.10)`); dark sections rely on tone, not shadows.
- Radii tokens: `sm` 8px (buttons, inputs), `md` 14px (cards, media), `lg` 20px
  (stat band, large panels). Nothing fully pill-shaped.

## Navigation

- Slim header over the hero: transparent over video with a charcoal gradient scrim,
  transitioning to solid ink with a hairline bottom border after ~40px of scroll.
- Left: logo (needs an SVG or high-res export; current raster is 150×150).
- Center/right: Home, Services, Gallery, About, Contact; active page marked with a
  brass glass-edge underline.
- Right: phone number as text link + primary "Request a quote" button.
- Mobile: accessible drawer (focus trap, Escape and outside-click close, body scroll
  lock), prominent call and quote actions.

## Motion

Use Motion for React sparingly; every effect must have a reduced-motion alternative.

Good uses here:

- Hero headline/CTA entrance after media is ready (single orchestrated moment).
- Desktop scroll-scrubbed hero video (see below) — the site's one big gesture.
- Card hover lift + specular sweep; button arrow nudges.
- Header background transition on scroll.
- Gallery filter transitions (layout animations kept under 300ms).
- FAQ accordion height animation without clipping.
- Section reveals: small fade/8px rise, once, no long delays, never per-paragraph.

Avoid: parallax stacks, cursor followers, floating blobs, 3D tilts, scroll hijacking,
animating every block. `prefers-reduced-motion: reduce` swaps all of the above for
static states and swaps autoplaying/scrubbed video for the poster image.

## Hero video treatment

Two supplied assets, both H.264:

- `hero video for phone.mov` — 720×1102 portrait, ~2.9s, ~4.3MB (needs re-encode to
  MP4/WebM at a smaller bitrate before launch).
- `video for desktop hero.mp4` — 1916×1080 landscape, ~4.9s, ~1.1MB (needs a
  scrub-friendly re-encode with dense keyframes for smooth `currentTime` seeking).

Behavior:

- **Mobile (<768px) and small/portrait tablets (768–1023px):** portrait video as an
  autoplaying, muted, looping, `playsInline` background with `object-fit: cover`,
  poster fallback, and a charcoal gradient scrim for text contrast. If autoplay is
  blocked or the file fails, the poster shows instead. Reduced motion ⇒ poster only.
- **Desktop (≥1024px, fine pointer):** scroll-scrubbed landscape video inside a pinned
  hero (`position: sticky`), mapping section scroll progress to video time via
  requestAnimationFrame with smoothing. Headline and CTAs stay readable and clickable
  the whole way; normal page scroll is never blocked. Reduced motion ⇒ static poster
  hero. Playback failure ⇒ static poster hero.
- **Large tablets / coarse pointers ≥1024px:** desktop video as a plain autoplaying
  muted loop (no scrubbing), same overlay and fallbacks.
- Only one video variant may download per device class; posters are required for both;
  fixed aspect-ratio containers prevent layout shift; no controls, no audio.

## Accessibility

- WCAG-AA contrast for all text, including text over video (enforced by scrim).
- Visible focus states everywhere; logical heading order; semantic landmarks.
- Keyboard-operable menu, gallery, lightbox, accordion, and form.
- Tap targets ≥44px. Alt text written for humans, not keywords.
- Motion, autoplay, and scrubbing all honor `prefers-reduced-motion`.
