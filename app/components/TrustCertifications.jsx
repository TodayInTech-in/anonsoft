'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function TrustCertifications() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      '.trust-card',
      { autoAlpha: 0, y: 30 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section className="trust-certifications" style={{ padding: '60px 0', background: 'var(--bg-light)' }} ref={sectionRef}>
      <div className="container">
        <div className="section-header" style={{ marginBottom: '32px' }}>
          <div className="section-label">Enterprise Grade</div>
          <h2 className="section-title">Built to Meet Rigorous Compliance Standards</h2>
          <p className="section-subtitle">Security, privacy, and reliability baked into every line of code.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          <div className="trust-card" style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ color: '#0284c7', fontSize: '1.8rem', marginBottom: '12px' }}><i className="fas fa-user-shield"></i></div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px' }}>HIPAA Compliant</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>End-to-end BAA agreements, AES-256 encrypted storage, and PHI audit trails for US healthtech startups.</p>
          </div>

          <div className="trust-card" style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ color: '#16a34a', fontSize: '1.8rem', marginBottom: '12px' }}><i className="fas fa-lock"></i></div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px' }}>SOC 2 Ready</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>Role-based access controls (RBAC), multi-factor authentication, and automated vulnerability scanning.</p>
          </div>

          <div className="trust-card" style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ color: '#9333ea', fontSize: '1.8rem', marginBottom: '12px' }}><i className="fas fa-network-wired"></i></div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px' }}>SMART on FHIR</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>Interoperable HL7 FHIR v4 API integrations with Epic, Cerner, Athenahealth, and Allscripts.</p>
          </div>

          <div className="trust-card" style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ color: '#ea580c', fontSize: '1.8rem', marginBottom: '12px' }}><i className="fas fa-server"></i></div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px' }}>99.99% Uptime Architecture</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>Multi-region cloud infrastructure on AWS & Vercel with automated failover and daily automated backups.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
