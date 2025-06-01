#!/usr/bin/env node

// filepath: /Users/rob/Desktop/zen.sre.studio/scripts/create-page.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

function generatePageHTML(pageName, markdownFile) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${pageName} - Zen SRE Studio</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/public/fonts/fonts.css">
    <link rel="stylesheet" href="/src/style.css">
  </head>
  <body>
    <main>
      <div class="zen-content">
        <div class="home-link">
          <a href="/">&larr; Back to Home</a>
        </div>
        
        <div id="markdown-content">
          <p class="zen-loading">Loading content...</p>
        </div>
      </div>
    </main>
    
    <script type="module">
      import { createMarkdownPage } from '/src/page-utils.js';
      
      createMarkdownPage({
        title: '${pageName} - Zen SRE Studio',
        markdownPath: '/content/${markdownFile}.md'
      });
    </script>
  </body>
</html>`;
}

function generateMarkdownTemplate(pageName) {
  return `# ${pageName}

*Brief description of this page*

## Introduction

Write your content here using markdown syntax.

### Subsection

You can use:

- **Bold text**
- *Italic text*
- \`Inline code\`
- [Links](https://example.com)

> "A meaningful quote that relates to your content"
> 
> *— Author Name*

#### Code Examples

\`\`\`javascript
// Your code examples
console.log('Hello, zen world!');
\`\`\`

### Lists

1. First item
2. Second item
3. Third item

---

*Footer note or closing thought*
`;
}

function createPage(pageName, fileName) {
  if (!pageName || !fileName) {
    console.error('Usage: node scripts/create-page.js <page-name> <file-name>');
    console.error('Example: node scripts/create-page.js "Philosophy" "philosophy"');
    process.exit(1);
  }

  const htmlFile = path.join(projectRoot, `${fileName}.html`);
  const markdownFile = path.join(projectRoot, 'content', `${fileName}.md`);

  // Check if files already exist
  if (fs.existsSync(htmlFile)) {
    console.error(`Error: ${fileName}.html already exists`);
    process.exit(1);
  }

  if (fs.existsSync(markdownFile)) {
    console.error(`Error: content/${fileName}.md already exists`);
    process.exit(1);
  }

  // Create HTML file
  const htmlContent = generatePageHTML(pageName, fileName);
  fs.writeFileSync(htmlFile, htmlContent);

  // Create markdown file
  const markdownContent = generateMarkdownTemplate(pageName);
  fs.writeFileSync(markdownFile, markdownContent);

  console.log(`✅ Created new page: ${pageName}`);
  console.log(`   📄 HTML: ${fileName}.html`);
  console.log(`   📝 Markdown: content/${fileName}.md`);
  console.log(`\n🌐 Visit: http://localhost:5173/${fileName}.html`);
  console.log(`\n📝 Edit the markdown file to add your content:`);
  console.log(`   code content/${fileName}.md`);
}

// Get command line arguments
const args = process.argv.slice(2);
const pageName = args[0];
const fileName = args[1] || pageName?.toLowerCase().replace(/\s+/g, '-');

createPage(pageName, fileName);
