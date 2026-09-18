import ServicesSection from "../components/ServicesSection";
import TechStackSection from "../components/TechStackSection";
import PricingSection from "../components/PricingSection";
import CtaSection from "../components/CtaSection";

export const metadata = {
  title: "Services — Anonsoft Software Agency",
  description:
    "Anonsoft builds scalable custom software, HealthTech platforms, and EdTech solutions. Launch your branded MVP in weeks — not months. Trusted by 50+ brands worldwide.",
  keywords: [
    "custom software development",
    "edtech solutions",
    "healthtech software",
    "whitelabel software",
    "telemedicine app development",
    "elearning platform",
    "mobile app development",
    "saas development company",
  ],
  alternates: {
    canonical: "https://anonsoft.com/services",
  },
  openGraph: {
    title: "Software Development Services — Anonsoft",
    description:
      "Anonsoft builds scalable custom software, HealthTech platforms, and EdTech solutions. Launch your branded MVP in weeks.",
    url: "https://anonsoft.com/services",
    type: "website",
    images: [{ url: "https://anonsoft.com/assets/anon-soft-og.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services — Anonsoft Software Agency",
    description:
      "Anonsoft builds scalable custom software, HealthTech platforms, and EdTech solutions.",
    images: ["https://anonsoft.com/assets/anon-soft-og.png"],
  },
};

const jsonLdOrg = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Anonsoft",
  alternateName: ["Anonsoft", "Anonsoft Software", "Anonsoft Health Tech"],
  url: "https://anonsoft.com",
  logo: "https://anonsoft.com/assets/logo.png",
  image: "https://anonsoft.com/assets/anon-soft-og.png",
  description:
    "Anonsoft is a leading health white-label software development company specializing in telemedicine, EHR/EMR, pharmacy management, fitness apps, and HIPAA-compliant healthcare solutions.",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "50",
    bestRating: "5",
  },
};

const jsonLdService = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Anonsoft",
  image: "https://anonsoft.com/assets/logo.png",
  url: "https://anonsoft.com",
  telephone: "+91-7679349780",
  priceRange: "$$",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Software Development Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Health White-Label Software Development",
          description:
            "Custom white-label healthcare platforms including telemedicine, EHR/EMR, patient portals, and e-prescription systems.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Mobile App Development",
          description:
            "Cross-platform mobile apps using React Native and Flutter for healthcare, e-commerce, and enterprise solutions.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Web Application Development",
          description:
            "Modern SaaS platforms, admin dashboards, and customer portals built with React, Next.js, and Node.js.",
        },
      },
    ],
  },
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is health white-label software?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Health white-label software is a pre-built healthcare platform that can be rebranded and customized with your company logo, colors, and features. Anonsoft builds white-label solutions for telemedicine, EHR/EMR, pharmacy management, and patient portals.",
      },
    },
    {
      "@type": "Question",
      name: "Is Anonsoft HIPAA compliant?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, all healthcare products built by Anonsoft are HIPAA compliant with enterprise-grade security including end-to-end encryption, secure data storage, access controls, and audit logging.",
      },
    },
  ],
};

export default function ServicesPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      <section
        className="hero"
        style={{ padding: "120px 0 40px", textAlign: "center" }}
      >
        <div className="container">
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <span className="section-label">Enterprise Solutions</span>
            <h1
              className="hero-title"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                marginBottom: "24px",
              }}
            >
              Scalable <span className="gradient-text">Platforms</span>
              <br />
              Built for Impact
            </h1>
            <p
              style={{
                maxWidth: "600px",
                margin: "0 auto",
                color: "var(--text-secondary)",
                fontSize: "1.1rem",
                lineHeight: "1.6",
              }}
            >
              We don't just write code. We deliver end-to-end digital
              experiences designed to scale and convert.
            </p>
          </div>
        </div>
      </section>

      <ServicesSection />
      <TechStackSection />
      <PricingSection />
      <CtaSection />
    </main>
  );
}
