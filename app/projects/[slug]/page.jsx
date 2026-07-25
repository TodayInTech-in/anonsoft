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
    openGraph: {
      title: project.title,
      description: project.description,
      url: `https://todayintech.in/projects/${project.slug}`,
    },
    alternates: {
      canonical: `https://todayintech.in/projects/${project.slug}`,
    },
  };
}

export default function ProjectPage({ params }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main style={{ padding: '120px 0 80px', background: '#ffffff', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div dangerouslySetInnerHTML={{ __html: project.body }} />
      </div>
    </main>
  );
}
