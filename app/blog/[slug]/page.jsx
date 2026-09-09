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
    keywords: blog.keywords && blog.keywords.length > 0 ? blog.keywords : undefined,
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: 'article',
      url: `https://anonsoft.in/blog/${blog.slug}`,
      publishedTime: blog.date,
      images: [{ url: blog.ogImage || 'https://anonsoft.com/assets/anon-soft-og.png' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.description,
      images: [blog.ogImage || 'https://anonsoft.com/assets/anon-soft-og.png'],
    },
    alternates: {
      canonical: `https://anonsoft.in/blog/${blog.slug}`,
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
      {blog.jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: blog.jsonLd }}
        />
      )}
      <div className="container" style={{ maxWidth: '800px' }}>
        <div dangerouslySetInnerHTML={{ __html: blog.body }} />
      </div>
    </main>
  );
}

