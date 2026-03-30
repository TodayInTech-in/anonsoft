const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

// Helper to extract sections cleanly
function extractSection(html, startCommentReg, endCommentReg) {
    const match = html.match(new RegExp(`${startCommentReg}[\\s\\S]*?${endCommentReg}`));
    if(!match) {
        console.warn(`Warning: Could not extract section ${startCommentReg}`);
        return '';
    }
    return match[0].replace(startCommentReg, '').replace(endCommentReg, '').trim();
}

// Regex mappings for the exact layout structure of index.html 
const chunks = {
    trusted: extractSection(indexHtml, '<!-- ===== TRUSTED BY ===== -->', '<!-- ===== PRESS \/ AS SEEN IN ===== -->'),
    press: extractSection(indexHtml, '<!-- ===== PRESS \/ AS SEEN IN ===== -->', '<!-- ===== SERVICES SECTION ===== -->'),
    services: extractSection(indexHtml, '<!-- ===== SERVICES SECTION ===== -->', '<!-- ===== ABOUT \/ WHY US SECTION ===== -->'),
    about: extractSection(indexHtml, '<!-- ===== ABOUT \/ WHY US SECTION ===== -->', '<!-- ===== PORTFOLIO SECTION ===== -->'),
    portfolio: extractSection(indexHtml, '<!-- ===== PORTFOLIO SECTION ===== -->', '<!-- ===== PROCESS SECTION ===== -->'),
    process: extractSection(indexHtml, '<!-- ===== PROCESS SECTION ===== -->', '<!-- ===== TESTIMONIALS SECTION ===== -->'),
    testimonials: extractSection(indexHtml, '<!-- ===== TESTIMONIALS SECTION ===== -->', '<!-- ===== TECH STACK ===== -->'),
    tech: extractSection(indexHtml, '<!-- ===== TECH STACK ===== -->', '<!-- ===== WHY WHITE-LABEL vs CUSTOM ===== -->'),
    whitelabel: extractSection(indexHtml, '<!-- ===== WHY WHITE-LABEL vs CUSTOM ===== -->', '<!-- ===== PRICING SECTION ===== -->'),
    pricing: extractSection(indexHtml, '<!-- ===== PRICING SECTION ===== -->', '<!-- ===== FAQ SECTION ===== -->'),
    faq: extractSection(indexHtml, '<!-- ===== FAQ SECTION ===== -->', '<!-- ===== ROI CALCULATOR SECTION ===== -->'),
    roi: extractSection(indexHtml, '<!-- ===== ROI CALCULATOR SECTION ===== -->', '<!-- ===== CTA SECTION ===== -->'),
    cta: extractSection(indexHtml, '<!-- ===== CTA SECTION ===== -->', '<\/main>')
};

// Some sections like #about or #services don't have enough padding globally because they were stacked.
const padSection = (str) => `\n<div style="padding: 2rem 0;">\n${str}\n</div>\n`;

// Helper to fix anchors inside nested files to point relatively (for the file:/// protocol constraint)
const fixNestedAnchors = (html) => {
    return html.replace(/src="assets\//g, 'src="../assets/')
               .replace(/href="assets\//g, 'href="../assets/')
               .replace(/href="#services"/g, 'href="../services/index.html"')
               .replace(/href="#features"/g, 'href="../features/index.html"')
               .replace(/href="#about"/g, 'href="../about/index.html"')
               .replace(/href="#contact"/g, 'href="../contact/index.html"')
               .replace(/href="#pricing"/g, 'href="../features/index.html#pricing"');
};

const pagesData = {
    'services': `
        <section class="hero" style="padding: calc(var(--nav-height) + 60px) 0 40px; text-align: center;">
            <div class="container">
                <span class="section-label">Enterprise Solutions</span>
                <h1 class="hero-title" style="font-size: clamp(2.5rem, 5vw, 4rem); margin-bottom: 24px;">Scalable <span class="gradient-text">Platforms</span><br>Built for Impact</h1>
                <p style="max-width: 600px; margin: 0 auto; color: var(--text-secondary);">We don't just write code. We deliver end-to-end digital experiences designed to scale and convert.</p>
            </div>
        </section>
        ${chunks.services}
        ${chunks.process}
        ${padSection(chunks.cta)}
    `,
    'features': `
        <section class="hero" style="padding: calc(var(--nav-height) + 60px) 0 40px; text-align: center;">
            <div class="container">
                <span class="section-label">Product Features</span>
                <h1 class="hero-title" style="font-size: clamp(2.5rem, 5vw, 4rem); margin-bottom: 24px;">Enterprise-Grade <span class="gradient-text">Infrastructure</span></h1>
                <p style="max-width: 600px; margin: 0 auto; color: var(--text-secondary);">Your product needs to be secure, compliant, and always available. See how we ensure 99.9% uptime.</p>
            </div>
        </section>
        ${chunks.tech}
        ${chunks.whitelabel}
        ${chunks.pricing}
        ${padSection(chunks.cta)}
    `,
    'about': `
        <section class="hero" style="padding: calc(var(--nav-height) + 60px) 0 40px; text-align: center;">
            <div class="container">
                <span class="section-label">The Agency</span>
                <h1 class="hero-title" style="font-size: clamp(2.5rem, 5vw, 4rem); margin-bottom: 24px;">Who is <span class="gradient-text">TodayInTech?</span></h1>
                <p style="max-width: 600px; margin: 0 auto; color: var(--text-secondary);">A global collective of engineers, designers, and strategists redefining what software delivery should look like.</p>
            </div>
        </section>
        <div style="padding-top: 40px;">${chunks.trusted}</div>
        ${chunks.about}
        ${chunks.testimonials}
        ${chunks.press}
        ${padSection(chunks.cta)}
    `,
    'contact': `
        <section class="hero" style="padding: calc(var(--nav-height) + 60px) 0 40px; text-align: center;">
            <div class="container">
                <span class="section-label">Get in Touch</span>
                <h1 class="hero-title" style="font-size: clamp(2.5rem, 5vw, 4rem); margin-bottom: 24px;">Let's Talk <span class="gradient-text">Strategy</span></h1>
            </div>
        </section>
        ${chunks.roi}
        ${chunks.faq}
    `,
    'health': `
        <section class="hero" style="padding: calc(var(--nav-height) + 60px) 0 40px; text-align: center;">
            <div class="container">
                <span class="section-label">Healthcare Solutions</span>
                <h1 class="hero-title" style="font-size: clamp(2.5rem, 5vw, 4rem); margin-bottom: 24px;">HIPAA-Compliant <span class="gradient-text">Telemedicine</span></h1>
                <p style="max-width: 600px; margin: 0 auto; color: var(--text-secondary);">Whitelabel healthcare platforms launching in record time.</p>
            </div>
        </section>
        ${chunks.whitelabel}
        ${chunks.portfolio}
        ${chunks.faq}
        ${padSection(chunks.cta)}
    `,
    'ai': `
        <section class="hero" style="padding: calc(var(--nav-height) + 60px) 0 40px; text-align: center;">
            <div class="container">
                <span class="section-label">Artificial Intelligence</span>
                <h1 class="hero-title" style="font-size: clamp(2.5rem, 5vw, 4rem); margin-bottom: 24px;">Generative <span class="gradient-text">AI Integrations</span></h1>
                <p style="max-width: 600px; margin: 0 auto; color: var(--text-secondary);">From custom LLM wrappers to predictive analytics, automate your workflow.</p>
            </div>
        </section>
        <section class="services" style="padding-bottom: 80px;">
          <div class="container">
            <div class="services-grid">
               <div class="service-card reveal">
                  <div class="service-icon icon-purple">🤖</div>
                  <h3>Custom LLM Agents</h3><p>Integrate ChatGPT, Claude, or local open-source models directly into your product to automate customer support.</p>
               </div>
               <div class="service-card reveal">
                  <div class="service-icon icon-blue">📊</div>
                  <h3>Predictive Analytics</h3><p>Train machine learning models on your proprietary data to unlock predictive forecasting and operational dominance.</p>
               </div>
               <div class="service-card reveal">
                  <div class="service-icon icon-red">🧠</div>
                  <h3>Computer Vision</h3><p>Automate quality control, image classification, and processing workflows via API.</p>
               </div>
            </div>
          </div>
        </section>
        ${padSection(chunks.cta)}
    `,
    'careers': `
        <section class="hero" style="padding: calc(var(--nav-height) + 60px) 0 40px; text-align: center;">
            <div class="container">
                <span class="section-label">Join The Team</span>
                <h1 class="hero-title" style="font-size: clamp(2.5rem, 5vw, 4rem); margin-bottom: 24px;">Build Products <span class="gradient-text">That Matter</span></h1>
                <p style="max-width: 600px; margin: 0 auto; color: var(--text-secondary);">We are always looking for driven talent across development, design, and operations.</p>
            </div>
        </section>
        <section class="process" style="padding-bottom: 80px;">
            <div class="container">
                <div class="process-steps">
                    <div class="process-step" style="text-align: left;">
                        <h3>Senior Full-Stack Engineer</h3>
                        <p style="margin-bottom: 12px;">Remote (India/US) • Full Time</p>
                        <ul style="color: var(--text-secondary); margin-bottom: 20px; padding-left: 20px;">
                          <li>5+ Years React/Node</li>
                          <li>Experience with AWS and CI/CD workflows</li>
                        </ul>
                        <a href="mailto:careers@todayintech.in" class="btn-secondary" style="display:inline-block; border-color:var(--primary); color:var(--primary); padding: 8px 16px; border-radius: 8px; font-weight: bold; text-decoration: none;">Apply Now</a>
                    </div>
                    <div class="process-step" style="text-align: left;">
                        <h3>Lead UX/UI Designer</h3>
                        <p style="margin-bottom: 12px;">Remote • Full Time</p>
                        <ul style="color: var(--text-secondary); margin-bottom: 20px; padding-left: 20px;">
                          <li>Strong Figma & Prototyping portfolio</li>
                          <li>Experience with healthcare design a plus</li>
                        </ul>
                        <a href="mailto:careers@todayintech.in" class="btn-secondary" style="display:inline-block; border-color:var(--primary); color:var(--primary); padding: 8px 16px; border-radius: 8px; font-weight: bold; text-decoration: none;">Apply Now</a>
                    </div>
                </div>
            </div>
        </section>
    `
};

// Loop through each domain directory and inject the layout exactly
Object.keys(pagesData).forEach(page => {
    let targetFile = `${page}/index.html`;
    if(!fs.existsSync(targetFile)) return;

    let targetHTML = fs.readFileSync(targetFile, 'utf8');
    
    // Completely wipe whatever is inside the <main> tag of the nested file
    const mainStart = targetHTML.indexOf('<main>');
    const mainEnd = targetHTML.indexOf('</main>');
    
    if(mainStart !== -1 && mainEnd !== -1) {
        const topHtml = targetHTML.slice(0, mainStart + 6);
        const bottomHtml = targetHTML.slice(mainEnd);
        
        let newHtml = topHtml + '\n' + fixNestedAnchors(pagesData[page]) + '\n' + bottomHtml;
        fs.writeFileSync(targetFile, newHtml);
        console.log(`Successfully populated content for /${page}/`);
    } else {
         console.warn(`Could not populate ${page} because <main> tags were not found.`);
    }
});

console.log("Population Engine complete! All pages possess production-ready formatted components.");
