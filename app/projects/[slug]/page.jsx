import { getAllProjects, getProjectBySlug } from '../../lib/projects';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    keywords: project.keywords && project.keywords.length > 0 ? project.keywords : undefined,
    openGraph: {
      title: project.title,
      description: project.description,
      url: `https://anonsoft.in/projects/${project.slug}`,
      images: [{ url: project.ogImage || 'https://anonsoft.com/assets/anon-soft-og.png' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [project.ogImage || 'https://anonsoft.com/assets/anon-soft-og.png'],
    },
    alternates: {
      canonical: `https://anonsoft.in/projects/${project.slug}`,
    },
  };
}

export default function ProjectPage({ params }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main style={{ background: '#ffffff', minHeight: '100vh', paddingTop: '80px' }}>
      {project.customCss && <link rel="stylesheet" href={project.customCss} />}
      {project.jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: project.jsonLd }}
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: project.body }} />
    </main>
  );
}

