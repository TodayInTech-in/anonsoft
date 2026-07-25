'use client';

import { triggerCalendly } from '../lib/calendly';

export default function PricingSection() {
  const handleBooking = (e) => {
    e.preventDefault();
    triggerCalendly('https://calendly.com/todayintechdotin/30min');
  };

  return (
    <section id="pricing" className="pricing">
      <div className="container">
        <div className="section-header">
          <div className="section-label">Transparent Pricing</div>
          <h2 className="section-title">Zero Upfront Payment Models</h2>
          <p className="section-subtitle">Choose a fixed-scope plan. Pay only after reviewing your working prototype.</p>
        </div>

        <div className="pricing-grid">
          <div className="pricing-card">
            <div className="pricing-tier">Starter MVP</div>
            <div className="pricing-price">
              <strong>$2,999</strong> <span className="price-period">one-time</span>
            </div>
            <div className="pricing-timeline">4 Weeks Delivery</div>
            <ul className="pricing-features">
              <li>✓ Core White-Label Platform</li>
              <li>✓ Custom Branding & Domain</li>
              <li>✓ Basic Patient / Admin Portal</li>
              <li>✓ 100% Source Code Ownership</li>
            </ul>
            <a href="https://calendly.com/todayintechdotin/30min" onClick={handleBooking} className="pricing-cta">Get Started &rarr;</a>
          </div>

          <div className="pricing-card pricing-card-featured">
            <div className="pricing-popular-badge">Most Popular</div>
            <div className="pricing-tier">Growth Platform</div>
            <div className="pricing-price">
              <strong>$5,999</strong> <span className="price-period">one-time</span>
            </div>
            <div className="pricing-timeline">6 Weeks Delivery</div>
            <ul className="pricing-features">
              <li>✓ Everything in Starter MVP</li>
              <li>✓ Full Telehealth WebRTC Video</li>
              <li>✓ EHR / FHIR API Connector</li>
              <li>✓ Payment Gateway & Billing</li>
              <li>✓ 3 Months Free Support</li>
            </ul>
            <a href="https://calendly.com/todayintechdotin/30min" onClick={handleBooking} className="pricing-cta pricing-cta-featured">Book Free Call &rarr;</a>
          </div>

          <div className="pricing-card">
            <div className="pricing-tier">Enterprise Suite</div>
            <div className="pricing-price">
              <strong>Custom</strong>
            </div>
            <div className="pricing-timeline">8 Weeks Delivery</div>
            <ul className="pricing-features">
              <li>✓ Multi-Clinic / Multi-Tenant ERP</li>
              <li>✓ Ambient AI Medical Scribe</li>
              <li>✓ Custom Microservices Architecture</li>
              <li>✓ Dedicated Support Lead & BAA</li>
            </ul>
            <a href="https://calendly.com/todayintechdotin/30min" onClick={handleBooking} className="pricing-cta">Contact Sales &rarr;</a>
          </div>
        </div>
      </div>
    </section>
  );
}
