import re
import os

def minify_css(input_path, output_path):
    if not os.path.exists(input_path):
        print(f"Skipping (not found): {input_path}")
        return
        
    with open(input_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    orig_size = len(content)
    
    # Remove comments
    content = re.sub(r"/\*.*?\*/", "", content, flags=re.DOTALL)
    # Remove unnecessary whitespace
    content = re.sub(r"\s+", " ", content)
    content = re.sub(r"\s*\{\s*", "{", content)
    content = re.sub(r"\s*\}\s*", "}\n", content)
    content = re.sub(r"\s*;\s*", ";", content)
    content = re.sub(r"\s*:\s*", ":", content)
    content = re.sub(r"\s*,\s*", ",", content)
    content = content.strip()
    
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(content)
        
    new_size = len(content)
    print(f"Minified CSS {input_path} -> {output_path}: {orig_size/1024:.1f} KB -> {new_size/1024:.1f} KB (saved {(orig_size-new_size)/1024:.1f} KB)")

def remove_js_comments(js_text):
    """
    Robust JavaScript tokenizer that strips comments while safely preserving
    single-quoted strings, double-quoted strings, template literals, and regex literals.
    """
    out = []
    i = 0
    n = len(js_text)
    
    while i < n:
        char = js_text[i]
        
        # String literal with single or double quotes
        if char == '"' or char == "'":
            quote = char
            out.append(quote)
            i += 1
            while i < n:
                c = js_text[i]
                out.append(c)
                if c == '\\' and i + 1 < n:
                    i += 1
                    out.append(js_text[i])
                elif c == quote:
                    break
                i += 1
            i += 1
            continue
            
        # Template literal (backticks)
        if char == '`':
            out.append('`')
            i += 1
            while i < n:
                c = js_text[i]
                out.append(c)
                if c == '\\' and i + 1 < n:
                    i += 1
                    out.append(js_text[i])
                elif c == '`':
                    break
                i += 1
            i += 1
            continue
            
        # Comments or Regex or Division
        if char == '/':
            if i + 1 < n and js_text[i + 1] == '/':
                # Single-line comment: skip till end of line
                i += 2
                while i < n and js_text[i] != '\n':
                    i += 1
                continue
            elif i + 1 < n and js_text[i + 1] == '*':
                # Multi-line comment: skip till */
                i += 2
                while i + 1 < n and not (js_text[i] == '*' and js_text[i + 1] == '/'):
                    i += 1
                i += 2
                continue
            else:
                # Could be regex literal or division operator
                # Look backwards for previous non-whitespace token
                j = len(out) - 1
                while j >= 0 and out[j] in ' \t\r\n':
                    j -= 1
                prev_char = out[j] if j >= 0 else ''
                
                # If preceded by certain punctuation / keywords, it's a regex literal
                is_regex = (j < 0 or prev_char in '=(:[{,;!&|?~+-*^%')
                
                out.append('/')
                i += 1
                
                if is_regex:
                    in_char_class = False
                    while i < n:
                        c = js_text[i]
                        out.append(c)
                        if c == '\\' and i + 1 < n:
                            i += 1
                            out.append(js_text[i])
                        elif c == '[':
                            in_char_class = True
                        elif c == ']':
                            in_char_class = False
                        elif c == '/' and not in_char_class:
                            break
                        elif c == '\n':
                            # Regex literals cannot span unescaped newlines
                            break
                        i += 1
                    i += 1
                continue
                
        out.append(char)
        i += 1
        
    return "".join(out)

def minify_js(input_path, output_path):
    if not os.path.exists(input_path):
        print(f"Skipping (not found): {input_path}")
        return
        
    with open(input_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    orig_size = len(content)
    
    cleaned = remove_js_comments(content)
    
    # Clean up empty lines while preserving code structure
    lines = [line.strip() for line in cleaned.splitlines() if line.strip()]
    content = "\n".join(lines)
    
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(content)
        
    new_size = len(content)
    print(f"Minified JS {input_path} -> {output_path}: {orig_size/1024:.1f} KB -> {new_size/1024:.1f} KB (saved {(orig_size-new_size)/1024:.1f} KB)")

if __name__ == "__main__":
    minify_css("style.css", "style.min.css")
    minify_js("script.js", "script.min.js")

