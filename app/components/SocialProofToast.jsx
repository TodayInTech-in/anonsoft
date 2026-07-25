'use client';

import { useState, useEffect } from 'react';

const ALERTS = [
  { name: 'Clinic Director in Texas', action: 'booked a Telemedicine Strategy Call', time: '12 minutes ago' },
  { name: 'HealthTech Founder in California', action: 'requested a Zero-Upfront MVP Prototype', time: '28 minutes ago' },
  { name: 'Home Care Agency in Florida', action: 'downloaded Senior Care ERP Roadmap', time: '1 hour ago' },
  { name: 'Wellness Brand in New York', action: 'scheduled a 30-min Strategy Session', time: '2 hours ago' },
];

export default function SocialProofToast() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % ALERTS.length);
        setVisible(true);
      }, 500);
    }, 9000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (!visible) return null;

  const current = ALERTS[index];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        background: '#ffffff',
        border: '1.5px solid #e2e8f0',
        borderRadius: '12px',
        padding: '12px 18px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        maxWidth: '340px',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#16a34a' }}></div>
      <div style={{ fontSize: '0.82rem', color: '#334155' }}>
        <strong>{current.name}</strong> {current.action} <span style={{ color: '#64748b', fontSize: '0.75rem', display: 'block' }}>{current.time}</span>
      </div>
    </div>
  );
}
