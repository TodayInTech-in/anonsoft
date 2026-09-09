'use client';

import { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);

  const faqs = [
    {
      q: 'How fast can Anonsoft launch my SaaS or Telehealth MVP?',
      a: 'Most startup MVPs are delivered in 4–6 weeks. We use pre-built, HIPAA-compliant modules (telehealth video, payment gateways, EHR connectors) to accelerate delivery without sacrificing code quality.'
    },
    {
      q: 'Is my application code 100% owned by my company?',
      a: 'Yes. Upon final delivery, 100% of the IP, Git repositories, DB schemas, and cloud deployment rights are transferred directly to your organization with no recurring royalty fees.'
    },
    {
      q: 'Do you sign BAA agreements for HIPAA compliance?',
      a: 'Yes. We sign Business Associate Agreements (BAAs) and ensure all healthtech data pipelines utilize AES-256 encryption at rest and TLS 1.3 in transit.'
    },
    {
      q: 'What stack do you build with?',
      a: 'Our core tech stack includes React, Next.js, TypeScript, Node.js, Python, PostgreSQL, MongoDB, React Native, and AWS / GCP / Vercel cloud infrastructure.'
    },
    {
      q: 'How do we handle post-launch maintenance and support?',
      a: 'We provide 14 to 30 days of complimentary warranty support post-launch. Afterward, founders can opt for a monthly retainer or hire a dedicated developer pod.'
    }
  ];

  useGSAP(() => {
    gsap.fromTo(
      '.faq-item',
      { autoAlpha: 0, y: 25 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );
  }, { scope: sectionRef });

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="faq" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <div className="section-label">Frequently Asked Questions</div>
          <h2 className="section-title">Everything You Need to Know Before Building</h2>
          <p className="section-subtitle">Have questions about IP ownership, timelines, or HIPAA compliance? Here are direct answers.</p>
        </div>

        <div className="faq-list" style={{ maxWidth: '800px', margin: '0 auto' }}>
          {faqs.map((item, idx) => (
            <div
              key={idx}
              className={`faq-item ${openIndex === idx ? 'active' : ''}`}
              style={{
                background: '#ffffff',
                marginBottom: '16px',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                overflow: 'hidden'
              }}
            >
              <button
                className="faq-question"
                onClick={() => toggleFaq(idx)}
                style={{
                  width: '100%',
                  padding: '20px 24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '1.05rem',
                  color: 'var(--text-main)'
                }}
              >
                <span>{item.q}</span>
                <i className={`fas fa-chevron-${openIndex === idx ? 'up' : 'down'}`} style={{ color: 'var(--accent-blue)', marginLeft: '16px' }}></i>
              </button>
              {openIndex === idx && (
                <div className="faq-answer" style={{ padding: '0 24px 20px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  <p style={{ margin: 0 }}>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
