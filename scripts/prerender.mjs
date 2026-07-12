// Post-build prerenderer for the RankFrame SPA.
//
// Why: the site is a client-rendered React SPA, so the raw HTML every URL
// returns is the same empty shell. Google eventually runs the JS, but AI
// crawlers (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot) and social
// preview bots do NOT — so per-page titles, meta, JSON-LD, and body content
// are invisible to them. This script boots the built app in a real headless
// browser once per route and writes the fully-rendered HTML to disk, so every
// URL serves real static content. main.jsx then hydrates over it in the
// browser (no flash for real users).
//
// It is DECOUPLED from `vite build` on purpose: the normal `npm run build`
// (what Vercel runs) is untouched. Run `npm run build:static` to build +
// prerender locally, verify, then decide how to deploy the prerendered output.
//
// One-time local setup (Chromium is not a project dependency, so Vercel's
// normal build is never slowed by it):
//   npm install -D puppeteer
//
// Then:
//   npm run build:static
//   npm run preview   # open a deep URL, View Source — you should see real content

import http from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '..', 'dist');
const PORT = 4747;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.pdf': 'application/pdf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function fail(msg) {
  console.error('\n[prerender] ' + msg + '\n');
  process.exit(1);
}

if (!existsSync(DIST)) {
  fail('dist/ not found. Run `npm run build` (or `npm run build:static`) first.');
}
if (!existsSync(path.join(DIST, 'index.html'))) {
  fail('dist/index.html not found — the build did not produce an app shell.');
}

// Routes to prerender come from the generated sitemap (single source of truth),
// minus non-HTML assets like the case-study PDF.
async function routesFromSitemap() {
  const smPath = path.join(DIST, 'sitemap.xml');
  if (!existsSync(smPath)) fail('dist/sitemap.xml not found — cannot determine routes.');
  const xml = await readFile(smPath, 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const seen = new Set();
  const routes = [];
  for (const loc of locs) {
    let p = loc.replace(/^https?:\/\/[^/]+/, '');
    if (p === '') p = '/';
    if (path.extname(p)) continue; // skip .pdf and other files
    if (!seen.has(p)) {
      seen.add(p);
      routes.push(p);
    }
  }
  if (!routes.includes('/')) routes.unshift('/');
  return routes;
}

// The app shell, captured before we overwrite anything, is served for every
// route so the SPA boots and renders that route.
const shell = await readFile(path.join(DIST, 'index.html'), 'utf8');

const server = http.createServer(async (req, res) => {
  try {
    const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    const ext = path.extname(urlPath);
    if (ext) {
      const filePath = path.join(DIST, urlPath);
      if (existsSync(filePath) && filePath.startsWith(DIST)) {
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        res.end(await readFile(filePath));
        return;
      }
      res.writeHead(404);
      res.end('not found');
      return;
    }
    // Non-file route → serve the SPA shell (client-side router takes over).
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(shell);
  } catch (e) {
    res.writeHead(500);
    res.end(String(e));
  }
});

await new Promise((r) => server.listen(PORT, r));

let puppeteer;
try {
  puppeteer = (await import('puppeteer')).default;
} catch {
  server.close();
  fail('puppeteer is not installed. Run:  npm install -D puppeteer');
}

const routes = await routesFromSitemap();
console.log('[prerender] ' + routes.length + ' routes to prerender');

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const outputs = [];
let ok = 0;
let failed = 0;

for (const route of routes) {
  const page = await browser.newPage();
  try {
    await page.goto('http://localhost:' + PORT + route, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });
    // Wait until the app has actually rendered its content.
    await page
      .waitForFunction(
        () => {
          const r = document.getElementById('root');
          return r && r.querySelector('main, header') && document.title.length > 0;
        },
        { timeout: 15000 }
      )
      .catch(() => {});
    const html = await page.content();
    outputs.push({ route, html });
    ok++;
    if (ok % 20 === 0) console.log('[prerender] ' + ok + '/' + routes.length + '…');
  } catch (e) {
    failed++;
    console.warn('[prerender] FAILED ' + route + ' — ' + e.message);
  } finally {
    await page.close();
  }
}

await browser.close();
server.close();

// Write everything only after crawling, so a mid-crawl file can't be served.
for (const { route, html } of outputs) {
  const out = route === '/' ? path.join(DIST, 'index.html') : path.join(DIST, route, 'index.html');
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, html, 'utf8');
}

console.log('\n[prerender] done — wrote ' + outputs.length + ' pages (' + failed + ' failed)');
if (failed > 0) process.exitCode = 0; // don't hard-fail the build on a few timeouts
