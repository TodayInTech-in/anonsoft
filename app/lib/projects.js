import fs from 'fs';
import path from 'path';

const PROJECTS_DIR = path.join(process.cwd(), 'projects');

export function getAllProjects() {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  const files = fs.readdirSync(PROJECTS_DIR);
  const projects = [];

  for (const file of files) {
    if (!file.endsWith('.html') || file === 'index.html') continue;
    const filePath = path.join(PROJECTS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    const slug = file.replace('.html', '');
    const titleMatch = content.match(/<title>(.*?)<\/title>/i);
    const descMatch = content.match(/<meta\s+name="description"\s+content="(.*?)"/i);
    const ogImageMatch = content.match(/<meta\s+property="og:image"\s+content="(.*?)"/i);
    const keywordsMatch = content.match(/<meta\s+name="keywords"\s+content="(.*?)"/i);
    const jsonLdMatch = content.match(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/i);

    const title = titleMatch ? titleMatch[1].replace(' | Anonsoft', '').replace(' | Anonsoft SITES', '') : slug;
    const description = descMatch ? descMatch[1] : '';
    const ogImage = ogImageMatch ? ogImageMatch[1] : 'https://anonsoft.com/assets/anon-soft-og.png';
    const keywords = keywordsMatch ? keywordsMatch[1].split(',').map((k) => k.trim()) : [];
    const jsonLd = jsonLdMatch ? jsonLdMatch[1] : null;

    let body = content;
    const mainMatch = content.match(/<main[\s\S]*?<\/main>/i);
    if (mainMatch) {
      body = mainMatch[0].replace(/^<main[\s\S]*?>/i, '').replace(/<\/main>$/i, '');
    } else {
      const bodyMatch = content.match(/<body[\s\S]*?<\/body>/i);
      if (bodyMatch) {
        body = bodyMatch[0]
          .replace(/^<body[\s\S]*?>/i, '')
          .replace(/<\/body>$/i, '')
          .replace(/<header[\s\S]*?<\/header>/gi, '')
          .replace(/<footer[\s\S]*?<\/footer>/gi, '')
          .replace(/<script[\s\S]*?<\/script>/gi, '');
      }
    }

    // Fix asset and link paths inside project pages
    body = body
      .replace(/src="\.\.\/assets\//g, 'src="/assets/')
      .replace(/src="assets\//g, 'src="/assets/')
      .replace(/href="\.\.\/assets\//g, 'href="/assets/')
      .replace(/href="\.\.\/projects\//g, 'href="/projects/')
      .replace(/href="\.\.\//g, 'href="/');

    // Check if project has dedicated CSS stylesheet
    let customCss = null;
    if (content.includes('church-management.css')) customCss = '/projects/church-management.css';
    if (content.includes('restaurant-management.css')) customCss = '/projects/restaurant-management.css';
    if (content.includes('school-management.css')) customCss = '/projects/school-management.css';
    if (content.includes('senior-care.css')) customCss = '/projects/senior-care.css';

    projects.push({
      slug,
      title,
      description,
      ogImage,
      keywords,
      jsonLd,
      body,
      customCss,
    });
  }

  return projects;
}

export function getProjectBySlug(slug) {
  const projects = getAllProjects();
  return projects.find((p) => p.slug === slug);
}

