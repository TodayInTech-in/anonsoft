import re
import os

def minify_css(input_path, output_path):
    if not os.path.exists(input_path):
        print(f"Skipping (not found): {input_path}")
        return
        
    with open(input_path, "r") as f:
        content = f.read()
        
    orig_size = len(content)
    
    # Remove comments
    content = re.sub(r"/\*.*?\*/", "", content, flags=re.DOTALL)
    # Remove whitespace around selectors and properties
    content = re.sub(r"\s+", " ", content)
    content = re.sub(r"\s*\{\s*", "{", content)
    content = re.sub(r"\s*\}\s*", "}\n", content)
    content = re.sub(r"\s*;\s*", ";", content)
    content = re.sub(r"\s*:\s*", ":", content)
    content = re.sub(r"\s*,\s*", ",", content)
    content = content.strip()
    
    with open(output_path, "w") as f:
        f.write(content)
        
    new_size = len(content)
    print(f"Minified CSS {input_path} -> {output_path}: {orig_size/1024:.1f} KB -> {new_size/1024:.1f} KB (saved {(orig_size-new_size)/1024:.1f} KB)")

def minify_js(input_path, output_path):
    if not os.path.exists(input_path):
        print(f"Skipping (not found): {input_path}")
        return
        
    with open(input_path, "r") as f:
        content = f.read()
        
    orig_size = len(content)
    
    # Basic safe JS minification using regex (avoiding breaking string literals)
    # Remove block comments
    content = re.sub(r"/\*.*?\*/", "", content, flags=re.DOTALL)
    
    # Remove single-line comments that do not start inside a string
    # We split lines, strip them, remove comments, and rejoin
    lines = []
    for line in content.splitlines():
        line_stripped = line.strip()
        # Keep empty lines or reconstruct
        if not line_stripped:
            continue
        # Strip single-line comments unless they are in http:// or https://
        if "//" in line_stripped:
            # Simple check to see if it is comment or URL
            parts = line_stripped.split("//", 1)
            # If the double slash is preceded by http: or https:, it is a URL, keep it
            if not parts[0].endswith("http:") and not parts[0].endswith("https:"):
                line_stripped = parts[0].strip()
        if line_stripped:
            lines.append(line_stripped)
            
    content = "\n".join(lines)
    
    with open(output_path, "w") as f:
        f.write(content)
        
    new_size = len(content)
    print(f"Minified JS {input_path} -> {output_path}: {orig_size/1024:.1f} KB -> {new_size/1024:.1f} KB (saved {(orig_size-new_size)/1024:.1f} KB)")

if __name__ == "__main__":
    minify_css("style.css", "style.min.css")
    minify_js("script.js", "script.min.js")
