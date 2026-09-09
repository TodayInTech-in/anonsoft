const fs = require('fs');

const filesToUpdate = [
    'sitemap.xml',
    'index.html',
    'services/index.html',
    'features/index.html',
    'about/index.html',
    'health/index.html',
    'ai/index.html',
    'careers/index.html',
    'contact/index.html'
];

filesToUpdate.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace all instances of the .com domain with the .in domain
    // This fixes Canonical tags, Open Graph tags, Schema.org links, and Sitemap locations.
    let updatedContent = content.replace(/anonsoft\.com/g, 'anonsoft.in');
    
    // Write the updated content back to the file
    if (content !== updatedContent) {
        fs.writeFileSync(file, updatedContent);
        console.log(`Updated domain in ${file}`);
    }
});

console.log("Domain migration from .com to .in complete for SEO indexing!");
