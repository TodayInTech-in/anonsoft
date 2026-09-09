#!/usr/bin/env python3
import os
import re
from datetime import datetime

DOMAIN = "https://anonsoft.in"

def xml_escape(text):
    """Escape XML special characters in string."""
    if not text:
        return ""
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;").replace("'", "&apos;")

def is_redirect_file(file_path):
    """Check if an HTML file is a refresh redirect shell."""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        return "http-equiv=\"refresh\"" in content or "Redirecting" in content
    except Exception:
        return False

def get_html_title_desc(file_path):
    """Parse title and description from an HTML file."""
    title, desc = "", ""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        title_match = re.search(r"<title>(.*?)</title>", content, re.IGNORECASE)
        if title_match:
            title = title_match.group(1).replace(" | Anonsoft", "").replace(" — Anonsoft Software Agency", "")
            
        desc_match = re.search(r"<meta\s+name=\"description\"\s+content=\"(.*?)\"", content, re.IGNORECASE)
        if not desc_match:
            desc_match = re.search(r"<meta\s+property=\"og:description\"\s+content=\"(.*?)\"", content, re.IGNORECASE)
        if desc_match:
            desc = desc_match.group(1)
    except Exception:
        pass
    return title or os.path.basename(file_path), desc

def generate_sitemaps():
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    
    # 1. Scan core subdirectories for index.html
    core_dirs = ['services', 'features', 'about', 'health', 'ai', 'careers', 'contact', 'free-consultation']
    core_urls = []
    
    # Homepage
    homepage_path = os.path.join(root_dir, 'index.html')
    if os.path.exists(homepage_path):
        core_urls.append((f"{DOMAIN}/", "weekly", "1.0", "2026-07-22"))
        
    for cdir in core_dirs:
        index_path = os.path.join(root_dir, cdir, 'index.html')
        if os.path.exists(index_path):
            priority = "0.9" if cdir in ['services', 'features', 'health', 'free-consultation'] else "0.8"
            core_urls.append((f"{DOMAIN}/{cdir}/", "monthly", priority, "2026-07-22"))
            
    # 2. Scan projects directory
    project_urls = []
    projects_dir = os.path.join(root_dir, 'projects')
    if os.path.isdir(projects_dir):
        for entry in os.scandir(projects_dir):
            if entry.is_file() and entry.name.endswith('.html'):
                if entry.name == 'index.html' or 'demo' in entry.name:
                    continue
                project_urls.append((f"{DOMAIN}/projects/{entry.name[:-5]}", "monthly", "0.8", "2026-06-30"))
                
    # 3. Scan blog directory (excluding index.html and redirect shells)
    blog_urls = []
    blog_dir = os.path.join(root_dir, 'blog')
    
    # Scan Markdown files in src/content/blog/ to get titles, descriptions, and dates
    markdown_blogs = []
    src_dir = os.path.join(root_dir, 'src', 'content', 'blog')
    if os.path.isdir(src_dir):
        for entry in os.scandir(src_dir):
            if entry.is_file() and entry.name.endswith('.md'):
                slug = entry.name[:-3]
                # Read frontmatter
                try:
                    with open(entry.path, "r", encoding="utf-8") as f:
                        content = f.read()
                    fm_match = re.match(r'^---\r?\n(.*?)\r?\n---\r?\n(.*)$', content, re.DOTALL)
                    if fm_match:
                        fm_text = fm_match.group(1)
                        metadata = {}
                        for line in fm_text.split('\n'):
                            if ':' in line:
                                k, v = line.split(':', 1)
                                metadata[k.strip()] = v.strip().strip('"').strip("'")
                                
                        date_str = metadata.get('date', '2026-07-22')
                        title = metadata.get('title', slug.replace('-', ' ').title())
                        desc = metadata.get('description', title)
                        markdown_blogs.append({
                            'slug': slug,
                            'title': title,
                            'desc': desc,
                            'date': date_str
                        })
                except Exception as e:
                    print(f"Error parsing markdown metadata for {entry.name}: {e}")

    # Scan HTML files in blog/
    if os.path.isdir(blog_dir):
        for entry in os.scandir(blog_dir):
            if entry.is_file() and entry.name.endswith('.html'):
                if entry.name == 'index.html' or entry.name == 'blog-post.css':
                    continue
                # Skip redirects
                if is_redirect_file(entry.path):
                    continue
                
                slug = entry.name[:-5]
                # Find matching markdown date, or default
                date_str = "2026-07-22"
                title, desc = get_html_title_desc(entry.path)
                for mb in markdown_blogs:
                    if mb['slug'] == slug:
                        date_str = mb['date']
                        title = mb['title']
                        desc = mb['desc']
                        break
                        
                blog_urls.append((f"{DOMAIN}/blog/{slug}", "monthly", "0.9", date_str, title, desc))
                
    # Sort urls
    core_urls.sort(key=lambda x: x[0])
    project_urls.sort(key=lambda x: x[0])
    blog_urls.sort(key=lambda x: x[3], reverse=True) # Sort blogs by date descending
    
    # ────────────── Write root sitemap.xml ──────────────
    sitemap_xml_path = os.path.join(root_dir, 'sitemap.xml')
    with open(sitemap_xml_path, 'w', encoding='utf-8') as f:
        f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
        f.write('<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n')
        f.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n')
        f.write('        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n')
        f.write('        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n')
        f.write('        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n\n')
        
        f.write('  <!-- ===== CORE PAGES ===== -->\n')
        for url, freq, pri, date in core_urls:
            f.write('  <url>\n')
            f.write(f'    <loc>{xml_escape(url)}</loc>\n')
            f.write(f'    <lastmod>{date}</lastmod>\n')
            f.write(f'    <changefreq>{freq}</changefreq>\n')
            f.write(f'    <priority>{pri}</priority>\n')
            f.write('  </url>\n')
            
        f.write('\n  <!-- ===== PROJECTS ===== -->\n')
        for url, freq, pri, date in project_urls:
            f.write('  <url>\n')
            f.write(f'    <loc>{xml_escape(url)}</loc>\n')
            f.write(f'    <lastmod>{date}</lastmod>\n')
            f.write(f'    <changefreq>{freq}</changefreq>\n')
            f.write(f'    <priority>{pri}</priority>\n')
            f.write('  </url>\n')
            
        f.write('\n  <!-- ===== BLOG POSTS ===== -->\n')
        for url, freq, pri, date, _, _ in blog_urls:
            f.write('  <url>\n')
            f.write(f'    <loc>{xml_escape(url)}</loc>\n')
            f.write(f'    <lastmod>{date}</lastmod>\n')
            f.write(f'    <changefreq>{freq}</changefreq>\n')
            f.write(f'    <priority>{pri}</priority>\n')
            f.write('  </url>\n')
            
        f.write('</urlset>\n')
    print(f"Generated root sitemap: {sitemap_xml_path}")
    
    # Copy root sitemap to public/sitemap.xml for safety, normalizing localhost links
    public_sitemap_path = os.path.join(root_dir, 'public', 'sitemap.xml')
    with open(public_sitemap_path, 'w', encoding='utf-8') as f:
        # Same contents as root sitemap
        with open(sitemap_xml_path, 'r', encoding='utf-8') as sf:
            f.write(sf.read())
    print(f"Copied root sitemap to: {public_sitemap_path}")
    
    # Sync assets directory to public/assets
    import shutil
    src_assets = os.path.join(root_dir, 'assets')
    dst_assets = os.path.join(root_dir, 'public', 'assets')
    if os.path.exists(src_assets):
        os.makedirs(dst_assets, exist_ok=True)
        shutil.copytree(src_assets, dst_assets, dirs_exist_ok=True)
        print("Synced assets/ to public/assets/")
    
    # ────────────── Write public/sitemap-blog.xml ──────────────
    sitemap_blog_path = os.path.join(root_dir, 'public', 'sitemap-blog.xml')
    with open(sitemap_blog_path, 'w', encoding='utf-8') as f:
        f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
        f.write('<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n')
        f.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')
        
        for url, freq, pri, date, _, _ in blog_urls:
            f.write('  <url>\n')
            f.write(f'    <loc>{xml_escape(url)}</loc>\n')
            f.write(f'    <lastmod>{date}</lastmod>\n')
            f.write(f'    <changefreq>{freq}</changefreq>\n')
            f.write(f'    <priority>{pri}</priority>\n')
            f.write('  </url>\n')
            
        f.write('</urlset>\n')
    print(f"Generated blog sitemap: {sitemap_blog_path}")
    
    # ────────────── Write sitemap-index.xml ──────────────
    sitemap_index_path = os.path.join(root_dir, 'sitemap-index.xml')
    with open(sitemap_index_path, 'w', encoding='utf-8') as f:
        f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
        f.write('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')
        f.write('  <sitemap>\n')
        f.write(f'    <loc>{DOMAIN}/sitemap.xml</loc>\n')
        f.write('  </sitemap>\n')
        f.write('  <sitemap>\n')
        f.write(f'    <loc>{DOMAIN}/public/sitemap-blog.xml</loc>\n')
        f.write('  </sitemap>\n')
        f.write('</sitemapindex>\n')
    print(f"Generated sitemap index: {sitemap_index_path}")
    
    # ────────────── Write RSS Feed public/feed.xml ──────────────
    feed_path = os.path.join(root_dir, 'public', 'feed.xml')
    with open(feed_path, 'w', encoding='utf-8') as f:
        f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
        f.write('<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n')
        f.write('  <channel>\n')
        f.write('    <title>Anonsoft Blog</title>\n')
        f.write(f'    <link>{DOMAIN}</link>\n')
        f.write('    <description>Latest custom software engineering, virtual care compliance, and product builder insights from Anonsoft.</description>\n')
        f.write('    <language>en-us</language>\n')
        f.write(f'    <atom:link href="{DOMAIN}/public/feed.xml" rel="self" type="application/rss+xml"/>\n')
        
        # Output latest 15 blogs in feed
        for url, _, _, date, title, desc in blog_urls[:15]:
            # Convert date to RFC-822 format (e.g. Sat, 27 Jun 2026 09:40:00 +0000)
            try:
                date_obj = datetime.strptime(date, '%Y-%m-%d')
                pub_date = date_obj.strftime('%a, %d %b %Y 00:00:00 +0000')
            except Exception:
                pub_date = date
                
            f.write('    <item>\n')
            f.write(f'      <title>{xml_escape(title)}</title>\n')
            f.write(f'      <link>{xml_escape(url)}</link>\n')
            f.write(f'      <description>{xml_escape(desc)}</description>\n')
            f.write(f'      <pubDate>{pub_date}</pubDate>\n')
            f.write(f'      <guid isPermaLink="true">{xml_escape(url)}</guid>\n')
            f.write('    </item>\n')
            
        f.write('  </channel>\n')
        f.write('</rss>\n')
    print(f"Generated RSS feed: {feed_path}")

if __name__ == '__main__':
    generate_sitemaps()
