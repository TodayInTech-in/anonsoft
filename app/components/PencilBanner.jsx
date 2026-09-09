'use client';

import { useState } from 'react';
import { triggerCalendly } from '../lib/calendly';

export default function PencilBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const handleBooking = (e) => {
    e.preventDefault();
    triggerCalendly('https://calendly.com/anonsoftdotin/30min');
  };

  return (
    <div className="pencil-banner" id="pencilBanner">
      <div className="pencil-banner-content">
        <span>
          <i className="fas fa-lightbulb" style={{ marginRight: '6px', color: 'var(--accent)' }}></i>
          <strong>Free Strategy Session</strong>: Get a custom fixed-scope SaaS MVP roadmap in 24 hours.
        </span>
        <a href="https://calendly.com/anonsoftdotin/30min" onClick={handleBooking} className="pencil-banner-link">
          Book Now &rarr;
        </a>
      </div>
      <button className="pencil-banner-close" onClick={() => setDismissed(true)} aria-label="Dismiss banner">✕</button>
    </div>
  );
}
