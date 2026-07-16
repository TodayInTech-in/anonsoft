#!/usr/bin/env python3
"""
daily_faq.py — Rotate homepage FAQs every day for SEO.

What it does:
  1. Picks today's FAQ set from a large curated bank (rotates by day-of-year).
  2. Replaces the <script type="application/ld+json"> FAQPage block in index.html.
  3. Replaces the visible <div class="faq-grid"> HTML block in index.html.
  4. Commits and pushes to git so Vercel re-deploys immediately.

Cron: 0 0 * * *  (midnight every day)
"""

import os
import re
import json
from datetime import datetime

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX_HTML = os.path.join(ROOT_DIR, "index.html")

FAQ_BANK = [
    # Set 0: Custom Software Agency
    [
        {"q": "What is a custom software development agency?", "a": "A custom software development agency designs, builds, and maintains tailor-made software products for businesses — from SaaS platforms and mobile apps to AI tools and enterprise portals. TodayInTech ships production-ready products in weeks, not months."},
        {"q": "How much does custom software development cost in 2026?", "a": "Custom software costs range from $15,000 for a simple MVP to $250,000+ for a complex enterprise platform. TodayInTech's zero-upfront model lets you see a working prototype before paying a single dollar — dramatically reducing your financial risk."},
        {"q": "How long does it take to build custom software?", "a": "A white-label MVP can launch in 2-4 weeks. A fully custom platform with complex integrations typically takes 3-6 months. TodayInTech uses pre-built HIPAA-compliant modules to cut delivery time by 60%."},
        {"q": "What is the difference between SaaS and custom software?", "a": "SaaS is a rented, one-size-fits-all product. Custom software is built to your exact workflow, white-labeled, owned outright, and scaled without per-seat licensing fees. Most growing businesses migrate from SaaS to custom software after hitting scaling limits."},
        {"q": "Can I own the source code after development?", "a": "Yes. TodayInTech delivers full IP ownership including source code, database schemas, and documentation. You are never locked into a licensing agreement — the software is entirely yours."},
        {"q": "Do you sign NDAs before discussing my project?", "a": "Absolutely. We sign a mutual NDA before any project discussions. Your business idea, technical details, and proprietary workflows are kept strictly confidential."},
        {"q": "What industries does TodayInTech build software for?", "a": "We specialize in HealthTech, EdTech, FinTech, Hospitality, E-commerce, Logistics, and Enterprise SaaS. Our most in-demand verticals are healthcare platforms and AI-powered business tools."},
        {"q": "How do I get started with TodayInTech?", "a": "Book a free 30-minute strategy call via our website. We'll discuss your product vision, map out a delivery timeline, and show you a live demo of similar software we've already built — with zero commitment required."},
    ],
    # Set 1: HIPAA & Healthcare Compliance
    [
        {"q": "What does HIPAA compliance mean for a healthcare app?", "a": "HIPAA compliance means your app protects patient health information (PHI) using AES-256 encryption at rest, TLS 1.3 in transit, role-based access control, audit logs, and signed Business Associate Agreements (BAAs) with all vendors handling PHI."},
        {"q": "Is it mandatory to be HIPAA compliant for a telemedicine app?", "a": "Yes. Any app that creates, stores, or transmits Protected Health Information in the USA must comply with HIPAA. Violations carry fines from $100 to $50,000 per violation. TodayInTech builds every healthcare app HIPAA-compliant from day one."},
        {"q": "What is a Business Associate Agreement (BAA) in healthcare?", "a": "A BAA is a legal contract between a HIPAA-covered entity and any third-party vendor that accesses PHI. Cloud providers (AWS, Google Cloud, Azure), email services, and software vendors must all sign BAAs before they can process your patients' data."},
        {"q": "Can a healthcare app be GDPR and HIPAA compliant simultaneously?", "a": "Yes. While HIPAA focuses on US patient data and GDPR on EU residents, both require strong encryption, data minimization, consent management, and breach notification. TodayInTech builds platforms satisfying both frameworks simultaneously."},
        {"q": "What security testing is required for a HIPAA-compliant app?", "a": "HIPAA's Security Rule requires a risk analysis covering technical safeguards — penetration testing, vulnerability scanning, access control audits, and disaster recovery testing. TodayInTech coordinates all of these as part of delivery."},
        {"q": "Does TodayInTech sign BAAs with clients?", "a": "Yes. We sign a Business Associate Agreement with every healthcare client before development begins, ensuring your patient data is handled with full legal accountability throughout the engagement."},
        {"q": "What cloud infrastructure does TodayInTech use for healthcare apps?", "a": "We primarily use AWS (with a signed BAA) for healthcare workloads — leveraging Amazon HealthLake (FHIR), S3 with server-side encryption, RDS with encryption at rest, VPC isolation, and CloudTrail for audit logging."},
        {"q": "How long does HIPAA compliance setup take for a new healthcare platform?", "a": "Basic HIPAA technical safeguards can be configured in 1-2 weeks alongside development. Full administrative and physical safeguard documentation takes 3-4 additional weeks. TodayInTech handles the entire process."},
    ],
    # Set 2: Telemedicine / Telehealth
    [
        {"q": "What features should a telemedicine app have in 2026?", "a": "A modern telemedicine app needs HIPAA-compliant HD video calls, secure messaging, e-prescriptions, EHR integration (Epic, Cerner), patient scheduling, insurance eligibility checks, payment processing, and AI symptom triage. TodayInTech includes all of these."},
        {"q": "How much does it cost to build a telemedicine app?", "a": "A white-label telemedicine MVP costs $15,000-$40,000. A fully custom platform with AI triage, multi-specialty scheduling, and EHR integration ranges from $60,000-$150,000. TodayInTech offers a zero-upfront prototype so you validate before you invest."},
        {"q": "What is a white-label telemedicine platform?", "a": "A white-label telemedicine platform is a pre-built, fully branded virtual care product you launch under your own name. TodayInTech's SITES platform includes video consults, provider scheduling, patient records, and insurance billing — all rebrandable in days."},
        {"q": "How do I build a HIPAA-compliant video calling feature?", "a": "Use WebRTC with SRTP for encrypted media streams, combined with a HIPAA-eligible video SDK such as Amazon Chime SDK, Twilio Video, or Daily.co — all of which offer signed BAAs. TodayInTech integrates these out of the box."},
        {"q": "Can telemedicine apps integrate with Epic or Cerner EHR?", "a": "Yes. Epic and Cerner both expose FHIR R4 APIs that allow telemedicine apps to pull patient demographics, medication lists, allergies, and lab results, and write back clinical notes and billing codes. TodayInTech has delivered multiple Epic-integrated platforms."},
        {"q": "What is the difference between synchronous and asynchronous telemedicine?", "a": "Synchronous telemedicine is real-time (live video consults). Asynchronous telemedicine is store-and-forward (patient submits text/photos, provider responds later). TodayInTech builds platforms supporting both models."},
        {"q": "Do I need a medical license to launch a telemedicine platform?", "a": "The platform itself doesn't need a license, but providers using it do. State licensing requirements for telehealth vary. As the platform operator, you need HIPAA compliance and BAAs in place, reviewed by a healthcare attorney."},
        {"q": "How long does it take to launch a telemedicine startup?", "a": "Using TodayInTech's pre-built HIPAA telehealth modules, you can launch a production-ready telemedicine platform in 4-8 weeks — compared to 9-18 months for a ground-up custom build."},
    ],
    # Set 3: SaaS Development
    [
        {"q": "What is SaaS development and how does it work?", "a": "SaaS (Software-as-a-Service) development is building a cloud-hosted software product that users access via subscription. The software is deployed centrally, updated automatically, and billed monthly or annually. TodayInTech specializes in scalable, multi-tenant SaaS platforms from MVP to enterprise."},
        {"q": "How long does it take to build a SaaS product?", "a": "A SaaS MVP with core features takes 6-12 weeks. A full-featured SaaS platform with billing, multi-tenancy, analytics, and third-party integrations typically takes 4-9 months. TodayInTech's pre-built modules cut initial timelines by 50-60%."},
        {"q": "What is multi-tenancy in SaaS?", "a": "Multi-tenancy means a single software instance serves multiple customers (tenants), with each tenant's data fully isolated. TodayInTech implements row-level security in PostgreSQL and isolated schemas to ensure data never leaks between clients."},
        {"q": "What technology stack is best for SaaS in 2026?", "a": "The modern SaaS stack in 2026 is Next.js (frontend), Node.js or Python FastAPI (backend), PostgreSQL (primary DB), Redis (caching), Stripe (billing), AWS or Vercel (hosting), and Sentry (monitoring). TodayInTech uses this stack daily."},
        {"q": "How do I monetize a SaaS product?", "a": "Common SaaS monetization models include per-seat pricing, usage-based billing, tiered subscriptions, and freemium. Stripe Billing handles all of these programmatically. TodayInTech integrates Stripe into every SaaS product it builds."},
        {"q": "What is the difference between B2B and B2C SaaS?", "a": "B2B SaaS sells to businesses (e.g., an HR management platform). B2C SaaS sells directly to consumers (e.g., a fitness app). B2B SaaS typically has higher contract values but longer sales cycles. TodayInTech builds both, with healthcare B2B SaaS as its core specialty."},
        {"q": "How do I validate my SaaS idea before building?", "a": "TodayInTech's unique model builds you a fully functional interactive prototype at zero upfront cost. You can demo it to customers and investors before committing to full development — the lowest-risk way to validate product-market fit."},
        {"q": "What is a SaaS MVP and what should it include?", "a": "A SaaS MVP should include core user workflows, authentication and authorization, data storage, a simple dashboard, and basic billing. Avoid over-engineering — ship quickly, get user feedback, and iterate. TodayInTech delivers SaaS MVPs in 6-10 weeks."},
    ],
    # Set 4: AI Development
    [
        {"q": "What AI features can be added to a SaaS product?", "a": "Popular AI features in 2026 SaaS products include AI chatbots (GPT-4/Gemini), smart search (RAG pipelines), predictive analytics, document summarization, auto-tagging, and natural language reporting dashboards. TodayInTech integrates all of these."},
        {"q": "What is an AI agent and how is it different from a chatbot?", "a": "A chatbot responds to prompts. An AI agent autonomously executes multi-step tasks — browsing the web, calling APIs, writing files, and making decisions — using frameworks like LangGraph or AutoGen. TodayInTech builds production AI agents for business automation."},
        {"q": "How much does it cost to integrate AI into a business software platform?", "a": "A basic GPT-4 chatbot integration costs $5,000-$15,000. A full RAG pipeline with proprietary data, custom embeddings, and agentic workflows costs $20,000-$60,000. TodayInTech scopes and builds AI integrations at all complexity levels."},
        {"q": "What is RAG (Retrieval-Augmented Generation) and why does my app need it?", "a": "RAG combines a vector database (Pinecone or pgvector) with an LLM so the AI answers questions using YOUR proprietary data, not just its training data. This makes AI responses accurate, up-to-date, and business-specific. TodayInTech builds RAG pipelines routinely."},
        {"q": "Is AI development HIPAA-compliant for healthcare apps?", "a": "Yes, with proper architecture. Patient data must never be sent to third-party LLM APIs without a BAA. TodayInTech uses HIPAA-eligible AI services (AWS Bedrock, Azure OpenAI with BAA) or runs open-source models privately to keep PHI secure."},
        {"q": "What is an MCP server in AI development?", "a": "MCP (Model Context Protocol) is an Anthropic standard that lets AI agents securely connect to external tools and APIs — such as WhatsApp, CRM, databases, and calendars. TodayInTech builds custom MCP servers that give AI agents access to your business systems."},
        {"q": "Can AI automate customer support for my SaaS?", "a": "Yes. An AI agent trained on your documentation and support history can handle 60-80% of tickets autonomously. TodayInTech builds AI support agents that integrate with Zendesk, Intercom, or a custom help desk and escalate only when human judgment is needed."},
        {"q": "How do I build a custom AI chatbot for my website?", "a": "You need an LLM API (OpenAI, Anthropic, or Gemini), a vector database seeded with your content, a backend to manage conversation context, and a frontend chat widget. TodayInTech delivers fully integrated AI chatbots in 2-4 weeks."},
    ],
    # Set 5: Mobile App Development
    [
        {"q": "Should I build a native or cross-platform mobile app?", "a": "For most startups, cross-platform (React Native or Flutter) is the right choice — one codebase serves iOS and Android, cutting cost and time by 40%. Native (Swift/Kotlin) is only needed for very hardware-intensive apps like AR or real-time sensor processing."},
        {"q": "How much does it cost to build a mobile app in 2026?", "a": "A simple MVP mobile app costs $15,000-$35,000. A full-featured app with payments, push notifications, social features, and backend APIs costs $50,000-$120,000. TodayInTech's zero-upfront model lets you see your app prototype before committing budget."},
        {"q": "How long does mobile app development take?", "a": "An MVP can be built in 6-10 weeks. A complex app with custom animations, third-party integrations, and an admin panel takes 4-6 months. TodayInTech uses pre-built UI libraries and backend modules to accelerate delivery significantly."},
        {"q": "What is the difference between React Native and Flutter?", "a": "React Native uses JavaScript and renders native UI components. Flutter uses Dart and renders using its own engine, giving pixel-perfect custom designs. React Native has a larger ecosystem; Flutter has better performance for animation-heavy UIs. TodayInTech builds with both."},
        {"q": "Can a mobile app integrate with Apple Health and Google Fit?", "a": "Yes. Apple HealthKit and Google Health Connect expose APIs that let your app read and write health metrics (steps, heart rate, sleep, blood glucose). TodayInTech builds health app integrations for both platforms as part of wellness and care management solutions."},
        {"q": "How do I publish an app to the App Store and Google Play?", "a": "Apple requires a $99/year developer account and app review (1-3 days). Google Play requires a $25 one-time fee and review (1-3 days). TodayInTech handles the entire submission process including metadata, screenshots, and compliance review."},
        {"q": "How do I monetize a mobile app?", "a": "Mobile monetization options include in-app purchases (StoreKit/Google Play Billing), subscriptions, freemium tiers, advertising (AdMob), and B2B enterprise licensing. TodayInTech integrates any of these billing models into your app architecture."},
        {"q": "What analytics should I track in my mobile app?", "a": "Track DAU/MAU (retention), session length, conversion funnels, crash rates, and feature adoption. Firebase Analytics is free and integrates natively with both React Native and Flutter. TodayInTech configures analytics dashboards as standard in every app delivery."},
    ],
    # Set 6: School ERP
    [
        {"q": "What is a school management system (SMS)?", "a": "A school management system digitizes school operations — student admissions, attendance, fee management, grade reporting, timetable scheduling, library management, and parent-teacher communications — into one unified dashboard."},
        {"q": "What features should a school ERP have?", "a": "A comprehensive school ERP includes student lifecycle management, online fee collection, biometric attendance, academic performance tracking, timetable generation, transport management, a parent portal, and SMS/email notifications. TodayInTech's school ERP covers all of these."},
        {"q": "How much does it cost to build a school management software?", "a": "A white-label school management system starts at $10,000-$25,000. A fully custom ERP with multi-branch support, custom reporting, and API integrations costs $40,000-$100,000. TodayInTech delivers a working prototype at zero upfront cost."},
        {"q": "Can a school management system work for multiple branches?", "a": "Yes. TodayInTech's school ERP is built for multi-branch operation with a central super-admin dashboard, branch-level admin roles, consolidated reporting, and per-branch fee structures and academic calendars."},
        {"q": "What is a student information system (SIS)?", "a": "A Student Information System (SIS) is the core database component of a school ERP that manages student records, enrollment, grades, transcripts, and demographics. It is the single source of truth for all academic data."},
        {"q": "Can parents access the school management system?", "a": "Yes. TodayInTech's school platform includes a dedicated parent portal (web and mobile) where parents can view attendance, grades, fee receipts, homework assignments, and communicate directly with teachers."},
        {"q": "Does the school ERP integrate with payment gateways?", "a": "Yes. TodayInTech's school management system integrates with Razorpay, Stripe, PayU, and PayPal for online fee collection, automatic receipt generation, and real-time financial reconciliation reports."},
        {"q": "Is the school management system cloud-based?", "a": "Yes. TodayInTech's school ERP is fully cloud-based (AWS/GCP), with 99.9% uptime SLA, automatic backups, SSL encryption, and access from any device — no on-premise servers required."},
    ],
    # Set 7: Restaurant POS
    [
        {"q": "What is a restaurant management system?", "a": "A restaurant management system is an integrated platform handling POS billing, table reservations, Kitchen Order Tickets (KOT), inventory tracking, staff management, customer loyalty, and financial reporting — all in one place."},
        {"q": "What is a KOT in a restaurant POS?", "a": "KOT (Kitchen Order Ticket) is a printed or digital order slip sent to the kitchen when a server takes a customer's order. A modern restaurant POS instantly routes KOTs to the correct kitchen station without paper slips."},
        {"q": "How much does restaurant management software cost?", "a": "A white-label restaurant POS starts at $5,000-$15,000. A full custom system with delivery integration, loyalty programs, and multi-outlet reporting costs $30,000-$80,000. TodayInTech delivers restaurant software with zero upfront payment."},
        {"q": "Can the restaurant POS integrate with Swiggy and Zomato?", "a": "Yes. TodayInTech's restaurant management system integrates with Swiggy, Zomato, and Uber Eats via their public APIs, consolidating all online orders into a single dashboard alongside in-store POS orders."},
        {"q": "What is a table management system in a restaurant?", "a": "A table management system lets staff view the restaurant floor plan digitally, assign tables to servers, track table status (free, occupied, reserved), manage waitlists, and process split bills — all from a tablet POS."},
        {"q": "How do I track food inventory in a restaurant software?", "a": "TodayInTech's restaurant ERP links each menu item to its ingredients in a recipe engine. Every sale auto-deducts stock from inventory. Low-stock alerts, wastage tracking, and supplier purchase orders are all automated."},
        {"q": "Can restaurant software support multiple branches?", "a": "Yes. TodayInTech builds multi-outlet restaurant management systems with a central dashboard for consolidated sales, inventory, and staff reports across all locations, while giving each branch its own independent POS."},
        {"q": "Does restaurant POS software work offline?", "a": "Yes. TodayInTech's restaurant POS has an offline mode that stores transactions locally and syncs to the cloud automatically when connectivity is restored — so a dropped internet connection never disrupts service."},
    ],
    # Set 8: No-Upfront Payment
    [
        {"q": "What does 'no upfront payment' mean in software development?", "a": "TodayInTech's zero-upfront model means we build a fully functional interactive prototype of your software for free. You only pay once you've seen the prototype working and are happy to proceed — eliminating the biggest risk in software development."},
        {"q": "How does the free prototype model work?", "a": "You book a strategy call, share your requirements, and our team builds a working clickable prototype with real UI, real data flows, and real integrations in 2-4 weeks. If you love it, we proceed to full development. If not, you owe nothing."},
        {"q": "What is the risk of hiring a software development agency?", "a": "The biggest risks are: paying large sums for something that doesn't match your vision, agencies running over budget, and poor quality discovered only post-launch. TodayInTech's prototype-first model eliminates all three risks simultaneously."},
        {"q": "How is TodayInTech different from other software agencies?", "a": "TodayInTech is the only agency that builds your software prototype first — for free — so you see exactly what you're getting before committing a single dollar. We also deliver 4-8x faster using pre-built HIPAA-compliant modules, with full IP ownership guaranteed."},
        {"q": "What happens after I approve the prototype?", "a": "Once you approve the prototype, we agree on a fixed-scope contract with clear milestones and deliverables. You pay in installments tied to milestone completion — never lump-sum upfront. Full source code is delivered at project completion."},
        {"q": "Can I get a refund if I'm not satisfied?", "a": "Yes. Our refund policy ensures that if we fail to deliver agreed features within the agreed timeline, you are entitled to a proportional refund. We stand behind the quality of our work unconditionally."},
        {"q": "Is the free prototype a real working product?", "a": "Yes. It is not a wireframe or a Figma mockup. It is deployed, functional software with real backend logic, real database connections, and real UI — exactly matching your brand and requirements."},
        {"q": "How does TodayInTech sustain the free prototype model?", "a": "We use pre-built HIPAA-compliant modules covering 80% of common software features, dramatically reducing our prototype engineering cost. The remaining 20% — your unique workflows and branding — is what we refine in full development."},
    ],
    # Set 9: DevOps & Cloud
    [
        {"q": "What DevOps services does TodayInTech provide?", "a": "TodayInTech provides CI/CD pipeline setup (GitHub Actions, CircleCI), Docker containerization, Kubernetes orchestration, infrastructure-as-code (Terraform), cloud architecture design on AWS/GCP/Azure, and 24/7 production monitoring with PagerDuty."},
        {"q": "What is a CI/CD pipeline and why does my app need one?", "a": "A CI/CD pipeline automates testing, building, and deploying your app every time code is pushed. It catches bugs before production, eliminates manual deployments, and lets your team ship features daily instead of weekly."},
        {"q": "What is Kubernetes and when do I need it?", "a": "Kubernetes manages scaling, load balancing, and self-healing for containerized apps. You need it when your app handles 10,000+ concurrent users or requires zero-downtime deployments. For smaller apps, Docker Compose on ECS is often sufficient."},
        {"q": "Which cloud platform should I use — AWS, GCP, or Azure?", "a": "AWS is most mature with the widest service catalog — ideal for healthcare (HealthLake, HIPAA BAA) and enterprise. GCP excels for AI/ML workloads. Azure is preferred for Microsoft-integrated enterprises. TodayInTech architects on all three."},
        {"q": "What is infrastructure-as-code (IaC)?", "a": "IaC means managing cloud infrastructure using code (Terraform, Pulumi, or AWS CDK) instead of clicking through the console. It makes infrastructure reproducible, version-controlled, and disaster-recoverable. TodayInTech uses Terraform for all production infrastructure."},
        {"q": "How do I ensure 99.9% uptime for my SaaS?", "a": "Achieving 99.9% uptime requires multi-AZ deployment, auto-scaling groups, health checks and load balancing, automated failover for databases (RDS Multi-AZ), CDN for static assets, and continuous monitoring with alerting. TodayInTech designs for this from day one."},
        {"q": "What is serverless architecture and when should I use it?", "a": "Serverless (AWS Lambda, Google Cloud Functions) runs your code on-demand without managing servers, scaling automatically to zero cost when idle. It's ideal for event-driven workloads, APIs with spiky traffic, and scheduled background jobs."},
        {"q": "How does TodayInTech handle database backups and disaster recovery?", "a": "TodayInTech implements automated daily backups with point-in-time recovery, cross-region replication for critical data, and documented failover runbooks. Recovery Time Objectives (RTO) and Recovery Point Objectives (RPO) are agreed before launch."},
    ],
    # Set 10: White-Label Software
    [
        {"q": "What is white-label software?", "a": "White-label software is a pre-built product developed by one company and sold to another, which rebrands it under its own name. The buyer skips the cost and time of building from scratch and goes to market immediately."},
        {"q": "What are the advantages of white-label software for startups?", "a": "White-label software reduces launch time from months to weeks, cuts development cost by 60-80%, eliminates technology risk (the product is already proven), and lets founders focus on sales and growth instead of engineering."},
        {"q": "What is the difference between white-label and SaaS?", "a": "SaaS is rented and shared — you can't rebrand it or own it. White-label software is fully branded as yours, with complete IP ownership. You can resell it, customize it, and scale it without any licensing restrictions."},
        {"q": "What types of software can be white-labeled?", "a": "Common white-label products include telemedicine platforms, restaurant POS, school ERP, church management software, e-commerce backends, CRM systems, HR platforms, and AI chatbot builders. TodayInTech's SITES platform covers all of these."},
        {"q": "How long does it take to deploy a white-label software platform?", "a": "Standard white-label deployment (branding, domain, payment setup) takes 1-2 weeks. Full customization with feature additions takes 4-8 weeks — dramatically faster than custom development which takes 6-18 months."},
        {"q": "Can I add custom features to a white-label platform?", "a": "Yes. TodayInTech white-label products are modular and extensible. We can add custom workflows, new integrations, industry-specific features, and custom reporting dashboards to any base platform we deliver."},
        {"q": "How is white-label software priced?", "a": "TodayInTech prices white-label deployments as a one-time setup fee covering branding and configuration, plus optional monthly support. Unlike SaaS subscriptions, there are no per-user fees that grow with your customer base."},
        {"q": "What is the TodayInTech SITES platform?", "a": "SITES is TodayInTech's portfolio of white-label software products covering healthcare, hospitality, education, and enterprise verticals. Each SITES product is pre-built, HIPAA-ready where applicable, and deployable in weeks under your brand."},
    ],
    # Set 11: EHR/FHIR Integration
    [
        {"q": "What is the difference between an EHR and an EMR?", "a": "An EMR (Electronic Medical Record) is a digital version of a patient's chart within one practice. An EHR (Electronic Health Record) is designed to share patient data across multiple healthcare providers and organizations. EHR is the modern standard."},
        {"q": "What is HL7 FHIR and why does it matter?", "a": "HL7 FHIR (Fast Healthcare Interoperability Resources) is the international standard for healthcare data exchange using RESTful APIs and JSON. The 21st Century Cures Act mandates FHIR-based APIs for certified EHR systems in the USA, making it essential for any healthcare software."},
        {"q": "What EHR systems does TodayInTech integrate with?", "a": "TodayInTech integrates with Epic (via SMART on FHIR), Cerner (Millennium FHIR APIs), athenahealth, Allscripts, and eClinicalWorks. We handle sandbox access, FHIR resource mapping, and write-back workflows."},
        {"q": "What is SMART on FHIR?", "a": "SMART on FHIR combines OAuth 2.0 authorization with HL7 FHIR APIs to allow third-party apps to launch from within an EHR and access patient data securely. Epic and Cerner both support SMART on FHIR app launch contexts."},
        {"q": "How long does EHR integration take?", "a": "Read-only FHIR integration (fetching patient data) takes 4-8 weeks. Bidirectional integration with write-back (posting clinical notes, billing codes) takes 10-16 weeks, depending on EHR vendor sandbox access."},
        {"q": "What is a FHIR resource?", "a": "A FHIR Resource is a discrete unit of healthcare data — such as Patient, Observation, MedicationRequest, Encounter, or DiagnosticReport. FHIR APIs expose these resources as JSON objects queryable via RESTful HTTP requests."},
        {"q": "Can I build a patient portal that connects to an EHR?", "a": "Yes. Using SMART on FHIR, a patient portal can allow patients to view their own health records, lab results, medication lists, and appointment history pulled directly from their provider's EHR. TodayInTech builds EHR-connected patient portals."},
        {"q": "What is the 21st Century Cures Act?", "a": "The 21st Century Cures Act (2016, implemented 2022) prohibits information blocking in healthcare and mandates that certified EHR systems expose FHIR APIs so patients and third-party apps can freely access health data. This makes FHIR integration essential for all new health apps."},
    ],
    # Set 12: Agentic AI & Automation
    [
        {"q": "What is agentic AI for businesses?", "a": "Agentic AI refers to AI systems that autonomously execute multi-step business tasks — browsing the web, reading emails, updating CRMs, scheduling calls, and generating reports — without human intervention for each step. TodayInTech builds production agentic AI systems."},
        {"q": "What business processes can AI agents automate?", "a": "AI agents can automate lead qualification, customer support ticket routing, invoice processing, inventory reordering, social media posting, competitive monitoring, HR onboarding paperwork, and weekly business reporting — saving 20-40 hours per week per employee."},
        {"q": "What is the difference between RPA and AI agents?", "a": "RPA (Robotic Process Automation) automates rigid, rule-based workflows and breaks if the UI changes. AI agents are adaptive — they understand natural language instructions, handle exceptions intelligently, and can be retrained as processes evolve."},
        {"q": "What is LangGraph and how is it used in AI agent development?", "a": "LangGraph is a framework for building stateful multi-agent AI systems with LangChain. It models agent workflows as directed graphs, enabling complex reasoning chains, tool use, and human-in-the-loop approval steps. TodayInTech uses LangGraph for enterprise AI automations."},
        {"q": "Can an AI agent integrate with WhatsApp for business automation?", "a": "Yes. Using the WhatsApp Business API and an MCP (Model Context Protocol) server, AI agents can read incoming WhatsApp messages, qualify leads, answer FAQs, send follow-ups, and route escalations to human agents — all automatically."},
        {"q": "Is it safe to give AI agents access to business systems?", "a": "Yes, with proper design. TodayInTech implements least-privilege tool access, human-in-the-loop approval for high-stakes actions, full audit logs of every agent action, and rollback capabilities for any automated change."},
        {"q": "How much does it cost to build a custom AI agent?", "a": "A single-function AI agent (e.g., auto-responding to customer inquiries) costs $5,000-$15,000. A full multi-agent automation system with CRM integration, decision trees, and audit dashboards costs $25,000-$75,000."},
        {"q": "What is the Model Context Protocol (MCP) in AI development?", "a": "MCP (Model Context Protocol) is an open standard by Anthropic that defines how AI models securely connect to external tools, APIs, and data sources. It allows Claude, ChatGPT, and other LLMs to use your business software as tools. TodayInTech builds custom MCP servers."},
    ],
    # Set 13: Church Management
    [
        {"q": "What is a church management software (ChMS)?", "a": "A church management system (ChMS) is a software platform that helps churches manage their congregation database, online giving, volunteer scheduling, event registrations, child check-in safety, small groups, and fund accounting."},
        {"q": "What features should a church management system have?", "a": "Essential ChMS features include a people database (membership directory), online donation processing, recurring giving, contribution statements, event management, volunteer scheduling, child check-in, group management, and communication tools (email, SMS, app push)."},
        {"q": "How much does church management software cost?", "a": "Most off-the-shelf ChMS platforms charge $50-$300/month. TodayInTech builds custom or white-label church software starting at $15,000 — a one-time cost with no ongoing per-seat fees, cheaper than SaaS within 2 years."},
        {"q": "Can church software process online donations?", "a": "Yes. TodayInTech's church management platform integrates with Stripe for one-time and recurring online giving, including text-to-give, giving kiosks, and automatic annual contribution statements for tax purposes."},
        {"q": "What is child check-in software for churches?", "a": "Child check-in is a security system where parents register children via a kiosk or app, receive a printed matching label, and can only collect their child with that label match. TodayInTech's ChMS includes QR-code-based child check-in built in."},
        {"q": "Can the church platform manage multiple campuses?", "a": "Yes. TodayInTech builds multi-campus ChMS platforms with a unified people database, campus-specific event management, consolidated giving reports, and sermon streaming per campus."},
        {"q": "Does church software need to be GDPR compliant?", "a": "If your church has members in the EU or UK, yes — you must have a lawful basis for processing member personal data, provide opt-out mechanisms, and be able to respond to Subject Access Requests. TodayInTech builds GDPR-ready data management into all platforms."},
        {"q": "Can church management software integrate with QuickBooks?", "a": "Yes. TodayInTech's ChMS exports fund accounting data in QuickBooks-compatible format and can integrate directly with QuickBooks Online via API for real-time general ledger syncing of donations and expenses."},
    ],
    # Set 14: Senior Care ERP
    [
        {"q": "What is Electronic Visit Verification (EVV) in home care?", "a": "EVV is a federal mandate (21st Century CURES Act) requiring home care agencies to electronically verify the time, location, and type of care delivered by caregivers. TodayInTech's senior care platform uses GPS-based EVV built into the caregiver mobile app."},
        {"q": "What features does home care agency software need?", "a": "Essential home care software features include caregiver scheduling, GPS EVV compliance, electronic visit notes, family portal, payroll integration, Medicaid billing, incident reporting, and HIPAA-compliant records management."},
        {"q": "How much does senior care agency software cost?", "a": "A white-label home care ERP starts at $20,000-$50,000. A fully custom platform with EVV, billing integrations, and state-specific Medicaid compliance costs $60,000-$150,000. TodayInTech delivers working prototypes before any payment is required."},
        {"q": "Can home care software integrate with Medicaid billing?", "a": "Yes. TodayInTech's home care platform integrates with state Medicaid clearinghouses for 837P claim submission, 835 remittance processing, and real-time eligibility checks (270/271 transactions)."},
        {"q": "What is a family portal in senior care software?", "a": "A family portal is a secure app where relatives of a care recipient can view caregiver visit logs, read care notes, check medication administration records, and communicate with agency coordinators — providing peace of mind and transparency."},
        {"q": "How does GPS EVV work in a caregiver app?", "a": "When a caregiver arrives at a client's home, they clock in via the mobile app which captures their GPS coordinates. When they leave, they clock out. The platform compares GPS location and service type against the authorized care plan for EVV compliance."},
        {"q": "What is the difference between home care and home health software?", "a": "Home care software manages non-medical personal care (bathing, companionship, meal prep). Home health software manages skilled nursing and therapy delivered at home, requiring clinical documentation, physician order management, and OASIS assessment tools."},
        {"q": "Can TodayInTech build a custom senior care platform?", "a": "Yes. TodayInTech has delivered a full white-label Senior Care ERP with GPS EVV, family portal, Medicaid billing, and caregiver scheduling. Book a free demo to see the live platform."},
    ],
]


def pick_todays_faq_set():
    day_of_year = datetime.now().timetuple().tm_yday
    idx = (day_of_year - 1) % len(FAQ_BANK)
    return FAQ_BANK[idx]


def build_faq_schema(faqs):
    entities = []
    for faq in faqs:
        entities.append({
            "@type": "Question",
            "name": faq["q"],
            "acceptedAnswer": {"@type": "Answer", "text": faq["a"]}
        })
    return json.dumps({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": entities
    }, indent=2)


def build_faq_html_items(faqs):
    items = []
    for i, faq in enumerate(faqs):
        open_attr = " open" if i == 0 else ""
        items.append(
            f'          <details class="faq-item"{open_attr}>\n'
            f'            <summary class="faq-question">\n'
            f'              <span>{faq["q"]}</span>\n'
            f'              <span class="faq-icon"><i class="fas fa-plus"></i></span>\n'
            f'            </summary>\n'
            f'            <div class="faq-answer">\n'
            f'              <p>{faq["a"]}</p>\n'
            f'            </div>\n'
            f'          </details>'
        )
    return "\n\n".join(items)


def patch_index_html(faqs):
    with open(INDEX_HTML, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Replace FAQPage JSON-LD block
    new_schema = build_faq_schema(faqs)
    ld_pattern = re.compile(
        r'(<script type="application/ld\+json">\s*\{?\s*"@context":\s*"https://schema\.org"[^<]*?"@type":\s*"FAQPage".*?</script>)',
        re.DOTALL
    )
    new_ld_block = (
        '<script type="application/ld+json">\n'
        f'  {new_schema}\n'
        '  </script>'
    )
    # Use a callable replacement to avoid backslash interpretation in JSON
    _new_ld = new_ld_block
    _count = [0]
    def _replace_ld(m):
        if _count[0] < 1:
            _count[0] += 1
            return _new_ld
        return m.group(0)
    content = ld_pattern.sub(_replace_ld, content)
    n_schema = _count[0]
    if n_schema == 0:
        print("WARNING: FAQPage JSON-LD block not found — skipping schema replacement.")

    # 2. Replace faq-grid items
    new_faq_html = build_faq_html_items(faqs)
    grid_pattern = re.compile(
        r'(<div class="faq-grid reveal">)(.*?)(</div>\s*</div>\s*</section>)',
        re.DOTALL
    )

    def replace_grid(m):
        return m.group(1) + "\n\n" + new_faq_html + "\n        " + m.group(3)

    content, n_grid = re.subn(grid_pattern, replace_grid, content, count=1)
    if n_grid == 0:
        print("WARNING: faq-grid div not found — skipping HTML replacement.")

    with open(INDEX_HTML, "w", encoding="utf-8") as f:
        f.write(content)

    return n_schema > 0 or n_grid > 0


def run_git_commands():
    today = datetime.now().strftime("%Y-%m-%d")
    day_name = datetime.now().strftime("%A")
    os.chdir(ROOT_DIR)
    os.system("git add index.html llms.txt llms-full.txt public/llms.txt public/llms-full.txt")
    os.system(f'git commit -m "seo: daily FAQ rotation [{day_name} {today}]"')
    os.system("git push origin main")
    print("Pushed daily FAQ update to git.")


if __name__ == "__main__":
    print(f"Running daily FAQ rotation — {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    faqs = pick_todays_faq_set()
    print(f"Selected FAQ set starting with: '{faqs[0]['q'][:70]}...'")
    patched = patch_index_html(faqs)
    if patched:
        os.system(f"python3 {os.path.join(ROOT_DIR, 'scripts/generate_llms_txt.py')}")
        run_git_commands()
        print(f"Done. Rotated {len(faqs)} FAQs into homepage.")
    else:
        print("ERROR: Nothing patched. Check regex patterns vs current index.html structure.")
