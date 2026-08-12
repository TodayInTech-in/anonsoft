const fs = require('fs');
const path = require('path');

const PROJECT_DIR = path.resolve(__dirname, '..');

// Directories to ignore
const IGNORE_DIRS = [
    'node_modules',
    '.git',
    '.claude',
    'assets',
    'scripts',
    'logs',
    'app', // Exclude Next.js folders to target only the static website version
    'src'
];

function getHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            if (!IGNORE_DIRS.includes(file)) {
                getHtmlFiles(filePath, fileList);
            }
        } else if (path.extname(file).toLowerCase() === '.html') {
            fileList.push(filePath);
        }
    });
    
    return fileList;
}

function run() {
    const htmlFiles = getHtmlFiles(PROJECT_DIR);
    console.log(`Found ${htmlFiles.length} HTML files to inspect.`);
    
    let modifiedCount = 0;
    
    htmlFiles.forEach(filePath => {
        const relativePath = path.relative(PROJECT_DIR, filePath);
        const depth = relativePath.split(path.sep).length - 1;
        
        // Determine correct relative path to analytics.js
        let scriptPath = 'analytics.js';
        if (depth > 0) {
            scriptPath = '../'.repeat(depth) + 'analytics.js';
        }
        
        const scriptTag = `<script src="${scriptPath}" defer></script>`;
        
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if analytics.js is already injected
        if (content.includes('analytics.js')) {
            console.log(`[Skipped] ${relativePath} already has analytics.js`);
            return;
        }
        
        // Find </head> tag and insert scriptTag before it
        const headEndIndex = content.toLowerCase().indexOf('</head>');
        if (headEndIndex === -1) {
            console.warn(`[Warning] No </head> tag found in ${relativePath}`);
            return;
        }
        
        // Insert before </head>
        const beforeHead = content.slice(0, headEndIndex);
        const afterHead = content.slice(headEndIndex);
        
        // Match indentation of previous line if possible
        const lastLineBreak = beforeHead.lastIndexOf('\n');
        let indent = '  ';
        if (lastLineBreak !== -1) {
            const lastLine = beforeHead.slice(lastLineBreak + 1);
            const indentMatch = lastLine.match(/^\s*/);
            if (indentMatch) {
                indent = indentMatch[0];
            }
        }
        
        const updatedContent = beforeHead + indent + scriptTag + '\n' + afterHead;
        
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`[Injected] ${relativePath} with depth ${depth} script tag: ${scriptTag}`);
        modifiedCount++;
    });
    
    console.log(`Done. Injected analytics.js into ${modifiedCount} HTML files.`);
}

run();
