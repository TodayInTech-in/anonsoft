import fs from 'fs';
import path from 'path';

const PROJECTS_DIR = path.join(process.cwd(), 'projects');

export function getAllProjects() {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  const files = fs.readdirSync(PROJECTS_DIR);
  const projects = [];

  for (const file of files) {
    if (!file.endsWith('.html') || file === 'index.html' || file.includes('demo')) continue;
    const filePath = path.join(PROJECTS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    const slug = file.replace('.html', '');
    const titleMatch = content.match(/<title>(.*?)<\/title>/i);
    const descMatch = content.match(/<meta\s+name="description"\s+content="(.*?)"/i);

    const title = titleMatch ? titleMatch[1].replace(' | TodayInTech', '') : slug;
    const description = descMatch ? descMatch[1] : '';

    let body = content;
    const mainMatch = content.match(/<main[\s\S]*?<\/main>/i);
    if (mainMatch) {
      body = mainMatch[0];
    }

    projects.push({
      slug,
      title,
      description,
      body,
    });
  }

  return projects;
}

export function getProjectBySlug(slug) {
  const projects = getAllProjects();
  return projects.find((p) => p.slug === slug);
}
