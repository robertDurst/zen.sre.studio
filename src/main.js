import './style.css'
import { parseMarkdown, renderMarkdownToElement, initializeHighlighting } from './markdown.js'

// Make markdown utilities available globally for easy use
window.ZenMarkdown = {
  parse: parseMarkdown,
  render: renderMarkdownToElement,
  highlightCode: initializeHighlighting
};

