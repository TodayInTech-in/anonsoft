import shutil
import os

brain_dir = "/Users/skjasimuddin/.gemini/antigravity/brain/e194de90-88cb-4527-9902-46d8487fd739"
dest_dir = "/Users/skjasimuddin/.zhwork/todayintechweb/assets/blog"

mapping = {
    "software_prototype_1783015822657.png": "software_prototype.png",
    "threejs_optimization_1783015842054.png": "threejs_optimization.png",
    "competitor_review_1783015863500.png": "competitor_review.png",
    "agentic_ai_healthcare_1783015882709.png": "agentic_ai_healthcare.png",
    "school_erp_1783015905121.png": "school_erp.png",
    "home_care_software_1783015927743.png": "home_care_software.png",
    "restaurant_pos_1783015955944.png": "restaurant_pos.png",
    "clinical_trials_1783015979345.png": "clinical_trials.png",
    "fhir_integration_1783016003589.png": "fhir_integration.png",
    "hospital_at_home_1783016035779.png": "hospital_at_home.png",
    "white_label_vs_custom_1783016067796.png": "white_label_vs_custom.png",
    "telemedicine_cost_1783016101367.png": "telemedicine_cost.png",
    "telemedicine_dev_1783016149814.png": "telemedicine_dev.png",
    "white_label_health_1783016192607.png": "white_label_health.png",
    "ehr_emr_1783016231032.png": "ehr_emr.png",
    "hipaa_compliance_1783016296048.png": "hipaa_compliance.png",
    "pharmacy_management_1783016438236.png": "pharmacy_management.png"
}

for src_name, dest_name in mapping.items():
    src_path = os.path.join(brain_dir, src_name)
    dest_path = os.path.join(dest_dir, dest_name)
    if os.path.exists(src_path):
        shutil.copy(src_path, dest_path)
        print(f"Copied {src_name} to {dest_name}")
    else:
        print(f"Source not found: {src_path}")
