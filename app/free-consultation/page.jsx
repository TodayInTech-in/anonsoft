'use client';

import CtaSection from '../components/CtaSection';
import TrustCertifications from '../components/TrustCertifications';

export default function FreeConsultationPage() {
  return (
    <main style={{ paddingTop: '80px' }}>
      <section className="hero" style={{ padding: '60px 0 40px', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span className="section-label">Free Strategy Session</span>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', marginBottom: '24px' }}>
              Book Your Free <span className="gradient-text">30-Min Call</span>
            </h1>
            <p style={{ maxWidth: '600px', margin: '0 auto', color: '#64748b', fontSize: '1.1rem', lineHeight: '1.6' }}>
              No obligation, strict NDA on request, and a fixed-scope quote delivered within 24 hours.
            </p>
          </div>
        </div>
      </section>

      <TrustCertifications />
      <CtaSection />
    </main>
  );
}
