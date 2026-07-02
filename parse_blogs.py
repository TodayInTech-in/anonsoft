import re
import json

with open('/Users/skjasimuddin/.zhwork/todayintechweb/blog/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

cards = []
matches = re.finditer(r'<a href="(/blog/[^"]+|blog/[^"]+)" class="blog-card([^"]*)">', content)
for match in matches:
    url = match.group(1)
    card_class = match.group(2)
    start_pos = match.end()
    temp_content = content[start_pos:start_pos+3000]
    
    emoji_match = re.search(r'<div class="blog-card-img"[^>]*>\s*([^\s<]+)\s*</div>', temp_content)
    emoji = emoji_match.group(1) if emoji_match else ""
    
    category_match = re.search(r'class="blog-card-category">([^<]+)</span>', temp_content)
    category = category_match.group(1).strip() if category_match else ""
    
    date_match = re.search(r'class="blog-card-date">([^<]+)</span>', temp_content)
    date = date_match.group(1).strip() if date_match else ""
    
    title_match = re.search(r'class="blog-card-title">([^<]+)</div>', temp_content)
    title = title_match.group(1).strip() if title_match else ""
    
    excerpt_match = re.search(r'class="blog-card-excerpt">([^<]+)</div>', temp_content)
    excerpt = excerpt_match.group(1).strip() if excerpt_match else ""
    
    cards.append({
        "url": url,
        "class": card_class.strip(),
        "emoji": emoji,
        "category": category,
        "date": date,
        "title": title,
        "excerpt": excerpt
    })

with open('/Users/skjasimuddin/.zhwork/todayintechweb/blogs.json', 'w', encoding='utf-8') as f:
    json.dump(cards, f, indent=2)
print("Saved", len(cards), "blogs to blogs.json")
