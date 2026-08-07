# LA Glass

Marketing website for **LA Glass**, a custom glass installation company serving
the Los Angeles area — frameless shower enclosures, shower doors, glass
railings, and custom glass installation.

## Stack

- **Vite** + **React 19** + **TypeScript**
- **vite-react-ssg** — every route is prerendered to static HTML, so the site is
  crawlable and works without JavaScript
- **Tailwind CSS 4**
- **Sveltia CMS** — phone-friendly editor at `/admin`
- Output is a plain `dist/` folder that can be hosted anywhere

## Commands

```bash
npm install
npm run dev        # dev server
npm run build      # generate images + prerender to dist/
npm run preview    # serve the production build on :3000
npm run lint
npm run typecheck
npm run images     # regenerate responsive image variants only
npm run admin      # local CMS bridge (see docs/ADMIN.md)
```

## Editing content

All site copy lives in **`/content/*.json`** and is editable through the admin
at `/admin` — no code required. See **[docs/ADMIN.md](docs/ADMIN.md)**.

| File | Controls |
|---|---|
| `site.json` | Phone, email, hours, socials, headline numbers |
| `home.json` | Every homepage section |
| `about.json` | About page |
| `services.json` | Services and their detail pages |
| `faq.json` | FAQ questions and answers |
| `pages.json` | Page titles and intros |

## Project rules

This site publishes **only verified business information**. See
[`CLAUDE.md`](CLAUDE.md) and [`docs/BUSINESS-INFO.md`](docs/BUSINESS-INFO.md).

In particular:

- No invented reviews, customer names, awards, certifications, prices, or
  warranties.
- **No license claim** appears anywhere until verified license details are
  supplied.
- Project photography is limited to an approved list in
  [`src/lib/assets.ts`](src/lib/assets.ts). Photos showing installers'
  reflections, or images of uncertain origin, are excluded by name.

## Images

Source photos live in `src/assets/`. `scripts/build-images.mjs` generates
responsive WebP variants into `public/img/` and a manifest the app turns into
`srcset`. Adding a photo means adding it to both the approved list in
`src/lib/assets.ts` and the `APPROVED` set in the script.

## Quote form

The contact form posts to [FormSubmit](https://formsubmit.co), which forwards
submissions to the address in `content/site.json`. No API key is required.
Set `VITE_FORMSUBMIT_TOKEN` to FormSubmit's random endpoint code to keep the
destination address out of the built bundle. See `.env.example`.

## Deployment

Any static host. Build command `npm run build`, publish directory `dist`.
