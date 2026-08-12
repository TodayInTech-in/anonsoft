// Central Google Analytics configuration
const GA_MEASUREMENT_ID = 'G-F4401E2SV3'; // Your GA4 Measurement ID

// Load Google Tag Manager dynamically
const script = document.createElement('script');
script.async = true;
script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
document.head.appendChild(script);

window.dataLayer = window.dataLayer || [];
window.gtag = function() {
    window.dataLayer.push(arguments);
};
window.gtag('js', new Date());

// Configures tracking and enables automatic pageview tracking
window.gtag('config', GA_MEASUREMENT_ID, {
    'send_page_view': true
});

// ===== GLOBAL CLICK TRACKING =====
document.addEventListener('click', (event) => {
    // Find closest anchor or button element
    const target = event.target.closest('a, button');
    if (!target) return;

    const elementType = target.tagName.toLowerCase();
    const elementText = target.textContent.trim() || target.getAttribute('aria-label') || target.value || '';
    const elementId = target.id || '';
    const elementClass = target.className || '';
    const destinationUrl = elementType === 'a' ? target.getAttribute('href') : '';

    if (typeof window.gtag === 'function') {
        window.gtag('event', 'click_element', {
            'element_type': elementType,
            'element_text': elementText.substring(0, 100), // Truncate text if too long
            'element_id': elementId,
            'element_class': elementClass,
            'destination_url': destinationUrl
        });
    }
}, true); // Use capture phase to ensure clicks are caught before redirection

// ===== SECTION VIEW TRACKING =====
document.addEventListener('DOMContentLoaded', () => {
    if ('IntersectionObserver' in window) {
        const sections = document.querySelectorAll('section[id]');
        const viewedSections = new Set();

        const observerOptions = {
            threshold: 0.25, // Trigger when 25% of the section is visible
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    // Only track each section once per page session to avoid scroll spam
                    if (!viewedSections.has(sectionId)) {
                        viewedSections.add(sectionId);
                        if (typeof window.gtag === 'function') {
                            window.gtag('event', 'view_section', {
                                'section_id': sectionId,
                                'page_path': window.location.pathname
                            });
                        }
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }
});
