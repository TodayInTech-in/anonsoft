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
    title = re.sub(r"\s*\|\s*TodayInTech.*", "", title, flags=re.IGNORECASE)
    title = re.sub(r"\s*\|\s*Today In Tech.*", "", title, flags=re.IGNORECASE)
    title = re.sub(r"\s*-\s*TodayInTech.*", "", title, flags=re.IGNORECASE)
    
    description = parser.meta_desc_temp.strip()
    if not description:
        description = "No description available."
    
    if len(description) > 0:
        description = description[0].upper() + description[1:]
    
    return title, description

def clean_html_tags(text):
    text = re.sub(r'<[^>]+>', '', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def parse_project_details(file_path):
    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()
        
    details = {}
    
    # Extract Problem/Challenge
    prob_match = re.search(r'case-study-problem">.*?<h2>(.*?)</h2>.*?<p>(.*?)</p>(.*?)(?:</div>|\s*<div\s+class\s*=)', content, re.DOTALL)
    if prob_match:
        title = prob_match.group(1).strip()
        desc = clean_html_tags(prob_match.group(2))
        bullets = re.findall(r'<li>(.*?)</li>', prob_match.group(3), re.DOTALL)
        details['problem'] = {
            'title': title,
            'description': desc,
            'bullets': [clean_html_tags(b) for b in bullets]
        }
        
    # Extract Solution
    sol_match = re.search(r'case-study-solution">.*?<h2>(.*?)</h2>.*?<p>(.*?)</p>(.*?)(?:</div>|\s*<div\s+class\s*=)', content, re.DOTALL)
    if sol_match:
        title = sol_match.group(1).strip()
        desc = clean_html_tags(sol_match.group(2))
        bullets = re.findall(r'<li>(.*?)</li>', sol_match.group(3), re.DOTALL)
        details['solution'] = {
            'title': title,
            'description': desc,
            'bullets': [clean_html_tags(b) for b in bullets]
        }

    # Extract Results
    res_match = re.search(r'case-study-result">.*?<h2>(.*?)</h2>.*?<p>(.*?)</p>(.*?)(?:</div>|\s*<div\s+class\s*=)', content, re.DOTALL)
    if res_match:
        title = res_match.group(1).strip()
        desc = clean_html_tags(res_match.group(2))
        bullets = re.findall(r'<li>(.*?)</li>', res_match.group(3), re.DOTALL)
        details['results'] = {
            'title': title,
            'description': desc,
            'bullets': [clean_html_tags(b) for b in bullets]
        }
        
    # Extract Key Features
    features = []
    feature_blocks = re.findall(r'<div class="feature-card">.*?<h3>(.*?)</h3>.*?<p>(.*?)</p>', content, re.DOTALL)
    for title, desc in feature_blocks:
        features.append((title.strip(), clean_html_tags(desc)))
    details['features'] = features
    
    # Extract Tech Stack
    tech_tags = re.findall(r'<span class="tech-tag">(.*?)</span>', content)
    if not tech_tags:
        port_tech = re.search(r'class=["\'](?:portfolio-tech|tech-stack-tags|tech-stack)["\']>(.*?)</div>', content, re.DOTALL)
        if port_tech:
            tech_tags = re.findall(r'<span>(.*?)</span>', port_tech.group(1))
            if not tech_tags:
                tech_tags = re.findall(r'class="tech-tag">(.*?)</span>', port_tech.group(1))
    
    details['tech_stack'] = [t.strip() for t in tech_tags if len(t.strip()) < 40]
    
    return details

def clean_url_ext(url):
    if url.endswith("/index.html") or url.endswith("/index"):
        return url.rsplit("/index", 1)[0] + "/"
    if url.endswith(".html"):
        return url[:-5]
    return url

def generate_llms_files(root_dir):
    domain = "https://todayintech.in"
    
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
            url = clean_url_ext(url)
            core_pages.append((title, url, desc))
            
    core_pages.sort(key=lambda x: (x[1] != f"{domain}/", x[0]))

    # 2. Parse projects directory and extract rich case study metadata
    projects_dir = os.path.join(root_dir, "projects")
    if os.path.isdir(projects_dir):
        for entry in os.scandir(projects_dir):
            if entry.is_file() and entry.name.endswith(".html"):
                if "demo" in entry.name:
                    continue
                title, desc = parse_html_file(entry.path)
                url = f"{domain}/projects/{entry.name}"
                url = clean_url_ext(url)
                
                # Fetch rich parsed data
                case_study_data = parse_project_details(entry.path)
                
                projects.append((title, url, desc, case_study_data))
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
                url = clean_url_ext(url)
                if entry.stat().st_size < 1000:
                    continue
                blogs.append((title, url, desc))
    blogs.sort(key=lambda x: x[0])

    # Build standard llms.txt (Compact metadata)
    llms_content = []
    llms_content.append("# TodayInTech\n")
    llms_content.append("> A premier software development agency specializing in scalable custom software, HIPAA-compliant virtual care solutions, 3D product configurators, and EdTech platforms.\n")
    llms_content.append("This is the main directory of the TodayInTech website, custom software solutions, and case studies, optimized for AI models, search crawlers, and LLM interpretation. Here you will find direct links to our key services, active portfolios, and engineering insights.\n")
    
    llms_content.append("## Core Pages\n")
    for title, url, desc in core_pages:
        llms_content.append(f"- [{title}]({url}): {desc}")
    
    llms_content.append("\n## Services & Projects\n")
    for title, url, desc, _ in projects:
        llms_content.append(f"- [{title}]({url}): {desc}")
        
    llms_content.append("\n## Featured Blog Articles\n")
    for title, url, desc in blogs[:5]:
        llms_content.append(f"- [{title}]({url}): {desc}")
    llms_content.append(f"- [Full Directory of Articles]({domain}/llms-full.txt): Comprehensive listing of all technical insights and blog posts.")
    
    # Save llms.txt
    llms_txt_data = "\n".join(llms_content) + "\n"
    
    llms_path = os.path.join(root_dir, "llms.txt")
    with open(llms_path, "w", encoding="utf-8") as f:
        f.write(llms_txt_data)
        
    public_llms_path = os.path.join(root_dir, "public", "llms.txt")
    with open(public_llms_path, "w", encoding="utf-8") as f:
        f.write(llms_txt_data)
    print(f"Generated {llms_path} and {public_llms_path}")

    # Build comprehensive llms-full.txt (Extremely detailed specs for all projects)
    llms_full_content = []
    llms_full_content.append("# TodayInTech - Full Index\n")
    llms_full_content.append("> Comprehensive site listing of all TodayInTech pages and technical blog posts for AI agents and LLM crawlers.\n")
    llms_full_content.append("This is the comprehensive index of all resources, pages, active projects, and technical blog posts published by TodayInTech, optimized for full exploration by LLMs and search crawlers.\n")
    
    llms_full_content.append("## Core Pages\n")
    for title, url, desc in core_pages:
        llms_full_content.append(f"- [{title}]({url}): {desc}")
        
    llms_full_content.append("\n## Services & Projects\n")
    for title, url, desc, details in projects:
        llms_full_content.append(f"### [{title}]({url})")
        llms_full_content.append(f"{desc}\n")
        
        if details:
            # Technology Stack
            if details.get('tech_stack'):
                stack_str = ", ".join(details['tech_stack'])
                llms_full_content.append(f"- **Technology Stack**: {stack_str}")
                
            # Problem/Challenge
            if details.get('problem'):
                p_title = details['problem']['title']
                p_desc = details['problem']['description']
                llms_full_content.append(f"- **{p_title}**: {p_desc}")
                for bullet in details['problem']['bullets']:
                    llms_full_content.append(f"  - {bullet}")
                    
            # Solution
            if details.get('solution'):
                s_title = details['solution']['title']
                s_desc = details['solution']['description']
                llms_full_content.append(f"- **{s_title}**: {s_desc}")
                for bullet in details['solution']['bullets']:
                    llms_full_content.append(f"  - {bullet}")
                    
            # Key Features
            if details.get('features'):
                llms_full_content.append("- **Key Features**:")
                for f_title, f_desc in details['features']:
                    llms_full_content.append(f"  - *{f_title}*: {f_desc}")
                    
            # Key Results
            if details.get('results'):
                r_title = details['results']['title']
                r_desc = details['results']['description']
                llms_full_content.append(f"- **{r_title}**: {r_desc}")
                for bullet in details['results']['bullets']:
                    llms_full_content.append(f"  - {bullet}")
                    
        llms_full_content.append("") # spacer between projects
        
    llms_full_content.append("\n## All Blog Articles\n")
    for title, url, desc in blogs:
        llms_full_content.append(f"- [{title}]({url}): {desc}")
        
    # Save llms-full.txt
    llms_full_txt_data = "\n".join(llms_full_content) + "\n"
    
    llms_full_path = os.path.join(root_dir, "llms-full.txt")
    with open(llms_full_path, "w", encoding="utf-8") as f:
        f.write(llms_full_txt_data)
        
    public_llms_full_path = os.path.join(root_dir, "public", "llms-full.txt")
    with open(public_llms_full_path, "w", encoding="utf-8") as f:
        f.write(llms_full_txt_data)
    print(f"Generated {llms_full_path} and {public_llms_full_path}")

if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    workspace_root = os.path.dirname(script_dir)
    generate_llms_files(workspace_root)
