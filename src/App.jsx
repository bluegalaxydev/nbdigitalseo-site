import { useEffect, useMemo, useState } from 'react';

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

  const deliverables = [
    'AI-powered monthly SEO report',
    'Full website SEO architecture audit',
    'Keyword rankings and movement tracking',
    'Google framework and indexing checks',
    'Technical issues with action steps',
    'Priority roadmap for the next 30 days',
  ];

  const process = [
    {
      step: '01',
      title: 'AI Crawl & Structure Review',
      text: 'Our AI agents scan your site structure, metadata, internal linking, crawlability, indexation, and technical SEO signals.',
    },
    {
      step: '02',
      title: 'Ranking & Google Checks',
      text: 'We review keyword rankings, visibility trends, and core Google-facing SEO foundations that impact discoverability.',
    },
    {
      step: '03',
      title: 'Monthly Executive Report',
      text: 'You receive a clean monthly report with findings, risks, wins, and next-step recommendations you can act on immediately.',
    },
  ];

  const highlights = [
    '100% AI company',
    'No setup fee',
    '$150 per month',
    'Monthly SEO reporting',
    'Advanced technical checks',
  ];

  const benefits = [
    'AI-driven monthly SEO audit',
    'Actionable keyword ranking review',
    'Google framework and structure checks',
    'Luxury-style minimal reporting UI',
    'Simple one-plan pricing',
    'Designed for small business owners who want fast clarity',
  ];

  const whoFor = [
    'Small business owners who want clear SEO direction',
    'Website owners with low or unstable traffic',
    'Startups that need fast SEO insights without hiring an agency',
    'Companies that want simple monthly reporting without complexity',
  ];

  const faqs = [
    {
      q: 'What happens after I subscribe?',
      a: 'You submit your site details, our AI audit workflow begins, and you receive your first structured SEO review with recommendations.',
    },
    {
      q: 'Is there any setup fee?',
      a: 'No. The service is a flat $150 per month with no setup charge.',
    },
    {
      q: 'What is included in the monthly report?',
      a: 'The report includes SEO architecture checks, keyword ranking review, Google-facing framework checks, technical issues, and next-step priorities.',
    },
    {
      q: 'Who is this service best for?',
      a: 'It is ideal for small businesses, startup teams, and site owners who want a premium monthly SEO review without the cost of a full agency retainer.',
    },
    {
      q: 'How fast do you review a website?',
      a: 'Our AI-driven workflow can process core technical patterns very quickly, then we organize those findings into a clean monthly report.',
    },
    {
      q: 'Do you support ecommerce and service websites?',
      a: 'Yes. The service is suitable for service businesses, ecommerce sites, and general company websites that need better SEO structure and reporting.',
    },
  ];

  const nextChargeText = useMemo(() => '$150 / month billed monthly', []);

  const goTo = (next) => {
    window.location.hash = next;
    setRoute(next.replace('#', ''));
  };

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
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Form submit failed');
      }
    } catch (error) {
      console.error('Formspree submit failed:', error);
      alert('We could not submit your details right now. Please try again.');
      return;
    }

    window.location.href = stripeUrl;
  };

  if (route === 'checkout') {
    return (
      <div className="min-h-screen bg-[#f4f7fb] text-slate-800">
        <SiteHeader />
        <main className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="mb-8">
            <button
              onClick={() => goTo('#home')}
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
            >
              ← Back to site
            </button>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
              <div className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-600">Client Details</div>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">Tell us about your business</h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                Fill in your contact details and website URL first. Then continue to secure checkout.
              </p>

              <form id="lead-checkout-form" onSubmit={handleCheckout} className="mt-10 grid gap-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Full name</label>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleInput}
                    required
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 py-4 outline-none transition focus:border-teal-500"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Phone number</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleInput}
                    required
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 py-4 outline-none transition focus:border-teal-500"
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleInput}
                    required
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 py-4 outline-none transition focus:border-teal-500"
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Website URL</label>
                  <input
                    name="website"
                    value={form.website}
                    onChange={handleInput}
                    required
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 py-4 outline-none transition focus:border-teal-500"
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Notes</label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleInput}
                    rows={5}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 py-4 outline-none transition focus:border-teal-500"
                    placeholder="Anything you want us to know about your website or goals"
                  />
                </div>
              </form>
            </section>

            <aside className="rounded-[2rem] bg-slate-900 p-8 text-white shadow-xl md:p-10">
              <div className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-300">Next Step</div>
              <h2 className="mt-4 text-3xl font-semibold">Submit your details</h2>
              <p className="mt-4 text-base leading-7 text-slate-300">
                After you submit, you will continue to secure Stripe checkout for your monthly AI SEO service.
              </p>

              <button
                type="submit"
                form="lead-checkout-form"
                className="mt-8 w-full rounded-full bg-teal-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:scale-[1.02]"
              >
                Submit
              </button>

              <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
                <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <div className="text-sm uppercase tracking-[0.22em] text-slate-300">Plan</div>
                    <div className="mt-2 text-xl font-semibold">AI SEO Monthly</div>
                  </div>
                  <div className="text-3xl font-semibold">$150</div>
                </div>
                <div className="space-y-4 pt-5 text-slate-100">
                  <div className="flex items-center justify-between">
                    <span>Billing</span>
                    <span>{nextChargeText}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Setup fee</span>
                    <span>$0</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    );
  }

  if (route === 'success') {
    return (
      <div className="min-h-screen bg-[#f4f7fb] text-slate-800">
        <SiteHeader />
        <main className="mx-auto flex max-w-4xl items-center px-6 py-20 lg:px-10">
          <section className="w-full rounded-[2.5rem] border border-slate-200 bg-white p-10 text-center shadow-xl md:p-14">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-teal-100 text-3xl text-teal-600">
              ✓
            </div>
            <div className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-teal-600">Payment Successful</div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">Thanks for your payment</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Your order has been received successfully. We will begin processing your monthly AI SEO service and follow up using the details you provided.
            </p>

            <div className="mx-auto mt-10 grid max-w-2xl gap-4 text-left sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Customer</div>
                <div className="mt-2 text-lg font-semibold text-slate-900">{form.fullName || 'Your name'}</div>
                <div className="mt-1 text-slate-600">{form.email || 'your@email.com'}</div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Plan</div>
                <div className="mt-2 text-lg font-semibold text-slate-900">Monthly AI SEO Service</div>
                <div className="mt-1 text-slate-600">$150 / month · No setup fee</div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => goTo('#home')}
                className="rounded-full bg-teal-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:scale-[1.02]"
              >
                Return to homepage
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f8fb] text-slate-800">
      <SiteHeader />

      <section className="relative overflow-hidden border-t border-slate-200/70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.08),transparent_30%)]" />
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-28">
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center rounded-full border border-teal-200 bg-white px-4 py-2 text-sm font-medium text-teal-700 shadow-sm">
              AI SEO Marketing Services
            </div>
            <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight text-slate-800 md:text-6xl">
              Elegant SEO reporting, powered by AI.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
              We provide monthly SEO services for businesses that want clarity, structure, and performance. Our AI robots inspect your website’s SEO architecture, check keyword visibility, review Google-facing framework issues, and deliver a complete report every month.
            </p>
            <p className="mt-5 text-xl font-semibold text-slate-800">$150/month. No setup fee.</p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#services"
                className="rounded-full border border-slate-300 bg-white px-7 py-4 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
              >
                View Deliverables
              </a>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {[
                ['Monthly Reports', 'Clear SEO findings every 30 days'],
                ['AI Technical Audit', 'Architecture and Google checks'],
                ['Simple Pricing', 'One flat fee, no setup cost'],
              ].map(([title, text]) => (
                <div key={title} className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-sm backdrop-blur">
                  <div className="text-sm font-semibold text-slate-900">{title}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-600">{text}</div>
                </div>
              ))}
            </div>

            <div className="mt-14">
              <div className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-600">Who This Is For</div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {whoFor.map((item) => (
                  <div key={item} className="rounded-2xl bg-white/80 p-4 text-sm text-slate-700 shadow-sm">
                    ✓ {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <div className="rounded-[2rem] border border-slate-200 bg-slate-900 p-7 text-white shadow-2xl shadow-slate-300/30">
              <div className="rounded-[1.5rem] bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm uppercase tracking-[0.22em] text-teal-300">Live Service Snapshot</div>
                    <div className="mt-3 text-3xl font-semibold">SEO Report in 90 Seconds</div>
                  </div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-400/90 text-2xl text-slate-900">
                    ▶
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  {highlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-slate-100"
                    >
                      <span className="text-teal-300">→</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-6 py-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] bg-white p-10 shadow-sm ring-1 ring-slate-200">
            <div className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-600">What You Get</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-slate-800">Monthly AI SEO service built for clarity and action.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              This service is designed for businesses that need a premium but simple SEO monitoring system. Every month, we inspect your website with AI and give you a concise, actionable report that shows what matters most.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {deliverables.map((item) => (
              <div key={item} className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">✓</div>
                <div className="text-lg font-semibold leading-7 text-slate-800">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          {benefits.map((item) => (
            <div key={item} className="rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-slate-200">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-xl text-teal-600">✦</div>
              <div className="mt-5 text-lg font-semibold leading-7 text-slate-800">{item}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="team" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="rounded-[2.5rem] bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-500 px-8 py-16 text-center shadow-xl shadow-teal-500/10 md:px-16">
          <div className="text-sm font-semibold uppercase tracking-[0.28em] text-white/80">Our Team</div>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-5xl">We use AI to inspect, improve, and help build better websites.</h2>
          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-white/80" />
          <p className="mx-auto mt-10 max-w-4xl text-xl leading-9 text-slate-50">
            Our company combines SEO strategy with AI-driven website analysis. We use intelligent systems to review site structure, technical SEO health, internal organization, keyword positioning, and Google-related framework signals. The result is a cleaner process, sharper insights, and faster decision-making for every client.
          </p>
          <p className="mx-auto mt-8 max-w-4xl text-lg leading-8 text-teal-50">
            Instead of relying on slow manual reviews, we use AI technology to check and structure websites at scale, then turn those findings into practical recommendations your business can understand and use.
          </p>
        </div>
      </section>

      <section id="why-us" className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] bg-white p-10 shadow-sm ring-1 ring-slate-200">
            <div className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-600">Why NB Digital AI</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight text-slate-800 md:text-5xl">We’re a 100% AI company.</h2>
            <div className="mt-6 h-1 w-20 rounded-full bg-teal-400" />
            <p className="mt-8 text-xl font-medium leading-9 text-slate-700">Fast analysis. Clean reporting. Technical SEO checks in seconds.</p>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Our advantage is speed. We use AI systems to process website structure, ranking signals, and technical SEO patterns in seconds, so clients get faster answers and clearer next steps without agency overhead.
            </p>
          </div>

          <div className="rounded-[2rem] bg-slate-900 p-10 text-white shadow-xl">
            <div className="space-y-4 text-lg text-slate-100">
              <div className="flex items-center gap-3"><span className="text-teal-300">→</span> 100% AI-operated SEO workflow</div>
              <div className="flex items-center gap-3"><span className="text-teal-300">→</span> Website audits processed in seconds</div>
              <div className="flex items-center gap-3"><span className="text-teal-300">→</span> Monthly reports with prioritized fixes</div>
              <div className="flex items-center gap-3"><span className="text-teal-300">→</span> Keyword ranking review included</div>
              <div className="flex items-center gap-3"><span className="text-teal-300">→</span> Google framework checks included</div>
            </div>

            <div className="mx-auto mt-10 h-1 w-24 rounded-full bg-white/80" />
            <div className="mt-10 text-center text-3xl font-semibold leading-tight text-white md:text-4xl">
              AI detects issues in moments, so your business can move faster with confidence.
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          {process.map((item) => (
            <div key={item.step} className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <div className="text-sm font-semibold tracking-[0.25em] text-teal-600">{item.step}</div>
              <h3 className="mt-4 text-2xl font-semibold text-slate-800">{item.title}</h3>
              <p className="mt-4 text-base leading-7 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-4 lg:px-10">
        <div className="rounded-[2.5rem] border border-slate-200 bg-white p-10 shadow-sm md:p-14">
          <div className="text-center">
            <div className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-600">Frequently Asked Questions</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">Simple answers for new clients</h2>
          </div>
          <div className="mt-10 grid gap-4">
            {faqs.map((item) => (
              <div key={item.q} className="rounded-[1.75rem] bg-slate-50 p-6 ring-1 ring-slate-200">
                <div className="text-lg font-semibold text-slate-900">{item.q}</div>
                <div className="mt-2 text-base leading-7 text-slate-600">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-5xl px-6 pb-24 pt-20 lg:px-10">
        <div className="rounded-[2.5rem] border border-slate-200 bg-white p-10 text-center shadow-xl shadow-slate-200/50 md:p-14">
          <div className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-600">Pricing</div>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-slate-800 md:text-5xl">One monthly SEO service. One simple price.</h2>
          <div className="mt-8 text-6xl font-semibold tracking-tight text-slate-900">
            $150<span className="text-2xl text-slate-500">/month</span>
          </div>
          <p className="mt-4 text-xl font-medium text-slate-700">No setup fee. No unnecessary complexity.</p>
          <div className="mx-auto mt-10 grid max-w-3xl gap-4 text-left sm:grid-cols-2">
            {[
              'Monthly AI SEO report',
              'Full site architecture check',
              'Keyword ranking review',
              'Google framework check',
              'Actionable fixes and recommendations',
              'Premium minimal service experience',
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 px-5 py-4 text-base text-slate-700 ring-1 ring-slate-200">
                ✓ {item}
              </div>
            ))}
          </div>
          <button
            onClick={() => goTo('#checkout')}
            className="mt-10 inline-flex rounded-full bg-teal-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:scale-[1.02]"
          >
            Start SEO Service
          </button>
        </div>
      </section>
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <a href="#home" className="text-left">
          <div className="text-3xl font-semibold tracking-tight text-slate-800">NB Digital AI</div>
          <div className="mt-1 text-xs uppercase tracking-[0.28em] text-slate-500">SEO Marketing Services</div>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <a href="#services" className="transition hover:text-slate-900">Services</a>
          <a href="#team" className="transition hover:text-slate-900">Our Team</a>
          <a href="#why-us" className="transition hover:text-slate-900">Why Us</a>
          <a href="#pricing" className="transition hover:text-slate-900">Pricing</a>
        </nav>
      </div>
    </header>
  );
}

function getRoute() {
  const hash = window.location.hash.replace('#', '');
  if (hash === 'checkout') return 'checkout';
  if (hash === 'success') return 'success';
  return 'home';
}
