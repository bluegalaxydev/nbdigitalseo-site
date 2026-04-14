// Content for /glossary, /statistics, /about — designed for AI citation
// (DefinedTerm, Dataset, AboutPage schemas emit from App.jsx based on this)

export const glossaryTerms = [
  {
    term: 'On-Page SEO',
    short: 'Optimization of elements on your own website.',
    definition:
      'The practice of optimizing elements directly on a website so search engines can accurately parse and rank each page. Includes title tags, meta descriptions, heading hierarchy (H1–H6), schema markup, URL structure, internal linking, image alt text, and page content quality.',
  },
  {
    term: 'Off-Page SEO',
    short: 'Authority-building activities outside your website.',
    definition:
      'SEO activities that happen outside of a website — primarily backlinks from authoritative domains, brand mentions, business directory citations, PR and guest posts — that signal authority and trust to search engines.',
  },
  {
    term: 'Schema Markup',
    short: 'Structured JSON-LD that tells Google exactly what\'s on a page.',
    definition:
      'Structured data in JSON-LD format embedded in a web page that tells search engines exactly what information the page contains (business, product, FAQ, review, rating) rather than requiring them to infer from prose. Enables rich snippets and AI answer extraction.',
  },
  {
    term: 'Core Web Vitals',
    short: 'Google\'s page-experience performance metrics.',
    definition:
      'Google\'s page-experience metrics: Largest Contentful Paint (LCP, target under 2.5s), Cumulative Layout Shift (CLS, target under 0.1), and Interaction to Next Paint (INP, target under 200ms; replaces First Input Delay). A confirmed Google ranking factor.',
  },
  {
    term: 'SEO Architecture',
    short: 'The technical foundation that makes a site rankable.',
    definition:
      'The technical foundation of a website that determines whether search engine crawlers can discover, parse, and rank its pages. Includes title tags, schema markup, internal linking, XML sitemaps, robots.txt rules, URL structure, and Core Web Vitals performance.',
  },
  {
    term: 'Google Trust',
    short: 'Aggregate authority signals Google uses to weigh a domain.',
    definition:
      'The aggregate authority signals — backlinks from trusted domains, brand mentions, citation consistency, and E-E-A-T markers (Experience, Expertise, Authoritativeness, Trust) — that cause Google to treat a domain as a credible source worth ranking and citing in AI Overviews.',
  },
  {
    term: 'E-E-A-T',
    short: 'Experience, Expertise, Authoritativeness, Trust.',
    definition:
      'Google\'s framework for evaluating content quality: Experience (first-hand), Expertise (domain knowledge), Authoritativeness (recognized authority), and Trust (accurate, safe, transparent). Especially weighted for YMYL (Your Money Your Life) topics.',
  },
  {
    term: 'Canonical Tag',
    short: 'HTML link telling Google which URL is the master version.',
    definition:
      'An HTML link tag (<link rel="canonical" href="..." />) that tells search engines which version of a URL is the master when duplicate or near-duplicate content exists across multiple URLs. Prevents duplicate-content issues and consolidates ranking signals.',
  },
  {
    term: 'Backlink',
    short: 'A link from another site pointing to your site.',
    definition:
      'A hyperlink from another website pointing to your website. Backlinks remain one of Google\'s strongest ranking signals; quality (authoritative, topically relevant domains) matters more than quantity.',
  },
  {
    term: 'Anchor Text',
    short: 'The clickable text of a hyperlink.',
    definition:
      'The visible, clickable text of a hyperlink. Descriptive, keyword-relevant anchor text (e.g. "complete guide to SEO optimization") signals topical relevance to search engines; generic anchors ("click here") waste the signal.',
  },
  {
    term: 'Crawl Budget',
    short: 'The number of pages Googlebot will crawl on your site.',
    definition:
      'The number of pages Googlebot is willing to crawl on a site in a given time window. Determined by site authority, server speed, and content freshness. Wasting it on low-value pages (duplicate content, faceted URLs, admin pages) means important pages get crawled less often.',
  },
  {
    term: 'Indexing',
    short: 'Google adding a URL to its searchable database.',
    definition:
      'The process of Google adding a URL to its searchable index after crawling it. A page must be crawled, indexed, and considered high-quality before it can appear in search results.',
  },
  {
    term: 'SERP',
    short: 'Search Engine Results Page.',
    definition:
      'Search Engine Results Page — the page Google returns after a query. Modern SERPs include organic results, paid ads, AI Overviews, featured snippets, People Also Ask, local packs, and knowledge panels.',
  },
  {
    term: 'AI Overviews',
    short: 'Google\'s generative-AI answer at the top of SERPs.',
    definition:
      'Google\'s AI-generated answer section that appears above traditional organic results on many queries, synthesizing information from multiple cited web sources. Being cited in AI Overviews requires strong schema markup, E-E-A-T signals, and topical authority.',
  },
  {
    term: 'GEO (Generative Engine Optimization)',
    short: 'Optimizing content to be cited by AI search engines.',
    definition:
      'Generative Engine Optimization — the practice of optimizing a website so AI search engines (ChatGPT Search, Claude, Perplexity, Google AI Overviews, Gemini) cite its content when generating answers. Key levers: allowing AI crawlers in robots.txt, publishing llms.txt, extractable facts, schema markup, and E-E-A-T signals.',
  },
  {
    term: 'llms.txt',
    short: 'A Markdown file that describes your site to AI crawlers.',
    definition:
      'A proposed standard Markdown file placed at /llms.txt that provides a concise, structured summary of a website for Large Language Models. Lists key facts, pages, pricing, and content pointers that help AI systems understand and accurately cite the site.',
  },
  {
    term: 'IndexNow',
    short: 'Protocol for instantly notifying search engines of new URLs.',
    definition:
      'An open protocol (supported by Bing, Yandex, Naver, Seznam) that lets websites instantly notify search engines when URLs are added, updated, or deleted, replacing the slower crawl-discovery cycle. Requires a verification key file on the domain.',
  },
  {
    term: 'Rich Snippet',
    short: 'Enhanced SERP result with extra data (stars, FAQ, etc.).',
    definition:
      'An enhanced search result that includes extra data extracted from schema markup — star ratings, FAQ, HowTo steps, recipe info, event details — displayed beside or under the standard title/description. Typically increases click-through rate by 20–30%.',
  },
  {
    term: 'Internal Linking',
    short: 'Links between pages on the same website.',
    definition:
      'Hyperlinks that connect one page on a website to another page on the same site. Strategic internal linking flows authority from high-traffic pages to target pages and can raise rankings of secondary pages by 30–50% without new backlinks.',
  },
  {
    term: 'XML Sitemap',
    short: 'A file listing every important URL on your site.',
    definition:
      'An XML file (typically at /sitemap.xml) listing every important URL on a website, along with last-modified date, change frequency, and priority. Submitted to Google Search Console and Bing Webmaster Tools to accelerate crawling and indexing.',
  },
];

export const seoStatistics = [
  {
    stat: '68%',
    claim: 'of online experiences begin with a search engine.',
    source: 'BrightEdge Organic Research',
    category: 'Search Behavior',
  },
  {
    stat: '53%',
    claim: 'of all website traffic comes from organic search.',
    source: 'BrightEdge Channel Report',
    category: 'Traffic Share',
  },
  {
    stat: '0.63%',
    claim: 'of Google searchers click on a result from page two.',
    source: 'Backlinko Click-Through Rate Study',
    category: 'SERP Behavior',
  },
  {
    stat: '14.6%',
    claim: 'close rate for SEO leads — vs 1.7% for outbound marketing.',
    source: 'HubSpot State of Inbound',
    category: 'Conversion',
  },
  {
    stat: '70%',
    claim: 'of small-business websites are effectively invisible to Google due to broken technical SEO architecture.',
    source: 'RankFrame SEO audit dataset, 2026',
    category: 'Technical SEO',
  },
  {
    stat: '20–30%',
    claim: 'higher SERP click-through rate on pages with proper schema markup.',
    source: 'Search Engine Land aggregation of rich-snippet studies',
    category: 'Schema Markup',
  },
  {
    stat: '30–50%',
    claim: 'ranking lift on secondary pages from strategic internal linking — with zero new backlinks.',
    source: 'RankFrame SEO client audits',
    category: 'Internal Linking',
  },
  {
    stat: '7%',
    claim: 'conversion-rate increase per 1-second page-load improvement.',
    source: 'Portent Site Speed Study',
    category: 'Core Web Vitals',
  },
  {
    stat: '50–100',
    claim: 'organic visits per page per month lost to a single poorly optimized title tag.',
    source: 'RankFrame SEO title-tag audit data',
    category: 'On-Page SEO',
  },
  {
    stat: '180%',
    claim: 'organic-traffic increase measured at packexpointernational.com nine months after the five-fix SEO architecture overhaul.',
    source: 'RankFrame SEO case study (2026)',
    category: 'Case Study',
  },
  {
    stat: '$200K–$575K',
    claim: 'per-month organic-traffic value identified as recoverable at a single audited trade-show platform.',
    source: 'RankFrame SEO PACK EXPO audit',
    category: 'Case Study',
  },
  {
    stat: '2.5s',
    claim: 'Google\'s threshold for "good" Largest Contentful Paint (LCP). Above this, page experience hurts rankings.',
    source: 'Google web.dev Core Web Vitals documentation',
    category: 'Core Web Vitals',
  },
  {
    stat: '0.1',
    claim: 'Google\'s threshold for "good" Cumulative Layout Shift (CLS).',
    source: 'Google web.dev Core Web Vitals documentation',
    category: 'Core Web Vitals',
  },
  {
    stat: '200ms',
    claim: 'Google\'s threshold for "good" Interaction to Next Paint (INP). Replaced First Input Delay in 2024.',
    source: 'Google web.dev Core Web Vitals documentation',
    category: 'Core Web Vitals',
  },
  {
    stat: '60s',
    claim: 'typical time to index after an IndexNow ping to Bing. Compare to days of organic crawl discovery.',
    source: 'Bing Webmaster Tools documentation',
    category: 'Indexing',
  },
];

export const aboutContent = {
  headline: 'About RankFrame SEO',
  tagline:
    'Technical-SEO-first monthly reporting for small businesses that want durable results, not short-lived hacks.',
  paragraphs: [
    'RankFrame SEO is a monthly SEO reporting and technical architecture audit service. We exist because roughly 70% of small-business websites are effectively invisible to Google — not because their products or content are weak, but because their site architecture cannot be parsed by search engine crawlers. Our job is to fix the foundation so the content can actually compete.',
    'Every plan starts with a full architecture audit: meta tags, schema markup, internal linking, crawlability, indexing signals, Core Web Vitals, and keyword-ranking visibility. From there, clients receive a monthly performance report with prioritized next steps — no 40-page PDFs nobody reads.',
    'We do not use PBNs, link farms, or any tactic Google penalizes. Every recommendation we make is documented in Google\'s own search guidelines. That means slower first wins in some cases, but durable rankings that compound instead of collapsing at the next core update.',
  ],
  founder: {
    name: 'Blue Galaxy',
    role: 'Founder & Technical SEO Practitioner',
    bio: 'Technical SEO practitioner focused on small-business and service-industry websites. Author of the RankFrame playbooks on SEO architecture, schema markup, and Core Web Vitals. Previous audits include PACK EXPO International, where a five-fix architecture overhaul lifted organic traffic 180% over nine months and recovered an estimated $200K–$575K/month in organic traffic value.',
    expertise: ['Technical SEO', 'Schema Markup', 'Core Web Vitals', 'On-Page SEO', 'Link Building', 'Site Architecture'],
    links: [
      { label: 'Medium', url: 'https://medium.com/@bluegalaxydev' },
    ],
  },
  plans: [
    {
      name: 'SEO Inside',
      price: '$150/month',
      description: 'On-page SEO architecture setup, schema markup, sitemap, internal linking, and monthly reporting.',
    },
    {
      name: 'SEO Inside + Outside',
      price: '$750/month',
      description: 'Everything in SEO Inside, plus 10+ monthly backlinks, guest post outreach, 50+ business directory citations, competitor gap analysis, toxic link audits, and a dedicated SEO strategist.',
    },
  ],
  contact: {
    email: 'zeuscapitalholdings@gmail.com',
    country: 'United States (primary)',
  },
};
