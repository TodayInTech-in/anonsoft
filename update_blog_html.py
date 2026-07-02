import re
import os

blog_mapping = {
    "no-upfront-payment-software-agency.html": {
        "image": "software_prototype.png",
        "alt": "TodayInTech Software Development Agency working prototype model"
    },
    "optimizing-threejs-draco-compression-3d-product-configurators.html": {
        "image": "threejs_optimization.png",
        "alt": "Three.js Draco compression optimization for 3D configurators"
    },
    "appinventiv-alternatives-healthcare-software-development.html": {
        "image": "competitor_review.png",
        "alt": "Top Appinventiv alternatives for healthcare app development comparison dashboard"
    },
    "agentic-ai-prior-authorization-revenue-cycle-management-healthcare.html": {
        "image": "agentic_ai_healthcare.png",
        "alt": "Agentic AI automating prior authorization and revenue cycle management in healthcare"
    },
    "intellectsoft-alternatives-healthcare-software-development.html": {
        "image": "competitor_review.png",
        "alt": "Top Intellectsoft alternatives for medical software development comparison chart"
    },
    "how-to-choose-erp-for-multi-branch-schools.html": {
        "image": "school_erp.png",
        "alt": "Choosing ERP software for multi-branch schools custom vs white-label"
    },
    "white-label-home-care-software-vs-custom-development-2026.html": {
        "image": "home_care_software.png",
        "alt": "White-label home care software vs custom ERP development dashboard"
    },
    "innowise-alternatives-healthcare-software-development.html": {
        "image": "competitor_review.png",
        "alt": "Innowise Group alternatives and competitors evaluation board"
    },
    "white-label-restaurant-pos-vs-custom-pos-development.html": {
        "image": "restaurant_pos.png",
        "alt": "White-label restaurant POS system vs custom POS development cost analysis"
    },
    "chetu-alternatives-healthcare-software-development.html": {
        "image": "competitor_review.png",
        "alt": "Top Chetu alternatives for custom healthcare software development"
    },
    "decentralized-clinical-trials-software-development-guide-2026.html": {
        "image": "clinical_trials.png",
        "alt": "Decentralized Clinical Trials DCT software development and FDA compliance guide"
    },
    "healee-alternatives-healthcare-software-development.html": {
        "image": "competitor_review.png",
        "alt": "Healee alternatives top patient portals and telehealth software compared"
    },
    "bacancy-alternatives-healthcare-software-development.html": {
        "image": "competitor_review.png",
        "alt": "Bacancy alternatives for digital health software development"
    },
    "sciencesoft-alternatives-healthcare-software-development.html": {
        "image": "competitor_review.png",
        "alt": "ScienceSoft alternatives for healthcare and medical software development"
    },
    "fhir-ehr-integration-guide-healthcare-startups-2026.html": {
        "image": "fhir_integration.png",
        "alt": "HL7 FHIR EHR interoperability and integration pipeline for health tech"
    },
    "htd-health-alternatives-healthcare-software-development.html": {
        "image": "competitor_review.png",
        "alt": "HTD Health alternatives for digital healthcare design and development"
    },
    "hospital-at-home-software-development-trends-2026.html": {
        "image": "hospital_at_home.png",
        "alt": "Hospital-at-Home software and remote telemetry command center"
    },
    "arkenea-alternatives-healthcare-software-development.html": {
        "image": "competitor_review.png",
        "alt": "Top Arkenea alternatives for healthcare software development comparison"
    },
    "agentic-ai-clinical-workflows-healthcare-software.html": {
        "image": "agentic_ai_healthcare.png",
        "alt": "Agentic AI clinical workflow automation with autonomous agents"
    },
    "white-label-vs-custom-healthcare-software.html": {
        "image": "white_label_vs_custom.png",
        "alt": "White-label vs custom healthcare software comparison model"
    },
    "telemedicine-app-development-cost-breakdown-for-2026.html": {
        "image": "telemedicine_cost.png",
        "alt": "Telemedicine app development cost guide and budget planning sheet"
    },
    "ai-medical-scribe-software-development-2026.html": {
        "image": "agentic_ai_healthcare.png",
        "alt": "AI medical scribe software ambient documentation workflow"
    },
    "ai-clinical-workflow-automation-healthcare-2026.html": {
        "image": "agentic_ai_healthcare.png",
        "alt": "AI clinical workflow automation healthcare platform opportunity"
    },
    "remote-patient-monitoring-software-development-2026.html": {
        "image": "remote_patient_monitoring.png",
        "alt": "Remote Patient Monitoring RPM software development guide for startups"
    },
    "agentic-ai-healthcare-software-2026.html": {
        "image": "agentic_ai_healthcare.png",
        "alt": "Agentic AI agents deployed on healthcare platform"
    },
    "telemedicine-app-development-guide-2026.html": {
        "image": "telemedicine_dev.png",
        "alt": "How to build a telemedicine mobile application developer guide"
    },
    "health-white-label-software-benefits.html": {
        "image": "white_label_health.png",
        "alt": "White-label health app software customization and rebranding benefits"
    },
    "ehr-emr-integration-best-practices.html": {
        "image": "ehr_emr.png",
        "alt": "EHR vs EMR differences and integration best practices comparison chart"
    },
    "hipaa-compliant-app-development.html": {
        "image": "hipaa_compliance.png",
        "alt": "HIPAA compliance checklist and cybersecurity settings for mobile health app"
    },
    "pharmacy-management-system-features.html": {
        "image": "pharmacy_management.png",
        "alt": "Pharmacy management system e-prescription queue and inventory dashboard"
    },
    "fitness-app-development-cost.html": {
        "image": "fitness_app.png",
        "alt": "Fitness app development cost breakdown on smartphone"
    },
    "ai-healthcare-trends-2026.html": {
        "image": "agentic_ai_healthcare.png",
        "alt": "AI healthcare trends and technologies reshaping medicine"
    }
}

# 1. Update blog/index.html
index_path = "/Users/skjasimuddin/.zhwork/todayintechweb/blog/index.html"
with open(index_path, "r", encoding="utf-8") as f:
    index_content = f.read()

# Let's parse each blog card in index_content and replace the <div class="blog-card-img">...</div> with <img>.
# A card starts with: <a href="/blog/filename" or <a href="blog/filename
# and ends when we reach the end of the block.
# We can find all matches of href="..." and then find the emoji block and replace it.

for filename, info in blog_mapping.items():
    img_name = info["image"]
    alt_text = info["alt"]
    
    # Target patterns for the link in index.html:
    # <a href="/blog/filename" or <a href="blog/filename" or <a href="/blog/filename.html" etc.
    # The structure:
    # <a href="[^"]*filename[^"]*" class="blog-card[^"]*">
    #   <div class="blog-card-img" style="[^"]*">EMOJI</div>
    
    # We construct a regex to match the <a> tag followed by the <div class="blog-card-img"> block.
    # Because there might be spacing, newlines, etc. between <a> and <div>, we'll use re.DOTALL and re.VERBOSE.
    pattern = rf'(<a\s+href="[^"]*{filename}"[^>]*>\s*)(<div\s+class="blog-card-img"[^>]*>.*?</div>)'
    
    replacement = rf'\1<img class="blog-card-img" src="../assets/blog/{img_name}" alt="{alt_text}" loading="lazy">'
    
    index_content, count = re.subn(pattern, replacement, index_content, flags=re.DOTALL)
    print(f"Replaced {count} occurrences of emoji in index.html for {filename}")

# Save updated blog/index.html
with open(index_path, "w", encoding="utf-8") as f:
    f.write(index_content)

# 2. Update individual blog post HTML files
blog_dir = "/Users/skjasimuddin/.zhwork/todayintechweb/blog"
for filename, info in blog_mapping.items():
    file_path = os.path.join(blog_dir, filename)
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        continue
        
    with open(file_path, "r", encoding="utf-8") as f:
        file_content = f.read()
        
    img_name = info["image"]
    
    # Replace og:image and twitter:image meta tags:
    # <meta property="og:image" content="https://todayintech.in/assets/og-image.png">
    # <meta name="twitter:image" content="https://todayintech.in/assets/og-image.png">
    
    og_pattern = r'<meta\s+property="og:image"\s+content="[^"]*assets/og-image.png"\s*/?>'
    og_replacement = f'<meta property="og:image" content="https://todayintech.in/assets/blog/{img_name}">'
    file_content, og_count = re.subn(og_pattern, og_replacement, file_content)
    
    twitter_pattern = r'<meta\s+name="twitter:image"\s+content="[^"]*assets/og-image.png"\s*/?>'
    twitter_replacement = f'<meta name="twitter:image" content="https://todayintech.in/assets/blog/{img_name}">'
    file_content, tw_count = re.subn(twitter_pattern, twitter_replacement, file_content)
    
    print(f"Updated {filename}: og:image={og_count}, twitter:image={tw_count}")
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(file_content)

print("HTML updates completed!")
