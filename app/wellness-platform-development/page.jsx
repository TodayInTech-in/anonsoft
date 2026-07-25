import Link from 'next/link';

export const metadata = {
  title: 'Build a Branded Wellness App Your Members Will Actually Use',
  description:
    'Custom wellness & fitness platform development. Wearable device integrations (Apple Health, Fitbit, Garmin), member tracking, and custom branded mobile apps.',
};

export default function WellnessPlatformPage() {
  return (
    <main style={{ padding: '120px 0 80px', background: '#ffffff' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="section-label">Wellness & Fitness Brands</div>
          <h1 className="section-title">Custom Wellness App & Platform Engineering</h1>
          <p className="section-subtitle">
            Wearable API integrations, member portals, custom fitness analytics, and subscription billing.
          </p>
        </div>

        <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '36px', marginBottom: '40px' }}>
          <h2 style={{ color: '#1e293b', marginBottom: '16px', fontSize: '1.5rem' }}>Platform Features</h2>
          <ul style={{ listStyle: 'disc', paddingLeft: '24px', lineHeight: '1.8', color: '#334155' }}>
            <li>Apple HealthKit, Google Health Connect, Fitbit & Garmin Sync</li>
            <li>Custom Workout & Nutrition Plan Builders</li>
            <li>In-App Live Stream Classes & On-Demand Video Library</li>
            <li>Gamified Member Challenges & Leaderboards</li>
          </ul>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link href="/#contact" className="btn-primary" style={{ display: 'inline-block' }}>
            Get Your Wellness App Roadmap &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
}
