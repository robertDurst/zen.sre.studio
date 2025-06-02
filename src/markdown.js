import { marked } from 'marked';
import hljs from 'highlight.js';

// Configure marked for our zen aesthetic
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown
  breaks: false, // Don't convert \n to <br> as it interferes with parsing
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

// Override specific methods to add zen styling
renderer.heading = function(token) {
  const text = this.parser.parseInline(token.tokens);
  const level = token.depth;
  const escapedText = token.text.toLowerCase().replace(/[^\w]+/g, '-');
  const zenClass = level === 1 ? 'zen-heading-1' : 
                   level === 2 ? 'zen-heading-2' : 
                   level === 3 ? 'zen-heading-3' : 
                   'zen-heading-4';
  
  return `<h${level} id="${escapedText}" class="${zenClass}">${text}</h${level}>`;
};

renderer.paragraph = function(token) {
  // Process inline tokens to handle links, bold, italic, etc.
  const text = this.parser.parseInline(token.tokens);
  return `<p class="zen-paragraph">${text}</p>`;
};

renderer.blockquote = function(token) {
  // Blockquotes contain block tokens, not inline tokens
  const quote = token.tokens ? this.parser.parse(token.tokens) : token.text;
  return `<blockquote class="zen-quote">${quote}</blockquote>`;
};

renderer.list = function(token) {
  const body = token.items.map(item => 
    `<li class="zen-list-item">${item.text}</li>`
  ).join('');
  
  return token.ordered ?
    `<ol class="zen-ordered-list">${body}</ol>` :
    `<ul class="zen-unordered-list">${body}</ul>`;
};

renderer.listitem = function(token) {
  const text = this.parser.parseInline(token.tokens);
  return `<li class="zen-list-item">${text}</li>`;
};

renderer.code = function(token) {
  const code = token.text;
  const lang = token.lang || '';
  
  let highlightedCode = code;
  if (lang && hljs.getLanguage(lang)) {
    try {
      highlightedCode = hljs.highlight(code, { language: lang }).value;
    } catch (error) {
      console.error('Error highlighting code:', error);
    }
  }
  
  return `<pre class="zen-code-block" data-language="${lang}"><code class="zen-code ${lang ? `language-${lang}` : ''}">${highlightedCode}</code></pre>`;
};

renderer.codespan = function(token) {
  return `<code class="zen-inline-code">${token.text}</code>`;
};

renderer.em = function(token) {
  return `<em class="zen-emphasis">${token.text}</em>`;
};

renderer.strong = function(token) {
  return `<strong class="zen-strong">${token.text}</strong>`;
};

renderer.link = function(token) {
  const href = token.href;
  const title = token.title || '';
  const text = token.text;
  
  // Add zen styling and ensure external links open in new tab
  const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));
  const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
  const titleAttr = title ? ` title="${title}"` : '';
  
  return `<a href="${href}" class="zen-link"${titleAttr}${target}>${text}</a>`;
};

// Set the custom renderer
marked.setOptions({ renderer });

/**
 * Preprocess markdown to handle footnotes and reference-style links.
 * Converts [^1] to a superscript link and [1]: ... to an inline link.
 * @param {string} markdown - The markdown content
 * @returns {string} - The preprocessed markdown
 */
function preprocessFootnotes(markdown) {
  // Extract reference links: [1]: [text](url)
  const refLinkRegex = /^\[(\d+)\]: \[([^\]]+)\]\(([^\)]+)\)/gm;
  const refLinks = {};
  let match;
  while ((match = refLinkRegex.exec(markdown)) !== null) {
    refLinks[match[1]] = {
      text: match[2],
      url: match[3]
    };
  }

  // Replace [^1] with superscript link to bibliography
  let processed = markdown.replace(/\[\^(\d+)\]/g, (m, num) => {
    if (refLinks[num]) {
      return `<sup class="zen-footnote-ref"><a href="#footnote-${num}" id="ref-${num}">[${num}]</a></sup>`;
    }
    return m;
  });

  // Replace bibliography [1]: ... with HTML anchors
  processed = processed.replace(refLinkRegex, (m, num, text, url) => {
    return `<div class="zen-footnote-item" id="footnote-${num}"><sup>[${num}]</sup> <a href="${url}" class="zen-link" target="_blank" rel="noopener noreferrer">${text}</a></div>`;
  });

  return processed;
}

/**
 * Parse markdown content into HTML with zen styling
 * @param {string} markdown - The markdown content to parse
 * @returns {string} - The parsed HTML
 */
export function parseMarkdown(markdown) {
  // Preprocess for footnotes and reference links
  const preprocessed = preprocessFootnotes(markdown);
  return marked(preprocessed);
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
