#!/usr/bin/env python3
import os
import re
import sys
from datetime import datetime

# Root directory of the repository
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATE_FILE = os.path.join(ROOT_DIR, "scripts", ".last_published_index")
BLOG_DIR = os.path.join(ROOT_DIR, "blog")
INDEX_HTML = os.path.join(BLOG_DIR, "index.html")

# Curated list of high-quality tech blog posts matching TodayInTech branding and layout
ARTICLES = [
    {
        "slug": "fhir-interoperability-healthcare-software-development-2026",
        "title": "How FHIR Interoperability is Transforming Healthcare Software Development in 2026",
        "category": "Healthcare Tech",
        "excerpt": "Learn how HL7 FHIR APIs, EHR integration standards, and secure data exchange are defining the next generation of interoperable medical software in 2026.",
        "read_time": 8,
        "image": "software_prototype.png",
        "content": """
        <h2>The Interoperability Mandate in Modern HealthTech</h2>
        <p>In 2026, building isolated healthcare software is no longer viable. Interoperability has transitioned from a compliance checklist item to a foundational product requirement. Driven by regulatory mandates and the demand for real-time patient care insights, developers must design platforms that seamlessly exchange data with major EHR systems like Epic, Cerner, and athenahealth.</p>
        <p>At the center of this revolution is HL7 FHIR (Fast Healthcare Interoperability Resources). By utilizing standardized JSON APIs and structured data models, FHIR simplifies data exchange, allowing custom telemedicine apps and patient portals to sync clinical data instantly and securely.</p>

        <h2>Why FHIR is the Standard of Choice</h2>
        <p>Unlike legacy HL7 v2 pipe-delimited messages or complex SOAP web services, FHIR leverages modern RESTful patterns. It organizes clinical data into discrete, queryable concepts called "Resources"—such as Patient, Observation, MedicationRequest, and Encounter. This granularity enables mobile and web developers to retrieve only the specific data points they need, reducing bandwidth and accelerating client-side performance.</p>

        <div class="tech-table">
          <table>
            <thead>
              <tr>
                <th>Integration Standard</th>
                <th>Data Format</th>
                <th>Query Architecture</th>
                <th>Primary Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>HL7 v2.x</strong></td>
                <td>Pipe-delimited plain text</td>
                <td>Socket-based event triggers (push)</td>
                <td>Internal hospital system sync (ADT, Lab results)</td>
              </tr>
              <tr>
                <td><strong>HL7 FHIR (v4.0.1 / v5)</strong></td>
                <td>JSON / XML REST APIs</td>
                <td>RESTful HTTP Queries (GET, POST, PATCH)</td>
                <td>Modern mobile apps, EHR integrated telehealth, patient portals</td>
              </tr>
              <tr>
                <td><strong>DICOM</strong></td>
                <td>Binary image metadata</td>
                <td>C-STORE / WADO web services</td>
                <td>Medical imaging transfer (PACS)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Architecting an EHR-Integrated Telehealth Solution</h2>
        <p>To implement a robust EHR integration, developers must establish secure authentication and authorization flows using SMART on FHIR. This framework combines OAuth 2.0 and OpenID Connect to authorize patient and provider apps to query FHIR resources without exposing user credentials to the client application.</p>
        <p>When a physician launches a video consult from their EHR, the telehealth platform utilizes launch context tokens to pull relevant patient history, active medications, and allergies. Post-consultation, the application auto-syncs billing codes and clinical notes back to the EHR, eliminating administrative duplication and reducing provider burnout.</p>

        <div class="post-callout">
          <strong>Key Engineering Practice:</strong> Always implement a translation layer or middleware between your application's internal database and the external FHIR API. Directly binding your database schema to FHIR resources leads to brittle integrations when EHR vendors customize their resource extensions.
        </div>

        <h2>Securing Interoperable Healthcare Systems</h2>
        <p>Exchanging data across networks expands the attack surface. As a leading HIPAA-compliant telemedicine app developer, we recommend a security-first approach to interoperability:</p>
        <ul>
          <li><strong>Mutual TLS (mTLS):</strong> Enforce bidirectional cryptographic certificate validation for all server-to-server EHR communication.</li>
          <li><strong>FHIR Resource Redaction:</strong> Filter out unnecessary PHI from payloads before transmitting them to third-party endpoints.</li>
          <li><strong>Audit Trail Mapping:</strong> Map FHIR audit events to your system's immutable access logs to maintain full clinical traceability.</li>
        </ul>
        <p>By prioritizing FHIR interoperability, healthtech platforms can deliver superior clinical outcomes, improve user engagement, and establish a competitive edge in the rapidly growing digital health ecosystem of 2026.</p>
        """
    },
    {
        "slug": "future-of-hipaa-compliant-telehealth-2026",
        "title": "The Future of HIPAA-Compliant Telehealth Solutions (2026)",
        "category": "Healthcare SaaS",
        "excerpt": "Discover the latest technical innovations and security standards required to build secure, scalable, and fully HIPAA-compliant telemedicine applications in 2026.",
        "read_time": 7,
        "image": "software_prototype.png",
        "content": """
        <h2>Evolving Security Standards in Virtual Care</h2>
        <p>In 2026, healthcare software development demands more than simple socket connections and WebRTC links. Patient data privacy rules have evolved, requiring end-to-end encryption for all video packets, zero-knowledge clinical database architectures, and automated audit logs for every system interaction.</p>
        <p>Building a secure, HIPAA-compliant app requires a multi-layered security approach. Modern architectures isolate Protected Health Information (PHI) in audited, access-controlled data buckets while serving non-PHI assets via standard content delivery networks.</p>
        
        <h2>Key Telemedicine Engineering Standards</h2>
        <p>To qualify for HIPAA compliance and passing strict institutional audits, virtual care platforms must support several key engineering requirements:</p>
        <div class="tech-table">
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Standard Requirement</th>
                <th>Implementation Pattern</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Transport Encryption</strong></td>
                <td>TLS 1.3 / AES-256 for all connections</td>
                <td>Enforced via Cloudflare or AWS ALB ingress routing</td>
              </tr>
              <tr>
                <td><strong>Data at Rest</strong></td>
                <td>AES-256 encryption on clinical db</td>
                <td>AWS KMS or GCP Cloud KMS envelope encryption</td>
              </tr>
              <tr>
                <td><strong>Audit Logging</strong></td>
                <td>Immutable read/write records</td>
                <td>AWS CloudTrail + database CDC streaming to AWS S3 Object Lock</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Designing Zero-Knowledge Database Models</h2>
        <p>The safest way to protect patient charts is to ensure that your primary database doesn't store plain text identity fields side-by-side with clinical diagnostics. Modern SaaS architectures use tokenized identity resolution services. The EHR databases store an anonymized user token, while the demographic databases exist behind isolated, highly restricted VPC subnets, connecting only via secure microservices.</p>
        """
    },
    {
        "slug": "accelerating-threejs-loading-times-3d-customizers",
        "title": "Accelerating Three.js Loading Times for 3D Product Customizers",
        "category": "WebGL Technology",
        "excerpt": "WebGL applications face high bounce rates due to large asset sizes. Learn how to optimize Three.js assets, normal maps, and Draco loaders for instant loading.",
        "read_time": 6,
        "image": "threejs_optimization.png",
        "content": """
        <h2>Why WebGL Speed is Critical to E-Commerce Conversion</h2>
        <p>Interactive 3D configurators have proven to double e-commerce conversion rates, but only when they load instantly. When users have to sit through a 5-second loading spinner to download a 20MB GLB model, bounce rates spike by over 40%. Optimizing rendering speeds is paramount.</p>
        <p>In this technical article, we review texture compression methods, mesh optimization patterns, and parallelized Draco loaders to achieve sub-second 3D initialization.</p>
        
        <h2>Implementing Basis Universal and KTX2 Textures</h2>
        <p>Standard PNG and JPEG textures must be uncompressed in GPU memory, occupying significant VRAM and causing runtime stutter. Using KTX2 textures with Basis Universal compression allows images to remain compressed even inside VRAM, dramatically reducing VRAM footprint and initial network transfer sizes.</p>
        """
    },
    {
        "slug": "why-white-label-software-drives-agency-growth",
        "title": "Why White-Label Software is the Ultimate Growth Hack for Agencies",
        "category": "Business Growth",
        "excerpt": "Discover how agencies leverage white-label software, re-brandable SaaS, and outsourced engineering partnerships to scale their recurring revenue without hiring developers.",
        "read_time": 5,
        "image": "software_prototype.png",
        "content": """
        <h2>Building Recurring SaaS Revenue Without the In-House Cost</h2>
        <p>Hiring and maintaining an in-house engineering team is one of the highest expenses for marketing, consulting, and digital agencies. By utilizing white-label software systems, agencies can deploy custom-branded portals, CRM tools, or telehealth apps under their own domain name immediately.</p>
        <p>White-label systems let you launch enterprise-grade software platforms to your clients without worrying about server maintenance, bug fixing, or API integrations.</p>
        """
    },
    {
        "slug": "optimizing-clientside-render-speed-nextjs",
        "title": "Optimizing Client-Side Render Speed in Modern Next.js Applications",
        "category": "Web Performance",
        "excerpt": "Learn advanced performance metrics including INP optimization, route pre-fetching strategies, and bundle splitting tactics for high-traffic Next.js apps.",
        "read_time": 8,
        "image": "software_prototype.png",
        "content": """
        <h2>Mastering Core Web Vitals in Next.js</h2>
        <p>Next.js provides out-of-the-box performance optimizations, but large bundle sizes and heavy client-side hydration can still degrade Interaction to Next Paint (INP). To achieve an INP score under 200ms, developers must minimize main thread blocking times by dividing heavy components into dynamic imports.</p>
        <p>Dynamic routing and pre-fetching should be carefully configured. Over-prefetching on pages with hundreds of internal links can bottleneck the client network card, delaying critical initial data requests.</p>
        """
    },
    {
        "slug": "security-first-virtual-care-architecture",
        "title": "Building Security-First Virtual Care Platforms",
        "category": "Healthcare Compliance",
        "excerpt": "A deep dive into system architectures, microservices isolation, and automated network auditing protocols for enterprise-level medical SaaS platforms.",
        "read_time": 9,
        "image": "software_prototype.png",
        "content": """
        <h2>Isolating Services inside HIPAA VPC Subnets</h2>
        <p>Enterprise medical SaaS applications must isolate services to contain security risks. A typical zero-trust architecture features separate virtual private clouds (VPCs) for user authentication, video routing, database storage, and integration gateways.</p>
        <p>By enforcing network isolation at the database level and requiring cryptographic service-to-service validation tokens, we ensure that a security incident in one microservice cannot compromise patient records elsewhere.</p>
        """
    },
    {
        "slug": "scopic-alternatives-healthcare-software-development",
        "title": "Scopic Alternatives: Top 5 Custom Healthcare Software Developers (2026)",
        "category": "Competitor Review",
        "excerpt": "Compare the best Scopic alternatives for custom healthcare software development in 2026. Evaluate TodayInTech, ScienceSoft, Innowise, and Arkenea on compliance, speed, and cost.",
        "read_time": 8,
        "image": "competitor_review.png",
        "content": """
        <h2>Finding the Right Development Partner for Regulated Digital Health</h2>
        <p>Scopic is a well-established custom software development firm known for delivering web, mobile, and desktop applications across various sectors, with a substantial footprint in healthcare. They offer full-cycle development, HIPAA and GDPR compliance planning, and have recently secured SOC 2 Type 1 certification. However, clients looking to build next-generation healthcare SaaS platforms often seek a Scopic competitor for three key reasons:</p>
        
        <ul>
          <li><strong>Domain Specificity:</strong> While Scopic delivers healthcare applications, they are a generalist software agency that builds solutions for manufacturing, finance, education, and e-commerce. Digital health founders and clinical groups often prefer partners who exclusively specialize in healthcare compliance and clinical workflows.</li>
          <li><strong>Client-Facing Prototypes:</strong> Engaging a development agency usually involves heavy upfront discovery costs before seeing any functional screens. Teams looking to secure funding or validate product-market fit need working code quickly.</li>
          <li><strong>IP and Code Delivery Friction:</strong> Some development houses structure contracts around continuous maintenance retainers or restrict rapid IP transfer. For startups preparing for security audits or venture capital rounds, having clear, modular, and unencumbered ownership of the codebase from day one is essential.</li>
        </ul>

        <div class="post-callout">
          <strong>Key Evaluation Metric:</strong> Healthcare software must survive rigorous third-party audits. When evaluating development partners, verify their BAA (Business Associate Agreement) execution policy and request concrete examples of EHR integrations.
        </div>

        <h2>Detailed Comparison: The Top 5 Scopic Alternatives</h2>
        <p>Here is an in-depth evaluation of the leading alternatives to Scopic for healthcare software engineering in 2026:</p>

        <div class="tech-table">
          <table>
            <thead>
              <tr>
                <th>Partner</th>
                <th>Focus</th>
                <th>Compliance Ready</th>
                <th>Prototype Offer</th>
                <th>Code Ownership</th>
                <th>Ideal For</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>TodayInTech</strong></td>
                <td>100% Healthcare & WebGL</td>
                <td>Yes (BAA signed)</td>
                <td><strong>$0 Upfront Working Prototype</strong></td>
                <td><strong>Immediate 100% IP</strong></td>
                <td>Startups & clinics wanting fast, risk-free validation</td>
              </tr>
              <tr>
                <td><strong>ScienceSoft</strong></td>
                <td>Enterprise IT & Healthcare</td>
                <td>Yes (BAA signed)</td>
                <td>Paid Discovery Phase</td>
                <td>Contract dependent</td>
                <td>Large hospital systems and multi-state medical networks</td>
              </tr>
              <tr>
                <td><strong>Innowise Group</strong></td>
                <td>Multi-sector Custom Dev</td>
                <td>Yes (BAA signed)</td>
                <td>Paid proof of concept</td>
                <td>Upon full payment</td>
                <td>Medium to large enterprises needing staff augmentation</td>
              </tr>
              <tr>
                <td><strong>Arkenea</strong></td>
                <td>100% Healthcare Only</td>
                <td>Yes (BAA signed)</td>
                <td>Paid Discovery Phase</td>
                <td>Contract dependent</td>
                <td>Boutique clinics seeking specialized healthcare consulting</td>
              </tr>
              <tr>
                <td><strong>Scopic (Control)</strong></td>
                <td>Multi-sector Custom Dev</td>
                <td>Yes (BAA signed)</td>
                <td>Paid Discovery Phase</td>
                <td>Upon milestone payment</td>
                <td>Companies wanting web/desktop apps with basic HIPAA alignment</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>1. TodayInTech — The Risk-Free Prototyping Partner</h3>
        <p>TodayInTech bridges the gap between fast product delivery and bespoke engineering. We specialize in building secure, HIPAA-compliant telehealth applications, wellness tracking apps, and high-performance WebGL integrations (such as interactive 3D orthotic or clinical product builders). What sets TodayInTech apart is our <strong>zero-risk procurement model</strong>: we build a fully interactive, working prototype of your application with no upfront payment. You only pay after you review, test, and approve the functioning prototype.</p>
        <p>We sign a Business Associate Agreement (BAA) at the project start and provide complete, unencumbered ownership of the source code and database structure immediately upon launch. This allows you to host the platform on your own cloud (AWS, Azure, GCP) and scale without licensing limits.</p>

        <h3>2. ScienceSoft — The Enterprise Healthcare Giant</h3>
        <p>With decades of experience and thousands of successful projects, ScienceSoft is a leading IT consulting and software development provider. They bring immense resources, extensive quality assurance teams, and deep expertise in integrating complex legacy systems with EHR software. They are a reliable choice for large-scale hospital groups, but their corporate structure and longer discovery cycles make them less suited for early-stage startups and fast-moving digital health founders.</p>

        <h3>3. Innowise Group — Broad Scale Custom Software Engineering</h3>
        <p>Innowise is a major software house with global delivery capabilities. They work across dozens of industries, delivering custom web, mobile, and desktop client-server applications. They have a strong healthcare practice with solid HIPAA training. If you need a large team of developers for cross-platform enterprise systems and are comfortable working with a large generalist agency, Innowise is a powerful partner.</p>

        <h3>4. Arkenea — Boutique Healthcare Specialist</h3>
        <p>Arkenea is a development firm that works exclusively in the healthcare field. Like TodayInTech, they do not build software for retail, finance, or gaming; they focus entirely on digital health products, compliance, and clinical applications. They provide deep consulting expertise, though their engagement model requires standard paid discovery agreements before development begins.</p>

        <h2>Summary: Which Scopic Competitor is Right for You?</h2>
        <ul>
          <li><strong>Choose Scopic if:</strong> You have a broad project spanning desktop and mobile applications, and you want a seasoned team with broad industry experience.</li>
          <li><strong>Choose ScienceSoft if:</strong> You are an enterprise healthcare network requiring extensive compliance audits, consulting depth, and massive resource scaling.</li>
          <li><strong>Choose Innowise if:</strong> You require broad staff augmentation across a diverse range of technical stacks.</li>
          <li><strong>Choose Arkenea if:</strong> You want a healthcare-only partner focused on clinical workflows and standard consulting models.</li>
          <li><strong>Choose TodayInTech if:</strong> You want a healthcare-specialist team, need to validate your software with a zero-risk prototype before committing capital, and want complete IP ownership to pitch to investors or scale without seat fees.</li>
        </ul>
        """
    }
]

# Base HTML template for generating a blog post page
BLOG_TEMPLATE = """<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <title>{title} | TodayInTech</title>
  <meta name="description" content="{excerpt}">
  <meta name="author" content="TodayInTech">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <link rel="canonical" href="https://todayintech.in/blog/{slug}.html">

  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{excerpt}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://todayintech.in/blog/{slug}.html">
  <meta property="og:image" content="https://todayintech.in/assets/blog/{image}">
  <meta property="og:site_name" content="TodayInTech">
  <meta property="article:published_time" content="{published_date}">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="../style.css?v=1.2">
  <link rel="stylesheet" href="../liquid-glass.css">
  <link rel="stylesheet" href="blog-post.css">
  <!-- Calendly -->
  <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet">
  <script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script>
</head>

<body>
  <header>
    <nav class="navbar" id="navbar">
      <div class="container">
        <a href="/" class="nav-logo" aria-label="TodayInTech Homepage">
          <img src="../assets/nav_logo.png" alt="TodayInTech Logo" style="height: 48px !important; width: auto !important; max-width: none !important; border-radius: 0 !important;">
        </a>
        <div class="nav-links" id="navLinks">
          <a href="/#services">Services</a>
          <a href="/#about">About</a>
          <a href="/#portfolio">Portfolio</a>
          <a href="/#process">Process</a>
          <a href="/#testimonials">Reviews</a>
          <a href="/#faq">FAQ</a>
          <a href="/blog/" class="active">Blog</a>
          <a href="" onclick="Calendly.initPopupWidget({{url:'https://calendly.com/todayintechdotin/30min'}});return false;" class="nav-cta">Book a Call</a>
        </div>
        <button class="nav-toggle" id="navToggle" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  </header>

  <main class="blog-post-main">
    <article class="blog-post-container">

      <div class="post-header">
        <div class="post-meta">
          <span class="post-category">{category}</span>
          <span class="post-date">{published_date}</span>
          <span class="post-read-time">{read_time} min read</span>
        </div>
        <h1>{title}</h1>
        <p class="post-intro">{excerpt}</p>
      </div>

      <div class="post-body">
        {content}
      </div>

    </article>
  </main>

  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="../assets/nav_logo.png" alt="TodayInTech Logo" class="footer-logo" style="height: 48px !important; width: auto !important; max-width: none !important; border-radius: 0 !important; margin-bottom: 20px;">
          <p class="footer-desc">Premium software engineering and product customizer development agency.</p>
        </div>
        <div class="footer-links-col">
          <h4>Services</h4>
          <a href="/#services">Custom Software</a>
          <a href="/#services">Virtual Care Platforms</a>
          <a href="/#services">3D Configurators</a>
        </div>
        <div class="footer-links-col">
          <h4>Agency</h4>
          <a href="/#about">About Us</a>
          <a href="/#portfolio">Portfolio</a>
          <a href="/blog/">Blog Insights</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {current_year} TodayInTech. All rights reserved.</p>
        <div class="footer-legal">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/refund-policy">Refund Policy</a>
        </div>
      </div>
    </div>
  </footer>

  <script src="../script.js"></script>
  <script src="../liquid-glass.js"></script>
</body>
</html>
"""

def get_current_publish_index():
    if os.path.exists(STATE_FILE):
        try:
            with open(STATE_FILE, "r") as f:
                return int(f.read().strip())
        except Exception as e:
            print(f"Error reading state file: {e}")
    return 0

def save_publish_index(index):
    try:
        with open(STATE_FILE, "w") as f:
            f.write(str(index))
    except Exception as e:
        print(f"Error saving state file: {e}")

def run_git_commands(commit_msg):
    # Execute Git commands to auto stage, commit and push changes
    print("Executing Git commands...")
    os.system("git add .")
    os.system(f'git commit -m "{commit_msg}"')
    os.system("git push origin main")
    print("Push completed successfully.")

def publish_next_blog():
    idx = get_current_publish_index()
    if idx >= len(ARTICLES):
        print("All predefined articles have already been published!")
        # Optional: reset to 0 to loop them, or stop
        print("Looping back to article 0...")
        idx = 0
        
    article = ARTICLES[idx]
    slug = article["slug"]
    title = article["title"]
    category = article["category"]
    excerpt = article["excerpt"]
    read_time = article["read_time"]
    image = article["image"]
    content = article["content"]
    
    current_date = datetime.now().strftime("%B %d, %Y")
    current_year = datetime.now().strftime("%Y")
    
    # 1. Generate the blog HTML file
    blog_html_path = os.path.join(BLOG_DIR, f"{slug}.html")
    formatted_html = BLOG_TEMPLATE.format(
        title=title,
        excerpt=excerpt,
        slug=slug,
        image=image,
        category=category,
        read_time=read_time,
        content=content,
        published_date=current_date,
        current_year=current_year
    )
    
    with open(blog_html_path, "w", encoding="utf-8") as f:
        f.write(formatted_html)
    print(f"Generated new blog post: {blog_html_path}")
    
    # 2. Insert card into blog/index.html
    # Read existing index
    with open(INDEX_HTML, "r", encoding="utf-8") as f:
        index_content = f.read()
        
    # Build the card HTML
    card_html = f"""          <!-- Post: {slug} -->
          <a href="/blog/{slug}" class="blog-card">
            <img class="blog-card-img" src="../assets/blog/{image}" alt="{title} image cover" loading="lazy">
            <div class="blog-card-body">
              <div class="blog-card-meta">
                <span class="blog-card-category">{category}</span>
                <span class="blog-card-date">{current_date}</span>
              </div>
              <div class="blog-card-title">{title}</div>
              <div class="blog-card-excerpt">{excerpt}</div>
              <div class="blog-card-footer">
                <span class="blog-card-read">Read Article</span>
                <span class="blog-card-time">{read_time} min read</span>
              </div>
            </div>
          </a>
"""
    
    # Locate where to insert card. We will insert it immediately after:
    # <div class="blog-grid">\n
    # OR immediately after the Featured Post's </a> tag.
    # Let's search for '<div class="blog-grid">' and insert it right after the featured post closing tag:
    # Let's find: <!-- Featured Post --> ... </a>
    # We can match '<div class="blog-grid">' and look for the next closing '</a>' tag or insert directly after '<div class="blog-grid">'
    grid_match = re.search(r'(<div class="blog-grid">[\s\S]*?<!-- Featured Post -->[\s\S]*?</a>)', index_content)
    
    if grid_match:
        target_str = grid_match.group(1)
        # Check if we already published this article in the grid to avoid duplicates
        if f'href="/blog/{slug}"' in index_content:
            print("Article is already linked in the blog grid index. Skipping insert.")
        else:
            new_index_content = index_content.replace(target_str, target_str + "\n\n" + card_html)
            with open(INDEX_HTML, "w", encoding="utf-8") as f:
                f.write(new_index_content)
            print("Inserted blog card into blog/index.html grid.")
    else:
        print("Error: Could not locate blog grid container inside blog/index.html")
        sys.exit(1)
        
    # 3. Clean HTML Links in modified files
    print("Running link cleaning script...")
    os.system("python3 scripts/clean_html_links.py")
    
    # 4. Generate llms.txt & llms-full.txt
    print("Running LLMs index generation script...")
    os.system("python3 scripts/generate_llms_txt.py")
    
    # 5. Commit and push to git
    run_git_commands(f"auto: publish blog post - {title}")
    
    # 6. Save new state index
    save_publish_index(idx + 1)
    print(f"Successfully published article {idx+1}/{len(ARTICLES)}: {title}")

if __name__ == "__main__":
    publish_next_blog()
