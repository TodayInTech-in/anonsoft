import Link from 'next/link';
import CalendlyButton from '../components/CalendlyButton';

export const metadata = {
  title: 'Branded Wellness & Fitness App Development | TodayInTech',
  description:
    'Build a branded wellness app with wearable integration, nutrition tracking, live classes, and community features—delivered faster and cheaper than custom.',
  keywords: [
    'wellness app development',
    'fitness app development company',
    'white label wellness platform',
    'corporate wellness app',
    'branded fitness app',
    'wellness platform development',
  ],
  alternates: {
    canonical: 'https://todayintech.in/wellness-platform-development',
  },
  openGraph: {
    title: 'Branded Wellness & Fitness App Development | TodayInTech',
    description:
      'Build a branded wellness app with wearable integration, nutrition tracking, live classes, and community features—delivered in 4–8 weeks.',
    url: 'https://todayintech.in/wellness-platform-development',
    type: 'website',
    images: [{ url: 'https://todayintech.in/assets/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Branded Wellness & Fitness App Development | TodayInTech',
    description:
      'Build a branded wellness app with wearable integration, live classes, and community features.',
    images: ['https://todayintech.in/assets/og-image.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Branded Wellness & Fitness App Development',
  provider: {
    '@type': 'Organization',
    name: 'TodayInTech',
    url: 'https://todayintech.in',
  },
  serviceType: 'Mobile & Web App Development',
  description:
    'White-label fitness and wellness platforms with Apple Health / Google Fit integration, AI coaching, live classes, and subscription management.',
  areaServed: 'Worldwide',
};

export default function WellnessPlatformPage() {
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
            <span>🧘</span> For Wellness Brands, Fitness Studios & Corporate Programs
          </div>
          <h1>
            Build a <span className="gradient-text">Branded Wellness App</span>
            <br />
            Your Members Will Actually Use
          </h1>
          <p>
            White-label fitness and wellness platforms with wearable integration, AI-powered coaching, live classes, and
            community features — branded as yours, delivered faster and cheaper than custom development.
          </p>
          <div className="lp-cta-row">
            <CalendlyButton className="btn-primary">Get My Free Wellness App Roadmap</CalendlyButton>
            <Link href="/#pricing" className="btn-secondary">
              View Pricing
            </Link>
          </div>
          <div className="lp-trust-row">
            <div className="lp-trust-item">
              <span>✓</span> Apple Health & Google Fit Integration
            </div>
            <div className="lp-trust-item">
              <span>✓</span> No Healthcare Compliance Overhead
            </div>
            <div className="lp-trust-item">
              <span>✓</span> Launch in 4–8 Weeks
            </div>
            <div className="lp-trust-item">
              <span>✓</span> iOS + Android + Web
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="lp-social-proof">
        <div className="container">
          <div className="lp-stats-row">
            <div className="lp-stat-item">
              <div className="big-stat">50K+</div>
              <div className="stat-label">App Downloads (One Client, Month 1)</div>
            </div>
            <div className="lp-stat-item">
              <div className="big-stat">4–8</div>
              <div className="stat-label">Weeks to Launch</div>
            </div>
            <div className="lp-stat-item">
              <div className="big-stat">70%</div>
              <div className="stat-label">Cost Savings vs. Custom</div>
            </div>
            <div className="lp-stat-item">
              <div className="big-stat">120+</div>
              <div className="stat-label">Apps Delivered</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="lp-audiences">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="section-label">Who It's For</span>
            <h2 className="section-title">Built for Every Wellness & Fitness Business</h2>
          </div>
          <div className="lp-audience-grid">
            <div className="lp-audience-card">
              <div className="lp-audience-icon">🏋️</div>
              <h4>Fitness Studios & Gyms</h4>
            </div>
            <div className="lp-audience-card">
              <div className="lp-audience-icon">🧘</div>
              <h4>Yoga & Mindfulness Brands</h4>
            </div>
            <div className="lp-audience-card">
              <div className="lp-audience-icon">🏢</div>
              <h4>Corporate Wellness Programs</h4>
            </div>
            <div className="lp-audience-card">
              <div className="lp-audience-icon">🥗</div>
              <h4>Nutrition & Diet Coaches</h4>
            </div>
            <div className="lp-audience-card">
              <div className="lp-audience-icon">💪</div>
              <h4>Personal Training Platforms</h4>
            </div>
            <div className="lp-audience-card">
              <div className="lp-audience-icon">🌿</div>
              <h4>Holistic Health Brands</h4>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM FEATURES */}
      <section className="lp-features">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="section-label">Platform Features</span>
            <h2 className="section-title">Everything Your Members Expect — and More</h2>
          </div>
          <div className="lp-features-grid">
            <div className="lp-feature-card">
              <div className="lp-feature-icon">⌚</div>
              <h3>Wearable Integration</h3>
              <p>
                Connect Apple Health, Google Fit, Fitbit, Garmin, and Whoop. Auto-sync workouts, heart rate, sleep, and
                activity data into your branded platform.
              </p>
            </div>
            <div className="lp-feature-card">
              <div className="lp-feature-icon">🤖</div>
              <h3>AI-Powered Coaching</h3>
              <p>
                Personalized workout and nutrition plans generated by AI based on user goals, biometrics, and progress —
                delivered inside your branded app.
              </p>
            </div>
            <div className="lp-feature-card">
              <div className="lp-feature-icon">📹</div>
              <h3>Live & On-Demand Classes</h3>
              <p>
                Integrated video streaming for live classes and on-demand content libraries. Supports instructors,
                scheduling, and class bookings.
              </p>
            </div>
            <div className="lp-feature-card">
              <div className="lp-feature-icon">👥</div>
              <h3>Community & Challenges</h3>
              <p>
                Social feed, team challenges, leaderboards, and in-app messaging to keep your members engaged and coming
                back every day.
              </p>
            </div>
            <div className="lp-feature-card">
              <div className="lp-feature-icon">💳</div>
              <h3>Subscriptions & Payments</h3>
              <p>
                In-app subscriptions, one-time purchases, class packs, and membership tiers with Stripe billing and
                automated renewal management.
              </p>
            </div>
            <div className="lp-feature-card">
              <div className="lp-feature-icon">📊</div>
              <h3>Progress Tracking & Analytics</h3>
              <p>
                Member dashboards showing progress, streaks, and health trends. Admin analytics for engagement, retention,
                and revenue performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA SECTION */}
      <section className="lp-bottom-cta">
        <div className="container">
          <h2>Ready to Launch Your Wellness App?</h2>
          <p>
            Book a free 30-minute call. We'll map your product vision into a concrete roadmap, give you a cost estimate,
            and show you a live demo of our wellness platform — no obligation.
          </p>
          <CalendlyButton className="btn-primary" style={{ fontSize: '1rem', padding: '16px 36px' }}>
            Get My Free Wellness App Roadmap
          </CalendlyButton>
          <ul className="lp-check-list">
            <li>
              <span className="ck">✓</span> Free strategy session
            </li>
            <li>
              <span className="ck">✓</span> Live demo of features
            </li>
            <li>
              <span className="ck">✓</span> Custom cost estimate
            </li>
            <li>
              <span className="ck">✓</span> iOS + Android + Web
            </li>
            <li>
              <span className="ck">✓</span> No healthcare compliance stress
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
