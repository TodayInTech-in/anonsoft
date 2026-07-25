'use client';

export default function FaqSection() {
  const faqs = [
    {
      q: 'What is white-label software?',
      a: 'White-label software is a pre-built, battle-tested product developed by us and re-branded under your name. You skip 6–12 months of scratch engineering and go to market in weeks.'
    },
    {
      q: 'How does the Zero Upfront Payment model work?',
      a: 'We build and demonstrate your working prototype first. You inspect the software in action on a test server before making any initial milestone payment.'
    },
    {
      q: 'Do I own the source code?',
      a: 'Yes! Upon final milestone payment, you receive 100% full IP and source code ownership with zero recurring royalty or per-user seat fees.'
    },
    {
      q: 'Is the software HIPAA compliant?',
      a: 'Yes. All healthcare modules feature BAA agreements, AES-256 data encryption at rest and in transit, audit logging, and role-based access control.'
    }
  ];

  return (
    <section id="faq" className="faq">
      <div className="container">
        <div className="section-header">
          <div className="section-label">FAQ</div>
          <h2 className="section-title">Frequently Asked Questions</h2>
        </div>

        <div className="faq-grid">
          {faqs.map((f, idx) => (
            <details key={idx} className="faq-item">
              <summary className="faq-question">
                <span>{f.q}</span>
                <div className="faq-icon">+</div>
              </summary>
              <div className="faq-answer">
                <p>{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
