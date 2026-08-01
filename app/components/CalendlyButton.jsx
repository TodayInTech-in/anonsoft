'use client';

import { triggerCalendly } from '../lib/calendly';

export default function CalendlyButton({
  url = 'https://calendly.com/todayintechdotin/30min',
  className = 'btn-primary',
  style = {},
  children = 'Tell Us About Your MVP',
}) {
  return (
    <button
      type="button"
      onClick={() => triggerCalendly(url)}
      className={className}
      style={{ cursor: 'pointer', border: 'none', font: 'inherit', ...style }}
    >
      {children}
    </button>
  );
}
