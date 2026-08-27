const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// The nav section replacement
let newNav = `        <div class="nav-links" id="navLinks">
          <a href="/services/">Services</a>
          <a href="/features/">Features</a>
          <a href="/portfolio">Portfolio</a>
          <a href="/about/">About</a>
          <a href="/health/">HealthTech</a>
          <a href="/ai/">AI Solutions</a>
          <a href="/blog/">Blog</a>
          <a href="/careers/">Careers</a>
          <a href="/contact/">FAQ & Contact</a>
          <button id="themeToggle" class="theme-toggle" aria-label="Toggle Theme">☀️</button>
          <a href="" onclick="Calendly.initPopupWidget({url:'https://calendly.com/todayintechdotin/30min'});return false;" class="nav-cta" id="navCta">Get a Free Session</a>
        </div>`;

// Strongly match the nav-links div
html = html.replace(/<div class="nav-links"[^>]*>[\s\S]*?<\/div>/, newNav);

// Update logo to point to homepage
html = html.replace(/<a href="#" class="nav-logo">/g, '<a href="/" class="nav-logo">');

// We MUST update absolute routes so /services/ loads css from /style.css correctly
const convertToAbsolute = (str) => {
  return str.replace(/href="style\.min\.css"/g, 'href="/style.min.css"')
    .replace(/href="liquid-glass\.css"/g, 'href="/liquid-glass.css"')
    .replace(/src="script\.js"/g, 'src="/script.js"')
    .replace(/src="script\.min\.js"/g, 'src="/script.min.js?v=1.4"')
    .replace(/src="assets\//g, 'src="/assets/')
    .replace(/href="assets\//g, 'href="/assets/')
    .replace(/href="#/g, 'href="/#'); // Catch remaining hash links in footer
};

// Replace href="/# with original for things that shouldn't change
const fixFalsePositives = (str) => {
  return str.replace(/href="\/#"/g, 'href="/"');
};

// Split at <main> and <!-- ===== FOOTER ===== -->
const mainStartSplit = html.split('<main>');
const mainEndSplit = html.split('<!-- ===== FOOTER ===== -->');

if (mainStartSplit.length < 2 || mainEndSplit.length < 2) {
  console.log("Error parsing HTML structure.");
  process.exit(1);
}

let headAndNav = mainStartSplit[0] + '<main>\n';
let footerScripts = '\n  </main>\n\n  <!-- ===== FOOTER ===== -->' + mainEndSplit[1];

headAndNav = fixFalsePositives(convertToAbsolute(headAndNav));
footerScripts = fixFalsePositives(convertToAbsolute(footerScripts));

const pages = ['services', 'features', 'about', 'contact', 'careers', 'ai', 'health', 'portfolio'];

// Extract portfolio HTML from index.html and style it as the first section on its own page
const portfolioMatch = html.match(/(<!-- ===== PORTFOLIO SECTION ===== -->[\s\S]*?<\/section>)/);
const portfolioHtml = portfolioMatch ? portfolioMatch[1].replace('class="portfolio" id="portfolio"', 'class="portfolio" id="portfolio" style="padding-top: 150px; padding-bottom: 80px;"') : '';

pages.forEach(page => {
  // Generate specialized SEO titles for each page
  let specificHead = headAndNav.replace(/<title>.*?<\/title>/, `<title>${page.charAt(0).toUpperCase() + page.slice(1)} — TodayInTech Software Agency</title>`);

  let bodyContent = '';
  if (page === 'portfolio') {
    bodyContent = portfolioHtml;
  } else {
    const pagePath = `${page}/index.html`;
    let existingHtml = '';
    if (fs.existsSync(pagePath)) {
      existingHtml = fs.readFileSync(pagePath, 'utf8');
    }
    const mainMatch = existingHtml.match(/<main>([\s\S]*?)<\/main>/);
    if (mainMatch && mainMatch[1].trim() && !mainMatch[1].includes('We are migrating our dedicated')) {
      bodyContent = mainMatch[1];
    } else {
      bodyContent = `    <section class="hero" style="padding-top: 150px; padding-bottom: 80px; min-height: 50vh; display: flex; align-items: center; text-align: center; position: relative;">
      <div class="container" style="position: relative; z-index: 2;">
        <h1 class="hero-title" style="font-size: clamp(3rem, 6vw, 4.5rem); margin-bottom: 24px;"><span class="gradient-text">${page.charAt(0).toUpperCase() + page.slice(1)}</span></h1>
        <p class="hero-description" style="max-width: 600px; margin: 0 auto 30px; font-size: 1.1rem; color: var(--text-secondary);">We are migrating our dedicated ${page} content into this specialized domain. Check back soon for deep case studies, feature breakdowns, and comprehensive service details.</p>
        <div class="hero-buttons" style="justify-content: center;">
            <a href="" onclick="Calendly.initPopupWidget({url:'https://calendly.com/todayintechdotin/30min'});return false;" class="btn-primary">
              Get a Free Strategy Session
            </a>
            <a href="/" class="btn-secondary" style="border: 1px solid var(--primary); color: var(--primary);">
              Return to Homepage
            </a>
        </div>
      </div>
    </section>`;
    }
  }

  const pageHtml = `${specificHead}
${bodyContent}
${footerScripts}`;

  try {
    fs.mkdirSync(page, { recursive: true });
    fs.writeFileSync(`${page}/index.html`, pageHtml);
    console.log(`Created /${page}/index.html`);
  } catch (e) {
    console.log(`Error creating ${page}: ${e}`);
  }
});

// Update root index.html to have absolute paths for CSS/JS and the revised nav links
let updatedIndex = fixFalsePositives(convertToAbsolute(html));
// Fix the logo link that convertToAbsolute modified by mistake from "/" to "/#/"
updatedIndex = updatedIndex.replace(/href="\/#\/"/g, 'href="/"');
updatedIndex = updatedIndex.replace(/href="\/#\/services\/"/g, 'href="/services/"'); // fix the double replaces
updatedIndex = updatedIndex.replace(/href="\/#\/features\/"/g, 'href="/features/"');
updatedIndex = updatedIndex.replace(/href="\/#\/about\/"/g, 'href="/about/"');
updatedIndex = updatedIndex.replace(/href="\/#\/health\/"/g, 'href="/health/"');
updatedIndex = updatedIndex.replace(/href="\/#\/ai\/"/g, 'href="/ai/"');
updatedIndex = updatedIndex.replace(/href="\/#\/careers\/"/g, 'href="/careers/"');
updatedIndex = updatedIndex.replace(/href="\/#\/contact\/"/g, 'href="/contact/"');

fs.writeFileSync('index.html', updatedIndex);
console.log("Migration script complete, homepage strictly updated.");
