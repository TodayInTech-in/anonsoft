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
    <main style={{ background: '#ffffff', minHeight: '100vh', paddingTop: '80px' }}>
      {project.customCss && <link rel="stylesheet" href={project.customCss} />}
      <div dangerouslySetInnerHTML={{ __html: project.body }} />
    </main>
  );
}
