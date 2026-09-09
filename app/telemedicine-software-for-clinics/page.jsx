import Link from 'next/link';
import CalendlyButton from '../components/CalendlyButton';

export const metadata = {
  title: 'White-Label Telemedicine Software for Clinics | Anonsoft',
  description:
    'Launch a HIPAA-compliant, branded telemedicine platform for your clinic in 30 days. Includes Epic/Cerner integration and no per-provider licensing fees.',
  keywords: [
    'telemedicine software for clinics',
    'white label telemedicine',
    'HIPAA telemedicine app',
    'clinic telemedicine platform',
    'Epic integration telemedicine',
    'branded telemedicine',
  ],
  alternates: {
    canonical: 'https://anonsoft.in/telemedicine-software-for-clinics',
  },
  openGraph: {
    title: 'White-Label Telemedicine Software for Clinics | Anonsoft',
    description:
      'Launch a HIPAA-compliant, branded telemedicine platform for your clinic in 30 days. Epic/Cerner integration and zero per-provider fees.',
    url: 'https://anonsoft.in/telemedicine-software-for-clinics',
    type: 'website',
    images: [{ url: 'https://anonsoft.com/assets/anon-soft-og.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'White-Label Telemedicine Software for Clinics | Anonsoft',
    description:
      'Launch a HIPAA-compliant, branded telemedicine platform for your clinic in 30 days.',
    images: ['https://anonsoft.com/assets/anon-soft-og.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'White-Label Telemedicine Software for Clinics',
  provider: {
    '@type': 'Organization',
    name: 'Anonsoft',
    url: 'https://anonsoft.in',
  },
  serviceType: 'Telemedicine Platform Development',
  description:
    'HIPAA-compliant, branded virtual care suite with Epic/Cerner integrations, smart scheduling, e-prescriptions, and zero per-provider seat fees.',
  areaServed: 'Worldwide',
};

export default function TelemedicineClinicPage() {
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
            <span>🏥</span> Built for US Clinics & Medical Practices
          </div>
          <h1>
            Launch a Branded <span className="gradient-text">Telemedicine Experience</span>
            <br />
            for Your Clinic — In 30 Days
          </h1>
          <p>
            HIPAA-compliant white-label telemedicine software, fully branded with your logo and colors, with Epic/Cerner
            integration built in — at up to 70% lower cost than custom development.
          </p>
          <div className="lp-cta-row">
            <CalendlyButton className="btn-primary">Get a Free HIPAA Consultation</CalendlyButton>
            <Link href="/#pricing" className="btn-secondary">
              View Pricing
            </Link>
          </div>
          <div className="lp-trust-row">
            <div className="lp-trust-item">
              <span>✓</span> HIPAA Compliant by Default
            </div>
            <div className="lp-trust-item">
              <span>✓</span> Epic / Cerner Integration
            </div>
            <div className="lp-trust-item">
              <span>✓</span> No Per-Provider Licensing
            </div>
            <div className="lp-trust-item">
              <span>✓</span> Launch in 4–8 Weeks
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="lp-social-proof">
        <div className="container">
          <div className="lp-stats-row">
            <div className="lp-stat-item">
              <div className="big-stat">50+</div>
              <div className="stat-label">Healthcare Clients</div>
            </div>
            <div className="lp-stat-item">
              <div className="big-stat">4–8</div>
              <div className="stat-label">Weeks to Launch</div>
            </div>
            <div className="lp-stat-item">
              <div className="big-stat">70%</div>
              <div className="stat-label">Average Cost Savings</div>
            </div>
            <div className="lp-stat-item">
              <div className="big-stat">99%</div>
              <div className="stat-label">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section
        className="lp-features"
        style={{
          background: 'rgba(15, 62, 128, 0.02)',
          borderTop: '1px solid var(--border-glass)',
          borderBottom: '1px solid var(--border-glass)',
        }}
      >
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="section-label">Build vs Buy</span>
            <h2 className="section-title">Custom Telehealth Software for Clinics: Custom vs. Off-The-Shelf</h2>
            <p className="section-subtitle" style={{ maxWidth: '640px', margin: '12px auto 0' }}>
              Understanding the differences helps you choose the right approach for your medical practice.
            </p>
          </div>
          <div style={{ marginTop: '40px', overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                minWidth: '600px',
                textAlign: 'left',
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-glass)',
              }}
            >
              <thead>
                <tr style={{ background: 'rgba(15, 62, 128, 0.05)', borderBottom: '2px solid var(--border-glass)' }}>
                  <th style={{ padding: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>Feature / Factor</th>
                  <th style={{ padding: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>Off-The-Shelf Software</th>
                  <th style={{ padding: '16px', fontWeight: '700', color: 'var(--secondary)' }}>Custom Telehealth System</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
                  <td style={{ padding: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>Data Ownership</td>
                  <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>Vendor owns/hosts your patient records.</td>
                  <td style={{ padding: '16px', color: 'var(--text-primary)', fontWeight: '600' }}>
                    100% complete data control and ownership.
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
                  <td style={{ padding: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>EHR/EMR Integrations</td>
                  <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>Limited to pre-integrated partners.</td>
                  <td style={{ padding: '16px', color: 'var(--text-primary)', fontWeight: '600' }}>
                    Custom API integrations tailored to Epic, Cerner, etc.
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
                  <td style={{ padding: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>Workflow Customization</td>
                  <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>Rigid layouts, forced workflows.</td>
                  <td style={{ padding: '16px', color: 'var(--text-primary)', fontWeight: '600' }}>
                    Bespoke screens matching clinic procedures.
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
                  <td style={{ padding: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>Initial Setup & Time</td>
                  <td style={{ padding: '16px', color: 'var(--text-primary)', fontWeight: '600' }}>Rapid setup (days).</td>
                  <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>Typically requires 3-6 months from scratch.</td>
                </tr>
                <tr>
                  <td style={{ padding: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>Our Hybrid Approach</td>
                  <td style={{ padding: '16px', color: 'var(--text-secondary)' }} colSpan={2}>
                    We deliver the best of both worlds: <strong>pre-built, fully customizable white-label telehealth software</strong> for clinics launched in 30 days.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="lp-features">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="section-label">Platform Features</span>
            <h2 className="section-title">Everything Your Clinic Needs to Go Digital</h2>
            <p className="section-subtitle" style={{ maxWidth: '640px', margin: '12px auto 0' }}>
              A complete telemedicine stack, pre-built and compliance-ready — so you don't manage 5 different vendors.
            </p>
          </div>
          <div className="lp-features-grid">
            <div className="lp-feature-card">
              <div className="lp-feature-icon">📹</div>
              <h3>HD Video Consultations</h3>
              <p>
                Secure, HIPAA-compliant video visits with waiting room, recording consent, and mobile-friendly interface for patients and providers.
              </p>
            </div>
            <div className="lp-feature-card">
              <div className="lp-feature-icon">📋</div>
              <h3>EHR / Patient Record Integration</h3>
              <p>
                Connect to Epic, Cerner, Allscripts, or athenahealth via HL7 FHIR API. Providers see patient history before every visit.
              </p>
            </div>
            <div className="lp-feature-card">
              <div className="lp-feature-icon">💊</div>
              <h3>E-Prescriptions</h3>
              <p>
                Integrated with Surescripts for controlled and non-controlled substance prescriptions sent electronically to any pharmacy.
              </p>
            </div>
            <div className="lp-feature-card">
              <div className="lp-feature-icon">📅</div>
              <h3>Smart Scheduling</h3>
              <p>
                Multi-provider scheduling with automated appointment reminders via SMS/email, self-service booking, and cancellation management.
              </p>
            </div>
            <div className="lp-feature-card">
              <div className="lp-feature-icon">💳</div>
              <h3>Insurance & Payments</h3>
              <p>
                Stripe and Square payment integration for copays, self-pay, and insurance claim data capture. Automated invoicing included.
              </p>
            </div>
            <div className="lp-feature-card">
              <div className="lp-feature-icon">🔒</div>
              <h3>HIPAA Compliance Built-In</h3>
              <p>
                AES-256 encryption, audit logging, role-based access control, BAA agreements with AWS, and SOC 2 readiness — included at no extra cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STANDALONE VS EHR INTEGRATED */}
      <section
        className="lp-features"
        style={{ background: 'rgba(15, 62, 128, 0.01)', borderTop: '1px solid var(--border-glass)' }}
      >
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="section-label">Workflow Efficiency</span>
            <h2 className="section-title">Standalone vs. EHR Integrated Telehealth Solution</h2>
            <p className="section-subtitle" style={{ maxWidth: '640px', margin: '12px auto 0' }}>
              Avoid double data entry. Learn how a deeply integrated virtual care system saves hours of administrative charting.
            </p>
          </div>
          <div className="lp-features-grid" style={{ marginTop: '40px' }}>
            <div className="lp-feature-card" style={{ borderLeft: '4px solid #ef4444' }}>
              <h3 style={{ color: '#ef4444', fontSize: '1.1rem', fontWeight: '700', marginBottom: '10px' }}>
                Standalone Telehealth Tools
              </h3>
              <p style={{ marginBottom: '15px', fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                Disconnects clinical care from records:
              </p>
              <ul style={{ paddingLeft: '15px', fontSize: '0.88rem', lineHeight: '1.8', listStyleType: 'circle', color: 'var(--text-secondary)' }}>
                <li>Manual transcription of patient visit notes</li>
                <li>Double entry of scheduling & calendar bookings</li>
                <li>Re-entering billing claims & CPT codes</li>
                <li>Separate portals for patient billing and charts</li>
              </ul>
            </div>
            <div className="lp-feature-card" style={{ borderLeft: '4px solid var(--accent-green)', background: 'rgba(39, 193, 156, 0.02)' }}>
              <h3 style={{ color: 'var(--accent-green)', fontSize: '1.1rem', fontWeight: '700', marginBottom: '10px' }}>
                EHR Integrated Telehealth Solution
              </h3>
              <p style={{ marginBottom: '15px', fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                Seamless real-time data synchronization:
              </p>
              <ul style={{ paddingLeft: '15px', fontSize: '0.88rem', lineHeight: '1.8', listStyleType: 'disc', color: 'var(--text-secondary)' }}>
                <li>
                  <strong>Auto-Sync Notes</strong>: Clinician charts write directly to the EHR
                </li>
                <li>
                  <strong>Unified Calendar</strong>: Telehealth appointments sync instantly
                </li>
                <li>
                  <strong>Direct Billing</strong>: Claims, CPT codes, and copays transfer seamlessly
                </li>
                <li>
                  <strong>Patient Portal EHR</strong>: Single-sign-on access for patients
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* VENDOR EVALUATION CHECKLIST */}
      <section className="lp-features" style={{ borderTop: '1px solid var(--border-glass)' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="section-label">Vendor Guide</span>
            <h2 className="section-title">How to Evaluate Telemedicine Software Vendors</h2>
            <p className="section-subtitle" style={{ maxWidth: '640px', margin: '12px auto 0' }}>
              Use this 4-point checklist to compare telemedicine vendors and secure the best platform for your practice.
            </p>
          </div>
          <div className="lp-features-grid" style={{ marginTop: '40px' }}>
            <div className="lp-feature-card">
              <div className="lp-feature-icon">📝</div>
              <h3>1. BAA & HIPAA Readiness</h3>
              <p>
                Never rely on verbal compliance. Ensure the vendor signs a formal Business Associate Agreement (BAA).{' '}
                <em>Anonsoft is BAA-ready and deploys on your dedicated AWS/Google Cloud instance.</em>
              </p>
            </div>
            <div className="lp-feature-card">
              <div className="lp-feature-icon">🔌</div>
              <h3>2. EHR/EMR Integration Depth</h3>
              <p>
                Verify if visit logs, scheduling, and billing codes write back directly into Epic, Cerner, or Athenahealth.{' '}
                <em>We provide bi-directional HL7/FHIR integrations to eliminate manual entry.</em>
              </p>
            </div>
            <div className="lp-feature-card">
              <div className="lp-feature-icon">💾</div>
              <h3>3. Codebase & Data Ownership</h3>
              <p>
                Ask if you will own the patient data and codebase, or be locked into monthly licensing forever.{' '}
                <em>Unlike typical SaaS vendors, we offer full codebase ownership options for your custom platform.</em>
              </p>
            </div>
            <div className="lp-feature-card">
              <div className="lp-feature-icon">⚡</div>
              <h3>4. All-in-One Patient Workflow</h3>
              <p>
                Compare if the vendor supports video, intake forms, scheduling, eRx, and payments in one interface.{' '}
                <em>We unify all 5 systems to prevent portal fatigue for patients and staff.</em>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA SECTION */}
      <section className="lp-bottom-cta">
        <div className="container">
          <h2>Ready to Launch Your Clinic's Telemedicine Platform?</h2>
          <p>
            Book a free 30-minute consultation. We'll show you the live platform, give you a clear cost estimate, and outline exactly how fast you can go live — with no obligation and an NDA if needed.
          </p>
          <CalendlyButton className="btn-primary" style={{ fontSize: '1rem', padding: '16px 36px' }}>
            Get My Free HIPAA Consultation
          </CalendlyButton>
          <ul className="lp-check-list">
            <li>
              <span className="ck">✓</span> Free 30-min consultation
            </li>
            <li>
              <span className="ck">✓</span> Live platform demo
            </li>
            <li>
              <span className="ck">✓</span> Custom cost estimate
            </li>
            <li>
              <span className="ck">✓</span> NDA available
            </li>
            <li>
              <span className="ck">✓</span> No sales pressure
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
