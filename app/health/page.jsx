'use client';

import TrustCertifications from '../components/TrustCertifications';
import ServicesSection from '../components/ServicesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CtaSection from '../components/CtaSection';

export default function HealthPage() {
  return (
    <main style={{ paddingTop: '80px' }}>
      <section className="hero" style={{ padding: '60px 0 40px', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span className="section-label">HealthTech Solutions</span>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', marginBottom: '24px' }}>
              HIPAA-Compliant <span className="gradient-text">Health Platforms</span>
            </h1>
            <p style={{ maxWidth: '600px', margin: '0 auto', color: '#64748b', fontSize: '1.1rem', lineHeight: '1.6' }}>
              Branded virtual care, EHR / FHIR integrations, RPM dashboards, and e-prescription software for clinics and startups.
            </p>
          </div>
        </div>
      </section>

      <TrustCertifications />
      <ServicesSection />
      <TestimonialsSection />
      <CtaSection />
    </main>
  );
}
