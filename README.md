# Anvesh Sunkara — Portfolio

A responsive, single-page professional portfolio using warm ivory, deep navy, muted teal, architectural illustration, and understated typography. Content is based on the supplied October 2026 portfolio information.

## Local development

Requires Node.js 18 or newer. No package installation is needed.

- `npm start` serves the page at http://localhost:3000.
- `npm run build` copies the production page and public assets into `build/`.

The page uses semantic HTML, responsive CSS, and a small JavaScript enhancement for mobile navigation and motion. Core content and case-study disclosures work without JavaScript. Reduced motion preferences are respected. Google Fonts are optional; system fonts serve as fallbacks.

## Content and deployment

Edit `index.html`, `styles.css`, and `script.js`. Professional case studies are grounded in the supplied information. Project artwork is illustrative, not a screenshot of production applications. Contact buttons open an email client; project links open supplied demos or repositories.

The existing resume PDF is preserved byte-for-byte in `public/`. GitHub Pages is published from the `gh-pages` branch. The repository root is the source of truth; `build/` is generated output.
