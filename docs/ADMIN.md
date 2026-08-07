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

### 2. Deploy to Cloudflare Pages

In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to
Git**, pick the `LaGlass` repository, then set:

- **Framework preset:** None
- **Build command:** `npm run build`
- **Build output directory:** `dist`

The repo includes `.node-version` (22), which Pages reads automatically. If a
build ever fails on the Node version, set a `NODE_VERSION` environment
variable to `22` in the Pages project settings.

Every push to `main` rebuilds and republishes the site — including the pushes
the editor makes when you save.

### 3. Let the editor sign in (Cloudflare route)

Cloudflare Pages has no built-in login service, so the editor signs in with
**GitHub**. GitHub's OAuth needs a small endpoint to complete the handshake,
and Sveltia publishes one designed to run as a Cloudflare Worker —
`sveltia-cms-auth`. Since the site is already on Cloudflare, this stays in one
account.

Outline (follow the `sveltia-cms-auth` README for exact steps):

1. **Register a GitHub OAuth app** — GitHub → Settings → Developer settings →
   OAuth Apps. The callback URL is the Worker's URL.
2. **Deploy the `sveltia-cms-auth` Worker** and give it the OAuth app's client
   ID and secret as secrets. Never put these in this repository.
3. **Point the editor at the Worker** by adding its URL to the backend block in
   `public/admin/config.yml`:

   ```yml
   backend:
     name: github
     repo: haykkhachikyan416-ai/LaGlass
     branch: main
     base_url: https://your-worker.workers.dev
   ```

Anyone who should be able to edit needs a GitHub account with write access to
the repository — add them under the repo's **Settings → Collaborators**.

> If a GitHub account is too much friction for whoever ends up editing the
> site, the alternative is a hosted CMS (for example Sanity) where they sign in
> with an email address. That is a larger change — ask before assuming it.

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
