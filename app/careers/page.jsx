'use client';

import CtaSection from '../components/CtaSection';

export default function CareersPage() {
  const positions = [
    { title: 'Senior Full Stack Engineer (Next.js & Node)', location: 'Remote / India', type: 'Full-Time' },
    { title: 'HealthTech Integration Specialist (HL7 / FHIR)', location: 'Remote', type: 'Full-Time' },
    { title: 'AI Engineering Lead (LLMs & Python)', location: 'Remote', type: 'Full-Time' },
  ];

  return (
    <main style={{ paddingTop: '80px' }}>
      <section className="hero" style={{ padding: '60px 0 40px', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span className="section-label">Join Our Team</span>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', marginBottom: '24px' }}>
              Build the Future of <span className="gradient-text">Software & AI</span>
            </h1>
            <p style={{ maxWidth: '600px', margin: '0 auto', color: '#64748b', fontSize: '1.1rem', lineHeight: '1.6' }}>
              Work with senior engineers across 12+ countries building production-ready HealthTech, SaaS, and AI platforms.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 0', background: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '32px' }}>Open Positions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {positions.map((p, idx) => (
              <div key={idx} style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: '#1e293b', marginBottom: '4px' }}>{p.title}</h3>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{p.location} • {p.type}</div>
                </div>
                <a href="mailto:careers@anonsoft.in" className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>Apply Now &rarr;</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </main>
  );
}
