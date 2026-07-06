#!/usr/bin/env python3
import os
import re
from html.parser import HTMLParser

class MetaParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ""
        self.description = ""
        self.in_title = False
        self.meta_desc_temp = ""

    def handle_starttag(self, tag, attrs):
        if tag == "title":
            self.in_title = True
        elif tag == "meta":
            attrs_dict = dict(attrs)
            # Handle case-insensitive comparisons
            name = attrs_dict.get("name", "").lower()
            property_meta = attrs_dict.get("property", "").lower()
            
            if name == "description" or property_meta == "og:description":
                content = attrs_dict.get("content", "").strip()
                if content:
                    self.meta_desc_temp = content

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False

    def handle_data(self, data):
        if self.in_title:
            self.title += data

def parse_html_file(file_path):
    parser = MetaParser()
    try:
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
            parser.feed(content)
    except Exception as e:
        print(f"Error parsing {file_path}: {e}")
    
    title = parser.title.strip()
    # Clean suffix '| TodayInTech' or similar
    title = re.sub(r"\s*\|\s*TodayInTech.*", "", title, flags=re.IGNORECASE)
    title = re.sub(r"\s*\|\s*Today In Tech.*", "", title, flags=re.IGNORECASE)
    title = re.sub(r"\s*-\s*TodayInTech.*", "", title, flags=re.IGNORECASE)
    
    # Use meta description; fallback to og:description if needed
    description = parser.meta_desc_temp.strip()
    if not description:
        description = "No description available."
    
    # Capitalize first letter of description if it exists
    if len(description) > 0:
        description = description[0].upper() + description[1:]
    
    return title, description

def generate_llms_files(root_dir):
    domain = "https://todayintech.in"
    
    # Categories to capture
    core_pages = []
    projects = []
    blogs = []
    ignored_files = {"privacy.html", "terms.html", "refund-policy.html", "sitemap-index.xml"}
    
    # 1. Parse root HTML files
    for entry in os.scandir(root_dir):
        if entry.is_file() and entry.name.endswith(".html"):
            if entry.name in ignored_files:
                continue
            title, desc = parse_html_file(entry.path)
            url = f"{domain}/{entry.name}" if entry.name != "index.html" else f"{domain}/"
            if entry.name == "index.html":
                title = "TodayInTech Homepage"
            core_pages.append((title, url, desc))
            
    # Sort core pages to keep homepage first, then alphabetical
    core_pages.sort(key=lambda x: (x[1] != f"{domain}/", x[0]))

    # 2. Parse projects directory
    projects_dir = os.path.join(root_dir, "projects")
    if os.path.isdir(projects_dir):
        for entry in os.scandir(projects_dir):
            if entry.is_file() and entry.name.endswith(".html"):
                if "demo" in entry.name:
                    continue  # skip raw demos
                title, desc = parse_html_file(entry.path)
                url = f"{domain}/projects/{entry.name}"
                projects.append((title, url, desc))
    projects.sort(key=lambda x: x[0])

    # 3. Parse blog directory
    blog_dir = os.path.join(root_dir, "blog")
    if os.path.isdir(blog_dir):
        for entry in os.scandir(blog_dir):
            if entry.is_file() and entry.name.endswith(".html"):
                if entry.name == "index.html":
                    continue
                title, desc = parse_html_file(entry.path)
                url = f"{domain}/blog/{entry.name}"
                
                # Check for redirections or tiny placeholders
                if entry.stat().st_size < 1000:
                    continue
                blogs.append((title, url, desc))
    blogs.sort(key=lambda x: x[0])

    # Build standard llms.txt (Intro, Core, Projects, and Top 5 Blogs + reference to full)
    llms_content = []
    llms_content.append("# TodayInTech\n")
    llms_content.append("> A premier software development agency specializing in scalable custom software, HIPAA-compliant virtual care solutions, 3D product configurators, and EdTech platforms.\n")
    
    llms_content.append("## Core Pages\n")
    for title, url, desc in core_pages:
        llms_content.append(f"- [{title}]({url}): {desc}")
    
    llms_content.append("\n## Services & Projects\n")
    for title, url, desc in projects:
        llms_content.append(f"- [{title}]({url}): {desc}")
        
    llms_content.append("\n## Featured Blog Articles\n")
    # Show first 5 featured blogs in llms.txt
    for title, url, desc in blogs[:5]:
        llms_content.append(f"- [{title}]({url}): {desc}")
    llms_content.append(f"- [Full Directory of Articles]({domain}/llms-full.txt): Comprehensive listing of all technical insights and blog posts.")
    
    # Save llms.txt
    llms_path = os.path.join(root_dir, "llms.txt")
    with open(llms_path, "w", encoding="utf-8") as f:
        f.write("\n".join(llms_content) + "\n")
    print(f"Generated {llms_path}")

    # Build comprehensive llms-full.txt (All pages and all 70+ blogs)
    llms_full_content = []
    llms_full_content.append("# TodayInTech - Full Index\n")
    llms_full_content.append("> Comprehensive site listing for AI agents and LLM crawlers.\n")
    
    llms_full_content.append("## Core Pages\n")
    for title, url, desc in core_pages:
        llms_full_content.append(f"- [{title}]({url}): {desc}")
        
    llms_full_content.append("\n## Services & Projects\n")
    for title, url, desc in projects:
        llms_full_content.append(f"- [{title}]({url}): {desc}")
        
    llms_full_content.append("\n## All Blog Articles\n")
    for title, url, desc in blogs:
        llms_full_content.append(f"- [{title}]({url}): {desc}")
        
    # Save llms-full.txt
    llms_full_path = os.path.join(root_dir, "llms-full.txt")
    with open(llms_full_path, "w", encoding="utf-8") as f:
        f.write("\n".join(llms_full_content) + "\n")
    print(f"Generated {llms_full_path}")

if __name__ == "__main__":
    # Resolve workspace root (parent of scripts directory)
    script_dir = os.path.dirname(os.path.abspath(__file__))
    workspace_root = os.path.dirname(script_dir)
    generate_llms_files(workspace_root)
