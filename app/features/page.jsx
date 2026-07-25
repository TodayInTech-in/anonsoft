'use client';

import ComparisonSection from '../components/ComparisonSection';
import TrustCertifications from '../components/TrustCertifications';
import ProcessSection from '../components/ProcessSection';
import CtaSection from '../components/CtaSection';

export default function FeaturesPage() {
  return (
    <main style={{ paddingTop: '80px' }}>
      <section className="hero" style={{ padding: '60px 0 40px', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span className="section-label">Architecture & Features</span>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', marginBottom: '24px' }}>
              Enterprise Platform <span className="gradient-text">Features</span>
            </h1>
            <p style={{ maxWidth: '600px', margin: '0 auto', color: '#64748b', fontSize: '1.1rem', lineHeight: '1.6' }}>
              Built for security, compliance, and instant scale—from zero upfront prototype to full source code transfer.
            </p>
          </div>
        </div>
      </section>

      <ComparisonSection />
      <TrustCertifications />
      <ProcessSection />
      <CtaSection />
    </main>
  );
}
