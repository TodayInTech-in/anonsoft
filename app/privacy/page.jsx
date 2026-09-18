import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Anonsoft",
  description:
    "Read Anonsoft's privacy policy to understand how we collect, store, and protect user data when using our website and custom software development services.",
  keywords: [
    "privacy policy anonsoft",
    "data protection",
    "software development privacy",
    "HIPAA compliant privacy",
  ],
  alternates: {
    canonical: "https://anonsoft.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy — Anonsoft",
    description:
      "Read Anonsoft's privacy policy to understand how we collect, store, and protect user data.",
    url: "https://anonsoft.com/privacy",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <main
      style={{
        padding: "120px 0 80px",
        background: "#ffffff",
        minHeight: "100vh",
      }}
    >
      <div className="container" style={{ maxWidth: "850px" }}>
        <div
          style={{
            textAlign: "left",
            marginBottom: "40px",
            borderBottom: "1px solid #e2e8f0",
            paddingBottom: "24px",
          }}
        >
          <span className="section-label" style={{ color: "#0369a1" }}>
            Legal Documents
          </span>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 800,
              fontFamily: "var(--font-display)",
              color: "#1e293b",
              marginTop: "8px",
            }}
          >
            Privacy Policy
          </h1>
          <p style={{ marginTop: "10px", fontSize: "1rem", color: "#64748b" }}>
            Last Updated: July 6, 2026
          </p>
        </div>

        <div style={{ color: "#334155", lineHeight: "1.8", fontSize: "1rem" }}>
          <p style={{ marginBottom: "20px" }}>
            At Anonsoft ("we," "our," or "us"), protecting your privacy is our
            top priority. This Privacy Policy details how we collect, store,
            share, and protect your personal information when you visit our
            website (
            <Link
              href="/"
              style={{ color: "#0369a1", textDecoration: "underline" }}
            >
              anonsoft.com
            </Link>
            ) or engage our custom software and mobile application development
            services.
          </p>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#1e293b",
              margin: "30px 0 15px",
            }}
          >
            1. Information We Collect
          </h2>
          <p style={{ marginBottom: "15px" }}>
            We collect information that you voluntarily provide to us and data
            collected automatically when you browse our website:
          </p>
          <ul
            style={{
              marginLeft: "20px",
              marginBottom: "20px",
              listStyleType: "disc",
            }}
          >
            <li style={{ marginBottom: "8px" }}>
              <strong>Personal Information:</strong> When you book a call,
              contact us, or register for services, we collect details such as
              your name, email address, phone number, and company name.
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>Project Scoping Data:</strong> Details about your software
              concept, design requirements, and budget details shared during
              consultations.
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>Usage Information:</strong> Cookies, IP address, browser
              type, operating system, and pages viewed during your visit to
              analyze website performance.
            </li>
          </ul>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#1e293b",
              margin: "30px 0 15px",
            }}
          >
            2. How We Use Your Information
          </h2>
          <p style={{ marginBottom: "15px" }}>
            We use your data strictly to improve our communication and deliver
            customized development solutions:
          </p>
          <ul
            style={{
              marginLeft: "20px",
              marginBottom: "20px",
              listStyleType: "disc",
            }}
          >
            <li style={{ marginBottom: "8px" }}>
              To schedule scoping and discovery calls.
            </li>
            <li style={{ marginBottom: "8px" }}>
              To design, prototype, and build your custom software applications.
            </li>
            <li style={{ marginBottom: "8px" }}>
              To communicate system updates, invoices, and answer technical
              support questions.
            </li>
            <li style={{ marginBottom: "8px" }}>
              To comply with legal obligations and security protocols.
            </li>
          </ul>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#1e293b",
              margin: "30px 0 15px",
            }}
          >
            3. Data Security & HIPAA Compliance
          </h2>
          <p style={{ marginBottom: "15px" }}>
            We maintain robust industry-standard safeguards to secure client and
            user data. For our digital health projects, we implement
            enterprise-grade HIPAA-compliant architectures:
          </p>
          <ul
            style={{
              marginLeft: "20px",
              marginBottom: "20px",
              listStyleType: "disc",
            }}
          >
            <li style={{ marginBottom: "8px" }}>
              End-to-end data encryption (AES-256 at rest and TLS 1.3 in
              transit).
            </li>
            <li style={{ marginBottom: "8px" }}>
              Multi-factor authentication (MFA) and granular, role-based access
              control.
            </li>
            <li style={{ marginBottom: "8px" }}>
              Business Associate Agreement (BAA) signing ready for health tech
              platforms.
            </li>
            <li style={{ marginBottom: "8px" }}>
              Detailed, immutable access logging and audit controls.
            </li>
          </ul>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#1e293b",
              margin: "30px 0 15px",
            }}
          >
            4. Third-Party Sharing
          </h2>
          <p style={{ marginBottom: "15px" }}>
            We do not sell, trade, or lease your personal information. We only
            share details with trusted third parties under strict
            confidentiality agreements to host our servers (such as AWS or
            Vercel) or manage scheduling widgets (like Calendly). We release
            information only when required by law or to protect user safety.
          </p>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#1e293b",
              margin: "30px 0 15px",
            }}
          >
            5. Cookies and Tracking
          </h2>
          <p style={{ marginBottom: "15px" }}>
            Our website uses cookies to store user preferences, analyze site
            traffic, and optimize load speeds. You can disable cookies inside
            your individual browser settings; however, some sections of our
            interactive website may not load optimally as a result.
          </p>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#1e293b",
              margin: "30px 0 15px",
            }}
          >
            6. Your Data Rights
          </h2>
          <p style={{ marginBottom: "15px" }}>
            Depending on your jurisdiction, you have the right to request access
            to the personal data we hold about you, request corrections to
            incorrect details, or ask for the complete deletion of your records.
            To execute these rights, contact us at the details below.
          </p>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#1e293b",
              margin: "30px 0 15px",
            }}
          >
            7. Contact Us
          </h2>
          <p style={{ marginBottom: "15px" }}>
            If you have any questions regarding this Privacy Policy, your data
            handling, or wish to update your records, please contact us at:
          </p>
          <p style={{ marginBottom: "5px" }}>
            <strong>Email:</strong>{" "}
            <a href="mailto:contact@anonsoft.com" style={{ color: "#0369a1" }}>
              contact@anonsoft.com
            </a>
          </p>
          <p style={{ marginBottom: "5px" }}>
            <strong>Phone:</strong>{" "}
            <a href="tel:+919007900972" style={{ color: "#0369a1" }}>
              +91 7679349780
            </a>
          </p>
          <p style={{ marginBottom: "5px" }}>
            <strong>Address:</strong> Salt Lake Sector V, Kolkata, West Bengal,
            India
          </p>
        </div>
      </div>
    </main>
  );
}
