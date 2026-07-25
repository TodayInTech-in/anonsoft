import { loadPageContent } from '../lib/pageLoader';

export async function generateMetadata() {
  const page = loadPageContent('free-consultation/index.html');
  return {
    title: page.title || 'Book Free Strategy Call — TodayInTech',
    description: page.description || 'Schedule a 30-minute strategy session to review your software roadmap and prototype scope.',
  };
}

export default function FreeConsultationPage() {
  const page = loadPageContent('free-consultation/index.html');

  return (
    <main style={{ padding: '100px 0 60px' }}>
      <div dangerouslySetInnerHTML={{ __html: page.body }} />
    </main>
  );
}
