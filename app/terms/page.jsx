import Link from "next/link";

export const metadata = {
  title: "Terms of Service — Anonsoft",
  description:
    "Read Anonsoft's terms of service detailing conditions for using our website, custom software, and AI mobile app development services.",
  keywords: [
    "terms of service anonsoft",
    "custom software terms",
    "payment prototype contract",
  ],
  alternates: {
    canonical: "https://anonsoft.com/terms",
  },
  openGraph: {
    title: "Terms of Service — Anonsoft",
    description:
      "Read Anonsoft's terms of service detailing conditions for using our website and services.",
    url: "https://anonsoft.com/terms",
    type: "website",
  },
};

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p style={{ marginTop: "10px", fontSize: "1rem", color: "#64748b" }}>
            Last Updated: July 6, 2026
          </p>
        </div>

        <div style={{ color: "#334155", lineHeight: "1.8", fontSize: "1rem" }}>
          <p style={{ marginBottom: "20px" }}>
            Welcome to Anonsoft. These Terms of Service ("Terms") govern your
            use of our website (
            <Link
              href="/"
              style={{ color: "#0369a1", textDecoration: "underline" }}
            >
              anonsoft.com
            </Link>
            ) and our software, application, and web development services. By
            accessing our website or hiring our development services, you agree
            to comply with and be bound by these Terms.
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
            1. Services Offered
          </h2>
          <p style={{ marginBottom: "15px" }}>
            Anonsoft provides custom software engineering, mobile application
            development (iOS, Android), web development, and AI integration
            services. Our unique business model offers a{" "}
            <strong>Zero Upfront Payment (Prototype First)</strong> policy:
          </p>
          <ul
            style={{
              marginLeft: "20px",
              marginBottom: "20px",
              listStyleType: "disc",
            }}
          >
            <li style={{ marginBottom: "8px" }}>
              We scope your project requirements and build a functional working
              prototype at no cost.
            </li>
            <li style={{ marginBottom: "8px" }}>
              Upon delivery, you review the prototype. If you approve and wish
              to complete the full project development, you agree to make the
              designated milestone payments under your individual project
              agreement.
            </li>
            <li style={{ marginBottom: "8px" }}>
              If you reject the prototype, you have no financial obligation, and
              the project terminates immediately.
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
            2. Intellectual Property (IP) Rights
          </h2>
          <p style={{ marginBottom: "15px" }}>
            Intellectual Property ownership is structured as follows:
          </p>
          <ul
            style={{
              marginLeft: "20px",
              marginBottom: "20px",
              listStyleType: "disc",
            }}
          >
            <li style={{ marginBottom: "8px" }}>
              <strong>Boilerplates and Modules:</strong> Anonsoft retains all
              rights, titles, and interest in pre-existing boilerplates,
              pre-built design libraries, code templates, and framework modules
              used to accelerate project builds.
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>Custom Code Ownership:</strong> Upon receipt of full and
              final project payment, Anonsoft transfers all ownership rights of
              the custom-written source code, custom branding, and custom
              databases to the Client.
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>Prototype Copyright:</strong> During the prototype scoping
              and review phase, all code and designs remain the exclusive
              property of Anonsoft. The client may not copy, reverse-engineer,
              or deploy the prototype code without written authorization.
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
            3. Client Obligations
          </h2>
          <p style={{ marginBottom: "15px" }}>
            To ensure on-time delivery, clients must cooperate reasonably during
            development, including:
          </p>
          <ul
            style={{
              marginLeft: "20px",
              marginBottom: "20px",
              listStyleType: "disc",
            }}
          >
            <li style={{ marginBottom: "8px" }}>
              Providing clear, timely requirements, assets, and copy.
            </li>
            <li style={{ marginBottom: "8px" }}>
              Providing necessary access credentials (e.g., API keys, hosting
              credentials) securely.
            </li>
            <li style={{ marginBottom: "8px" }}>
              Adhering to agreed milestone feedback cycles.
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
            4. Payment Terms
          </h2>
          <p style={{ marginBottom: "15px" }}>
            Clients are billed based on milestones outlined in their Statement
            of Work (SOW) after prototype approval. Late payments may result in
            suspension of services or hosting. We accept major wire transfers,
            credit cards, and verified payment gateways.
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
            5. Limitation of Liability
          </h2>
          <p style={{ marginBottom: "15px" }}>
            In no event shall Anonsoft, its directors, employees, or developers,
            be liable for any indirect, incidental, special, or consequential
            damages (including loss of profits, data, or business use) arising
            out of your use of our website or custom developments. Our total
            liability under any contract is capped at the total amount paid by
            the Client to us for the specific project.
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
            6. Governing Law
          </h2>
          <p style={{ marginBottom: "15px" }}>
            These Terms shall be governed by and construed in accordance with
            the laws of West Bengal, India, without regard to conflict of law
            principles. Any dispute arising under these Terms shall be subject
            to the exclusive jurisdiction of the courts located in Kolkata,
            India.
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
            7. Modification of Terms
          </h2>
          <p style={{ marginBottom: "15px" }}>
            We reserve the right to modify these Terms at any time. When changes
            are made, we will update the "Last Updated" date at the top of this
            page. Your continued use of our website or services after changes
            constitute your acceptance of the updated terms.
          </p>
        </div>
      </div>
    </main>
  );
}
