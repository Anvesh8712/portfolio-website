# Anvesh Sunkara — Playful Portfolio

A complete static website: HTML, CSS, JavaScript, SVG artwork and institutional logos, and the existing resume PDF. No build step or package installation is required.

## Publish with GitHub Pages

1. Extract this ZIP.
2. Upload the extracted files (not the ZIP) to the root of the branch/folder used by GitHub Pages. For your existing portfolio repository, the deployment branch is `gh-pages`.
3. Ensure `index.html` is at the publishing root, alongside the `assets/` folder, `style.css`, `app.js`, `mascot.css`, `mascot.js`, and `resume.pdf`. Avoid putting everything inside an additional folder.
4. Commit the files. The relative asset paths also work at `/portfolio-website/`.

If your Pages configuration uses a different publishing branch or folder, put these files there instead. This replaces the old rendered portfolio; keep a backup of its deployment files if you want to restore it.

## Edit and preview

- `index.html`: portfolio content and SVG-based artwork.
- `style.css`: page layout, colors, typography, and responsive design.
- `app.js`: navigation and page micro-interactions.
- `mascot.css`: Sunny’s appearance and animation styles.
- `mascot.js`: Sunny’s fast-scroll zoom and stop bump, star entrance, mood changes, eye tracking, scroll reactions, placement checks, and hide control.
- `resume.pdf`: existing resume, preserved byte-for-byte.

Open `index.html` in a browser, or run `python3 -m http.server 8000` in this folder and visit http://localhost:8000.

Sunny plays its entrance once on each page load when the hero star is visible. It skips the entrance for reduced motion, a hidden mascot, or a restored scroll position below the hero. Scrolling, resizing, or hiding Sunny cancels an entrance in progress. The hide preference is stored locally in the visitor’s browser.

Google Fonts load when internet access is available; local fallback fonts remain available. Everything else is included in the ZIP. No API keys, backend services, or Sites account are required.

Validation: JavaScript syntax; mascot behavioral simulations for entrance origin/completion, one-time playback, hide persistence, section greetings, click expressions, collision fallback, and reduced-motion cleanup. Browser-based visual verification was unavailable in the creation session.

## Latest changes

- Skills are ordered AI & robotics, Frontend & mobile, Backend & data.
- Georgia Tech, UMass Amherst, Stanford, and USAA logos are bundled as local SVGs in `assets/logos/`. Georgia Tech's original white artwork sits on a navy background.
- Sunny zooms on fast scrolls (trackpad, wheel, and touch) and squashes/rebounds at its safe landing spot after scrolling stops. Reversing direction changes the flight and bump direction. Hiding Sunny, switching to reduced motion, resizing, or leaving the tab cancels the effect.
- The existing resume PDF is unchanged.

### Logo sources

- Georgia Tech: https://brand.gatech.edu/modules/contrib/gt_tools/images/gt-logo.svg
- UMass Amherst: https://commons.wikimedia.org/wiki/File:UMass_Amherst_Shortform_Wordmark.svg
- Stanford: https://commons.wikimedia.org/wiki/File:Stanford_wordmark_(2012).svg
- USAA: https://2fasvg.github.io/usaa.com/

SVG artwork retains its original proportions and colors. The logos identify education and employment entries.
