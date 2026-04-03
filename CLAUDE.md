# CLAUDE.md — Frontend Website Rules

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:3000`)
- `serve.mjs` lives in the project root. Start it in the background before taking any screenshots.
- If the server is already running, do not start a second instance.

## Screenshot Workflow
- Puppeteer is installed via `~/.cache/puppeteer/`. Chrome executable is managed by `screenshot.mjs` (macOS arm64 `~/.cache/puppeteer/chrome/`).
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. Use it as-is.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing

## Output Defaults
- Single `index.html` file, all styles inline, unless user says otherwise
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive

## Brand Assets
- Always check the `brand_assets/` folder before designing. It may contain logos, color guides, style guides, or images.
- If assets exist there, use them. Do not use placeholders where real assets are available.
- If a logo is present, use it. If a color palette is defined, use those exact values — do not invent brand colors.

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom brand color and derive from it.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. Pair a display/serif with a clean sans. Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.

## Hard Rules
- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color

---

# Project Context

## What This Is
Nido Home — a Romanian interior design / home decor brand website (`Cultivăm Spații`). Multi-page site with product detail pages and cart. Use Romanian for responses.

## Language
- **Communicate exclusively in Romanian.** All responses, explanations, and comments must be in Romanian.

## Architecture
- Page structure: `index.html` (homepage) + separate `.html` files per product + `cart.html`
- Shared assets: `js/cart.js` (localStorage cart), `css/product-shared.css` (common styles)
- Cart system: localStorage-based, no backend. Badge in navbar. `cart.html` shows items, quantity adjust, subtotal

## Product Pages
- Two-column layout: gallery left (main image + thumbs), details right (name, price, qty, Add to Cart, accordion info)
- Below fold: related products section
- Each product page is a standalone `.html` file
- Current product pages: `vas-sculpted.html`, `cesti-ceramica.html`, `ghivci-geometric.html`

## Brand Palette (DO NOT CHANGE)
| Token | Hex |
|---|---|
| cream | #F3F3EF |
| warm-taupe | #D9D4C6 |
| warm-taupe-dk | #C5BFA8 |
| dark-taupe | #6C6158 |
| brass | #C3A848 |
| grey-blue | #737B7B |
| dark-wood | #43221B |

## Typography
- **Headings (serif):** `Playfair Display` / `EB Garamond`
- **Body (sans):** `system-ui`
- Small uppercase nav text: `11px, letter-spacing 2.5px`

## Fonts Used (already loaded)
- `EB Garamond` (400-700)
- `Playfair Display` (400-700)
- `system-ui` fallback

## Page Sections (current)
1. Fixed navbar — centered logo + nav links + search/heart/cart (with badge) icons
2. Hero — full-width interior photo with text overlay
3. Collection grid
4. Our Story section
5. Services section
6. Journal section
7. Contact / footer

## Key Files
- `index.html` — homepage
- `vas-sculpted.html`, `cesti-ceramica.html`, `ghivci-geometric.html` — product pages
- `cart.html` — shopping cart
- `js/cart.js` — cart logic (localStorage)
- `css/product-shared.css` — shared styles
- `brand_assets/` — logo (SVG + JPEG), style guide, hero image, collection JPEGs
- `brand_assets/Website/` — additional brand assets subfolder
- `serve.mjs` — local dev server (port 3000)
- `screenshot.mjs` — Puppeteer screenshot capture utility (macOS Chrome at `~/.cache/puppeteer/chrome/`)
- `docs/` — design specification documents

## Repo
- Remote: `https://github.com/hogearobert/testv1`
- Main branch
- Vercel project: `nido-home-v2`
