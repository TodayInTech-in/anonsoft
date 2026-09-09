#!/usr/bin/env python3
import os
import re
from html.parser import HTMLParser

# ─────────────────────────────────────────────────────────────────────────────
# Hardcoded project supplemental details for pages without case-study structure
# ─────────────────────────────────────────────────────────────────────────────
HARDCODED_PROJECT_DETAILS = {
    "school-management-system.html": {
        "tech_stack": ["React.js", "Node.js", "PostgreSQL", "AWS", "Docker", "Stripe", "Twilio"],
        "problem": {
            "title": "The Challenge",
            "description": "Schools and campuses struggle with fragmented administration — paper-based admissions, manual fee collection, disconnected gradebooks, and zero visibility for parents. Off-the-shelf ERP tools are either overpriced enterprise suites or under-featured generic tools that don't fit school workflows.",
            "bullets": [
                "Paper-based student enrollment and records management",
                "Manual fee collection with no online payment gateway",
                "No automated report card or gradebook system",
                "Parents have no real-time visibility into student performance",
                "No timetabling or bus-route tracking capability",
            ],
        },
        "solution": {
            "title": "Our Solution",
            "description": "We built a fully white-labeled School ERP platform covering every touchpoint — online admissions, student directories, fee collections, gradebooks, parent portals, timetables, attendance tracking, and GPS-based transport tracking — all under one unified dashboard.",
            "bullets": [
                "Online student admission with digital document uploads",
                "Integrated fee billing with Stripe/Razorpay/offline payment modes",
                "Automated report card generation with configurable grade schemes",
                "Real-time parent portal mobile app for iOS and Android",
                "Drag-and-drop timetable builder with conflict detection",
                "GPS live bus tracking for school transport management",
            ],
        },
        "features": [
            ("Student Registry", "Manage digital registrations, student directories, family profiles, and class allocations."),
            ("Fee Collections", "Secure white-label fee billing with automated reminders, late fees, and multi-payment gateway support."),
            ("Academics & Grading", "Record exam scores, configure custom grading systems, and auto-generate student report cards."),
            ("Timetable Management", "Drag-and-drop timetable builder with teacher conflict detection and substitution management."),
            ("Parent Portal App", "Native iOS and Android parent app with attendance alerts, grade notifications, and fee receipts."),
            ("GPS Transport Tracking", "Live GPS bus tracking with route planning and parent ETA notifications."),
        ],
        "results": {
            "title": "Business Impact",
            "description": "Schools deploying our ERP reduce administrative overhead by over 60%, eliminate paper workflows entirely, and dramatically improve parent satisfaction scores.",
            "bullets": [
                "60%+ reduction in administrative overhead",
                "100% paperless admissions and fee collection",
                "Real-time visibility for parents via mobile app",
                "Deployable in under 4 weeks with full data migration",
                "Supports multi-campus and multi-branch operations",
            ],
        },
    },
    "church-management-software.html": {
        "tech_stack": ["React.js", "Node.js", "PostgreSQL", "AWS", "Stripe", "Twilio", "Google Maps API"],
        "problem": {
            "title": "The Challenge",
            "description": "Church administrations operate across multiple areas — member records, donation management, volunteer coordination, small group leadership, event planning, and safety check-ins — with no unified platform built for faith-based organizations. Generic CRMs don't understand church workflows.",
            "bullets": [
                "Manual tithing tracking via spreadsheets or cash envelopes",
                "No centralized member database or family grouping",
                "Volunteer scheduling done via email and phone calls",
                "No safety check-in system for children's ministry",
                "Disconnected accounting with no fund-specific tracking",
            ],
        },
        "solution": {
            "title": "Our Solution",
            "description": "We built a purpose-built Church Management Software unifying online giving, people & groups management, volunteer scheduling, fund accounting, children's ministry safety check-in, and an integrated church mobile app — all under a single white-labeled platform.",
            "bullets": [
                "Online giving portal with recurring donation support",
                "Centralized member database with family units and spiritual journey tracking",
                "Service plan builder for volunteer role assignments and availability",
                "Children's ministry safety check-in with QR code wristbands",
                "Fund-based church accounting with donation receipts",
                "Branded church mobile app for iOS and Android",
            ],
        },
        "features": [
            ("Online Giving", "Branded online giving portal supporting one-time and recurring donations with automated tax receipts."),
            ("People & Groups", "Nurture relationships, organize small groups, and track spiritual paths with family-level profiles."),
            ("Volunteer Scheduling", "Create service plans, assign volunteer roles, upload sheet music, and collect RSVPs."),
            ("Fund Accounting", "Multi-fund church ledger with expense tracking, donation receipts, and year-end giving statements."),
            ("Children's Check-In", "Secure QR-code-based child check-in system with parent receipt printing and guardian matching."),
            ("Church Mobile App", "Branded iOS and Android app with sermons, giving, events, and group communication built in."),
        ],
        "results": {
            "title": "Business Impact",
            "description": "Churches using our platform see a significant increase in online giving adoption, improved volunteer coordination, and stronger member engagement.",
            "bullets": [
                "3x increase in online giving adoption within 3 months",
                "80% reduction in volunteer scheduling administration time",
                "100% digital check-in for children's ministry",
                "Centralized records for 500–5,000+ member congregations",
                "Deployable white-labeled in under 6 weeks",
            ],
        },
    },
    "restaurant-management-system.html": {
        "tech_stack": ["React.js", "Node.js", "PostgreSQL", "AWS", "Stripe", "Google Maps API", "Flutter", "WebSockets"],
        "problem": {
            "title": "The Challenge",
            "description": "Restaurant owners juggle point-of-sale transactions, kitchen order management, delivery dispatch, inventory tracking, and staff management across disconnected systems. Generic POS software locks restaurants into high per-transaction fees with no customization for their specific menu, kitchen flow, or delivery network.",
            "bullets": [
                "Disconnected POS, kitchen display, and delivery systems",
                "High per-transaction licensing fees from legacy POS vendors",
                "No GPS delivery dispatch or rider tracking capability",
                "Manual inventory counting with no real-time stock alerts",
                "No branded customer ordering app or loyalty program",
            ],
        },
        "solution": {
            "title": "Our Solution",
            "description": "We built a fully white-labeled Restaurant Management System with a touch-screen POS, cloud-based Kitchen Display System (KDS), GPS delivery dispatch, inventory management, and an owner analytics dashboard — custom-branded for each restaurant group.",
            "bullets": [
                "Custom touch-screen POS with table, takeaway, and delivery order modes",
                "Real-time Kitchen Display System (KDS) with order routing by station",
                "GPS rider tracking with automated dispatch and customer ETA updates",
                "Inventory management with low-stock alerts and supplier ordering",
                "Branded customer ordering app (iOS and Android) with loyalty rewards",
                "Multi-outlet analytics dashboard with revenue and cost reports",
            ],
        },
        "features": [
            ("Custom POS Software", "Touch-screen point-of-sale with table management, split bills, modifiers, and payment terminal integration."),
            ("Kitchen Display System", "Cloud-based KDS routing orders to the correct preparation station in real time."),
            ("GPS Delivery Dispatch", "Automated delivery dispatch with live GPS rider tracking and customer delivery ETA notifications."),
            ("Inventory Management", "Real-time stock tracking with automated low-stock alerts and purchase order generation."),
            ("White-Label Ordering App", "Branded iOS and Android ordering app with menu browsing, cart, payment, and loyalty points."),
            ("Owner Analytics Dashboard", "Multi-outlet revenue reports, item popularity analysis, and staff performance metrics."),
        ],
        "results": {
            "title": "Business Impact",
            "description": "Restaurant groups deploying our platform eliminate third-party delivery commission fees, reduce kitchen errors, and gain real-time control over their full operation.",
            "bullets": [
                "Zero per-transaction licensing fees vs. legacy POS vendors",
                "40% reduction in kitchen order errors via KDS",
                "Live GPS delivery tracking for all rider dispatches",
                "Real-time inventory with zero manual counting",
                "White-labeled and deployed in under 6 weeks",
            ],
        },
    },
    "senior-care-agency.html": {
        "tech_stack": ["React.js", "Node.js", "PostgreSQL", "AWS", "Flutter", "Google Maps API", "Twilio"],
        "problem": {
            "title": "The Challenge",
            "description": "Home care agencies manage complex operations across caregiver scheduling, Electronic Visit Verification (EVV) compliance, automated billing, care plan documentation, and family communication — all simultaneously. Off-the-shelf home care software is either too rigid or too expensive for mid-size agencies.",
            "bullets": [
                "Manual caregiver scheduling via phone calls and spreadsheets",
                "No EVV-compliant visit verification for Medicaid billing",
                "Disconnected billing with high accounts receivable delays",
                "No family portal for real-time care updates",
                "Care plans stored as unstructured paper documents",
            ],
        },
        "solution": {
            "title": "Our Solution",
            "description": "We built a fully white-labeled Home Care ERP with caregiver scheduling, EVV-compliant GPS check-ins, automated Medicaid and private-pay billing, digital care plans, and a secure family portal — all custom-branded for each agency.",
            "bullets": [
                "Drag-and-drop caregiver schedule management with conflict detection",
                "EVV-compliant GPS-based caregiver check-in and check-out",
                "Automated billing with Medicaid, Medicare, and private-pay claim generation",
                "Digital care plan builder with task checklists and medication management",
                "Secure family portal with real-time visit logs and caregiver profiles",
                "HIPAA-compliant document storage and messaging",
            ],
        },
        "features": [
            ("Caregiver Scheduling", "Drag-and-drop schedule management matching caregiver skills, client preferences, and availability."),
            ("EVV Compliance", "GPS-verified electronic visit verification fully compliant with state Medicaid EVV mandates."),
            ("Automated Billing", "Auto-generated claims for Medicaid, Medicare, and private-pay with denial management tracking."),
            ("Digital Care Plans", "Structured care plan builder with daily task checklists, medication reminders, and incident reporting."),
            ("Family Portal", "Secure web and mobile portal giving families real-time visit logs, caregiver profiles, and messaging."),
            ("HIPAA-Compliant Storage", "Encrypted document management for care records, certifications, and compliance audits."),
        ],
        "results": {
            "title": "Business Impact",
            "description": "Home care agencies using our platform achieve full EVV compliance, dramatically cut billing cycle times, and improve caregiver retention through better scheduling transparency.",
            "bullets": [
                "100% EVV compliance with state Medicaid requirements",
                "60% reduction in billing cycle time",
                "Zero paper-based care plans or visit records",
                "Real-time visibility for families via secure portal",
                "White-labeled and deployed in under 6 weeks",
            ],
        },
    },
}


# ─────────────────────────────────────────────────────────────────────────────
# HTML Parsers
# ─────────────────────────────────────────────────────────────────────────────

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
    title = re.sub(r"\s*\|\s*Anonsoft.*", "", title, flags=re.IGNORECASE)
    title = re.sub(r"\s*\|\s*Anonsoft.*", "", title, flags=re.IGNORECASE)
    title = re.sub(r"\s*-\s*Anonsoft.*", "", title, flags=re.IGNORECASE)

    description = parser.meta_desc_temp.strip()
    if not description:
        description = "No description available."

    if len(description) > 0:
        description = description[0].upper() + description[1:]

    return title, description


def clean_html_tags(text):
    text = re.sub(r"<[^>]+>", "", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def parse_project_details(file_path):
    filename = os.path.basename(file_path)

    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    details = {}

    # ── Strategy 1: case-study-* class divs (master-ai, mednowna, etc.) ──────
    prob_match = re.search(
        r'case-study-problem">.*?<h2>(.*?)</h2>.*?<p>(.*?)</p>(.*?)(?:</div>|\s*<div\s+class\s*=)',
        content, re.DOTALL,
    )
    if prob_match:
        bullets = re.findall(r"<li>(.*?)</li>", prob_match.group(3), re.DOTALL)
        details["problem"] = {
            "title": prob_match.group(1).strip(),
            "description": clean_html_tags(prob_match.group(2)),
            "bullets": [clean_html_tags(b) for b in bullets],
        }

    sol_match = re.search(
        r'case-study-solution">.*?<h2>(.*?)</h2>.*?<p>(.*?)</p>(.*?)(?:</div>|\s*<div\s+class\s*=)',
        content, re.DOTALL,
    )
    if sol_match:
        bullets = re.findall(r"<li>(.*?)</li>", sol_match.group(3), re.DOTALL)
        details["solution"] = {
            "title": sol_match.group(1).strip(),
            "description": clean_html_tags(sol_match.group(2)),
            "bullets": [clean_html_tags(b) for b in bullets],
        }

    res_match = re.search(
        r'case-study-result">.*?<h2>(.*?)</h2>.*?<p>(.*?)</p>(.*?)(?:</div>|\s*<div\s+class\s*=)',
        content, re.DOTALL,
    )
    if res_match:
        bullets = re.findall(r"<li>(.*?)</li>", res_match.group(3), re.DOTALL)
        details["results"] = {
            "title": res_match.group(1).strip(),
            "description": clean_html_tags(res_match.group(2)),
            "bullets": [clean_html_tags(b) for b in bullets],
        }

    # ── Feature cards (feature-card class) ───────────────────────────────────
    features = []
    feature_blocks = re.findall(
        r'<div class="feature-card">.*?<h3>(.*?)</h3>.*?<p>(.*?)</p>', content, re.DOTALL
    )
    for title, desc in feature_blocks:
        features.append((title.strip(), clean_html_tags(desc)))

    # ── Fallback: suite-card-body (school, church) ────────────────────────────
    if not features:
        suite_blocks = re.findall(
            r'class="suite-card-body">(.*?)</div>', content, re.DOTALL
        )
        for block in suite_blocks:
            h3 = re.search(r"<h3>(.*?)</h3>", block, re.DOTALL)
            p = re.search(r"<p>(.*?)</p>", block, re.DOTALL)
            if h3:
                title = clean_html_tags(h3.group(1))
                desc = clean_html_tags(p.group(1)) if p else ""
                if title and len(title) < 80:
                    features.append((title, desc))

    # ── Fallback: rms-benefit-card / sc-benefit-card (restaurant, senior-care) ─
    if not features:
        for prefix in ["rms", "sc"]:
            benefit_blocks = re.findall(
                rf'class="{prefix}-benefit-card">(.*?)</div>', content, re.DOTALL
            )
            for block in benefit_blocks:
                h3 = re.search(r"<h3>(.*?)</h3>", block, re.DOTALL)
                p = re.search(r"<p>(.*?)</p>", block, re.DOTALL)
                if h3:
                    title = clean_html_tags(h3.group(1))
                    desc = clean_html_tags(p.group(1)) if p else ""
                    if title and len(title) < 80:
                        features.append((title, desc))

    details["features"] = features

    # ── Tech Stack ────────────────────────────────────────────────────────────
    tech_tags = re.findall(r'<span class="tech-tag">(.*?)</span>', content)
    if not tech_tags:
        port_tech = re.search(
            r'class=["\'](?:portfolio-tech|tech-stack-tags|tech-stack)["\']>(.*?)</div>',
            content, re.DOTALL,
        )
        if port_tech:
            tech_tags = re.findall(r"<span>(.*?)</span>", port_tech.group(1))
    details["tech_stack"] = [t.strip() for t in tech_tags if len(t.strip()) < 40]

    # ── Strategy 2: Merge hardcoded supplement for pages missing parsed data ──
    hardcoded = HARDCODED_PROJECT_DETAILS.get(filename, {})
    if hardcoded:
        for key in ["problem", "solution", "results"]:
            if key not in details and key in hardcoded:
                details[key] = hardcoded[key]
        if not details.get("features") and hardcoded.get("features"):
            details["features"] = hardcoded["features"]
        if not details.get("tech_stack") and hardcoded.get("tech_stack"):
            details["tech_stack"] = hardcoded["tech_stack"]

    return details


def clean_url_ext(url):
    if url.endswith("/index.html") or url.endswith("/index"):
        return url.rsplit("/index", 1)[0] + "/"
    if url.endswith(".html"):
        return url[:-5]
    return url


# ─────────────────────────────────────────────────────────────────────────────
# Main generator
# ─────────────────────────────────────────────────────────────────────────────

def generate_llms_files(root_dir):
    domain = "https://anonsoft.in"

    core_pages = []
    projects = []
    blogs = []
    ignored_files = {
        "privacy.html", "terms.html", "refund-policy.html", "sitemap-index.xml"
    }

    # 1. Root HTML pages
    for entry in os.scandir(root_dir):
        if entry.is_file() and entry.name.endswith(".html"):
            if entry.name in ignored_files:
                continue
            title, desc = parse_html_file(entry.path)
            url = (
                f"{domain}/"
                if entry.name == "index.html"
                else f"{domain}/{entry.name}"
            )
            if entry.name == "index.html":
                title = "Anonsoft Homepage"
            url = clean_url_ext(url)
            core_pages.append((title, url, desc))

    core_pages.sort(key=lambda x: (x[1] != f"{domain}/", x[0]))

    # 2. Projects
    projects_dir = os.path.join(root_dir, "projects")
    if os.path.isdir(projects_dir):
        for entry in os.scandir(projects_dir):
            if entry.is_file() and entry.name.endswith(".html"):
                if "demo" in entry.name:
                    continue
                title, desc = parse_html_file(entry.path)
                url = clean_url_ext(f"{domain}/projects/{entry.name}")
                case_study_data = parse_project_details(entry.path)
                projects.append((title, url, desc, case_study_data))
    projects.sort(key=lambda x: x[0])

    # 3. Blog posts
    blog_dir = os.path.join(root_dir, "blog")
    if os.path.isdir(blog_dir):
        for entry in os.scandir(blog_dir):
            if entry.is_file() and entry.name.endswith(".html"):
                if entry.name == "index.html":
                    continue
                if entry.stat().st_size < 1000:
                    continue
                title, desc = parse_html_file(entry.path)
                url = clean_url_ext(f"{domain}/blog/{entry.name}")
                blogs.append((title, url, desc))
    blogs.sort(key=lambda x: x[0])

    # ── llms.txt (compact) ────────────────────────────────────────────────────
    llms_content = []
    llms_content.append("# Anonsoft\n")
    llms_content.append(
        "> A premier software development agency specializing in scalable custom software, "
        "HIPAA-compliant virtual care solutions, 3D product configurators, and EdTech platforms.\n"
    )
    llms_content.append(
        "This is the main directory of the Anonsoft website, custom software solutions, and case studies, "
        "optimized for AI models, search crawlers, and LLM interpretation. "
        "Here you will find direct links to our key services, active portfolios, and engineering insights.\n"
    )

    llms_content.append("## Core Pages\n")
    for title, url, desc in core_pages:
        llms_content.append(f"- [{title}]({url}): {desc}")

    llms_content.append("\n## Services & Projects\n")
    for title, url, desc, _ in projects:
        llms_content.append(f"- [{title}]({url}): {desc}")

    llms_content.append("\n## Featured Blog Articles\n")
    for title, url, desc in blogs[:5]:
        llms_content.append(f"- [{title}]({url}): {desc}")
    llms_content.append(
        f"- [Full Directory of Articles]({domain}/llms-full.txt): "
        "Comprehensive listing of all technical insights and blog posts."
    )

    llms_txt_data = "\n".join(llms_content) + "\n"
    for path in [
        os.path.join(root_dir, "llms.txt"),
        os.path.join(root_dir, "public", "llms.txt"),
    ]:
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "w", encoding="utf-8") as f:
            f.write(llms_txt_data)
    print("Generated llms.txt")

    # ── llms-full.txt (rich project details) ─────────────────────────────────
    llms_full_content = []
    llms_full_content.append("# Anonsoft - Full Index\n")
    llms_full_content.append(
        "> Comprehensive site listing of all Anonsoft pages and technical blog posts "
        "for AI agents and LLM crawlers.\n"
    )
    llms_full_content.append(
        "This is the comprehensive index of all resources, pages, active projects, and technical blog posts "
        "published by Anonsoft, optimized for full exploration by LLMs and search crawlers.\n"
    )

    llms_full_content.append("## Core Pages\n")
    for title, url, desc in core_pages:
        llms_full_content.append(f"- [{title}]({url}): {desc}")

    llms_full_content.append("\n## Services & Projects\n")
    for title, url, desc, details in projects:
        llms_full_content.append(f"### [{title}]({url})")
        llms_full_content.append(f"{desc}\n")

        if details:
            if details.get("tech_stack"):
                llms_full_content.append(
                    f"- **Technology Stack**: {', '.join(details['tech_stack'])}"
                )
            if details.get("problem"):
                p = details["problem"]
                llms_full_content.append(f"- **{p['title']}**: {p['description']}")
                for b in p["bullets"]:
                    llms_full_content.append(f"  - {b}")
            if details.get("solution"):
                s = details["solution"]
                llms_full_content.append(f"- **{s['title']}**: {s['description']}")
                for b in s["bullets"]:
                    llms_full_content.append(f"  - {b}")
            if details.get("features"):
                llms_full_content.append("- **Key Features**:")
                for f_title, f_desc in details["features"]:
                    llms_full_content.append(f"  - *{f_title}*: {f_desc}")
            if details.get("results"):
                r = details["results"]
                llms_full_content.append(f"- **{r['title']}**: {r['description']}")
                for b in r["bullets"]:
                    llms_full_content.append(f"  - {b}")

        llms_full_content.append("")  # spacer

    llms_full_content.append("\n## All Blog Articles\n")
    for title, url, desc in blogs:
        llms_full_content.append(f"- [{title}]({url}): {desc}")

    llms_full_txt_data = "\n".join(llms_full_content) + "\n"
    for path in [
        os.path.join(root_dir, "llms-full.txt"),
        os.path.join(root_dir, "public", "llms-full.txt"),
    ]:
        with open(path, "w", encoding="utf-8") as f:
            f.write(llms_full_txt_data)
    print("Generated llms-full.txt")


if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    workspace_root = os.path.dirname(script_dir)
    generate_llms_files(workspace_root)
