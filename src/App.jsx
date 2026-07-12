import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { posts, getPostBySlug } from './blog/posts.js';
import { niches, getNicheBySlug } from './content/niches.js';
import { cities, getCityBySlug } from './content/cities.js';
import { crosses, crossesForCity } from './content/cross.js';
import { glossaryTerms, seoStatistics, aboutContent } from './content/pages.js';

// Route key helpers — kept in one place so router, schemas, and renders agree
const NICHE_KEYS = Object.keys(niches);
const CITY_KEYS = Object.keys(cities);
const CROSS_KEYS = Object.keys(crosses);
const nicheRouteFromKey = (k) => 'niche-' + k;
const cityRouteFromKey = (k) => 'city-' + k;
const crossRouteFromKey = (k) => 'cross-' + k;

const SITE_URL = 'https://rankframeseo.com';

// ─── Full service catalog. All-industry. Customers select what they need on
// the /get-started page and the selection is emailed via Formspree. ───
const SERVICE_GROUPS = [
  {
    group: 'Technical & On-Page SEO',
    blurb: 'The foundation search engines actually read.',
    items: [
      'SEO architecture & site-structure audit',
      'Title tags & meta description optimization',
      'Heading (H1–H6) & content structure',
      'Schema / structured data (JSON-LD) markup',
      'XML sitemap creation & submission',
      'Canonical tags & duplicate-content fixes',
      'Internal linking strategy',
      'Image alt text & media optimization',
      'Core Web Vitals & page-speed optimization',
      'Broken link, 404 & redirect cleanup',
      'HTTPS, security & indexing checks',
    ],
  },
  {
    group: 'Keyword & Content',
    blurb: 'Rank for what your customers actually search.',
    items: [
      'Keyword research & search-intent mapping',
      'Competitor keyword gap analysis',
      'Content strategy & topic clusters',
      'On-page content writing & optimization',
      'Blog & article SEO writing',
      'Landing-page copy optimization',
      'Content refresh of existing pages',
      'FAQ & featured-snippet optimization',
    ],
  },
  {
    group: 'Local SEO & Maps',
    blurb: 'Own the map pack in every city you serve.',
    items: [
      'Google Business Profile setup & optimization',
      'Google Maps listing & ranking',
      'Apple Maps / Business Connect setup & fixes',
      'Bing Places for Business',
      'NAP consistency across the web',
      '50+ business directory citations',
      'Local landing pages by city / service area',
      'Review generation & response strategy',
      'LocalBusiness schema markup',
    ],
  },
  {
    group: 'AI Search & GEO',
    blurb: 'Get cited by ChatGPT, Gemini, Perplexity & Google AI.',
    items: [
      'Get your brand cited in ChatGPT answers',
      'Google AI Overviews optimization',
      'Perplexity & Gemini visibility',
      'llms.txt & AI-crawler discovery files',
      'Entity & knowledge-graph optimization',
      'AI-friendly structured content',
    ],
  },
  {
    group: 'Off-Page & Authority',
    blurb: 'Build the trust signals Google rewards.',
    items: [
      'Backlink acquisition (quality links)',
      'Guest-post outreach on high-authority sites',
      'Competitor backlink gap analysis',
      'Toxic backlink audit & disavow',
      'Brand mention monitoring & link reclamation',
      'Digital PR & outreach',
      'Domain authority growth tracking',
    ],
  },
  {
    group: 'E-commerce SEO',
    blurb: 'For Shopify, WooCommerce, Amazon & more.',
    items: [
      'Product & collection page optimization',
      'Product schema (price, rating, availability)',
      'Faceted navigation & crawl control',
      'Shopify / WooCommerce technical SEO',
      'Marketplace / Amazon listing optimization',
    ],
  },
  {
    group: 'Website Design & Build',
    blurb: 'Fast, modern sites built to rank from day one.',
    items: [
      'New website design & build',
      'Landing-page design & development',
      'Website redesign / rebuild',
      'Speed & performance optimization',
      'Mobile & responsive optimization',
      'Conversion-rate optimization (CRO)',
      'Ongoing maintenance & support',
    ],
  },
  {
    group: 'Analytics & Reporting',
    blurb: 'See exactly what is working, every month.',
    items: [
      'Google Analytics 4 setup',
      'Google Search Console setup & monitoring',
      'Keyword ranking tracking',
      'Monthly SEO performance reports',
      'Conversion & goal tracking',
      'Competitor monitoring',
    ],
  },
];

/* ─── AI Terminal Animation for Hero (30s cycle, particle FX) ─── */
function AITerminal() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [lines, setLines] = useState([]);
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing');
  const [showResult, setShowResult] = useState(false);
  const [metrics, setMetrics] = useState([]);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      a: Math.random() * 0.5 + 0.1,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.offsetWidth;
        if (p.x > canvas.offsetWidth) p.x = 0;
        if (p.y < 0) p.y = canvas.offsetHeight;
        if (p.y > canvas.offsetHeight) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16,185,129,${p.a})`;
        ctx.fill();
      });
      // draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(16,185,129,${0.08 * (1 - dist / 80)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  // 30-second scripted sequence
  const script = useMemo(() => [
    // Phase 1: Init (0-4s)
    { t: 0, action: 'line', text: '> rf.engine.init({ mode: "deep-scan", ai: true })', type: 'cmd' },
    { t: 800, action: 'status', text: 'Booting neural crawl engine' },
    { t: 1200, action: 'line', text: '  [core] Loading language models... GPT-4o + custom SEO layer', type: 'dim' },
    { t: 2000, action: 'line', text: '  [core] Initializing 12 parallel analysis threads', type: 'dim' },
    { t: 2800, action: 'line', text: '  [✓] Engine ready — latency 23ms', type: 'success' },
    { t: 3200, action: 'progress', value: 8 },
    // Phase 2: Crawl (4-10s)
    { t: 4000, action: 'status', text: 'Crawling site architecture' },
    { t: 4000, action: 'line', text: '> rf.crawl("https://target-domain.com", { depth: 4 })', type: 'cmd' },
    { t: 5000, action: 'line', text: '  [spider] Discovered 247 URLs across 6 subdirectories', type: 'info' },
    { t: 5800, action: 'line', text: '  [spider] Mapping internal link graph... 1,847 edges', type: 'info' },
    { t: 6500, action: 'progress', value: 22 },
    { t: 6800, action: 'line', text: '  [spider] Rendering JavaScript pages via headless Chromium', type: 'info' },
    { t: 7600, action: 'line', text: '  [spider] Extracting meta, OG, canonical, hreflang tags', type: 'info' },
    { t: 8400, action: 'line', text: '  [✓] Crawl complete — 247 pages indexed in 4.2s', type: 'success' },
    { t: 9000, action: 'progress', value: 35 },
    // Phase 3: AI Analysis (10-18s)
    { t: 10000, action: 'status', text: 'Running AI architecture analysis' },
    { t: 10000, action: 'line', text: '> rf.analyze({ modules: ["title", "schema", "links", "vitals", "eeat"] })', type: 'cmd' },
    { t: 11000, action: 'line', text: '  [ai] Tokenizing 247 page structures into embedding space', type: 'info' },
    { t: 12000, action: 'line', text: '  [ai] Running title tag relevance model... 89% below threshold', type: 'warn' },
    { t: 12800, action: 'progress', value: 48 },
    { t: 13000, action: 'line', text: '  [ai] Schema coverage: 3% (industry avg: 67%)', type: 'warn' },
    { t: 13800, action: 'line', text: '  [ai] Internal link equity score: 0.23 / 1.00', type: 'warn' },
    { t: 14500, action: 'line', text: '  [ai] Core Web Vitals: LCP 4.1s | CLS 0.02 | INP 210ms', type: 'info' },
    { t: 15200, action: 'progress', value: 62 },
    { t: 15500, action: 'line', text: '  [ai] E-E-A-T signal strength: 12/100 — no author entities found', type: 'warn' },
    { t: 16200, action: 'line', text: '  [ai] Cross-referencing against 14M ranking factor dataset', type: 'info' },
    { t: 17000, action: 'line', text: '  [✓] Analysis complete — 7 critical issues, 4 warnings', type: 'success' },
    { t: 17500, action: 'progress', value: 78 },
    // Phase 4: Report generation (18-24s)
    { t: 18000, action: 'status', text: 'Generating optimization report' },
    { t: 18000, action: 'line', text: '> rf.report.generate({ format: "executive", priority: "impact" })', type: 'cmd' },
    { t: 19000, action: 'line', text: '  [report] Ranking fixes by estimated traffic impact...', type: 'info' },
    { t: 19800, action: 'line', text: '  [report] Projecting keyword ranking improvements...', type: 'info' },
    { t: 20500, action: 'line', text: '  [report] Building 30-day action roadmap...', type: 'info' },
    { t: 21200, action: 'progress', value: 90 },
    { t: 21500, action: 'line', text: '  [report] Compiling visual dashboard + PDF export', type: 'info' },
    { t: 22200, action: 'line', text: '  [✓] Report delivered to client portal', type: 'success' },
    { t: 22800, action: 'progress', value: 100 },
    // Phase 5: Results (24-30s)
    { t: 23500, action: 'status', text: 'Audit complete' },
    { t: 24000, action: 'result', metrics: [
      { label: 'Issues Found', value: '7', sub: 'critical' },
      { label: 'Est. Traffic Lift', value: '+340%', sub: 'projected' },
      { label: 'Pages Optimized', value: '247', sub: 'indexed' },
      { label: 'Time Elapsed', value: '24s', sub: 'fully automated' },
    ]},
  ], []);

  useEffect(() => {
    let timers = [];
    setLines([]);
    setProgress(0);
    setShowResult(false);
    setMetrics([]);
    setStatusText('Initializing');

    script.forEach(item => {
      timers.push(setTimeout(() => {
        if (item.action === 'line') setLines(prev => [...prev, { text: item.text, type: item.type }]);
        if (item.action === 'status') setStatusText(item.text);
        if (item.action === 'progress') setProgress(item.value);
        if (item.action === 'result') { setShowResult(true); setMetrics(item.metrics); }
      }, item.t));
    });

    // restart at 30s
    timers.push(setTimeout(() => setPhase(p => p + 1), 30000));
    return () => timers.forEach(clearTimeout);
  }, [phase, script]);

  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [lines]);

  const typeColor = { cmd: '#f5b84b', dim: '#6b7280', info: '#60a5fa', warn: '#fbbf24', success: '#34d399' };

  return (
    <div className="gold-glow relative overflow-hidden rounded-[2rem] border border-emerald-500/20 bg-[#0b0b0b] text-white">
      {/* Particle background */}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full opacity-60" style={{ zIndex: 0 }} />

      <div className="relative z-10">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-gray-800/60 bg-[#111]/80 px-5 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gray-500">RankFrame AI Engine</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="font-mono text-[10px] text-emerald-400/80">LIVE</span>
          </div>
        </div>

        {/* Status + progress bar */}
        <div className="border-b border-gray-800/40 bg-[#0e0e0e]/80 px-5 py-2.5 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] text-emerald-500/90">{statusText}</span>
            <span className="font-mono text-[11px] text-gray-600">{progress}%</span>
          </div>
          <div className="mt-1.5 h-[3px] w-full overflow-hidden rounded-full bg-gray-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-emerald-500 to-sky-300 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
              style={{ width: `${progress}%`, transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)' }}
            />
          </div>
        </div>

        {/* Code output */}
        <div
          ref={containerRef}
          className="h-[280px] overflow-hidden bg-[#080808]/60 px-5 py-3 font-mono text-[11.5px] leading-[1.8] backdrop-blur-sm sm:text-[12px]"
        >
          {lines.map((line, i) => (
            <div
              key={`${phase}-${i}`}
              style={{ color: typeColor[line.type] || '#9ca3af', opacity: 0, animation: 'fadeSlideIn 0.3s ease-out forwards' }}
            >
              {line.text}
            </div>
          ))}
          <span className="inline-block h-3.5 w-[6px] animate-pulse bg-emerald-500/60" />
        </div>

        {/* Result cards overlay */}
        {showResult && (
          <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/95 to-transparent px-5 pb-5 pt-16">
            <div className="mb-3 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-400">
              ✓ Audit Complete — Report Delivered
            </div>
            <div className="grid grid-cols-2 gap-2">
              {metrics.map((m, i) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-3 text-center backdrop-blur-sm"
                  style={{ opacity: 0, animation: `fadeSlideIn 0.4s ease-out ${i * 0.1}s forwards` }}
                >
                  <div className="text-lg font-bold text-emerald-500">{m.value}</div>
                  <div className="text-[10px] font-semibold text-gray-300">{m.label}</div>
                  <div className="text-[9px] text-gray-600">{m.sub}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom bar */}
        <div className="flex items-center justify-between border-t border-gray-800/40 bg-[#0e0e0e]/80 px-5 py-2.5 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.6)]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-500/70">Fully Automated</span>
          </div>
          <span className="font-mono text-[10px] text-gray-600">AI-Powered SEO Analysis</span>
        </div>

        {/* Product demo label */}
        <div className="py-2 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-600">Product Demo — RankFrame AI Audit Engine</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Intersection Observer hook for scroll animations ─── */
function useInView(options = {}) {
  const ref = useRef(null);
  const [isVisible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.12, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, isVisible];
}

function FadeIn({ children, className = '', delay = 0 }) {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(44px)',
        filter: vis ? 'blur(0)' : 'blur(8px)',
        transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 1s cubic-bezier(0.22,1,0.36,1) ${delay}s, filter 0.9s ease ${delay}s`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}

/* ─── Premium light hero visual: a floating "your plan" card ─── */
function HeroServicePanel({ goTo }) {
  const preview = [
    { g: 'Technical & On-Page SEO', n: 11 },
    { g: 'Local SEO & Maps', n: 9 },
    { g: 'AI Search & GEO', n: 6 },
    { g: 'Off-Page & Authority', n: 7 },
    { g: 'Website Design & Build', n: 7 },
  ];
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_top,rgba(20,184,166,0.14),transparent_60%)] blur-2xl" />
      <div className="overflow-hidden rounded-[2rem] border border-[#e1f1ee] bg-white/80 shadow-[0_20px_60px_-24px_rgba(13,148,136,0.25)] backdrop-blur">
        <div className="flex items-center justify-between border-b border-[#e5f3f0] bg-gradient-to-r from-white to-[#edf9f7] px-6 py-4">
          <div className="text-sm font-bold tracking-tight text-gray-900">Build your SEO plan</div>
          <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-700">Every industry</span>
        </div>
        <div className="space-y-3 px-6 py-6">
          {preview.map((p, i) => (
            <div
              key={p.g}
              className="reveal-card flex items-center justify-between rounded-2xl border border-[#e5f3f0] bg-[#f3fbfb] px-4 py-3"
              style={{ animationDelay: `${0.15 * i}s` }}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">✓</span>
                <span className="text-sm font-medium text-gray-800">{p.g}</span>
              </div>
              <span className="text-xs font-semibold text-emerald-700">{p.n} services</span>
            </div>
          ))}
        </div>
        <div className="border-t border-[#e5f3f0] bg-gradient-to-r from-[#edf9f7] to-white px-6 py-5">
          <button
            onClick={() => goTo('/get-started')}
            className="btn-shimmer w-full rounded-full px-6 py-3.5 text-sm font-bold text-white shadow transition hover:scale-[1.01]"
          >
            Build my plan →
          </button>
          <p className="mt-3 text-center text-xs text-gray-500">Selection is emailed to us · Reply in 2–6 hours</p>
        </div>
      </div>
    </div>
  );
}

export default function AISeoMarketingLandingPage() {
  const [route, setRoute] = useState(getRoute());
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    website: '',
    notes: '',
  });

  const formspreeEndpoint = 'https://formspree.io/f/mkodwayp';
  const [selectedServices, setSelectedServices] = useState([]);
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle | sending | error

  const toggleService = useCallback((name) => {
    setSelectedServices((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  }, []);

  useEffect(() => {
    const onRouteChange = () => setRoute(getRoute());
    window.addEventListener('popstate', onRouteChange);
    window.addEventListener('hashchange', onRouteChange);
    return () => {
      window.removeEventListener('popstate', onRouteChange);
      window.removeEventListener('hashchange', onRouteChange);
    };
  }, []);

  // Scroll to top on route change; scroll to hash anchor if present
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      // Defer so the new route has a chance to render
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    }
  }, [route]);

  useEffect(() => {
    const titles = {
      home: 'SEO, Local, AI Search & Web Design | RankFrame SEO',
      checkout: 'Get Started — Select Your Services | RankFrame SEO',
      success: 'Request Received — RankFrame SEO',
      blog: 'SEO Blog — Technical, Local & AI Search Insights | RankFrame SEO',
      glossary: 'SEO Glossary — 20 Key Terms Defined | RankFrame SEO',
      statistics: 'SEO Statistics 2026 — Cited Data & Benchmarks | RankFrame SEO',
      about: 'About RankFrame SEO — Full-Service SEO & Web Studio',
      'get-started': 'Get Started — Select Your SEO & Web Services | RankFrame SEO',
      ...Object.fromEntries(NICHE_KEYS.map((k) => [nicheRouteFromKey(k), niches[k].title])),
      ...Object.fromEntries(CITY_KEYS.map((k) => [cityRouteFromKey(k), cities[k].title])),
      ...Object.fromEntries(CROSS_KEYS.map((k) => [crossRouteFromKey(k), crosses[k].title])),
    };
    const descriptions = {
      home: 'Full-service SEO for every industry — technical & on-page SEO, local SEO with Google & Apple Maps, AI search (GEO) visibility in ChatGPT and Google AI Overviews, backlink authority, e-commerce SEO, and website design. Select the services you need.',
      checkout: 'Select the SEO and web services you need and we reply in 2–6 hours with a tailored one-on-one plan.',
      success: 'Thanks — your service request has been received. We will reply in 2–6 hours to start a one-on-one conversation.',
      blog: 'Articles, playbooks, and case studies on technical SEO, architecture, schema markup, Core Web Vitals and off-page trust building.',
      glossary: 'Plain-English definitions of 20 essential SEO and GEO terms: Core Web Vitals, schema markup, E-E-A-T, canonical tags, AI Overviews, llms.txt, and more.',
      statistics: '15 current SEO statistics with sources — organic search share, SERP click-through rates, Core Web Vitals thresholds, and RankFrame audit benchmarks.',
      about: 'RankFrame SEO is a full-service SEO and web studio for businesses in every industry. Founder bio, services, and the audit methodology behind the PACK EXPO case study.',
      'get-started': 'Select the SEO, local SEO, AI search, and website services you need. We reply in 2–6 hours with a tailored one-on-one plan. Every industry welcome.',
      ...Object.fromEntries(NICHE_KEYS.map((k) => [nicheRouteFromKey(k), niches[k].metaDescription])),
      ...Object.fromEntries(CITY_KEYS.map((k) => [cityRouteFromKey(k), cities[k].metaDescription])),
      ...Object.fromEntries(CROSS_KEYS.map((k) => [crossRouteFromKey(k), crosses[k].metaDescription])),
    };

    let title = titles[route] || titles.home;
    let description = descriptions[route] || descriptions.home;
    const pathMap = {
      home: '/', checkout: '/checkout', success: '/success', blog: '/blog', glossary: '/glossary', statistics: '/statistics', about: '/about', 'get-started': '/get-started',
      ...Object.fromEntries(NICHE_KEYS.map((k) => [nicheRouteFromKey(k), '/' + niches[k].slug])),
      ...Object.fromEntries(CITY_KEYS.map((k) => [cityRouteFromKey(k), '/' + cities[k].slug])),
      ...Object.fromEntries(CROSS_KEYS.map((k) => [crossRouteFromKey(k), '/' + crosses[k].slug])),
    };
    let canonical = SITE_URL + (pathMap[route] || '/');

    if (route === 'blog-post') {
      const post = getPostBySlug(getBlogSlug());
      if (post) {
        title = post.title + ' | RankFrame SEO Blog';
        description = post.excerpt;
        canonical = SITE_URL + '/blog/' + post.slug;
      } else {
        title = 'Article Not Found | RankFrame SEO';
        description = 'The article you are looking for could not be found.';
        canonical = SITE_URL + '/blog';
      }
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);

    // noindex transactional routes so they don't compete with the home page
    const noindexRoutes = ['checkout', 'success'];
    // Also noindex unknown URLs (SPA falls back to 'home' for them) so junk paths
    // aren't indexed as soft-404 duplicates of the homepage.
    const path = window.location.pathname.replace(/\/$/, '');
    const isUnknownPath = route === 'home' && path !== '' && path !== '/index.html';
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute(
      'content',
      noindexRoutes.includes(route) || isUnknownPath
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

    // Manage canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);

    // Manage og:url, og:title, og:description, og:type, twitter:card meta tags
    const setMeta = (attr, name, content) => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:type', route === 'blog-post' ? 'article' : 'website');
    setMeta('property', 'og:site_name', 'RankFrame SEO');
    setMeta('property', 'og:image', SITE_URL + '/og-image.png');
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:image:type', 'image/png');
    setMeta('property', 'og:image:alt', 'RankFrame SEO — full-service SEO, local, and AI-search optimization for every industry');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', SITE_URL + '/og-image.png');
    setMeta('name', 'twitter:image:alt', 'RankFrame SEO — full-service SEO, local, and AI-search optimization for every industry');

    // Manage JSON-LD structured data
    const setJsonLd = (id, data) => {
      let el = document.querySelector(`script[data-jsonld="${id}"]`);
      if (data === null) {
        if (el) el.remove();
        return;
      }
      if (!el) {
        el = document.createElement('script');
        el.setAttribute('type', 'application/ld+json');
        el.setAttribute('data-jsonld', id);
        document.head.appendChild(el);
      }
      el.textContent = JSON.stringify(data);
    };

    // Organization schema — always present
    setJsonLd('organization', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'RankFrame SEO',
      alternateName: 'RankFrame',
      url: SITE_URL,
      logo: SITE_URL + '/favicon.svg',
      description: 'Full-service SEO studio for businesses in every industry. 30+ websites audited and optimized. Technical & on-page SEO, keyword & content, local SEO with Google and Apple Maps, AI search (GEO) visibility in ChatGPT and Google AI Overviews, off-page authority building, e-commerce SEO, website design, and monthly reporting.',
      slogan: '30+ websites audited. Monthly SEO reporting built on technical SEO that Google actually rewards.',
      foundingDate: '2025',
      knowsAbout: [
        'Search Engine Optimization',
        'Technical SEO',
        'On-Page SEO',
        'Off-Page SEO',
        'Schema Markup',
        'Core Web Vitals',
        'Link Building',
        'Keyword Research',
        'SEO Audit',
        'SEO Reporting',
      ],
      areaServed: { '@type': 'Country', name: 'United States' },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'chunlinpengmark@gmail.com',
        availableLanguage: ['English'],
      },
      sameAs: [
        'https://medium.com/@bluegalaxydev',
        'https://github.com/bluegalaxydev',
      ],
    });

    // WebSite schema — always present
    setJsonLd('website', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'RankFrame SEO',
      url: SITE_URL,
      potentialAction: {
        '@type': 'SearchAction',
        target: SITE_URL + '/blog?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    });

    // BlogPosting schema — only on blog post pages
    if (route === 'blog-post') {
      const post = getPostBySlug(getBlogSlug());
      if (post) {
        setJsonLd('blogposting', {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          url: SITE_URL + '/blog/' + post.slug,
          datePublished: post.date,
          dateModified: post.date,
          author: {
            '@type': 'Person',
            name: post.author || 'Blue Galaxy',
            url: 'https://medium.com/@bluegalaxydev',
            sameAs: ['https://medium.com/@bluegalaxydev'],
            jobTitle: 'Technical SEO Practitioner',
            worksFor: { '@type': 'Organization', name: 'RankFrame SEO', url: SITE_URL },
            knowsAbout: ['Technical SEO', 'Schema Markup', 'Core Web Vitals', 'On-Page SEO', 'Link Building'],
          },
          publisher: {
            '@type': 'Organization',
            name: 'RankFrame SEO',
            logo: { '@type': 'ImageObject', url: SITE_URL + '/favicon.svg' },
          },
          mainEntityOfPage: { '@type': 'WebPage', '@id': SITE_URL + '/blog/' + post.slug },
          keywords: (post.tags || []).join(', '),
          image: SITE_URL + '/og-image.png',
          articleSection: 'SEO',
          inLanguage: 'en-US',
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['h1', 'h2', 'article p:first-of-type'],
          },
        });
      } else {
        setJsonLd('blogposting', null);
      }
    } else {
      setJsonLd('blogposting', null);
    }

    // Home-only schemas
    if (route === 'home') {
      setJsonLd('service', {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'SEO, Local SEO, AI Search (GEO) & Website Design',
        provider: { '@type': 'Organization', name: 'RankFrame SEO', url: SITE_URL },
        areaServed: { '@type': 'Country', name: 'United States' },
        description: 'Full-service SEO for businesses in every industry — technical & on-page SEO, keyword & content, local SEO and Google/Apple Maps, AI search (GEO) visibility in ChatGPT and Google AI Overviews, off-page authority building, e-commerce SEO, website design, and monthly reporting. Select the services you need.',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'SEO & Web Services',
          itemListElement: SERVICE_GROUPS.map((g) => ({
            '@type': 'OfferCatalog',
            name: g.group,
            itemListElement: g.items.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s } })),
          })),
        },
      });

      setJsonLd('faqpage', {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What services do you offer?', acceptedAnswer: { '@type': 'Answer', text: 'We cover the full range of SEO and web work: technical & on-page SEO, keyword research and content, local SEO with Google Business Profile, Google Maps and Apple Maps, AI search (GEO) visibility so you get cited by ChatGPT and Google AI Overviews, off-page authority and backlink building, e-commerce SEO, website design and build, plus analytics and monthly reporting. You choose exactly which services you need.' } },
          { '@type': 'Question', name: 'How does it work?', acceptedAnswer: { '@type': 'Answer', text: 'On our Get Started page you select the services you are interested in. Your selection is emailed to us instantly and we reply in 2–6 hours with a tailored, one-on-one plan. There is no obligation.' } },
          { '@type': 'Question', name: 'Which industries do you work with?', acceptedAnswer: { '@type': 'Answer', text: 'Every industry — local service businesses, e-commerce stores, SaaS and tech, professional services, healthcare, hospitality, and more. The SEO fundamentals that move rankings apply across all of them.' } },
          { '@type': 'Question', name: 'Do you work with high-risk or restricted industries?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We work with high-risk and restricted verticals, including industries where paid ads are limited or banned — such as CBD, supplements, crypto, gaming, firearms, and adult-adjacent brands. For these businesses organic SEO is often the single most reliable growth channel, and we build it the compliant, durable way.' } },
          { '@type': 'Question', name: 'Can you get my business cited by ChatGPT and AI search?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Generative Engine Optimization (GEO) makes your site citation-ready for ChatGPT, Gemini, Perplexity, and Google AI Overviews through structured data, entity optimization, llms.txt discovery files, and AI-friendly content.' } },
          { '@type': 'Question', name: 'Do you add and fix Google Maps and Apple Maps listings?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We set up and optimize Google Business Profile and Google Maps rankings, and set up or fix Apple Maps / Apple Business Connect and Bing Places, with consistent NAP data and directory citations.' } },
          { '@type': 'Question', name: 'Do you also build websites?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We design and build fast, modern websites and landing pages engineered to rank from day one, and can redesign or optimize an existing site for speed, mobile, and conversions.' } },
        ],
      });

      setJsonLd('howto', {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How to Start Your Monthly SEO Report',
        description: 'Three-step process to start a RankFrame SEO monthly reporting subscription.',
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Submit your website', text: 'Send us your website details and we begin reviewing the structure, technical SEO foundation, and keyword positioning.' },
          { '@type': 'HowToStep', position: 2, name: 'We audit your SEO setup', text: 'We examine SEO architecture, internal linking, metadata, crawlability, indexing, and keyword ranking visibility.' },
          { '@type': 'HowToStep', position: 3, name: 'Receive your monthly report', text: 'You get a clear report with issues, opportunities, ranking insights, and next-step recommendations.' },
        ],
      });

      setJsonLd('webpage', {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: title,
        description,
        url: canonical,
        inLanguage: 'en-US',
        isPartOf: { '@type': 'WebSite', name: 'RankFrame SEO', url: SITE_URL },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', 'h2', '.hero-subtitle', '[data-speakable]'],
        },
      });

      // DefinedTermSet — glossary for AI answer extraction
      setJsonLd('definedterms', {
        '@context': 'https://schema.org',
        '@type': 'DefinedTermSet',
        name: 'RankFrame SEO Glossary',
        hasDefinedTerm: [
          {
            '@type': 'DefinedTerm',
            name: 'On-Page SEO',
            description: 'Optimization of elements directly on a website — title tags, meta descriptions, headings, schema markup, internal linking, and page content — so search engines can parse and rank the site.',
            inDefinedTermSet: SITE_URL + '/#glossary',
          },
          {
            '@type': 'DefinedTerm',
            name: 'Off-Page SEO',
            description: 'Activities outside a website that build authority, including backlinks from other sites, brand mentions, business directory citations, and guest posts.',
            inDefinedTermSet: SITE_URL + '/#glossary',
          },
          {
            '@type': 'DefinedTerm',
            name: 'Schema Markup',
            description: 'Structured JSON-LD data embedded in a page that tells search engines exactly what information is on the page (business, products, FAQs, reviews) rather than asking them to infer from prose.',
            inDefinedTermSet: SITE_URL + '/#glossary',
          },
          {
            '@type': 'DefinedTerm',
            name: 'Core Web Vitals',
            description: 'Google\'s set of page-experience metrics: Largest Contentful Paint (target under 2.5s), Cumulative Layout Shift (target under 0.1), and Interaction to Next Paint (target under 200ms).',
            inDefinedTermSet: SITE_URL + '/#glossary',
          },
          {
            '@type': 'DefinedTerm',
            name: 'SEO Architecture',
            description: 'The technical foundation of a website that determines whether search engine crawlers can discover, parse, and rank its pages. Includes title tags, schema, internal linking, sitemaps, robots.txt, and Core Web Vitals.',
            inDefinedTermSet: SITE_URL + '/#glossary',
          },
          {
            '@type': 'DefinedTerm',
            name: 'Google Trust',
            description: 'The aggregate authority signals — backlinks, brand mentions, citations, and E-E-A-T markers — that cause Google to treat a domain as a credible source worth ranking and citing in AI Overviews.',
            inDefinedTermSet: SITE_URL + '/#glossary',
          },
        ],
      });

      setJsonLd('professionalservice', {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: 'RankFrame SEO',
        url: SITE_URL,
        image: SITE_URL + '/og-image.png',
        description: 'Full-service SEO, local SEO, AI search (GEO) visibility, off-page authority, e-commerce SEO, and website design for businesses in every industry.',
        areaServed: { '@type': 'Country', name: 'United States' },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'SEO & Web Services',
          itemListElement: SERVICE_GROUPS.map((g) => ({
            '@type': 'OfferCatalog',
            name: g.group,
            itemListElement: g.items.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s } })),
          })),
        },
      });

      setJsonLd('breadcrumbs', null);
    } else {
      setJsonLd('service', null);
      setJsonLd('faqpage', null);
      setJsonLd('howto', null);
      setJsonLd('webpage', null);
      setJsonLd('professionalservice', null);
      setJsonLd('definedterms', null);
    }

    // Glossary — full DefinedTermSet + CollectionPage
    if (route === 'glossary') {
      setJsonLd('glossary-definedterms', {
        '@context': 'https://schema.org',
        '@type': 'DefinedTermSet',
        name: 'RankFrame SEO & GEO Glossary',
        description: 'Plain-English definitions of 20 essential SEO and GEO terms.',
        url: SITE_URL + '/glossary',
        hasDefinedTerm: glossaryTerms.map((t) => ({
          '@type': 'DefinedTerm',
          name: t.term,
          description: t.definition,
          inDefinedTermSet: SITE_URL + '/glossary',
        })),
      });
      setJsonLd('glossary-collection', {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'SEO Glossary',
        url: SITE_URL + '/glossary',
        description,
        inLanguage: 'en-US',
        isPartOf: { '@type': 'WebSite', name: 'RankFrame SEO', url: SITE_URL },
      });
    } else {
      setJsonLd('glossary-definedterms', null);
      setJsonLd('glossary-collection', null);
    }

    // Statistics — Dataset schema (citation-magnet for AI)
    if (route === 'statistics') {
      setJsonLd('statistics-dataset', {
        '@context': 'https://schema.org',
        '@type': 'Dataset',
        name: 'SEO Statistics 2026 — Cited Data & Benchmarks',
        description,
        url: SITE_URL + '/statistics',
        license: 'https://creativecommons.org/licenses/by/4.0/',
        creator: { '@type': 'Organization', name: 'RankFrame SEO', url: SITE_URL },
        keywords: ['SEO statistics', 'organic search data', 'Core Web Vitals benchmarks', 'search engine optimization', 'small business SEO'],
        variableMeasured: seoStatistics.map((s) => s.category),
        inLanguage: 'en-US',
      });
      setJsonLd('statistics-itemlist', {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'SEO Statistics 2026',
        numberOfItems: seoStatistics.length,
        itemListElement: seoStatistics.map((s, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: s.stat + ' — ' + s.claim,
        })),
      });
    } else {
      setJsonLd('statistics-dataset', null);
      setJsonLd('statistics-itemlist', null);
    }

    // About — AboutPage + detailed Person schema (E-E-A-T)
    if (route === 'about') {
      setJsonLd('aboutpage', {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About RankFrame SEO',
        url: SITE_URL + '/about',
        description,
        inLanguage: 'en-US',
        mainEntity: { '@type': 'Organization', name: 'RankFrame SEO', url: SITE_URL },
      });
      setJsonLd('about-person', {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: aboutContent.founder.name,
        jobTitle: aboutContent.founder.role,
        description: aboutContent.founder.bio,
        knowsAbout: aboutContent.founder.expertise,
        url: 'https://medium.com/@bluegalaxydev',
        sameAs: aboutContent.founder.links.map((l) => l.url),
        worksFor: { '@type': 'Organization', name: 'RankFrame SEO', url: SITE_URL },
      });
    } else {
      setJsonLd('aboutpage', null);
      setJsonLd('about-person', null);
    }

    // Get Started page — ContactPage schema
    if (route === 'get-started') {
      setJsonLd('getstarted-contactpage', {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Get Started with RankFrame SEO',
        url: SITE_URL + '/get-started',
        description,
        inLanguage: 'en-US',
        isPartOf: { '@type': 'WebSite', name: 'RankFrame SEO', url: SITE_URL },
      });
      setJsonLd('getstarted-service', {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'SEO, Local SEO, AI Search (GEO) & Website Design',
        provider: { '@type': 'Organization', name: 'RankFrame SEO', url: SITE_URL },
        areaServed: { '@type': 'Country', name: 'United States' },
        description: 'Select the SEO and web services you need and we reply in 2–6 hours with a tailored, one-on-one plan. For businesses in every industry.',
      });
      // clean up legacy keys if a previous render wrote them
      setJsonLd('freeaudit-contactpage', null);
      setJsonLd('freeaudit-service', null);
    } else {
      setJsonLd('getstarted-contactpage', null);
      setJsonLd('getstarted-service', null);
      setJsonLd('freeaudit-contactpage', null);
      setJsonLd('freeaudit-service', null);
    }

    // Niche + City + Cross buyer-intent pages — Service + FAQPage + WebPage schema
    const nicheKey = route.startsWith('niche-') ? route.slice('niche-'.length) : null;
    const cityKey = route.startsWith('city-') ? route.slice('city-'.length) : null;
    const crossKey = route.startsWith('cross-') ? route.slice('cross-'.length) : null;
    const n = nicheKey ? niches[nicheKey] : cityKey ? cities[cityKey] : crossKey ? crosses[crossKey] : null;
    if (n) {
      const areaServed = cityKey
        ? { '@type': 'City', name: cities[cityKey].city }
        : crossKey
        ? { '@type': 'City', name: crosses[crossKey].city }
        : { '@type': 'Country', name: 'United States' };
      setJsonLd('niche-service', {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: n.h1,
        serviceType: n.h1,
        provider: { '@type': 'Organization', name: 'RankFrame SEO', url: SITE_URL },
        areaServed,
        description: n.metaDescription,
        url: SITE_URL + '/' + n.slug,
      });
      setJsonLd('niche-faq', {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: n.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      });
      setJsonLd('niche-webpage', {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: n.title,
        description: n.metaDescription,
        url: SITE_URL + '/' + n.slug,
        inLanguage: 'en-US',
        isPartOf: { '@type': 'WebSite', name: 'RankFrame SEO', url: SITE_URL },
      });
    } else {
      setJsonLd('niche-service', null);
      setJsonLd('niche-faq', null);
      setJsonLd('niche-webpage', null);
    }

    // Breadcrumbs for glossary / statistics / about / get-started / niche + city pages
    const crumbStatic = {
      glossary: { label: 'Glossary', path: '/glossary' },
      statistics: { label: 'SEO Statistics', path: '/statistics' },
      about: { label: 'About', path: '/about' },
      'get-started': { label: 'Get Started', path: '/get-started' },
    };
    let crumbEntry = crumbStatic[route];
    if (!crumbEntry && nicheKey) crumbEntry = { label: niches[nicheKey].h1, path: '/' + niches[nicheKey].slug };
    if (!crumbEntry && cityKey) crumbEntry = { label: cities[cityKey].h1, path: '/' + cities[cityKey].slug };
    if (!crumbEntry && crossKey) crumbEntry = { label: crosses[crossKey].h1, path: '/' + crosses[crossKey].slug };
    if (crumbEntry) {
      setJsonLd('breadcrumbs', {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
          { '@type': 'ListItem', position: 2, name: crumbEntry.label, item: SITE_URL + crumbEntry.path },
        ],
      });
    }

    // Breadcrumbs for blog index and blog posts
    if (route === 'blog') {
      setJsonLd('breadcrumbs', {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: SITE_URL + '/blog' },
        ],
      });
      // ItemList of published posts — helps Google understand the /blog index
      const publishedPosts = posts.filter((p) => {
        try {
          return new Date(p.date + 'T00:00:00').getTime() <= Date.now();
        } catch {
          return true;
        }
      });
      setJsonLd('itemlist', {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'RankFrame SEO Blog',
        itemListElement: publishedPosts.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: SITE_URL + '/blog/' + p.slug,
          name: p.title,
        })),
      });
    } else {
      setJsonLd('itemlist', null);
    }
    if (route === 'blog-post') {
      const post = getPostBySlug(getBlogSlug());
      if (post) {
        setJsonLd('breadcrumbs', {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: SITE_URL + '/blog' },
            { '@type': 'ListItem', position: 3, name: post.title, item: SITE_URL + '/blog/' + post.slug },
          ],
        });
      } else {
        setJsonLd('breadcrumbs', null);
      }
    }
  }, [route]);

  const deliverables = [
    { title: 'Technical & on-page SEO, done right', icon: '01' },
    { title: 'Local SEO — Google & Apple Maps', icon: '02' },
    { title: 'AI search (GEO) visibility', icon: '03' },
    { title: 'Backlinks & authority building', icon: '04' },
    { title: 'Website design, speed & fixes', icon: '05' },
    { title: 'Clear reporting & priority roadmap', icon: '06' },
  ];

  const process = [
    {
      step: '01',
      title: 'Submit your website',
      text: 'Send us your website details and we begin reviewing the structure, technical SEO foundation, and keyword positioning.',
    },
    {
      step: '02',
      title: 'We audit your SEO setup',
      text: 'We examine SEO architecture, internal linking, metadata, crawlability, indexing, and keyword ranking visibility.',
    },
    {
      step: '03',
      title: 'Receive your monthly report',
      text: 'You get a clear report with issues, opportunities, ranking insights, and next-step recommendations.',
    },
  ];

  const highlights = [
    'Technical & on-page SEO',
    'Local SEO — Google & Apple Maps',
    'AI search (GEO) — ChatGPT & AI Overviews',
    'Off-page authority & backlinks',
    'Website design & build',
  ];

  const trustPoints = [
    { text: 'Websites audited and optimized', num: '30+', label: 'Sites optimized' },
    { text: 'Every industry, every platform', num: 'All', label: 'Industries served' },
    { text: 'Services you can mix and match', num: '50+', label: 'Services offered' },
    { text: 'One-on-one, no account-manager layers', num: '1:1', label: 'Direct service' },
  ];

  const benefits = [
    { title: 'Technical & On-Page SEO', desc: 'Architecture, meta tags, schema, sitemaps, speed, and internal linking done right' },
    { title: 'Local SEO & Maps', desc: 'Google Business Profile, Google Maps, and Apple Maps setup and fixes' },
    { title: 'AI Search (GEO)', desc: 'Get cited by ChatGPT, Gemini, Perplexity, and Google AI Overviews' },
    { title: 'Off-Page Authority', desc: 'Backlinks, citations, and trust signals that earn Google\'s confidence' },
    { title: 'Website Design & Build', desc: 'Fast, modern sites and landing pages built to rank from day one' },
    { title: 'Clear direction & reporting', desc: 'A prioritized roadmap and monthly reports so you know what\'s working' },
  ];

  const whoFor = [
    'Local service businesses that want to own the map pack',
    'E-commerce stores that need product and category pages to rank',
    'SaaS and startups that want visibility in Google and AI search',
    'High-risk & restricted industries where paid ads are limited — SEO is your best channel',
    'Any business — in any industry — that wants to be found online',
  ];

  const whySeoMatters = [
    { stat: '68%', label: 'of online experiences begin with a search engine' },
    { stat: '53%', label: 'of all website traffic comes from organic search' },
    { stat: '0.63%', label: 'of users click on results from page two of Google' },
    { stat: '14.6%', label: 'close rate for SEO leads vs 1.7% for outbound' },
  ];

  const faqs = [
    {
      q: 'What services do you offer?',
      a: 'The full range of SEO and web work: technical & on-page SEO, keyword research and content, local SEO with Google Business Profile, Google Maps and Apple Maps, AI search (GEO) so you get cited by ChatGPT and Google AI Overviews, off-page authority and backlinks, e-commerce SEO, website design and build, plus analytics and monthly reporting. You choose exactly what you need.',
    },
    {
      q: 'How does it work?',
      a: 'On the Get Started page you select the services you\'re interested in. Your selection is emailed to us instantly and we reply in 2–6 hours with a tailored, one-on-one plan. There\'s no obligation.',
    },
    {
      q: 'Which industries do you work with?',
      a: 'Every industry — local service businesses, e-commerce, SaaS and tech, professional services, healthcare, hospitality, and more. The SEO fundamentals that move rankings apply everywhere.',
    },
    {
      q: 'Do you work with high-risk or restricted industries?',
      a: 'Yes. We work with high-risk and restricted verticals — including industries where paid ads are limited or banned (such as CBD, supplements, crypto, gaming, firearms, and adult-adjacent brands). For these businesses organic SEO is often the single most reliable growth channel, and we build it the compliant, durable way.',
    },
    {
      q: 'Can you get my business cited by ChatGPT and AI search?',
      a: 'Yes. Generative Engine Optimization (GEO) makes your site citation-ready for ChatGPT, Gemini, Perplexity, and Google AI Overviews through structured data, entity optimization, llms.txt discovery files, and AI-friendly content.',
    },
    {
      q: 'Do you add and fix Google Maps and Apple Maps listings?',
      a: 'Yes. We set up and optimize Google Business Profile and Google Maps rankings, and set up or fix Apple Maps / Apple Business Connect and Bing Places, with consistent NAP data and directory citations.',
    },
    {
      q: 'Do you also build websites?',
      a: 'Yes. We design and build fast, modern websites and landing pages engineered to rank from day one, and can redesign or optimize an existing site for speed, mobile, and conversions.',
    },
  ];

  const goTo = useCallback((next) => {
    // Accepts paths like '/', '/checkout', '/blog', '/blog/slug',
    // or hash-only anchors like '#pricing' (scroll within home page).
    if (!next) next = '/';
    if (next.startsWith('#')) {
      navigateAnchor('/' + next);
      return;
    }
    navigateAnchor(next);
    setRoute(getRouteFromPath(next));
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceRequest = async (e) => {
    e.preventDefault();
    setSubmitStatus('sending');
    const payload = {
      fullName: form.fullName,
      phone: form.phone,
      email: form.email,
      website: form.website,
      services: selectedServices.length ? selectedServices.join('\n• ') : 'No specific services selected',
      servicesCount: selectedServices.length,
      notes: form.notes,
      _subject: `New service request — RankFrame SEO (${selectedServices.length} services)`,
    };
    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Form submit failed');
    } catch (error) {
      console.error('Formspree submit failed:', error);
      setSubmitStatus('error');
      return;
    }
    setSubmitStatus('idle');
    goTo('/success');
  };

  /* ═══════════ SUCCESS PAGE ═══════════ */
  if (route === 'success') {
    return (
      <div className="grain-overlay min-h-screen bg-[#f3fbfb] text-gray-900">
        <SiteHeader goTo={goTo} />
        <main className="mx-auto flex max-w-4xl items-center px-6 py-20 lg:px-10">
          <section className="gold-glow w-full rounded-[2.5rem] border border-[#e1f1ee] bg-white p-10 text-center shadow-xl md:p-14">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-3xl text-emerald-600">✓</div>
            <div className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Request Received</div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl">Thanks — we've got your request</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Your selected services have been sent to our team. We'll review your site and reply in 2–6 hours to start a one-on-one conversation about your goals.
            </p>
            <div className="mx-auto mt-10 grid max-w-2xl gap-4 text-left sm:grid-cols-2">
              <div className="rounded-2xl bg-[#eef9f8] p-5 ring-1 ring-[#e1f1ee]">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Contact</div>
                <div className="mt-2 text-lg font-semibold text-gray-900">{form.fullName || 'Your name'}</div>
                <div className="mt-1 text-gray-600">{form.email || 'your@email.com'}</div>
              </div>
              <div className="rounded-2xl bg-[#eef9f8] p-5 ring-1 ring-[#e1f1ee]">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Services requested</div>
                <div className="mt-2 text-lg font-semibold text-gray-900">{selectedServices.length || '—'} selected</div>
                <div className="mt-1 text-gray-600">We'll tailor a one-on-one plan</div>
              </div>
            </div>
            <div className="mt-10">
              <button
                onClick={() => goTo('/')}
                className="btn-shimmer rounded-full px-8 py-4 text-sm font-bold text-white shadow-lg transition hover:scale-[1.02]"
              >
                Return to homepage
              </button>
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    );
  }

  /* ═══════════ BLOG LIST ═══════════ */
  /* ═══════════ GLOSSARY ═══════════ */
  if (route === 'glossary') {
    return (
      <div className="grain-overlay min-h-screen bg-[#f3fbfb] text-gray-900">
        <SiteHeader goTo={goTo} />
        <main className="mx-auto max-w-4xl px-6 py-20 lg:px-10">
          <div className="mb-12 text-center">
            <div className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Reference</div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl">SEO &amp; GEO Glossary</h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
              Plain-English definitions of 20 terms every small business should know — from Core Web Vitals and schema markup to llms.txt, AI Overviews, and Generative Engine Optimization.
            </p>
          </div>
          <dl className="space-y-8">
            {glossaryTerms.map((t) => (
              <div key={t.term} id={t.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="rounded-2xl border border-[#e1f1ee] bg-white p-7">
                <dt>
                  <h2 className="text-xl font-semibold text-gray-900 md:text-2xl">{t.term}</h2>
                  <p className="mt-1 text-sm text-emerald-600">{t.short}</p>
                </dt>
                <dd className="mt-4 text-base leading-7 text-gray-700">{t.definition}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-14 rounded-2xl border border-emerald-500/30 bg-white p-7 text-center">
            <p className="text-gray-700">Need the architecture behind these concepts implemented on your site?</p>
            <a href="/#pricing" onClick={(e) => { e.preventDefault(); goTo('/#pricing'); }} className="mt-4 inline-block rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500">
              See RankFrame SEO Plans →
            </a>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  /* ═══════════ STATISTICS ═══════════ */
  if (route === 'statistics') {
    return (
      <div className="grain-overlay min-h-screen bg-[#f3fbfb] text-gray-900">
        <SiteHeader goTo={goTo} />
        <main className="mx-auto max-w-5xl px-6 py-20 lg:px-10">
          <div className="mb-12 text-center">
            <div className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Data Set</div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl">SEO Statistics 2026</h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
              15 current statistics with sources — including benchmarks from RankFrame SEO's own audit dataset. Cite freely (CC BY 4.0) when writing about small-business SEO, technical SEO, or Core Web Vitals.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {seoStatistics.map((s, i) => (
              <div key={i} className="rounded-2xl border border-[#e1f1ee] bg-white p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">{s.category}</div>
                <div className="mt-3 text-4xl font-bold text-emerald-600">{s.stat}</div>
                <p className="mt-3 text-base leading-7 text-gray-700">{s.claim}</p>
                <p className="mt-4 text-xs text-gray-500">Source: {s.source}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 rounded-2xl border border-emerald-500/30 bg-white p-7 text-center">
            <p className="text-gray-700">Want the audit data behind these numbers applied to your site?</p>
            <a href="/#pricing" onClick={(e) => { e.preventDefault(); goTo('/#pricing'); }} className="mt-4 inline-block rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500">
              Start a RankFrame SEO Audit →
            </a>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  /* ═══════════ ABOUT ═══════════ */
  if (route === 'about') {
    return (
      <div className="grain-overlay min-h-screen bg-[#f3fbfb] text-gray-900">
        <SiteHeader goTo={goTo} />
        <main className="mx-auto max-w-3xl px-6 py-20 lg:px-10">
          <div className="mb-10 text-center">
            <div className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">About</div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl">{aboutContent.headline}</h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">{aboutContent.tagline}</p>
          </div>

          <section className="space-y-5 text-base leading-8 text-gray-700">
            {aboutContent.paragraphs.map((p, i) => (<p key={i}>{p}</p>))}
          </section>

          <section className="mt-14 rounded-2xl border border-[#e1f1ee] bg-white p-7">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">Founder</div>
            <h2 className="mt-3 text-2xl font-semibold text-gray-900">{aboutContent.founder.name}</h2>
            <p className="mt-1 text-sm text-emerald-600">{aboutContent.founder.role}</p>
            <p className="mt-4 text-base leading-7 text-gray-700">{aboutContent.founder.bio}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {aboutContent.founder.expertise.map((e) => (
                <span key={e} className="rounded-full border border-[#d7ece8] bg-[#eef9f8] px-3 py-1 text-xs text-gray-600">{e}</span>
              ))}
            </div>
            <div className="mt-5 flex gap-4 text-sm">
              {aboutContent.founder.links.map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="text-emerald-600 underline underline-offset-2 hover:text-emerald-400">{l.label} →</a>
              ))}
            </div>
          </section>

          <section className="mt-10 grid gap-5 md:grid-cols-2">
            {aboutContent.plans.map((p) => (
              <div key={p.name} className="rounded-2xl border border-[#e1f1ee] bg-white p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600">What we offer</div>
                <h3 className="mt-3 text-xl font-semibold text-gray-900">{p.name}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">{p.description}</p>
              </div>
            ))}
          </section>

          <section className="mt-10 rounded-2xl border border-[#e1f1ee] bg-white p-6 text-sm text-gray-600">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">Contact</div>
            <p className="mt-3">Email: <a href={`mailto:${aboutContent.contact.email}`} className="text-emerald-600 underline underline-offset-2">{aboutContent.contact.email}</a></p>
            <p className="mt-1">Primary country: {aboutContent.contact.country}</p>
          </section>

          <div className="mt-12 text-center">
            <a href="/#pricing" onClick={(e) => { e.preventDefault(); goTo('/#pricing'); }} className="inline-block rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500">
              Start Your Audit →
            </a>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  /* ═══════════ GET STARTED — SERVICE SELECTION ═══════════ */
  if (route === 'get-started') {
    return (
      <div className="grain-overlay min-h-screen bg-[#f3fbfb] text-gray-900">
        <SiteHeader goTo={goTo} />
        <main className="mx-auto max-w-5xl px-6 py-20 lg:px-10">
          <div className="mb-12 text-center">
            <div className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Build your plan</div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl">
              Select the services you need
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
              Pick everything you're interested in — across any industry. We'll receive your selection instantly and reply in 2–6 hours with a tailored, one-on-one plan. No obligation.
            </p>
          </div>

          <form onSubmit={handleServiceRequest} className="grid gap-8 lg:grid-cols-[1.35fr_0.85fr]">
            {/* ── Service catalog ── */}
            <div className="space-y-6">
              {SERVICE_GROUPS.map((g) => (
                <FadeIn key={g.group} className="reveal-card rounded-3xl border border-[#e1f1ee] bg-white/80 p-6 backdrop-blur md:p-8">
                  <div className="flex items-baseline justify-between gap-3">
                    <h2 className="text-lg font-bold text-gray-900">{g.group}</h2>
                    <span className="text-xs text-gray-500">{g.blurb}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {g.items.map((item) => {
                      const active = selectedServices.includes(item);
                      return (
                        <button
                          type="button"
                          key={item}
                          onClick={() => toggleService(item)}
                          aria-pressed={active}
                          className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                            active
                              ? 'border-emerald-500 bg-emerald-500 text-white shadow-sm'
                              : 'border-[#d7ece8] bg-[#f3fbfb] text-gray-700 hover:border-emerald-500 hover:text-emerald-700'
                          }`}
                        >
                          <span className="mr-1.5">{active ? '✓' : '+'}</span>{item}
                        </button>
                      );
                    })}
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* ── Contact + submit (sticky) ── */}
            <aside className="lg:sticky lg:top-24 h-fit">
              <div className="gold-glow rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-white to-[#edf9f7] p-6 shadow-xl md:p-8">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-600">Your request</div>
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-700">
                    {selectedServices.length} selected
                  </span>
                </div>

                <div className="mt-5 space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">Your name</label>
                    <input name="fullName" type="text" required value={form.fullName} onChange={handleInput} autoComplete="name" placeholder="Jane Smith"
                      className="w-full rounded-xl border border-[#d7ece8] bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">Email</label>
                    <input name="email" type="email" required value={form.email} onChange={handleInput} autoComplete="email" placeholder="you@business.com"
                      className="w-full rounded-xl border border-[#d7ece8] bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">Website <span className="font-normal text-gray-400">(optional)</span></label>
                    <input name="website" type="text" value={form.website} onChange={handleInput} placeholder="https://yoursite.com"
                      className="w-full rounded-xl border border-[#d7ece8] bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">Anything else? <span className="font-normal text-gray-400">(optional)</span></label>
                    <textarea name="notes" rows={3} value={form.notes} onChange={handleInput} placeholder="Your industry, goals, or biggest concern…"
                      className="w-full rounded-xl border border-[#d7ece8] bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" />
                  </div>
                </div>

                {submitStatus === 'error' && (
                  <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                    Something went wrong sending your request. Please try again in a moment.
                  </p>
                )}

                <button type="submit" disabled={submitStatus === 'sending'}
                  className="btn-shimmer mt-6 w-full rounded-full px-6 py-4 text-base font-bold text-white shadow-lg transition hover:scale-[1.01] disabled:opacity-60">
                  {submitStatus === 'sending' ? 'Sending…' : selectedServices.length ? `Send my ${selectedServices.length}-service request →` : 'Send my request →'}
                </button>
                <p className="mt-4 text-center text-xs text-gray-500">
                  No obligation · We reply in 2–6 hours
                </p>
              </div>

              <div className="mt-5 grid gap-3 text-sm">
                {[
                  ['One-on-one service', 'Work directly with us — no account-manager layers.'],
                  ['Every industry', 'Local, e-commerce, SaaS, professional services — and high-risk / restricted verticals too.'],
                  ['2–6 hours', 'We reply with a tailored plan, fast.'],
                ].map(([t, d]) => (
                  <div key={t} className="rounded-2xl border border-[#e1f1ee] bg-white/70 p-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">{t}</div>
                    <p className="mt-1.5 leading-6 text-gray-600">{d}</p>
                  </div>
                ))}
              </div>
            </aside>
          </form>
        </main>
        <SiteFooter />
      </div>
    );
  }

  /* ═══════════ NICHE + CITY + CROSS LANDING PAGES ═══════════ */
  if (route.startsWith('niche-') || route.startsWith('city-') || route.startsWith('cross-')) {
    const isCity = route.startsWith('city-');
    const isCross = route.startsWith('cross-');
    const dataKey = isCross
      ? route.slice('cross-'.length)
      : isCity
      ? route.slice('city-'.length)
      : route.slice('niche-'.length);
    const n = isCross ? crosses[dataKey] : isCity ? cities[dataKey] : niches[dataKey];
    if (!n) return null;
    const pageType = isCross ? 'Local SEO' : isCity ? 'Location' : 'Niche';
    // Cross pages link back to their city + industry; city pages link out to their crosses.
    const relatedCrosses = isCity ? crossesForCity(dataKey) : [];
    const parentCity = isCross ? cities[n.cityKey] : null;
    const parentNiche = isCross ? niches[n.nicheKey] : null;
    const whatWeDoLabel = isCross
      ? `What RankFrame does for ${n.label.toLowerCase()} in ${n.city}`
      : isCity
      ? `What RankFrame does for businesses in ${cities[dataKey].city}`
      : dataKey === 'dentists'
      ? 'What RankFrame does for dental practices'
      : dataKey === 'ecommerce'
      ? 'What RankFrame does for e-commerce stores'
      : `What RankFrame does for ${n.h1.replace(/^SEO for /, '').toLowerCase()}`;
    return (
      <div className="grain-overlay min-h-screen bg-[#f3fbfb] text-gray-900">
        <SiteHeader goTo={goTo} />
        <main className="mx-auto max-w-4xl px-6 py-20 lg:px-10">
          <div className="mb-10">
            <div className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">{pageType}</div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl">{n.h1}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600">{n.subhead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => goTo('/get-started')}
                className="btn-shimmer rounded-full px-6 py-3 text-sm font-bold text-white transition hover:scale-[1.02]"
              >
                Request Your Audit →
              </button>
              <button
                onClick={() => goTo('/#pricing')}
                className="rounded-full border border-[#d7ece8] bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-emerald-500/50 hover:text-emerald-600"
              >
                See what we do
              </button>
            </div>
          </div>

          <section className="mt-6 grid gap-5 md:grid-cols-3">
            {n.stats.map((s, i) => (
              <div key={i} className="rounded-2xl border border-[#e1f1ee] bg-white p-6">
                <div className="text-3xl font-bold text-emerald-600">{s.label}</div>
                <p className="mt-3 text-sm leading-6 text-gray-600">{s.text}</p>
              </div>
            ))}
          </section>

          <section className="mt-14">
            <h2 className="text-2xl font-semibold text-gray-900 md:text-3xl">Sound familiar?</h2>
            <ul className="mt-6 space-y-3">
              {n.painPoints.map((p, i) => (
                <li key={i} className="flex gap-3 rounded-xl border border-[#e1f1ee] bg-white p-4 text-gray-700">
                  <span className="text-emerald-600">→</span>
                  <span className="leading-7">{p}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-14 rounded-2xl border border-emerald-500/20 bg-white p-7 md:p-10">
            <h2 className="text-2xl font-semibold text-gray-900 md:text-3xl">{whatWeDoLabel}</h2>
            <ul className="mt-6 space-y-3">
              {n.whatWeDo.map((p, i) => (
                <li key={i} className="flex gap-3 text-gray-700">
                  <span className="text-emerald-600">✓</span>
                  <span className="leading-7">{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => goTo('/get-started')}
                className="btn-shimmer rounded-full px-6 py-3 text-sm font-bold text-white transition hover:scale-[1.02]"
              >
                Request Your Audit →
              </button>
            </div>
          </section>

          <section className="mt-14">
            <h2 className="text-2xl font-semibold text-gray-900 md:text-3xl">FAQ</h2>
            <div className="mt-6 space-y-4">
              {n.faq.map((f, i) => (
                <details key={i} className="rounded-2xl border border-[#e1f1ee] bg-white p-6 open:border-emerald-500/30">
                  <summary className="cursor-pointer text-lg font-semibold text-gray-900">{f.q}</summary>
                  <p className="mt-4 text-base leading-7 text-gray-700">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* City page → industry cross-links (internal linking + crawl paths to cross pages) */}
          {isCity && relatedCrosses.length > 0 && (
            <section className="mt-14">
              <h2 className="text-2xl font-semibold text-gray-900 md:text-3xl">Popular in {n.city}</h2>
              <p className="mt-3 text-gray-600">Local SEO by industry across the {n.city} area:</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {relatedCrosses.map((x) => (
                  <a
                    key={x.slug}
                    href={'/' + x.slug}
                    onClick={(e) => { e.preventDefault(); goTo('/' + x.slug); }}
                    className="card-hover-glow flex items-center justify-between rounded-xl border border-[#e1f1ee] bg-white px-5 py-4 transition hover:-translate-y-0.5"
                  >
                    <span className="text-sm font-bold text-gray-900">SEO for {x.label} in {x.city}</span>
                    <span className="text-sm font-medium text-emerald-700">→</span>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Cross page → parent city + industry links */}
          {isCross && (
            <section className="mt-14 rounded-2xl border border-[#e1f1ee] bg-white p-6">
              <div className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">Related</div>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {parentCity && (
                  <a href={'/' + parentCity.slug} onClick={(e) => { e.preventDefault(); goTo('/' + parentCity.slug); }} className="font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-600">
                    All SEO services in {parentCity.city} →
                  </a>
                )}
                {parentNiche && (
                  <a href={'/' + parentNiche.slug} onClick={(e) => { e.preventDefault(); goTo('/' + parentNiche.slug); }} className="font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-600">
                    {parentNiche.h1} (nationwide) →
                  </a>
                )}
              </div>
            </section>
          )}

          <div className="mt-14 rounded-2xl border border-emerald-500/30 bg-white p-7 text-center">
            <p className="text-lg text-gray-700">Ready to see exactly what's holding your rankings back?</p>
            <button
              onClick={() => goTo('/get-started')}
              className="btn-shimmer mt-5 rounded-full px-7 py-4 text-sm font-bold text-white transition hover:scale-[1.02]"
            >
              Start Your SEO Audit →
            </button>
            <p className="mt-4 text-xs text-gray-500">30+ sites optimized · One-on-one service · Reply in 2–6 hours</p>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (route === 'blog') {
    return (
      <div className="grain-overlay min-h-screen bg-[#f3fbfb] text-gray-900">
        <SiteHeader goTo={goTo} />
        <main className="mx-auto max-w-5xl px-6 py-20 lg:px-10">
          <div className="mb-10 text-center">
            <div className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">RankFrame Blog</div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl">SEO, Local &amp; AI Search Insights</h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
              Playbooks and field notes on technical SEO, local SEO and Google &amp; Apple Maps, AI search (GEO), backlinks, and website design — written for businesses in every industry that want to be found on Google and in AI answers.
            </p>
          </div>

          <div className="grid gap-6">
            {posts.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                onClick={(e) => { e.preventDefault(); goTo(`/blog/${post.slug}`); }}
                className="group block rounded-[2rem] border border-[#e1f1ee] bg-white p-8 transition hover:border-emerald-500/40 hover:bg-[#181818] md:p-10"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span>·</span>
                  <span>{post.readTime}</span>
                  <span>·</span>
                  <span className="text-emerald-600">{post.author}</span>
                </div>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-gray-900 transition group-hover:text-emerald-600 md:text-3xl">
                  {post.title}
                </h2>
                <p className="mt-4 text-base leading-7 text-gray-600">{post.excerpt}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-[#d7ece8] bg-[#eef9f8] px-3 py-1 text-xs text-gray-600">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6 text-sm font-semibold text-emerald-600 transition group-hover:translate-x-1">
                  Read article →
                </div>
              </a>
            ))}
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  /* ═══════════ BLOG POST ═══════════ */
  if (route === 'blog-post') {
    const post = getPostBySlug(getBlogSlug());
    if (!post) {
      return (
        <div className="grain-overlay min-h-screen bg-[#f3fbfb] text-gray-900">
          <SiteHeader goTo={goTo} />
          <main className="mx-auto max-w-3xl px-6 py-24 text-center lg:px-10">
            <h1 className="text-4xl font-semibold text-gray-900">Article not found</h1>
            <p className="mt-4 text-gray-600">The article you're looking for doesn't exist or has been moved.</p>
            <button
              onClick={() => goTo('/blog')}
              className="mt-10 rounded-full border border-[#d7ece8] bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-emerald-500/50 hover:text-emerald-600"
            >
              ← Back to blog
            </button>
          </main>
          <SiteFooter />
        </div>
      );
    }
    return (
      <div className="grain-overlay min-h-screen bg-[#f3fbfb] text-gray-900">
        <SiteHeader goTo={goTo} />
        <main className="mx-auto max-w-3xl px-6 py-16 lg:px-10">
          <div className="mb-8">
            <button
              onClick={() => goTo('/blog')}
              className="rounded-full border border-[#d7ece8] bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-emerald-500/50 hover:text-emerald-600"
            >
              ← All articles
            </button>
          </div>
          <article>
            <header className="mb-10">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span>·</span>
                <span>{post.readTime}</span>
                <span>·</span>
                <span className="text-emerald-600">{post.author}</span>
              </div>
              <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-gray-900 md:text-5xl">
                {post.title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">{post.excerpt}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-[#d7ece8] bg-[#eef9f8] px-3 py-1 text-xs text-gray-600">
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            <div className="prose-custom">
              <Markdown source={post.content} />
            </div>

            <aside className="mt-14 rounded-[2rem] border border-emerald-500/20 bg-gradient-to-br from-white to-[#eef9f8] p-8 md:p-10">
              <div className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">Ready to grow your rankings?</div>
              <h3 className="mt-3 text-2xl font-semibold text-gray-900 md:text-3xl">Get a tailored SEO plan from RankFrame</h3>
              <p className="mt-4 text-base leading-7 text-gray-600">
                From technical fixes and schema to Google Maps, AI search visibility, backlinks, and website builds — pick the services you need and we'll send a one-on-one plan in 2–6 hours.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => goTo('/get-started')}
                  className="btn-shimmer rounded-full px-6 py-3 text-sm font-bold text-white transition hover:scale-[1.02]"
                >
                  Get started
                </button>
                <button
                  onClick={() => goTo('#pricing')}
                  className="rounded-full border border-[#d7ece8] bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-emerald-500/50 hover:text-emerald-600"
                >
                  See what we do
                </button>
              </div>
            </aside>
          </article>
        </main>
        <SiteFooter />
      </div>
    );
  }

  /* ═══════════ HOME PAGE ═══════════ */
  return (
    <div className="grain-overlay min-h-screen bg-[#f3fbfb] text-gray-900">
      <SiteHeader goTo={goTo} />

      <main>
        {/* ── HERO ── */}
        <section id="home" className="relative overflow-hidden border-t border-[#e1f1ee]/50">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(56,189,248,0.10),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(20,184,166,0.06),transparent_50%)]" />
          {/* Decorative gold line */}
          <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

          <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-32">
            <FadeIn className="relative z-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2.5 text-sm font-medium text-emerald-700">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                SEO · Local · AI Search · Web Design — every industry
              </div>

              <h1 className="max-w-3xl text-5xl font-bold leading-[1.1] tracking-tight text-gray-900 md:text-6xl lg:text-[4.25rem]">
                Everything SEO{' '}
                <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 bg-clip-text text-transparent">
                  done for you
                </span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-600">
                Technical SEO, Google & Apple Maps, getting cited by ChatGPT and Google AI Overviews, backlinks and authority, e-commerce, and modern website design. Pick exactly what you need — we'll send you a tailored, one-on-one plan.
              </p>

              <p className="mt-6 text-sm font-medium text-gray-600">
                <span className="text-emerald-700 font-semibold">30+ websites</span> optimized — for businesses in every industry.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <button
                  onClick={() => goTo('/get-started')}
                  className="btn-shimmer group rounded-full px-7 py-4 text-sm font-bold text-white transition hover:scale-[1.02]"
                >
                  Select your services <span className="inline-block transition group-hover:translate-x-1">→</span>
                </button>
                <a
                  href="#pricing"
                  className="group rounded-full border border-[#d7ece8] bg-white px-7 py-4 text-sm font-semibold text-gray-700 transition hover:border-emerald-500/50 hover:text-emerald-600"
                >
                  See what we do <span className="inline-block transition group-hover:translate-x-1">→</span>
                </a>
              </div>

              {/* Mini stat cards */}
              <div className="mt-14 grid gap-4 sm:grid-cols-3">
                {[
                  ['50+ Services', 'Mix and match exactly what you need'],
                  ['Every Industry', 'Incl. high-risk & restricted verticals'],
                  ['1-on-1 Service', 'Work directly with us, reply in 2–6 hours'],
                ].map(([title, text], i) => (
                  <FadeIn key={title} delay={0.1 + i * 0.08} className="card-hover-glow rounded-2xl border border-[#e1f1ee] bg-white/80 p-5 backdrop-blur">
                    <div className="text-sm font-semibold text-emerald-700">{title}</div>
                    <div className="mt-2 text-sm leading-6 text-gray-500">{text}</div>
                  </FadeIn>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="relative z-10">
              <HeroServicePanel goTo={goTo} />
            </FadeIn>
          </div>
        </section>

        {/* ── Gold divider ── */}
        <div className="gold-divider mx-auto max-w-4xl" />

        {/* ── TRUST METRICS ── */}
        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10" aria-label="Key metrics">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((item, i) => (
              <FadeIn key={item.num} delay={i * 0.08} className="card-hover-glow rounded-[1.5rem] border border-[#e1f1ee] bg-white p-6 text-center">
                <div className="text-3xl font-bold text-emerald-600">{item.num}</div>
                <div className="mt-1 text-sm font-semibold text-gray-700">{item.label}</div>
                <div className="mt-3 text-xs text-gray-500">{item.text}</div>
              </FadeIn>
            ))}
          </div>
        </section>

        <div className="gold-divider mx-auto max-w-4xl" />

        {/* ── WHY SEO MATTERS ── */}
        <section id="why-seo" className="mx-auto max-w-7xl px-6 py-20 lg:px-10" aria-label="Why SEO matters">
          <FadeIn>
            <div className="rounded-[2.5rem] border border-emerald-500/20 bg-gradient-to-b from-white to-[#eef9f7] p-10 md:p-14 shadow-sm">
              <div className="text-center">
                <div className="text-xs font-bold uppercase tracking-[0.35em] text-emerald-600">Why SEO Matters</div>
                <h2 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                  Without SEO, your website is{' '}
                  <span className="bg-gradient-to-r from-emerald-500 to-sky-300 bg-clip-text text-transparent">invisible</span>
                </h2>
                <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
                  Search engine optimization is not optional — it is the foundation of how customers discover your business online. Every day without proper SEO is a day your competitors are outranking you.
                </p>
              </div>

              <div className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {whySeoMatters.map((item, i) => (
                  <FadeIn key={item.stat} delay={i * 0.1} className="rounded-2xl border border-emerald-500/10 bg-[#f3fbfb] p-6 text-center">
                    <div className="text-4xl font-bold text-emerald-600">{item.stat}</div>
                    <div className="mt-3 text-sm leading-6 text-gray-500">{item.label}</div>
                  </FadeIn>
                ))}
              </div>

              <div className="mx-auto mt-14 max-w-4xl space-y-5">
                {[
                  ['SEO drives the highest-quality traffic', 'Organic search delivers visitors who are actively looking for your products or services. Unlike paid ads that stop the moment you stop paying, SEO compounds over time — building a sustainable pipeline of leads and customers.'],
                  ['Your competitors are investing in SEO right now', 'If you are not actively monitoring your SEO health, someone else is ranking for the keywords your customers use. The longer you wait, the harder and more expensive it becomes to catch up.'],
                  ['Technical issues silently kill your rankings', 'Broken links, missing metadata, poor indexing coverage, and weak site architecture can cause Google to deprioritize your pages — even if your content is excellent. Regular audits catch these problems before they cost you traffic.'],
                ].map(([title, desc], i) => (
                  <FadeIn key={title} delay={i * 0.08} className="card-hover-glow rounded-2xl border border-[#e1f1ee] bg-[#f4fcfb] p-7">
                    <h3 className="text-lg font-bold text-emerald-600">{title}</h3>
                    <p className="mt-3 text-base leading-7 text-gray-600">{desc}</p>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>

        {/* ── WHAT YOU GET ── */}
        <section id="services" className="mx-auto max-w-7xl px-6 py-16 lg:px-10" aria-label="Services">
          <FadeIn>
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[2rem] bg-white p-10 ring-1 ring-[#e1f1ee]">
                <div className="text-xs font-bold uppercase tracking-[0.35em] text-emerald-600">What You Get</div>
                <h2 className="mt-5 text-4xl font-bold tracking-tight text-gray-900">
                  Full-service SEO built for clarity and action.
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Pick the services you need and we handle the rest — technical fixes, local and maps, AI search, authority, and web design — with clear reporting that shows what matters most.
                </p>
                <div className="gold-divider mt-8" />
                <div className="mt-8">
                  <div className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-600/70">Who This Is For</div>
                  <div className="mt-4 space-y-3">
                    {whoFor.map((item) => (
                      <div key={item} className="flex items-start gap-3 text-sm text-gray-600">
                        <span className="mt-0.5 text-emerald-600">→</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {deliverables.map((item, i) => (
                  <FadeIn key={item.title} delay={i * 0.06} className="card-hover-glow rounded-[1.5rem] border border-[#e1f1ee] bg-white p-6">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 text-sm font-bold text-emerald-600">
                      {item.icon}
                    </div>
                    <div className="text-base font-semibold leading-7 text-gray-700">{item.title}</div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>

        <div className="gold-divider mx-auto max-w-4xl" />

        {/* ── CASE STUDY: PACK EXPO ── */}
        <article id="case-study" className="mx-auto max-w-7xl px-6 py-16 lg:px-10" aria-label="Case study">
          <FadeIn>
            <div className="rounded-[2.5rem] border border-[#e1f1ee] bg-white p-10 md:p-14">
              <div className="max-w-3xl">
                <div className="text-xs font-bold uppercase tracking-[0.35em] text-emerald-600">Real Case Study</div>
                <h2 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                  PACK EXPO International — Marketing Audit Report
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  We analyzed packexpointernational.com, one of the largest packaging trade shows in North America with 77,500 attendees and 2,600+ exhibitors. Our audit uncovered significant opportunities across 6 categories — proving that even major brands have critical SEO and marketing gaps.
                </p>
              </div>

              <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.95fr]">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Score Card */}
                  <FadeIn delay={0.1} className="rounded-[1.5rem] bg-[#eef9f8] p-7 ring-1 ring-[#e1f1ee]">
                    <div className="text-xs font-bold uppercase tracking-[0.25em] text-gray-500">Overall Score</div>
                    <div className="mt-5 flex items-end gap-2">
                      <span className="text-6xl font-bold text-emerald-600">66</span>
                      <span className="mb-2 text-2xl text-gray-600">/100</span>
                    </div>
                    <div className="mt-2 text-base font-bold text-emerald-600">Grade: C+</div>

                    <div className="mt-6 space-y-3">
                      {[
                        ['Content & Messaging', 62, 'gray-200'],
                        ['Conversion Optimization', 52, 'emerald-500'],
                        ['SEO & Discoverability', 72, 'gray-200'],
                        ['Competitive Positioning', 67, 'gray-200'],
                        ['Brand & Trust', 74, 'gray-200'],
                        ['Growth & Strategy', 82, 'green-400'],
                      ].map(([label, score, color]) => (
                        <div key={label}>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>{label}</span>
                            <span className={`text-${color} font-semibold`}>{score}/100</span>
                          </div>
                          <div className="mt-1 h-1 rounded-full bg-gray-800">
                            <div className="score-bar h-1 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-500" style={{ width: `${score}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </FadeIn>

                  {/* Key Findings */}
                  <FadeIn delay={0.15} className="rounded-[1.5rem] bg-[#eef9f8] p-7 ring-1 ring-emerald-500/15">
                    <div className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-600">Key Findings</div>
                    <div className="mt-5 space-y-3 text-sm">
                      <div className="rounded-lg bg-red-500/10 px-3 py-2.5 text-red-600">Critical: No urgency mechanics on early bird pricing</div>
                      <div className="rounded-lg bg-red-500/10 px-3 py-2.5 text-red-600">Critical: Homepage headline fails 5-second test</div>
                      <div className="rounded-lg bg-emerald-500/10 px-3 py-2.5 text-emerald-600">High: Missing Event schema JSON-LD</div>
                      <div className="rounded-lg bg-emerald-500/10 px-3 py-2.5 text-emerald-600">High: Zero competitor comparison pages</div>
                      <div className="rounded-lg bg-blue-500/10 px-3 py-2.5 text-blue-600">Medium: Meta description exceeds 160 chars</div>
                    </div>
                  </FadeIn>
                </div>

                {/* Impact */}
                <FadeIn delay={0.2} className="gold-glow rounded-[1.5rem] border border-emerald-500/20 bg-[#f4fcfb] p-8 text-gray-900">
                  <div className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-600">Impact Analysis</div>
                  <h3 className="mt-4 text-3xl font-bold tracking-tight">$200K–$575K/mo potential</h3>
                  <p className="mt-5 text-base leading-7 text-gray-600">
                    Implementing all recommendations could drive $200,000–$575,000/month in incremental value through increased registrations and higher conversion rates.
                  </p>

                  <div className="mt-8 space-y-3 text-[0.95rem] text-gray-700">
                    {[
                      'Identified conversion optimization gaps (52/100)',
                      'Flagged missing structured data for Google rich results',
                      'Mapped competitive positioning vs Interpack, FachPack, ProPak',
                      'Delivered prioritized action plan: quick wins → strategic',
                    ].map((text) => (
                      <div key={text} className="flex items-start gap-3">
                        <span className="mt-1 text-emerald-600">✔</span>
                        <span>{text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-5">
                    <div className="text-xs uppercase tracking-[0.2em] text-gray-500">Estimated Impact</div>
                    <div className="mt-2 text-2xl font-bold text-emerald-600">+15–25% registration conversion</div>
                  </div>

                  <a
                    href="/case-study-pack-expo.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shimmer mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-white shadow-lg transition hover:scale-[1.02]"
                  >
                    Download Full Case Study PDF →
                  </a>
                </FadeIn>
              </div>
            </div>
          </FadeIn>
        </article>

        <div className="gold-divider mx-auto max-w-4xl" />

        {/* ── BENEFITS ── */}
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10" aria-label="Benefits">
          <div className="mb-10 text-center">
            <div className="text-xs font-bold uppercase tracking-[0.35em] text-emerald-600">Benefits</div>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-gray-900">Why businesses choose RankFrame</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.06} className="card-hover-glow rounded-[1.5rem] border border-[#e1f1ee] bg-white p-7">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 text-base text-emerald-600">
                  ✦
                </div>
                <div className="mt-5 text-base font-bold text-gray-900">{item.title}</div>
                <div className="mt-2 text-sm leading-6 text-gray-500">{item.desc}</div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-20 lg:px-10" aria-label="How it works">
          <FadeIn>
            <div className="mb-12 text-center">
              <div className="text-xs font-bold uppercase tracking-[0.35em] text-emerald-600">How It Works</div>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                Three steps to better SEO
              </h2>
            </div>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-3">
            {process.map((item, i) => (
              <FadeIn key={item.step} delay={i * 0.1} className="card-hover-glow group rounded-[1.5rem] border border-[#e1f1ee] bg-white p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-lg font-bold text-white shadow-lg shadow-emerald-500/20 transition group-hover:scale-110">
                  {item.step}
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-gray-600">{item.text}</p>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── FOCUS / MISSION (dark gold section) ── */}
        <section id="focus" className="mx-auto max-w-7xl px-6 py-8 lg:px-10" aria-label="Our focus">
          <FadeIn>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-[#f4fcfb] px-8 py-16 text-center md:px-16">
              {/* Decorative corner accents */}
              <div className="absolute left-0 top-0 h-32 w-32 bg-gradient-to-br from-emerald-500/10 to-transparent" />
              <div className="absolute bottom-0 right-0 h-32 w-32 bg-gradient-to-tl from-emerald-500/10 to-transparent" />
              <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
              <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

              <div className="relative z-10">
                <div className="text-xs font-bold uppercase tracking-[0.35em] text-emerald-600/80">What We Focus On</div>
                <h2 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                  SEO structure. Monthly reporting.{' '}
                  <span className="bg-gradient-to-r from-emerald-500 to-sky-300 bg-clip-text text-transparent">Keyword visibility.</span>
                </h2>
                <div className="mx-auto mt-6 h-px w-16 bg-emerald-500/50" />
                <p className="mx-auto mt-10 max-w-3xl text-xl leading-9 text-gray-700">
                  We review how your website is structured, how search engines interpret it, and where visibility can be improved.
                </p>
                <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-500">
                  Instead of overwhelming clients with scattered data, we organize findings into a report that is simple, useful, and actionable.
                </p>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* ── SERVICES ── */}
        <section id="pricing" className="mx-auto max-w-6xl px-6 pb-12 pt-20 lg:px-10" aria-label="Services">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="text-xs font-bold uppercase tracking-[0.35em] text-emerald-600">SEO Services · Every Industry</div>
              <h2 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                Everything SEO — pick exactly what you need
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                From technical fixes and Google Maps to getting cited by ChatGPT and building your website — for businesses in every industry. Select the services you want and we'll send you a tailored one-on-one plan.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {SERVICE_GROUPS.map((g, i) => (
                <FadeIn
                  key={g.group}
                  delay={0.05 * i}
                  className="reveal-card group rounded-3xl border border-[#e1f1ee] bg-white/70 p-6 backdrop-blur transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <h3 className="text-lg font-bold text-gray-900">{g.group}</h3>
                  <p className="mt-1 text-sm text-emerald-700">{g.blurb}</p>
                  <ul className="mt-4 space-y-2">
                    {g.items.slice(0, 6).map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                        <span className="mt-0.5 text-emerald-500">✓</span> {item}
                      </li>
                    ))}
                    {g.items.length > 6 && (
                      <li className="text-sm font-medium text-emerald-700">+ {g.items.length - 6} more</li>
                    )}
                  </ul>
                </FadeIn>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={() => goTo('/get-started')}
                className="btn-shimmer inline-flex rounded-full px-9 py-4 text-base font-bold text-white shadow-lg transition hover:scale-[1.02]"
              >
                Choose your services →
              </button>
              <p className="mt-4 text-sm text-gray-500">Free to ask · One-on-one service · Reply in 2–6 hours</p>
            </div>
          </FadeIn>
        </section>

        {/* ── INDUSTRIES ── */}
        <section id="industries" className="mx-auto max-w-6xl px-6 py-16 lg:px-10" aria-label="Industries we serve">
          <FadeIn>
            <div className="mb-10 text-center">
              <div className="text-xs font-bold uppercase tracking-[0.35em] text-emerald-600">Industries</div>
              <h2 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                SEO for your industry
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                We work with businesses in every industry. Explore the playbook for yours, or just ask us about any field. Restricted and high-risk verticals have a dedicated section below.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {NICHE_KEYS.filter((k) => !niches[k].highRisk).map((k, i) => (
                <FadeIn key={k} delay={i * 0.04}>
                  <a
                    href={'/' + niches[k].slug}
                    onClick={(e) => { e.preventDefault(); goTo('/' + niches[k].slug); }}
                    className="card-hover-glow block h-full rounded-2xl border border-[#e1f1ee] bg-white/70 p-5 backdrop-blur transition hover:-translate-y-1"
                  >
                    <div className="text-base font-bold leading-6 text-gray-900">{niches[k].h1}</div>
                    <div className="mt-2 text-sm font-medium text-emerald-700">Learn more →</div>
                  </a>
                </FadeIn>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-gray-500">
              Don’t see yours? We do SEO for every industry —{' '}
              <button onClick={() => goTo('/get-started')} className="font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-600">just ask</button>.
            </p>
          </FadeIn>

          {/* Local SEO by city */}
          <FadeIn>
            <div className="mt-14 rounded-[2rem] border border-[#e1f1ee] bg-white/70 p-8 backdrop-blur md:p-10">
              <div className="text-center">
                <div className="text-xs font-bold uppercase tracking-[0.35em] text-emerald-600">Local SEO by city</div>
                <h3 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
                  Rank in your city’s map pack
                </h3>
                <p className="mx-auto mt-3 max-w-2xl text-base text-gray-600">
                  Local search is decided market by market. Explore how we rank businesses in these metros — or ask about yours.
                </p>
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {CITY_KEYS.map((k, i) => (
                  <FadeIn key={k} delay={i * 0.03}>
                    <a
                      href={'/' + cities[k].slug}
                      onClick={(e) => { e.preventDefault(); goTo('/' + cities[k].slug); }}
                      className="card-hover-glow flex items-center justify-between rounded-xl border border-[#e1f1ee] bg-white px-5 py-4 transition hover:-translate-y-0.5"
                    >
                      <span className="text-sm font-bold text-gray-900">SEO in {cities[k].city}</span>
                      <span className="text-sm font-medium text-emerald-700">→</span>
                    </a>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>

        {/* ── High-Risk & Restricted Industries ── */}
        <section id="high-risk" className="mx-auto max-w-6xl px-6 py-16 lg:px-10" aria-label="High-risk and restricted industry SEO">
          <FadeIn>
            <div className="overflow-hidden rounded-[2.5rem] border border-emerald-500/25 bg-gradient-to-br from-white via-[#f0faf8] to-[#eaf6ff] p-8 md:p-12">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-emerald-700">
                  Our specialty
                </div>
                <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                  SEO for high-risk &amp; restricted industries
                </h2>
                <p className="mt-5 text-lg leading-8 text-gray-700">
                  If you sell CBD, peptides, supplements, crypto, firearms, or run an iGaming or betting brand, Google and Meta ads are banned or throttled for your category — so paid growth is unreliable or impossible. That makes organic SEO your single most dependable channel, and it&apos;s the area we&apos;ve gone deepest in.
                </p>
                <p className="mt-4 text-lg leading-8 text-gray-700">
                  We have more experience and get better results in restricted verticals than typical agencies — most of which either refuse these industries or use shady link schemes that invite a penalty. Our approach is fully compliant and white-hat: durable technical SEO, E-E-A-T-strong content, and earned authority that survives algorithm updates and can&apos;t be switched off by an ad reviewer.
                </p>
              </div>

              <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {NICHE_KEYS.filter((k) => niches[k].highRisk).map((k, i) => (
                  <FadeIn key={k} delay={i * 0.04}>
                    <a
                      href={'/' + niches[k].slug}
                      onClick={(e) => { e.preventDefault(); goTo('/' + niches[k].slug); }}
                      className="card-hover-glow block h-full rounded-2xl border border-emerald-500/20 bg-white p-5 transition hover:-translate-y-1"
                    >
                      <div className="text-base font-bold leading-6 text-gray-900">{niches[k].h1.replace(/^SEO for /, '')}</div>
                      <div className="mt-2 text-sm font-medium text-emerald-700">See the playbook →</div>
                    </a>
                  </FadeIn>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => goTo('/get-started')}
                  className="btn-shimmer rounded-full px-6 py-3 text-sm font-bold text-white transition hover:scale-[1.02]"
                >
                  Get restricted-industry SEO →
                </button>
                <a
                  href="/blog/seo-for-high-risk-industries-2026"
                  onClick={(e) => { e.preventDefault(); goTo('/blog/seo-for-high-risk-industries-2026'); }}
                  className="text-sm font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-600"
                >
                  Read the high-risk SEO playbook
                </a>
              </div>
              <p className="mt-6 text-sm text-gray-500">
                Don&apos;t see your restricted category? We likely cover it —{' '}
                <button onClick={() => goTo('/get-started')} className="font-semibold text-emerald-700 underline underline-offset-2 hover:text-emerald-600">just ask</button>.
              </p>
            </div>
          </FadeIn>
        </section>

        {/* ── FAQ ── */}
        <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10" aria-label="FAQ">
          <FadeIn>
            <div className="rounded-[2.5rem] border border-[#e1f1ee] bg-white p-10 md:p-14">
              <div className="text-center">
                <div className="text-xs font-bold uppercase tracking-[0.35em] text-emerald-600">FAQ</div>
                <h2 className="mt-4 text-4xl font-bold tracking-tight text-gray-900">Common questions</h2>
              </div>
              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {faqs.map((item) => (
                  <div key={item.q} className="card-hover-glow rounded-xl border border-[#e1f1ee] bg-[#eef9f8] p-6">
                    <div className="text-base font-bold text-gray-900">{item.q}</div>
                    <div className="mt-3 text-sm leading-7 text-gray-600">{item.a}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="mx-auto max-w-5xl px-6 pb-24 pt-12 lg:px-10" aria-label="Get started">
          <FadeIn>
            <div className="relative overflow-hidden rounded-[2.5rem] border border-emerald-500/20 bg-[#f4fcfb] px-8 py-14 text-center text-gray-900 md:px-14">
              <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
              <div className="text-xs font-bold uppercase tracking-[0.35em] text-emerald-600">Ready to start?</div>
              <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
                Tell us what you need — we'll handle the rest
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
                Select the services you want and we'll send you a tailored, one-on-one plan in 2–6 hours. No obligation.
              </p>
              <button
                onClick={() => goTo('/get-started')}
                className="btn-shimmer mt-8 inline-flex rounded-full px-10 py-4 text-sm font-bold text-white shadow-lg transition hover:scale-[1.03]"
              >
                Get my tailored plan →
              </button>
            </div>
          </FadeIn>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

/* ═══════════ SITE HEADER ═══════════ */
function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    ['/#pricing', 'Services'],
    ['/#industries', 'Industries'],
    ['/#why-seo', 'Why SEO'],
    ['/#how-it-works', 'How It Works'],
    ['/#case-study', 'Case Study'],
    ['/blog', 'Blog'],
    ['/get-started', 'Get Started'],
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    navigateAnchor(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#e1f1ee]/50 bg-[#f3fbfb]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="/" onClick={(e) => handleNavClick(e, '/')} className="flex items-center gap-3 text-left">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#dcece8] bg-white shadow-sm shadow-emerald-500/10 lg:h-12 lg:w-12" aria-hidden="true">
            <svg width="30" height="30" viewBox="0 0 64 64" fill="none">
              <defs>
                <linearGradient id="rfHead" x1="14" y1="50" x2="50" y2="14" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#10b981" /><stop offset="0.5" stopColor="#06b6d4" /><stop offset="1" stopColor="#0ea5e9" />
                </linearGradient>
              </defs>
              <path d="M30.53 41.00 24.29 29.68H22.53V41.00H15.23V11.00H27.49Q31.04 11.00 33.54 12.24Q36.04 13.48 37.28 15.64Q38.52 17.79 38.52 20.44Q38.52 23.44 36.83 25.79Q35.14 28.14 31.85 29.12L38.77 41.00ZM22.53 24.50H27.06Q29.07 24.50 30.08 23.52Q31.08 22.54 31.08 20.74Q31.08 19.03 30.08 18.05Q29.07 17.07 27.06 17.07H22.53Z" fill="url(#rfHead)" />
              <path d="M13 53 L24 46 L34 50 L52 33" stroke="url(#rfHead)" strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M46 33 L52 33 L52 39" stroke="url(#rfHead)" strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span>
            <div className="text-2xl font-bold tracking-tight text-gray-900 lg:text-3xl">
              Rank<span className="bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent">Frame</span>
            </div>
            <div className="text-[0.65rem] uppercase tracking-[0.3em] text-gray-600">SEO · Local · AI Search · Web Design</div>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex" aria-label="Main navigation">
          {navLinks.map(([href, label]) => (
            <a key={href} href={href} onClick={(e) => handleNavClick(e, href)} className="transition hover:text-emerald-600">{label}</a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e1f1ee] bg-white text-gray-700 md:hidden"
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            {menuOpen
              ? <><line x1="4" y1="4" x2="16" y2="16" /><line x1="16" y1="4" x2="4" y2="16" /></>
              : <><line x1="3" y1="6" x2="17" y2="6" /><line x1="3" y1="10" x2="17" y2="10" /><line x1="3" y1="14" x2="17" y2="14" /></>
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="border-t border-[#e1f1ee]/50 bg-[#f3fbfb] px-6 pb-6 pt-4 md:hidden" aria-label="Mobile navigation">
          <div className="grid gap-2">
            {navLinks.map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:text-emerald-600"
              >
                {label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

function navigateAnchor(href) {
  if (href.startsWith('/#')) {
    const id = href.slice(2);
    if (window.location.pathname !== '/') {
      // Coming from another route: switch to home, then the route effect scrolls to the hash.
      window.history.pushState({}, '', href);
      window.dispatchEvent(new PopStateEvent('popstate'));
    } else {
      // Already on home: route won't change, so scroll to the section directly.
      window.history.replaceState({}, '', href);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.dispatchEvent(new HashChangeEvent('hashchange'));
      }
    }
  } else {
    window.history.pushState({}, '', href);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
}

/* ═══════════ SITE FOOTER ═══════════ */
function SiteFooter() {
  const footerLinkClick = (e, href) => {
    e.preventDefault();
    navigateAnchor(href);
  };
  return (
    <footer className="border-t border-[#e1f1ee] bg-[#eef9f8]" aria-label="Footer">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-gray-900">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#dcece8] bg-white shadow-sm" aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 64 64" fill="none">
                  <defs>
                    <linearGradient id="rfFoot" x1="14" y1="50" x2="50" y2="14" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#10b981" /><stop offset="0.5" stopColor="#06b6d4" /><stop offset="1" stopColor="#0ea5e9" />
                    </linearGradient>
                  </defs>
                  <path d="M30.53 41.00 24.29 29.68H22.53V41.00H15.23V11.00H27.49Q31.04 11.00 33.54 12.24Q36.04 13.48 37.28 15.64Q38.52 17.79 38.52 20.44Q38.52 23.44 36.83 25.79Q35.14 28.14 31.85 29.12L38.77 41.00ZM22.53 24.50H27.06Q29.07 24.50 30.08 23.52Q31.08 22.54 31.08 20.74Q31.08 19.03 30.08 18.05Q29.07 17.07 27.06 17.07H22.53Z" fill="url(#rfFoot)" />
                  <path d="M13 53 L24 46 L34 50 L52 33" stroke="url(#rfFoot)" strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M46 33 L52 33 L52 39" stroke="url(#rfFoot)" strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>Rank<span className="bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent">Frame</span> SEO</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-gray-600">
              Full-service SEO, local & map optimization, AI search visibility, and website design for businesses in every industry — clear direction and measurable progress.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500">Navigation</div>
            <nav className="mt-5 grid gap-3" aria-label="Footer navigation">
              {[
                ['/get-started', 'Get Started'],
                ['/#pricing', 'Services'],
                ['/#case-study', 'Case Study'],
                ['/blog', 'Blog'],
                ['/about', 'About'],
              ].map(([href, label]) => (
                <a key={href} href={href} onClick={(e) => footerLinkClick(e, href)} className="text-sm text-gray-600 transition hover:text-emerald-600">{label}</a>
              ))}

              {/* Collapsible collection — keeps the footer clean while all links stay crawlable */}
              <details className="group mt-1">
                <summary className="flex cursor-pointer list-none items-center gap-1.5 text-sm font-medium text-gray-600 transition hover:text-emerald-600 [&::-webkit-details-marker]:hidden">
                  Industries &amp; Guides
                  <span className="text-[10px] text-gray-400 transition-transform duration-200 group-open:rotate-180">▼</span>
                </summary>
                <div className="mt-3 grid gap-2.5 border-l border-[#d7ece8] pl-4">
                  {[
                    ['/glossary', 'SEO Glossary'],
                    ['/statistics', 'SEO Statistics'],
                    ['/seo-for-dentists', 'SEO for Dentists'],
                    ['/seo-for-ecommerce', 'SEO for E-commerce'],
                    ['/seo-for-law-firms', 'SEO for Law Firms'],
                    ['/seo-for-restaurants', 'SEO for Restaurants'],
                    ['/seo-for-real-estate', 'SEO for Real Estate'],
                    ['/seo-for-contractors', 'SEO for Contractors'],
                    ['/seo-for-cbd', 'SEO for CBD Brands'],
                    ['/seo-for-saas', 'SEO for SaaS'],
                  ].map(([href, label]) => (
                    <a key={href} href={href} onClick={(e) => footerLinkClick(e, href)} className="text-sm text-gray-500 transition hover:text-emerald-600">{label}</a>
                  ))}
                </div>
              </details>

              {/* Collapsible collection — local SEO city pages, kept crawlable */}
              <details className="group mt-1">
                <summary className="flex cursor-pointer list-none items-center gap-1.5 text-sm font-medium text-gray-600 transition hover:text-emerald-600 [&::-webkit-details-marker]:hidden">
                  Local SEO by City
                  <span className="text-[10px] text-gray-400 transition-transform duration-200 group-open:rotate-180">▼</span>
                </summary>
                <div className="mt-3 grid gap-2.5 border-l border-[#d7ece8] pl-4">
                  {CITY_KEYS.map((k) => (
                    <a key={k} href={'/' + cities[k].slug} onClick={(e) => footerLinkClick(e, '/' + cities[k].slug)} className="text-sm text-gray-500 transition hover:text-emerald-600">SEO in {cities[k].city}</a>
                  ))}
                </div>
              </details>
            </nav>
          </div>

          {/* Service Info */}
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500">What we do</div>
            <div className="mt-5 space-y-3 text-sm text-gray-600">
              <div>Technical & On-Page SEO</div>
              <div>Local SEO — Google & Apple Maps</div>
              <div>AI Search (GEO) visibility</div>
              <div>Website Design & Build</div>
              <div className="pt-2 text-emerald-700 font-semibold">Every industry · One-on-one service</div>
            </div>
          </div>
        </div>

        <div className="gold-divider mt-12" />

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-gray-600 sm:flex-row">
          <div>&copy; {new Date().getFullYear()} RankFrame SEO. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="/" onClick={(e) => footerLinkClick(e, '/')} className="transition hover:text-emerald-600">Home</a>
            <a href="/#pricing" onClick={(e) => footerLinkClick(e, '/#pricing')} className="transition hover:text-emerald-600">Services</a>
            <a href="/#case-study" onClick={(e) => footerLinkClick(e, '/#case-study')} className="transition hover:text-emerald-600">Case Study</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return iso;
  }
}

/* Render a limited Markdown subset safely (no HTML passthrough).
   Supports: # h1, ## h2, ### h3, **bold**, *italic*, `code`, lists (- and 1.),
   code fences ```...```, paragraphs. */
function renderInline(text, keyPrefix) {
  // Tokenize inline: [text](url), **bold**, *italic*, `code`
  const parts = [];
  const regex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let last = 0;
  let m;
  let i = 0;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith('[')) {
      const match = tok.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (match) {
        const [, label, url] = match;
        const isInternal = url.startsWith('/');
        parts.push(
          <a
            key={keyPrefix + '-a-' + i}
            href={url}
            onClick={isInternal ? (e) => {
              e.preventDefault();
              window.history.pushState({}, '', url);
              window.dispatchEvent(new PopStateEvent('popstate'));
            } : undefined}
            target={isInternal ? undefined : '_blank'}
            rel={isInternal ? undefined : 'noopener noreferrer'}
            className="text-emerald-600 underline underline-offset-2 transition hover:text-emerald-400"
          >
            {label}
          </a>
        );
      }
    } else if (tok.startsWith('**')) {
      parts.push(<strong key={keyPrefix + '-b-' + i} className="text-gray-900">{tok.slice(2, -2)}</strong>);
    } else if (tok.startsWith('`')) {
      parts.push(
        <code key={keyPrefix + '-c-' + i} className="rounded bg-[#eef9f8] px-1.5 py-0.5 text-sm text-emerald-400">
          {tok.slice(1, -1)}
        </code>
      );
    } else if (tok.startsWith('*')) {
      parts.push(<em key={keyPrefix + '-i-' + i}>{tok.slice(1, -1)}</em>);
    }
    last = m.index + tok.length;
    i += 1;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function Markdown({ source }) {
  const lines = source.split('\n');
  const blocks = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    // Code fence
    if (line.startsWith('```')) {
      const buf = [];
      i += 1;
      while (i < lines.length && !lines[i].startsWith('```')) {
        buf.push(lines[i]);
        i += 1;
      }
      i += 1; // skip closing ```
      blocks.push(
        <pre
          key={'pre-' + i}
          className="my-6 overflow-x-auto rounded-2xl border border-[#e1f1ee] bg-[#0f2b28] p-5 text-sm leading-6 text-gray-100"
        >
          <code>{buf.join('\n')}</code>
        </pre>
      );
      continue;
    }
    // Headings
    if (line.startsWith('### ')) {
      blocks.push(
        <h3 key={'h3-' + i} className="mt-10 mb-4 text-xl font-semibold text-gray-900 md:text-2xl">
          {renderInline(line.slice(4), 'h3' + i)}
        </h3>
      );
      i += 1;
      continue;
    }
    if (line.startsWith('## ')) {
      blocks.push(
        <h2 key={'h2-' + i} className="mt-12 mb-4 text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
          {renderInline(line.slice(3), 'h2' + i)}
        </h2>
      );
      i += 1;
      continue;
    }
    if (line.startsWith('# ')) {
      blocks.push(
        <h2 key={'h1-' + i} className="mt-12 mb-4 text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
          {renderInline(line.slice(2), 'h1' + i)}
        </h2>
      );
      i += 1;
      continue;
    }
    // Unordered list
    if (/^[-*] /.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*] /.test(lines[i])) {
        items.push(lines[i].slice(2));
        i += 1;
      }
      blocks.push(
        <ul key={'ul-' + i} className="my-5 list-disc space-y-2 pl-6 text-gray-700">
          {items.map((it, idx) => (
            <li key={idx} className="leading-7">{renderInline(it, 'li' + idx)}</li>
          ))}
        </ul>
      );
      continue;
    }
    // Ordered list
    if (/^\d+\.\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ''));
        i += 1;
      }
      blocks.push(
        <ol key={'ol-' + i} className="my-5 list-decimal space-y-2 pl-6 text-gray-700">
          {items.map((it, idx) => (
            <li key={idx} className="leading-7">{renderInline(it, 'oli' + idx)}</li>
          ))}
        </ol>
      );
      continue;
    }
    // Blank line
    if (line.trim() === '') {
      i += 1;
      continue;
    }
    // Paragraph (may span multiple non-blank lines)
    const paraBuf = [line];
    i += 1;
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].startsWith('#') &&
      !lines[i].startsWith('```') &&
      !/^[-*] /.test(lines[i]) &&
      !/^\d+\.\s/.test(lines[i])
    ) {
      paraBuf.push(lines[i]);
      i += 1;
    }
    blocks.push(
      <p key={'p-' + i} className="my-5 text-base leading-8 text-gray-700 md:text-lg">
        {renderInline(paraBuf.join(' '), 'p' + i)}
      </p>
    );
  }
  return <>{blocks}</>;
}

function getRouteFromPath(path) {
  // Strip query/hash
  const clean = path.split('?')[0].split('#')[0];
  if (clean === '/checkout' || clean === '/checkout/') return 'get-started';
  if (clean === '/success' || clean === '/success/') return 'success';
  if (clean === '/glossary' || clean === '/glossary/') return 'glossary';
  if (clean === '/statistics' || clean === '/statistics/') return 'statistics';
  if (clean === '/about' || clean === '/about/') return 'about';
  if (clean === '/get-started' || clean === '/get-started/' || clean === '/free-audit' || clean === '/free-audit/') return 'get-started';
  // Dynamic niche routing — any slug defined in content/niches.js resolves automatically.
  const nicheSlug = clean.replace(/^\//, '').replace(/\/$/, '');
  const nicheKey = NICHE_KEYS.find((k) => niches[k].slug === nicheSlug);
  if (nicheKey) return 'niche-' + nicheKey;
  // Dynamic city routing — any slug defined in content/cities.js resolves automatically.
  const cityKey = CITY_KEYS.find((k) => cities[k].slug === nicheSlug);
  if (cityKey) return 'city-' + cityKey;
  // Dynamic industry × city cross routing — e.g. /seo-for-restaurants-in-miami
  const crossKey = CROSS_KEYS.find((k) => crosses[k].slug === nicheSlug);
  if (crossKey) return 'cross-' + crossKey;
  if (clean === '/blog' || clean === '/blog/') return 'blog';
  if (clean.startsWith('/blog/')) return 'blog-post';
  return 'home';
}

function getRoute() {
  return getRouteFromPath(window.location.pathname);
}

function getBlogSlug() {
  const path = window.location.pathname;
  if (path.startsWith('/blog/')) {
    return path.slice('/blog/'.length).replace(/\/$/, '');
  }
  return '';
}
