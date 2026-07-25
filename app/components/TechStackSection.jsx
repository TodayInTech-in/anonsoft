export default function TechStackSection() {
  const stack = [
    { name: 'React / Next.js', icon: 'fab fa-react' },
    { name: 'Node.js', icon: 'fab fa-node-js' },
    { name: 'Python / FastAPI', icon: 'fab fa-python' },
    { name: 'AWS / Docker', icon: 'fab fa-aws' },
    { name: 'WebRTC Video', icon: 'fas fa-video' },
    { name: 'HL7 / FHIR', icon: 'fas fa-notes-medical' },
    { name: 'PostgreSQL', icon: 'fas fa-database' },
    { name: 'OpenAI / Whisper', icon: 'fas fa-brain' }
  ];

  return (
    <section className="tech-stack">
      <div className="container">
        <div className="section-header">
          <div className="section-label">Technologies</div>
          <h2 className="section-title">Modern, Scalable Tech Stack</h2>
        </div>

        <div className="tech-grid">
          {stack.map((t, idx) => (
            <div key={idx} className="tech-item">
              <i className={`${t.icon} tech-item-icon`} style={{ color: 'var(--primary)' }}></i>
              <span className="tech-item-name">{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
