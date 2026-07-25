'use client';

import Link from 'next/link';
import { triggerCalendly } from '../lib/calendly';

export default function Footer() {
  const handleBooking = (e) => {
    e.preventDefault();
    triggerCalendly('https://calendly.com/todayintechdotin/30min');
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img src="/assets/nav_logo.png" alt="TodayInTech Logo" style={{ height: '36px', width: 'auto' }} />
            </Link>
            <p style={{ marginTop: '14px' }}>
              Launch your branded healthcare platform in 4–8 weeks with zero upfront payment. HIPAA-compliant software for clinics, healthtech startups, and wellness brands.
            </p>
          </div>

          <div className="footer-column">
            <h4>Services</h4>
            <ul>
              <li><Link href="/services">All Services</Link></li>
              <li><Link href="/health">HealthTech</Link></li>
              <li><Link href="/ai">AI Tools</Link></li>
              <li><Link href="/agents">AI Agents</Link></li>
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
            <h4>Company & Support</h4>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li>
                <a href="https://calendly.com/todayintechdotin/30min" onClick={handleBooking} style={{ color: 'var(--primary)', fontWeight: '600' }}>
                  Book Free Call &rarr;
                </a>
              </li>
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
