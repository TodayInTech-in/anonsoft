import { loadPageContent } from '../lib/pageLoader';

export async function generateMetadata() {
  const page = loadPageContent('careers/index.html');
  return {
    title: page.title || 'Careers — TodayInTech',
    description: page.description || 'Join TodayInTech engineering team building next-generation healthtech and AI software.',
  };
}

export default function CareersPage() {
  const page = loadPageContent('careers/index.html');

  return (
    <main>
      <div dangerouslySetInnerHTML={{ __html: page.body }} />
    </main>
  );
}
