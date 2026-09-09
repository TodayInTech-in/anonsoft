/* ===================================================
   LIQUID GLASS & BUBBLE SYSTEM — Anonsoft
   =================================================== */
(function () {
  'use strict';

  /* ── Detect reduced motion ── */
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ═══════════════════════════════════════════════
     1. SCROLL PROGRESS BAR
  ═══════════════════════════════════════════════ */
  function initScrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'lg-scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);

    const update = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%';
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ═══════════════════════════════════════════════
     2. BACKGROUND MORPH BLOBS
  ═══════════════════════════════════════════════ */
  function initBlobs() {
    if (reducedMotion) return;
    const wrap = document.createElement('div');
    wrap.setAttribute('aria-hidden', 'true');
    wrap.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden;';

    for (let i = 1; i <= 3; i++) {
      const blob = document.createElement('div');
      blob.className = `lg-blob lg-blob-${i}`;
      wrap.appendChild(blob);
    }
    document.body.prepend(wrap);
  }

  /* ═══════════════════════════════════════════════
     3. CSS BUBBLE LAYER
  ═══════════════════════════════════════════════ */
  function initCssBubbles() {
    if (reducedMotion) return;
    const layer = document.createElement('div');
    layer.className = 'lg-bubble-layer';
    layer.setAttribute('aria-hidden', 'true');

    for (let i = 0; i < 20; i++) {
      const b = document.createElement('div');
      b.className = 'lg-css-bubble';
      layer.appendChild(b);
    }
    document.body.prepend(layer);
  }

  /* ═══════════════════════════════════════════════
     4. CANVAS BUBBLE SYSTEM
  ═══════════════════════════════════════════════ */
  function initCanvasBubbles() {
    if (reducedMotion) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'lg-bubble-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let W, H, bubbles = [], rafId;
    const isLight = () => document.documentElement.classList.contains('light-mode');

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    /* Bubble class */
    class Bubble {
      constructor(x, y, r, speed) {
        this.x = x ?? (Math.random() * W);
        this.y = y ?? (H + r + Math.random() * H * 0.5);
        this.r = r ?? (6 + Math.random() * 30);
        this.speed = speed ?? (0.4 + Math.random() * 1.2);
        this.drift = (Math.random() - 0.5) * 0.8;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = 0.02 + Math.random() * 0.03;
        this.hue = 230 + Math.random() * 100; // violet-pink range
        this.alpha = 0.15 + Math.random() * 0.45;
        this.life = 1;
      }

      update() {
        this.y -= this.speed;
        this.wobble += this.wobbleSpeed;
        this.x += Math.sin(this.wobble) * this.drift;

        /* Fade in near bottom, fade out near top */
        const progress = 1 - (this.y / H);
        if (progress < 0.1) this.life = progress / 0.1;
        else if (progress > 0.85) this.life = 1 - (progress - 0.85) / 0.15;
        else this.life = 1;

        return this.y + this.r > -20;
      }

      draw(ctx) {
        const alpha = this.alpha * this.life;
        if (alpha < 0.01) return;

        ctx.save();

        /* Outer ring */
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);

        const ringGrad = ctx.createLinearGradient(
          this.x - this.r, this.y - this.r,
          this.x + this.r, this.y + this.r
        );
        const h = this.hue;
        ringGrad.addColorStop(0, `hsla(${h}, 80%, 75%, ${alpha * 0.9})`);
        ringGrad.addColorStop(0.4, `hsla(${h + 40}, 90%, 80%, ${alpha * 0.5})`);
        ringGrad.addColorStop(1, `hsla(${h + 80}, 70%, 85%, ${alpha * 0.8})`);

        ctx.strokeStyle = ringGrad;
        ctx.lineWidth = this.r > 15 ? 1.5 : 1;
        ctx.stroke();

        /* Inner fill */
        const fillGrad = ctx.createRadialGradient(
          this.x - this.r * 0.3, this.y - this.r * 0.3, 0,
          this.x, this.y, this.r
        );
        fillGrad.addColorStop(0, `hsla(${h}, 100%, 95%, ${alpha * 0.35})`);
        fillGrad.addColorStop(0.5, `hsla(${h + 30}, 80%, 70%, ${alpha * 0.12})`);
        fillGrad.addColorStop(1, `hsla(${h + 60}, 70%, 60%, ${alpha * 0.08})`);
        ctx.fillStyle = fillGrad;
        ctx.fill();

        /* Specular highlight */
        ctx.beginPath();
        ctx.ellipse(
          this.x - this.r * 0.3,
          this.y - this.r * 0.35,
          this.r * 0.25,
          this.r * 0.15,
          -0.5,
          0, Math.PI * 2
        );
        ctx.fillStyle = `rgba(255,255,255,${alpha * 0.7})`;
        ctx.fill();

        ctx.restore();
      }
    }

    /* Spawn bubbles */
    function spawnBubble(x, y, r, speed) {
      bubbles.push(new Bubble(x, y, r, speed));
    }

    function spawnRandom() {
      spawnBubble();
    }

    /* Initial population */
    for (let i = 0; i < 35; i++) {
      const b = new Bubble();
      b.y = Math.random() * H;   // distribute vertically at start
      bubbles.push(b);
    }

    let lastSpawn = 0;
    function loop(ts) {
      ctx.clearRect(0, 0, W, H);

      /* Spawn ~1 bubble per 300ms */
      if (ts - lastSpawn > 300) {
        spawnRandom();
        lastSpawn = ts;
      }

      bubbles = bubbles.filter(b => {
        const alive = b.update();
        if (alive) b.draw(ctx);
        return alive;
      });

      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);

    /* Click-spawn burst */
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const dist = 15 + Math.random() * 25;
        spawnBubble(
          e.clientX + Math.cos(angle) * dist,
          e.clientY + Math.sin(angle) * dist,
          4 + Math.random() * 14,
          0.8 + Math.random() * 1.5
        );
      }
    });

    /* Cleanup */
    return () => cancelAnimationFrame(rafId);
  }

  /* ═══════════════════════════════════════════════
     5. CURSOR GLOW
  ═══════════════════════════════════════════════ */
  function initCursorGlow() {
    if (reducedMotion) return;
    const glow = document.createElement('div');
    glow.className = 'lg-cursor-glow';
    glow.setAttribute('aria-hidden', 'true');
    document.body.appendChild(glow);

    let mx = -500, my = -500, cx = -500, cy = -500;
    const lerp = (a, b, t) => a + (b - a) * t;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
    });

    document.addEventListener('mouseleave', () => {
      glow.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      glow.style.opacity = '1';
    });

    (function tick() {
      cx = lerp(cx, mx, 0.08);
      cy = lerp(cy, my, 0.08);
      glow.style.left = cx + 'px';
      glow.style.top = cy + 'px';
      requestAnimationFrame(tick);
    })();
  }

  /* ═══════════════════════════════════════════════
     6. CURSOR BUBBLE TRAIL
  ═══════════════════════════════════════════════ */
  function initCursorBubbleTrail() {
    if (reducedMotion) return;

    let lastTrail = 0;
    const TRAIL_INTERVAL = 120; // ms between trail bubbles

    document.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if (now - lastTrail < TRAIL_INTERVAL) return;
      lastTrail = now;

      const size = 8 + Math.random() * 18;
      const hue = 230 + Math.random() * 100;
      const el = document.createElement('div');
      el.className = 'lg-cursor-bubble';
      el.style.cssText = `
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: ${size}px;
        height: ${size}px;
        border: 1px solid hsla(${hue}, 80%, 75%, 0.7);
        background: radial-gradient(circle at 35% 35%,
          hsla(${hue}, 100%, 95%, 0.5) 0%,
          hsla(${hue+30}, 80%, 70%, 0.15) 60%,
          transparent 100%);
        box-shadow: inset 0 0 ${size/3}px rgba(255,255,255,0.3);
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 800);
    });
  }

  /* ═══════════════════════════════════════════════
     7. BUTTON RIPPLE
  ═══════════════════════════════════════════════ */
  function initButtonRipple() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-primary, .btn-secondary, .nav-cta');
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const ripple = document.createElement('span');
      ripple.className = 'btn-ripple';
      ripple.style.cssText = `
        width: ${size}px; height: ${size}px;
        left: ${x}px; top: ${y}px;
      `;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 800);
    });
  }

  /* ═══════════════════════════════════════════════
     8. 3D CARD TILT
  ═══════════════════════════════════════════════ */
  function initCardTilt() {
    if (reducedMotion) return;

    const selector = [
      '.service-card',
      '.feature-card',
      '.pricing-card',
      '.stat-card',
      '.portfolio-card',
      '.tech-card'
    ].join(',');

    document.querySelectorAll(selector).forEach(card => {
      card.setAttribute('data-tilt', '');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        const rotX = -dy * 8;
        const rotY = dx * 8;

        card.style.transform = `
          perspective(1000px)
          rotateX(${rotX}deg)
          rotateY(${rotY}deg)
          translateY(-6px)
          scale(1.015)
        `;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ═══════════════════════════════════════════════
     9. SVG LIQUID FILTER INJECTION
  ═══════════════════════════════════════════════ */
  function injectSvgFilter() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.className = 'liquid-glass-filter';
    svg.innerHTML = `
      <defs>
        <filter id="lg-liquid-filter" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.018 0.022"
            numOctaves="3"
            seed="5"
            result="noise">
            <animate
              attributeName="baseFrequency"
              values="0.018 0.022;0.022 0.018;0.018 0.022"
              dur="12s"
              repeatCount="indefinite"/>
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="8"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"/>
          <feComposite in="displaced" in2="SourceGraphic" operator="in"/>
        </filter>
      </defs>
    `;
    document.body.prepend(svg);
  }

  /* ═══════════════════════════════════════════════
     10. THEME CHANGE OBSERVER
  ═══════════════════════════════════════════════ */
  function watchTheme() {
    const observer = new MutationObserver(() => {
      const canvas = document.getElementById('lg-bubble-canvas');
      if (!canvas) return;
      canvas.style.mixBlendMode = document.documentElement.classList.contains('light-mode')
        ? 'multiply' : 'screen';
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  }

  /* ═══════════════════════════════════════════════
     INIT ALL
  ═══════════════════════════════════════════════ */
  function init() {
    injectSvgFilter();
    initScrollProgress();
    initBlobs();
    initCssBubbles();
    initCanvasBubbles();
    initCursorGlow();
    initCursorBubbleTrail();
    initButtonRipple();
    initCardTilt();
    watchTheme();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
