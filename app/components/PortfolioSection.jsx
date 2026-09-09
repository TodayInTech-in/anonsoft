'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function PortfolioSection() {
  const sectionRef = useRef(null);

  const projects = [
    {
      slug: 'church-management-software',
      category: 'ChMS / SaaS',
      title: 'Anonsoft SITES — Church Management',
      description: 'A comprehensive platform designed to manage member data, online giving, scheduling, accounting, and church communications from one connected interface.',
      image: '/assets/project-church-management.png',
      tech: ['React', 'Node.js', 'PostgreSQL', 'AWS']
    },
    {
      slug: 'school-management-system',
      category: 'EdTech SaaS ERP',
      title: 'White-Label School ERP Software & Campus Management System Builder',
      description: 'Deploy a multi-branch white-label school management system ERP featuring automated fee billing, student portal apps, digital report cards, and GPS transport tracking.',
      image: '/assets/project-school-erp.png',
      tech: ['Vue.js', 'Node.js', 'MySQL', 'AWS']
    },
    {
      slug: 'restaurant-management-system',
      category: 'SaaS / POS',
      title: 'White-Label Restaurant POS System & Kitchen ERP Builder',
      description: 'An end-to-end white-label restaurant POS software platform featuring touch POS billing, kitchen display queues (KDS), table reservation layouts, and automated stock tracking.',
      image: '/assets/project-restaurant-hero.png',
      tech: ['React', 'Node.js', 'MongoDB', 'AWS']
    },
    {
      slug: 'senior-care-agency',
      category: 'Home Care ERP / HealthTech',
      title: 'White-Label Home Care Agency Software & EVV Caregiver Tracking ERP',
      description: 'Build or rebrand GPS EVV-compliant home care agency software, caregiver scheduling tools, and family portals with a top HIPAA-compliant healthcare software agency.',
      image: '/assets/project-senior-care.png',
      tech: ['React', 'Node.js', 'PostgreSQL', 'AWS']
    },
    {
      slug: 'impakto',
      category: 'Three.js / WebGL / E-Commerce',
      title: 'Three.js E-Commerce 3D Product Customizer & WebGL Configurator',
      description: 'An interactive, high-performance 3D product customizer built with Three.js and WebGL. Personalize colors, materials, and 3D components in real time with Draco compression.',
      image: '/assets/project/impakto.png',
      tech: ['Three.js', 'WebGL', 'Draco Loader', 'Vercel']
    },
    {
      slug: 'casino-blackjack-game',
      category: 'HTML5 Canvas / Game Dev',
      title: 'Casino Game Dev & White-Label Blackjack Software',
      description: 'Partner with a custom casino game development company to launch a custom online casino game engine or white-label blackjack software under your brand.',
      image: '/assets/project-casino.png',
      tech: ['HTML5 Canvas', 'Web Audio API', 'JavaScript', 'Vercel']
    },
    {
      slug: 'mednowna',
      category: 'HIPAA Telehealth SaaS',
      title: 'HIPAA-Compliant Telemedicine App Developer & White-Label Telehealth Platform',
      description: 'Hire a top HIPAA-compliant telemedicine app developer to launch a branded white-label telehealth platform with EHR/EMR integration, video consultations, and patient portal app in 4–8 weeks.',
      image: '/assets/project-telemedicine.png',
      tech: ['React Native', 'Python', 'PostgreSQL', 'Docker']
    },
    {
      slug: 'inventory-billing',
      category: 'White-Label SaaS / ERP',
      title: 'White-Label Inventory & Retail Billing SaaS Platform Developer',
      description: 'Deploy custom white-label inventory software and billing SaaS platform with multi-warehouse tracking, GST invoicing, and retail POS capabilities for enterprise software resellers.',
      image: '/assets/project/biling-and-inventory.png',
      tech: ['Inventory', 'Billing', 'White-Label', 'SaaS']
    },
    {
      slug: 'nexbotix',
      category: 'Marketing Automation',
      title: 'NexBotix — Multi-Channel Marketing AI',
      description: 'Turn every channel into a sales machine. WhatsApp marketing, professional email campaigns, and AI website chatbots — all in one unified platform.',
      image: '/assets/project/marketing-tools.png',
      tech: ['WhatsApp API', 'AI Chatbot', 'Email SMTP', 'REST API']
    },
    {
      slug: 'ai-community',
      category: 'EdTech',
      title: 'AI Community College — Learn AI Step by Step',
      description: 'A structured, step-by-step AI learning platform with 52 chapters. Master artificial intelligence from beginner to expert with real tools and real projects.',
      image: '/assets/project/ai-community.png',
      tech: ['React', 'Node.js', 'AI Integration', 'Multi-Language']
    },
    {
      slug: 'radio-station',
      category: 'Media & Entertainment',
      title: 'Radio Stiming — Live Radio Station',
      description: 'A full-featured live radio streaming platform with show scheduling, DJ profiles, song request system, and real-time listener engagement — reaching 100,000+ monthly listeners.',
      image: '/assets/project/radio-station.png',
      tech: ['React', 'Node.js', 'Audio Streaming', 'Real-Time']
    },
    {
      slug: 'vocal-flow',
      category: 'AI Tool',
      title: 'VocalFlow — AI Text to Speech',
      description: 'Transform text into natural speech with 300+ voices across 50+ languages. Free, open-source, and no sign-up required — create lifelike voiceovers in seconds.',
      image: '/assets/project/vocal-flow.png',
      tech: ['React', 'Web Speech API', 'AI / TTS', 'Open Source']
    },
    {
      slug: 'master-ai',
      category: 'AI Mobile App',
      title: 'Master AI — GPT Magic in Hand',
      description: 'The ultimate pocket AI assistant powered by GPT-4 and Claude 3.5. Features a viral script writer, translation assistant, coding tool, and conversational AI chatbot.',
      image: '/assets/project-master-ai.png',
      tech: ['Flutter / Dart', 'GPT-4 API', 'Claude 3.5', 'Node.js']
    }
  ];

  useGSAP(() => {
    gsap.fromTo(
      '.portfolio-card',
      { autoAlpha: 0, y: 35 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.portfolio-grid',
          start: 'top 85%',
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="projects" className="portfolio" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <div className="section-label">Selected Case Studies</div>
          <h2 className="section-title">Battle-Tested Digital Products</h2>
          <p className="section-subtitle">Explore all 13 battle-tested white-label SaaS, HealthTech, and AI platforms built by Anonsoft.</p>
        </div>

        <div className="portfolio-grid">
          {projects.map((proj) => (
            <Link key={proj.slug} href={`/projects/${proj.slug}`} className="portfolio-card">
              <div className="portfolio-image">
                <img src={proj.image} alt={proj.title} loading="lazy" />
                <div className="portfolio-image-overlay"></div>
              </div>
              <div className="portfolio-info">
                <span className="portfolio-category">{proj.category}</span>
                <h3>{proj.title}</h3>
                <p>{proj.description}</p>
                <div className="portfolio-tech">
                  {proj.tech.map((t, idx) => (
                    <span key={idx}>{t}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
