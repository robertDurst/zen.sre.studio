# Content Directory

This directory contains markdown files that are rendered into pages on the Zen SRE Studio website.

## How to Use

### Creating a New Page

1. **Create a markdown file** in this directory (e.g., `research.md`)
2. **Create an HTML file** in the root directory using the template from `src/page-utils.js`
3. **Write your content** using standard markdown syntax

### Markdown Features

The site supports:

- **Headings** (`#`, `##`, `###`, `####`) - Styled with Zen Masters font
- **Paragraphs** - Clean typography with optimal line length
- **Emphasis** (`*italic*`) and **Strong** (`**bold**`) text
- **Blockquotes** (`>`) - Beautiful zen-styled quotes
- **Lists** (ordered and unordered) - Custom styled bullets/numbers
- **Code blocks** (```code```) and `inline code`
- **Links** and other standard markdown

### Styling

All markdown content is automatically styled with zen-inspired CSS classes:

- `.zen-heading-1` through `.zen-heading-4` for headings
- `.zen-paragraph` for paragraphs
- `.zen-quote` for blockquotes
- `.zen-list` and `.zen-list-item` for lists
- `.zen-code-block` and `.zen-inline-code` for code
- `.zen-emphasis` and `.zen-strong` for emphasis

### Quick Page Creation

Use the `generatePageHTML()` function from `src/page-utils.js` to quickly create new pages:

```javascript
import { generatePageHTML } from '/src/page-utils.js';

// Generate HTML for a new page
const html = generatePageHTML('Research', 'research');
```

### Example Content Structure

```
content/
└── README.md         # This file
```

### Zen Markdown Philosophy

When writing content, embrace:

- **Clarity** - Use simple, direct language
- **Breathing room** - Don't overcrowd with too many sections
- **Mindful structure** - Organize thoughts logically
- **Authentic voice** - Write from genuine understanding
- **Practical wisdom** - Balance theory with actionable insights
