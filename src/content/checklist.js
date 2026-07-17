// Data for the free interactive SEO Scorecard tool at /seo-checklist.
// A linkable asset: genuinely useful self-audit that earns links, ranks for
// "free SEO checklist / SEO audit checklist / SEO scorecard", and converts.

export const CHECKLIST_GROUPS = [
  {
    key: 'technical',
    name: 'Technical SEO',
    items: [
      { id: 'https', text: 'Site runs on HTTPS with no mixed-content warnings' },
      { id: 'sitemap', text: 'XML sitemap exists and is submitted in Google Search Console' },
      { id: 'robots', text: 'robots.txt is configured correctly (not blocking important pages)' },
      { id: 'crawl', text: 'No broken links, 404s, or redirect errors on key pages' },
      { id: 'cwv', text: 'Core Web Vitals pass (fast LCP, low CLS, responsive INP)' },
      { id: 'mobile', text: 'Site is fully mobile-friendly and responsive' },
      { id: 'canonical', text: 'Canonical tags set correctly — no duplicate-content confusion' },
      { id: 'indexable', text: 'Key pages are indexable (no accidental noindex)' },
      { id: 'https-render', text: 'Pages render for crawlers without needing JavaScript (SSR/prerender)' },
    ],
  },
  {
    key: 'onpage',
    name: 'On-Page SEO',
    items: [
      { id: 'titles', text: 'Every page has a unique, keyword-focused title tag (≤60 chars)' },
      { id: 'meta', text: 'Every page has a unique, compelling meta description' },
      { id: 'h1', text: 'One clear H1 per page that matches search intent' },
      { id: 'headings', text: 'Logical heading structure (H2/H3) organizes the content' },
      { id: 'alt', text: 'Images have descriptive alt text and meaningful file names' },
      { id: 'urls', text: 'URLs are short, readable, and keyword-relevant' },
      { id: 'firstwords', text: 'Primary keyword appears naturally in the first 100 words' },
      { id: 'schema', text: 'Structured data (schema) added where relevant' },
    ],
  },
  {
    key: 'local',
    name: 'Local SEO',
    items: [
      { id: 'gbp', text: 'Google Business Profile is claimed and fully filled out' },
      { id: 'gbpcat', text: 'Correct primary + secondary GBP categories chosen' },
      { id: 'nap', text: 'Name, address, and phone (NAP) are identical everywhere online' },
      { id: 'applebing', text: 'Listed on Apple Maps and Bing Places' },
      { id: 'citations', text: 'Present in key industry and local directories (50+ citations)' },
      { id: 'reviews', text: 'Actively generating and responding to Google reviews' },
      { id: 'locpages', text: 'Location / service-area pages for each area you serve' },
    ],
  },
  {
    key: 'content',
    name: 'Content',
    items: [
      { id: 'intent', text: 'Pages target real keywords people actually search (intent-matched)' },
      { id: 'cadence', text: 'Publishing helpful content on a regular cadence' },
      { id: 'better', text: 'Content is genuinely more useful than what currently ranks' },
      { id: 'faq', text: 'FAQ / structured content positioned to win featured snippets' },
      { id: 'internal', text: 'Internal links connect related pages logically' },
      { id: 'refresh', text: 'Older content is refreshed and kept up to date' },
      { id: 'eeat', text: 'Content shows real experience and expertise (E-E-A-T)' },
    ],
  },
  {
    key: 'authority',
    name: 'Authority & AI',
    items: [
      { id: 'backlinks', text: 'Earning quality backlinks from relevant, trusted sites' },
      { id: 'toxic', text: 'Backlink profile is clean (no toxic / spam links)' },
      { id: 'mentions', text: 'Brand is mentioned and cited around the web' },
      { id: 'ratings', text: 'Reviews and ratings signal trust to Google' },
      { id: 'geo', text: 'AI search ready — cited by ChatGPT, Perplexity & Google AI Overviews' },
      { id: 'llms', text: 'llms.txt / AI-crawler discovery files are in place' },
    ],
  },
];

export const CHECKLIST_TOTAL = CHECKLIST_GROUPS.reduce((n, g) => n + g.items.length, 0);

// A self-check never earns a flawless 100 — execution quality, authority, and
// hidden technical issues can only be judged in a real audit. So the displayed
// score is capped just below perfect, on purpose.
export const MAX_DISPLAY_SCORE = 96;

export function gradeFor(pct) {
  if (pct >= 90)
    return {
      grade: 'A',
      label: 'Strong',
      note: 'About as strong as a self-check gets. The last stretch — execution quality, authority, and deep technical issues — is exactly what a real audit uncovers.',
    };
  if (pct >= 75)
    return { grade: 'B', label: 'Good', note: 'A solid base with real gaps. Closing them unlocks meaningful ranking gains.' };
  if (pct >= 60)
    return { grade: 'C', label: 'Needs work', note: 'The fundamentals are partly there, but real issues are holding your rankings back.' };
  if (pct >= 40)
    return { grade: 'D', label: 'At risk', note: 'Major gaps are likely making you invisible for searches you should win.' };
  return { grade: 'F', label: 'Critical', note: 'Search engines can barely parse or trust your site — fixable, and high-impact.' };
}
