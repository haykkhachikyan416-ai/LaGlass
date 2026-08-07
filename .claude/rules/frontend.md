---
paths:
  - "src/**/*.{ts,tsx,css}"
---

# Frontend Rules

- Use semantic HTML before adding ARIA.
- Use Server Components by default.
- Add `"use client"` only to the smallest component boundary that needs browser state, effects, or event handlers.
- Keep page components focused on composition.
- Put reusable UI in `src/components`.
- Put shared business/site data in a central typed data module.
- Use `next/image` for project images where appropriate.
- Use framework metadata APIs.
- Use Motion for React selectively, not for basic styling.
- Respect reduced-motion preferences.
- Keep hover effects paired with visible focus states.
- Prevent layout shifts by reserving media dimensions.
- Do not create huge headings that dominate mobile screens.
- Do not use placeholder Latin text in completed sections.
