'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ComparisonSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      '.comparison-card',
      { autoAlpha: 0, y: 35 },
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

  return (
    <section className="comparison-section" style={{ padding: '80px 0', background: 'var(--bg-light)' }} ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <div className="section-label">The Anonsoft Advantage</div>
          <h2 className="section-title">In-House Agency vs. Anonsoft Studio</h2>
          <p className="section-subtitle">Compare dev velocity, costs, and compliance guarantees before hiring your team.</p>
        </div>

        <div className="comparison-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '40px' }}>
          <div className="comparison-card" style={{ background: '#ffffff', padding: '32px', borderRadius: '16px', border: '1.5px solid #e2e8f0' }}>
            <h3 style={{ color: '#64748b', fontSize: '1.25rem', marginBottom: '20px' }}>Traditional In-House Hiring</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748b' }}><i className="fas fa-times" style={{ color: '#ef4444' }}></i> 3–6 months recruitment delay</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748b' }}><i className="fas fa-times" style={{ color: '#ef4444' }}></i> $180,000+ annual salary per dev</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748b' }}><i className="fas fa-times" style={{ color: '#ef4444' }}></i> High overhead & management stress</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748b' }}><i className="fas fa-times" style={{ color: '#ef4444' }}></i> Compliance built from scratch</li>
            </ul>
          </div>

          <div className="comparison-card" style={{ background: '#ffffff', padding: '32px', borderRadius: '16px', border: '2px solid var(--accent-blue)', boxShadow: '0 10px 30px rgba(3, 105, 161, 0.1)' }}>
            <div style={{ display: 'inline-block', padding: '4px 12px', background: '#e0f2fe', color: '#0369a1', borderRadius: '99px', fontSize: '0.8rem', fontWeight: '700', marginBottom: '12px' }}>RECOMMENDED</div>
            <h3 style={{ color: '#0f172a', fontSize: '1.25rem', marginBottom: '20px' }}>Anonsoft Dedicated Studio</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#334155' }}><i className="fas fa-check" style={{ color: '#16a34a' }}></i> Launch MVP in 4–6 weeks</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#334155' }}><i className="fas fa-check" style={{ color: '#16a34a' }}></i> Fixed-scope transparent quote</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#334155' }}><i className="fas fa-check" style={{ color: '#16a34a' }}></i> Senior full-stack tech leads</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#334155' }}><i className="fas fa-check" style={{ color: '#16a34a' }}></i> Pre-built HIPAA & SOC 2 modules</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
