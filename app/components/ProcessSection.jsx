export default function ProcessSection() {
  const steps = [
    { step: '01', title: 'Discovery & Scope', desc: 'We align on features, fixed scope, and technical roadmap.' },
    { step: '02', title: 'Architecture & Design', desc: 'UI/UX Figma wireframes & HIPAA security specification.' },
    { step: '03', title: 'Zero Upfront Prototype', desc: 'We build your working prototype first. You inspect before paying.' },
    { step: '04', title: 'Launch & IP Transfer', desc: 'Deployment to AWS/GCP and 100% source code ownership transfer.' }
  ];

  return (
    <section className="process">
      <div className="container">
        <div className="section-header">
          <div className="section-label">How We Work</div>
          <h2 className="section-title">Simple 4-Step Zero-Risk Delivery</h2>
        </div>

        <div className="process-steps">
          {steps.map((s, idx) => (
            <div key={idx} className="process-step">
              <div className="process-step-number">{s.step}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
