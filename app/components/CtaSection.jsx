'use client';

import { triggerCalendly } from '../lib/calendly';

export default function CtaSection() {
  const handleBooking = (e) => {
    e.preventDefault();
    triggerCalendly('https://calendly.com/todayintechdotin/30min');
  };

  return (
    <section id="contact" className="cta">
      <div className="container">
        <div className="cta-wrapper">
          <h2 className="cta-title">Ready to See Your Working Prototype?</h2>
          <p className="cta-subtitle">
            Zero upfront payment. Schedule a free 30-minute strategy call with our engineering team today.
          </p>
          <div className="cta-buttons">
            <a href="https://calendly.com/todayintechdotin/30min" onClick={handleBooking} className="btn-primary">
              Book Strategy Call &rarr;
            </a>
            <a href="mailto:contact@todayintech.in" className="btn-secondary" style={{ color: '#ffffff', border: '1px solid rgba(255,255,255,0.3)' }}>
              contact@todayintech.in
            </a>
          </div>
          <div className="cta-trust">
            <div className="cta-trust-item"><span style={{ color: 'var(--accent-green)' }}>✓</span> Fixed-Scope Quote in 24 Hours</div>
            <div className="cta-trust-item"><span style={{ color: 'var(--accent-green)' }}>✓</span> Strict NDA Protection</div>
            <div className="cta-trust-item"><span style={{ color: 'var(--accent-green)' }}>✓</span> 100% IP Transfer</div>
          </div>
        </div>
      </div>
    </section>
  );
}
