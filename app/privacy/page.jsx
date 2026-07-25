export const metadata = {
  title: 'Privacy Policy — TodayInTech',
  description: 'TodayInTech Privacy Policy and data protection guidelines.',
};

export default function PrivacyPage() {
  return (
    <main style={{ padding: '120px 0 80px', background: '#ffffff' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 className="section-title">Privacy Policy</h1>
        <p style={{ color: '#64748b', marginBottom: '24px' }}>Last updated: July 25, 2026</p>
        <div style={{ lineHeight: '1.8', color: '#334155' }}>
          <p>TodayInTech ("we", "our", "us") respects your privacy. This policy describes how we collect, use, and protect your personal information when you visit todayintech.in or interact with our software services.</p>
          <h3 style={{ margin: '20px 0 10px', color: '#1e293b' }}>1. Information We Collect</h3>
          <p>We collect contact information (name, email address, phone number) when you submit inquiry forms, schedule strategy calls, or request project estimates.</p>
          <h3 style={{ margin: '20px 0 10px', color: '#1e293b' }}>2. Data Protection & HIPAA Safeguards</h3>
          <p>For client projects, all healthcare data is handled in strict compliance with HIPAA, SOC2 Type II, and ISO 27001 standards under signed Business Associate Agreements (BAAs).</p>
        </div>
      </div>
    </main>
  );
}
