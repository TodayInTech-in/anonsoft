'use client';

import { useState } from 'react';

export default function RoiCalculator() {
  const [teamSize, setTeamSize] = useState(4);
  const [months, setMonths] = useState(6);
  const [rate, setRate] = useState(65);

  const customCost = teamSize * months * 160 * rate;
  const todayInTechCost = Math.round(customCost * 0.3);
  const savings = customCost - todayInTechCost;

  return (
    <section className="roi-calculator-section" style={{ padding: '80px 0', background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="section-label">Interactive Estimate</div>
          <h2 className="section-title">See How Much You Save with TodayInTech</h2>
          <p className="section-subtitle">Compare custom software dev agency costs against our zero-upfront hybrid architecture.</p>
        </div>

        <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '36px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#1e293b' }}>
                Engineering Team Size: <strong>{teamSize} Developers</strong>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#1e293b' }}>
                Estimated Timeline: <strong>{months} Months</strong>
              </label>
              <input
                type="range"
                min="2"
                max="12"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', background: '#f8fafc', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
            <div>
              <span style={{ fontSize: '0.85rem', color: '#64748b', display: 'block' }}>Traditional Custom Dev</span>
              <strong style={{ fontSize: '1.4rem', color: '#dc2626' }}>${customCost.toLocaleString()}</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.85rem', color: '#64748b', display: 'block' }}>TodayInTech Fixed Hybrid</span>
              <strong style={{ fontSize: '1.4rem', color: '#0369a1' }}>${todayInTechCost.toLocaleString()}</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.85rem', color: '#64748b', display: 'block' }}>Your Estimated Savings</span>
              <strong style={{ fontSize: '1.4rem', color: '#15803d' }}>${savings.toLocaleString()} (70%)</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
