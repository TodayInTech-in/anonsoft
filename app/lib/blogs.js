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

    const title = titleMatch ? titleMatch[1].replace(' | TodayInTech', '') : slug;
    const description = descMatch ? descMatch[1] : '';
    const category = categoryMatch ? categoryMatch[1] : 'Healthcare Software';
    const date = dateMatch ? dateMatch[1] : '2026-07-25';

    // Extract article content inside <article class="post-content"> or <main>
    let body = content;
    const articleMatch = content.match(/<article[\s\S]*?<\/article>/i);
    if (articleMatch) {
      body = articleMatch[0];
    }

    blogs.push({
      slug,
      title,
      description,
      category,
      date,
      body,
    });
  }

  return blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getBlogBySlug(slug) {
  const blogs = getAllBlogs();
  return blogs.find((b) => b.slug === slug);
}
