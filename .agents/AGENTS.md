# TodayInTech Project Rules

## Portfolio and Case Study Additions

When adding a new project portfolio card to `index.html` or creating a new dedicated case study page under `projects/`:

1. **Dedicated Page SEO Copy**:
   - Do not use generic descriptions.
   - The tagline MUST be formatted as a conversational call-to-action targeting high-intent keywords (e.g., "Are you looking to deploy [Keyword]?").
   - Weave key target search queries naturally inside the first sentence of "The Problem" and "Our Solution" paragraphs.

2. **Homepage Portfolio Card SEO**:
   - The project card `<h3>` title and `<p>` description on the homepage MUST target high-intent transactional search queries rather than just the generic project name.

---

## Blog Post Inline Style Rules (CRITICAL — Never Break)

The site (`anonsoft.com`) renders blog posts on a **white/light background** (`style.css` is light-mode). Any inline `<style>` block or `style=""` attributes in blog HTML files MUST follow these rules:

### FORBIDDEN — Will cause invisible text on production:

- `color: rgba(255,255,255,X)` — white text is invisible on white background
- `color: rgba(255,255,255,0.72)` — same issue, do not use any white rgba for text
- `background: rgba(255,255,255,0.03)` — near-transparent on white = invisible card
- `background: rgba(0,212,255,0.06)` — 6% opacity is invisible on white
- `border: 1px solid rgba(255,255,255,0.08)` — invisible border on white

### REQUIRED — Always use these instead:

| Element                        | Use This Color                       |
| ------------------------------ | ------------------------------------ |
| Body text in custom components | `#334155` or `#475569`               |
| Muted/secondary text           | `#64748b`                            |
| Headings in custom components  | `#1e293b`                            |
| Card backgrounds               | `#f8fafc` or `#f0fdf4` (tinted)      |
| Card borders                   | `#e2e8f0` or a visible tinted border |
| Accent text (green)            | `#15803d` (not `#4ade80`)            |
| Accent text (blue/cyan)        | `#0369a1` (not `#00d4ff`)            |
| Accent text (purple)           | `#7c3aed` (not `#c084fc`)            |
| Divider lines                  | `rgba(0,0,0,0.06)`                   |

### Pattern to follow for custom blog components:

```css
/* CORRECT — works on light background */
.my-card {
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
}
.my-card p {
  color: #475569;
}
.my-card strong {
  color: #1e293b;
}

/* WRONG — invisible on light background */
.my-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.my-card p {
  color: rgba(255, 255, 255, 0.72);
}
```

### Blog emoji usage:

- Do NOT use emojies in blog post body text or headings. Use text or SVG icons only.
