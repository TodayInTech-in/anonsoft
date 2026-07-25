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
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link href="/" className="nav-logo">
          <img src="/logo.png" alt="TodayInTech Logo" style={{ height: '40px', width: 'auto' }} />
          <span className="nav-logo-text" style={{ marginLeft: '10px' }}>TodayInTech</span>
        </Link>

        <nav className={`nav-links ${mobileActive ? 'active' : ''}`}>
          <Link href="/#services" onClick={() => setMobileActive(false)}>Services</Link>
          <Link href="/#projects" onClick={() => setMobileActive(false)}>Portfolio</Link>
          <Link href="/#pricing" onClick={() => setMobileActive(false)}>Pricing</Link>
          <Link href="/#about" onClick={() => setMobileActive(false)}>About</Link>
          <Link href="/blog" onClick={() => setMobileActive(false)}>Blog</Link>
          <Link href="/#contact" className="nav-cta" onClick={() => setMobileActive(false)}>
            Book Free Call
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
    </header>
  );
}
