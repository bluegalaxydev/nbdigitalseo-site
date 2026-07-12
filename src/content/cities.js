// City-level buyer-intent landing pages. Each targets a high-intent local query
// like "SEO company in Austin" or "SEO services Miami". Rendered by App.jsx with
// City-scoped Service + FAQPage + WebPage + BreadcrumbList schema (areaServed = City).
//
// Content is original and localized per market (local pack dynamics, local pain
// points, local stats framing) — not a templated city swap — so each page earns
// its own rankings instead of tripping duplicate-content filters.

export const cities = {
  austin: {
    slug: 'seo-in-austin',
    city: 'Austin',
    title: 'SEO Company in Austin, TX — Local & Technical SEO | RankFrame SEO',
    metaDescription:
      'Austin SEO company for local, technical, and AI-search visibility. Rank in the Austin map pack, get cited by ChatGPT, and turn organic search into new customers. Pick your services — reply in 2–6 hours.',
    h1: 'SEO Company in Austin, TX',
    subhead:
      'Austin is one of the most competitive local search markets in the country. We help Austin businesses rank in the Google map pack, in organic results, and in AI answers — with one-on-one, service-based SEO.',
    painPoints: [
      'You rank on page two for "[your service] Austin" while a competitor in Round Rock sits in the map pack.',
      'New tech and DTC brands flood into Austin every quarter, and your keywords keep getting harder.',
      'Your Google Business Profile is unverified or missing categories, so you never show for "near me" searches downtown.',
      'You get South-by-season traffic spikes but nothing that compounds the rest of the year.',
    ],
    whatWeDo: [
      'Austin-focused local SEO: Google Business Profile optimization, map-pack ranking, and NAP consistency across 50+ directories.',
      'Neighborhood and service-area pages (Downtown, South Congress, Round Rock, Cedar Park) so you rank for hyper-local intent.',
      'Technical SEO audit — schema markup, Core Web Vitals, internal linking, and crawl fixes that unlock stuck rankings.',
      'AI search (GEO) so your Austin business gets cited when people ask ChatGPT and Google AI Overviews for recommendations.',
      'Monthly ranking reports on your Austin money keywords with a clear 30-day action plan.',
    ],
    faq: [
      {
        q: 'How competitive is SEO in Austin?',
        a: 'Very. Austin has one of the fastest-growing small-business populations in the US, which means local keywords and the map pack are crowded. The upside is that most local competitors still have fixable technical and Google Business Profile gaps, so a business that gets the fundamentals right can move into the top three faster than in a slower market.',
      },
      {
        q: 'Do you only work with businesses inside Austin city limits?',
        a: 'No. We work with businesses across the greater Austin metro — Round Rock, Cedar Park, Pflugerville, Georgetown, San Marcos — and build service-area pages so you rank in every suburb you actually serve, not just the one your office sits in.',
      },
      {
        q: 'How long until an Austin business sees SEO results?',
        a: 'Google Business Profile and map-pack improvements often show within 2–4 weeks. Organic ranking movement on competitive Austin keywords usually appears at 60–90 days and compounds over six months as reviews, citations, and content accumulate.',
      },
    ],
    stats: [
      { label: '46%', text: 'of all Google searches have local intent — the core of Austin buyer demand.' },
      { label: '76%', text: 'of people who search for something nearby visit a business within a day.' },
      { label: 'Top 3', text: 'map-pack listings capture the large majority of local clicks in dense metros like Austin.' },
    ],
  },

  miami: {
    slug: 'seo-in-miami',
    city: 'Miami',
    title: 'SEO Company in Miami, FL — Local & Bilingual SEO | RankFrame SEO',
    metaDescription:
      'Miami SEO services for local, e-commerce, and AI-search visibility. Rank in the Miami map pack in English and Spanish, get cited by ChatGPT, and grow organic traffic. Pick your services — reply in 2–6 hours.',
    h1: 'SEO Company in Miami, FL',
    subhead:
      'Miami is a bilingual, high-turnover market where local search decides who gets the call. We help Miami businesses rank in the map pack and organic results — in English and Spanish — with one-on-one, service-based SEO.',
    painPoints: [
      'You rank for English keywords but disappear the moment a customer searches in Spanish.',
      'Seasonal and tourist traffic swings hard, and your rankings never build a stable base.',
      'Competitors in Brickell and Coral Gables own the map pack for the searches that actually convert.',
      'Your listings show inconsistent addresses across directories, so Google won\'t trust your location.',
    ],
    whatWeDo: [
      'Miami local SEO: Google Business Profile optimization, map-pack ranking, and NAP cleanup across 50+ directories.',
      'Bilingual (English + Spanish) on-page optimization and hreflang so you rank for both language markets.',
      'Neighborhood pages (Brickell, Coral Gables, Wynwood, Miami Beach) targeting hyper-local buyer intent.',
      'Technical SEO and schema so Google and AI engines can parse your site and surface it in results.',
      'AI search (GEO) so Miami customers asking ChatGPT for recommendations find your business.',
    ],
    faq: [
      {
        q: 'Do you do SEO in Spanish for the Miami market?',
        a: 'Yes. A large share of Miami search happens in Spanish. We optimize on-page content for both languages and implement hreflang so Google serves the right version to each audience — which most local competitors skip entirely, leaving an open lane.',
      },
      {
        q: 'Which Miami areas do you cover?',
        a: 'The full metro — Brickell, Downtown, Coral Gables, Wynwood, Miami Beach, Doral, Kendall and beyond. We build service-area and neighborhood pages so you rank in each district you serve.',
      },
      {
        q: 'How long until a Miami business sees results?',
        a: 'Map-pack and Google Business Profile gains often appear within 2–4 weeks. Competitive organic keywords typically move at 60–90 days and compound over six months.',
      },
    ],
    stats: [
      { label: '2 of 3', text: 'Miami-area residents speak a language other than English at home — bilingual SEO is a real edge.' },
      { label: '46%', text: 'of Google searches are local — the searches that drive Miami foot traffic and calls.' },
      { label: '78%', text: 'of local mobile searches lead to an offline purchase or booking.' },
    ],
  },

  'los-angeles': {
    slug: 'seo-in-los-angeles',
    city: 'Los Angeles',
    title: 'SEO Company in Los Angeles, CA — Local & Technical SEO | RankFrame SEO',
    metaDescription:
      'Los Angeles SEO services for local, e-commerce, and AI-search visibility. Rank in the LA map pack across a sprawling metro, get cited by ChatGPT, and grow organic traffic. Pick your services — reply in 2–6 hours.',
    h1: 'SEO Company in Los Angeles, CA',
    subhead:
      'Los Angeles is not one market — it is dozens of neighborhoods with their own search behavior. We help LA businesses rank in the map pack across every area they serve, in organic results, and in AI answers.',
    painPoints: [
      'You rank in your home neighborhood but vanish two zip codes over, where half your customers actually are.',
      'LA keywords are brutally competitive and national brands outspend you on ads.',
      'Your single "Los Angeles" page tries to rank for a metro of 10 million people and ranks for none of it.',
      'Reviews are strong but your Google Business Profile is thin, so you miss the map pack.',
    ],
    whatWeDo: [
      'LA local SEO: Google Business Profile optimization, map-pack ranking, and citation consistency across the metro.',
      'Neighborhood pages (Santa Monica, Pasadena, Downtown, the Valley, West LA) so you rank in every area you serve.',
      'Technical SEO audit — schema, Core Web Vitals, internal linking, crawl-budget fixes for large or aging sites.',
      'AI search (GEO) so your LA business is cited by ChatGPT, Perplexity, and Google AI Overviews.',
      'Monthly ranking reports segmented by neighborhood so you see exactly where you\'re winning.',
    ],
    faq: [
      {
        q: 'How do you handle how spread out Los Angeles is?',
        a: 'One city page can\'t rank across a metro this large. We build dedicated neighborhood and service-area pages — Santa Monica, Pasadena, the Valley, West LA, Downtown — each with local schema and content, so you show up in the specific areas your customers search from.',
      },
      {
        q: 'Can you compete with national brands spending on LA ads?',
        a: 'Yes — in organic and the map pack, where ad budgets don\'t apply. National brands often have generic local pages and weak Google Business Profiles per location. A focused local business with tight technical SEO and real reviews regularly outranks them in the map pack.',
      },
      {
        q: 'How long until an LA business sees results?',
        a: 'Map-pack gains often show in 2–4 weeks. Competitive LA organic keywords typically move at 60–90 days and compound over six months.',
      },
    ],
    stats: [
      { label: '10M+', text: 'people across the LA metro — winning it means ranking neighborhood by neighborhood.' },
      { label: '46%', text: 'of Google searches have local intent.' },
      { label: 'Top 3', text: 'map-pack results earn the large majority of local clicks — the only game worth playing locally.' },
    ],
  },

  'new-york': {
    slug: 'seo-in-new-york',
    city: 'New York',
    title: 'SEO Company in New York City — Local & Technical SEO | RankFrame SEO',
    metaDescription:
      'New York City SEO services for local, e-commerce, and AI-search visibility. Rank in the NYC map pack borough by borough, get cited by ChatGPT, and grow organic traffic. Pick your services — reply in 2–6 hours.',
    h1: 'SEO Company in New York City',
    subhead:
      'NYC is the most competitive local search market in the country, and it is really five markets. We help New York businesses rank in the map pack borough by borough, in organic results, and in AI answers.',
    painPoints: [
      'You rank in Manhattan but nowhere in Brooklyn or Queens, where your growth actually is.',
      'Every NYC keyword is contested by dozens of well-funded competitors.',
      'Your Google Business Profile lists one location, so you miss "near me" searches a few blocks away.',
      'You\'re paying premium PPC rates for clicks that stop the second the budget does.',
    ],
    whatWeDo: [
      'NYC local SEO: Google Business Profile optimization, map-pack ranking, and citation consistency across the five boroughs.',
      'Borough and neighborhood pages (Manhattan, Brooklyn, Queens, the Bronx, Staten Island) targeting local intent.',
      'Technical SEO audit — schema, Core Web Vitals, internal linking, and crawl fixes for competitive markets.',
      'AI search (GEO) so your NYC business gets cited by ChatGPT, Perplexity, and Google AI Overviews.',
      'Monthly ranking reports by borough so you know exactly where you stand.',
    ],
    faq: [
      {
        q: 'How do you rank a business across all five boroughs?',
        a: 'We treat each borough — and often each neighborhood — as its own market, with dedicated pages, local schema, and Google Business Profile signals. Trying to rank a single "New York" page across the whole city is the most common reason NYC businesses stall.',
      },
      {
        q: 'Is SEO worth it in a market this competitive?',
        a: 'Precisely because it is competitive. NYC PPC is among the most expensive in the world, so durable organic and map-pack rankings are worth far more here than in an average market. The businesses that invest in technical and local SEO compound an advantage competitors can\'t buy overnight.',
      },
      {
        q: 'How long until a NYC business sees results?',
        a: 'Map-pack improvements often appear in 2–4 weeks. Competitive NYC organic keywords typically move at 60–90 days and compound over six months.',
      },
    ],
    stats: [
      { label: '5', text: 'boroughs — each effectively its own local search market to win.' },
      { label: '46%', text: 'of Google searches carry local intent.' },
      { label: '#1', text: 'NYC ranks among the most expensive PPC markets, which makes organic rankings especially valuable.' },
    ],
  },

  chicago: {
    slug: 'seo-in-chicago',
    city: 'Chicago',
    title: 'SEO Company in Chicago, IL — Local & Technical SEO | RankFrame SEO',
    metaDescription:
      'Chicago SEO services for local, e-commerce, and AI-search visibility. Rank in the Chicago map pack across the city and suburbs, get cited by ChatGPT, and grow organic traffic. Pick your services — reply in 2–6 hours.',
    h1: 'SEO Company in Chicago, IL',
    subhead:
      'Chicago blends dense city neighborhoods with a huge suburban ring, and local search behaves differently in each. We help Chicagoland businesses rank in the map pack, organic results, and AI answers.',
    painPoints: [
      'You rank in the Loop but not in the neighborhoods or suburbs where your customers live.',
      'Suburban competitors outrank you for the searches that bring in the highest-value jobs.',
      'Your Google Business Profile is missing categories and photos, so you never hit the map pack.',
      'Winter seasonality swings your traffic and your rankings never build a base.',
    ],
    whatWeDo: [
      'Chicago local SEO: Google Business Profile optimization, map-pack ranking, and NAP consistency across directories.',
      'Neighborhood and suburb pages (Loop, Lincoln Park, Naperville, Evanston, Oak Park) for hyper-local intent.',
      'Technical SEO audit — schema, Core Web Vitals, internal linking, and crawl fixes that unlock rankings.',
      'AI search (GEO) so your Chicago business is cited by ChatGPT and Google AI Overviews.',
      'Monthly ranking reports across city and suburban keywords with a 30-day action plan.',
    ],
    faq: [
      {
        q: 'Do you cover the Chicago suburbs too?',
        a: 'Yes. Chicagoland is huge, and the highest-value searches often come from the suburbs — Naperville, Schaumburg, Evanston, Oak Park and beyond. We build service-area pages so you rank in every community you serve, not just downtown.',
      },
      {
        q: 'How competitive is Chicago SEO?',
        a: 'Chicago is competitive downtown and in popular neighborhoods, but many suburban markets are still winnable quickly for a business with solid technical SEO and a well-optimized Google Business Profile.',
      },
      {
        q: 'How long until a Chicago business sees results?',
        a: 'Map-pack gains often appear in 2–4 weeks. Competitive organic keywords usually move at 60–90 days and compound over six months.',
      },
    ],
    stats: [
      { label: '9.5M', text: 'people across Chicagoland — a metro won neighborhood by neighborhood and suburb by suburb.' },
      { label: '46%', text: 'of Google searches have local intent.' },
      { label: '78%', text: 'of local mobile searches result in an offline purchase or booking.' },
    ],
  },

  denver: {
    slug: 'seo-in-denver',
    city: 'Denver',
    title: 'SEO Company in Denver, CO — Local & Technical SEO | RankFrame SEO',
    metaDescription:
      'Denver SEO services for local, e-commerce, and AI-search visibility. Rank in the Denver map pack across the Front Range, get cited by ChatGPT, and grow organic traffic. Pick your services — reply in 2–6 hours.',
    h1: 'SEO Company in Denver, CO',
    subhead:
      'Denver is a fast-growing Front Range market where new businesses arrive constantly and local search keeps getting more competitive. We help Denver businesses rank in the map pack, organic, and AI answers.',
    painPoints: [
      'New businesses keep entering Denver and pushing you down the local results.',
      'You rank in central Denver but not in Boulder, Aurora, or Lakewood where you also work.',
      'Your Google Business Profile is thin, so you miss the map pack for "near me" searches.',
      'You\'ve tried ads, but the cost per lead keeps climbing as the market grows.',
    ],
    whatWeDo: [
      'Denver local SEO: Google Business Profile optimization, map-pack ranking, and citation consistency.',
      'Front Range service-area pages (Boulder, Aurora, Lakewood, Centennial, Fort Collins) for local intent.',
      'Technical SEO audit — schema, Core Web Vitals, internal linking, and crawl fixes.',
      'AI search (GEO) so your Denver business is cited by ChatGPT and Google AI Overviews.',
      'Monthly ranking reports on your Denver-area money keywords with a clear action plan.',
    ],
    faq: [
      {
        q: 'How fast-moving is the Denver SEO market?',
        a: 'Denver is one of the faster-growing metros in the US, so local competition rises every quarter. That makes getting your technical SEO and Google Business Profile right early a real advantage — you build authority before newer competitors do.',
      },
      {
        q: 'Do you cover the wider Front Range?',
        a: 'Yes. Beyond Denver proper we build service-area pages for Boulder, Aurora, Lakewood, Centennial, Fort Collins and more, so you rank across the markets you actually serve.',
      },
      {
        q: 'How long until a Denver business sees results?',
        a: 'Map-pack gains often show in 2–4 weeks. Competitive organic keywords typically move at 60–90 days and compound over six months.',
      },
    ],
    stats: [
      { label: '46%', text: 'of Google searches have local intent — the core of Front Range demand.' },
      { label: '76%', text: 'of nearby searches lead to a business visit within a day.' },
      { label: 'Top 3', text: 'map-pack listings capture the majority of local clicks in growing metros like Denver.' },
    ],
  },
};

export function getCityBySlug(slug) {
  const key = Object.keys(cities).find((k) => cities[k].slug === slug);
  return key ? cities[key] : null;
}
