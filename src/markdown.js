import { marked } from 'marked';
import hljs from 'highlight.js';

// Configure marked for our zen aesthetic
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown
  breaks: true, // Convert \n to <br>
  sanitize: false, // Allow HTML (we control the content)
  smartypants: true, // Use smart quotes and dashes
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value;
      } catch (err) {
        console.error('Highlight.js error:', err);
      }
    }
    return code; // Default to plain text if language not recognized
  }
});

// Custom renderer for zen-styled markdown
const renderer = new marked.Renderer();

// Custom heading renderer with zen classes
renderer.heading = function(value) {
  const text = value['text'];
  const level = value['depth'];
  const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
  const zenClass = level === 1 ? 'zen-heading-1' : 
                   level === 2 ? 'zen-heading-2' : 
                   level === 3 ? 'zen-heading-3' : 
                   'zen-heading-4';
  
  return `<h${level} id="${escapedText}" class="${zenClass}">${text}</h${level}>`;
};

// Custom paragraph renderer
renderer.paragraph = function(value) {
  const text = value['text'];
  return `<p class="zen-paragraph">${text}</p>`;
};

// Custom blockquote renderer
renderer.blockquote = function(value) {
  const quote = value['text'];
  return `<blockquote class="zen-quote">${quote}</blockquote>`;
};

// Custom list renderer
renderer.list = function(value) {
  const items = value['items'];
  const ordered = value['ordered'];
  const body = items.map(item => {
    const text = item['text'];
    return `<li class="zen-list-item">${text}</li>`;
  }).join('');

  return ordered ?
    `<ol class="zen-ordered-list">${body}</ol>` :
    `<ul class="zen-unordered-list">${body}</ul>`;
};

// Custom code renderer
renderer.code = function(value) {
  const code = value['text'];
  const language = value['lang'] || '';
  
  let highlightedCode = code;
  if (language && hljs.getLanguage(language)) {
    try {
      highlightedCode = hljs.highlight(code, { language }).value;
    } catch (error) {
      console.error('Error highlighting code:', error);
    }
  }
  
  return `<pre class="zen-code-block" data-language="${language}"><code class="zen-code ${language ? `language-${language}` : ''}">${highlightedCode}</code></pre>`;
};

// Custom inline code renderer
renderer.codespan = function(value) {
  console.log('Inline code value:', value);
  const code = value['text'];
  return `<code class="zen-inline-code">${code}</code>`;
};

// Custom emphasis renderer
renderer.em = function(value) {
  console.log('Emphasis value:', value);
  const text = value['text'];
  return `<em class="zen-emphasis">${text}</em>`;
};

// Custom strong renderer
renderer.strong = function(value) {
  console.log('Strong value:', value);
  const text = value['text'];
  return `<strong class="zen-strong">${text}</strong>`;
};

// Set the custom renderer
marked.setOptions({ renderer });

/**
 * Parse markdown content into HTML with zen styling
 * @param {string} markdown - The markdown content to parse
 * @returns {string} - The parsed HTML
 */
export function parseMarkdown(markdown) {
  return marked(markdown);
}

/**
 * Load and parse a markdown file
 * @param {string} url - The URL/path to the markdown file
 * @returns {Promise<string>} - The parsed HTML
 */
export async function loadMarkdownFile(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load markdown file: ${response.status}`);
    }
    const markdown = await response.text();
    return parseMarkdown(markdown);
  } catch (error) {
    console.error('Error loading markdown file:', error);
    return `<p class="zen-error">Failed to load content: ${error.message}</p>`;
  }
}

/**
 * Render markdown content into a DOM element
 * @param {string} markdown - The markdown content
 * @param {HTMLElement} container - The container element
 */
export function renderMarkdownToElement(markdown, container) {
  const html = parseMarkdown(markdown);
  container.innerHTML = html;
  
  // Initialize syntax highlighting after rendering
  initializeHighlighting(container);
}

/**
 * Initializes highlight.js on the page
 * This should be called after markdown content is rendered
 * @param {HTMLElement} container - The container with code blocks to highlight
 */
export function initializeHighlighting(container) {
  // Configure highlight.js
  hljs.configure({
    languages: [], // Auto-detection
    ignoreUnescapedHTML: true,
    cssSelector: 'pre code',
    throwUnescapedHTML: false
  });
  
  // Find all code blocks in the container
  const codeBlocks = container ? container.querySelectorAll('pre code') : document.querySelectorAll('pre code');
  
  // Initialize highlight.js on each code block
  if (codeBlocks.length > 0) {
    codeBlocks.forEach(block => {
      hljs.highlightElement(block);
    });
    console.log(`Highlighted ${codeBlocks.length} code blocks with zen/ninja theme`);
  }
}

/**
 * Load and render a markdown file into a DOM element
 * @param {string} url - The URL/path to the markdown file
 * @param {HTMLElement} container - The container element
 */
export async function loadAndRenderMarkdown(url, container) {
  try {
    container.innerHTML = '<p class="zen-loading">Loading content...</p>';
    const html = await loadMarkdownFile(url);
    container.innerHTML = html;
    
    // Initialize syntax highlighting after rendering
    initializeHighlighting(container);
  } catch (error) {
    container.innerHTML = `<p class="zen-error">Failed to load content: ${error.message}</p>`;
  }
}
