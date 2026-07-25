import { loadPageContent } from '../lib/pageLoader';

export async function generateMetadata() {
  const page = loadPageContent('ai/index.html');
  return {
    title: page.title || 'AI Tools & Engineering — TodayInTech',
    description: page.description || 'AI-driven workflow automation, medical scribe tools, and custom LLM integrations.',
  };
}

export default function AiPage() {
  const page = loadPageContent('ai/index.html');

  return (
    <main>
      <div dangerouslySetInnerHTML={{ __html: page.body }} />
    </main>
  );
}
