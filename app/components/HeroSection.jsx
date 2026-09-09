'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { triggerCalendly } from '../lib/calendly';

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState(0);

  const heroContentRef = useRef(null);
  const heroImageRef = useRef(null);
  const timerRef = useRef(null);

  const slides = [
    {
      label: 'SaaS ERP',
      icon: 'fas fa-cloud',
      badge: 'Custom SaaS & Cloud Architecture',
      title: 'Architecting Scalable SaaS & Multi-Tenant Platforms',
      description: 'We help startups launch enterprise SaaS, billing systems, multi-tenant portals, and cloud ERPs in 4–8 weeks with zero upfront cost.',
      ctaText: 'Book Free Strategy Call',
      img: '/assets/project/biling-and-inventory.png',
      alt: 'SaaS Billing & Inventory Platform'
    },
    {
      label: 'Mobile Apps',
      icon: 'fas fa-mobile-alt',
      badge: 'iOS, Android & Cross-Platform',
      title: 'High-Performance Native & Hybrid Mobile Apps',
      description: 'Launch engaging iOS and Android apps for digital health, on-demand marketplaces, and consumer startups with rock-solid offline sync.',
      ctaText: 'Discuss Mobile App MVP',
      img: '/assets/project-fitness.png',
      alt: 'Fitness & Health Mobile App'
    },
    {
      label: 'AI & Agents',
      icon: 'fas fa-robot',
      badge: 'Agentic Workflows & Custom LLMs',
      title: 'Autonomous AI Agents & Intelligent Automation',
      description: 'Integrate ambient medical scribing, voice cloning, autonomous support agents, and custom RAG pipelines directly into your software.',
      ctaText: 'Explore AI Engineering',
      img: '/assets/project/marketing-tools.png',
      alt: 'Marketing & AI Automation Suite'
    },
    {
      label: 'HealthTech',
      icon: 'fas fa-heartbeat',
      badge: 'HIPAA & FHIR Telemedicine',
      title: 'HIPAA-Compliant Telehealth & Virtual Care Suites',
      description: 'White-label virtual care suites, EHR/FHIR integrations, caregiver EVV systems, and remote patient monitoring dashboards for healthcare leaders.',
      ctaText: 'Book HealthTech Demo',
      img: '/assets/project-telemedicine.png',
      alt: 'Telemedicine & Virtual Care Platform'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate text elements
      if (heroContentRef.current) {
        gsap.fromTo(
          heroContentRef.current.children,
          { autoAlpha: 0, y: 15 },
          { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.07, ease: 'power2.out' }
        );
      }

      // Animate image with subtle pop
      if (heroImageRef.current) {
        gsap.fromTo(
          heroImageRef.current,
          { autoAlpha: 0, scale: 0.97 },
          { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(1.3)' }
        );
      }

      // Animate timer progress bar
      if (timerRef.current) {
        gsap.killTweensOf(timerRef.current);
        gsap.fromTo(
          timerRef.current,
          { width: '0%' },
          { width: '100%', duration: 5, ease: 'none' }
        );
      }
    });

    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, [activeTab, slides.length]);

  const handleTabClick = (idx) => {
    setActiveTab(idx);
  };

  const handleBooking = (e) => {
    e.preventDefault();
    triggerCalendly('https://calendly.com/todayintechdotin/30min');
  };

  const currentSlide = slides[activeTab];

  return (
    <section className="hero" id="hero" style={{ position: 'relative', overflow: 'hidden', paddingTop: '100px', paddingBottom: '60px' }}>
      <div className="container">
        {/* Top Social Proof Pill */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 18px',
            background: 'rgba(15, 62, 128, 0.06)',
            border: '1px solid rgba(15, 62, 128, 0.15)',
            borderRadius: '9999px',
            fontSize: '0.85rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#f59e0b' }}>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </span>
            <span style={{ color: 'var(--text-secondary)' }}>|</span>
            <span>Trusted by <strong>50+ Startups & Healthcare Leaders</strong> Globally</span>
            <span style={{ width: '8px', height: '8px', background: 'var(--accent-green)', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 8px var(--accent-green)' }}></span>
          </div>
        </div>

        <div className="hero-grid" style={{ alignItems: 'center', gap: '48px' }}>
          {/* Left Text Column */}
          <div className="hero-content" ref={heroContentRef}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span className="section-label" style={{ marginBottom: 0 }}>
                {currentSlide.badge}
              </span>
            </div>

            <h1 className="hero-title" style={{ minHeight: '115px', fontSize: 'clamp(2.2rem, 4.2vw, 3.6rem)', lineHeight: 1.18 }}>
              {currentSlide.title}
            </h1>

            <p className="hero-description" style={{ minHeight: '75px', fontSize: '1.08rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
              {currentSlide.description}
            </p>

            <div className="hero-buttons" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center', marginTop: '10px' }}>
              <a href="https://calendly.com/todayintechdotin/30min" onClick={handleBooking} className="btn-primary" id="heroCta" style={{ padding: '15px 28px', fontSize: '0.95rem' }}>
                <i className="fas fa-calendar-check" style={{ marginRight: '6px' }}></i> {currentSlide.ctaText}
              </a>
              <a
                href="https://wa.me/917679349780"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                style={{
                  border: '1px solid #25D366',
                  color: '#25D366',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '15px 24px',
                  fontSize: '0.95rem'
                }}
              >
                <i className="fab fa-whatsapp" style={{ fontSize: '1.2rem' }}></i>
                <span>Chat on WhatsApp</span>
                <span style={{ fontSize: '0.75rem', opacity: 0.85, background: 'rgba(37, 211, 102, 0.12)', padding: '2px 8px', borderRadius: '10px' }}>&lt;15m</span>
              </a>
            </div>

            {/* Credibility Checklist */}
            <div style={{ marginTop: '24px', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fas fa-check-circle" style={{ color: 'var(--accent-green)' }}></i>
                <strong>Zero Upfront Payment</strong>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fas fa-check-circle" style={{ color: 'var(--accent-green)' }}></i>
                <strong>100% IP & Repo Transfer</strong>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fas fa-check-circle" style={{ color: 'var(--accent-green)' }}></i>
                <strong>Mutual NDA on Request</strong>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fas fa-check-circle" style={{ color: 'var(--accent-green)' }}></i>
                <strong>Fixed Quote in 24 Hours</strong>
              </span>
            </div>
          </div>

          {/* Right Mockup & Interactive Tabs Column */}
          <div className="hero-tabs-column">
            <div className="hero-tabs-container" style={{
              background: 'var(--gradient-card)',
              border: '1px solid var(--border-glass)',
              borderRadius: '20px',
              padding: '16px',
              boxShadow: 'var(--shadow-large)',
              position: 'relative'
            }}>
              {/* macOS Window Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '4px 8px 14px 8px',
                borderBottom: '1px solid var(--border-glass)',
                marginBottom: '14px'
              }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }}></span>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }}></span>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }}></span>
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  background: 'var(--bg-glass)',
                  padding: '2px 14px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-glass)'
                }}>
                  todayintech.in/solutions
                </div>
                <div style={{ width: '42px' }}></div>
              </div>

              {/* Tabs Menu */}
              <div className="hero-tabs-menu" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginBottom: '14px' }}>
                {slides.map((slide, idx) => (
                  <button
                    key={idx}
                    className={`hero-tab-link ${activeTab === idx ? 'active' : ''}`}
                    onClick={() => handleTabClick(idx)}
                    style={{
                      padding: '10px 6px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      borderRadius: '10px',
                      position: 'relative'
                    }}
                  >
                    <i className={slide.icon} style={{ fontSize: '0.85rem' }}></i>
                    <span>{slide.label}</span>
                    {activeTab === idx && (
                      <div
                        className="hero-tab-timer"
                        ref={timerRef}
                      ></div>
                    )}
                  </button>
                ))}
              </div>

              {/* Showcase Image with Floating Badges */}
              <div className="hero-tab-content" style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden' }}>
                {/* Floating Badge: Top Right */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  zIndex: 10,
                  background: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  padding: '6px 12px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  color: '#065f46',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
                }}>
                  <i className="fas fa-shield-alt" style={{ color: 'var(--accent-green)' }}></i>
                  <span>HIPAA & SOC 2 Ready</span>
                </div>

                {/* Floating Badge: Bottom Left */}
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  zIndex: 10,
                  background: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(15, 62, 128, 0.2)',
                  padding: '6px 12px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  color: '#0f3e80',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
                }}>
                  <i className="fas fa-bolt" style={{ color: '#f59e0b' }}></i>
                  <span>4–8 Week Production Delivery</span>
                </div>

                <div className="hero-tab-pane active" ref={heroImageRef}>
                  <img src={currentSlide.img} alt={currentSlide.alt} width="1024" height="1024" style={{ borderRadius: '10px', display: 'block', width: '100%', height: 'auto' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integrated Bottom Proof Strip */}
        <div style={{
          marginTop: '50px',
          padding: '20px 30px',
          background: 'var(--gradient-card)',
          border: '1px solid var(--border-glass)',
          borderRadius: '16px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
          textAlign: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
        }}>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>50+</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px' }}>Products Launched</div>
          </div>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>100%</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px' }}>Source Code Ownership</div>
          </div>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>$40k+</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px' }}>Avg. Dev Cost Saved</div>
          </div>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>4.9 / 5.0</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px' }}>Client Satisfaction Score</div>
          </div>
        </div>
      </div>
    </section>
  );
}
