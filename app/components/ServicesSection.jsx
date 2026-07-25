export default function ServicesSection() {
  return (
    <section id="services" className="services">
      <div className="container">
        <div className="section-header">
          <div className="section-label">Our Capabilities</div>
          <h2 className="section-title">Specialized Healthcare & SaaS Engineering</h2>
          <p className="section-subtitle">Pre-validated HIPAA modules combined with bespoke custom engineering.</p>
        </div>

        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon icon-blue"><i className="fas fa-notes-medical"></i></div>
            <h3>Telehealth & Telemedicine</h3>
            <p>Branded virtual care platforms with WebRTC video, e-prescriptions, patient portals, and SMART on FHIR EHR integration.</p>
            <div className="service-tags">
              <span className="service-tag">WebRTC</span>
              <span className="service-tag">HIPAA</span>
              <span className="service-tag">e-Prescribe</span>
            </div>
          </div>

          <div className="service-card">
            <div className="service-icon icon-purple"><i className="fas fa-graduation-cap"></i></div>
            <h3>School & Campus ERP</h3>
            <p>All-in-one White-label ERP for admissions, fee collections, report cards, parent mobile apps, and live GPS bus tracking.</p>
            <div className="service-tags">
              <span className="service-tag">GPS Bus</span>
              <span className="service-tag">Fee Gateway</span>
              <span className="service-tag">Parent App</span>
            </div>
          </div>

          <div className="service-card">
            <div className="service-icon icon-green"><i className="fas fa-boxes"></i></div>
            <h3>Inventory & Retail Billing</h3>
            <p>Multi-warehouse stock tracking, GST invoicing, barcode scanners, and automated POS SaaS platforms.</p>
            <div className="service-tags">
              <span className="service-tag">Barcode POS</span>
              <span className="service-tag">GST Invoice</span>
              <span className="service-tag">Multi-store</span>
            </div>
          </div>

          <div className="service-card">
            <div className="service-icon icon-red"><i className="fas fa-laptop-code"></i></div>
            <h3>Custom Healthcare SaaS</h3>
            <p>Scalable cloud architectures built for seed and Series A healthtech startups needing fast MVP turnaround.</p>
            <div className="service-tags">
              <span className="service-tag">AWS / GCP</span>
              <span className="service-tag">Next.js</span>
              <span className="service-tag">Node.js</span>
            </div>
          </div>

          <div className="service-card">
            <div className="service-icon icon-teal"><i className="fas fa-network-wired"></i></div>
            <h3>EHR / EMR & FHIR Integration</h3>
            <p>HL7 / FHIR API connectors linking custom software with Epic, Cerner, Athenahealth, and Practice Fusion.</p>
            <div className="service-tags">
              <span className="service-tag">HL7 FHIR</span>
              <span className="service-tag">Epic API</span>
              <span className="service-tag">Cerner</span>
            </div>
          </div>

          <div className="service-card">
            <div className="service-icon icon-orange"><i className="fas fa-robot"></i></div>
            <h3>AI Voice & Scribing Workflows</h3>
            <p>Ambient AI medical scribing, multi-agent SOAP note generation, and automated prior authorization agents.</p>
            <div className="service-tags">
              <span className="service-tag">Whisper AI</span>
              <span className="service-tag">SOAP Notes</span>
              <span className="service-tag">Agentic AI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
