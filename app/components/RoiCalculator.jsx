'use client';

import { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function RoiCalculator() {
  const [teamSize, setTeamSize] = useState(4);
  const [months, setMonths] = useState(6);
  const [rate, setRate] = useState(65);
  const cardRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      cardRef.current,
      { autoAlpha: 0, y: 40, scale: 0.97 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
        },
      }
    );
  }, { scope: cardRef });

  const customCost = teamSize * rate * 160 * months;
  const todayInTechCost = Math.round(customCost * 0.45);
  const savings = customCost - todayInTechCost;

  return (
    <section className="roi-section" style={{ padding: '80px 0', background: '#ffffff' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-label">Cost Efficiency Calculator</div>
          <h2 className="section-title">Calculate Your Dev Savings with Anonsoft</h2>
          <p className="section-subtitle">See how much capital you save compared to building an internal US/EU dev team.</p>
        </div>

        <div
          ref={cardRef}
          className="roi-card"
          style={{
            maxWidth: '850px',
            margin: '40px auto 0',
            background: 'var(--bg-light)',
            padding: '36px',
            borderRadius: '20px',
            border: '1.5px solid #e2e8f0',
            boxShadow: '0 10px 30px rgba(0,0,0,0.04)'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '28px', marginBottom: '32px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#1e293b' }}>
                Engineers Required: <strong style={{ color: '#0369a1' }}>{teamSize}</strong>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#0369a1' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#1e293b' }}>
                Project Duration: <strong style={{ color: '#0369a1' }}>{months} Months</strong>
              </label>
              <input
                type="range"
                min="1"
                max="12"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#0369a1' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#1e293b' }}>
                Hourly Dev Rate: <strong style={{ color: '#0369a1' }}>${rate}/hr</strong>
              </label>
              <input
                type="range"
                min="40"
                max="120"
                step="5"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#0369a1' }}
              />
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              padding: '24px',
              background: '#ffffff',
              borderRadius: '14px',
              border: '1px solid #e2e8f0',
              textAlign: 'center'
            }}
          >
            <div>
              <span style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>In-House Dev Cost</span>
              <h3 style={{ fontSize: '1.6rem', color: '#64748b', marginTop: '6px', wordBreak: 'break-word' }}>${customCost.toLocaleString()}</h3>
            </div>

            <div>
              <span style={{ fontSize: '0.85rem', color: '#0369a1', textTransform: 'uppercase', fontWeight: '700' }}>Anonsoft Fixed Cost</span>
              <h3 style={{ fontSize: '1.6rem', color: '#0369a1', marginTop: '6px', wordBreak: 'break-word' }}>${todayInTechCost.toLocaleString()}</h3>
            </div>

            <div>
              <span style={{ fontSize: '0.85rem', color: '#15803d', textTransform: 'uppercase', fontWeight: '700' }}>Estimated Capital Saved</span>
              <h3 style={{ fontSize: '1.6rem', color: '#15803d', marginTop: '6px', wordBreak: 'break-word' }}>${savings.toLocaleString()}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
