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

## Verifying locally — important

Do NOT use `npm run preview` to check the prerender. `vite preview` has an SPA
fallback that serves the root `index.html` for every route, so View Source will
wrongly show the homepage for `/seo-for-crypto`. That's a preview-tool quirk, not
a prerender problem — Vercel serves the nested files correctly.

To actually verify, open the built file directly, e.g.:

```
grep -o '<title>[^<]*</title>' dist/seo-for-crypto/index.html
```

You should see that page's own title. Each `dist/<route>/index.html` holds the
correct per-page title, canonical, meta, JSON-LD, and body content.

## Deploying on Vercel (auto-prerender)

The prerender script already detects Vercel and uses a serverless-friendly
Chromium (`@sparticuz/chromium` + `puppeteer-core`). And if the browser can't
launch for any reason, it **skips prerendering and still deploys the normal SPA
build** — so this can never break your deploy.

Steps:

1. Add the serverless browser packages (so Vercel's build can prerender). Run
   locally so npm resolves compatible versions and updates package.json + lockfile:
   ```
   npm install -D @sparticuz/chromium puppeteer-core
   ```
2. Commit and push (`package.json`, `package-lock.json`).
3. In Vercel → Project → Settings → Build & Output, set **Build Command** to:
   ```
   npm run build:static
   ```
4. Trigger a **preview deployment** first (push to a branch, or redeploy) and
   check a deep URL's View Source on the *.vercel.app preview — the per-page
   `<title>` should be correct. Then promote to production.

If Vercel's build ever can't run Chromium, the log will say
`[prerender] browser unavailable — skipping prerender` and the site deploys as
the normal SPA (exactly today's behavior). No downside, no downtime.

**Alternative (no browser on Vercel): build locally, deploy prebuilt.**
Run `npm run build:static` on your machine (confirmed working), then
`vercel deploy --prebuilt`. Keeps Chromium off Vercel entirely.

## Re-running

Any time content changes (new blog post, new city, etc.), the prerender re-runs automatically as part of `build:static`, so the static HTML stays in sync with the site.
