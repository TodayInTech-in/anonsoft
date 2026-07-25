import fs from 'fs';
import path from 'path';

export function loadPageContent(relativeHtmlPath) {
  const fullPath = path.join(process.cwd(), relativeHtmlPath);
  if (!fs.existsSync(fullPath)) return { title: '', description: '', body: '' };

  const content = fs.readFileSync(fullPath, 'utf-8');

  const titleMatch = content.match(/<title>(.*?)<\/title>/i);
  const descMatch = content.match(/<meta\s+name="description"\s+content="(.*?)"/i);

  const title = titleMatch ? titleMatch[1].replace(' | TodayInTech', '') : '';
  const description = descMatch ? descMatch[1] : '';

  let body = content;
  // Extract content inside <main> if present
  const mainMatch = content.match(/<main[\s\S]*?<\/main>/i);
  if (mainMatch) {
    body = mainMatch[0];
  } else {
    // Or extract content inside <body> excluding header/footer if present
    const bodyMatch = content.match(/<body[\s\S]*?<\/body>/i);
    if (bodyMatch) {
      body = bodyMatch[0]
        .replace(/<header[\s\S]*?<\/header>/gi, '')
        .replace(/<footer[\s\S]*?<\/footer>/gi, '')
        .replace(/<script[\s\S]*?<\/script>/gi, '');
    }
  }

  return { title, description, body };
}
