import { loadPageContent } from '../lib/pageLoader';

export async function generateMetadata() {
  const page = loadPageContent('services/index.html');
  return {
    title: page.title || 'Services — TodayInTech',
    description: page.description || 'Our software engineering capabilities: Telemedicine, Healthcare SaaS, School ERP, POS billing.',
  };
}

export default function ServicesPage() {
  const page = loadPageContent('services/index.html');

  return (
    <main style={{ padding: '100px 0 60px' }}>
      <div dangerouslySetInnerHTML={{ __html: page.body }} />
    </main>
  );
}
