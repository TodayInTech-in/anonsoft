'use client';

import ServicesSection from '../components/ServicesSection';
import TechStackSection from '../components/TechStackSection';
import CtaSection from '../components/CtaSection';

export default function AiPage() {
  return (
    <main style={{ paddingTop: '80px' }}>
      <section className="hero" style={{ padding: '60px 0 40px', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span className="section-label">AI Engineering</span>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', marginBottom: '24px' }}>
              Custom AI Tools & <span className="gradient-text">Automation</span>
            </h1>
            <p style={{ maxWidth: '600px', margin: '0 auto', color: '#64748b', fontSize: '1.1rem', lineHeight: '1.6' }}>
              Ambient AI scribing, custom LLM fine-tuning, voice cloning agents, and RCM prior-authorization automation.
            </p>
          </div>
        </div>
      </section>

      <ServicesSection />
      <TechStackSection />
      <CtaSection />
    </main>
  );
}
