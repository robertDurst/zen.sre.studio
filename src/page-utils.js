import { loadAndRenderMarkdown } from './markdown.js';

/**
 * Create a new markdown-based page
 * @param {Object} options - Page configuration
 * @param {string} options.title - Page title
 * @param {string} options.markdownPath - Path to the markdown file
 * @param {string} options.homeLink - Link back to home (default: '/')
 * @param {HTMLElement} options.container - Container element (default: finds #markdown-content)
 */
export function createMarkdownPage(options = {}) {
  const {
    title = 'Zen SRE Studio',
    markdownPath,
    homeLink = '/',
    container = document.getElementById('markdown-content')
  } = options;

  // Update page title
  if (title) {
    document.title = title;
  }

  // Update home link if it exists
  const homeLinkElement = document.querySelector('.home-link a');
  if (homeLinkElement && homeLink) {
    homeLinkElement.href = homeLink;
  }

  // Load and render markdown content
  if (markdownPath && container) {
    loadAndRenderMarkdown(markdownPath, container);
  } else {
    console.error('createMarkdownPage: markdownPath and container are required');
  }
}

/**
 * Template for creating new pages quickly
 * @param {string} pageName - Name of the page
 * @param {string} markdownFile - Name of the markdown file (without .md extension)
 */
export function generatePageHTML(pageName, markdownFile) {
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
