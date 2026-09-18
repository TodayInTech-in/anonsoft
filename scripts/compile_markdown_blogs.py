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
  <title>{title} | Anonsoft</title>
  <meta name="description" content="{excerpt}">
  <link rel="canonical" href="https://anonsoft.com/blog/{slug}.html">
  <link rel="icon" type="image/x-icon" href="/assets/favicon.ico">
  <link rel="apple-touch-icon" href="/assets/favicon.ico">
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
    # Images: ![alt](url)
    text = re.sub(r'!\[(.*?)\]\((.*?)\)', r'<img src="\2" alt="\1" class="blog-inline-img" style="max-width:100%;height:auto;border-radius:16px;margin:1.5rem 0;box-shadow:0 8px 30px rgba(0,0,0,0.12);" loading="lazy">', text)
    # Bold: **text** or __text__
    text = re.sub(r'\*\*(.*?)\*\*|__(.*?)__', lambda m: f'<strong>{m.group(1) or m.group(2)}</strong>', text)
    # Inline code: `code`
    text = re.sub(r'`(.*?)`', r'<code>\1</code>', text)
    # Links: [text](url)
    text = re.sub(r'(?<!\!)\[(.*?)\]\((.*?)\)', r'<a href="\2">\1</a>', text)
    return text

def markdown_to_html(text):
    lines = text.split('\n')
    html_lines = []
    
    in_list = None  # 'ul', 'ol', or None
    in_quote = False
    in_code = False
    in_table = False
    code_block_accum = []
    paragraph_accum = []
    table_rows = []
    
    def flush_paragraph():
        nonlocal paragraph_accum
        if paragraph_accum:
            p_text = format_inline_markdown(' '.join(paragraph_accum))
            html_lines.append(f'<p>{p_text}</p>')
            paragraph_accum = []
            
    def flush_list():
        nonlocal in_list
        if in_list:
            html_lines.append(f'</{in_list}>')
            in_list = None
            
    def flush_quote():
        nonlocal in_quote
        if in_quote:
            html_lines.append('</blockquote>')
            in_quote = False

    def flush_table():
        nonlocal in_table, table_rows
        if in_table:
            if table_rows:
                html_lines.append('<div class="tech-table"><table>')
                # Determine header row
                header_row = table_rows[0]
                html_lines.append('  <thead>\n    <tr>')
                for cell in header_row:
                    html_lines.append(f'      <th>{cell}</th>')
                html_lines.append('    </tr>\n  </thead>')
                
                # Body rows
                if len(table_rows) > 1:
                    html_lines.append('  <tbody>')
                    for row in table_rows[1:]:
                        html_lines.append('    <tr>')
                        for cell in row:
                            html_lines.append(f'      <td>{cell}</td>')
                        html_lines.append('    </tr>')
                    html_lines.append('  </tbody>')
                html_lines.append('</table></div>')
            table_rows = []
            in_table = False

    for line in lines:
        stripped = line.strip()
        
        # 1. Handle code blocks
        if stripped.startswith('```'):
            if in_code:
                # End of code block
                code_content = '\n'.join(code_block_accum)
                # Escape code content
                code_content = code_content.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
                # check if code content looks like mermaid diagram
                if in_code == 'mermaid':
                    html_lines.append(f'<div class="mermaid-diagram" style="margin: 2rem 0; text-align: center;"><pre class="mermaid">{code_content}</pre></div>')
                else:
                    html_lines.append(f'<pre><code class="language-{in_code}">{code_content}</code></pre>')
                in_code = False
                code_block_accum = []
            else:
                # Start of code block
                flush_paragraph()
                flush_list()
                flush_quote()
                flush_table()
                lang = stripped[3:].strip() or 'text'
                in_code = lang
            continue
            
        if in_code:
            code_block_accum.append(line)
            continue
            
        # 2. Handle tables
        if stripped.startswith('|') and stripped.endswith('|'):
            # It's a table row
            # If it's a separator like |---|---|, skip it if we are already in a table
            is_separator = re.match(r'^\|[\s\-\|:]+\|$', stripped) is not None
            
            if is_separator:
                # If we are not in a table, it shouldn't happen, but just ignore it
                continue
                
            flush_paragraph()
            flush_list()
            flush_quote()
            
            if not in_table:
                in_table = True
                table_rows = []
                
            # Parse cells
            # Split by '|' and strip spaces. Ignore first and last empty elements
            cells = [format_inline_markdown(cell.strip()) for cell in stripped.split('|')[1:-1]]
            table_rows.append(cells)
            continue
        elif in_table:
            # We hit something that is not a table row, so flush the table
            flush_table()
            
        # 3. Handle empty line
        if not stripped:
            flush_paragraph()
            flush_list()
            flush_quote()
            continue
            
        # 4. Handle horizontal rules
        if stripped in ['---', '***', '___']:
            flush_paragraph()
            flush_list()
            flush_quote()
            html_lines.append('<hr>')
            continue
            
        # 5. Handle headers
        header_match = re.match(r'^(#+)\s+(.*)$', stripped)
        if header_match:
            flush_paragraph()
            flush_list()
            flush_quote()
            
            level = len(header_match.group(1))
            header_text = format_inline_markdown(header_match.group(2))
            html_lines.append(f'<h{level}>{header_text}</h{level}>')
            continue
            
        # 6. Handle blockquotes
        if stripped.startswith('>'):
            flush_paragraph()
            flush_list()
            
            # Remove leading '>' and one space if exists
            quote_line = stripped[1:]
            if quote_line.startswith(' '):
                quote_line = quote_line[1:]
                
            if not in_quote:
                html_lines.append('<blockquote>')
                in_quote = True
                
            quote_text = format_inline_markdown(quote_line)
            html_lines.append(f'<p>{quote_text}</p>')
            continue
        elif in_quote:
            flush_quote()
            
        # 7. Handle ordered lists
        ol_match = re.match(r'^(\d+)\.\s+(.*)$', stripped)
        if ol_match:
            flush_paragraph()
            if in_list and in_list != 'ol':
                flush_list()
            if not in_list:
                html_lines.append('<ol>')
                in_list = 'ol'
                
            item_text = format_inline_markdown(ol_match.group(2))
            html_lines.append(f'  <li>{item_text}</li>')
            continue
            
        # 8. Handle unordered lists
        ul_match = re.match(r'^([-\*])\s+(.*)$', stripped)
        if ul_match:
            flush_paragraph()
            if in_list and in_list != 'ul':
                flush_list()
            if not in_list:
                html_lines.append('<ul>')
                in_list = 'ul'
                
            item_text = format_inline_markdown(ul_match.group(2))
            html_lines.append(f'  <li>{item_text}</li>')
            continue
            
        # 9. Regular text
        flush_list()
        paragraph_accum.append(stripped)
        
    # Flush remaining states at the end
    flush_paragraph()
    flush_list()
    flush_quote()
    flush_table()
    
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
            
            # Map image based on frontmatter or category/slug
            if 'image' in metadata and metadata['image']:
                image = metadata['image']
            else:
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
<link rel="canonical" href="https://anonsoft.com/blog/{new_slug}.html">
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
