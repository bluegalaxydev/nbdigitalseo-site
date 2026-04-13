import { useEffect, useMemo, useState, useRef, useCallback } from 'react';

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
        transform: vis ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
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

  const stripeUrl = 'https://buy.stripe.com/8x2cMXbuO81d1Qkbjb9AA00';
  const formspreeEndpoint = 'https://formspree.io/f/xykbbzye';

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const titles = {
      home: 'SEO Reporting & Architecture Audit Service | RankFrame SEO',
      checkout: 'Start Your Monthly SEO Report | RankFrame SEO',
      success: 'Payment Successful — Welcome to RankFrame SEO',
    };
    const descriptions = {
      home: 'RankFrame SEO delivers on-page SEO architecture setup and off-page Google Trust building. SEO Inside from $150/month. Full SEO growth from $1,000/month.',
      checkout: 'Submit your website details and start your monthly SEO reporting service. $150/month. No setup fee.',
      success: 'Your RankFrame SEO subscription is confirmed. We will begin your monthly SEO audit and report.',
    };
    document.title = titles[route] || titles.home;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', descriptions[route] || descriptions.home);
  }, [route]);

  const deliverables = [
    { title: 'Monthly SEO performance report', icon: '01' },
    { title: 'Full website SEO architecture audit', icon: '02' },
    { title: 'Keyword ranking and visibility tracking', icon: '03' },
    { title: 'Metadata, indexing, and crawlability review', icon: '04' },
    { title: 'Technical SEO issues with action steps', icon: '05' },
    { title: '30-day priority roadmap for improvements', icon: '06' },
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
    'On-page SEO architecture setup',
    'Off-page Google Trust building',
    'Monthly SEO reporting',
    'Technical SEO checks included',
    'Plans from $150/month',
  ];

  const trustPoints = [
    { text: 'SEO architecture and reporting', num: '100+', label: 'Sites audited' },
    { text: 'Keyword ranking visibility tracking', num: '30', label: 'Day report cycle' },
    { text: 'Technical SEO checks with action steps', num: '50+', label: 'Checks per audit' },
    { text: 'Built for small businesses', num: '$0', label: 'Setup fee' },
  ];

  const benefits = [
    { title: 'On-Page SEO Architecture Setup', desc: 'We build your site\'s SEO foundation — meta tags, schema, sitemap, internal linking' },
    { title: 'Off-Page Google Trust Building', desc: 'Backlinks, citations, and authority signals that earn Google\'s trust' },
    { title: 'Actionable keyword ranking insights', desc: 'Know exactly where you rank and how to move up' },
    { title: 'Metadata & crawlability checks', desc: 'Ensure Google sees and indexes your pages correctly' },
    { title: 'Two-tier pricing for every budget', desc: 'Start with on-page SEO, scale to full authority building' },
    { title: 'Clear SEO direction', desc: 'Prioritized roadmap so you know what to fix first' },
  ];

  const whoFor = [
    'Small business owners who want clear SEO direction',
    'Website owners with low or unstable traffic',
    'Startups that need fast SEO insights without hiring an agency',
    'Companies that want simple monthly reporting without complexity',
  ];

  const whySeoMatters = [
    { stat: '68%', label: 'of online experiences begin with a search engine' },
    { stat: '53%', label: 'of all website traffic comes from organic search' },
    { stat: '0.63%', label: 'of users click on results from page two of Google' },
    { stat: '14.6%', label: 'close rate for SEO leads vs 1.7% for outbound' },
  ];

  const faqs = [
    {
      q: 'What happens after I subscribe?',
      a: 'You submit your site details, our AI audit workflow begins, and you receive your first structured SEO review with recommendations.',
    },
    {
      q: 'What is the difference between SEO Inside and SEO Outside?',
      a: 'SEO Inside ($150/month) covers on-page optimization — architecture, meta tags, schema, sitemap, and internal linking. SEO Outside ($1,000/month) adds off-page authority building — backlinks, citations, and Google Trust signals that boost your domain authority.',
    },
    {
      q: 'Is there any setup fee?',
      a: 'No. Both plans have no setup fee. Start at $150/month for SEO Inside, or $1,000/month for the complete SEO Inside + Outside package.',
    },
    {
      q: 'Who is this service best for?',
      a: 'SEO Inside is ideal for small businesses and startups that need a solid SEO foundation. SEO Inside + Outside is for businesses ready to aggressively grow their Google rankings and domain authority.',
    },
    {
      q: 'How fast do you review a website?',
      a: 'We review core SEO structure, technical issues, indexing signals, and keyword visibility efficiently, then organize the findings into a clean monthly report.',
    },
    {
      q: 'Do you support ecommerce and service websites?',
      a: 'Yes. The service is suitable for service businesses, ecommerce sites, and general company websites that need better SEO structure and reporting.',
    },
  ];

  const nextChargeText = useMemo(() => 'Billed monthly · Cancel anytime', []);

  const goTo = useCallback((next) => {
    window.location.hash = next;
    setRoute(next.replace('#', ''));
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    const payload = {
      fullName: form.fullName,
      phone: form.phone,
      email: form.email,
      website: form.website,
      notes: form.notes,
      submittedAt: new Date().toISOString(),
    };
    localStorage.setItem('seoLeadDraft', JSON.stringify(payload));
    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Form submit failed');
    } catch (error) {
      console.error('Formspree submit failed:', error);
      alert('We could not submit your details right now. Please try again.');
      return;
    }
    window.location.href = stripeUrl;
  };

  /* ═══════════ CHECKOUT PAGE ═══════════ */
  if (route === 'checkout') {
    return (
      <div className="grain-overlay min-h-screen bg-[#0a0a0a] text-gray-100">
        <SiteHeader goTo={goTo} />
        <main className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="mb-8">
            <button
              onClick={() => goTo('#home')}
              className="rounded-full border border-gray-700 bg-[#141414] px-4 py-2 text-sm font-semibold text-gray-300 transition hover:border-amber-500/50 hover:text-amber-400"
            >
              ← Back to site
            </button>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="rounded-[2rem] border border-gray-800 bg-[#141414] p-8 shadow-sm md:p-10">
              <div className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-500">Client Details</div>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">Tell us about your business</h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-400">Fill in your contact details and website URL first. Then continue to secure checkout.</p>

              <form id="lead-checkout-form" onSubmit={handleCheckout} className="mt-10 grid gap-5">
                {[
                  { label: 'Full name', name: 'fullName', type: 'text', ph: 'Your full name' },
                  { label: 'Phone number', name: 'phone', type: 'text', ph: 'Your phone number' },
                  { label: 'Email', name: 'email', type: 'email', ph: 'you@company.com' },
                  { label: 'Website URL', name: 'website', type: 'text', ph: 'https://yourwebsite.com' },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="mb-2 block text-sm font-semibold text-gray-300">{f.label}</label>
                    <input
                      name={f.name}
                      type={f.type}
                      value={form[f.name]}
                      onChange={handleInput}
                      required
                      className="w-full rounded-2xl border border-gray-700 bg-[#1a1a1a] px-5 py-4 text-white outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30"
                      placeholder={f.ph}
                    />
                  </div>
                ))}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-300">Notes</label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleInput}
                    rows={4}
                    className="w-full rounded-2xl border border-gray-700 bg-[#1a1a1a] px-5 py-4 text-white outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30"
                    placeholder="Anything you want us to know about your website or goals"
                  />
                </div>
              </form>
            </section>

            <aside className="space-y-6">
              {/* SEO Inside — $150 checkout */}
              <div className="gold-glow rounded-[2rem] border border-amber-500/20 bg-[#111111] p-8 text-white shadow-xl md:p-10">
                <div className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">SEO Inside</div>
                <h2 className="mt-4 text-3xl font-semibold">On-Page SEO</h2>
                <p className="mt-4 text-base leading-7 text-gray-400">Submit your details, then continue to secure Stripe checkout for your monthly on-page SEO service.</p>

                <button
                  type="submit"
                  form="lead-checkout-form"
                  className="btn-shimmer mt-8 w-full rounded-full px-8 py-4 text-sm font-bold text-black shadow-lg transition hover:scale-[1.02]"
                >
                  Subscribe — $150/mo →
                </button>

                <div className="mt-6 rounded-[1.5rem] border border-amber-500/10 bg-amber-500/5 p-6">
                  <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-5">
                    <div>
                      <div className="text-sm uppercase tracking-[0.22em] text-gray-400">Plan</div>
                      <div className="mt-2 text-xl font-semibold">SEO Inside</div>
                    </div>
                    <div className="text-3xl font-semibold text-amber-400">$150<span className="text-base font-normal text-gray-400">/mo</span></div>
                  </div>
                  <div className="space-y-4 pt-5 text-gray-300">
                    <div className="flex items-center justify-between"><span>Billing</span><span>{nextChargeText}</span></div>
                    <div className="flex items-center justify-between"><span>Setup fee</span><span className="text-amber-400">$0</span></div>
                  </div>
                </div>
              </div>

              {/* SEO Inside + Outside — $1,000 contact */}
              <div className="rounded-[2rem] border border-gray-700 bg-[#141414] p-8 text-white md:p-10">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">SEO Inside + Outside</div>
                  <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400">$1,000/mo</span>
                </div>
                <p className="mt-4 text-base leading-7 text-gray-400">Everything in SEO Inside, plus off-page Google Trust authority building — backlinks, citations, and domain authority growth.</p>
                <a
                  href="mailto:zeuscapitalholdings@gmail.com?subject=SEO%20Inside%20%2B%20Outside%20—%20$1,000/mo%20Plan&body=Hi%20RankFrame%20SEO,%0A%0AI'm%20interested%20in%20the%20SEO%20Inside%20%2B%20Outside%20plan%20($1,000/month).%0A%0AMy%20website:%20%0A%0AThanks!"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-amber-500/40 bg-amber-500/10 px-8 py-4 text-sm font-bold text-amber-400 transition hover:bg-amber-500/20 hover:scale-[1.02]"
                >
                  Contact Us for $1,000/mo Plan →
                </a>
              </div>
            </aside>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  /* ═══════════ SUCCESS PAGE ═══════════ */
  if (route === 'success') {
    return (
      <div className="grain-overlay min-h-screen bg-[#0a0a0a] text-gray-100">
        <SiteHeader goTo={goTo} />
        <main className="mx-auto flex max-w-4xl items-center px-6 py-20 lg:px-10">
          <section className="gold-glow w-full rounded-[2.5rem] border border-gray-800 bg-[#141414] p-10 text-center shadow-xl md:p-14">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/10 text-3xl text-amber-500">✓</div>
            <div className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-amber-500">Payment Successful</div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">Thanks for your payment</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
              Your order has been received successfully. We will begin your SEO audit and follow up using the details you provided.
            </p>
            <div className="mx-auto mt-10 grid max-w-2xl gap-4 text-left sm:grid-cols-2">
              <div className="rounded-2xl bg-[#1a1a1a] p-5 ring-1 ring-gray-800">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Customer</div>
                <div className="mt-2 text-lg font-semibold text-white">{form.fullName || 'Your name'}</div>
                <div className="mt-1 text-gray-400">{form.email || 'your@email.com'}</div>
              </div>
              <div className="rounded-2xl bg-[#1a1a1a] p-5 ring-1 ring-gray-800">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Plan</div>
                <div className="mt-2 text-lg font-semibold text-white">RankFrame SEO Service</div>
                <div className="mt-1 text-gray-400">Monthly subscription · No setup fee</div>
              </div>
            </div>
            <div className="mt-10">
              <button
                onClick={() => goTo('#home')}
                className="btn-shimmer rounded-full px-8 py-4 text-sm font-bold text-black shadow-lg transition hover:scale-[1.02]"
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

  /* ═══════════ HOME PAGE ═══════════ */
  return (
    <div className="grain-overlay min-h-screen bg-[#0a0a0a] text-gray-100">
      <SiteHeader goTo={goTo} />

      <main>
        {/* ── HERO ── */}
        <section id="home" className="relative overflow-hidden border-t border-gray-800/50">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(217,170,62,0.1),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(217,170,62,0.05),transparent_50%)]" />
          {/* Decorative gold line */}
          <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

          <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-32">
            <FadeIn className="relative z-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-5 py-2.5 text-sm font-medium text-amber-400">
                <span className="inline-block h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                AI-Powered SEO Services
              </div>

              <h1 className="max-w-3xl text-5xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-[4.25rem]">
                SEO architecture audits &{' '}
                <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
                  monthly ranking reports
                </span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-400">
                We review your website's SEO architecture, keyword ranking performance, technical issues, metadata, indexing signals, and internal linking structure — then deliver a clean monthly report with clear next steps.
              </p>

              <p className="mt-6 text-2xl font-bold tracking-tight text-white">
                $150<span className="text-lg font-normal text-gray-500">/month</span>
                <span className="ml-4 text-sm font-medium text-amber-400/80">No setup fee</span>
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#case-study"
                  className="group rounded-full border border-gray-700 bg-[#141414] px-7 py-4 text-sm font-semibold text-gray-300 transition hover:border-amber-500/50 hover:text-amber-400"
                >
                  View Case Study <span className="inline-block transition group-hover:translate-x-1">→</span>
                </a>
              </div>

              {/* Mini stat cards */}
              <div className="mt-14 grid gap-4 sm:grid-cols-3">
                {[
                  ['Monthly Reports', 'Clear SEO findings every 30 days'],
                  ['AI Technical Audit', 'Structure, metadata, and Google checks'],
                  ['Simple Pricing', 'One flat fee, no setup cost'],
                ].map(([title, text], i) => (
                  <FadeIn key={title} delay={0.1 + i * 0.08} className="card-hover-glow rounded-2xl border border-gray-800 bg-[#141414]/80 p-5 backdrop-blur">
                    <div className="text-sm font-semibold text-amber-400">{title}</div>
                    <div className="mt-2 text-sm leading-6 text-gray-500">{text}</div>
                  </FadeIn>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="relative z-10">
              <div className="gold-glow rounded-[2rem] border border-amber-500/20 bg-[#111111] p-7 text-white">
                <div className="rounded-[1.5rem] bg-gradient-to-br from-[#1a1a0a] via-[#111111] to-[#0d0d00] p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-[0.28em] text-amber-400/80">Live Service Snapshot</div>
                      <div className="mt-3 text-3xl font-bold tracking-tight">AI SEO Report</div>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-xl font-bold text-black shadow-lg shadow-amber-500/20">
                      RF
                    </div>
                  </div>

                  <div className="mt-8 space-y-3">
                    {highlights.map((item) => (
                      <div key={item} className="flex items-center gap-3 rounded-xl border border-amber-500/10 bg-amber-500/5 px-4 py-3 text-[0.95rem] text-gray-200">
                        <span className="text-amber-400">→</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 rounded-xl border border-amber-500/20 bg-amber-500/10 p-5">
                    <div className="text-xs uppercase tracking-[0.25em] text-amber-300/80">What clients want</div>
                    <div className="mt-3 text-lg font-semibold text-white">
                      Clear SEO problems. Clear next steps. No agency complexity.
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── Gold divider ── */}
        <div className="gold-divider mx-auto max-w-4xl" />

        {/* ── TRUST METRICS ── */}
        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10" aria-label="Key metrics">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((item, i) => (
              <FadeIn key={item.num} delay={i * 0.08} className="card-hover-glow rounded-[1.5rem] border border-gray-800 bg-[#141414] p-6 text-center">
                <div className="text-3xl font-bold text-amber-400">{item.num}</div>
                <div className="mt-1 text-sm font-semibold text-gray-200">{item.label}</div>
                <div className="mt-3 text-xs text-gray-500">{item.text}</div>
              </FadeIn>
            ))}
          </div>
        </section>

        <div className="gold-divider mx-auto max-w-4xl" />

        {/* ── WHY SEO MATTERS ── */}
        <section id="why-seo" className="mx-auto max-w-7xl px-6 py-20 lg:px-10" aria-label="Why SEO matters">
          <FadeIn>
            <div className="rounded-[2.5rem] border border-amber-500/15 bg-gradient-to-b from-[#12120a] to-[#0a0a0a] p-10 md:p-14">
              <div className="text-center">
                <div className="text-xs font-bold uppercase tracking-[0.35em] text-amber-500">Why SEO Matters</div>
                <h2 className="mt-5 text-4xl font-bold tracking-tight text-white md:text-5xl">
                  Without SEO, your website is{' '}
                  <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">invisible</span>
                </h2>
                <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">
                  Search engine optimization is not optional — it is the foundation of how customers discover your business online. Every day without proper SEO is a day your competitors are outranking you.
                </p>
              </div>

              <div className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {whySeoMatters.map((item, i) => (
                  <FadeIn key={item.stat} delay={i * 0.1} className="rounded-2xl border border-amber-500/10 bg-[#0a0a0a] p-6 text-center">
                    <div className="text-4xl font-bold text-amber-400">{item.stat}</div>
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
                  <FadeIn key={title} delay={i * 0.08} className="card-hover-glow rounded-2xl border border-gray-800 bg-[#111111] p-7">
                    <h3 className="text-lg font-bold text-amber-400">{title}</h3>
                    <p className="mt-3 text-base leading-7 text-gray-400">{desc}</p>
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
              <div className="rounded-[2rem] bg-[#141414] p-10 ring-1 ring-gray-800">
                <div className="text-xs font-bold uppercase tracking-[0.35em] text-amber-500">What You Get</div>
                <h2 className="mt-5 text-4xl font-bold tracking-tight text-white">
                  Monthly AI SEO service built for clarity and action.
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-400">
                  Every month, we inspect your website with AI and give you a concise, actionable report that shows what matters most.
                </p>
                <div className="gold-divider mt-8" />
                <div className="mt-8">
                  <div className="text-xs font-bold uppercase tracking-[0.25em] text-amber-500/70">Who This Is For</div>
                  <div className="mt-4 space-y-3">
                    {whoFor.map((item) => (
                      <div key={item} className="flex items-start gap-3 text-sm text-gray-400">
                        <span className="mt-0.5 text-amber-500">→</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {deliverables.map((item, i) => (
                  <FadeIn key={item.title} delay={i * 0.06} className="card-hover-glow rounded-[1.5rem] border border-gray-800 bg-[#141414] p-6">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 text-sm font-bold text-amber-400">
                      {item.icon}
                    </div>
                    <div className="text-base font-semibold leading-7 text-gray-200">{item.title}</div>
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
            <div className="rounded-[2.5rem] border border-gray-800 bg-[#141414] p-10 md:p-14">
              <div className="max-w-3xl">
                <div className="text-xs font-bold uppercase tracking-[0.35em] text-amber-500">Real Case Study</div>
                <h2 className="mt-5 text-4xl font-bold tracking-tight text-white md:text-5xl">
                  PACK EXPO International — Marketing Audit Report
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-400">
                  We analyzed packexpointernational.com, one of the largest packaging trade shows in North America with 77,500 attendees and 2,600+ exhibitors. Our audit uncovered significant opportunities across 6 categories — proving that even major brands have critical SEO and marketing gaps.
                </p>
              </div>

              <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.95fr]">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Score Card */}
                  <FadeIn delay={0.1} className="rounded-[1.5rem] bg-[#1a1a1a] p-7 ring-1 ring-gray-800">
                    <div className="text-xs font-bold uppercase tracking-[0.25em] text-gray-500">Overall Score</div>
                    <div className="mt-5 flex items-end gap-2">
                      <span className="text-6xl font-bold text-amber-400">66</span>
                      <span className="mb-2 text-2xl text-gray-600">/100</span>
                    </div>
                    <div className="mt-2 text-base font-bold text-amber-500">Grade: C+</div>

                    <div className="mt-6 space-y-3">
                      {[
                        ['Content & Messaging', 62, 'gray-200'],
                        ['Conversion Optimization', 52, 'amber-400'],
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
                            <div className="score-bar h-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-400" style={{ width: `${score}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </FadeIn>

                  {/* Key Findings */}
                  <FadeIn delay={0.15} className="rounded-[1.5rem] bg-[#1a1a1a] p-7 ring-1 ring-amber-500/15">
                    <div className="text-xs font-bold uppercase tracking-[0.25em] text-amber-500">Key Findings</div>
                    <div className="mt-5 space-y-3 text-sm">
                      <div className="rounded-lg bg-red-500/10 px-3 py-2.5 text-red-400">Critical: No urgency mechanics on early bird pricing</div>
                      <div className="rounded-lg bg-red-500/10 px-3 py-2.5 text-red-400">Critical: Homepage headline fails 5-second test</div>
                      <div className="rounded-lg bg-amber-500/10 px-3 py-2.5 text-amber-400">High: Missing Event schema JSON-LD</div>
                      <div className="rounded-lg bg-amber-500/10 px-3 py-2.5 text-amber-400">High: Zero competitor comparison pages</div>
                      <div className="rounded-lg bg-blue-500/10 px-3 py-2.5 text-blue-400">Medium: Meta description exceeds 160 chars</div>
                    </div>
                  </FadeIn>
                </div>

                {/* Impact */}
                <FadeIn delay={0.2} className="gold-glow rounded-[1.5rem] border border-amber-500/20 bg-[#111111] p-8 text-white">
                  <div className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400">Impact Analysis</div>
                  <h3 className="mt-4 text-3xl font-bold tracking-tight">$200K–$575K/mo potential</h3>
                  <p className="mt-5 text-base leading-7 text-gray-400">
                    Implementing all recommendations could drive $200,000–$575,000/month in incremental value through increased registrations and higher conversion rates.
                  </p>

                  <div className="mt-8 space-y-3 text-[0.95rem] text-gray-200">
                    {[
                      'Identified conversion optimization gaps (52/100)',
                      'Flagged missing structured data for Google rich results',
                      'Mapped competitive positioning vs Interpack, FachPack, ProPak',
                      'Delivered prioritized action plan: quick wins → strategic',
                    ].map((text) => (
                      <div key={text} className="flex items-start gap-3">
                        <span className="mt-1 text-amber-500">✔</span>
                        <span>{text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 rounded-xl border border-amber-500/10 bg-amber-500/5 p-5">
                    <div className="text-xs uppercase tracking-[0.2em] text-gray-500">Estimated Impact</div>
                    <div className="mt-2 text-2xl font-bold text-amber-400">+15–25% registration conversion</div>
                  </div>

                  <a
                    href="/case-study-pack-expo.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shimmer mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-black shadow-lg transition hover:scale-[1.02]"
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
            <div className="text-xs font-bold uppercase tracking-[0.35em] text-amber-500">Benefits</div>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white">Why businesses choose RankFrame</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.06} className="card-hover-glow rounded-[1.5rem] border border-gray-800 bg-[#141414] p-7">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 text-base text-amber-500">
                  ✦
                </div>
                <div className="mt-5 text-base font-bold text-gray-100">{item.title}</div>
                <div className="mt-2 text-sm leading-6 text-gray-500">{item.desc}</div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-20 lg:px-10" aria-label="How it works">
          <FadeIn>
            <div className="mb-12 text-center">
              <div className="text-xs font-bold uppercase tracking-[0.35em] text-amber-500">How It Works</div>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
                Three steps to better SEO
              </h2>
            </div>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-3">
            {process.map((item, i) => (
              <FadeIn key={item.step} delay={i * 0.1} className="card-hover-glow group rounded-[1.5rem] border border-gray-800 bg-[#141414] p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-lg font-bold text-black shadow-lg shadow-amber-500/20 transition group-hover:scale-110">
                  {item.step}
                </div>
                <h3 className="mt-6 text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-gray-400">{item.text}</p>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── FOCUS / MISSION (dark gold section) ── */}
        <section id="focus" className="mx-auto max-w-7xl px-6 py-8 lg:px-10" aria-label="Our focus">
          <FadeIn>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-[#111111] px-8 py-16 text-center md:px-16">
              {/* Decorative corner accents */}
              <div className="absolute left-0 top-0 h-32 w-32 bg-gradient-to-br from-amber-500/10 to-transparent" />
              <div className="absolute bottom-0 right-0 h-32 w-32 bg-gradient-to-tl from-amber-500/10 to-transparent" />
              <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
              <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

              <div className="relative z-10">
                <div className="text-xs font-bold uppercase tracking-[0.35em] text-amber-500/80">What We Focus On</div>
                <h2 className="mt-5 text-4xl font-bold tracking-tight text-white md:text-5xl">
                  SEO structure. Monthly reporting.{' '}
                  <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">Keyword visibility.</span>
                </h2>
                <div className="mx-auto mt-6 h-px w-16 bg-amber-500/50" />
                <p className="mx-auto mt-10 max-w-3xl text-xl leading-9 text-gray-300">
                  We review how your website is structured, how search engines interpret it, and where visibility can be improved.
                </p>
                <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-500">
                  Instead of overwhelming clients with scattered data, we organize findings into a report that is simple, useful, and actionable.
                </p>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing" className="mx-auto max-w-6xl px-6 pb-12 pt-20 lg:px-10" aria-label="Pricing">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="text-xs font-bold uppercase tracking-[0.35em] text-amber-500">Pricing</div>
              <h2 className="mt-5 text-4xl font-bold tracking-tight text-white md:text-5xl">
                Choose your SEO growth plan
              </h2>
              <p className="mt-4 text-lg text-gray-400">Start with on-page SEO, or go all-in with Google Trust authority building.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* SEO Inside Plan */}
              <div className="rounded-[2rem] border border-gray-800 bg-[#141414] p-8 md:p-10 text-left">
                <div className="text-xs font-bold uppercase tracking-[0.3em] text-amber-500/70">Foundation</div>
                <h3 className="mt-3 text-2xl font-bold text-white">SEO Inside</h3>
                <p className="mt-2 text-sm text-gray-400">On-page SEO architecture setup & monthly reporting</p>
                <div className="mt-6">
                  <span className="text-5xl font-bold text-white">$150</span>
                  <span className="text-xl text-gray-500">/month</span>
                </div>
                <p className="mt-2 text-sm text-amber-400/70">No setup fee · Cancel anytime</p>
                <div className="mt-8 space-y-3">
                  {[
                    'Full SEO architecture audit & setup',
                    'Meta tags, schema markup, sitemap optimization',
                    'Internal linking structure review',
                    'Keyword ranking tracking',
                    'Technical SEO issue identification',
                    'Monthly performance report',
                    '30-day priority roadmap',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm text-gray-300">
                      <span className="mt-0.5 text-amber-500">✓</span> {item}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => goTo('#checkout')}
                  className="mt-8 w-full rounded-full border border-amber-500/30 bg-transparent px-6 py-3.5 text-sm font-bold text-amber-400 transition hover:bg-amber-500/10"
                >
                  Start SEO Inside →
                </button>
              </div>

              {/* SEO Outside Plan */}
              <div className="gold-glow relative rounded-[2rem] border border-amber-500/30 bg-[#141414] p-8 md:p-10 text-left">
                <div className="absolute -top-3 right-8 rounded-full bg-amber-500 px-4 py-1 text-xs font-bold text-black">RECOMMENDED</div>
                <div className="text-xs font-bold uppercase tracking-[0.3em] text-amber-500">Complete Growth</div>
                <h3 className="mt-3 text-2xl font-bold text-white">SEO Inside + Outside</h3>
                <p className="mt-2 text-sm text-gray-400">Full on-page setup + off-page Google Trust authority building</p>
                <div className="mt-6">
                  <span className="text-5xl font-bold text-white">$1,000</span>
                  <span className="text-xl text-gray-500">/month</span>
                </div>
                <p className="mt-2 text-sm text-amber-400/70">Everything in SEO Inside, plus authority building</p>
                <div className="mt-8 space-y-3">
                  {[
                    'Everything in SEO Inside plan',
                    'Google Trust & authority signal building',
                    'High-quality backlink acquisition',
                    'Business directory & citation building',
                    'Content marketing for link building',
                    'Competitor backlink analysis',
                    'Domain authority growth tracking',
                    'Monthly off-page SEO progress report',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm text-gray-300">
                      <span className="mt-0.5 text-amber-500">✓</span> {item}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => goTo('#checkout')}
                  className="btn-shimmer mt-8 w-full rounded-full px-6 py-3.5 text-sm font-bold text-black shadow-lg transition hover:scale-[1.02]"
                >
                  Start Full SEO Growth →
                </button>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* ── FAQ ── */}
        <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10" aria-label="FAQ">
          <FadeIn>
            <div className="rounded-[2.5rem] border border-gray-800 bg-[#141414] p-10 md:p-14">
              <div className="text-center">
                <div className="text-xs font-bold uppercase tracking-[0.35em] text-amber-500">FAQ</div>
                <h2 className="mt-4 text-4xl font-bold tracking-tight text-white">Common questions</h2>
              </div>
              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {faqs.map((item) => (
                  <div key={item.q} className="card-hover-glow rounded-xl border border-gray-800 bg-[#1a1a1a] p-6">
                    <div className="text-base font-bold text-white">{item.q}</div>
                    <div className="mt-3 text-sm leading-7 text-gray-400">{item.a}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="mx-auto max-w-5xl px-6 pb-24 pt-12 lg:px-10" aria-label="Get started">
          <FadeIn>
            <div className="relative overflow-hidden rounded-[2.5rem] border border-amber-500/20 bg-[#111111] px-8 py-14 text-center text-white md:px-14">
              <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
              <div className="text-xs font-bold uppercase tracking-[0.35em] text-amber-400">Ready to start?</div>
              <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
                Get your first AI SEO report today
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-400">
                Submit your website, complete checkout, and we'll begin your monthly SEO reporting workflow.
              </p>
              <button
                onClick={() => goTo('#checkout')}
                className="btn-shimmer mt-8 inline-flex rounded-full px-10 py-4 text-sm font-bold text-black shadow-lg transition hover:scale-[1.03]"
              >
                Get My SEO Report →
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
function SiteHeader({ goTo }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    ['#why-seo', 'Why SEO'],
    ['#services', 'Services'],
    ['#case-study', 'Case Study'],
    ['#how-it-works', 'How It Works'],
    ['#pricing', 'Pricing'],
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800/50 bg-[#0a0a0a]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#home" className="text-left">
          <div className="text-2xl font-bold tracking-tight text-white lg:text-3xl">
            Rank<span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">Frame</span>
          </div>
          <div className="text-[0.65rem] uppercase tracking-[0.3em] text-gray-600">SEO Architecture & Reporting</div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-gray-400 md:flex" aria-label="Main navigation">
          {navLinks.map(([href, label]) => (
            <a key={href} href={href} className="transition hover:text-amber-400">{label}</a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-800 bg-[#141414] text-gray-300 md:hidden"
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
        <nav className="border-t border-gray-800/50 bg-[#0a0a0a] px-6 pb-6 pt-4 md:hidden" aria-label="Mobile navigation">
          <div className="grid gap-2">
            {navLinks.map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl bg-[#141414] px-5 py-3 text-sm font-medium text-gray-300 transition hover:text-amber-400"
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

/* ═══════════ SITE FOOTER ═══════════ */
function SiteFooter() {
  return (
    <footer className="border-t border-gray-800/50 bg-[#080808]" aria-label="Footer">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold tracking-tight text-white">
              Rank<span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">Frame</span> SEO
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-gray-500">
              Monthly SEO architecture audits, keyword ranking reports, and technical SEO reviews for businesses that want clear direction and measurable progress.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500">Navigation</div>
            <nav className="mt-5 grid gap-3" aria-label="Footer navigation">
              {[
                ['#why-seo', 'Why SEO Matters'],
                ['#services', 'SEO Services'],
                ['#case-study', 'Case Study'],
                ['#how-it-works', 'How It Works'],
                ['#pricing', 'Pricing'],
              ].map(([href, label]) => (
                <a key={href} href={href} className="text-sm text-gray-400 transition hover:text-amber-400">{label}</a>
              ))}
            </nav>
          </div>

          {/* Service Info */}
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500">Service</div>
            <div className="mt-5 space-y-3 text-sm text-gray-400">
              <div>Monthly SEO Report</div>
              <div>Architecture Audit</div>
              <div>Keyword Ranking Tracking</div>
              <div>Technical SEO Checks</div>
              <div className="pt-2 text-amber-400 font-semibold">Plans from $150/month · No setup fee</div>
            </div>
          </div>
        </div>

        <div className="gold-divider mt-12" />

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-gray-600 sm:flex-row">
          <div>&copy; {new Date().getFullYear()} RankFrame SEO. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#home" className="transition hover:text-amber-400">Home</a>
            <a href="#pricing" className="transition hover:text-amber-400">Pricing</a>
            <a href="#case-study" className="transition hover:text-amber-400">Case Study</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function getRoute() {
  const hash = window.location.hash.replace('#', '');
  if (hash === 'checkout') return 'checkout';
  if (hash === 'success') return 'success';
  return 'home';
}
