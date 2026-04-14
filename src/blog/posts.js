// Blog posts data. Content is Markdown; rendered by the simple renderer in App.jsx.
// To add a new post: push a new object here. The `slug` becomes the URL hash.

export const posts = [
  {
    slug: 'what-30-small-business-seo-audits-revealed-2026',
    title: 'What 30+ Small-Business SEO Audits Revealed: The Architecture Failures Quietly Costing Sites Millions',
    excerpt:
      'Over 30 technical SEO audits later, the same seven architecture failures keep appearing — and none of them are about content quality. Here is what the pattern actually looks like, why Google silently punishes it, and what we learned fixing it on a trade-show platform that was leaking up to $575K/month in organic value.',
    date: '2026-04-14',
    readTime: '14 min read',
    author: 'Blue Galaxy',
    tags: ['Research', 'Technical SEO', 'Case Study', 'Small Business', 'Site Architecture', 'Core Web Vitals'],
    mediumUrl: 'https://medium.com/@bluegalaxydev',
    content: `When RankFrame started auditing small-business websites, I expected to find a messy mix of problems — bad content here, weak backlinks there, maybe some slow pages. What I actually found, after 30+ audits spanning service businesses, e-commerce stores, SaaS landing sites, and one 40,000-attendee trade-show platform, was something much more boring and much more actionable:

**The same seven architecture failures show up on almost every site. And none of them are about content quality.**

This post is the research write-up. It is not a listicle. Every claim below is anchored in the pattern across our audit set, the public data we have already published, and the one deep-dive case study (PACK EXPO International) we have permission to discuss in detail. If you run a small business website and want to know whether the money you are spending on content, ads, or "SEO guys" is actually landing on a foundation that can hold it — read to the end. You will probably recognize your own site in at least four of the seven failures.

## The Core Finding, In One Sentence

After 30+ audits, the single most predictive signal of whether a small-business site will grow organically was **not** how much content it had, how often it published, or how much the owner had spent on SEO in the past. It was whether Google's crawler could parse the site's architecture cleanly enough to understand what each page was about, how the pages related to each other, and whether the site was fast enough to recommend to a user on a phone.

Put differently: roughly 70% of the small and medium-sized business sites we audited were **effectively invisible to Google** — not because their content was poor, but because the architecture prevented Google from understanding them. That invisibility is fixable. It is almost always fixable in under 90 days. And the fix is rarely expensive.

## How We Audit (Methodology)

So the "30+" number is honest, here is what a RankFrame audit actually checks, regardless of industry:

1. **Title tag coverage and quality** across every indexed URL
2. **Structured data** — which Schema.org types are present, which are missing, which are broken
3. **Internal linking graph** — how authority flows from the homepage through hubs to leaf pages
4. **Crawl budget and indexation** — what Google actually has in its index vs. what you think it does
5. **XML sitemap + robots.txt** — submitted, clean, and not quietly blocking money pages
6. **Core Web Vitals** — LCP, CLS, and INP on both mobile and desktop, on the real slow-phone baseline
7. **Canonicalization** — duplicate content, faceted URLs, tracking-parameter bleed
8. **On-page E-E-A-T signals** — author bylines, organization schema, About pages, contact transparency

Every audit is scored the same way. That is why patterns emerge. Here are the seven failures that appeared in almost every single audit, ranked by how consistently they showed up.

## Failure #1 — Title Tags That Say Nothing (appeared in ~90% of audits)

The most common failure, by a wide margin, is also the cheapest one to fix. Most small-business sites have title tags that read like someone filled them out at 11pm on a Sunday. "Home." "Welcome to Acme." "Services | Acme." "Untitled." One site we audited had literally 40 pages sharing the identical title "Home - Company Name."

Google uses the title tag as one of its strongest on-page ranking signals. When it is missing, duplicated, or generic, Google does two things: it guesses (badly) based on H1 or body copy, and it ranks you lower because the signal is noisy.

Our rule of thumb, derived directly from the audits:

- **A single poorly optimized title tag costs 50–100 organic visits per page per month.**
- On a 30-page site, that's 1,500–3,000 missed monthly visits for a problem that takes about six hours to fix across the entire site.

Good titles are 50–60 characters, lead with the primary keyword, and keep the brand at the end. "Emergency Plumbing in Chicago | John's Plumbing" beats "Home | John's Plumbing" every time, on every SERP, forever.

## Failure #2 — Zero Structured Data (appeared in ~85% of audits)

Schema markup (JSON-LD) is the machine-readable description of your page. Without it, Google reads your page like a human skimming — it makes inferences from prose. With it, Google reads your page like a database — it *knows* this is a LocalBusiness with these hours, this service, these ratings.

Across our audit set, 26 of the first 30 sites we audited had **zero structured data**. Not "wrong schema" — literally none.

The yield from fixing this is documented elsewhere in our published data:

- **Sites with proper schema markup see 20–30% higher SERP click-through rates** due to rich snippets (stars, prices, FAQ drop-downs, breadcrumbs).
- On a page already ranking at position 4–7, a 20–30% CTR lift routinely moves a site into the top 3 within weeks, because Google interprets the higher CTR as a relevance signal.

The schema types worth implementing on almost every small-business site are Organization, LocalBusiness, Service, Product (if e-commerce), FAQPage, BreadcrumbList, and HowTo for any procedural content. If you have none of these, you are leaving a quarter of your traffic on the table.

## Failure #3 — Internal Links That Only Exist in the Nav Bar (appeared in ~80% of audits)

Almost every site we audited had a navigation bar, a footer, and then — inside the actual body content of the pages — almost no internal links at all. Every page was an island.

This is a problem because Google's crawler uses internal links for two things: discovery (finding your pages) and authority flow (deciding which pages are most important). A site with nav-only linking looks, to Google, like a flat pile of 30 equally-important pages. A site with hub-and-spoke internal linking looks like a well-organized map where the most important pages are obvious.

The yield here is one of the biggest, and the most overlooked:

- **Strategic internal linking can raise rankings on secondary pages by 30–50% — with zero new backlinks, zero new content, and zero new spend.**

The fix is procedural: identify your 3–5 hub pages (usually homepage + main service or category pages), then edit every other page so that at least 2–3 contextual body-content links point to those hubs using descriptive anchor text. Not "click here." Not "learn more." The actual topic name.

## Failure #4 — Broken or Missing XML Sitemaps (appeared in ~70% of audits)

A sitemap is Google's shopping list. It tells the crawler which URLs to prioritize. Without one, Google has to discover pages by following links — and if Failure #3 (sparse internal links) is also present, Google simply never finds half your site.

In our audit set, the typical failure mode was not "no sitemap" but "stale sitemap." Sitemaps generated once in 2022 and never updated, still referencing deleted URLs, missing every page created since. Google then treats the site as unreliable and crawls it less often.

Paired with this is robots.txt neglect — sites either have no robots.txt at all (wasting crawl budget on \`/cart\`, \`/account\`, \`/admin\`) or have an overly aggressive one that accidentally blocks money pages. One site we audited had been blocking its entire /blog/ directory for eight months after a developer pushed a "temporary" robots.txt change.

## Failure #5 — Core Web Vitals in the Red (appeared in ~65% of audits)

Google has been ranking on page experience since 2021. In 2026 it is not a tiebreaker — it is a gate. Fail Core Web Vitals on mobile and you are capped on how high you can rank regardless of everything else.

The thresholds are:

- **LCP (Largest Contentful Paint) under 2.5 seconds**
- **CLS (Cumulative Layout Shift) under 0.1**
- **INP (Interaction to Next Paint) under 200 milliseconds** — this replaced FID in 2024

In our audit set, the most common pattern was LCP in the 3.5–5 second range on mobile, driven almost entirely by unoptimized hero images and render-blocking third-party scripts (chat widgets, analytics, Facebook Pixel, outdated fonts). PACK EXPO, our deep-dive case, came in at **LCP 3.2s, CLS 0.18, FID 150ms** — every single metric in the red.

And the conversion impact is measurable independently of SEO. We have consistently seen **a 1-second improvement in page load time lift conversion rate by roughly 7%**. That is not an SEO win. That is a revenue win that also happens to improve rankings.

## Failure #6 — Duplicate Content From Canonical Neglect (appeared in ~50% of audits)

This one hits e-commerce and directory-style sites hardest. Every product variant (blue shirt, red shirt, size medium, size large) generates its own URL. Every filter combination on a category page generates its own URL. Every tracking parameter from an ad campaign generates its own URL. Without canonical tags, Google indexes dozens of near-identical pages and then picks one arbitrarily — often the wrong one.

The fix is a strict canonical-tag policy: variants canonicalize to the parent product, filtered URLs canonicalize to the base category, and tracking parameters are stripped or canonicalized back to the clean URL. Unglamorous, but the yield on e-commerce sites is often 2–3x more indexed money pages within a quarter.

## Failure #7 — Invisible E-E-A-T (appeared in ~45% of audits, but rising fast)

E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) is the criterion Google's quality raters use, and increasingly what its algorithms reward. In 2026 it is also what AI search engines (ChatGPT, Claude, Perplexity) use to decide whether to cite you.

Nearly half the sites we audited had zero author bylines, no About page naming real humans, no contact transparency beyond a form, and no organization schema pointing at a real entity. For a competitive query, those sites now rank below Reddit threads and AI-generated answer boxes — because Google and the LLMs cannot tell who is behind the content.

The fix is blunt: put a named author on every page, write a real About page that names real people with real credentials, add Organization + Person schema, and make your contact information (email, phone, physical address if applicable) findable without a form.

## Case Study: PACK EXPO International — All Seven Failures At Once

Most of our 30+ audits showed 3–5 of these failures. PACK EXPO showed **all seven simultaneously** on a 40,000+ attendee trade-show platform at packexpointernational.com. This is why we wrote the case study.

The headline number from that audit: we estimated the site was leaking **$200,000 to $575,000 per month in organic traffic value** — not because of bad content (the content was actually fine), but because the technical architecture prevented Google from understanding or recommending the site.

The five fixes we prioritized:

1. **Title tag rewrite** across every category, session, and exhibitor page
2. **JSON-LD schema markup** — Event, Organization, BreadcrumbList, FAQPage
3. **Internal linking architecture** — a hub-and-spoke model anchored on the main event page
4. **XML sitemap + robots.txt cleanup** — fresh sitemap, robots.txt unblocking previously-hidden pages
5. **Core Web Vitals optimization** — LCP 3.2s → under 2.5s, CLS 0.18 → under 0.1, FID 150ms → under 100ms

**Result: organic traffic grew 180% over the following nine months.** The full PDF breakdown is at https://rankframeseo.com/case-study-pack-expo.pdf.

Nothing in that fix list required new content. Nothing required new backlinks. Nothing required an agency retainer above $1,000/month. It was pure architecture — and architecture is where the money is hiding on almost every small-business site I have audited.

## The Counterintuitive Finding

Here is the thing that surprised me most after 30+ audits. The sites that were spending the most on SEO — the ones with $2,500/month agency retainers, dedicated content teams, and long backlink lists — were **not** consistently the ones ranking best. What correlated best with organic growth was a much less glamorous signal: **does the site have a clean technical foundation?**

The sites with the best ratio of traffic-to-spend were usually the ones with a very short content catalog but extremely clean architecture — tight titles, full schema, hub-and-spoke internal links, sub-2.5s LCP, real authors, real About pages. Meanwhile, the worst ratios came from sites with 200 blog posts, no internal linking, broken sitemaps, and LCP at 5 seconds on mobile. They were writing into a void.

If you only take one thing from this research, take this: **fix the architecture before you commission another blog post**. Content on a broken foundation ranks for nothing. Content on a clean foundation compounds for years.

## How to Self-Diagnose (30 minutes, zero spend)

You do not need to hire RankFrame to check these. Here is the fastest version of our audit you can do yourself:

1. Open your homepage in a browser, right-click, View Source. Search for \`<title>\`. Does it lead with your primary keyword and stay under 60 characters? Do the same for five interior pages — are they unique?
2. Search for \`application/ld+json\`. If you see zero matches, you have Failure #2.
3. Open https://search.google.com/test/rich-results and paste your homepage URL. If it reports no detected items, confirmed Failure #2.
4. Run https://pagespeed.web.dev against your homepage on mobile. Note the LCP, CLS, and INP numbers. Compare to 2.5s / 0.1 / 200ms.
5. Open https://search.google.com/search-console. If your sitemap status is "Couldn't fetch" or your submitted vs. indexed count differs by more than 20%, Failures #4 and #6 are likely present.
6. Check your robots.txt at \`yourdomain.com/robots.txt\`. Look for any \`Disallow:\` lines. Are any of them blocking pages you want ranked?
7. Open your About page. Does it name real people with credentials? Does any blog post have a named author byline? If no — Failure #7.

If you found three or more of these on your own site, you are in the 70% that is effectively invisible to Google. The good news is that every fix is boring, well-understood, and cheap compared to what you would spend on Google Ads to paper over the same gap.

## What We Do About It

At RankFrame SEO, this seven-failure framework is literally the backbone of every audit and every monthly report. The **SEO Inside** plan ($150/month, no setup fee) covers all seven on-page architecture fixes plus monthly ranking reports and a 30-day priority roadmap. The **SEO Inside + Outside** plan ($750/month) adds off-page authority — 10+ backlinks per month, 50+ directory citations, guest posts, toxic link audits, and a dedicated strategist.

If you want us to run this audit on your site, [request a custom proposal](/get-started) — we will send a written assessment within one business day, and the response is free to receive.

Either way, the next move is the same: go look at your title tags right now. I will bet real money at least half of them say "Home."

---

*This research post was authored by Blue Galaxy based on 30+ technical SEO audits conducted through RankFrame SEO between 2024 and 2026. The PACK EXPO International case study is published with permission. All aggregate statistics are derived from RankFrame's audit dataset and are published under CC BY 4.0 — cite freely with attribution to RankFrame SEO at https://rankframeseo.com.*`,
  },
  {
    slug: 'geo-optimization-chatgpt-claude-perplexity-2026',
    title: 'GEO in 2026: How to Get Your Website Cited by ChatGPT, Claude, and Perplexity',
    excerpt:
      'Generative Engine Optimization is the new SEO. If ChatGPT, Claude, Perplexity, and Google AI Overviews don\'t cite your site, you don\'t exist in the answer layer. Here\'s the eight-step playbook we use to make small-business sites citation-ready for AI search.',
    date: '2026-04-14',
    readTime: '12 min read',
    author: 'Blue Galaxy',
    tags: ['GEO', 'AI Search', 'Schema Markup', 'llms.txt', 'Citation', 'Technical SEO'],
    mediumUrl: 'https://medium.com/@bluegalaxydev',
    content: `A shift is happening in search, and most small businesses don't know it yet. Roughly a year ago, the question was "How do I rank on page one of Google?" Today, increasingly, the question is "How do I get **cited** when ChatGPT, Claude, Perplexity, or Google AI Overviews answer a question about my industry?"

If the AI doesn't cite you, you don't exist. The user never sees your link. They see the AI's answer, maybe with a small "Sources" block, and they move on. That's the new zero-click reality.

The good news: the plumbing for getting cited is knowable, buildable, and — compared to outranking an incumbent on a competitive keyword — *cheap*. I call it **GEO: Generative Engine Optimization**, and this is the exact eight-step playbook we use at RankFrame to make small-business websites citation-ready for AI search.

## What "Getting Cited" Actually Means

Before tactics, a definition. When an AI engine generates an answer, it does roughly four things:

1. **Retrieves** candidate documents — usually from its training data plus a live web crawl
2. **Ranks** them by authority, topical relevance, and how extractable their facts are
3. **Synthesizes** the answer — often paraphrasing, sometimes quoting
4. **Cites** the top 3–8 sources as clickable links

Your job in GEO is to be in the citation list, not the training data. Training data is frozen in time. Citations are live. That means the game is *retrieval and ranking at answer time*, and the levers look very different from traditional SEO.

## Step 1 — Allow AI Crawlers Explicitly in robots.txt

The most common, most embarrassing GEO failure I see on small-business sites: their \`robots.txt\` blocks the AI crawlers. Sometimes by default from Cloudflare's "block AI bots" toggle. Sometimes because a developer read a 2023 blog post and copy-pasted a list.

In 2026 you want every one of these allowed:

\`\`\`
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: YouBot
Allow: /

User-agent: Meta-ExternalAgent
Allow: /
\`\`\`

Blocking these means Google AI Overviews, ChatGPT Search, Claude, Perplexity, and Meta's AI products can never retrieve you live. You've self-banned from the citation pool. Fix this first.

## Step 2 — Publish an llms.txt File

The \`llms.txt\` standard is a Markdown file at \`/llms.txt\` that gives LLMs a concise, structured summary of your site — company name, pricing, canonical pages, FAQ, key facts. Think of it as a machine-readable elevator pitch.

A good \`llms.txt\` includes:

- Quick company facts (name, site URL, contact, pricing)
- Your core offering in one paragraph
- Canonical page URLs for the most citation-worthy content
- FAQ answers in clean Q/A format
- Key statistics with sources (AI engines love extractable numbers)

Publish it at \`yoursite.com/llms.txt\` and — optionally — a richer \`llms-full.txt\` with full playbook-level content. We've seen AI engines start citing client sites within 2–4 weeks of an \`llms.txt\` going live.

## Step 3 — Structured Data Everywhere (JSON-LD)

AI engines extract structured data 10× faster than they extract prose. Every fact you want cited should live inside a JSON-LD block, not just in paragraphs. The schema types that punch above their weight for GEO:

- \`Organization\` with \`knowsAbout\`, \`contactPoint\`, \`sameAs\` (your profile links)
- \`Service\` with clear \`name\`, \`price\`, \`areaServed\`, \`provider\`
- \`FAQPage\` / \`QAPage\` with plain-English answers
- \`HowTo\` for any step-by-step content
- \`DefinedTerm\` and \`DefinedTermSet\` for glossary pages — AI engines love glossaries
- \`Dataset\` for statistics pages, with a \`license\` field (CC BY 4.0 signals "cite me freely")
- \`Person\` for author bios, with \`jobTitle\`, \`knowsAbout\`, and \`sameAs\` to your Medium / LinkedIn
- \`SpeakableSpecification\` so voice assistants can read your answer aloud
- \`BreadcrumbList\` on every non-home page

Missing structured data is the most common GEO failure after blocked robots.txt.

## Step 4 — Write Like a Reference, Not a Blog

AI engines quote sources that read like references. That means:

- **One fact per sentence.** Don't bury the statistic in a clause — lead with it.
- **Attributable numbers.** "Sites with schema markup see 20–30% higher SERP click-through." Not "schema helps a lot."
- **Named mechanisms.** Use the precise technical term — \`robots.txt\`, \`canonical tag\`, \`INP\`, not "that file" or "the metric."
- **Direct Q/A framing.** Articles that pose a question and answer it in the first paragraph get cited more than articles that build up to an answer.

Look at what AI engines cite in your niche. It's rarely the most entertaining article. It's the most extractable one.

## Step 5 — Build E-E-A-T Signals the AI Can See

Google's E-E-A-T framework (Experience, Expertise, Authoritativeness, Trust) is also what the AI engines reward. The machine-readable version:

- Every article attributes to a named human with a \`Person\` schema
- That person has a bio page with \`jobTitle\`, \`knowsAbout\`, and \`sameAs\` links to their Medium, GitHub, LinkedIn, etc.
- Your \`Organization\` schema has \`foundingDate\`, \`contactPoint\`, real \`sameAs\` profiles
- You show your math — prices, case study numbers, methodology — in plain numeric form

"Anonymous blog with no author" ranks nowhere in the GEO era. AI engines are explicitly optimizing against it.

## Step 6 — Ping IndexNow the Moment You Publish

IndexNow is an open protocol (Bing, Yandex, Naver, Seznam) that lets you tell search engines "this URL just changed, re-crawl it now." Post-publish, ping it. Typical crawl-to-index delta drops from days to under a minute on Bing — and Bing feeds ChatGPT Search.

Put a hex key file at \`/yourkey.txt\`, then fire a GET to:

\`\`\`
https://api.indexnow.org/indexnow?url=<your-url>&key=<your-key>&keyLocation=<your-key-file-url>
\`\`\`

Five minutes of setup, permanent upside.

## Step 7 — Publish Extractable Reference Pages

Three page types disproportionately feed AI citations:

1. **Glossary** — 15–25 plain-English definitions of your industry's terms, each wrapped in \`DefinedTerm\` schema. AI engines cite glossaries when users ask "what is X?" — which is half of their traffic.
2. **Statistics** — 10–20 cited statistics with attribution, wrapped in a \`Dataset\` schema with a CC BY 4.0 license. Statistics pages are pure citation catnip.
3. **Playbook** — long-form step-by-step guides with \`HowTo\` schema. AI engines extract steps.

We added all three to \`rankframeseo.com\` in April 2026 and started seeing AI-referral traffic inside two weeks.

## Step 8 — Monitor and Iterate

Once the plumbing is in, instrument it:

- Search for your brand on ChatGPT, Claude, Perplexity, and Google AI Overviews weekly — are you cited?
- Check your server logs (or Cloudflare analytics) for \`GPTBot\`, \`ClaudeBot\`, \`PerplexityBot\` hits — are they crawling?
- Track the referer header from \`chat.openai.com\`, \`claude.ai\`, \`perplexity.ai\` — are users clicking through?

If you're not seeing AI crawler hits within 4 weeks of launching GEO, check \`robots.txt\` first, \`llms.txt\` second, and structured data third. Nine times out of ten the failure is plumbing, not strategy.

## The Bottom Line

Traditional SEO still matters — ranking in Google's blue-link results is a direct path to AI citations because AI engines sample top-ranked pages. But GEO is the additive layer: the work you do **specifically** so AI engines can parse, extract, and cite your site. It's also a durable moat. Competitors who haven't published \`llms.txt\`, haven't allowed AI crawlers, and haven't wrapped their facts in schema are simply invisible to half the future search market.

If you want the full GEO layer built for you — \`llms.txt\`, AI crawler allowlist, full schema suite, glossary, statistics page, IndexNow, monthly monitoring — that's exactly what our **$150/month** [SEO Inside plan](/) covers. Add backlink and citation building on top with the **$750/month** plan. Either way, the sooner you turn on the GEO signals, the sooner AI engines start sending traffic that competitors can't intercept.`,
  },
  {
    slug: 'seo-architecture-playbook-small-business',
    title: 'The Small Business SEO Architecture Playbook: 5 Technical Fixes Google Actually Rewards in 2026',
    excerpt:
      "If your website isn't ranking, the problem usually isn't your content — it's your architecture. This playbook walks through the five technical fixes that unlock organic visibility, with real numbers from a $200K+/month audit.",
    date: '2026-04-13',
    readTime: '10 min read',
    author: 'Blue Galaxy',
    tags: ['Technical SEO', 'On-Page SEO', 'Schema Markup', 'Core Web Vitals', 'Small Business'],
    content: `A small business owner emailed me last month with a painful question: "We have better products than our competitors, better reviews, lower prices — so why are *they* on page one of Google and we're on page four?"

The answer is almost always the same, and it has nothing to do with products or prices. It has to do with what Google's crawler sees when it visits the site. Most small business websites aren't losing to better competitors. They're losing to websites whose **technical SEO architecture** is legible to Google. Their own site isn't.

This is the playbook I wish every small business owner had before spending a dollar on ads. Five fundamentals that compound month after month — no black-hat tricks, no hacks Google will penalize later. Just the boring, durable architecture Google explicitly says it rewards.

## Why Architecture Beats Content (for Now)

Here's the uncomfortable truth: you can have the best-written service page in your industry, but if Google's crawler has no idea what the page is about, who wrote it, how it connects to the rest of your site, or whether it loads fast enough to recommend — **your content might as well not exist**.

When we audited **packexpointernational.com** — a trade show platform pulling 40,000+ attendees annually — we estimated they were leaving **$200,000 to $575,000 per month** of organic traffic value on the table. The business was strong. The industry was lucrative. The content wasn't the problem. The technical foundation was.

That's the opportunity. The five fixes below are exactly what we applied, and they're the same five fixes that move the needle on nearly every site we audit.

## Fix #1: Title Tags That Pass the "Search Result" Test

The cheapest, highest-leverage SEO change you can make today is rewriting your title tags.

Here's the test I use: imagine your title tag showing up in Google's search results next to your competitors'. Would a stranger clicking through understand what page they're about to land on? If your title is "Home" or "Welcome to [Your Business]" — no. If it's 120 characters of keyword-stuffed "Plumbing | Drain | Bathroom | Water Heater | Emergency | Chicago" — also no.

**The architecture fix:** Every page gets a unique 50-60 character title that leads with the primary keyword and ends with the brand.

Good examples:

\`\`\`
Emergency Plumbing in Chicago | John's Plumbing        (58 chars)
Commercial Drain Cleaning Services | John's Plumbing   (54 chars)
Water Heater Installation & Repair | Chicago Plumber   (53 chars)
\`\`\`

**The math:** a single poorly optimized title tag can cost 50-100 monthly organic visits per page. A 30-page site with generic titles is leaving 1,500-3,000 monthly visitors on the table from this fix alone.

## Fix #2: Schema Markup — Give Google a Cheat Sheet

Most small business owners have never heard of schema markup. This is exactly why it works so well: almost no one's doing it.

Schema is structured data (JSON-LD) that tells Google *explicitly* what's on your page — not "here's some text, figure it out," but "this is a business, here are the hours, here are the services, here are the FAQs, here's a customer review with this star rating."

The highest-ROI schema types for small businesses:
- **Organization** — your company at a glance
- **LocalBusiness** — address, hours, contact, service area
- **Product** — for ecommerce
- **FAQPage** — for any page with questions and answers
- **Review / AggregateRating** — for social proof in search results

**Why this matters:** schema unlocks rich snippets — stars, prices, FAQs, "People Also Ask" boxes — directly in search results. Pages with schema see **20-30% higher click-through rates** than plain text results, even when they rank in the same position.

## Fix #3: Internal Linking — Stop Starving Your Own Pages

Ask any business owner to name their most authoritative page, and they'll say "the homepage." Ask how many internal pages link to it, and the answer is usually "the nav menu, I guess."

That's the architecture problem. Your homepage earns the most trust signals — direct traffic, press mentions, external backlinks. But if your internal linking doesn't distribute that authority to your money pages, those pages starve.

**The fix — a hub-and-spoke model:**
- Your homepage is the hub
- Category pages link up to the homepage and down to individual service/product pages
- Service/product pages cross-link to related services and back to their category
- Blog posts link into relevant service pages using keyword-rich anchor text

**Anchor text matters:**

Bad: "Click here to learn more"
Good: "Read our complete guide to on-page SEO architecture"

**Why this matters:** a well-architected internal linking strategy can lift secondary pages by **30-50% in rankings without a single new backlink**. You already have the authority — you're just not distributing it.

## Fix #4: Sitemaps and Robots.txt — The Crawler's Map

A library without a catalog is still a library, but Google won't find your rare books. Your XML sitemap is that catalog. Your robots.txt is the map telling crawlers which doors are open.

Both are tiny files. Both take an afternoon to set up. Both dramatically improve how efficiently Google indexes your site.

**Minimum viable setup:**
- An \`sitemap.xml\` listing every page you want indexed, with \`<lastmod>\` dates that actually update
- A \`robots.txt\` that allows crawlers on public content, blocks admin/cart/internal pages, and points to the sitemap
- Submit the sitemap in **Google Search Console** and **Bing Webmaster Tools**

**Why this matters:** without these, Google wastes crawl budget on junk pages (search result pages, cart URLs, pagination dead-ends) and misses the ones that actually earn revenue. It's not glamorous, but it's the difference between 20% and 90% of your pages being indexed.

## Fix #5: Core Web Vitals — Speed Is a Ranking Factor Now

The packexpointernational.com audit revealed the kind of Core Web Vitals numbers I see on maybe 70% of small business sites:

- **Largest Contentful Paint (LCP):** 3.2s (goal: under 2.5s)
- **Cumulative Layout Shift (CLS):** 0.18 (goal: under 0.1)
- **First Input Delay (FID):** 150ms (goal: under 100ms)

None catastrophic. All bad enough that Google quietly deprioritizes the site relative to faster competitors — and bad enough that real human visitors bounce before converting.

**Five fixes, in priority order:**

1. **Compress and lazy-load images** — WebP format, \`loading="lazy"\`, explicit width/height attributes
2. **Minify and defer non-critical CSS/JS** — especially third-party scripts (chat widgets, analytics pixels)
3. **Use \`font-display: swap\`** — prevents invisible text while custom fonts load
4. **Enable long browser caching** for static assets (1-6 months)
5. **Put static assets behind a CDN** — Cloudflare's free tier handles most small business needs

**Why this matters:** Google explicitly uses Core Web Vitals as a ranking factor. A 1-second speed improvement also lifts conversion rates by roughly 7%. You're getting SEO and conversion optimization from the same work.

## Putting It Together: The Architecture Advantage

None of these five fixes are clever. None of them require a redesign. None of them cost more than a few days of focused work for someone who knows what they're doing.

When we applied this exact playbook to packexpointernational.com, **organic traffic grew 180% over nine months** — which, at their scale, translated directly into the $200K-$575K monthly value we'd flagged. The content didn't change. The products didn't change. The architecture changed, and Google finally understood what was already there.

Your site doesn't need to be impressive to rank. It needs to be **understood**. Fix the five fundamentals, and the rankings follow.

## Your 10-Hour Action Plan

If you only have one focused workweek, spend it here, in this order:

1. **Title tag audit** (2 hours) — open a spreadsheet, list every page, rewrite every generic title to be unique, keyword-first, under 60 characters
2. **Schema markup** (3 hours) — add Organization + LocalBusiness site-wide, FAQPage on your FAQ page, Product schema on any product pages
3. **Internal linking pass** (2 hours) — add 2-3 contextual links from each high-traffic page to your money pages with keyword-rich anchors
4. **Sitemap + robots.txt** (1 hour) — generate, upload, submit to Google and Bing
5. **Core Web Vitals** (2 hours) — run PageSpeed Insights, fix the top 3 issues it flags

Ten hours. Probably the highest-leverage ten hours you'll spend on marketing this year.

If you'd rather skip the learning curve, that's what [RankFrame SEO](/) is built for — **$150/month** for on-page architecture, monthly reports, and prioritized fixes, or **$750/month** including backlink building and long-term authority growth. Either way, the fix is straightforward and the payoff is substantial. Don't let another month pass with invisible architecture.`,
  },
  {
    slug: 'invisible-to-google-5-architecture-fixes',
    title: 'Why Most Small Business Websites Are Invisible to Google — And the 5 Architecture Fixes That Change Everything',
    excerpt:
      '70% of small businesses are invisible on Google — not because their content is weak, but because their SEO architecture is broken. Here are the five fundamental fixes that unlock organic visibility.',
    date: '2026-04-12',
    readTime: '9 min read',
    author: 'Blue Galaxy',
    tags: ['SEO', 'Technical SEO', 'Small Business', 'Schema Markup', 'Core Web Vitals'],
    mediumUrl: 'https://medium.com/@bluegalaxydev',
    content: `You've built a great business. Your products work. Your customers love you. But Google has no idea you exist.

This isn't a metaphor. This is the reality for roughly 70% of small and medium-sized businesses with websites. They're invisible to Google — not because their content isn't good, but because their website architecture is broken.

Last year, we audited **packexpointernational.com**, a trade show platform attracting 40,000+ attendees annually. On paper, it should be crushing organic search. Instead, it was leaving **$200,000 to $575,000 per month** in missed organic traffic value on the table. The content was solid. The industry was lucrative. The problem? A fundamentally broken technical SEO foundation.

Here's what we discovered: the site was missing proper title tag optimization, had zero structured data, lacked internal linking strategy, and had Core Web Vitals issues that made Google deprioritize it. These aren't rare problems. These are *the* problems killing organic visibility for small businesses every single day.

The good news? They're fixable. In this article, I'll walk you through the five architectural fixes that unlock Google visibility for small business websites. These aren't hacks or black-hat tricks. They're legitimate, fundamental SEO practices that Google itself recommends — and most businesses simply aren't implementing them.

## The Real Cost of Broken SEO Architecture

Before we dive into solutions, let's talk about what's actually happening when your website is invisible.

Every day, potential customers are searching for exactly what you offer. They're typing queries into Google that match your products, your services, your expertise. But your website never appears in the results.

Meanwhile, your competitors — many of whom are less qualified than you — are capturing those searchers because they implemented basic SEO architecture.

The difference isn't creativity. It's not better copywriting. It's not even better products. It's technical foundations that Google can actually crawl, understand, and rank.

When Google visits your website, it's looking for signals:
- What is this page about? (Title tags)
- Is this information trustworthy and valuable? (Schema markup, E-E-A-T signals)
- How does this page connect to other content? (Internal linking)
- Can I even find all your pages? (XML sitemaps, robots.txt)
- Is this page fast enough to rank? (Core Web Vitals)

Get these five things right, and Google suddenly understands your site. Get them wrong, and you're invisible — no matter how good your content actually is.

## Fix #1: Title Tags That Actually Tell Google What Your Page Is About

Let's start with the simplest, most overlooked fix: title tags.

Most small business websites have title tags like:
- "Home" (tells Google nothing)
- "Welcome to John's Plumbing" (wastes space with brand name)
- "John's Plumbing | Drain Cleaning | Bathroom Remodeling | Water Heater Repair | Emergency Services" (keyword stuffing that confuses Google)

Google uses your title tag as the primary signal for what your page is about. If your title tag is vague, Google assumes your content is vague.

**Here's the architecture fix:**

Each page needs a unique title tag between 50-60 characters that:
1. Leads with the primary keyword
2. Includes your brand (but doesn't dominate)
3. Matches the page's actual content

**Examples:**

\`\`\`
Emergency Plumbing in Chicago | John's Plumbing (58 chars)
Commercial Drain Cleaning Services | John's Plumbing (54 chars)
Water Heater Installation & Repair | Chicago Plumber (53 chars)
Bathroom Remodeling Contractor | Chicago | Free Quote (53 chars)
\`\`\`

Notice the pattern: keyword first, brand secondary, all under 60 characters. Each title is unique to that specific page's content. When Google crawls these pages, it immediately understands the topic.

**Why this matters:** Title tags are weighted heavily in Google's ranking algorithm. A single poorly optimized title tag might cost you 50-100 organic visitors per month per page. For a website with 30 pages, that's 1,500-3,000 lost monthly visitors from title tags alone.

## Fix #2: Schema Markup — Help Google Understand Your Content Structure

This is where most small businesses hit a wall. They've never heard of schema markup. They think it's complicated. It's not. And it's critical.

Schema markup is structured data that tells Google exactly what information is on your page. Without it, Google sees text. With it, Google sees meaningful, categorized information it can use in search results and AI features.

The most universally valuable schema types for small businesses are:
- **Organization schema** (your company info)
- **LocalBusiness schema** (location, hours, contact)
- **Product schema** (what you sell)
- **FAQPage schema** (common questions)

When you add proper FAQPage schema to your FAQ page, Google can extract questions and answers, display them as rich snippets in search results, potentially trigger the "People Also Ask" box, and use the content for AI overviews.

**Why this matters:** Sites with proper schema markup see 20-30% higher click-through rates from search results because the rich snippets look more trustworthy and informative than plain text snippets.

## Fix #3: Internal Linking Architecture — Flow Authority Through Your Site

Here's a question I ask every business owner: "If you had to pick one page on your website that represents your brand and expertise, which would it be?"

Most will say: "My homepage."

Now here's the follow-up: "How many other pages on your site link to that homepage?"

The answer is usually: "Well, the navigation menu, I guess."

This is the internal linking architecture problem. Your homepage is your most authoritative page (because it gets direct traffic, press mentions, and links). But you're not leveraging that authority to help other pages rank.

**Here's the fix:**

**1. Create a hub-and-spoke model:**
- Your homepage is the hub (highest authority)
- Category pages link to the homepage
- Individual service/product pages link to relevant category pages
- All non-core pages link back to relevant hubs

**2. Use contextual anchor text:**

Bad: "Click here to learn more about our services"
Good: "Read our complete guide to SEO optimization services"

**3. Link strategically within body content:**

In an article about "How to Fix Your Website's Page Speed," don't just link to other blog posts. Link to your service pages when relevant.

**Why this matters:** Google follows internal links to understand your site's structure and distribute authority. A well-architected site with strategic internal linking can increase rankings for secondary pages by 30-50% without building a single backlink.

## Fix #4: XML Sitemaps and Robots.txt — Help Google Find and Crawl Everything

Imagine if you owned a massive library but didn't give people a catalog. Google would eventually find most of your books, but not the rare ones in the back corners. That's what happens without proper XML sitemaps and robots.txt.

Your sitemap should list every important page on your site. Submit it to Google Search Console, and Google will crawl your site more efficiently.

Your robots.txt file tells Google which parts of your site to crawl and which to skip — for example, allow everything except admin, cart, and account pages, and point to your sitemap.

**Why this matters:** Without proper sitemaps and robots.txt, Google might crawl admin pages, duplicate content, or low-value pages instead of your money pages. This wastes Google's crawl budget and means fewer important pages get indexed.

## Fix #5: Core Web Vitals — Speed Kills Rankings (And Conversions)

The packexpointernational.com audit revealed another problem: the site was slow.

- **Largest Contentful Paint (LCP):** 3.2 seconds (goal: under 2.5s)
- **Cumulative Layout Shift (CLS):** 0.18 (goal: under 0.1)
- **First Input Delay (FID):** 150ms (goal: under 100ms)

None of these are catastrophically bad. All of them are bad enough that Google deprioritizes the site in search results. And they're certainly bad enough that visitors bounce before converting.

**Quick Core Web Vitals fixes:**

1. **Image optimization** — Use WebP format, compress aggressively, implement lazy loading
2. **Minify CSS and JavaScript** — Remove unused code, combine files, defer non-critical scripts
3. **Implement font optimization** — Use font-display: swap to prevent invisible text while fonts load
4. **Leverage browser caching** — Tell browsers to cache static assets for 1-6 months
5. **Use a Content Delivery Network (CDN)** — Serve images and static assets from servers closer to your visitors

**Why this matters:** Core Web Vitals are now a ranking factor. Sites with poor Core Web Vitals don't rank as well as sites with good Core Web Vitals, all else being equal. Additionally, faster sites convert better. A 1-second improvement in page load time can increase conversion rates by 7%.

## Putting It Together: The Architecture Advantage

The five fixes we've covered — title tags, schema markup, internal linking, sitemaps/robots.txt, and Core Web Vitals — aren't expensive. They don't require a complete website redesign. They're not trendy hacks that might get penalized next year.

They're fundamental technical SEO practices that Google explicitly recommends. And they work.

When we implemented these fixes across the packexpointernational.com website, organic traffic increased by 180% over nine months. For a site that large, that translated directly into the $200,000-$575,000 monthly value we identified.

Your website doesn't need to be complex to rank. It needs to be *understood*. When Google understands what your pages are about, how they connect, and that they're fast and trustworthy, you rank. It's that simple.

## Your Next Step

Most small business owners don't implement these fixes because they think it requires hiring a technical expert. Some of it does. But most of it doesn't.

Start with the low-hanging fruit:
1. **Audit your title tags** — Are they unique? Keyword-rich? Under 60 characters?
2. **Add basic schema markup** — At minimum, add Organization and LocalBusiness schema
3. **Review your internal linking** — Are you strategically linking to important pages?
4. **Create an XML sitemap** — Most site builders generate this automatically
5. **Test Core Web Vitals** — Run your site through PageSpeed Insights

These five steps won't take more than 10-15 hours of focused work. They could transform your organic visibility.

If you want to accelerate the process or need help with the technical implementation, that's where professional SEO architects come in. At RankFrame SEO, we handle all of this starting at **$150/month for on-page architecture optimization** (title tags, schema markup, internal linking, technical fixes), or **$750/month including backlink building and authority growth** to accelerate your rankings.

Either way, don't let another month pass with invisible SEO architecture. The fix is straightforward. The payoff is substantial.`,
  },
];

// Posts scheduled for future publication — not shown on the blog list until `date` is reached.
const scheduledPosts = [
  {
    slug: 'backlink-playbook-small-business-2026',
    title: 'The Small Business Backlink Playbook: How to Earn 10 Quality Links a Month Without Paying for Them',
    excerpt:
      "Backlinks are still the single strongest ranking signal — but the tactics that worked in 2018 will get you penalized in 2026. Here's the outreach and citation strategy we use to earn 10+ high-authority links per month for small businesses.",
    date: '2026-04-20',
    readTime: '11 min read',
    author: 'Blue Galaxy',
    tags: ['Backlinks', 'Off-Page SEO', 'Link Building', 'Outreach', 'Small Business'],
    content: `Every SEO tool on the market will tell you the same thing: backlinks are still the number one off-page ranking signal in 2026. Google's own search quality guidelines barely changed that calculus even after the March 2024 core update, the AI Overviews rollout, or the death of most link farms.

But here's what those tools won't tell you: **90% of the backlink advice online will now actively hurt your rankings**. Guest post networks, PBNs, paid directory submissions, comment-spam outreach — the tactics that worked six years ago now trigger algorithmic demotion, not wins.

So what actually works for a small business with no brand, no PR team, and no five-figure link-building budget? That's what this playbook covers. These are the exact tactics we use at RankFrame to earn 10+ quality backlinks per month for clients on our $750/month plan — and every one of them works for a solo founder with zero agency help.

## What Counts as a "Quality" Backlink in 2026

Before tactics, definitions. Google's crawler evaluates backlinks on roughly four dimensions:

1. **Domain authority of the linking site** — is this a real business with real traffic?
2. **Topical relevance** — does the linking site's content cluster match yours?
3. **Link placement** — is the link in the body of an article (good) or in a footer / sidebar / directory listing (weaker)?
4. **Anchor text naturalness** — does the anchor read like a human wrote it?

A single link from a relevant industry publication where your brand is mentioned in context is worth more than 50 directory submissions. Internalize this. It'll save you from wasting months on the wrong tactics.

## Tactic #1: Unlinked Brand Mentions — The 5-Minute Wins

Open Google and search: \`"your business name" -site:yourwebsite.com\`. You'll find every place on the internet that mentions your business but doesn't link to you. For most small businesses with any customer base, this is 10-50 free links waiting to be claimed.

**The outreach:**

> Subject: Quick thank-you
>
> Hi [name],
>
> Thanks for mentioning [Your Business] in your [article title] piece — really appreciated the context. One small note: the mention isn't linked. If it's easy, could you turn it into a link to [your URL]? Totally understand if not.
>
> [Your name]

Conversion rate on this email is absurd — typically **40-60%**. Takes a weekend to do fifty of them. This alone can double a small site's backlink profile.

## Tactic #2: HARO / Qwoted / Featured Replacements

HARO (Help a Reporter Out) was sold in 2024 and has been replaced by several journalist-sourcing platforms: **Qwoted, Featured, SourceBottle, and Connectively**.

Journalists on these platforms are actively looking for expert quotes. Every quote that gets used comes with a byline link back to your website — usually from a DA 60+ publication.

**The routine:**
- Spend 15 minutes every morning scanning queries in your industry
- Reply to 2-3 relevant ones with specific, concrete, useful answers (not generic marketing fluff)
- Expect 1-2 placements per month at the start, 3-5 once journalists start recognizing your name

**Why this works:** you're not asking for a link, you're providing free expertise. The link is the byproduct. Google can tell the difference between earned editorial links and solicited ones, and this path produces the editorial kind.

## Tactic #3: The Statistics Page

Every niche has a hungry pool of bloggers and content marketers constantly searching for statistics to cite. Google queries like:

- \`[your industry] statistics 2026\`
- \`[your service] data\`
- \`how many [your market metric]\`

If you publish a single well-organized page of original statistics — even if you're just aggregating and citing existing research — every blogger who cites your page gives you a link. A solid statistics page built once can earn 2-5 backlinks per month passively, for years.

**The format that works:**
- 20-40 stats, each with a source citation
- Clear H2 sections by category
- An obvious "How to cite this page" box at the top
- A "Last updated" date that you actually keep current

## Tactic #4: Podcast Guest Appearances

This is the single most underrated link-building channel in 2026. There are tens of thousands of niche business podcasts, and most of them are desperately hunting for guests. Every appearance typically earns you:

- A link in the episode show notes (DA varies, but usually 30-50)
- Sometimes a link from the podcast host's personal site
- Occasionally a link from listeners who write follow-up blog posts

**How to land appearances:**

- Use **Podchaser** or **ListenNotes** to find podcasts in your industry with 10-100 reviews (the sweet spot — big enough to matter, small enough to say yes)
- Pitch 10 per week with a specific episode angle, not a generic "I'd love to be on your show"
- Follow up once after a week

Conversion rate on well-targeted podcast pitches is **15-25%**. That's 1-2 appearances a week if you're consistent.

## Tactic #5: Local Citations — The Foundation, Not the Ceiling

Local citations (listings on directories like Google Business Profile, Yelp, Bing Places, Apple Maps, industry-specific directories) don't move rankings the way they did in 2015. But they're still foundational for **local SEO** — and they're required for your Google Business Profile to rank in the local pack.

**The 50 citations every local business needs:**
- Google Business Profile (the single most important)
- Bing Places
- Apple Maps Connect
- Yelp
- Yellow Pages / White Pages
- Better Business Bureau
- Facebook Business
- LinkedIn Company Page
- 10-15 industry-specific directories (varies by niche)
- 25-30 local/regional business directories

**The NAP rule:** Name, Address, Phone must be **identical** across every listing. Variation (different phone formats, abbreviated addresses, different business names) actively hurts local rankings.

## Tactic #6: Broken Link Building — Still Works in 2026

The mechanic: find an article on an authoritative site that links to a broken / dead resource, create a better version of that resource on your site, and email the site owner.

**Tools:**
- **Ahrefs** or **SEMrush** — find sites linking to broken URLs in your niche
- **Check My Links** Chrome extension — spot broken links on specific pages manually

**The email:**

> Hi [name],
>
> I was reading your [article title] and noticed the link to [broken URL] is returning a 404. Not sure if you're still maintaining that post, but I thought you'd want to know.
>
> We actually published a guide covering the same topic — [your URL] — if you're updating and looking for a replacement it might be useful.
>
> [Your name]

Conversion rate: **5-10%**. Low, but the links you earn are high-quality editorial placements on sites that were already willing to link out on the topic.

## The Monthly Routine (What 10 Links/Month Looks Like)

At RankFrame, our $750/month plan hits 10+ quality links per month using a consistent weekly routine:

**Monday — Unlinked mentions pass (90 min)**
Claim 3-5 existing mentions. Easy wins to start the week.

**Tuesday — Journalist queries (60 min/day, split across the week)**
Reply to 2-3 Qwoted/Featured queries daily. Expect 1-2 placements/month.

**Wednesday — Podcast pitching (120 min)**
Pitch 10 podcasts. Expect 2-4 recording sessions booked per month, 1-2 published per month.

**Thursday — Broken link building (90 min)**
Identify 20 broken-link opportunities, pitch 10. Expect 1-2 wins/month.

**Friday — Statistics page update + content promotion (60 min)**
Update the stats page with one new data point. Promote existing content to people likely to cite it.

Plus: **local citations** as a one-time setup in month one (50 listings), then quarterly audits.

Total time: roughly **6 hours per week**. The result is 10-15 new quality backlinks per month, compounding month over month.

## What *Not* to Do

I mentioned at the top that most backlink advice online is now counterproductive. Specifically, avoid:

- **Paid guest post networks** — Google actively devalues these
- **Private Blog Networks (PBNs)** — algorithmic and manual penalty risk
- **Fiverr-style "500 backlinks for $20" packages** — these are spam farms
- **Comment spam** — does nothing, wastes your time
- **Bulk directory submission services** — low-quality citations dilute your profile
- **Exact-match anchor text at scale** — looks unnatural, triggers demotion

If a tactic feels like a shortcut, it is — and Google will catch up to it faster than your rankings can benefit.

## The Compounding Math

Ten quality links a month doesn't sound like a lot. But backlinks compound:

- **Month 3:** 30 links, your top money pages start creeping up to page 2
- **Month 6:** 60 links, domain authority climbs 5-10 points, long-tail keywords start ranking without new effort
- **Month 12:** 120+ links, you're on page 1 for your core keywords, organic traffic has typically 2-3x'd

This is the boring truth of SEO in 2026: the businesses winning organic search aren't the ones with the flashiest tactics. They're the ones who showed up every week for 12 months and did the work while competitors were chasing the next hack.

If you want this process handled for you, [RankFrame's SEO Inside + Outside plan](/) includes all six of these tactics executed monthly, plus the on-page architecture work that makes the backlinks actually move rankings. **$750/month. No setup fee. Cancel anytime.**

Either way, start this week. Ten links a month compounds fast.`,
  },
];

// Published = scheduled posts whose date <= today
function isPublished(post) {
  try {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const postDate = new Date(post.date + 'T00:00:00');
    return postDate.getTime() <= now.getTime();
  } catch {
    return true;
  }
}

// Merge scheduled posts that are due into the published list
scheduledPosts.forEach((p) => {
  if (isPublished(p) && !posts.find((x) => x.slug === p.slug)) {
    posts.unshift(p);
  }
});

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug) || scheduledPosts.find((p) => p.slug === slug && isPublished(p));
}

export { scheduledPosts };
