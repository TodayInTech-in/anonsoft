import { loadPageContent } from '../lib/pageLoader';

export async function generateMetadata() {
  const page = loadPageContent('health/index.html');
  return {
    title: page.title || 'HealthTech Solutions — TodayInTech',
    description: page.description || 'HIPAA-compliant telemedicine, EHR, RPM, and health software platforms.',
  };
}

export default function HealthPage() {
  const page = loadPageContent('health/index.html');

  return (
    <main style={{ padding: '100px 0 60px' }}>
      <div dangerouslySetInnerHTML={{ __html: page.body }} />
    </main>
  );
}
