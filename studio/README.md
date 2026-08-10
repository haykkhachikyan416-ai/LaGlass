# LA Glass — content studio

The editor the site owner uses. Deployed separately from the website so its
bundle never affects site performance.

```bash
cd studio
npm install
npm run dev      # http://localhost:3333
npm run deploy   # publishes to https://<name>.sanity.studio
```

Requires `SANITY_STUDIO_PROJECT_ID` (see ../docs/ADMIN.md).
