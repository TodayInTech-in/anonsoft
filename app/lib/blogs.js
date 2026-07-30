import fs from 'fs';
import path from 'path';

const BLOG_DIR = path.join(process.cwd(), 'blog');

export function getAllBlogs() {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR);
  const blogs = [];

  for (const file of files) {
    if (!file.endsWith('.html') || file === 'index.html') continue;
    const filePath = path.join(BLOG_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    // Skip redirect shells
    if (content.includes('http-equiv="refresh"') || content.includes('Redirecting')) continue;

    const slug = file.replace('.html', '');
    const titleMatch = content.match(/<title>(.*?)<\/title>/i);
    const descMatch = content.match(/<meta\s+name="description"\s+content="(.*?)"/i);
    const categoryMatch = content.match(/<meta\s+property="article:section"\s+content="(.*?)"/i);
    const dateMatch = content.match(/<meta\s+property="article:published_time"\s+content="(.*?)"/i);
    const ogImageMatch = content.match(/<meta\s+property="og:image"\s+content="(.*?)"/i);
    const keywordsMatch = content.match(/<meta\s+name="keywords"\s+content="(.*?)"/i);
    const jsonLdMatch = content.match(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/i);

    const title = titleMatch ? titleMatch[1].replace(' | TodayInTech', '').replace(' | Today In Tech', '') : slug;
    const description = descMatch ? descMatch[1] : '';
    const category = categoryMatch ? categoryMatch[1] : 'Healthcare Software';
    const date = dateMatch ? dateMatch[1] : '2026-07-25';
    const ogImage = ogImageMatch ? ogImageMatch[1] : 'https://todayintech.in/assets/og-image.png';
    const keywords = keywordsMatch ? keywordsMatch[1].split(',').map((k) => k.trim()) : [];
    const jsonLd = jsonLdMatch ? jsonLdMatch[1] : null;

    // Extract article content inside <article class="post-content"> or <main>
    let body = content;
    const articleMatch = content.match(/<article[\s\S]*?<\/article>/i);
    if (articleMatch) {
      body = articleMatch[0];
    }

    // Fix relative asset paths inside blog HTML
    body = body
      .replace(/src="\.\.\/assets\//g, 'src="/assets/')
      .replace(/src="assets\//g, 'src="/assets/')
      .replace(/href="\.\.\/assets\//g, 'href="/assets/')
      .replace(/href="\.\.\/blog\//g, 'href="/blog/')
      .replace(/href="\.\.\//g, 'href="/');

    blogs.push({
      slug,
      title,
      description,
      category,
      date,
      ogImage,
      keywords,
      jsonLd,
      body,
    });
  }

  return blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getBlogBySlug(slug) {
  const blogs = getAllBlogs();
  return blogs.find((b) => b.slug === slug);
}

