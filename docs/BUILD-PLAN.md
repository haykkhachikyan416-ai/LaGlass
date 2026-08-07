# Build Plan

Claude should follow these phases and avoid building everything in one uncontrolled pass.

## Phase 0 — Confirm environment

- Confirm the project opens correctly.
- Inspect `package.json`.
- Inspect all project instruction files.
- Confirm Git status.
- Identify missing business information and assets.
- Do not block initial development because placeholders are missing.

## Phase 1 — Foundation

- Confirm Next.js App Router, TypeScript, Tailwind, and ESLint setup.
- Add Motion for React and Lucide icons.
- Create global layout and metadata foundation.
- Create design tokens and global styles.
- Create reusable container, button, heading, and link components.
- Create responsive header and footer.
- Create placeholder routes.
- Run lint, type check, and build.

## Phase 2 — Home page structure

- Add hero with poster/image fallback.
- Add services overview.
- Add featured gallery structure.
- Add why-us section.
- Add process.
- Add service-area section.
- Add approved FAQ.
- Add final CTA.
- Use draft content from `CONTENT.md`.
- Keep unconfirmed stats and reviews hidden.
- Run checks and inspect responsive layout.

## Phase 3 — Internal pages

- Services overview
- Confirmed service-detail pages
- Gallery
- About
- Contact
- Privacy placeholder requiring owner review
- Not-found page

Run checks after the group is complete.

## Phase 4 — Real assets

- Review logo and project photos.
- Create an asset inventory.
- Replace placeholders intentionally.
- Add accurate alt text.
- Optimize image dimensions and formats.
- Add hero poster.
- Add hero video when supplied.
- Test mobile crop and loading behavior.

## Phase 5 — Quote form

- Install form dependencies if not already installed.
- Build accessible form UI.
- Add shared Zod schema.
- Add server route or action.
- Add server-only email adapter.
- Add environment variable configuration.
- Add honeypot and duplicate-submit protection.
- Test validation and failure states.
- Do not mark as working until an actual email arrives.

## Phase 6 — Content and trust

- Add exact phone/email/social links.
- Add verified license wording.
- Add confirmed years and project statistics.
- Add authentic reviews.
- Add real business hours and service locations.
- Review every claim.

## Phase 7 — SEO and quality

- Final metadata
- Sitemap and robots
- Structured data using verified information
- Social sharing image
- Accessibility review
- Keyboard review
- Reduced-motion review
- Mobile/tablet/desktop review
- Performance review
- Browser console review
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `/code-review`
- `/verify` when available

## Phase 8 — Deployment preparation

- Verify `.env.example`
- Verify secrets are excluded
- Create deployment checklist
- Confirm domain
- Configure production environment variables
- Test quote delivery in production
- Do not deploy without explicit approval
