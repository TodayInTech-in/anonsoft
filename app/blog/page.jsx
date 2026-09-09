import Link from 'next/link';
import { getAllBlogs } from '../lib/blogs';

export const metadata = {
  title: 'Blog — Health Tech Insights, App Development Guides & Digital Health Trends',
  description:
    'Explore Anonsoft’s blog for expert insights on telemedicine app development, EHR/EMR integration, HIPAA compliance, white-label healthcare software, and digital health trends in 2026.',
};

export default function BlogIndexPage() {
  const blogs = getAllBlogs();

  return (
    <main className="blog-post-container" style={{ padding: '120px 0 80px' }}>
      <div className="container">
        <header style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="section-label">Health Tech & Software Insights</div>
          <h1 className="section-title">Anonsoft Blog</h1>
          <p className="section-subtitle">
            Guides on telemedicine, EHR integration, HIPAA compliance, white-label software, and 2026 healthcare trends.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
          {blogs.map((post) => (
            <article
              key={post.slug}
              style={{
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                transition: 'transform 0.2s ease, border-color 0.2s ease',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600' }}>
                    {post.category}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{post.date}</span>
                </div>
                <h2 style={{ fontSize: '1.2rem', color: '#1e293b', fontWeight: '700', marginBottom: '10px', lineHeight: '1.4' }}>
                  <Link href={`/blog/${post.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {post.title}
                  </Link>
                </h2>
                <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.6', marginBottom: '20px' }}>
                  {post.description}
                </p>
              </div>

              <Link
                href={`/blog/${post.slug}`}
                style={{
                  display: 'inline-block',
                  color: '#0369a1',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                }}
              >
                Read Full Article &rarr;
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
