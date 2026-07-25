'use client';

import ServicesSection from '../components/ServicesSection';
import TechStackSection from '../components/TechStackSection';
import PricingSection from '../components/PricingSection';
import CtaSection from '../components/CtaSection';

export default function ServicesPage() {
  return (
    <main style={{ paddingTop: '80px' }}>
      <section className="hero" style={{ padding: '60px 0 40px', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span className="section-label">Engineering Capabilities</span>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', marginBottom: '24px' }}>
              Our Software <span className="gradient-text">Engineering Services</span>
            </h1>
            <p style={{ maxWidth: '600px', margin: '0 auto', color: '#64748b', fontSize: '1.1rem', lineHeight: '1.6' }}>
              Pre-validated HIPAA modules combined with bespoke custom engineering for HealthTech, SaaS, and AI startups.
            </p>
          </div>
        </div>
      </section>

      <ServicesSection />
      <TechStackSection />
      <PricingSection />
      <CtaSection />
    </main>
  );
}
