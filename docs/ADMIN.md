# Editing the site (admin guide)

You can change almost every word on the website — from a phone — without
touching code.

## What you can edit

| Section in the editor | What it controls |
|---|---|
| **Business details** | Phone, email, hours, Instagram/TikTok links, service-area line, "15+ years", "2,500+ projects", insured / free-estimates toggles |
| **Homepage** | Hero headline and buttons, every section heading and paragraph, the "Why LA Glass" points, the 4 process steps, the "What to expect" points, final call-to-action |
| **About page** | Intro paragraphs, the standards list, who you work with |
| **Other page headings** | Titles and intros for Services, Gallery, Contact, Privacy, and the 404 page |
| **Services** | Service names, summaries, long descriptions, detail-page copy, and which approved photo each uses |
| **FAQ** | Every question and answer — add, remove, or reorder |

Everything lives in the `/content` folder as plain JSON. The editor just gives
those files a friendly interface.

## What you cannot edit there (on purpose)

- **Which photos are approved.** The editor only lets you pick from photos that
  have been checked (no photographer reflections, no AI-generated images). New
  photos need to be added to the approved list in code first.
- **Business claims that aren't verified.** There is deliberately no field for
  license wording or customer reviews — those stay out until you supply real,
  verifiable details.

---

## Setup — two steps, once

The editor saves changes by committing them to GitHub, and your host rebuilds
the site automatically. So it needs both of those connected.

### 1. Put the project on GitHub

Create a repository and push this project to it. Then open
`public/admin/config.yml` and replace:

```yml
repo: OWNER/REPO
```

with your actual repository, for example `haykk/laglass`.

### 2. Deploy to a host that rebuilds on push

Netlify, Vercel, and Cloudflare Pages all work and have free tiers. Settings:

- **Build command:** `npm run build`
- **Publish directory:** `dist`

You also need to let the editor sign in to GitHub. The simplest route is
Netlify — enable **Identity** and **Git Gateway**, then change the backend in
`config.yml` to:

```yml
backend:
  name: git-gateway
  branch: main
```

On other hosts you register a GitHub OAuth app and point the editor at it —
the Sveltia CMS docs cover this.

### Then

Visit **yoursite.com/admin/** on your phone, sign in, edit, and press save.
The site rebuilds and goes live on its own, usually within a minute or two.

---

## Trying it locally first (no GitHub needed)

You can see the editor working right now against the files on this computer:

```bash
npm run admin      # terminal 1 — the local file bridge
npm run dev        # terminal 2 — the site
```

Then open **http://localhost:3000/admin/**. Changes save straight to the JSON
files in `/content`, and the site updates as you type. This is a good way to
learn the interface before connecting GitHub.

---

## Adding new photos

1. Put the image in `src/assets/`.
2. Add it to the approved list in `src/lib/assets.ts` **and** to the
   `APPROVED` set in `scripts/build-images.mjs`, with honest alt text.
3. Run `npm run images` to generate the resized versions.

Step 2 is the deliberate checkpoint — it is where someone confirms the photo is
a real LA Glass project and describes it accurately.

## After any content change

Nothing to do — the host rebuilds. If you're working locally, run:

```bash
npm run build && npm run preview
```
