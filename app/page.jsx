import Link from 'next/link';
import RoiCalculator from './components/RoiCalculator';
import SocialProofToast from './components/SocialProofToast';

export default function HomePage() {
  return (
    <main>
      <SocialProofToast />

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="pulse"></span>
              <span>Zero Upfront Payment Software Agency</span>
            </div>

            <h1 className="hero-title">
              Launch Your Branded Health Platform in <span className="gradient-text">4–8 Weeks</span>
            </h1>

            <p className="hero-description">
              HIPAA-compliant white-label software for telemedicine, EHR, pharmacy, and wellness — fully branded as yours, deployed without 6–12 months of custom development, and up to 70% lower cost.
            </p>

            <div className="hero-buttons">
              <Link href="/#contact" className="btn-primary">
                Get Your Working Prototype &rarr;
              </Link>
              <Link href="/#projects" className="btn-secondary">
                View Portfolio
              </Link>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-number">50+</div>
                <div className="hero-stat-label">Happy Clients</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">120+</div>
                <div className="hero-stat-label">Projects Delivered</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">99%</div>
                <div className="hero-stat-label">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Press / Featured Section */}
      <section className="trusted-by">
        <div className="container">
          <div className="trusted-label">Featured In & Trusted By Digital Health Leaders</div>
          <div className="trusted-logos">
            <div className="trusted-logo">Product Hunt</div>
            <div className="trusted-logo">Clutch</div>
            <div className="trusted-logo">DesignRush</div>
            <div className="trusted-logo">GoodFirms</div>
            <div className="trusted-logo">TechBehemoths</div>
          </div>
        </div>
      </section>

      {/* Interactive ROI Calculator */}
      <RoiCalculator />

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Our Capabilities</div>
            <h2 className="section-title">Specialized Healthcare & SaaS Engineering</h2>
            <p className="section-subtitle">Pre-validated HIPAA modules combined with bespoke custom engineering.</p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon icon-blue">🏥</div>
              <h3>Telehealth & Telemedicine</h3>
              <p>Branded virtual care platforms with WebRTC video, e-prescriptions, patient portals, and SMART on FHIR EHR integration.</p>
            </div>

            <div className="service-card">
              <div className="service-icon icon-purple">🎓</div>
              <h3>School & Campus ERP</h3>
              <p>All-in-one White-label ERP for admissions, fee collections, report cards, parent mobile apps, and live GPS bus tracking.</p>
            </div>

            <div className="service-card">
              <div className="service-icon icon-green">📦</div>
              <h3>Inventory & Retail Billing</h3>
              <p>Multi-warehouse stock tracking, GST invoicing, barcode scanners, and automated POS SaaS platforms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="projects" className="portfolio">
        <div className="container">
          <div className="section-header">
            <div className="section-label">Selected Case Studies</div>
            <h2 className="section-title">Battle-Tested Digital Products</h2>
          </div>

          <div className="portfolio-grid">
            <Link href="/projects/mednowna" className="portfolio-card">
              <div className="portfolio-info">
                <span className="portfolio-category">Telemedicine</span>
                <h3>MedNow Telehealth Platform</h3>
                <p>White-label virtual consultation suite built for multi-specialty clinics in the US.</p>
              </div>
            </Link>

            <Link href="/projects/senior-care-agency" className="portfolio-card">
              <div className="portfolio-info">
                <span className="portfolio-category">Home Care</span>
                <h3>Senior Care EVV Agency ERP</h3>
                <p>GPS visit verification, caregiver scheduling, and family portal app.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="cta">
        <div className="container">
          <div className="cta-wrapper">
            <h2 className="cta-title">Ready to See Your Prototype in Action?</h2>
            <p className="cta-subtitle">Zero upfront payment. We build your prototype first — you pay only after reviewing the working software.</p>
            <div className="cta-buttons">
              <a href="mailto:contact@todayintech.in" className="btn-primary">
                contact@todayintech.in
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
