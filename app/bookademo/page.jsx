import Script from "next/script";

export const metadata = {
  title: "Book a Demo — Anonsoft Software Agency",
  description:
    "Book a free demo and consultation with Anonsoft. Launch your custom software or HealthTech platform in weeks.",
  alternates: {
    canonical: "https://anonsoft.com/bookademo/",
  },
  openGraph: {
    title: "Book a Demo — Anonsoft Software Agency",
    description:
      "Book a free demo and consultation with Anonsoft. Launch your custom software or HealthTech platform in weeks.",
    url: "https://anonsoft.com/bookademo/",
    siteName: "Anonsoft",
    images: [{ url: "https://anonsoft.com/assets/anon-soft-og.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Demo — Anonsoft Software Agency",
    description:
      "Book a free demo and consultation with Anonsoft. Launch your custom software or HealthTech platform in weeks.",
    images: ["https://anonsoft.com/assets/anon-soft-og.png"],
  },
};

export default function BookDemoPage() {
  return (
    <main>
      {/* Calendly Stylesheet & Widget Script */}
      <link
        href="https://assets.calendly.com/assets/external/widget.css"
        rel="stylesheet"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />

      <section className="demo-hero">
        <div className="demo-container">
          {/* LEFT: Info Column */}
          <div className="demo-info">
            <div className="demo-badge">
              <svg
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              Free 30-min consultation
            </div>
            <h1>
              Let's Build
              <br />
              Something <span>Amazing</span>
            </h1>
            <p>
              Share your idea and our team will get back to you within 24 hours
              with a tailored plan to bring it to life.
            </p>

            <div className="trust-points">
              <div className="trust-item">
                <div className="trust-icon">
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="var(--primary)"
                    strokeWidth="2"
                  >
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <div className="trust-text">
                  <h4>Rapid Delivery</h4>
                  <p>
                    MVP in weeks, not months. We move fast without cutting
                    corners.
                  </p>
                </div>
              </div>

              <div className="trust-item">
                <div className="trust-icon">
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="var(--primary)"
                    strokeWidth="2"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div className="trust-text">
                  <h4>Enterprise-Grade Security</h4>
                  <p>
                    HIPAA-compliant architecture for healthcare and sensitive
                    data.
                  </p>
                </div>
              </div>

              <div className="trust-item">
                <div className="trust-icon">
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="var(--primary)"
                    strokeWidth="2"
                  >
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                  </svg>
                </div>
                <div className="trust-text">
                  <h4>Dedicated Team</h4>
                  <p>
                    A full squad of designers, developers & PMs assigned to your
                    project.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Calendly Inline Widget */}
          <div className="demo-form-wrapper">
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/anonsoftdotin/30min?hide_gdpr_banner=1"
              style={{ minWidth: "320px", height: "700px" }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
