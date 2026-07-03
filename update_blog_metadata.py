import re
import os

blog_mapping = {
    "no-upfront-payment-software-agency.html": {
        "image": "software_prototype.png"
    },
    "optimizing-threejs-draco-compression-3d-product-configurators.html": {
        "image": "threejs_optimization.png"
    },
    "appinventiv-alternatives-healthcare-software-development.html": {
        "image": "competitor_review.png"
    },
    "agentic-ai-prior-authorization-revenue-cycle-management-healthcare.html": {
        "image": "agentic_ai_healthcare.png"
    },
    "intellectsoft-alternatives-healthcare-software-development.html": {
        "image": "competitor_review.png"
    },
    "how-to-choose-erp-for-multi-branch-schools.html": {
        "image": "school_erp.png"
    },
    "white-label-home-care-software-vs-custom-development-2026.html": {
        "image": "home_care_software.png"
    },
    "innowise-alternatives-healthcare-software-development.html": {
        "image": "competitor_review.png"
    },
    "white-label-restaurant-pos-vs-custom-pos-development.html": {
        "image": "restaurant_pos.png"
    },
    "chetu-alternatives-healthcare-software-development.html": {
        "image": "competitor_review.png"
    },
    "decentralized-clinical-trials-software-development-guide-2026.html": {
        "image": "clinical_trials.png"
    },
    "healee-alternatives-healthcare-software-development.html": {
        "image": "competitor_review.png"
    },
    "bacancy-alternatives-healthcare-software-development.html": {
        "image": "competitor_review.png"
    },
    "sciencesoft-alternatives-healthcare-software-development.html": {
        "image": "competitor_review.png"
    },
    "fhir-ehr-integration-guide-healthcare-startups-2026.html": {
        "image": "fhir_integration.png"
    },
    "htd-health-alternatives-healthcare-software-development.html": {
        "image": "competitor_review.png"
    },
    "hospital-at-home-software-development-trends-2026.html": {
        "image": "hospital_at_home.png"
    },
    "arkenea-alternatives-healthcare-software-development.html": {
        "image": "competitor_review.png"
    },
    "agentic-ai-clinical-workflows-healthcare-software.html": {
        "image": "agentic_ai_healthcare.png"
    },
    "white-label-vs-custom-healthcare-software.html": {
        "image": "white_label_vs_custom.png"
    },
    "telemedicine-app-development-cost-breakdown-for-2026.html": {
        "image": "telemedicine_cost.png"
    },
    "ai-medical-scribe-software-development-2026.html": {
        "image": "agentic_ai_healthcare.png"
    },
    "ai-clinical-workflow-automation-healthcare-2026.html": {
        "image": "agentic_ai_healthcare.png"
    },
    "remote-patient-monitoring-software-development-2026.html": {
        "image": "remote_patient_monitoring.png"
    },
    "agentic-ai-healthcare-software-2026.html": {
        "image": "agentic_ai_healthcare.png"
    },
    "telemedicine-app-development-guide-2026.html": {
        "image": "telemedicine_dev.png"
    },
    "health-white-label-software-benefits.html": {
        "image": "white_label_health.png"
    },
    "ehr-emr-integration-best-practices.html": {
        "image": "ehr_emr.png"
    },
    "hipaa-compliant-app-development.html": {
        "image": "hipaa_compliance.png"
    },
    "pharmacy-management-system-features.html": {
        "image": "pharmacy_management.png"
    },
    "fitness-app-development-cost.html": {
        "image": "fitness_app.png"
    },
    "ai-healthcare-trends-2026.html": {
        "image": "agentic_ai_healthcare.png"
    }
}

blog_dir = "/Users/skjasimuddin/.zhwork/todayintechweb/blog"

for filename, info in blog_mapping.items():
    file_path = os.path.join(blog_dir, filename)
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        continue
        
    with open(file_path, "r", encoding="utf-8") as f:
        file_content = f.read()
        
    img_name = info["image"]
    new_url = f"https://todayintech.in/assets/blog/{img_name}"
    
    # We can match:
    # <meta property="og:image" content="...">
    # and replace the content.
    # We use a pattern that captures the surrounding tags.
    og_pattern = r'(<meta\s+property="og:image"\s+content=")[^"]*(".*?>)'
    file_content, og_count = re.subn(og_pattern, rf'\g<1>{new_url}\g<2>', file_content)
    
    tw_pattern = r'(<meta\s+(?:name|property)="twitter:image"\s+content=")[^"]*(".*?>)'
    file_content, tw_count = re.subn(tw_pattern, rf'\g<1>{new_url}\g<2>', file_content)
    
    print(f"Updated {filename}: og:image={og_count}, twitter:image={tw_count}")
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(file_content)

print("Robust metadata update completed!")
