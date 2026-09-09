'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { triggerCalendly } from '../lib/calendly';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function PricingSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      '.pricing-card',
      { autoAlpha: 0, y: 40 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );
  }, { scope: sectionRef });

  const handleBooking = (e) => {
    e.preventDefault();
    triggerCalendly('https://calendly.com/anonsoftdotin/30min');
  };

  return (
    <section id="pricing" className="pricing" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <div className="section-label">Transparent Engagement</div>
          <h2 className="section-title">Fixed-Scope SaaS & App Development Packages</h2>
          <p className="section-subtitle">No hidden fees, no hourly surprises. Predictable pricing with clear deliverables.</p>
        </div>

        <div className="pricing-grid">
          <div className="pricing-card">
            <div className="pricing-badge">Fast Track</div>
            <h3>MVP Sprint</h3>
            <div className="pricing-price">$4,999 <span>/ fixed</span></div>
            <p>Ideal for early-stage founders needing a functional, investor-ready prototype in 3–4 weeks.</p>
            <ul className="pricing-features">
              <li><i className="fas fa-check"></i> Core SaaS / HealthTech Features</li>
              <li><i className="fas fa-check"></i> Mobile Responsive Web App</li>
              <li><i className="fas fa-check"></i> Database & Authentication</li>
              <li><i className="fas fa-check"></i> Vercel / AWS Deployment</li>
              <li><i className="fas fa-check"></i> 14 Days Post-Launch Support</li>
            </ul>
            <a href="https://calendly.com/anonsoftdotin/30min" onClick={handleBooking} className="btn-secondary" style={{ width: '100%', textAlign: 'center' }}>
              Book MVP Consultation
            </a>
          </div>

          <div className="pricing-card featured">
            <div className="pricing-badge featured-badge">Most Popular</div>
            <h3>Full Platform Build</h3>
            <div className="pricing-price">$9,999 <span>/ fixed</span></div>
            <p>Complete end-to-end web & mobile platform with multi-role dashboards and API integrations.</p>
            <ul className="pricing-features">
              <li><i className="fas fa-check"></i> Everything in MVP Sprint</li>
              <li><i className="fas fa-check"></i> iOS & Android Mobile Apps</li>
              <li><i className="fas fa-check"></i> Stripe / Payment Gateway</li>
              <li><i className="fas fa-check"></i> HIPAA Security Encryption</li>
              <li><i className="fas fa-check"></i> EHR / Third-Party API Integration</li>
              <li><i className="fas fa-check"></i> 30 Days Post-Launch Support</li>
            </ul>
            <a href="https://calendly.com/anonsoftdotin/30min" onClick={handleBooking} className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>
              Book Production Call
            </a>
          </div>

          <div className="pricing-card">
            <div className="pricing-badge">Enterprise</div>
            <h3>Dedicated Tech Team</h3>
            <div className="pricing-price">$6,500 <span>/ month</span></div>
            <p>Full-stack React, Next.js, Node.js, and Python developers working exclusively on your product.</p>
            <ul className="pricing-features">
              <li><i className="fas fa-check"></i> Senior Full-Stack Engineers</li>
              <li><i className="fas fa-check"></i> Dedicated Tech Lead & PM</li>
              <li><i className="fas fa-check"></i> Daily Standups & Slack Access</li>
              <li><i className="fas fa-check"></i> Scalable Infrastructure Audit</li>
              <li><i className="fas fa-check"></i> Flexible Monthly Subscription</li>
            </ul>
            <a href="https://calendly.com/anonsoftdotin/30min" onClick={handleBooking} className="btn-secondary" style={{ width: '100%', textAlign: 'center' }}>
              Hire Dedicated Team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
