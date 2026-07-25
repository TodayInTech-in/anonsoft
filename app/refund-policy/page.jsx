export const metadata = {
  title: 'Refund Policy — TodayInTech',
  description: 'TodayInTech Refund and Cancellation Policy.',
};

export default function RefundPolicyPage() {
  return (
    <main style={{ padding: '120px 0 80px', background: '#ffffff' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 className="section-title">Refund & Cancellation Policy</h1>
        <p style={{ color: '#64748b', marginBottom: '24px' }}>Last updated: July 25, 2026</p>
        <div style={{ lineHeight: '1.8', color: '#334155' }}>
          <p>Because TodayInTech operates on a zero upfront payment model for prototype builds, clients review working software before making payments.</p>
          <h3 style={{ margin: '20px 0 10px', color: '#1e293b' }}>1. Milestone Refunds</h3>
          <p>If you are dissatisfied with a milestone build prior to final acceptance, you may request project cancellation with zero obligation to proceed.</p>
        </div>
      </div>
    </main>
  );
}
