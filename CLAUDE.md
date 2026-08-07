# LA Glass Website — Project Instructions

Build and maintain a premium, conversion-focused website for **LA Glass**, a custom glass installation company serving the Los Angeles area.

Before planning or editing, read these project documents:

- @docs/PROJECT-BRIEF.md
- @docs/BUSINESS-INFO.md
- @docs/SITE-MAP.md
- @docs/DESIGN-SYSTEM.md
- @docs/CONTENT.md
- @docs/ASSETS.md
- @docs/FUNCTIONALITY.md
- @docs/SEO.md
- @docs/BUILD-PLAN.md

## Core stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Motion for React, used selectively
- Lucide icons
- React Hook Form and Zod for forms
- Server-side email delivery configured through environment variables
- Vercel-compatible deployment

Use the current stable, mutually compatible package versions. Do not replace the stack without explaining the reason first.

## Non-negotiable rules

- Use only verified business information from `docs/BUSINESS-INFO.md`.
- Never invent reviews, customer names, awards, certifications, prices, warranties, statistics, project locations, or license details.
- Treat every item marked `[CONFIRM]`, `[ADD]`, or `[PLACEHOLDER]` as unpublished information.
- Do not display unconfirmed claims on the public website.
- Do not claim the quote form works until email delivery has been configured and tested.
- Never expose API keys or secrets in client-side code.
- Keep secrets in `.env.local`; maintain `.env.example` with placeholder values only.
- Do not deploy, purchase services, connect a domain, or send live messages without explicit permission.
- Do not delete or rename supplied assets without explaining the change.
- Do not use stock photography when a suitable real LA Glass project image exists.
- Do not create an oversized, generic AI-style website.
- Do not use fake counters or animated statistics.
- Do not create fake review cards.

## Design standards

- Premium architectural appearance
- Strong whitespace and clean visual hierarchy
- Restrained typography; avoid gigantic headings
- Excellent button hover and focus states
- Smooth, purposeful motion
- Mobile-first responsive design
- Readable text over the hero video
- No scroll hijacking
- No excessive glassmorphism, gradients, floating blobs, or decorative clutter
- Respect `prefers-reduced-motion`

## Code standards

- Build reusable, focused components.
- Use semantic HTML.
- Prefer Server Components; use Client Components only where interaction requires them.
- Use strict TypeScript; avoid `any`.
- Keep content separate from presentation when practical.
- Validate forms on both client and server.
- Provide accessible labels, keyboard navigation, visible focus states, and useful error messages.
- Optimize images and video.
- Prevent horizontal overflow and layout shift.
- Remove unused code and dependencies.
- Do not rewrite unrelated working code.

## Workflow

For every major task:

1. Read the relevant project documents.
2. Inspect the current codebase and Git status.
3. State the intended changes briefly.
4. Implement in small, logical steps.
5. Run the relevant checks.
6. Review the result at mobile, tablet, desktop, and wide-desktop sizes.
7. Summarize files changed, checks run, and remaining setup.

Before calling work complete, run the available equivalents of:

- `npm run lint`
- `npm run typecheck`
- `npm run build`

Also inspect the browser for layout problems and console errors. Never say a check passed unless it was actually run.

## Available Skills

Before beginning each major development phase:

1. Inspect the project, user, plugin, and bundled skills currently available in Claude Code.
2. Select only the skills directly relevant to the assignment.
3. Briefly state which skills will be used and why.
4. Invoke and follow those skills during the work.
5. Do not install, modify, or delete skills without my permission.
6. After major implementation work, use the available code-review and verification skills when appropriate.
7. Project requirements in `CLAUDE.md` and the `docs` folder remain the source of truth if a skill gives conflicting instructions.
## Available Skills

Before beginning each major development phase:

1. Inspect the project, user, plugin, and bundled skills currently available in Claude Code.
2. Select only the skills directly relevant to the assignment.
3. Briefly state which skills will be used and why.
4. Invoke and follow those skills during the work.
5. Do not install, modify, or delete skills without my permission.
6. After major implementation work, use the available code-review and verification skills when appropriate.
7. Project requirements in `CLAUDE.md` and the `docs` folder remain the source of truth if a skill gives conflicting instructions.
