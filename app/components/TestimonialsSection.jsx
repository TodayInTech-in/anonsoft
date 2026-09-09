'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function TestimonialsSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      '.testimonial-card',
      { autoAlpha: 0, y: 35, scale: 0.97 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="testimonials" className="testimonials" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <div className="section-label">Client Stories</div>
          <h2 className="section-title">Trusted by Founders & Healthcare Leaders</h2>
          <p className="section-subtitle">Read how startups and clinics accelerated their launch timeline with Anonsoft.</p>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-rating">
              <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
            </div>
            <p className="testimonial-quote">
              "Anonsoft delivered our HIPAA-compliant virtual care MVP in under 6 weeks. Their pre-built telehealth components saved us over $40,000 in dev costs."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">DR</div>
              <div>
                <div className="author-name">Dr. Robert Chen</div>
                <div className="author-role">Founder & CEO, MedNow Telehealth</div>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-rating">
              <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
            </div>
            <p className="testimonial-quote">
              "The EVV caregiver tracking platform built by Anonsoft passed state compliance audits with zero findings. Highly recommend for home care software."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">SM</div>
              <div>
                <div className="author-name">Sarah Miller</div>
                <div className="author-role">COO, SeniorCare EVV Network</div>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-rating">
              <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
            </div>
            <p className="testimonial-quote">
              "Our white-label school management system now serves 12 campus branches seamlessly. Fee billing and live GPS transport tracking work flawlessly."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">AK</div>
              <div>
                <div className="author-name">Amit Kumar</div>
                <div className="author-role">Managing Director, EduCampus SaaS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
