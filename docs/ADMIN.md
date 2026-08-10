# Editing the site (admin guide)

The site owner can change almost every word on the website from a phone, by
signing in with an **email address** — no GitHub account, no code.

## How it works

```
Owner edits in the studio  →  presses Publish
        ↓
Sanity stores the content
        ↓  (webhook)
Cloudflare rebuilds the site  →  live in about a minute
```

Content is pulled from Sanity **at build time** into `/content/*.json`, which
is what the website actually reads. That keeps the site fully static and fast —
visitors never wait on an API — and it means a Sanity outage can never take the
website down. If Sanity cannot be reached, the last committed content is used.

## What can be edited

| Section | What it controls |
|---|---|
| **Business details** | Phone, email, hours, Instagram/TikTok, service-area line, "15+ years", "2,500+ projects" |
| **Homepage** | Hero, every section heading and paragraph, why-us points, the 4 process steps, what-to-expect points, final call-to-action |
| **About page** | Intro paragraphs, standards list, who you work with |
| **Other page headings** | Titles and intros for Services, Gallery, Contact, Privacy, 404 |
| **Services** | Names, summaries, descriptions, detail-page copy, and which approved photo each uses |
| **FAQ** | Every question and answer — add, remove, reorder |

Deliberately **not** editable: the approved photo list (only vetted photos can
be chosen), and there are no fields for license wording or customer reviews —
those stay out until real, verifiable details exist.

---

# Setup — once

## 1. Project — already done

- **Project:** La Glass
- **Project ID:** `6i8hnrv7`
- **Dataset:** `production`

This id is already set as the default in `studio/sanity.config.ts` and in the
build scripts, so no environment variables are required anywhere. (A project id
is not a secret — it is visible in any Sanity-powered front end.)

> Ignore Sanity's "create a new Studio with the CLI" onboarding step. The studio
> already exists in `studio/`, with schemas matching this site's content.
> Running that command would create a second, empty studio.

## 2. Load the current website content into it

Create an **Editor** token: Sanity → **API → Tokens → Add API token**. Then from
the project root:

```bash
SANITY_WRITE_TOKEN=your_token npm run content:seed
```

This copies everything currently on the site into Sanity, so the editor opens
with real content rather than blank fields. Safe to re-run.

## 3. Deploy the studio

```bash
cd studio
npm install
npx sanity login     # once, opens a browser
npm run deploy
```

Choose a hostname when prompted — you get
**`https://yourname.sanity.studio`**. That is the address the owner uses.

Then open `public/admin/index.html`, find the line marked `STUDIO_URL`, and set
it to that address so `yoursite.com/admin` forwards there.

## 4. Rebuild automatically when content is published

1. In Cloudflare, create a **Deploy Hook** for the Worker and copy its URL.
2. In Sanity → **API → Webhooks → Create webhook**:
   - **URL:** the deploy hook URL
   - **Dataset:** `production`
   - **Trigger on:** Create, Update, Delete
   - **HTTP method:** POST

Now pressing **Publish** rebuilds and republishes the site on its own.

## 5. Invite the owner

Sanity → **Project → Members → Invite**. They receive an email, set a password,
and sign in at the studio address on their phone. Give them **Editor** access —
that lets them change content but not delete the project.

---

## Day-to-day use

1. Open the studio address on a phone
2. Sign in with email
3. Edit, press **Publish**
4. The site updates within a minute or two

## Adding new photos

Photos are intentionally still a developer step, because each one needs
checking (no installer reflections, no images of uncertain origin) and honest
alt text:

1. Put the image in `src/assets/`
2. Add it to the approved list in `src/lib/assets.ts` **and** to `APPROVED` in
   `scripts/build-images.mjs`
3. Run `npm run images`
4. Add its key to the `image` options list in
   `studio/schemas/index.ts` so it can be selected

## Troubleshooting

**Published, but the site looks unchanged.** The rebuild takes a minute or two.
If nothing happens at all, check the webhook in Sanity → API → Webhooks fired,
and that the Cloudflare deploy hook URL is correct.

**A section went blank.** It should not — the build refuses to overwrite a
content file with an empty document and keeps the previous version, logging a
warning in the build output.
