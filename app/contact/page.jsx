'use client';

import FaqSection from '../components/FaqSection';
import CtaSection from '../components/CtaSection';

export default function ContactPage() {
  return (
    <main style={{ paddingTop: '80px' }}>
      <section className="hero" style={{ padding: '60px 0 40px', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span className="section-label">Contact & Support</span>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', marginBottom: '24px' }}>
              Let&apos;s Build Your <span className="gradient-text">Product</span>
            </h1>
            <p style={{ maxWidth: '600px', margin: '0 auto', color: '#64748b', fontSize: '1.1rem', lineHeight: '1.6' }}>
              Have questions or need a custom fixed-scope estimate? Book a free call or send us an email.
            </p>
          </div>
        </div>
      </section>

      <FaqSection />
      <CtaSection />
    </main>
  );
}
