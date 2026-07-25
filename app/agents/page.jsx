'use client';

import TechStackSection from '../components/TechStackSection';
import ProcessSection from '../components/ProcessSection';
import CtaSection from '../components/CtaSection';

export default function AgentsPage() {
  return (
    <main style={{ paddingTop: '80px' }}>
      <section className="hero" style={{ padding: '60px 0 40px', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span className="section-label">Agentic AI</span>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', marginBottom: '24px' }}>
              Autonomous <span className="gradient-text">AI Agents</span>
            </h1>
            <p style={{ maxWidth: '600px', margin: '0 auto', color: '#64748b', fontSize: '1.1rem', lineHeight: '1.6' }}>
              Deploy multi-agent workflows for clinical decision support, customer automation, and complex background tasks.
            </p>
          </div>
        </div>
      </section>

      <TechStackSection />
      <ProcessSection />
      <CtaSection />
    </main>
  );
}
