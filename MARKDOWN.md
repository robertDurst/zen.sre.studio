# Zen SRE Studio - Markdown System

Your website now has a complete markdown rendering system that makes it easy to create and style content pages.

## ✨ What's Been Set Up

### 1. Markdown Parsing
- **Library**: `marked` - Fast, lightweight markdown parser
- **Custom renderer**: Applies zen-styled CSS classes automatically
- **Smart typography**: Includes smart quotes, proper line breaks, and GitHub-flavored markdown

### 2. Zen-Styled CSS
- **Typography**: All markdown elements use your Zen Masters font and color palette
- **Responsive design**: Content adapts beautifully to mobile devices
- **Japanese aesthetic**: Red accents, clean spacing, contemplative feel

### 3. Page Creation System
- **Utilities**: Helper functions for creating new pages quickly
- **Templates**: Consistent layout with wave background and navigation
- **Loading states**: Graceful loading indicators

## 🚀 How to Use

### Quick Page Creation

Use the CLI tool to create new pages instantly:

```bash
# Create a new page
npm run create-page "Philosophy" "philosophy"

# This creates:
# - philosophy.html (the web page)
# - content/philosophy.md (the markdown content)
```

### Manual Page Creation

1. **Create markdown content** in `content/your-page.md`
2. **Create HTML page** using the template in `src/page-utils.js`
3. **Link from main page** by adding navigation links

### Markdown Features

Your content supports:

```markdown
# Main Heading (uses Zen Masters font + Japanese red)
## Secondary Heading
### Sub Heading

*Italic text* and **bold text**

> Beautiful zen-styled blockquotes
> 
> — Author Name

- Bullet lists with custom styling
- Clean typography

1. Numbered lists
2. With custom zen styling

`Inline code` and code blocks:

```javascript
// Styled code blocks
console.log('Hello, zen world!');
```

[Links](/) with hover effects
```

## 📁 File Structure

```
zen.sre.studio/
├── content/                 # Markdown content files
│   ├── research.md         # Research page content
│   └── README.md           # Content documentation
├── scripts/
│   └── create-page.js      # CLI tool for creating pages
├── src/
│   ├── markdown.js         # Markdown parsing utilities
│   ├── page-utils.js       # Page creation helpers
│   └── style.css           # Includes zen markdown styles
├── about.html              # About page
├── research.html           # Research page
└── index.html              # Home page with navigation
```

## 🎨 Styling Features

### Automatic CSS Classes

All markdown elements get zen-styled classes:

- `.zen-heading-1` through `.zen-heading-4` - Headings with Zen Masters font
- `.zen-paragraph` - Clean body text with optimal line length
- `.zen-quote` - Beautiful blockquotes with Japanese red accent
- `.zen-list` and `.zen-list-item` - Custom styled lists
- `.zen-code-block` and `.zen-inline-code` - Styled code elements

### Responsive Design

- Mobile-optimized typography
- Proper content width limits (60-65 characters)
- Scalable font sizes

## 🔧 Customization

### Adding New Markdown Features

Edit `src/markdown.js` to add custom renderers:

```javascript
// Example: Custom link styling
renderer.link = function(href, title, text) {
  return `<a href="${href}" class="zen-link" title="${title}">${text}</a>`;
};
```

### Extending CSS

Add new styles in `src/style.css` under the "Zen Markdown Styling" section.

## 📖 Current Pages

- **Home** (`/`) - Main landing page with navigation
- **About** (`/about.html`) - Philosophy and approach
- **Research** (`/research.html`) - Current research projects

## 🛠️ Development Workflow

1. **Start dev server**: `npm run dev`
2. **Create new page**: `npm run create-page "Page Name" "file-name"`
3. **Edit content**: Modify the `.md` file in `content/`
4. **See changes**: Hot reload updates automatically

## 🎯 Next Steps

You can now easily:

1. **Add more pages** using the CLI tool
2. **Write content** in markdown for easy formatting
3. **Focus on content** while the system handles styling
4. **Maintain consistency** across all pages

The system is designed to let you focus on writing meaningful content while maintaining the beautiful zen aesthetic throughout your site.

---

*May your content flow like water, finding its natural form.*
