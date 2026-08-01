import Link from 'next/link';
import CalendlyButton from '../components/CalendlyButton';

export const metadata = {
  title: 'Healthcare SaaS MVP Development Studio | TodayInTech',
  description:
    'Build a funded-ready healthcare SaaS MVP in 8 weeks. Learn about our scalable HIPAA-compliant architecture for health-tech founders and pre-seed startups.',
  keywords: [
    'healthcare SaaS MVP development',
    'health tech startup development',
    'HIPAA MVP',
    'telemedicine MVP',
    'healthcare app development startup',
    'health tech founder development partner',
  ],
  alternates: {
    canonical: 'https://todayintech.in/healthcare-saas-mvp-development',
  },
  openGraph: {
    title: 'Healthcare SaaS MVP Development Studio | TodayInTech',
    description:
      'Build a funded-ready healthcare SaaS MVP in 8 weeks. HIPAA-compliant architecture for health-tech founders and pre-seed startups.',
    url: 'https://todayintech.in/healthcare-saas-mvp-development',
    type: 'website',
    images: [{ url: 'https://todayintech.in/assets/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Healthcare SaaS MVP Development Studio | TodayInTech',
    description:
      'Build a funded-ready healthcare SaaS MVP in 8 weeks. HIPAA-compliant architecture for health-tech founders.',
    images: ['https://todayintech.in/assets/og-image.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Healthcare SaaS MVP Development',
  provider: {
    '@type': 'Organization',
    name: 'TodayInTech',
    url: 'https://todayintech.in',
  },
  serviceType: 'Healthcare Software Development',
  description:
    'Build a funded-ready, HIPAA-compliant healthcare SaaS MVP in 8 weeks with fixed scope and zero upfront payment guarantee.',
  areaServed: 'Worldwide',
};

export default function HealthcareMvpPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO SECTION */}
      <section className="lp-hero">
        <div className="bg-glow glow-1"></div>
        <div className="bg-glow glow-2"></div>
        <div className="container">
          <div className="lp-badge">
            <span>🚀</span> For Health-Tech Founders & Pre-Seed Startups
          </div>
          <h1>
            From Idea to <span className="gradient-text">Investor-Ready</span>
            <br />
            Healthcare MVP in 8 Weeks
          </h1>
          <p>
            We build HIPAA-compliant, scalable healthcare MVPs for founders who need to move fast — without hiring a full
            engineering team. Trusted by health-tech startups from seed to Series A.
          </p>
          <div className="lp-cta-row">
            <CalendlyButton className="btn-primary">Tell Us About Your MVP</CalendlyButton>
            <Link href="/#pricing" className="btn-secondary">
              See Pricing
            </Link>
          </div>
          <div className="lp-trust-row">
            <div className="lp-trust-item">
              <span>✓</span> HIPAA + GDPR Compliant
            </div>
            <div className="lp-trust-item">
              <span>✓</span> Investor-Pitch-Ready Architecture
            </div>
            <div className="lp-trust-item">
              <span>✓</span> Fixed Scope & Budget
            </div>
            <div className="lp-trust-item">
              <span>✓</span> 8 Weeks to Prototype / Demo
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="lp-social-proof">
        <div className="container">
          <div className="lp-stats-row">
            <div className="lp-stat-item">
              <div className="big-stat">8 wks</div>
              <div className="stat-label">Average MVP Timeline</div>
            </div>
            <div className="lp-stat-item">
              <div className="big-stat">120+</div>
              <div className="stat-label">Projects Delivered</div>
            </div>
            <div className="lp-stat-item">
              <div className="big-stat">$15K</div>
              <div className="stat-label">MVP Starting Price</div>
            </div>
            <div className="lp-stat-item">
              <div className="big-stat">12+</div>
              <div className="stat-label">Countries Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="lp-process">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="section-label">Our MVP Process</span>
            <h2 className="section-title">How We Get You From Idea to Live in 8 Weeks</h2>
            <p className="section-subtitle" style={{ maxWidth: '640px', margin: '12px auto 0' }}>
              A battle-tested process designed for founders who need speed, compliance, and investor-ready polish.
            </p>
          </div>
          <div className="lp-process-steps">
            <div className="lp-process-step">
              <div className="lp-step-num">01</div>
              <h3>Discovery Workshop (Week 1)</h3>
              <p>
                We map your product requirements, compliance needs, target users, and investor narrative. Output: a
                detailed spec and fixed-price proposal.
              </p>
            </div>
            <div className="lp-process-step">
              <div className="lp-step-num">02</div>
              <h3>Design & Architecture (Weeks 2–3)</h3>
              <p>
                Figma designs you can test with users before a line of code is written. HIPAA-compliant data model and
                cloud architecture planned up front.
              </p>
            </div>
            <div className="lp-process-step">
              <div className="lp-step-num">03</div>
              <h3>Agile Build (Weeks 4–7)</h3>
              <p>
                2-week sprint cycles with weekly demos. You see progress every week and can provide feedback in real time.
                No black-box development.
              </p>
            </div>
            <div className="lp-process-step">
              <div className="lp-step-num">04</div>
              <h3>Launch & Investor Readiness (Week 8)</h3>
              <p>
                Production deployment on AWS, QA sign-off, compliance documentation, and a live demo environment ready for
                investor meetings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE SECTION */}
      <section className="lp-founder-quote">
        <div className="container">
          <blockquote>
            "TodayInTech delivered our telemedicine MVP in 7 weeks — fully HIPAA-compliant and polished enough to
            close our seed round. Their healthcare domain expertise saved us months of compliance work."
          </blockquote>
          <cite>— James W., Co-Founder, FitPulse Health &bull; UK</cite>
        </div>
      </section>

      {/* BOTTOM CTA SECTION */}
      <section className="lp-bottom-cta">
        <div className="container">
          <h2>Ready to Build Your Healthcare MVP?</h2>
          <p>
            Book a free 30-minute strategy session. We'll scope your MVP, identify compliance requirements, and give you a
            fixed-price estimate within 48 hours.
          </p>
          <CalendlyButton className="btn-primary" style={{ fontSize: '1rem', padding: '16px 36px' }}>
            Tell Us About Your MVP
          </CalendlyButton>
          <ul className="lp-check-list">
            <li>
              <span className="ck">✓</span> Free 30-min strategy call
            </li>
            <li>
              <span className="ck">✓</span> Fixed-price proposal in 48hrs
            </li>
            <li>
              <span className="ck">✓</span> HIPAA compliance included
            </li>
            <li>
              <span className="ck">✓</span> NDA available
            </li>
            <li>
              <span className="ck">✓</span> No commitment required
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
