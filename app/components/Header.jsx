'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileActive, setMobileActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <Link href="/" className="nav-logo">
            <img
              src="/assets/nav_logo.png"
              alt="TodayInTech - Custom software and virtual care platform development logo"
              style={{ height: '48px', width: 'auto', display: 'block' }}
              width="103"
              height="48"
            />
          </Link>

          <nav className={`nav-links ${mobileActive ? 'active' : ''}`}>
            <Link href="/services" onClick={() => setMobileActive(false)}>Services</Link>
            <Link href="/features" onClick={() => setMobileActive(false)}>Features</Link>
            <Link href="/about" onClick={() => setMobileActive(false)}>About</Link>
            <Link href="/health" onClick={() => setMobileActive(false)}>HealthTech</Link>
            <Link href="/ai" onClick={() => setMobileActive(false)}>AI</Link>
            <Link href="/agents" onClick={() => setMobileActive(false)}>Agents</Link>
            <Link href="/blog" onClick={() => setMobileActive(false)}>Blog</Link>
            <Link href="/careers" onClick={() => setMobileActive(false)}>Careers</Link>
            <Link href="/contact" onClick={() => setMobileActive(false)}>FAQ & Contact</Link>
            <Link href="/free-consultation" className="nav-cta" onClick={() => setMobileActive(false)}>
              Book Free Strategy Call
            </Link>
          </nav>

          <button
            className={`nav-toggle ${mobileActive ? 'active' : ''}`}
            aria-label="Toggle menu"
            onClick={() => setMobileActive(!mobileActive)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </header>
  );
}
