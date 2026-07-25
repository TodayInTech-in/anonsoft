import Link from 'next/link';

export const metadata = {
  title: 'From Idea to Investor-Ready Healthcare MVP in 8 Weeks',
  description:
    'Healthcare SaaS MVP development for pre-seed and seed startups. HIPAA by default, investor-pitch-ready architecture, and zero upfront payment prototype model.',
};

export default function HealthcareMvpPage() {
  return (
    <main style={{ padding: '120px 0 80px', background: '#ffffff' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="section-label">HealthTech Startup Partner</div>
          <h1 className="section-title">Investor-Ready Healthcare SaaS MVPs in 8 Weeks</h1>
          <p className="section-subtitle">
            Fixed scope, HIPAA-compliant cloud architecture, and zero upfront payment guarantee.
          </p>
        </div>

        <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '36px', marginBottom: '40px' }}>
          <h2 style={{ color: '#1e293b', marginBottom: '16px', fontSize: '1.5rem' }}>MVP Development Benefits</h2>
          <ul style={{ listStyle: 'disc', paddingLeft: '24px', lineHeight: '1.8', color: '#334155' }}>
            <li>Zero Upfront Payment — Review working prototype before committing</li>
            <li>Built-in Security: BAA, Encryption, Audit Logs, Role-Based Access</li>
            <li>Scalable Microservices Architecture on AWS / GCP</li>
            <li>Complete Source Code & IP Transfer</li>
          </ul>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link href="/#contact" className="btn-primary" style={{ display: 'inline-block' }}>
            Tell Us About Your MVP Idea &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
}
