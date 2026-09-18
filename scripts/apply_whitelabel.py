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
import shutil
import re
from datetime import datetime

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATE_FILE = os.path.join(ROOT_DIR, ".whitelabel_state.json")
DEFAULT_CONFIG_FILE = os.path.join(ROOT_DIR, "whitelabel.json")

DEFAULT_ORIGINAL_BRAND = {
    "brand": {
        "name": "Anonsoft",
        "name_spaced": "Anonsoft",
        "name_lower": "anonsoft",
        "tagline": "Custom Startup Software Development Agency",
        "domain": "anonsoft.com",
        "full_url": "https://anonsoft.com",
        "logo_path": "/assets/anonsoft.svg",
        "favicon_path": "/assets/favicon.ico",
        "og_image": "https://anonsoft.com/assets/anon-soft-og.png"
    },
    "contacts": {
        "email": "contact@anonsoft.com",
        "phone": "+91 9007900972",
        "whatsapp_number": "919007900972",
        "whatsapp_url": "https://wa.me/919007900972",
        "calendly_url": "https://calendly.com/anonsoftdotin/30min",
        "calendly_handle": "anonsoftdotin",
        "twitter": "@anonsoft"
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

    # 5. OG Image, Logos & Favicon
    if old_b.get("og_image") and new_b.get("og_image"):
        rules.append((old_b["og_image"], new_b["og_image"]))
    if old_b.get("logo_path") and new_b.get("logo_path"):
        rules.append((old_b["logo_path"], new_b["logo_path"]))
    if old_b.get("favicon_path") and new_b.get("favicon_path"):
        rules.append((old_b["favicon_path"], new_b["favicon_path"]))

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

def get_icon_mime_type(icon_path):
    ext = os.path.splitext(icon_path)[1].lower()
    if ext == ".png":
        return "image/png"
    elif ext == ".svg":
        return "image/svg+xml"
    return "image/x-icon"

def update_favicon_in_html(content, favicon_path):
    mime_type = get_icon_mime_type(favicon_path)
    icon_pattern = re.compile(r'<link\s+[^>]*rel=["\'](?:shortcut\s+)?icon["\'][^>]*>', re.IGNORECASE)
    apple_pattern = re.compile(r'<link\s+[^>]*rel=["\']apple-touch-icon["\'][^>]*>', re.IGNORECASE)

    new_icon_tag = f'<link rel="icon" type="{mime_type}" href="{favicon_path}">'
    new_apple_tag = f'<link rel="apple-touch-icon" href="{favicon_path}">'

    changed = False

    if icon_pattern.search(content):
        new_content, count = icon_pattern.subn(new_icon_tag, content)
        if count > 0 and new_content != content:
            content = new_content
            changed = True
    elif "</head>" in content:
        content = content.replace("</head>", f'  {new_icon_tag}\n  {new_apple_tag}\n</head>', 1)
        changed = True

    if apple_pattern.search(content):
        new_content, count = apple_pattern.subn(new_apple_tag, content)
        if count > 0 and new_content != content:
            content = new_content
            changed = True

    return content, changed

def sync_favicon_files(new_cfg, config_path, dry_run=False):
    """
    Synchronizes favicon files.
    If a favicon file/source is specified (or exists at new_cfg's favicon_path),
    copies it to standard project locations:
      - assets/favicon.ico
      - public/assets/favicon.ico
      - public/favicon.ico
      - favicon.ico (root)
    """
    brand = new_cfg.get("brand", {})
    favicon_path = brand.get("favicon_path", "").strip() or "/assets/favicon.ico"
    favicon_file = brand.get("favicon_file") or brand.get("favicon_source") or favicon_path

    candidate_paths = [
        favicon_file,
        os.path.join(os.path.dirname(config_path), favicon_file),
        os.path.join(ROOT_DIR, favicon_file.lstrip("/")),
        os.path.join(ROOT_DIR, "assets", os.path.basename(favicon_file)),
    ]

    source_path = None
    for cp in candidate_paths:
        if os.path.isfile(cp):
            source_path = os.path.abspath(cp)
            break

    # Fallback to existing assets/favicon.ico if present
    if not source_path:
        default_asset = os.path.join(ROOT_DIR, "assets", "favicon.ico")
        if os.path.isfile(default_asset):
            source_path = default_asset

    if not source_path or not os.path.isfile(source_path):
        print("  ⚠ Notice: No source favicon file found to sync.")
        return []

    destinations = [
        os.path.join(ROOT_DIR, "assets", "favicon.ico"),
        os.path.join(ROOT_DIR, "public", "assets", "favicon.ico"),
        os.path.join(ROOT_DIR, "public", "favicon.ico"),
        os.path.join(ROOT_DIR, "favicon.ico"),
    ]

    custom_name = os.path.basename(favicon_path)
    if custom_name and custom_name != "favicon.ico":
        destinations.extend([
            os.path.join(ROOT_DIR, "assets", custom_name),
            os.path.join(ROOT_DIR, "public", "assets", custom_name),
        ])

    synced_files = []
    for dest in destinations:
        try:
            os.makedirs(os.path.dirname(dest), exist_ok=True)
            needs_copy = False
            if not os.path.exists(dest):
                needs_copy = True
            elif os.path.abspath(source_path) != os.path.abspath(dest):
                if os.path.getmtime(source_path) > os.path.getmtime(dest) or os.path.getsize(source_path) != os.path.getsize(dest):
                    needs_copy = True

            if needs_copy:
                if not dry_run:
                    shutil.copyfile(source_path, dest)
                synced_files.append(os.path.relpath(dest, ROOT_DIR))
        except Exception as e:
            print(f"  ⚠ Warning: Could not copy favicon to {dest}: {e}")

    return synced_files

def apply_replacements(rules, new_favicon_path=None):
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

                # If this is an HTML file and new_favicon_path is set, update favicon tags
                if ext.lower() == ".html" and new_favicon_path:
                    content, _ = update_favicon_in_html(content, new_favicon_path)

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
    parser = argparse.ArgumentParser(description="White-label the entire Anonsoft website.")
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
    print("      Anonsoft White-Label Engine")
    print("==================================================")
    print(f"Source Config : {config_path}")
    print(f"Current Brand : {current_state.get('brand', {}).get('name')} ({current_state.get('brand', {}).get('domain')})")
    print(f"Target Brand  : {new_config.get('brand', {}).get('name')} ({new_config.get('brand', {}).get('domain')})")
    print("--------------------------------------------------")

    rules = build_replacement_rules(current_state, new_config)
    target_fav = new_config.get("brand", {}).get("favicon_path", "/assets/favicon.ico").strip()

    # 1. Synchronize binary favicon assets
    print("\n[*] Synchronizing Favicon Assets...")
    synced_favicons = sync_favicon_files(new_config, config_path, dry_run=args.dry_run)
    if synced_favicons:
        for f in synced_favicons:
            print(f"    ✓ Synced: {f}")
    else:
        print("    ✓ Favicon files are up to date.")

    if rules:
        print(f"\nGenerated {len(rules)} active replacement rule(s):")
        for s, r in rules[:8]:
            print(f"  • '{s}'  -->  '{r}'")
        if len(rules) > 8:
            print(f"  • ... and {len(rules) - 8} more rules.")
    else:
        print("\nNo brand text differences detected, checking favicon links across pages...")
    print("--------------------------------------------------")

    if args.dry_run:
        print("[DRY-RUN] Preview complete. No files were modified.")
        return

    scanned, modified = apply_replacements(rules, new_favicon_path=target_fav)
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
