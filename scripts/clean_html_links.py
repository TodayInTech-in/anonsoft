import os
import sys
import re

# Regex to match href="something.html" or href="something.html#anchor"
# Group 1: path, Group 2: optional anchor
href_regex = re.compile(r'href=["\']((?!https?://|mailto:|tel:|javascript:|#)[^"\']+)\.html(#?[^"\']*)["\']', re.IGNORECASE)

# Footer legal block replacement
legal_block_regex = re.compile(r'<div class="footer-legal">.*?</div>', re.DOTALL | re.IGNORECASE)
new_legal_block = """        <div class="footer-legal">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/refund-policy">Refund Policy</a>
        </div>"""

def clean_file(file_path):
    if not os.path.exists(file_path):
        return
        
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    def clean_url(match):
        path = match.group(1)
        anchor = match.group(2)
        
        # Normalize path: strip leading/trailing slashes for analysis
        norm_path = path.strip("/")
        
        # Check for index
        if norm_path == "index" or norm_path.endswith("/index") or norm_path.startswith("../index") or norm_path == "../index":
            # If it's a folder index like services/index, we strip /index
            if norm_path != "index" and norm_path != "../index" and "/" in norm_path:
                folder_path = norm_path.rsplit("/index", 1)[0]
                # resolve relative to absolute root
                if folder_path.startswith(".."):
                    cleaned_path = "/" + folder_path.replace("..", "").strip("/")
                else:
                    cleaned_path = "/" + folder_path.strip("/")
            else:
                # Homepage index
                cleaned_path = "/"
        else:
            # Resolve normal pages to absolute paths
            if norm_path.startswith(".."):
                cleaned_path = "/" + norm_path.replace("..", "").strip("/")
            else:
                cleaned_path = "/" + norm_path
        
        return f'href="{cleaned_path}{anchor}"'
        
    new_content, count = href_regex.subn(clean_url, content)
    new_content, legal_count = legal_block_regex.subn(new_legal_block, new_content)
    
    if count > 0 or legal_count > 0:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Cleaned {count} links & {legal_count} legal blocks in: {file_path}")

def main():
    # If files are passed in arguments, process only those files
    if len(sys.argv) > 1:
        files_to_process = sys.argv[1:]
        for file in files_to_process:
            # Skip legal files themselves in footer link updates, but process their internal links
            if file.endswith(".html"):
                clean_file(file)
    else:
        # Process the entire repository
        root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        for root, dirs, files in os.walk(root_dir):
            if any(p in root for p in [".git", ".claude", "node_modules"]):
                continue
            for file in files:
                if file.endswith(".html"):
                    # Skip the legal policy pages themselves as they are already custom styled in footer
                    if file in ["privacy.html", "terms.html", "refund-policy.html"]:
                        # Just clean URLs in them, skip legal footer updates
                        content_path = os.path.join(root, file)
                        with open(content_path, "r", encoding="utf-8") as f:
                            content = f.read()
                        new_content, count = href_regex.subn(lambda m: f'href="/{m.group(1).strip("/")}{m.group(2)}"', content)
                        if count > 0:
                            with open(content_path, "w", encoding="utf-8") as f:
                                f.write(new_content)
                        continue
                        
                    clean_file(os.path.join(root, file))

if __name__ == "__main__":
    main()
