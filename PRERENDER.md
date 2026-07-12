# Prerendering (SSG) — setup & how to deploy it

## Why this exists

The site is a client-rendered React SPA. Every URL returns the same empty shell in its raw HTML; the real per-page title, meta, JSON-LD, and content are added by JavaScript after load. Google runs that JS (slowly, for a young domain), but **AI crawlers (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot) and social preview bots do not** — so they can't see any individual page's content.

Prerendering fixes this: it runs the built app in a real headless browser once per URL and saves the fully-rendered HTML to disk. Now every URL serves real static content to every crawler, and the browser hydrates over it for real users (no flash).

## What changed in the repo

- `scripts/prerender.mjs` — the prerenderer (serves `dist/`, visits every URL in `sitemap.xml`, writes static HTML).
- `src/main.jsx` — now hydrates when prerendered HTML is present, otherwise mounts normally (**unchanged behavior when not prerendered**).
- `package.json` — two new scripts: `prerender` and `build:static`. **`build` is untouched**, so your current Vercel deploy keeps working exactly as before.

Nothing here affects your live site until you choose to deploy the prerendered output.

## One-time local setup

Chromium is intentionally NOT a project dependency (so it can never slow or break Vercel's normal build). Install it locally, once:

```
npm install -D puppeteer
```

## Test it locally

```
npm run build:static
npm run preview
```

Then open a deep URL like `http://localhost:4173/seo-for-crypto`, right-click → **View Page Source**. You should now see the real `<title>`, meta description, and the page's headings/content in the raw HTML — not the generic homepage shell. Check a couple more (`/seo-for-restaurants-in-miami`, `/blog/apple-maps-seo-apple-business-connect-2026`).

If something looks off, tell me the URL and what you saw and I'll fix the script.

## Deploying the prerendered output

Once it looks right locally, pick one:

**Option A — let Vercel prerender (simplest to manage, needs a browser in the build).**
In Vercel → Project → Settings → Build & Output, set the **Build Command** to `npm run build:static`. Vercel's build container needs Chromium; if the default `puppeteer` install doesn't work there, switch the script to `puppeteer-core` + `@sparticuz/chromium` (I can do this for you). Test with a preview deploy before promoting to production.

**Option B — build locally, deploy the output (most reliable).**
Run `npm run build:static` on your machine, then deploy the `dist/` folder (e.g. `vercel deploy --prebuilt` after `vercel build`, or Netlify's manual deploy). This keeps the browser off Vercel entirely.

My recommendation: verify locally first (above), then try **Option A** with a preview deploy. If Vercel's build chokes on Chromium, I'll switch it to the `@sparticuz/chromium` setup, which is built for serverless build environments.

## Re-running

Any time content changes (new blog post, new city, etc.), the prerender re-runs automatically as part of `build:static`, so the static HTML stays in sync with the site.
