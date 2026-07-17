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
      { id: 'crawl', text: 'No broken links, 404s, or redirect errors on key pages' },
      { id: 'cwv', text: 'Core Web Vitals pass (fast LCP, low CLS, responsive INP)' },
    ],
  },
  {
    key: 'onpage',
    name: 'On-Page SEO',
    items: [
      { id: 'titles', text: 'Every page has a unique, keyword-focused title tag (≤60 chars)' },
      { id: 'meta', text: 'Every page has a unique, compelling meta description' },
      { id: 'h1', text: 'One clear H1 per page that matches search intent' },
      { id: 'alt', text: 'Images have descriptive alt text and meaningful file names' },
    ],
  },
  {
    key: 'local',
    name: 'Local SEO',
    items: [
      { id: 'gbp', text: 'Google Business Profile is claimed and fully filled out' },
      { id: 'nap', text: 'Name, address, and phone (NAP) are identical everywhere online' },
      { id: 'directories', text: 'Listed on Apple Maps, Bing Places, and key directories' },
    ],
  },
  {
    key: 'content',
    name: 'Content',
    items: [
      { id: 'intent', text: 'Pages target real keywords people actually search (intent-matched)' },
      { id: 'cadence', text: 'Publishing helpful content on a regular cadence' },
      { id: 'faq', text: 'FAQ / structured content positioned to win featured snippets' },
      { id: 'internal', text: 'Internal links connect related pages logically' },
    ],
  },
  {
    key: 'authority',
    name: 'Authority & AI',
    items: [
      { id: 'backlinks', text: 'Earning quality backlinks from relevant, trusted sites' },
      { id: 'reviews', text: 'Reviews are being generated and responded to' },
      { id: 'schema', text: 'Structured data (schema) implemented so Google & AI can parse the site' },
    ],
  },
];

export const CHECKLIST_TOTAL = CHECKLIST_GROUPS.reduce((n, g) => n + g.items.length, 0);

export function gradeFor(pct) {
  if (pct >= 90) return { grade: 'A', label: 'Excellent', note: 'Your SEO foundation is strong. Focus on authority and fresh content to compound rankings.' };
  if (pct >= 75) return { grade: 'B', label: 'Good', note: 'Solid base with a few gaps. Closing them will unlock meaningful ranking gains.' };
  if (pct >= 60) return { grade: 'C', label: 'Needs work', note: 'The essentials are partly there, but real issues are holding your rankings back.' };
  if (pct >= 40) return { grade: 'D', label: 'At risk', note: 'Major gaps are likely making you invisible for searches you should win.' };
  return { grade: 'F', label: 'Critical', note: 'Search engines can barely parse or trust your site. This is fixable — and high-impact.' };
}
