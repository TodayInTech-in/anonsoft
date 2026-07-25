export default function AboutSection() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-content">
            <div className="section-label">About TodayInTech</div>
            <h2 className="section-title">We Build Software That Startup Founders & Clinics Love</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
              TodayInTech is an MSME-registered software agency headquartered in India with global delivery operations. We specialize in white-label healthcare, SaaS, AI tools, and enterprise mobile applications.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              Our zero-upfront prototype model guarantees transparency: you inspect the working software application built specifically for your business before paying any initial milestone.
            </p>

            <div className="about-features">
              <div className="about-feature">
                <div className="about-feature-icon"><i className="fas fa-rocket"></i></div>
                <h4>Rapid Prototyping</h4>
                <p>Working software built in days, not months.</p>
              </div>
              <div className="about-feature">
                <div className="about-feature-icon"><i className="fas fa-shield-alt"></i></div>
                <h4>Enterprise Security</h4>
                <p>HIPAA, SOC2, and ISO compliant defaults.</p>
              </div>
            </div>
          </div>

          <div className="about-stats-visual">
            <div className="stats-card-grid">
              <div className="stat-card">
                <div className="stat-number">120+</div>
                <div className="stat-label">Projects Shipped</div>
                <div className="stat-sublabel">Worldwide</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">50+</div>
                <div className="stat-label">Happy Clients</div>
                <div className="stat-sublabel">US, UK & Asia</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">70%</div>
                <div className="stat-label">Cost Savings</div>
                <div className="stat-sublabel">Vs Scratch Agencies</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">4–8</div>
                <div className="stat-label">Weeks Delivery</div>
                <div className="stat-sublabel">Average MVP Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
