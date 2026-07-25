import { loadPageContent } from '../lib/pageLoader';

export async function generateMetadata() {
  const page = loadPageContent('agents/index.html');
  return {
    title: page.title || 'AI Autonomous Agents — TodayInTech',
    description: page.description || 'Agentic AI automation for clinical documentation, RCM, and prior authorization.',
  };
}

export default function AgentsPage() {
  const page = loadPageContent('agents/index.html');

  return (
    <main style={{ padding: '100px 0 60px' }}>
      <div dangerouslySetInnerHTML={{ __html: page.body }} />
    </main>
  );
}
