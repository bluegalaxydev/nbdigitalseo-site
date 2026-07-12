// Niche buyer-intent landing pages. Each targets a high-intent Google query
// like "SEO for dentists" or "SEO for ecommerce stores". Rendered by App.jsx.

export const niches = {
  dentists: {
    slug: 'seo-for-dentists',
    title: 'SEO for Dentists — Monthly Dental SEO Service | RankFrame SEO',
    metaDescription:
      'Monthly dental SEO service for small private practices. Local SEO, Google Business Profile, schema markup, and ranking reports from $150/month. No setup fee.',
    h1: 'SEO for Dentists',
    subhead:
      'Monthly dental SEO service for private practices that want steady, organic new-patient flow — not one-off campaigns.',
    painPoints: [
      'Your competitors rank above you for "dentist near me" even though they\'re two blocks farther away.',
      'You get traffic to the homepage but almost none to service pages like Invisalign or implants.',
      'Reviews say you\'re the best in town, but Google Business Profile looks half-empty.',
      'You tried one ad campaign and it burned $3,000 with four calls to show for it.',
    ],
    whatWeDo: [
      'Local SEO architecture built on LocalBusiness + Dentist schema with NAP consistency across 50+ directories.',
      'Service-page optimization for every procedure (whitening, crowns, Invisalign, implants) with dedicated title tags and FAQ schema.',
      'Google Business Profile audit — categories, services, photos, Q&A, posting cadence.',
      'Review-schema markup to surface star ratings in SERPs without buying fake reviews.',
      'Monthly ranking reports on local + service keywords with a 30-day action roadmap.',
    ],
    faq: [
      {
        q: 'How long until a dental practice sees SEO results?',
        a: 'Local dental SEO typically shows Google Business Profile visibility gains in 2–4 weeks. Organic ranking movement on service pages usually appears between 60 and 90 days. The compounding effect is strongest at the 6-month mark, after Google has seen consistent schema, reviews, and internal linking.',
      },
      {
        q: 'Do you work with multi-location dental groups?',
        a: 'Yes. Multi-location dental groups need individual location pages with unique LocalBusiness schema, city-specific landing pages, and Google Business Profile management per location. RankFrame\'s $750/month plan includes this structure.',
      },
      {
        q: 'Can SEO replace Google Ads for a dental practice?',
        a: 'For most established practices, organic SEO delivers a lower cost per patient than Google Ads within 6–9 months. Paid ads are better for brand-new practices with no domain history. The smart play is usually both — ads for immediate volume, SEO for long-term compounding.',
      },
      {
        q: 'How is this different from an SEO agency charging $2,500/month?',
        a: 'Most agency retainers bundle strategy meetings, reporting software, and account management that a 1–2 location dental practice doesn\'t need. RankFrame\'s $150/month plan covers the actual technical SEO and reporting; $750/month adds backlinks and citation management. You get the work, not the overhead.',
      },
    ],
    stats: [
      { label: '46%', text: 'of all Google searches have local intent.' },
      { label: '78%', text: 'of local mobile searches result in an offline purchase or booking.' },
      { label: '3x', text: 'higher click-through on Google Business Profile listings with 5+ photos.' },
    ],
  },
  ecommerce: {
    slug: 'seo-for-ecommerce',
    title: 'SEO for E-commerce Stores — Monthly Technical SEO | RankFrame SEO',
    metaDescription:
      'Monthly SEO service for Shopify, WooCommerce, and BigCommerce stores. Product schema, collection pages, crawl budget, and ranking reports from $150/month.',
    h1: 'SEO for E-commerce Stores',
    subhead:
      'Monthly technical SEO for Shopify, WooCommerce, and BigCommerce stores — fix crawl budget, Product schema, and collection-page architecture so Google ranks your catalog.',
    painPoints: [
      'Google indexes 200 pages and ignores the other 2,000 — your crawl budget is bleeding out on faceted URLs.',
      'Product pages have generic titles like "Blue Shirt | StoreName" instead of keyword-first descriptive ones.',
      'No Product schema means no star ratings, no price, no availability in SERPs — your rich snippets are blank.',
      'Collection pages rank nowhere because they lack unique copy, internal links, or canonical tags.',
    ],
    whatWeDo: [
      'Product schema (Product, Offer, AggregateRating, Review) applied across the full catalog with automation.',
      'Faceted-navigation audit — robots.txt + canonical tag strategy so Google spends crawl budget on money pages.',
      'Collection-page rewrites with unique descriptions, internal links, and breadcrumb schema.',
      'Site-speed / Core Web Vitals pass for mobile — LCP, CLS, INP under Google thresholds.',
      'Monthly ranking reports on category-level and long-tail product keywords with a 30-day priority roadmap.',
    ],
    faq: [
      {
        q: 'Do you work with Shopify, WooCommerce, and BigCommerce?',
        a: 'Yes. All three platforms expose the hooks RankFrame needs — theme.liquid or header.php for schema injection, robots.txt for crawl control, and sitemap settings. Shopify stores on Dawn or modern themes are the fastest to optimize; WooCommerce stores on older WordPress themes usually need a Core Web Vitals pass first.',
      },
      {
        q: 'Will Product schema show star ratings in Google if I have no reviews yet?',
        a: 'No — Google only surfaces AggregateRating rich snippets when you have verified review data (typically 5+ reviews). Product schema still helps even without reviews because it surfaces price, availability, and brand directly in the SERP, which lifts click-through rate 15–25%.',
      },
      {
        q: 'How do you handle out-of-stock product SEO?',
        a: 'Best practice in 2026: keep the URL live, update the Product schema availability to OutOfStock, and add a visible "Notify me" form. Redirecting to category pages or 404-ing wastes earned authority. RankFrame monitors availability monthly and flags stale SKUs.',
      },
      {
        q: 'What about duplicate content from product variants?',
        a: 'The fix is a strict canonical-tag policy (variants canonicalize to the parent product), combined with unique meta descriptions per variant only where they genuinely differ (e.g., size vs. color). This is part of every RankFrame e-commerce audit.',
      },
    ],
    stats: [
      { label: '53%', text: 'of product searches start on Google, not on a marketplace.' },
      { label: '20–30%', text: 'higher CTR on e-commerce SERPs with Product + AggregateRating schema.' },
      { label: '7%', text: 'conversion-rate lift per 1-second improvement in product-page load time.' },
    ],
  },
  lawfirms: {
    slug: 'seo-for-law-firms',
    title: 'SEO for Law Firms — Attorney & Legal SEO Service | RankFrame SEO',
    metaDescription:
      'Monthly SEO for law firms and attorneys. Local SEO, Google Business Profile, practice-area pages, and legal schema to rank for high-intent searches like "personal injury lawyer near me". Every industry, one-on-one service.',
    h1: 'SEO for Law Firms',
    subhead:
      'Attorney SEO that ranks your practice for the high-value searches clients actually make — not vanity keywords, but "DUI lawyer near me" and "estate attorney in [city]".',
    painPoints: [
      'You are outranked by directories like Avvo and FindLaw for your own name and practice area.',
      'Your practice-area pages are thin, so Google cannot tell whether you do family law, criminal defense, or both.',
      'Competitors show up in the Google map pack for "lawyer near me" and you are nowhere on it.',
      'You pay for pay-per-click leads that cost $50–$300 a click and dry up the moment you stop.',
    ],
    whatWeDo: [
      'Dedicated, optimized page for every practice area with its own title tag, content, and FAQ schema.',
      'Local SEO built on LocalBusiness + LegalService schema with Google Business Profile and map-pack optimization.',
      'City and service-area landing pages so you rank in every jurisdiction you serve.',
      'Authority building through legal directories, citations, and genuine editorial links — no spam that risks a penalty.',
      'Monthly ranking reports on practice-area and local keywords with a clear 30-day action plan.',
    ],
    faq: [
      {
        q: 'How long does SEO take for a law firm?',
        a: 'Local map-pack visibility often improves in 3–6 weeks after Google Business Profile and citation work. Competitive practice-area rankings usually move at 60–120 days and compound from there. Legal is a high-trust niche, so durable, guideline-compliant work matters more than shortcuts.',
      },
      {
        q: 'Do you build separate pages for each practice area?',
        a: 'Yes. A firm that does personal injury, family law, and criminal defense needs three distinct, in-depth pages — each targeting its own keywords with its own schema. One "Practice Areas" list page cannot rank for all of them.',
      },
      {
        q: 'Is SEO better than Google Ads for lawyers?',
        a: 'Legal is one of the most expensive PPC categories in the world. Ads deliver immediate volume, but SEO delivers a lower long-term cost per case and does not stop the moment you stop paying. Most firms win with both — ads now, SEO compounding underneath.',
      },
      {
        q: 'Can you help multi-location or multi-attorney firms?',
        a: 'Yes. Multi-location firms need individual location pages with unique LocalBusiness schema, plus attorney bio pages that build E-E-A-T. We structure the whole architecture so each office and each attorney can rank.',
      },
    ],
    stats: [
      { label: '96%', text: 'of people seeking legal advice start with a search engine.' },
      { label: '74%', text: 'of prospective clients visit a law firm’s website before taking action.' },
      { label: '46%', text: 'of all Google searches have local intent — the map pack matters for lawyers.' },
    ],
  },
  restaurants: {
    slug: 'seo-for-restaurants',
    title: 'SEO for Restaurants — Local Restaurant SEO Service | RankFrame SEO',
    metaDescription:
      'Local SEO for restaurants and cafes. Google Business Profile, Google Maps, Apple Maps, menu schema, and review strategy to fill more tables from "restaurants near me" searches. One-on-one service, every industry.',
    h1: 'SEO for Restaurants',
    subhead:
      'Local SEO that puts your restaurant in the map pack for "restaurants near me", "best [cuisine] in [city]", and every hungry searcher within delivery range.',
    painPoints: [
      'Third-party apps like Yelp and delivery platforms outrank your own website — and take a cut of every order.',
      'Your Google Business Profile is missing photos, hours, and menu, so you lose clicks to the place next door.',
      'You do not show up on Apple Maps at all, missing every iPhone user searching nearby.',
      'Great food, great reviews — but you are invisible for "best brunch in [city]".',
    ],
    whatWeDo: [
      'Google Business Profile optimization — categories, photos, menu, hours, attributes, and posting cadence.',
      'Google Maps and Apple Maps / Apple Business Connect setup and fixes so you appear on every device.',
      'Menu and Restaurant schema markup so Google can show your cuisine, price range, and hours directly.',
      'Review generation and response strategy that lifts your star rating without ever buying fake reviews.',
      'Local landing pages for each location and neighborhood you serve, plus monthly ranking reports.',
    ],
    faq: [
      {
        q: 'How do I rank higher on Google Maps for my restaurant?',
        a: 'The map pack rewards a complete, active Google Business Profile (photos, menu, hours, categories), consistent NAP data across the web, a steady flow of genuine reviews, and LocalBusiness/Restaurant schema on your site. We handle all of it and track your rank for your key "near me" terms.',
      },
      {
        q: 'Should I rely on Yelp and delivery apps instead of my own site?',
        a: 'Those platforms take a commission on every order and own the customer relationship. Ranking your own website and Google Business Profile means direct reservations and orders with no middleman fee — which pays for the SEO many times over.',
      },
      {
        q: 'Does Apple Maps matter for restaurants?',
        a: 'Very much — a large share of local "near me" searches happen on iPhones through Apple Maps and Siri. Most restaurants never claim their Apple listing, so getting it set up correctly is often an easy win over competitors.',
      },
      {
        q: 'How fast will I see more customers?',
        a: 'Google Business Profile improvements can lift map-pack visibility within a few weeks. Organic rankings for competitive local terms build over 60–90 days. Reviews and consistency compound the effect over time.',
      },
    ],
    stats: [
      { label: '90%', text: 'of diners research a restaurant online before visiting.' },
      { label: '78%', text: 'of local mobile searches result in an offline purchase.' },
      { label: '4x', text: 'more views for Google Business Profiles with photos and a complete menu.' },
    ],
  },
  realestate: {
    slug: 'seo-for-real-estate',
    title: 'SEO for Real Estate Agents & Agencies | RankFrame SEO',
    metaDescription:
      'SEO for real estate agents, brokers, and agencies. Local SEO, neighborhood landing pages, IDL/listing optimization, and schema to rank for "homes for sale in [city]" and "realtor near me". One-on-one service.',
    h1: 'SEO for Real Estate',
    subhead:
      'Real estate SEO that ranks you for the searches buyers and sellers actually type — "homes for sale in [neighborhood]" and "[city] real estate agent" — instead of losing them to Zillow.',
    painPoints: [
      'Portals like Zillow and Realtor.com dominate every search, burying your own site and listings.',
      'You have no neighborhood or city pages, so you never rank for the hyper-local searches buyers use.',
      'Your agent website is slow, hard to crawl, and has no schema — Google cannot understand your listings.',
      'Referrals are drying up and you have no organic pipeline to replace them.',
    ],
    whatWeDo: [
      'Neighborhood and city landing pages that target "homes for sale in [area]" and local buyer intent.',
      'Local SEO with Google Business Profile, RealEstateAgent schema, and consistent citations.',
      'Technical optimization for listing pages — speed, crawlability, structured data, and internal linking.',
      'Content that answers buyer and seller questions ("cost to sell a home in [city]") to capture top-of-funnel searches.',
      'Authority building and monthly ranking reports on your priority local and long-tail terms.',
    ],
    faq: [
      {
        q: 'Can a real estate agent actually outrank Zillow?',
        a: 'Not for broad terms like "homes for sale" — but you absolutely can win hyper-local and long-tail searches ("condos for sale in [neighborhood]", "best realtor in [small city]", "cost to sell a house in [area]") where the portals are weak and buyer intent is high. That is where the leads are.',
      },
      {
        q: 'What pages should a real estate site have for SEO?',
        a: 'Beyond listings: a page per city and neighborhood you serve, buyer and seller guide content, an optimized About/agent bio page for E-E-A-T, and a strong Google Business Profile. Each targets a specific searcher.',
      },
      {
        q: 'How long until real estate SEO produces leads?',
        a: 'Local and neighborhood pages typically start ranking in 60–120 days. Because real estate is seasonal and high-value, even a handful of ranking pages can produce meaningful lead flow that compounds each month.',
      },
      {
        q: 'Do you work with teams and brokerages?',
        a: 'Yes. Teams and brokerages benefit from a hub-and-spoke architecture — a strong brand hub linking to individual agent and location pages — so the whole organization ranks, not just one agent.',
      },
    ],
    stats: [
      { label: '97%', text: 'of home buyers use the internet in their home search.' },
      { label: '46%', text: 'of all Google searches are local — critical for real estate.' },
      { label: '69%', text: 'of buyers who take action on a real estate site start with a local search.' },
    ],
  },
  contractors: {
    slug: 'seo-for-contractors',
    title: 'SEO for Contractors & Home Services | RankFrame SEO',
    metaDescription:
      'SEO for contractors, plumbers, electricians, HVAC, roofers, and home-service businesses. Local SEO, Google Business Profile, service-area pages, and schema to rank for "[service] near me". One-on-one service.',
    h1: 'SEO for Contractors & Home Services',
    subhead:
      'Local SEO for contractors that wins the map pack for "[service] near me" — plumbers, electricians, HVAC, roofers, remodelers, and every trade that lives or dies by local search.',
    painPoints: [
      'Lead-generation sites like Angi and Thumbtack rank above you — and resell the same lead to five competitors.',
      'You show up for your business name but not for "emergency plumber [city]" when it actually matters.',
      'You serve ten towns but only have one page, so you never rank in the other nine.',
      'Your reviews are great, but your Google Business Profile is barely filled out.',
    ],
    whatWeDo: [
      'Service-area landing pages for every town and every service you offer, each targeting local intent.',
      'Google Business Profile optimization and map-pack ranking with LocalBusiness + service schema.',
      'Google Maps, Apple Maps, and Bing Places setup with consistent NAP across 50+ directories.',
      'Review generation and response strategy to build the trust signals that dominate the map pack.',
      'Monthly ranking reports on your money keywords ("[trade] near me", "[service] in [town]") with a 30-day plan.',
    ],
    faq: [
      {
        q: 'How do contractors rank in the Google map pack?',
        a: 'The map pack rewards proximity, a complete and active Google Business Profile, consistent citations, and a steady flow of genuine reviews — backed by service-area pages and LocalBusiness schema on your site. We build all of it and track your rank for each "near me" term that drives calls.',
      },
      {
        q: 'Is SEO better than buying leads from Angi or Thumbtack?',
        a: 'Those platforms sell the same lead to multiple contractors and charge per lead forever. SEO builds an asset you own — calls that come directly to you, exclusively, with no per-lead fee. Most trades find it is far cheaper per booked job within a few months.',
      },
      {
        q: 'I serve multiple towns — how does that work?',
        a: 'Each service area needs its own optimized page (for example, "Water Heater Repair in [Town]") so Google can rank you locally in every town you cover. One generic "Service Areas" list will not do it.',
      },
      {
        q: 'How quickly do home-service businesses see results?',
        a: 'Google Business Profile and citation work can lift map-pack visibility in a few weeks. Service-area pages usually rank in 60–90 days. For emergency trades, even a small ranking gain can mean several extra calls a week.',
      },
    ],
    stats: [
      { label: '78%', text: 'of local mobile searches result in an offline purchase or call.' },
      { label: '46%', text: 'of all Google searches have local intent.' },
      { label: '88%', text: 'of consumers trust online reviews as much as personal recommendations.' },
    ],
  },
  cbd: {
    slug: 'seo-for-cbd',
    title: 'SEO for CBD & Hemp Brands — High-Risk SEO | RankFrame SEO',
    metaDescription:
      'SEO for CBD, hemp, and supplement brands that are banned from Google and Meta ads. Compliant, durable organic SEO — technical, content, product schema, and authority — so restricted brands rank without paid ads.',
    h1: 'SEO for CBD & Hemp Brands',
    subhead:
      'CBD and hemp brands are banned or throttled on Google and Meta ads — which makes organic SEO your single most reliable growth channel. We rank restricted brands the compliant, durable way.',
    painPoints: [
      'Google Ads and Meta reject or suspend your account for the exact products you sell.',
      'Every dollar of paid growth sits on a landmine — one policy change and your traffic is gone.',
      'Your product pages have no schema, so Google cannot surface price, rating, or availability.',
      'Agencies either refuse your industry or use shady link schemes that risk a manual penalty.',
    ],
    whatWeDo: [
      'Full technical SEO foundation — architecture, Product schema (price, availability, rating), Core Web Vitals, and clean indexing.',
      'Compliant, E-E-A-T-strong content that answers real buyer questions ("is CBD legal in [state]", "CBD for sleep") and ranks.',
      'Local SEO with Google Business Profile, Google Maps, and Apple Maps for dispensaries and physical stores.',
      'Durable authority building — digital PR, niche directories, and genuine editorial links, never spam that triggers penalties.',
      'AI search (GEO) optimization plus monthly ranking reports so you grow in Google and get cited by ChatGPT.',
    ],
    faq: [
      {
        q: 'Why is SEO so important for CBD and hemp brands?',
        a: 'Because paid ads are banned or unreliable for your category, organic search is the most dependable way to reach customers actively looking for your products. Ranking cannot be switched off by an ad-policy reviewer, and the traffic compounds over time.',
      },
      {
        q: 'Is CBD SEO compliant and safe?',
        a: 'Ours is. We build on Google-guideline-compliant technical work, genuinely useful content, and earned authority — never PBNs, link farms, or cloaking. High-risk industries are scrutinized more heavily, so durable, white-hat work is the only smart approach.',
      },
      {
        q: 'Can you help CBD e-commerce stores specifically?',
        a: 'Yes. E-commerce CBD stores need Product schema across the catalog, faceted-navigation and crawl-budget control, unique collection-page copy, and a clean canonical strategy — all part of what we set up.',
      },
      {
        q: 'Will ChatGPT and AI search recommend my CBD brand?',
        a: 'Getting cited in AI answers depends on being indexed (especially in Bing, which powers ChatGPT search), structured content, an llms.txt file, and growing authority. We optimize for all of it, so restricted brands can earn a channel paid ads can never touch.',
      },
    ],
    stats: [
      { label: '100%', text: 'of major ad platforms restrict or ban CBD advertising — SEO is the reliable channel.' },
      { label: '53%', text: 'of all website traffic comes from organic search.' },
      { label: '14.6%', text: 'close rate for SEO leads vs 1.7% for outbound marketing.' },
    ],
  },
  saas: {
    slug: 'seo-for-saas',
    title: 'SEO for SaaS Companies — B2B SaaS SEO Service | RankFrame SEO',
    metaDescription:
      'SEO for SaaS and B2B tech companies. Programmatic and content SEO, technical optimization, and AI search (GEO) so your product ranks for high-intent and comparison keywords and gets cited by ChatGPT.',
    h1: 'SEO for SaaS Companies',
    subhead:
      'SaaS SEO built for pipeline — rank for the high-intent, comparison, and "alternative to" searches your buyers make, and get your product cited in AI answers.',
    painPoints: [
      'You rank for your brand name but not for the problem your product solves.',
      'Competitors own the "[competitor] alternative" and "best [category] software" searches that convert.',
      'Your docs and blog are not structured for Google or for AI engines to extract and cite.',
      'Paid acquisition (CAC) keeps climbing and you have no compounding organic channel underneath it.',
    ],
    whatWeDo: [
      'Bottom-of-funnel content targeting high-intent terms — "best [category] tools", "[competitor] alternative", use-case and integration pages.',
      'Technical SEO for your marketing site and docs — architecture, speed, schema, and clean indexing.',
      'Topic-cluster content strategy that builds topical authority around your category.',
      'AI search (GEO) optimization — structured content, llms.txt, and entity optimization so ChatGPT, Perplexity, and AI Overviews cite your product.',
      'Monthly reporting on rankings, pipeline-relevant keywords, and share of voice vs competitors.',
    ],
    faq: [
      {
        q: 'What SEO keywords matter most for SaaS?',
        a: 'The ones closest to purchase: "best [category] software", "[competitor] alternative", "[category] for [use case]", integration and pricing-comparison searches. These convert far better than broad top-of-funnel terms, and they are where we focus first.',
      },
      {
        q: 'How does SEO lower SaaS CAC?',
        a: 'Organic content is an asset that keeps producing signups long after it is published, with no per-click cost. As your ranking content library grows, a larger share of pipeline comes from search — pulling blended CAC down over time.',
      },
      {
        q: 'Can you get our SaaS cited by ChatGPT and AI search?',
        a: 'Yes — that is a core part of what we do. Generative Engine Optimization (GEO) makes your product citation-ready for ChatGPT, Perplexity, Gemini, and Google AI Overviews through structured data, entity optimization, an llms.txt file, and authoritative content.',
      },
      {
        q: 'Do you do programmatic SEO for SaaS?',
        a: 'Where it fits — for example, integration pages, template galleries, or use-case pages generated from a clean data model. Done right, programmatic SEO scales your indexed footprint without creating thin, low-quality pages.',
      },
    ],
    stats: [
      { label: '68%', text: 'of online experiences begin with a search engine.' },
      { label: '53%', text: 'of all website traffic comes from organic search.' },
      { label: '14.6%', text: 'close rate for SEO leads vs 1.7% for outbound marketing.' },
    ],
  },
};

export function getNicheBySlug(slug) {
  return Object.values(niches).find((n) => n.slug === slug) || null;
}
