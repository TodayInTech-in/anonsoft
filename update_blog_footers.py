import os
import re

new_footer = """  <footer class="footer" id="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="/index.html" class="nav-logo" aria-label="TodayInTech Homepage">
            <img src="../assets/nav_logo.png" alt="TodayInTech - Custom software and virtual care platform development logo" style="height: 48px !important; width: auto !important; max-width: none !important; border-radius: 0 !important;">
          </a>
          <p>We help startups and businesses build scalable SaaS platforms, AI tools, and mobile apps. Your vision, our expertise.</p>

          <!-- Trust Badge -->
          <div class="msme-badge"
            style="display: flex; align-items: center; gap: 12px; margin: 24px 0; padding: 12px 16px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; width: fit-content; transition: 0.3s;">
            <img src="../assets/certificate/msme-loo.png" alt="MSME UDYAM Registered Logo"
              style="height: 38px; width: auto; object-fit: contain;" loading="lazy">
            <div style="display: flex; flex-direction: column;">
              <span
                style="font-size: 0.7rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Govt. of India Registered MSME</span>
              <span
                style="font-size: 0.85rem; color: var(--text-primary); font-weight: 700; font-family: monospace; letter-spacing: 0.5px; margin-top: 2px;">UDYAM-WB-03-0108090</span>
            </div>
          </div>

          <div class="footer-socials">
            <a href="https://www.facebook.com/people/Today-In-Tech/61583127425585/" target="_blank" rel="noopener"
              class="footer-social" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/todayintech/" target="_blank" rel="noopener" class="footer-social"
              aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="https://www.linkedin.com/company/109768769" target="_blank" rel="noopener" class="footer-social"
              aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>

        <div class="footer-column">
          <h4>Services</h4>
          <ul>
            <li><a href="/projects/inventory-billing.html">Inventory & Billing</a></li>
            <li><a href="/projects/school-management-system.html">School ERP System</a></li>
            <li><a href="/projects/restaurant-management-system.html">Restaurant POS System</a></li>
            <li><a href="/projects/senior-care-agency.html">Senior Care Agency</a></li>
            <li><a href="/projects/impakto.html">3D Product Customizer</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h4>Company</h4>
          <ul>
            <li><a href="/#about">About Us</a></li>
            <li><a href="/#portfolio">Our Work</a></li>
            <li><a href="/#process">Process</a></li>
            <li><a href="/#testimonials">Reviews</a></li>
            <li><a href="/#contact">Contact</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:contact@todayintech.in">contact@todayintech.in</a></li>
            <li><a href="tel:+917679349780">+91 7679349780</a></li>
            <li><a href="/index.html">Kolkata, India</a></li>
            <li><a href=""
                onclick="Calendly.initPopupWidget({url:'https://calendly.com/todayintechdotin/30min'});return false;">Book a Call →</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-copyright">&copy; 2024–2026 TodayInTech. All rights reserved.</p>
        <div class="footer-legal">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#cookies">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>"""

blog_dir = "/Users/skjasimuddin/.zhwork/todayintechweb/blog"

files_to_update = []
for root, dirs, files in os.walk(blog_dir):
    for file in files:
        if file.endswith(".html"):
            files_to_update.append(os.path.join(root, file))

# We also check for telemedicine-software-for-clinics.html and healthcare-saas-mvp-development.html in root
root_dir = "/Users/skjasimuddin/.zhwork/todayintechweb"
root_htmls = [
    "healthcare-saas-mvp-development.html",
    "telemedicine-software-for-clinics.html",
    "wellness-platform-development.html"
]
for root_html in root_htmls:
    path = os.path.join(root_dir, root_html)
    if os.path.exists(path):
        files_to_update.append(path)

# Regex to find <footer ...>...</footer> (using re.DOTALL and re.IGNORECASE)
footer_regex = re.compile(r'<footer[^>]*>.*?</footer>', re.DOTALL | re.IGNORECASE)

updated_count = 0
for file_path in files_to_update:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Check if footer exists in file
    if footer_regex.search(content):
        # If it's one of the root html files, the path to assets should be different (without ../)
        if file_path.startswith(root_dir) and not file_path.startswith(blog_dir):
            root_footer = new_footer.replace("../assets/", "assets/")
            content, count = footer_regex.subn(root_footer, content)
        else:
            content, count = footer_regex.subn(new_footer, content)
            
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated footer in: {os.path.basename(file_path)}")
        updated_count += 1
    else:
        print(f"No footer found in: {os.path.basename(file_path)}")

print(f"Successfully updated footer in {updated_count} files.")
