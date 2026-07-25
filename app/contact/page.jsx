import { loadPageContent } from '../lib/pageLoader';

export async function generateMetadata() {
  const page = loadPageContent('contact/index.html');
  return {
    title: page.title || 'FAQ & Contact — TodayInTech',
    description: page.description || 'Get in touch with TodayInTech. Schedule a free strategy call or request a fixed quote.',
  };
}

export default function ContactPage() {
  const page = loadPageContent('contact/index.html');

  return (
    <main>
      <div dangerouslySetInnerHTML={{ __html: page.body }} />
    </main>
  );
}
