export default function CtaSection() {
  return (
    <section id="contact" className="cta">
      <div className="container">
        <div className="cta-wrapper">
          <h2 className="cta-title">Ready to See Your Working Prototype?</h2>
          <p className="cta-subtitle">
            Zero upfront payment. Schedule a free 30-minute strategy call with our engineering team today.
          </p>
          <div className="cta-buttons">
            <a href="mailto:contact@todayintech.in" className="btn-primary">
              contact@todayintech.in &rarr;
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
