export default function TrustCertifications() {
  return (
    <section className="trust-certifications">
      <div className="container">
        <div className="trust-cert-grid">
          <a href="https://www.google.com" target="_blank" rel="noreferrer" className="trust-cert-card">
            <div className="trust-cert-icon google-icon"><i className="fab fa-google"></i></div>
            <div className="trust-cert-rating">
              <div className="trust-cert-stars">★★★★★</div>
              <span className="trust-cert-score">5.0/5</span>
            </div>
            <div className="trust-cert-label">Google Reviews</div>
            <div className="trust-cert-desc">100% Client Satisfaction</div>
            <div className="trust-cert-cta">Read Reviews <i className="fas fa-arrow-right"></i></div>
          </a>

          <a href="https://www.trustpilot.com" target="_blank" rel="noreferrer" className="trust-cert-card">
            <div className="trust-cert-icon trustpilot-icon"><i className="fas fa-star"></i></div>
            <div className="trust-cert-rating">
              <div className="trust-cert-stars">★★★★★</div>
              <span className="trust-cert-score">4.9/5</span>
            </div>
            <div className="trust-cert-label">Trustpilot Rating</div>
            <div className="trust-cert-desc">Verified Enterprise Feedback</div>
            <div className="trust-cert-cta">Verify Profile <i className="fas fa-arrow-right"></i></div>
          </a>

          <div className="trust-cert-card">
            <div className="trust-cert-icon hipaa-icon"><i className="fas fa-user-shield"></i></div>
            <div className="trust-cert-badge">Security Ready</div>
            <div className="trust-cert-label">HIPAA Compliant</div>
            <div className="trust-cert-desc">BAA Agreements & Encryption</div>
            <div className="trust-cert-cta">Security Specs <i className="fas fa-arrow-right"></i></div>
          </div>

          <div className="trust-cert-card">
            <div className="trust-cert-icon msme-icon">
              <img src="/assets/certificate/msme-loo.png" alt="MSME Logo" style={{ height: '36px', width: 'auto' }} />
            </div>
            <div className="trust-cert-badge" style={{ background: 'rgba(255,153,0,0.15)', color: '#D97706' }}>Government Registered</div>
            <div className="trust-cert-label">MSME Registered</div>
            <div className="trust-cert-desc">Govt. of India Certified Agency</div>
            <div className="trust-cert-cta">UDYAM-WB-14-0097126</div>
          </div>
        </div>

        <div className="trust-indicators">
          <div className="trust-indicator"><i className="fas fa-shield-alt trust-indicator-icon"></i> SOC2 Type II Certified Process</div>
          <span className="trust-indicator-divider">•</span>
          <div className="trust-indicator"><i className="fas fa-lock trust-indicator-icon"></i> ISO 27001 Data Security</div>
          <span className="trust-indicator-divider">•</span>
          <div className="trust-indicator"><i className="fas fa-file-contract trust-indicator-icon"></i> 100% IP & Source Code Transfer</div>
        </div>
      </div>
    </section>
  );
}
