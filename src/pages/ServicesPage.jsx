import { Helmet } from "react-helmet-async";

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>AI SEO Services for Small Business | NB Digital AI</title>
        <meta
          name="description"
          content="AI-powered SEO services including technical audits, keyword tracking, indexing fixes, and monthly SEO reports."
        />
        <link rel="canonical" href="https://rankframeseo.com/services" />
      </Helmet>

      <main style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
        <h1>AI SEO Services</h1>

        <p>
          Our AI-driven SEO service helps businesses improve their visibility,
          fix technical issues, and grow organic traffic with structured monthly
          reports.
        </p>

        <h2>What’s included</h2>
        <ul>
          <li>Full website SEO audit</li>
          <li>Keyword ranking tracking</li>
          <li>Metadata & indexing review</li>
          <li>Technical SEO fixes</li>
          <li>Monthly performance report</li>
        </ul>

        <h2>Who this is for</h2>
        <p>
          Ideal for startups, small businesses, and founders who want a clear,
          simple SEO strategy without hiring an expensive agency.
        </p>
      </main>
    </>
  );
}