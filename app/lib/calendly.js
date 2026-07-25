export function triggerCalendly(url = 'https://calendly.com/todayintechdotin/30min') {
  if (typeof window === 'undefined') return;

  const openPopup = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url });
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  if (!document.getElementById('calendly-css')) {
    const link = document.createElement('link');
    link.id = 'calendly-css';
    link.rel = 'stylesheet';
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    document.head.appendChild(link);
  }

  if (!window.Calendly && !document.getElementById('calendly-js')) {
    const script = document.createElement('script');
    script.id = 'calendly-js';
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => openPopup();
    script.onerror = () => window.open(url, '_blank', 'noopener,noreferrer');
    document.head.appendChild(script);
  } else {
    openPopup();
  }
}
