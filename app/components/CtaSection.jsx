'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { triggerCalendly } from '../lib/calendly';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CtaSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      '.cta-box',
      { autoAlpha: 0, scale: 0.95, y: 30 },
      {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 0.65,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
      }
    );
  }, { scope: sectionRef });

  const handleBooking = (e) => {
    e.preventDefault();
    triggerCalendly('https://calendly.com/anonsoftdotin/30min');
  };

  return (
    <section className="cta" ref={sectionRef}>
      <div className="container">
        <div className="cta-box">
          <h2 className="cta-title">Ready to Turn Your SaaS or HealthTech Vision Into Production Code?</h2>
          <p className="cta-description">
            Schedule a free 30-minute discovery call with our technical architect. We'll audit your product concept, suggest technical architecture, and provide a fixed-scope quote in 24 hours.
          </p>
          <div className="cta-buttons">
            <a href="https://calendly.com/anonsoftdotin/30min" onClick={handleBooking} className="btn-primary" id="finalCta">
              Book Free Strategy Call
            </a>
            <a
              href="https://wa.me/919007900972"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
              style={{ border: '1px solid #ffffff', color: '#ffffff', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <i className="fab fa-whatsapp"></i> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
