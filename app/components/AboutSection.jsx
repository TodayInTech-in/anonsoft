'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AboutSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      '.about-text-col',
      { autoAlpha: 0, x: -30 },
      {
        autoAlpha: 1,
        x: 0,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );

    gsap.fromTo(
      '.about-card-col',
      { autoAlpha: 0, x: 30 },
      {
        autoAlpha: 1,
        x: 0,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="container">
        <div className="about-grid">
          <div className="about-text-col">
            <div className="section-label">Why Partner With Us</div>
            <h2 className="section-title">Built for Founders Who Need Velocity Without Compromise</h2>
            <p className="about-p">
              Anonsoft is an agile software engineering studio specializing in HealthTech MVPs, enterprise white-label platforms, and custom SaaS architectures.
            </p>
            <p className="about-p">
              Instead of spending 6–12 months hiring expensive in-house teams, partner with our senior engineers to build, launch, and scale your production software in weeks.
            </p>

            <div className="about-highlights">
              <div className="about-highlight">
                <i className="fas fa-bolt highlight-icon"></i>
                <div>
                  <h4>4–8 Week MVP Delivery</h4>
                  <p>Rapid agile Sprints designed to hit your investor demo or customer launch deadline.</p>
                </div>
              </div>
              <div className="about-highlight">
                <i className="fas fa-shield-alt highlight-icon"></i>
                <div>
                  <h4>HIPAA & SOC 2 Ready</h4>
                  <p>Built with enterprise security standards, encrypted databases, and BAA agreements.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="about-card-col">
            <div className="about-stat-card">
              <div className="stat-number">50+</div>
              <div className="stat-label">Products Launched</div>
              <p className="stat-desc">From seed-stage healthtech MVPs to enterprise multi-tenant ERP platforms across the US, UK, and Asia.</p>
              <div className="stat-badges">
                <span>React / Next.js</span>
                <span>Node.js</span>
                <span>Python</span>
                <span>AWS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
