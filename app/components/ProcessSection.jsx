'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ProcessSection() {
  const sectionRef = useRef(null);
  const progressBarRef = useRef(null);

  const steps = [
    {
      number: '01',
      icon: 'fa-compass',
      iconBg: 'linear-gradient(135deg, #0284c7, #2563eb)',
      badge: '48-Hour Blueprint',
      title: 'Discovery & Architecture',
      description: 'We map out product requirements, user roles, database schemas, and HIPAA / security compliance architecture in 48 hours.',
      features: [
        'Tech Stack & DB Schema Blueprint',
        'HIPAA & Security Compliance Specs',
        'Fixed-Scope Timeline & Milestones'
      ]
    },
    {
      number: '02',
      icon: 'fa-layer-group',
      iconBg: 'linear-gradient(135deg, #7c3aed, #9333ea)',
      badge: 'Figma Prototype',
      title: 'UI/UX & Interactive Prototype',
      description: 'High-fidelity, click-through Figma wireframes aligned with your brand aesthetic before writing a single line of code.',
      features: [
        'Design System & Micro-Interactions',
        'Mobile-First Responsive Layouts',
        'Clickable Click-Through Prototype'
      ]
    },
    {
      number: '03',
      icon: 'fa-code-branch',
      iconBg: 'linear-gradient(135deg, #059669, #10b981)',
      badge: 'Bi-Weekly Demos',
      title: 'Agile Development Sprints',
      description: 'Bi-weekly demo builds with complete unit test coverage, CI/CD automated deployment pipelines, and active Slack channel sync.',
      features: [
        'Clean Modular Codebase',
        'Staging Environment & CI/CD',
        'Dedicated Slack Workspace'
      ]
    },
    {
      number: '04',
      icon: 'fa-rocket',
      iconBg: 'linear-gradient(135deg, #ea580c, #f97316)',
      badge: 'AWS & Vercel Launch',
      title: 'Production Launch & Handover',
      description: 'Production cloud deployment, DNS configuration, security audit verification, post-launch SLA support, and 100% IP handover.',
      features: [
        'Multi-Region Cloud Deployment',
        'Security Audit Verification',
        '100% IP & Repo Ownership'
      ]
    }
  ];

  useGSAP(() => {
    // Animate Header
    gsap.fromTo(
      '.process-header',
      { autoAlpha: 0, y: 30 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );

    // Animate Progress Bar on Scroll
    gsap.fromTo(
      progressBarRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 80%',
          scrub: 0.5,
        },
      }
    );

    // Stagger Animate Cards
    gsap.fromTo(
      '.process-card-item',
      { autoAlpha: 0, y: 40, scale: 0.95 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: '.process-cards-grid',
          start: 'top 80%',
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="process" className="process" ref={sectionRef} style={{ padding: '90px 0', background: 'var(--bg-light, #f8fafc)', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div className="process-header" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px' }}>
          <div className="section-label" style={{ display: 'inline-block', padding: '6px 16px', background: '#e0f2fe', color: '#0369a1', borderRadius: '99px', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', tracking: '0.05em', marginBottom: '12px' }}>
            Proven Execution Framework
          </div>
          <h2 className="section-title" style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', lineHeight: 1.2, marginBottom: '16px' }}>
            Our 4-Step Engineering Sprint
          </h2>
          <p className="section-subtitle" style={{ fontSize: '1.1rem', color: '#64748b', margin: 0 }}>
            From initial technical discovery to production deployment on AWS & Vercel — built for maximum speed and zero friction.
          </p>
        </div>

        {/* Scroll Progress Bar Line */}
        <div style={{ maxWidth: '900px', margin: '0 auto 40px', height: '4px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
          <div
            ref={progressBarRef}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #0284c7, #7c3aed, #059669, #ea580c)',
              transformOrigin: 'left center',
              borderRadius: '4px'
            }}
          ></div>
        </div>

        {/* 4-Step Grid Cards */}
        <div className="process-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="process-card-item"
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                padding: '32px 28px',
                border: '1.5px solid #e2e8f0',
                boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(3, 105, 161, 0.12)';
                e.currentTarget.style.borderColor = '#0284c7';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.04)';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
            >
              <div>
                {/* Header Row: Step Badge & Icon */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: step.iconBg, color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', boxShadow: '0 8px 20px rgba(0,0,0,0.12)' }}>
                    <i className={`fas ${step.icon}`}></i>
                  </div>
                  <span style={{ fontSize: '2rem', fontWeight: '900', color: '#cbd5e1', letterSpacing: '-0.03em' }}>
                    {step.number}
                  </span>
                </div>

                {/* Badge Tag */}
                <span style={{ display: 'inline-block', fontSize: '0.75rem', fontWeight: '700', color: '#0369a1', background: '#f0f9ff', border: '1px solid #bae6fd', padding: '4px 10px', borderRadius: '99px', marginBottom: '12px' }}>
                  {step.badge}
                </span>

                {/* Title & Description */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '10px' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.6, marginBottom: '20px' }}>
                  {step.description}
                </p>
              </div>

              {/* Feature Checklist */}
              <div style={{ paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {step.features.map((feat, fIdx) => (
                    <li key={fIdx} style={{ fontSize: '0.84rem', color: '#334155', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <i className="fas fa-check-circle" style={{ color: '#16a34a', fontSize: '0.85rem' }}></i>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
