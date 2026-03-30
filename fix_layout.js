const fs = require('fs');

// 1. Fix the Hero Layouts in all 7 directories
const directories = ['services', 'features', 'about', 'contact', 'careers', 'ai', 'health'];

directories.forEach(dir => {
    let filePath = `${dir}/index.html`;
    if (!fs.existsSync(filePath)) return;
    
    let html = fs.readFileSync(filePath, 'utf8');

    // Remove the grid destruction by wrapping the hero children in a proper container
    // Currently it is:
    // <div class="container">
    //     <span class="section-label">...</span>
    //     <h1 class="hero-title">...</h1>
    //     ...
    // </div>
    // We need to wrap it inside <div class="hero-content" style="grid-column: 1 / -1; margin: 0 auto; width: 100%; max-width: 800px;">
    
    // Using simple replacement for the exact strings I injected earlier
    html = html.replace(/<div class="container">\s*<span class="section-label">/g, 
         '<div class="container">\n        <div class="hero-content" style="grid-column: 1 / -1; margin: 0 auto; width: 100%; max-width: 800px; padding: 0;">\n            <span class="section-label">');
         
    html = html.replace(/<\/div>\s*<\/section>/g, 
         '    </div>\n      </div>\n    </section>');
         
    // Fix the JS Typewriter over-write. 
    // script.js might be targeting .gradient-text indiscriminately OR specifically. 
    // To be safe, change .gradient-text to .page-gradient-text and add the css inline or simply use var(--gradient-primary).
    html = html.replace(/<span class="gradient-text">/g, '<span style="background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; color: transparent;">');

    // Fix CSS Paths
    fs.writeFileSync(filePath, html);
    console.log(`Fixed hero layout in ${filePath}`);
});

// 2. Fix the Navbar Overlap in index.html AND nested files
const allFiles = ['index.html', ...directories.map(d => `${d}/index.html`)];

allFiles.forEach(file => {
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');
    
    // Rename FAQ & Contact to Contact to save space
    html = html.replace(/>FAQ &amp; Contact<\/a>/g, '>Contact</a>');
    
    // Rename AI Solutions to AI
    html = html.replace(/>AI Solutions<\/a>/g, '>AI</a>');
    
    fs.writeFileSync(file, html);
    console.log(`Fixed nav link lengths in ${file}`);
});
