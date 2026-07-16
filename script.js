// ===== TODAYINTECH WEBSITE JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initCounters();
    initSmoothScroll();
    initFloatingCta();
    initRoiCalculator();
    initPricingToggle();
    initGoogleReviewsCarousel();
    initPencilBanner();
    initHeroTabs();
    initStickyAnchorBar();
    initGoogleAnalyticsTracking();
});

// ===== NAVBAR SCROLL EFFECT =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ===== SCROLL REVEAL ANIMATIONS =====
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation
                const delay = Array.from(entry.target.parentElement.children)
                    .filter(child => child.classList.contains('reveal'))
                    .indexOf(entry.target) * 100;

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    reveals.forEach(el => observer.observe(el));
}

// ===== COUNTER ANIMATION =====
function initCounters() {
    const counters = document.querySelectorAll('.counter');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px 0px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const suffix = element.getAttribute('data-suffix') || '+';
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out cubic)
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.round(target * eased);

        element.textContent = currentValue + (progress < 1 ? '' : suffix);

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== PARALLAX GLOW EFFECT =====
function initParallaxGlow() {
    const glows = document.querySelectorAll('.bg-glow');

    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        glows.forEach((glow, index) => {
            const speed = (index + 1) * 15;
            const offsetX = (x - 0.5) * speed;
            const offsetY = (y - 0.5) * speed;
            glow.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    });
}

// ===== BOOKING MODAL =====
function openBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Reset form state
    document.getElementById('formContent').classList.remove('hide');
    document.getElementById('formSuccess').classList.remove('show');
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on overlay click
document.getElementById('bookingModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        closeBookingModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeBookingModal();
    }
});

// ===== FORM SUBMIT =====
function handleFormSubmit(e) {
    e.preventDefault();

    // Get form data
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        company: document.getElementById('company').value,
        projectType: document.getElementById('projectType').value,
        message: document.getElementById('message').value
    };

    // Log form data (in production, send to backend)
    console.log('Booking Request:', formData);

    // Show success message
    document.getElementById('formContent').classList.add('hide');
    document.getElementById('formSuccess').classList.add('show');

    // Reset form
    document.getElementById('bookingForm').reset();

    // Auto close after 4 seconds
    setTimeout(() => {
        closeBookingModal();
        // Reset for next use
        setTimeout(() => {
            document.getElementById('formContent').classList.remove('hide');
            document.getElementById('formSuccess').classList.remove('show');
        }, 300);
    }, 4000);
}

// ===== TYPED EFFECT FOR HERO =====
function initTypedEffect() {
    const words = ['SaaS Platforms', 'AI Tools', 'Mobile Apps', 'Web Dashboards'];
    const element = document.querySelector('.typewriter-text');
    if (!element) return;

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            element.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            element.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    // Start after initial animation
    setTimeout(type, 3000);
}

// Initialize typed effect after page load
window.addEventListener('load', () => {
    initTypedEffect();
});

// ===== SERVICE CARD TILT EFFECT =====
document.querySelectorAll('.service-card, .portfolio-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / centerY * -3;
        const rotateY = (x - centerX) / centerX * 3;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===== ACTIVE NAV LINK HIGHLIGHTING =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

    window.addEventListener('scroll', () => {
        let current = '';
        const navHeight = document.getElementById('navbar').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.color = 'var(--primary)';
            }
        });
    });
}

updateActiveNavLink();

// ===== FLOATING CTA BUTTON =====
function initFloatingCta() {
    const floatingCta = document.getElementById('floatingCta');
    if (!floatingCta) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 400) {
            floatingCta.classList.add('visible');
        } else {
            floatingCta.classList.remove('visible');
        }
    });
}

// ===== SOCIAL PROOF TOAST =====
function initSocialProofToast() {
    const toast = document.getElementById('socialProofToast');
    if (!toast) return;

    const proofs = [
        { name: 'Dr. Sarah M.', detail: 'from New York just booked a free strategy session', delay: 6000 },
        { name: 'James R.', detail: 'from an EdTech startup is viewing Pricing', delay: 18000 },
        { name: 'Priya K.', detail: 'from Houston just booked a free strategy session', delay: 32000 },
        { name: 'Mark T.', detail: 'from a Logistics company just requested a demo', delay: 50000 },
        { name: 'Lisa N.', detail: 'from Boston just booked a free strategy session', delay: 70000 },
    ];

    proofs.forEach(({ name, detail, delay }) => {
        setTimeout(() => {
            document.getElementById('toastName').textContent = name;
            document.getElementById('toastDetail').textContent = detail;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 5000);
        }, delay);
    });
}

let isYearlyBilling = false;

// ===== ROI CALCULATOR =====
function initRoiCalculator() {
    const teamSlider = document.getElementById('roi-team-size');
    const monthsSlider = document.getElementById('roi-months');
    const rateSlider = document.getElementById('roi-rate');
    if (!teamSlider) return;

    window.updateROI = function() {
        const team = parseInt(teamSlider.value);
        const months = parseInt(monthsSlider.value);
        const rate = parseInt(rateSlider.value);

        document.getElementById('roi-team-display').textContent = team + ' engineers';
        document.getElementById('roi-months-display').textContent = months + ' months';
        document.getElementById('roi-rate-display').textContent = '$' + rate + '/hr';

        // Calculation: team * rate * 160hrs/month * months
        const customCost = team * rate * 160 * months;
        
        // TodayInTech starting from $99/mo (Monthly) or $99/year (Yearly)
        let ourCost = 0;
        if (isYearlyBilling) {
            ourCost = 99; // $99/year flat
        } else {
            ourCost = 99 * months; // $99/mo subscription
        }
        
        const savings = customCost - ourCost;

        const formatMoney = (n) => '$' + n.toLocaleString('en-US');

        document.getElementById('roi-scratch-cost').textContent = formatMoney(customCost);
        document.getElementById('roi-scratch-time').textContent = months + ' months to launch';
        document.getElementById('roi-savings').textContent = formatMoney(savings);

        // Dynamic TodayInTech Cost card update
        const ourCostEl = document.getElementById('roi-our-cost');
        if (ourCostEl) {
            if (isYearlyBilling) {
                ourCostEl.innerHTML = `From <strong>$99</strong><span style="font-size: 0.82rem; color: var(--text-muted); font-weight: 500;">/year</span>`;
            } else {
                ourCostEl.innerHTML = `From <strong>$${ourCost.toLocaleString('en-US')}</strong><span style="font-size: 0.82rem; color: var(--text-muted); font-weight: 500;"> ($99/mo)</span>`;
            }
        }
    }

    teamSlider.addEventListener('input', window.updateROI);
    monthsSlider.addEventListener('input', window.updateROI);
    rateSlider.addEventListener('input', window.updateROI);
    window.updateROI();
}

// ===== PRICING BILLING SWITCHER =====
function initPricingToggle() {
    const toggleBtn = document.getElementById('pricingToggleBtn');
    const starterPrice = document.getElementById('starter-price');
    const growthPrice = document.getElementById('growth-price');
    const labelMonthly = document.getElementById('label-monthly');
    const labelYearly = document.getElementById('label-yearly');

    if (!toggleBtn || !starterPrice || !growthPrice) return;

    toggleBtn.addEventListener('click', () => {
        isYearlyBilling = toggleBtn.classList.toggle('active');
        toggleBtn.setAttribute('aria-checked', isYearlyBilling ? 'true' : 'false');

        if (isYearlyBilling) {
            labelMonthly.classList.remove('active');
            labelYearly.classList.add('active');
            starterPrice.innerHTML = 'From <strong>$99</strong><span class="price-period">/year</span>';
            growthPrice.innerHTML = 'From <strong>$149</strong><span class="price-period">/mo</span> <span style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-top: 4px; font-weight: normal; text-transform: none; letter-spacing: 0;">billed annually ($1,788/yr)</span>';
        } else {
            labelMonthly.classList.add('active');
            labelYearly.classList.remove('active');
            starterPrice.innerHTML = 'From <strong>$99</strong><span class="price-period">/mo</span>';
            growthPrice.innerHTML = 'From <strong>$199</strong><span class="price-period">/mo</span>';
        }

        // Keep ROI Calculator in sync
        if (typeof window.updateROI === 'function') {
            window.updateROI();
        }
    });
}

// Theme Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
        let lightMode = localStorage.getItem('lightMode'); 
        
        const enableLightMode = () => {
            document.documentElement.classList.add('light-mode');
            localStorage.setItem('lightMode', 'enabled');
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        };

        const disableLightMode = () => {
            document.documentElement.classList.remove('light-mode');
            localStorage.setItem('lightMode', 'disabled');
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        };

        // Initialize button iconography based on early head script
        if (document.documentElement.classList.contains('light-mode')) {
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }

        themeToggleBtn.addEventListener('click', () => {
            if (document.documentElement.classList.contains('light-mode')) {
                disableLightMode();
            } else {
                enableLightMode();
            }
        });
    }
});

// ===== GOOGLE REVIEWS CAROUSEL =====
function initGoogleReviewsCarousel() {
    const carousel = document.getElementById('grCarousel');
    if (!carousel) return;

    const leftBtn = document.querySelector('.gr-arrow-left');
    const rightBtn = document.querySelector('.gr-arrow-right');
    const scrollAmount = 370;

    if (leftBtn) leftBtn.addEventListener('click', () => carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' }));
    if (rightBtn) rightBtn.addEventListener('click', () => carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' }));

    // Auto-scroll
    let autoScroll = setInterval(() => {
        if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10) {
            carousel.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }, 4000);

    carousel.addEventListener('mouseenter', () => clearInterval(autoScroll));
    carousel.addEventListener('mouseleave', () => {
        autoScroll = setInterval(() => {
            if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10) {
                carousel.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }, 4000);
    });

    // Add tilt effect to review cards
    document.querySelectorAll('.gr-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(800px) rotateX(${y * -4}deg) rotateY(${x * 4}deg) translateY(-4px)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
}

// ===== PENCIL NOTICE BANNER =====
function initPencilBanner() {
    const banner = document.getElementById('pencilBanner');
    const closeBtn = document.getElementById('closeBanner');
    if (!banner || !closeBtn) return;

    // Add class to body to offset navbar
    document.body.classList.add('has-pencil-banner');

    function updateBannerHeight() {
        if (banner.style.display !== 'none') {
            const height = banner.offsetHeight;
            document.documentElement.style.setProperty('--pencil-banner-height', height + 'px');
        } else {
            document.documentElement.style.setProperty('--pencil-banner-height', '0px');
        }
    }

    // Update height on load and resize
    updateBannerHeight();
    window.addEventListener('resize', updateBannerHeight);
    window.addEventListener('load', updateBannerHeight);

    closeBtn.addEventListener('click', () => {
        banner.style.display = 'none';
        document.body.classList.remove('has-pencil-banner');
        document.documentElement.style.setProperty('--pencil-banner-height', '0px');
    });
}

// ===== HERO AUTO-CYCLING TABS =====
function initHeroTabs() {
    const tabLinks = document.querySelectorAll('.hero-tab-link');
    const tabPanes = document.querySelectorAll('.hero-tab-pane');
    if (tabLinks.length === 0) return;

    let tabDuration = 5000;
    let tabTimeout;
    let activeIndex = 0;

    function cycle() {
        // Reset all timer widths without reflow
        document.querySelectorAll('.hero-tab-timer').forEach(timer => {
            timer.style.width = '0%';
            timer.style.transition = 'none';
        });

        // Set active classes first
        tabLinks.forEach(link => link.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        tabLinks[activeIndex].classList.add('active');
        tabPanes[activeIndex].classList.add('active');

        // Restart timer animation using double-rAF (no forced reflow)
        const timerEl = tabLinks[activeIndex].querySelector('.hero-tab-timer');
        if (timerEl) {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    timerEl.style.transition = `width ${tabDuration}ms linear`;
                    timerEl.style.width = '100%';
                });
            });
        }

        tabTimeout = setTimeout(() => {
            activeIndex = (activeIndex + 1) % tabLinks.length;
            cycle();
        }, tabDuration);
    }

    tabLinks.forEach((link, idx) => {
        link.addEventListener('click', () => {
            clearTimeout(tabTimeout);
            activeIndex = idx;
            cycle();
        });
    });

    cycle();
}

// ===== STICKY SUBNAV BAR ACTIVE HIGHLIGHT =====
function initStickyAnchorBar() {
    const anchorBar = document.getElementById('stickyAnchorBar');
    if (!anchorBar) return;

    const links = anchorBar.querySelectorAll('.anchors_link');
    const sections = Array.from(links).map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
    const navbar = document.getElementById('navbar');

    // Cache heights — measure once, update on resize via ResizeObserver to avoid scroll-time reflows
    let cachedNavHeight = (navbar ? navbar.offsetHeight : 80) + anchorBar.offsetHeight;
    const ro = new ResizeObserver(() => {
        cachedNavHeight = (navbar ? navbar.offsetHeight : 80) + anchorBar.offsetHeight;
        // Pre-cache section offsetTop values
        sectionTops = sections.map(s => s.offsetTop);
    });
    ro.observe(document.body);

    // Pre-cache section tops
    let sectionTops = sections.map(s => s.offsetTop);

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sectionTops.forEach((top, i) => {
            if (scrollY >= top - cachedNavHeight - 30) {
                current = sections[i].getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });
}

// ===== GOOGLE ANALYTICS & CLICK TRACKING WITH GDPR COOKIE CONSENT =====
function initGoogleAnalyticsTracking() {
    const gaMeasurementId = 'G-XXXXXXXXXX'; // Replace with actual Google Analytics Measurement ID

    // Initialize Google Consent Mode V2 Default State
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function() {
        window.dataLayer.push(arguments);
    };

    const consentStatus = localStorage.getItem('cookieConsent');

    if (!consentStatus) {
        // Default to denied for EU/UK/compliance before choice
        window.gtag('consent', 'default', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied'
        });
        showCookieConsentBanner();
    } else if (consentStatus === 'accepted') {
        window.gtag('consent', 'default', {
            'ad_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted',
            'analytics_storage': 'granted'
        });
        loadAnalyticsScripts();
    } else {
        window.gtag('consent', 'default', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied'
        });
    }

    // Load actual tracker script if consent granted
    function loadAnalyticsScripts() {
        if (gaMeasurementId && gaMeasurementId !== 'G-XXXXXXXXXX' && !document.getElementById('ga-script')) {
            const script = document.createElement('script');
            script.id = 'ga-script';
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
            document.head.appendChild(script);

            window.gtag('js', new Date());
            window.gtag('config', gaMeasurementId, {
                send_page_view: true
            });
        }
    }

    // Dynamic banner builder
    function showCookieConsentBanner() {
        // Inject styles
        const styles = `
            #cookieConsentBanner {
                position: fixed;
                bottom: 24px;
                right: 24px;
                max-width: 400px;
                background: rgba(15, 13, 23, 0.85);
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 16px;
                padding: 20px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
                z-index: 999999;
                font-family: 'Inter', sans-serif;
                color: #fff;
                transform: translateY(100px);
                opacity: 0;
                transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            }
            #cookieConsentBanner.show {
                transform: translateY(0);
                opacity: 1;
            }
            #cookieConsentBanner h4 {
                font-size: 1.05rem;
                font-weight: 700;
                margin: 0 0 8px 0;
                color: #fff;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            #cookieConsentBanner p {
                font-size: 0.82rem;
                line-height: 1.5;
                margin: 0 0 16px 0;
                color: rgba(255, 255, 255, 0.7);
            }
            #cookieConsentBanner .cookie-actions {
                display: flex;
                gap: 12px;
            }
            #cookieConsentBanner button {
                flex: 1;
                padding: 10px 16px;
                border-radius: 8px;
                font-size: 0.82rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            #cookieConsentBanner .btn-accept {
                background: #7c3aed;
                border: none;
                color: #fff;
            }
            #cookieConsentBanner .btn-accept:hover {
                background: #6d28d9;
                box-shadow: 0 0 12px rgba(124, 58, 237, 0.4);
            }
            #cookieConsentBanner .btn-decline {
                background: transparent;
                border: 1px solid rgba(255, 255, 255, 0.15);
                color: rgba(255, 255, 255, 0.8);
            }
            #cookieConsentBanner .btn-decline:hover {
                background: rgba(255, 255, 255, 0.05);
                border-color: rgba(255, 255, 255, 0.25);
                color: #fff;
            }
            @media (max-width: 576px) {
                #cookieConsentBanner {
                    bottom: 0;
                    right: 0;
                    left: 0;
                    max-width: 100%;
                    border-radius: 16px 16px 0 0;
                    border-width: 1px 0 0 0;
                    padding: 24px;
                }
            }
        `;
        const styleSheet = document.createElement("style");
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);

        // Inject banner markup
        const banner = document.createElement('div');
        banner.id = 'cookieConsentBanner';
        banner.innerHTML = `
            <h4><i class="fas fa-cookie-bite" style="color: #a78bfa;"></i> Cookie Consent</h4>
            <p>We use cookies to analyze traffic, remember your preferences, and optimize your user experience. European visitors can opt out below.</p>
            <div class="cookie-actions">
                <button class="btn-decline" id="cookieDecline">Decline</button>
                <button class="btn-accept" id="cookieAccept">Accept All</button>
            </div>
        `;
        document.body.appendChild(banner);

        // Slide-up delay
        setTimeout(() => {
            banner.classList.add('show');
        }, 100);

        // Action listeners
        document.getElementById('cookieAccept').addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            window.gtag('consent', 'update', {
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted',
                'analytics_storage': 'granted'
            });
            loadAnalyticsScripts();
            banner.classList.remove('show');
            setTimeout(() => banner.remove(), 500);
        });

        document.getElementById('cookieDecline').addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'declined');
            banner.classList.remove('show');
            setTimeout(() => banner.remove(), 500);
        });
    }

    // 2. Global Event Listener for Each and Every Click
    document.body.addEventListener('click', (event) => {
        // Track clicks on links, buttons, CTAs, and service/project cards
        const target = event.target.closest('a, button, [role="button"], .service-card, .project-card, .btn-primary, .btn-secondary, .nav-cta, .whatsapp-float');
        if (!target) return;

        const text = target.innerText ? target.innerText.trim().substring(0, 100) : '';
        const id = target.id || '';
        const href = target.getAttribute('href') || '';
        const className = target.className || '';
        const category = target.closest('[data-service]') ? target.closest('[data-service]').getAttribute('data-service') : 'general';

        // Prepare GA4 parameters
        const eventParams = {
            element_text: text,
            element_id: id,
            element_class: className,
            element_href: href,
            service_category: category,
            page_path: window.location.pathname
        };

        // Send to GA4 only if accepted
        if (localStorage.getItem('cookieConsent') === 'accepted') {
            if (typeof window.gtag === 'function') {
                window.gtag('event', 'click_interaction', eventParams);
            }

            // Also push to GTM dataLayer
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'custom_click_event',
                ...eventParams
            });
        }
    });
}

// ===== DYNAMIC CALENDLY TRIGGER (Zero page load overhead) =====
window.triggerCalendly = function(url) {
    const openCalendly = () => {
        Calendly.initPopupWidget({ url: url });

        // Inject "Open in new tab" pill on top of the Calendly overlay
        // Small delay so the overlay DOM is present
        setTimeout(() => {
            // Avoid duplicate pills
            if (document.getElementById('cal-newtab-btn')) return;

            const overlay = document.querySelector('.calendly-overlay');
            if (!overlay) return;

            const pill = document.createElement('a');
            pill.id = 'cal-newtab-btn';
            pill.href = url;
            pill.target = '_blank';
            pill.rel = 'noopener noreferrer';
            pill.title = 'Open Calendly in a new browser tab';
            pill.innerHTML = `
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                Open in new tab`;

            Object.assign(pill.style, {
                position: 'fixed',
                bottom: '24px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: '99999',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '9px 18px',
                background: 'rgba(15,13,23,0.92)',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: '100px',
                fontSize: '13px',
                fontWeight: '600',
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '0.01em',
                cursor: 'pointer',
                textDecoration: 'none',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.45)',
                transition: 'background 0.2s, transform 0.2s',
                whiteSpace: 'nowrap',
            });

            // Hover effect
            pill.addEventListener('mouseenter', () => {
                pill.style.background = 'rgba(40,36,60,0.98)';
                pill.style.transform = 'translateX(-50%) translateY(-2px)';
            });
            pill.addEventListener('mouseleave', () => {
                pill.style.background = 'rgba(15,13,23,0.92)';
                pill.style.transform = 'translateX(-50%)';
            });

            document.body.appendChild(pill);

            // Auto-remove the pill when the overlay is gone
            const observer = new MutationObserver(() => {
                if (!document.querySelector('.calendly-overlay')) {
                    const existing = document.getElementById('cal-newtab-btn');
                    if (existing) existing.remove();
                    observer.disconnect();
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });

        }, 600);
    };

    if (window.Calendly) {
        openCalendly();
    } else {
        const link = document.createElement('link');
        link.href = 'https://assets.calendly.com/assets/external/widget.css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.onload = () => { openCalendly(); };
        document.body.appendChild(script);
    }
};

