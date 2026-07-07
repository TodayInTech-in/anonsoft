import os
from PIL import Image

def optimize_avatars():
    # Avatars that only render as small elements (resizing to 128x128)
    avatars = [
        "assets/founder.png",
        "assets/barun.png",
        "assets/reviewer-1.png",
        "assets/reviewer-2.png",
        "assets/reviewer-3.png",
        "assets/reviewer-4.png",
        "assets/reviewer-5.png",
        "assets/reviewer-6.png"
    ]
    
    print("=== OPTIMIZING AVATARS ===")
    for path in avatars:
        if not os.path.exists(path):
            print(f"Skipping (not found): {path}")
            continue
            
        orig_size = os.path.getsize(path)
        try:
            with Image.open(path) as img:
                # Resize to 128x128
                img_resized = img.resize((128, 128), Image.Resampling.LANCZOS)
                img_resized.save(path, "PNG", optimize=True)
            new_size = os.path.getsize(path)
            savings = orig_size - new_size
            print(f"Optimized {path}: {orig_size/1024:.1f} KB -> {new_size/1024:.1f} KB (saved {savings/1024:.1f} KB)")
        except Exception as e:
            print(f"Error optimizing {path}: {e}")

def optimize_screenshots():
    # Large project mockups and screenshots (resizing to max 640px and converting to 8-bit palette)
    print("\n=== OPTIMIZING PROJECT SCREENSHOTS ===")
    
    directories = ["assets", "assets/project"]
    extensions = (".png", ".jpg", ".jpeg")
    
    # Exclude avatars (handled separately) and nav logo
    exclude = {
        "assets/founder.png",
        "assets/barun.png",
        "assets/reviewer-1.png",
        "assets/reviewer-2.png",
        "assets/reviewer-3.png",
        "assets/reviewer-4.png",
        "assets/reviewer-5.png",
        "assets/reviewer-6.png",
        "assets/nav_logo.png",
        "assets/logo.png"
    }
    
    for directory in directories:
        if not os.path.exists(directory):
            continue
            
        for file in os.listdir(directory):
            path = os.path.join(directory, file)
            if os.path.isdir(path) or path in exclude:
                continue
                
            if file.lower().endswith(extensions):
                orig_size = os.path.getsize(path)
                try:
                    with Image.open(path) as img:
                        # Skip if already small
                        if img.width <= 640 and img.height <= 640 and img.mode == "P":
                            continue
                            
                        # Downscale thumbnail
                        img.thumbnail((640, 640), Image.Resampling.LANCZOS)
                        
                        # Convert PNG to 8-bit palette to save massive bytes
                        if path.lower().endswith(".png"):
                            img_opt = img.convert("P", palette=Image.Palette.ADAPTIVE, colors=256)
                            img_opt.save(path, "PNG", optimize=True)
                        else:
                            if img.mode in ("RGBA", "LA"):
                                img = img.convert("RGB")
                            img.save(path, "JPEG", optimize=True, quality=85)
                            
                    new_size = os.path.getsize(path)
                    savings = orig_size - new_size
                    if savings > 0:
                        print(f"Optimized {path}: {orig_size/1024:.1f} KB -> {new_size/1024:.1f} KB (saved {savings/1024:.1f} KB)")
                except Exception as e:
                    print(f"Error optimizing {path}: {e}")

if __name__ == "__main__":
    optimize_avatars()
    optimize_screenshots()
