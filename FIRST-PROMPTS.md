# Claude Code Prompts

Use these prompts in order. Do not send all of them at once.

## Prompt 1 — Inspect and plan only

Read `CLAUDE.md` and every referenced file before doing anything.

Inspect the current project, package configuration, source structure, and Git status. Then give me:

1. Your understanding of LA Glass and the website goal
2. Missing business information and assets
3. Proposed routes and section order
4. Proposed component architecture
5. Proposed design direction
6. Hero video implementation plan, including fallback behavior
7. Quote-form architecture and what must be configured later
8. A phase-by-phase implementation plan
9. Any conflicts or risks you noticed

Do not edit files, install packages, or run destructive commands yet. Do not invent reviews, business facts, license details, statistics, or contact information.

## Prompt 2 — Build the foundation

Proceed with Phase 1 from `docs/BUILD-PLAN.md`.

Build only:

- Project foundation
- Required dependencies
- Global styles and design tokens
- Root layout and metadata foundation
- Reusable container, section heading, and button components
- Responsive header
- Accessible mobile navigation
- Footer
- Empty or minimal route placeholders

Use placeholders for missing contact details. Do not build the full homepage yet. Do not add fake reviews or statistics.

When finished:

1. Run lint
2. Run type checking
3. Run the production build
4. Review the changes
5. Summarize files changed and remaining work

## Prompt 3 — Build the homepage

Proceed with Phase 2 from `docs/BUILD-PLAN.md`.

Build the homepage using the approved structure and draft content. The final hero video has not been supplied yet, so create a polished poster/image fallback and a video component that will accept the real MP4/WebM assets later.

Include:

- Hero
- Services
- Featured project structure
- Why choose LA Glass
- Process
- Los Angeles service-area section
- Approved FAQ
- Final CTA

Keep reviews and statistics hidden until real information is provided. Use refined button hover/focus states and restrained motion. Check mobile layout carefully.

Run all project checks when finished.

## Prompt 4 — Build internal pages

Proceed with Phase 3 from `docs/BUILD-PLAN.md`.

Build the approved service, gallery, about, contact, privacy-placeholder, and not-found pages. Reuse components and content patterns. Do not fill thin pages with invented claims. Keep the visual system consistent.

Run all project checks when finished.

## Prompt 5 — Add my real assets

I have now added real LA Glass assets under `public/assets`.

Inspect every supplied file and update `docs/ASSETS.md` with an accurate inventory before using them. Then replace placeholders with the best matching real assets. Keep aspect ratios correct, optimize loading, write natural alt text, and do not repeatedly reuse the same image without a reason.

Do not rename or delete originals without explaining why.

Run all project checks when finished.

## Prompt 6 — Add the final hero video

The final hero video and poster assets are now available under `public/assets/video`.

Inspect them and implement the production hero media:

- MP4/WebM source handling where available
- Mobile-friendly behavior
- Poster fallback
- Muted autoplay
- Loop
- Plays inline
- Text-safe overlay
- Stable dimensions
- Reduced-motion fallback
- Graceful error fallback
- No audio dependency

Keep the headline and buttons readable. Check desktop and mobile crops. Do not make unrelated changes.

Run all project checks when finished.

## Prompt 7 — Build the quote form

Proceed with Phase 5 from `docs/BUILD-PLAN.md`.

Build the quote form using React Hook Form, Zod, and server-side validation. Use server-only environment variables for the destination and email provider. Add accessible labels, clear error messages, loading/success/error states, a honeypot, and duplicate-submit protection.

Do not expose secrets. Do not claim the form works until we configure `.env.local` and successfully receive a real test message. Do not add photo upload yet unless I explicitly confirm the storage or attachment method.

Run all project checks when finished and tell me exactly what environment values remain required.

## Prompt 8 — Add final business information

Update the website using the final verified information I provide next: phone, public email, quote email, social links, business hours, license wording, exact experience claim, completed-project claim, domain, service locations, and authentic reviews.

Update `docs/BUSINESS-INFO.md` first, then update the website from that source of truth. Do not publish anything I have not explicitly supplied. Check every page for inconsistent old placeholders.

## Prompt 9 — Final review

Perform a full pre-launch review.

Check:

- Accuracy of every business claim
- No fake reviews or placeholder content
- Navigation and links
- Quote form validation and delivery configuration
- Mobile, tablet, desktop, and wide-screen layouts
- Keyboard navigation
- Focus states
- Color contrast
- Reduced motion
- Image and video loading
- Missing media fallbacks
- Metadata
- Sitemap and robots
- Structured data
- Browser console errors
- TypeScript and lint errors
- Production build

Run `/code-review` and `/verify` if available. Fix issues caused by the implementation, then provide a concise launch checklist. Do not deploy without my permission.
