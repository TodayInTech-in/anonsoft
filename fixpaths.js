const fs = require('fs');

function fixHTML(filePath, prefix) {
    if (!fs.existsSync(filePath)) return;
    let html = fs.readFileSync(filePath, 'utf8');

    // Revert /style.css to relative
    html = html.replace(/href="\/style\.css"/g, `href="${prefix}style.css"`);
    html = html.replace(/src="\/script\.js"/g, `src="${prefix}script.js"`);
    html = html.replace(/src="\/assets\//g, `src="${prefix}assets/`);
    html = html.replace(/href="\/assets\//g, `href="${prefix}assets/`);
    
    // Fix navigation links for file:// fallback
    html = html.replace(/href="\/services\/"/g, `href="${prefix}services/index.html"`);
    html = html.replace(/href="\/features\/"/g, `href="${prefix}features/index.html"`);
    html = html.replace(/href="\/about\/"/g, `href="${prefix}about/index.html"`);
    html = html.replace(/href="\/health\/"/g, `href="${prefix}health/index.html"`);
    html = html.replace(/href="\/ai\/"/g, `href="${prefix}ai/index.html"`);
    html = html.replace(/href="\/careers\/"/g, `href="${prefix}careers/index.html"`);
    html = html.replace(/href="\/contact\/"/g, `href="${prefix}contact/index.html"`);
    html = html.replace(/href="\/" class="nav-logo"/g, `href="${prefix}index.html" class="nav-logo"`);
    html = html.replace(/href="\/" class="btn-secondary"/g, `href="${prefix}index.html" class="btn-secondary"`);
    
    // Optional: Re-fix trailing slashes in root footer that were converted to /
    html = html.replace(/href="\/"/g, `href="${prefix}index.html"`);

    // Clean up
    html = html.replace(`href="${prefix}index.html" class="btn-secondary"`, `href="${prefix}index.html" class="btn-secondary"`); // No-op

    fs.writeFileSync(filePath, html);
    console.log(`Fixed paths in ${filePath} to use '${prefix}'`);
}

// 1. Fix root index.html to use './' essentially just standard relative
fixHTML('index.html', '');

// 2. Fix subpages to use '../'
const directories = ['services', 'features', 'about', 'contact', 'careers', 'ai', 'health'];
directories.forEach(dir => {
    fixHTML(`${dir}/index.html`, '../');
});
