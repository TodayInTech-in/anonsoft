import { loadPageContent } from './lib/pageLoader';
import SocialProofToast from './components/SocialProofToast';

export async function generateMetadata() {
  const page = loadPageContent('index.html');
  return {
    title: page.title || 'TodayInTech — Custom Startup Software Development Agency',
    description:
      page.description ||
      'We help startups launch scalable software quickly: SaaS platforms, AI tools, and mobile apps—production-ready in weeks. Book a free strategy call.',
  };
}

export default function HomePage() {
  const page = loadPageContent('index.html');

  return (
    <>
      <SocialProofToast />
      <div dangerouslySetInnerHTML={{ __html: page.body }} />
    </>
  );
}
