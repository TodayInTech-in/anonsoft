#!/usr/bin/env python3
import os
import re
import sys
from datetime import datetime

# Add scripts directory to path to import auto_blog template
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
try:
    from auto_blog import BLOG_TEMPLATE
except ImportError:
    # Fallback template if import fails
    BLOG_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} | TodayInTech</title>
  <meta name="description" content="{excerpt}">
  <link rel="canonical" href="https://todayintech.in/blog/{slug}.html">
  <link rel="stylesheet" href="../style.css">
  <link rel="stylesheet" href="../liquid-glass.css">
  <link rel="stylesheet" href="blog-post.css">
</head>
<body>
  <main class="blog-post-main">
    <article class="blog-post-container">
      <div class="post-header">
        <span class="post-category">{category}</span>
        <span class="post-date">{published_date}</span>
        <h1>{title}</h1>
      </div>
      <div class="post-body">{content}</div>
    </article>
  </main>
</body>
</html>"""

def parse_frontmatter(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Match frontmatter block (YAML) between the first two '---' markers
    match = re.match(r'^---\r?\n(.*?)\r?\n---\r?\n(.*)$', content, re.DOTALL)
    if not match:
        return {}, content
    
    frontmatter_text = match.group(1)
    body_text = match.group(2)
    
    metadata = {}
    for line in frontmatter_text.split('\n'):
        if ':' in line:
            key, val = line.split(':', 1)
            key = key.strip()
            val = val.strip().strip('"').strip("'")
            if val.startswith('[') and val.endswith(']'):
                # Simple list parsing
                val = [item.strip().strip('"').strip("'") for item in val[1:-1].split(',')]
            metadata[key] = val
            
    return metadata, body_text

def format_inline_markdown(text):
    # Bold: **text** or __text__
    text = re.sub(r'\*\*(.*?)\*\*|__(.*?)__', lambda m: f'<strong>{m.group(1) or m.group(2)}</strong>', text)
    # Inline code: `code`
    text = re.sub(r'`(.*?)`', r'<code>\1</code>', text)
    # Links: [text](url)
    text = re.sub(r'\[(.*?)\]\((.*?)\)', r'<a href="\2">\1</a>', text)
    return text

def markdown_to_html(text):
    lines = text.split('\n')
    html_lines = []
    
    in_list = None  # 'ul', 'ol', or None
    in_quote = False
    paragraph_accum = []
    
    for line in lines:
        stripped = line.strip()
        
        # Close lists and paragraphs if we hit an empty line
        if not stripped:
            if paragraph_accum:
                p_text = format_inline_markdown(' '.join(paragraph_accum))
                html_lines.append(f'<p>{p_text}</p>')
                paragraph_accum = []
            if in_list:
                html_lines.append(f'</{in_list}>')
                in_list = None
            if in_quote:
                html_lines.append('</blockquote>')
                in_quote = False
            continue
            
        # Check for horizontal rules
        if stripped in ['---', '***', '___']:
            if paragraph_accum:
                p_text = format_inline_markdown(' '.join(paragraph_accum))
                html_lines.append(f'<p>{p_text}</p>')
                paragraph_accum = []
            if in_list:
                html_lines.append(f'</{in_list}>')
                in_list = None
            if in_quote:
                html_lines.append('</blockquote>')
                in_quote = False
            html_lines.append('<hr>')
            continue
            
        # Headers
        header_match = re.match(r'^(#+)\s+(.*)$', stripped)
        if header_match:
            if paragraph_accum:
                p_text = format_inline_markdown(' '.join(paragraph_accum))
                html_lines.append(f'<p>{p_text}</p>')
                paragraph_accum = []
            if in_list:
                html_lines.append(f'</{in_list}>')
                in_list = None
            if in_quote:
                html_lines.append('</blockquote>')
                in_quote = False
                
            level = len(header_match.group(1))
            header_text = format_inline_markdown(header_match.group(2))
            html_lines.append(f'<h{level}>{header_text}</h{level}>')
            continue
            
        # Blockquotes
        if stripped.startswith('>'):
            if paragraph_accum:
                p_text = format_inline_markdown(' '.join(paragraph_accum))
                html_lines.append(f'<p>{p_text}</p>')
                paragraph_accum = []
            if in_list:
                html_lines.append(f'</{in_list}>')
                in_list = None
            if not in_quote:
                html_lines.append('<blockquote>')
                in_quote = True
            
            quote_text = stripped.lstrip('>').strip()
            quote_text = format_inline_markdown(quote_text)
            html_lines.append(f'<p>{quote_text}</p>')
            continue
            
        # Ordered lists
        ol_match = re.match(r'^(\d+)\.\s+(.*)$', stripped)
        if ol_match:
            if paragraph_accum:
                p_text = format_inline_markdown(' '.join(paragraph_accum))
                html_lines.append(f'<p>{p_text}</p>')
                paragraph_accum = []
            if in_quote:
                html_lines.append('</blockquote>')
                in_quote = False
            if in_list and in_list != 'ol':
                html_lines.append(f'</{in_list}>')
                in_list = None
            if not in_list:
                html_lines.append('<ol>')
                in_list = 'ol'
                
            item_text = format_inline_markdown(ol_match.group(2))
            html_lines.append(f'  <li>{item_text}</li>')
            continue
            
        # Unordered lists
        ul_match = re.match(r'^([-\*])\s+(.*)$', stripped)
        if ul_match:
            if paragraph_accum:
                p_text = format_inline_markdown(' '.join(paragraph_accum))
                html_lines.append(f'<p>{p_text}</p>')
                paragraph_accum = []
            if in_quote:
                html_lines.append('</blockquote>')
                in_quote = False
            if in_list and in_list != 'ul':
                html_lines.append(f'</{in_list}>')
                in_list = None
            if not in_list:
                html_lines.append('<ul>')
                in_list = 'ul'
                
            item_text = format_inline_markdown(ul_match.group(2))
            html_lines.append(f'  <li>{item_text}</li>')
            continue
            
        # Regular text
        if in_list:
            html_lines.append(f'</{in_list}>')
            in_list = None
        if in_quote:
            quote_text = format_inline_markdown(stripped)
            html_lines.append(f'<p>{quote_text}</p>')
        else:
            paragraph_accum.append(stripped)
            
    # Flush remaining
    if paragraph_accum:
        p_text = format_inline_markdown(' '.join(paragraph_accum))
        html_lines.append(f'<p>{p_text}</p>')
    if in_list:
        html_lines.append(f'</{in_list}>')
    if in_quote:
        html_lines.append('</blockquote>')
        
    return '\n'.join(html_lines)

def compile_markdown_files():
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    src_dir = os.path.join(root_dir, 'src', 'content', 'blog')
    dest_dir = os.path.join(root_dir, 'blog')
    
    if not os.path.exists(src_dir):
        print(f"Error: Source directory {src_dir} does not exist.")
        return
        
    os.makedirs(dest_dir, exist_ok=True)
    
    # Track redirect requirements
    redirects = {
        'transform-your-congregation-the-ultimate-guide-to-church-man': 'transform-your-congregation-the-ultimate-guide-to-church-management-software',
        'unlocking-potential-the-benefits-of-white-label-telehealth-s': 'unlocking-potential-the-benefits-of-white-label-telehealth-solutions',
        'unlocking-success-with-white-label-hotel-management-solution': 'unlocking-success-with-white-label-hotel-management-solutions',
        'unlocking-the-future-of-healthcare-a-deep-dive-into-white-la': 'unlocking-the-future-of-healthcare-a-deep-dive-into-white-label-telehealth',
        'unlocking-the-future-of-healthcare-with-white-label-teleheal': 'unlocking-the-future-of-healthcare-with-white-label-telehealth-solutions'
    }
    
    # Process all markdown files
    for entry in os.scandir(src_dir):
        if entry.is_file() and entry.name.endswith('.md'):
            slug = entry.name[:-3]
            metadata, body = parse_frontmatter(entry.path)
            
            title = metadata.get('title', slug.replace('-', ' ').title())
            desc = metadata.get('description', title)
            keywords = metadata.get('keywords', [])
            
            # Map category based on metadata or keywords/slug
            if 'category' in metadata and metadata['category']:
                category = metadata['category']
            else:
                category = "Technology Insights"
                slug_lower = slug.lower()
                if any(k in slug_lower for k in ['telehealth', 'teleheal', 'healthcare']):
                    category = "Healthcare Technology"
                elif 'church' in slug_lower:
                    category = "SaaS Solutions"
                elif 'hotel' in slug_lower:
                    category = "Hospitality Tech"
                elif any(k in slug_lower for k in ['bhagyaraj', 'seeman']):
                    category = "Regional Insights"
                elif any(k in slug_lower for k in ['voice', 'speech', 'ai', 'tts']):
                    category = "AI Solutions"
            
            # Map image based on category/slug
            image = "software_prototype.png"
            if category == "Healthcare Technology":
                image = "white_label_health.png"
            elif category in ["AI Solutions", "AI & SaaS Solutions"]:
                image = "ai_agent_medical.png"
            elif category == "Regional Insights":
                image = "software_prototype.png"
            elif category == "SaaS Solutions" or category == "Hospitality Tech":
                image = "white_label_vs_custom.png"
                
            # Date formatting
            date_str = metadata.get('date', datetime.now().strftime('%Y-%m-%d'))
            try:
                date_obj = datetime.strptime(date_str, '%Y-%m-%d')
                formatted_date = date_obj.strftime('%B %d, %Y')
                current_year = date_obj.strftime('%Y')
            except ValueError:
                formatted_date = date_str
                current_year = datetime.now().strftime('%Y')
                
            # Calculate read time (rough estimate: 200 words per minute)
            word_count = len(body.split())
            read_time = max(1, round(word_count / 200))
            
            # Convert markdown body to HTML
            html_content = markdown_to_html(body)
            
            # Construct standard template
            formatted_html = BLOG_TEMPLATE.format(
                title=title,
                excerpt=desc,
                slug=slug,
                image=image,
                category=category,
                read_time=read_time,
                content=html_content,
                published_date=formatted_date,
                current_year=current_year,
                faq_schema='{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[]}',
                faq_html=''
            )
            
            # Write to output HTML file
            out_path = os.path.join(dest_dir, f"{slug}.html")
            with open(out_path, 'w', encoding='utf-8') as f:
                f.write(formatted_html)
            print(f"Compiled markdown to blog page: {out_path}")
            
    # Write redirect HTML files for the old truncated URLs
    for old_slug, new_slug in redirects.items():
        redirect_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Redirecting…</title>
<link rel="canonical" href="https://todayintech.in/blog/{new_slug}.html">
<meta http-equiv="refresh" content="0;url=/blog/{new_slug}.html">
</head>
<body>
<p>This page has moved. <a href="/blog/{new_slug}">Click here</a> to read the updated article.</p>
</body>
</html>
"""
        redirect_path = os.path.join(dest_dir, f"{old_slug}.html")
        with open(redirect_path, 'w', encoding='utf-8') as f:
            f.write(redirect_html)
        print(f"Generated 301 redirect shell: {redirect_path} -> {new_slug}")

if __name__ == '__main__':
    compile_markdown_files()
