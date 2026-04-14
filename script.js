// ===== TODAYINTECH WEBSITE JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initCounters();
    initSmoothScroll();
    initParallaxGlow();
    initFloatingCta();
    // initSocialProofToast(); // Disabled — fake social proof hurts trust
    initRoiCalculator();
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
        // Check if element is already in viewport on page load
        const rect = counter.getBoundingClientRect();
        const inViewport = rect.top < window.innerHeight && rect.bottom >= 0;
        if (inViewport) {
            animateCounter(counter);
        } else {
            observer.observe(counter);
        }
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
    const words = ['Custom Software', 'HealthTech', 'EdTech Platforms', 'SaaS Solutions'];
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
document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card').forEach(card => {
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

// ===== ROI CALCULATOR =====
function initRoiCalculator() {
    const teamSlider = document.getElementById('roi-team-size');
    const monthsSlider = document.getElementById('roi-months');
    const rateSlider = document.getElementById('roi-rate');
    if (!teamSlider) return;

    function updateROI() {
        const team = parseInt(teamSlider.value);
        const months = parseInt(monthsSlider.value);
        const rate = parseInt(rateSlider.value);

        document.getElementById('roi-team-display').textContent = team + ' engineers';
        document.getElementById('roi-months-display').textContent = months + ' months';
        document.getElementById('roi-rate-display').textContent = '$' + rate + '/hr';

        // Calculation: team * rate * 160hrs/month * months + fixed overheads
        const customCost = team * rate * 160 * months + 80000; // 80K overhead (HIPAA, infra, QA)
        const ourCost = 50000; // starting price
        const savings = customCost - ourCost;

        const formatMoney = (n) => '$' + n.toLocaleString('en-US');

        document.getElementById('roi-scratch-cost').textContent = formatMoney(customCost);
        document.getElementById('roi-scratch-time').textContent = months + ' months to launch';
        document.getElementById('roi-savings').textContent = formatMoney(savings);
    }

    teamSlider.addEventListener('input', updateROI);
    monthsSlider.addEventListener('input', updateROI);
    rateSlider.addEventListener('input', updateROI);
    updateROI();
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
