// Industry × City cross landing pages — e.g. "SEO for Restaurants in Miami".
// These target the highest-value local queries where a service + a city combine
// into real buyer intent ("dentist seo austin", "restaurant seo miami").
//
// Pages are COMPOSED from the niche (service) and city (market) datasets rather
// than hand-written, but each page gets genuinely local, non-duplicated parts:
// a unique title/H1/subhead/meta, a mix of industry + city pain points, a
// city-specific FAQ, and the city's local stats. Only local-intent industries
// are crossed — national verticals (e-commerce, SaaS, restricted) are excluded
// because "in [city]" adds no search intent for them.

import { niches } from './niches.js';
import { cities } from './cities.js';

// Industries with genuine "in [city]" local intent.
const LOCAL_NICHES = ['dentists', 'restaurants', 'lawfirms', 'realestate', 'contractors'];

// Display + search metadata per crossed industry.
const NICHE_META = {
  dentists: {
    label: 'Dentists',
    businessType: 'dental practices',
    nearMe: '"dentist near me"',
    localPain: (city) =>
      `Patients search "dentist near me" all over ${city}, but your practice only shows up if the map pack and your Google Business Profile are dialed in.`,
  },
  restaurants: {
    label: 'Restaurants',
    businessType: 'restaurants and cafes',
    nearMe: '"restaurants near me"',
    localPain: (city) =>
      `Hungry customers in ${city} decide from the map pack and photos in seconds — if your listing is thin, you lose the table before they ever see your menu.`,
  },
  lawfirms: {
    label: 'Law Firms',
    businessType: 'law firms and attorneys',
    nearMe: '"[practice area] lawyer near me"',
    localPain: (city) =>
      `${city} legal keywords are among the most expensive in search, and firms with better local SEO take the high-value cases before you’re even seen.`,
  },
  realestate: {
    label: 'Real Estate',
    businessType: 'real estate agents and brokers',
    nearMe: '"homes for sale in [neighborhood]"',
    localPain: (city) =>
      `Buyers and sellers in ${city} search by neighborhood, but portals and bigger brokerages outrank you for the local terms that generate leads.`,
  },
  contractors: {
    label: 'Contractors',
    businessType: 'contractors and home-service businesses',
    nearMe: '"[trade] near me"',
    localPain: (city) =>
      `${city} homeowners call whoever shows up first for "[trade] near me" — and right now that’s a competitor sitting in the map pack instead of you.`,
  },
};

function buildCross(nicheKey, cityKey) {
  const n = niches[nicheKey];
  const c = cities[cityKey];
  const meta = NICHE_META[nicheKey];
  const label = meta.label;
  const city = c.city;
  const nicheNoun = n.slug.replace(/^seo-for-/, '');
  const cityNoun = c.slug.replace(/^seo-in-/, '');
  const slug = `seo-for-${nicheNoun}-in-${cityNoun}`;

  return {
    slug,
    city,
    label,
    nicheKey,
    cityKey,
    title: `SEO for ${label} in ${city} — Local SEO Service | RankFrame SEO`,
    metaDescription:
      `Local SEO for ${meta.businessType} in ${city}. Rank in the ${city} Google map pack, win ${meta.nearMe} searches, and turn local search into new customers. Pick your services — reply in 2–6 hours.`,
    h1: `SEO for ${label} in ${city}`,
    subhead:
      `Local SEO built for ${meta.businessType} in ${city} — we get you into the ${city} map pack, rank your service pages, and make you the obvious choice when locals search ${meta.nearMe}.`,
    // Two industry pain points + one city-specific + one local-market pain — unique per combo.
    painPoints: [
      meta.localPain(city),
      n.painPoints[0],
      c.painPoints[2] || c.painPoints[0],
      n.painPoints[2] || n.painPoints[1],
    ],
    // Real services (shared industry playbook) with a city-scoped lead line.
    whatWeDo: [
      `${city}-focused Google Business Profile optimization and map-pack ranking so you show up for local "near me" searches.`,
      ...n.whatWeDo.slice(1),
    ],
    faq: [
      {
        q: `How long until ${label.toLowerCase()} in ${city} see SEO results?`,
        a: `Google Business Profile and ${city} map-pack improvements often show within 2–4 weeks. Competitive organic rankings for ${meta.businessType} usually move at 60–90 days and compound over six months as reviews, citations, and content build up.`,
      },
      {
        q: `Do you only work with ${label.toLowerCase()} inside ${city} proper?`,
        a: `No. We build service-area pages so you rank across the greater ${city} metro and every neighborhood or suburb you actually serve, not just your immediate zip code.`,
      },
      {
        q: `What makes local SEO different for ${meta.businessType} in ${city}?`,
        a: `Local search is decided by proximity, your Google Business Profile, reviews, and citation consistency far more than a national site. We tune all of those for the ${city} market alongside the technical and content work that lifts your organic rankings.`,
      },
    ],
    stats: c.stats,
  };
}

export const crosses = {};
for (const nicheKey of LOCAL_NICHES) {
  for (const cityKey of Object.keys(cities)) {
    crosses[nicheKey + '__' + cityKey] = buildCross(nicheKey, cityKey);
  }
}

export const LOCAL_NICHE_KEYS = LOCAL_NICHES;

export function getCrossBySlug(slug) {
  const key = Object.keys(crosses).find((k) => crosses[k].slug === slug);
  return key ? crosses[key] : null;
}

// Given a city key, return the cross-page entries for that city (for internal links).
export function crossesForCity(cityKey) {
  return LOCAL_NICHES.map((nk) => crosses[nk + '__' + cityKey]).filter(Boolean);
}

// Given a niche key, return the cross-page entries for that industry across cities.
export function crossesForNiche(nicheKey) {
  return Object.keys(cities)
    .map((ck) => crosses[nicheKey + '__' + ck])
    .filter(Boolean);
}
