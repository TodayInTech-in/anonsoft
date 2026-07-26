'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ProcessSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    });

    tl.fromTo(
      '.section-header',
      { autoAlpha: 0, y: 25 },
      { autoAlpha: 1, y: 0, duration: 0.5 }
    ).fromTo(
      '.process-step',
      { autoAlpha: 0, y: 30, scale: 0.95 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.15, ease: 'back.out(1.2)' },
      '-=0.2'
    );
  }, { scope: sectionRef });

  return (
    <section id="process" className="process" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <div className="section-label">How We Build</div>
          <h2 className="section-title">Our 4-Step Engineering Sprint</h2>
          <p className="section-subtitle">From initial discovery call to production deployment on AWS / Vercel.</p>
        </div>

        <div className="process-grid">
          <div className="process-step">
            <div className="step-num">01</div>
            <h3>Discovery & Architecture</h3>
            <p>We map out product requirements, tech stack, DB schemas, and HIPAA compliance requirements in 48 hours.</p>
          </div>
          <div className="process-step">
            <div className="step-num">02</div>
            <h3>UI/UX & Interactive Prototype</h3>
            <p>Figma high-fidelity interactive wireframes aligned with your brand aesthetic before coding begins.</p>
          </div>
          <div className="process-step">
            <div className="step-num">03</div>
            <h3>Agile Development Sprints</h3>
            <p>Bi-weekly demo builds with full test suites, CI/CD pipelines, and active Slack channel collaboration.</p>
          </div>
          <div className="process-step">
            <div className="step-num">04</div>
            <h3>Launch & Scale</h3>
            <p>Cloud deployment, DNS setup, security audits, SLA support, and complete codebase handover.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
