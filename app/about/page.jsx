'use client';

import TrustedBy from '../components/TrustedBy';
import AboutSection from '../components/AboutSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CtaSection from '../components/CtaSection';

export default function AboutPage() {
  return (
    <main style={{ paddingTop: '80px' }}>
      <section className="hero" style={{ padding: '60px 0 40px', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span className="section-label">The Agency</span>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', marginBottom: '24px' }}>
              Who is <span className="gradient-text">Anonsoft?</span>
            </h1>
            <p style={{ maxWidth: '600px', margin: '0 auto', color: '#64748b', fontSize: '1.1rem', lineHeight: '1.6' }}>
              A global collective of engineers, designers, and strategists redefining custom startup software delivery with zero upfront cost.
            </p>
          </div>
        </div>
      </section>

      <TrustedBy />
      <AboutSection />
      <TestimonialsSection />
      <CtaSection />
    </main>
  );
}
