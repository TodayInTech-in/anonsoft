'use client';

import { useState, useEffect } from 'react';
import { triggerCalendly } from '../lib/calendly';

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState(0);

  const slides = [
    {
      label: 'SaaS',
      badge: 'Custom SaaS & Cloud ERP',
      title: 'Custom Startup SaaS Software Development Agency',
      description: 'We help startups launch scalable SaaS, multi-tenant billing platforms, and inventory systems quickly with zero upfront cost.',
      ctaText: 'Book Free Strategy Call',
      img: '/assets/project/biling-and-inventory.png',
      alt: 'SaaS Billing & Inventory Platform'
    },
    {
      label: 'Mobile',
      badge: 'iOS & Android App Dev',
      title: 'Cross-Platform & Native Mobile App Development',
      description: 'Launch high-performing iOS and Android mobile apps for digital health, fitness, and consumer startups in weeks.',
      ctaText: 'Discuss Mobile App MVP',
      img: '/assets/project-fitness.png',
      alt: 'Fitness & Health Mobile App'
    },
    {
      label: 'AI',
      badge: 'AI & Autonomous Agents',
      title: 'Custom AI Tools & Agentic Workflow Engineering',
      description: 'Integrate custom LLMs, ambient medical scribing, voice cloning, and multi-agent automated workflows into your platform.',
      ctaText: 'Explore AI Engineering',
      img: '/assets/project/marketing-tools.png',
      alt: 'Marketing & AI Automation Suite'
    },
    {
      label: 'Healthcare',
      badge: 'HIPAA & Telehealth SaaS',
      title: 'HIPAA-Compliant Telehealth & HealthTech Solutions',
      description: 'White-label virtual care suites, EHR/FHIR integrations, caregiver EVV systems, and RPM dashboards for healthcare leaders.',
      ctaText: 'Book HealthTech Demo',
      img: '/assets/project-telemedicine.png',
      alt: 'Telemedicine & Virtual Care Platform'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleBooking = (e) => {
    e.preventDefault();
    triggerCalendly('https://calendly.com/todayintechdotin/30min');
  };

  return (
    <section className="hero" id="hero" style={{ position: 'relative', overflow: 'hidden', paddingBottom: '40px' }}>
      {/* Top Floating Category Switcher */}
      <div className="container" style={{ marginBottom: '24px', position: 'relative', zIndex: 10 }}>
        <div className="hero-tabs-menu" style={{ maxWidth: '480px', margin: '0 auto', background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(8px)', padding: '6px', borderRadius: '99px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
          {slides.map((slide, idx) => (
            <button
              key={idx}
              className={`hero-tab-link ${activeTab === idx ? 'active' : ''}`}
              onClick={() => setActiveTab(idx)}
              style={{ flex: 1, padding: '8px 16px', borderRadius: '99px', fontSize: '0.88rem', fontWeight: '600' }}
            >
              {slide.label}
              <div
                className="hero-tab-timer"
                style={{
                  width: activeTab === idx ? '100%' : '0%',
                  transition: activeTab === idx ? 'width 5500ms linear' : 'none'
                }}
              ></div>
            </button>
          ))}
        </div>
      </div>

      {/* Full Section Horizontal Track Slider */}
      <div
        style={{
          display: 'flex',
          width: `${slides.length * 100}%`,
          transform: `translateX(-${(activeTab * 100) / slides.length}%)`,
          transition: 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      >
        {slides.map((slide, idx) => (
          <div
            key={idx}
            style={{
              width: `${100 / slides.length}%`,
              flexShrink: 0,
            }}
          >
            <div className="container">
              <div className="hero-grid">
                <div className="hero-content">
                  <span className="section-label" style={{ display: 'inline-block', marginBottom: '12px' }}>
                    {slide.badge}
                  </span>
                  <h1 className="hero-title">
                    {slide.title}
                  </h1>
                  <p className="hero-description">
                    {slide.description}
                  </p>
                  <div className="hero-buttons">
                    <a href="https://calendly.com/todayintechdotin/30min" onClick={handleBooking} className="btn-primary">
                      {slide.ctaText}
                    </a>
                    <a
                      href="https://wa.me/917679349780"
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary"
                      style={{ border: '1px solid #25D366', color: '#25D366', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    >
                      <i className="fab fa-whatsapp"></i> Chat on WhatsApp
                    </a>
                  </div>
                  <div style={{ marginTop: '24px', fontSize: '0.85rem', opacity: 0.85, display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span><i className="fas fa-check-circle" style={{ color: 'var(--accent-green)', marginRight: '6px' }}></i>No obligation</span>
                    <span><i className="fas fa-check-circle" style={{ color: 'var(--accent-green)', marginRight: '6px' }}></i>NDA on request</span>
                    <span><i className="fas fa-check-circle" style={{ color: 'var(--accent-green)', marginRight: '6px' }}></i>Fixed-scope quote in 24 hours</span>
                  </div>
                </div>

                <div className="hero-tabs-column">
                  <div className="hero-tabs-container">
                    <div className="hero-tab-content">
                      <div className="hero-tab-pane active">
                        <img src={slide.img} alt={slide.alt} width="1024" height="1024" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
