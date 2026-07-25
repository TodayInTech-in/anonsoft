import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="nav-logo">
              <span className="nav-logo-text">TodayInTech</span>
            </Link>
            <p>
              Launch your branded healthcare platform in 4–8 weeks with zero upfront payment. HIPAA-compliant software for clinics, healthtech startups, and wellness brands.
            </p>
          </div>

          <div className="footer-column">
            <h4>Services</h4>
            <ul>
              <li><Link href="/telemedicine-software-for-clinics">Telemedicine LPs</Link></li>
              <li><Link href="/healthcare-saas-mvp-development">Healthcare MVP</Link></li>
              <li><Link href="/wellness-platform-development">Wellness Platforms</Link></li>
              <li><Link href="/#services">All Services</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Projects</h4>
            <ul>
              <li><Link href="/projects/mednowna">MedNow Telehealth</Link></li>
              <li><Link href="/projects/senior-care-agency">Senior Care ERP</Link></li>
              <li><Link href="/projects/impakto">3D WebGL Configurator</Link></li>
              <li><Link href="/projects/vocal-flow">AI Voice Cloning</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><Link href="/#about">About Us</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/refund-policy">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">&copy; 2026 TodayInTech. All rights reserved.</p>
          <div className="footer-legal">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/refund-policy">Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
