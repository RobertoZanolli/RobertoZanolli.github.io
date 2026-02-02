# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A hybrid personal website combining static HTML pages with a Hugo-powered blog. The site uses vanilla JavaScript for interactivity (theme toggle, slider, search) and CSS custom properties for dark/light theming.

**Key architectural characteristic:** Hugo outputs to `../blog/`, making blog content available at the root level alongside static pages. The "custom" theme delegates all CSS and JS to root-level files rather than including them in the theme directory.

## Commands

### Development
```bash
# Run Hugo development server (serves at http://localhost:1313/blog/)
cd swe-blog && hugo server

# Create a new blog post
cd swe-blog && hugo new posts/my-post.md
```

### Production Build
```bash
# Generate static blog output to /blog/
cd swe-blog && hugo
```

## Architecture

### Directory Structure

```
/                                   # Repository root
├── blog/                           # Hugo-generated output (DO NOT EDIT)
│   ├── posts/                      # Generated HTML from markdown
│   ├── tags/                       # Tag listing pages
│   ├── index.json                  # Search index for blog posts
│   └── ...
├── swe-blog/                       # Hugo source directory
│   ├── hugo.toml                   # Hugo configuration
│   ├── content/posts/              # Blog post markdown files
│   ├── themes/custom/              # Local Hugo theme
│   │   └── layouts/
│   │       ├── _default/           # baseof.html, list.html, single.html
│   │       ├── partials/nav.html   # Navigation component
│   │       ├── index.html          # Blog homepage template
│   │       └── index.json          # JSON search index generator
│   └── archetypes/default.md       # New post front matter template
├── script.js                       # Shared JavaScript (theme, slider, search)
├── styles.css                      # Main stylesheet with CSS variables
├── index.html                      # Static homepage
├── data-projects.html              # Static portfolio page
├── quotes.html                     # Quotes page (ZenQuotes API)
└── dokkument.html                  # Dokkument CLI tool page
```

### Hugo Configuration (swe-blog/hugo.toml)

Key settings:
- `publishDir = '../blog'` - Outputs to parent directory
- `pagerSize = 3` - 3 posts per page
- `theme = 'custom'` - Local theme (not a framework theme)
- Outputs: HTML, RSS, and JSON (for search)
- MathJax 4 configured for inline (`$...$`) and display (`$$...$$`) math

### Layout Hierarchy

The Hugo theme uses a minimal layout structure:

1. **baseof.html** - HTML shell with head, body, footer; includes shared CSS/JS and MathJax
2. **nav.html** partial - Navigation links + search input
3. **index.html** - Blog homepage with pagination
4. **single.html** - Individual blog post view
5. **list.html** - Generic list view (tags/categories)

### JavaScript Modules (script.js)

The monolithic script contains three main functional areas:

1. **Theme Handling** (lines 6-38)
   - Applies theme from localStorage or system preference
   - Toggles between light/dark via `data-theme` attribute on `documentElement`
   - Listens for system theme changes

2. **Slider** (lines 40-65)
   - Only active on pages with `.slider-container` (dokkument.html)
   - CSS transform-based sliding with prev/next buttons

3. **Blog Search** (lines 77-199)
   - Fetches `/blog/index.json` for post titles
   - Client-side filtering on `input` events
   - Hides pagination during search, restores on clear

4. **Quotes** (lines 201-292)
   - Fetches from ZenQuotes API with 24-hour localStorage cache
   - Falls back to hardcoded quotes if API fails

### CSS Architecture (styles.css)

Uses CSS custom properties for theming. The root defines light theme values, and `[data-theme="dark"]` overrides for dark mode. All colors reference these variables:

```css
:root {
  --background-color: #ffffff;
  --text-color: #111111;
  --secondary-text-color: #666666;
  --link-color: #111111;
  --link-hover-color: #888888;
  --border-color: #eeeeee;
  --card-background: #f9f9f9;
}

[data-theme="dark"] {
  --background-color: #121212;
  --text-color: #eeeeee;
  /* ... */
}
```

### Search Implementation

The blog search is **entirely client-side**:

1. Hugo generates `index.json` containing `title`, `title_lc`, `url`, `date`
2. JavaScript fetches this file on first search
3. Searches filter by `title_lc` (lowercase title)
4. Results are rendered in-place, hiding pagination
5. Clearing search restores original list

### Content Creation

**Blog posts** go in `swe-blog/content/posts/` as markdown with front matter:

```markdown
+++
title = 'Post Title'
date = 2025-01-15
draft = true
tags = ['tag1', 'tag2']
+++

Content here...
```

Set `draft = false` to publish.

## Taxonomies

- **Tags**: `tags` taxonomy defined, used for post categorization
- **Categories**: Not configured

## Static Pages

Four manually maintained HTML pages share navigation and theming but are not Hugo templates:
- `index.html` - Homepage
- `data-projects.html` - Portfolio
- `quotes.html` - Quotes via API
- `dokkument.html` - CLI tool documentation with slider

These link directly to `/blog/` for the Hugo-generated blog section.

## Development Notes

- The `blog/` folder is **generated output** - never edit files here directly
- Theme CSS and JS are in root, not in the theme directory
- MathJax 4 uses new CDN: `https://cdn.jsdelivr.net/npm/mathjax@4/tex-mml-chtml.js`
- Site uses GitHub Pages hosting (repository name in URL)
