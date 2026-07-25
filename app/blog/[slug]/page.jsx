import { getAllBlogs, getBlogBySlug } from '../../lib/blogs';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const blogs = getAllBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }) {
  const blog = getBlogBySlug(params.slug);
  if (!blog) return {};

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: 'article',
      url: `https://todayintech.in/blog/${blog.slug}`,
      publishedTime: blog.date,
    },
    alternates: {
      canonical: `https://todayintech.in/blog/${blog.slug}`,
    },
  };
}

export default function BlogPostPage({ params }) {
  const blog = getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <main style={{ padding: '120px 0 80px', background: '#ffffff', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div dangerouslySetInnerHTML={{ __html: blog.body }} />
      </div>
    </main>
  );
}
