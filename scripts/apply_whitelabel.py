#!/usr/bin/env python3
"""
apply_whitelabel.py - Complete White-Labeling & Rebranding Engine

Reads whitelabel.json (or a custom JSON config) and applies the new branding,
domain, URLs, contacts, and metadata across the entire website codebase.
Automatically updates:
  1. All HTML pages (root, subdirectories, projects, blogs)
  2. All React / Next.js components and pages in `app/`
  3. All Markdown blog posts in `src/content/blog/`
  4. Sitemaps (XML sitemaps in root and public/)
  5. LLM catalogs (llms.txt, llms-full.txt)
  6. Automation & builder scripts in `scripts/`
  7. Manifest and metadata files (robots.txt, package.json, etc.)

Usage:
  python3 scripts/apply_whitelabel.py
  python3 scripts/apply_whitelabel.py --config /path/to/custom_brand.json
"""

import os
import sys
import json
import argparse
import subprocess
from datetime import datetime

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATE_FILE = os.path.join(ROOT_DIR, ".whitelabel_state.json")
DEFAULT_CONFIG_FILE = os.path.join(ROOT_DIR, "whitelabel.json")

DEFAULT_ORIGINAL_BRAND = {
    "brand": {
        "name": "TodayInTech",
        "name_spaced": "Today In Tech",
        "name_lower": "todayintech",
        "tagline": "Custom Startup Software Development Agency",
        "domain": "todayintech.in",
        "full_url": "https://todayintech.in",
        "logo_path": "/assets/nav_logo.png",
        "og_image": "https://todayintech.in/assets/og-image.png"
    },
    "contacts": {
        "email": "contact@todayintech.in",
        "phone": "+91 76793 49780",
        "whatsapp_number": "917679349780",
        "whatsapp_url": "https://wa.me/917679349780",
        "calendly_url": "https://calendly.com/todayintechdotin/30min",
        "calendly_handle": "todayintechdotin",
        "twitter": "@todayintech"
    }
}

ALLOWED_EXTENSIONS = {
    ".html", ".jsx", ".js", ".mjs", ".ts", ".tsx",
    ".md", ".xml", ".txt", ".json", ".py", ".sh", ".css"
}

IGNORED_DIRS = {
    ".git", "node_modules", ".next", ".gemini", "__pycache__",
    ".system_generated", "logs", "dist", "build"
}

IGNORED_FILES = {
    ".whitelabel_state.json", "pnpm-lock.yaml", "package-lock.yaml",
    "package-lock.json", "skills-lock.json"
}

def load_json(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)

def save_json(filepath, data):
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

def get_current_state():
    if os.path.exists(STATE_FILE):
        try:
            return load_json(STATE_FILE)
        except Exception:
            pass
    return DEFAULT_ORIGINAL_BRAND

def build_replacement_rules(old_cfg, new_cfg):
    """
    Build prioritized list of (search_str, replace_str) tuples.
    Specific/longer patterns MUST come before shorter/generic ones.
    """
    old_b = old_cfg.get("brand", {})
    old_c = old_cfg.get("contacts", {})
    new_b = new_cfg.get("brand", {})
    new_c = new_cfg.get("contacts", {})

    rules = []

    # 1. Calendly URLs & handles
    if old_c.get("calendly_url") and new_c.get("calendly_url"):
        rules.append((old_c["calendly_url"], new_c["calendly_url"]))
    if old_c.get("calendly_handle") and new_c.get("calendly_handle"):
        rules.append((old_c["calendly_handle"], new_c["calendly_handle"]))

    # 2. WhatsApp URLs & numbers
    if old_c.get("whatsapp_url") and new_c.get("whatsapp_url"):
        rules.append((old_c["whatsapp_url"], new_c["whatsapp_url"]))
    if old_c.get("whatsapp_number") and new_c.get("whatsapp_number"):
        rules.append((old_c["whatsapp_number"], new_c["whatsapp_number"]))

    # 3. Emails & Phone
    if old_c.get("email") and new_c.get("email"):
        rules.append((old_c["email"], new_c["email"]))
    if old_c.get("phone") and new_c.get("phone"):
        rules.append((old_c["phone"], new_c["phone"]))
    if old_c.get("twitter") and new_c.get("twitter"):
        rules.append((old_c["twitter"], new_c["twitter"]))

    # 4. Domain & Full URLs (with http, https, www, trailing slashes)
    old_dom = old_b.get("domain", "").strip()
    new_dom = new_b.get("domain", "").strip()

    if old_dom and new_dom:
        rules.append((f"https://www.{old_dom}", f"https://www.{new_dom}"))
        rules.append((f"http://www.{old_dom}", f"http://www.{new_dom}"))
        rules.append((f"https://{old_dom}", f"https://{new_dom}"))
        rules.append((f"http://{old_dom}", f"http://{new_dom}"))
        rules.append((f"www.{old_dom}", f"www.{new_dom}"))
        rules.append((old_dom, new_dom))

    # 5. OG Image & Logos
    if old_b.get("og_image") and new_b.get("og_image"):
        rules.append((old_b["og_image"], new_b["og_image"]))
    if old_b.get("logo_path") and new_b.get("logo_path"):
        rules.append((old_b["logo_path"], new_b["logo_path"]))

    # 6. Brand Names
    old_name = old_b.get("name", "").strip()
    new_name = new_b.get("name", "").strip()
    old_spaced = old_b.get("name_spaced", "").strip()
    new_spaced = new_b.get("name_spaced", "").strip()
    old_lower = old_b.get("name_lower", old_name.lower()).strip()
    new_lower = new_b.get("name_lower", new_name.lower()).strip()

    if old_spaced and new_spaced and old_spaced != old_name:
        rules.append((old_spaced, new_spaced))

    if old_name and new_name:
        rules.append((f"{old_name} Software", f"{new_name} Software"))
        rules.append((f"{old_name} Studio", f"{new_name} Studio"))
        rules.append((f"{old_name} ChMS", f"{new_name} ChMS"))
        rules.append((old_name, new_name))

    if old_lower and new_lower and old_lower != old_name:
        rules.append((old_lower, new_lower))

    # Remove duplicates while preserving order
    seen = set()
    final_rules = []
    for search_str, replace_str in rules:
        if not search_str or search_str == replace_str:
            continue
        if search_str not in seen:
            seen.add(search_str)
            final_rules.append((search_str, replace_str))

    return final_rules

def apply_replacements(rules):
    modified_files = []
    total_files_scanned = 0

    for root, dirs, files in os.walk(ROOT_DIR):
        # Filter out ignored directories
        dirs[:] = [d for d in dirs if d not in IGNORED_DIRS and not d.startswith(".")]

        for file in files:
            if file in IGNORED_FILES:
                continue

            _, ext = os.path.splitext(file)
            if ext.lower() not in ALLOWED_EXTENSIONS:
                continue

            filepath = os.path.join(root, file)
            # Avoid modifying whitelabel config itself if it's the target config
            if os.path.abspath(filepath) == os.path.abspath(DEFAULT_CONFIG_FILE):
                continue

            total_files_scanned += 1

            try:
                with open(filepath, "r", encoding="utf-8") as f:
                    original_content = f.read()

                content = original_content
                for search_str, replace_str in rules:
                    if search_str in content:
                        content = content.replace(search_str, replace_str)

                if content != original_content:
                    with open(filepath, "w", encoding="utf-8") as f:
                        f.write(content)
                    modified_files.append(os.path.relpath(filepath, ROOT_DIR))
            except Exception as e:
                print(f"Warning: Could not process {filepath}: {e}")

    return total_files_scanned, modified_files

def run_post_generation_scripts():
    print("\n--- Running Automated Post-Generation Pipelines ---")
    scripts_to_run = [
        ("generate_sitemaps.py", "Regenerating XML Sitemaps"),
        ("generate_llms_txt.py", "Regenerating LLMS.txt & Indexes"),
        ("compile_markdown_blogs.py", "Compiling Markdown Blogs"),
    ]

    for script_name, desc in scripts_to_run:
        script_path = os.path.join(ROOT_DIR, "scripts", script_name)
        if os.path.exists(script_path):
            print(f"[*] {desc} ({script_name})...")
            try:
                res = subprocess.run([sys.executable, script_path], cwd=ROOT_DIR, capture_output=True, text=True)
                if res.returncode == 0:
                    print(f"    ✓ Succeeded")
                else:
                    print(f"    ⚠ Notice: {res.stderr.strip() or res.stdout.strip()}")
            except Exception as e:
                print(f"    ✗ Error running {script_name}: {e}")

def main():
    parser = argparse.ArgumentParser(description="White-label the entire TodayInTech website.")
    parser.add_argument("--config", default=DEFAULT_CONFIG_FILE, help="Path to target whitelabel JSON config.")
    parser.add_argument("--dry-run", action="store_true", help="Preview changes without modifying files.")
    parser.add_argument("--skip-scripts", action="store_true", help="Skip running post-generation sitemaps/llms builders.")
    args = parser.parse_args()

    config_path = os.path.abspath(args.config)
    if not os.path.exists(config_path):
        print(f"Error: Config file not found at {config_path}")
        sys.exit(1)

    new_config = load_json(config_path)
    current_state = get_current_state()

    print("==================================================")
    print("      TodayInTech White-Label Engine")
    print("==================================================")
    print(f"Source Config : {config_path}")
    print(f"Current Brand : {current_state.get('brand', {}).get('name')} ({current_state.get('brand', {}).get('domain')})")
    print(f"Target Brand  : {new_config.get('brand', {}).get('name')} ({new_config.get('brand', {}).get('domain')})")
    print("--------------------------------------------------")

    rules = build_replacement_rules(current_state, new_config)

    if not rules:
        print("No differences detected between current state and target configuration.")
        print("Site is already up-to-date with this configuration!")
        if not args.skip_scripts:
            run_post_generation_scripts()
        return

    print(f"Generated {len(rules)} active replacement rule(s):")
    for s, r in rules[:8]:
        print(f"  • '{s}'  -->  '{r}'")
    if len(rules) > 8:
        print(f"  • ... and {len(rules) - 8} more rules.")
    print("--------------------------------------------------")

    if args.dry_run:
        print("[DRY-RUN] No files were modified.")
        return

    scanned, modified = apply_replacements(rules)
    print(f"Scanned  : {scanned} text files")
    print(f"Modified : {len(modified)} files")

    # Save new state
    save_json(STATE_FILE, new_config)

    # Run sitemaps and blog compilation
    if not args.skip_scripts:
        run_post_generation_scripts()

    print("\n==================================================")
    print("✓ White-Label Rebranding Applied Successfully!")
    print("==================================================")

if __name__ == "__main__":
    main()
