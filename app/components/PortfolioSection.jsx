import Link from 'next/link';

export default function PortfolioSection() {
  const projects = [
    {
      slug: 'mednowna',
      category: 'Telemedicine',
      title: 'MedNow Telehealth Platform',
      description: 'White-label virtual consultation suite built for multi-specialty clinics in the US.',
      image: '/assets/project-telemedicine.png',
      tech: ['WebRTC', 'HIPAA', 'Stripe', 'React']
    },
    {
      slug: 'senior-care-agency',
      category: 'Home Care',
      title: 'Senior Care EVV Agency ERP',
      description: 'GPS visit verification, caregiver scheduling, and family portal app.',
      image: '/assets/project-senior-care.png',
      tech: ['EVV GPS', 'Mobile App', 'Node.js']
    },
    {
      slug: 'impakto',
      category: '3D WebGL',
      title: 'Impakto 3D Product Configurator',
      description: 'Real-time Three.js interactive product customization suite for web.',
      image: '/assets/project/impakto.png',
      tech: ['Three.js', 'WebGL', 'React']
    },
    {
      slug: 'vocal-flow',
      category: 'AI Voice',
      title: 'Vocal Flow AI Voice Cloning',
      description: 'Autonomous voice agent platform for customer service automation.',
      image: '/assets/project/vocal-flow.png',
      tech: ['Whisper AI', 'Python', 'FastAPI']
    }
  ];

  return (
    <section id="projects" className="portfolio">
      <div className="container">
        <div className="section-header">
          <div className="section-label">Selected Case Studies</div>
          <h2 className="section-title">Battle-Tested Digital Products</h2>
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
