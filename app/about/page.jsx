import { loadPageContent } from '../lib/pageLoader';

export async function generateMetadata() {
  const page = loadPageContent('about/index.html');
  return {
    title: page.title || 'About Us — TodayInTech',
    description: page.description || 'Learn about TodayInTech, our mission, MSME registration, and leadership team.',
  };
}

export default function AboutPage() {
  const page = loadPageContent('about/index.html');

  return (
    <main>
      <div dangerouslySetInnerHTML={{ __html: page.body }} />
    </main>
  );
}
