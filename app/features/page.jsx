import { loadPageContent } from '../lib/pageLoader';

export async function generateMetadata() {
  const page = loadPageContent('features/index.html');
  return {
    title: page.title || 'Platform Features — TodayInTech',
    description: page.description || 'Explore our full platform features, modular architecture, and security capabilities.',
  };
}

export default function FeaturesPage() {
  const page = loadPageContent('features/index.html');

  return (
    <main style={{ padding: '100px 0 60px' }}>
      <div dangerouslySetInnerHTML={{ __html: page.body }} />
    </main>
  );
}
