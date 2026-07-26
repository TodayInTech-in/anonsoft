'use client';

import { useState, useEffect } from 'react';
import { triggerCalendly } from '../lib/calendly';

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: 'SaaS', img: '/assets/project/biling-and-inventory.png', alt: 'SaaS Billing & Inventory Mockup' },
    { label: 'Mobile', img: '/assets/project-fitness.png', alt: 'Fitness Mobile App Mockup' },
    { label: 'AI', img: '/assets/project/marketing-tools.png', alt: 'Marketing Automation AI Mockup' },
    { label: 'Healthcare', img: '/assets/project-telemedicine.png', alt: 'Telemedicine HealthTech Mockup' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % tabs.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [tabs.length]);

  const handleBooking = (e) => {
    e.preventDefault();
    triggerCalendly('https://calendly.com/todayintechdotin/30min');
  };

  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <h1 className="hero-title">
              Custom Startup <span className="gradient-text-wrapper"><span className="gradient-text">Software Development</span></span> Agency
            </h1>
            <p className="hero-description">
              We help startups launch scalable SaaS, AI tools, and mobile apps quickly. Partner with a dedicated custom startup software development agency to build your production-ready product in weeks.
            </p>
            <div className="hero-buttons">
              <a href="https://calendly.com/todayintechdotin/30min" onClick={handleBooking} className="btn-primary" id="heroCta">
                Book My Free Call
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
            <div style={{ marginTop: '20px', fontSize: '0.85rem', opacity: 0.85, display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span><i className="fas fa-check-circle" style={{ color: 'var(--accent-green)', marginRight: '6px' }}></i>No obligation</span>
              <span><i className="fas fa-check-circle" style={{ color: 'var(--accent-green)', marginRight: '6px' }}></i>NDA on request</span>
              <span><i className="fas fa-check-circle" style={{ color: 'var(--accent-green)', marginRight: '6px' }}></i>Fixed-scope quote in 24 hours</span>
            </div>
          </div>

          <div className="hero-tabs-column">
            <div className="hero-tabs-container">
              <div className="hero-tabs-menu">
                {tabs.map((tab, idx) => (
                  <button
                    key={idx}
                    className={`hero-tab-link ${activeTab === idx ? 'active' : ''}`}
                    onClick={() => setActiveTab(idx)}
                  >
                    {tab.label}
                    <div
                      className="hero-tab-timer"
                      style={{
                        width: activeTab === idx ? '100%' : '0%',
                        transition: activeTab === idx ? 'width 5000ms linear' : 'none'
                      }}
                    ></div>
                  </button>
                ))}
              </div>
              <div className="hero-tab-content">
                {tabs.map((tab, idx) => (
                  <div key={idx} className={`hero-tab-pane ${activeTab === idx ? 'active' : ''}`}>
                    <img src={tab.img} alt={tab.alt} width="1024" height="1024" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
