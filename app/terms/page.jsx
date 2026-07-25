export const metadata = {
  title: 'Terms of Service — TodayInTech',
  description: 'TodayInTech Terms of Service.',
};

export default function TermsPage() {
  return (
    <main style={{ padding: '120px 0 80px', background: '#ffffff' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 className="section-title">Terms of Service</h1>
        <p style={{ color: '#64748b', marginBottom: '24px' }}>Last updated: July 25, 2026</p>
        <div style={{ lineHeight: '1.8', color: '#334155' }}>
          <p>By using the website todayintech.in or engaging our software services, you agree to these Terms of Service.</p>
          <h3 style={{ margin: '20px 0 10px', color: '#1e293b' }}>1. Zero Upfront Prototype Guarantee</h3>
          <p>Under our Zero Upfront Payment model, initial prototypes are built and demonstrated prior to billing. Final deliverables and source code transfers occur upon agreed milestone payments.</p>
          <h3 style={{ margin: '20px 0 10px', color: '#1e293b' }}>2. Intellectual Property</h3>
          <p>Upon full payment of agreed project fees, clients retain 100% full ownership of all custom source code, databases, and intellectual property developed for their project.</p>
        </div>
      </div>
    </main>
  );
}
