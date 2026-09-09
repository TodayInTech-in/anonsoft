import Link from 'next/link';

export const metadata = {
  title: 'Refund & Cancellation Policy — Anonsoft',
  description:
    'Read Anonsoft\'s refund and cancellation policy regarding project cancellations, prototype verification, and milestone refund details.',
  keywords: [
    'refund policy anonsoft',
    'cancellation fee',
    'prototype trial cancel',
    'client payment refund',
  ],
  alternates: {
    canonical: 'https://anonsoft.in/refund-policy',
  },
  openGraph: {
    title: 'Refund & Cancellation Policy — Anonsoft',
    description:
      'Read Anonsoft\'s refund and cancellation policy regarding project cancellations and prototype verification.',
    url: 'https://anonsoft.in/refund-policy',
    type: 'website',
  },
};

export default function RefundPolicyPage() {
  return (
    <main style={{ padding: '120px 0 80px', background: '#ffffff', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '850px' }}>
        <div
          style={{
            textAlign: 'left',
            marginBottom: '40px',
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: '24px',
          }}
        >
          <span className="section-label" style={{ color: '#0369a1' }}>Legal Documents</span>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 800,
              fontFamily: 'var(--font-display)',
              color: '#1e293b',
              marginTop: '8px',
            }}
          >
            Refund & Cancellation Policy
          </h1>
          <p style={{ marginTop: '10px', fontSize: '1rem', color: '#64748b' }}>
            Last Updated: July 6, 2026
          </p>
        </div>

        <div style={{ color: '#334155', lineHeight: '1.8', fontSize: '1rem' }}>
          <p style={{ marginBottom: '20px' }}>
            We want you to feel completely confident when working with Anonsoft. This Refund & Cancellation Policy outlines the refund terms and cancellation rights associated with our custom software, app, and website development services.
          </p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: '#1e293b', margin: '30px 0 15px' }}>
            1. Prototype Verification Phase
          </h2>
          <p style={{ marginBottom: '15px' }}>
            Our standard custom software and application builds begin with a <strong>Zero Upfront Payment (Prototype First)</strong> phase:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '20px', listStyleType: 'disc' }}>
            <li style={{ marginBottom: '8px' }}>
              We scope your project requirements and develop a clickable, functional working prototype without requesting a deposit.
            </li>
            <li style={{ marginBottom: '8px' }}>
              If you review the prototype and decide not to move forward, you can cancel the project immediately with zero cost. No fees are charged, and no contract is signed.
            </li>
          </ul>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: '#1e293b', margin: '30px 0 15px' }}>
            2. Milestone Cancellation Policy
          </h2>
          <p style={{ marginBottom: '15px' }}>
            Once you approve the prototype and we execute the contract to build the full application, the project is structured in billing milestones (e.g. Database Setup, UI Design, Beta Release, App Store Submission):
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '20px', listStyleType: 'disc' }}>
            <li style={{ marginBottom: '8px' }}>
              <strong>Cancellation Request:</strong> You may cancel development at any milestone by sending a written notice to <a href="mailto:contact@anonsoft.in" style={{ color: '#0369a1' }}>contact@anonsoft.in</a>.
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Milestone Progress:</strong> Upon receipt of a cancellation notice, we will immediately halt all development. The Client is billed only for the specific milestone phase currently in progress on a pro-rata basis. Previous completed and approved milestones are non-cancelable and non-refundable.
            </li>
          </ul>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: '#1e293b', margin: '30px 0 15px' }}>
            3. Refund Eligibility
          </h2>
          <p style={{ marginBottom: '15px' }}>
            Refund eligibility is governed by the following guidelines:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '20px', listStyleType: 'disc' }}>
            <li style={{ marginBottom: '8px' }}>
              <strong>Work in Progress:</strong> Payments made for active milestones are refundable only if Anonsoft fails to deliver the specified milestones in the contract without reasonable cause.
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Completed Deliverables:</strong> Approved and delivered milestones (where source code or beta builds have been shared with the client) are non-refundable as they represent manual engineering hours completed.
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Licensing/Boilerplates:</strong> Subscriptions or pre-purchased hosting plans, domain registrations, or third-party API fees (such as OpenAI, Apple Developer accounts, or Google Play accounts) are paid directly to third parties and are completely non-refundable.
            </li>
          </ul>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: '#1e293b', margin: '30px 0 15px' }}>
            4. Refund Execution
          </h2>
          <p style={{ marginBottom: '15px' }}>
            If a refund is approved by Anonsoft under your project contract, it will be processed and returned to your original payment method (wire transfer or credit card) within <strong>7 to 14 business days</strong>, depending on bank processing delays.
          </p>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: '#1e293b', margin: '30px 0 15px' }}>
            5. Contact for Cancellation or Refund
          </h2>
          <p style={{ marginBottom: '15px' }}>
            To request a project cancellation, check your billing details, or inquire about a refund, contact us at:
          </p>
          <p style={{ marginBottom: '5px' }}>
            <strong>Email:</strong> <a href="mailto:contact@anonsoft.in" style={{ color: '#0369a1' }}>contact@anonsoft.in</a>
          </p>
          <p style={{ marginBottom: '5px' }}>
            <strong>Phone:</strong> <a href="tel:+919007900972" style={{ color: '#0369a1' }}>+91 7679349780</a>
          </p>
        </div>
      </div>
    </main>
  );
}
