import Link from 'next/link';

export const metadata = {
  title: 'Launch a Branded Telemedicine Experience for Your Clinic — In 30 Days',
  description:
    'HIPAA-compliant telemedicine software for medical practices and clinic networks. Integrated video consults, patient portals, and EHR integration with zero upfront payment.',
};

export default function TelemedicineClinicPage() {
  return (
    <main style={{ padding: '120px 0 80px', background: '#ffffff' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="section-label">Clinic Telemedicine Solution</div>
          <h1 className="section-title">Branded Virtual Care Infrastructure for US Clinics</h1>
          <p className="section-subtitle">
            Deploy a fully branded, HIPAA-compliant virtual care suite in 30 days. No monthly per-provider seat fees.
          </p>
        </div>

        <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '36px', marginBottom: '40px' }}>
          <h2 style={{ color: '#1e293b', marginBottom: '16px', fontSize: '1.5rem' }}>Key Features Included</h2>
          <ul style={{ listStyle: 'disc', paddingLeft: '24px', lineHeight: '1.8', color: '#334155' }}>
            <li>WebRTC Encrypted HD Video Consultations</li>
            <li>Digital Patient Intake Forms & Custom Questionnaires</li>
            <li>SMART on FHIR Integration with Epic, Cerner, and Athenahealth</li>
            <li>Integrated Patient Billing (Stripe / Insurance Processing)</li>
            <li>Automated SMS & Email Appointment Reminders</li>
            <li>100% Full Source Code Ownership</li>
          </ul>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link href="/#contact" className="btn-primary" style={{ display: 'inline-block' }}>
            Get Your Free HIPAA Strategy Session &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
}
