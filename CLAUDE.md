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
- Static HTML with Tailwind CDN + `<style>` blocks + `css/` shared styles
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: Pollinations.ai (see Images section below)
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
Nido Home — a Romanian interior design / home decor brand website (`Cultivăm Spații`). Multi-page static site with product pages, cart, wishlist, checkout flow, journal/blog, and legal pages. Deployed on Vercel. Use Romanian for responses.

## Language
- **Communicate exclusively in Romanian.** All responses, explanations, and comments must be in Romanian.

## Architecture
- Static HTML files + shared CSS + vanilla JS
- No framework, no build step — served as static files on Vercel
- All state: localStorage-based (cart, wishlist, newsletter)
- Tailwind config embedded in each HTML file's `<head>`:
```js
tailwind.config={theme:{extend:{colors:{cream:'#F3F3EF','warm-taupe':'#D9D4C6','warm-taupe-dk':'#C5BFA8','dark-taupe':'#6C6158','brass':'#C3A848','grey-blue':'#737B7B','dark-wood':'#43221B'},fontFamily:{sans:['system-ui','sans-serif'],serif:['"EB Garamond"','Georgia','serif'],display:['"Playfair Display"','Georgia','serif']}}}}
```

## File Inventory

### Pages (17 total)
| File | Purpose |
|---|---|
| `index.html` | Homepage: hero, collection grid, story, quote, services, journal, newsletter, footer |
| `collections.html` | Full product catalog with filter/sort/search (6 products) |
| `about.html` | Brand story: mission, values, timeline, gallery, CTA |
| `contact.html` | Contact form (validate + toast), info cards, social |
| `checkout.html` | 3-state checkout flow: details → recap → confirmation |
| `cart.html` | Cart page: items from localStorage, qty adjust, subtotal |
| `wishlist.html` | Wishlist page: products from localStorage, add-to-cart |
| `vas-sculpted.html` | Product: 95 RON |
| `cesti-ceramica.html` | Product: 68 RON |
| `ghivci-geometric.html` | Product: 62 RON |
| `journal-1.html` | "Arta Minimalismului în Designul Interior" |
| `journal-2.html` | "Materiale Naturale — Ceramica și Lemnul" |
| `journal-3.html` | "Importanța Luminii Naturale" |
| `terms.html` | Termeni și Condiții |
| `privacy.html` | GDPR Privacy Policy |
| `shipping.html` | Livrare și Returnări |
| `faq.html` | 10 FAQ items with accordion + search filter |

### Shared Assets
| File | Purpose |
|---|---|
| `css/product-shared.css` | Common styles + search modal, toast, scroll progress, thumb gallery, checkout form, mobile menu |
| `js/cart.js` | localStorage cart: get/add/remove/update/badge |
| `js/wishlist.js` | localStorage wishlist: get/toggle/check/badge |
| `js/pollinator.mjs` | Pollinations.ai URL generator utility |

**Every product/collection/journal page includes:** `css/product-shared.css`, `js/cart.js`, `js/wishlist.js`, search modal JS, toast notification JS, scroll progress bar, reveal-on-scroll IntersectionObserver.

**Every page includes:** SEO meta description, same navbar (logo, nav links, search button, heart/wishlist, cart), full footer with real links.

## Cart System
- localStorage key: `nido_cart`
- Format: `[{id, name, price, qty}]`
- Badge auto-updates via `updateBadge()` on DOMContentLoaded
- Checkout reads same key, clears it on confirmation

## Wishlist System
- localStorage key: `nido_wishlist`
- Format: `[{id, name, price, img}]`
- Badge class: `#wishlist-badge`, gray background `#737B7B`
- Toggle via `toggleWishlist(id, name, price, img)` → returns true/false

## Product Pages
- Two-column layout: gallery left (main image + 4 thumbs), details right (badge, name, price, desc, qty, add-to-cart, 3 accordion sections)
- Below fold: related products (2 cards linking to siblings)
- Scroll progress bar at top (under navbar)
- Product data in `PRODUCT_DATA` const for cart/toast integration

## Navbar Pattern (all pages)
- Fixed, cream bg with `backdrop-blur`, bottom border
- Desktop: logo left → nav links center → search/heart/cart right
- Mobile: hamburger button → dropdown menu with same links
- Cart badge (brass) and wishlist badge (gray) show count when >0
- Search opens overlay modal with live filtering

## Footer Pattern (all pages)
- Dark wood `#43221B` background, warm-taupe text
- 4 columns: Logo+social, Linkuri, Legal, Contact
- Legal links always point to: `terms.html`, `shipping.html`, `privacy.html`, `faq.html`
- Social icons are `href="#"` placeholders (no real social URLs yet)

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

## Images
- All product/hero images via **Pollinations.ai** — free AI generation, no API key
- Format: `https://image.pollinations.ai/prompt/<encoded>?width=N&height=N&nologo=true`
- Style suffix appended to all prompts: `interior photography, minimal design, Nido Home brand, cream taupe warm palette, professional product photography, soft natural diffused lighting, editorial quality, 85mm lens`
- Brand assets used: `brand_assets/logo-nido-home.svg`, `brand_assets/Website/hero-image.jpeg`, `brand_assets/Website/1.jpeg` through `5.jpeg`
- Collection page has 3 placeholder products without pages (Bol Artizanal, Farfurie Rustică, Vaza Minimalistă) — their links are `href="#"`

## Repo
- Remote: `https://github.com/hogearobert/nido-home`
- Main branch
- Vercel project: `nido-home-v2`
- GitHub push triggers auto-deploy on Vercel

## Gotchas
- **Subagent commit issue:** Modelele free (OpenRouter) săr adesea pasul de `git commit` — raportează DONE dar nu execută commit-ul real. Verifică întotdeauna cu `git log --oneline -1`.
- **Subagent file creation:** Subagenții pot raporta "created" dar fișierul să lipsească sau să fie trunchiat. Verifică cu `ls` și `wc -l` după terminare.
- **Settings:** `ANTHROPIC_MODEL: stepfun/step-3.5-flash:free` via OpenRouter.
- **`transition-all` banned:** Use specific transitions (`background-color`, `border-color`, `color`, `transform`).
- **`href="#"` is acceptable** only for: social media placeholders, JS-controlled buttons (wishlist heart).
- **Dev server manual:** `node serve.mjs` must be started in background before screenshots/testing. It does NOT auto-start or auto-reload. Check if running before testing.

## What's Left To Do (Future)
1. **Product pages for new items:** Create `bol-artizanal.html`, `farfurie-rustica.html`, `vaza-minimalista.html` — then update collections grid and search to link to them.
2. **Social media real URLs:** Replace `href="#"` on Instagram/Facebook/Pinterest icons with actual brand URLs.
3. **Newsletter backend:** Currently localStorage-only visual demo. Connect to email service (Mailchimp, Resend, etc.) for real signups.
4. **Contact form backend:** Currently shows toast only. Add real email delivery (Formspree, Netlify Forms, API route).
5. **Checkout real processing:** Currently front-end only with localStorage. Connect to payment provider (Stripe) or order email notification.
6. **Real product images:** Replace Pollinations.ai generated images with actual product photography.
7. **SEO optimization:** Add sitemap.xml, robots.txt, structured data (JSON-LD for products), canonical URLs.
8. **Performance optimization:** Lazy-load below-fold images, preload critical fonts, compress images.
9. **Accessibility:** Add proper ARIA labels, focus management for modals, keyboard navigation testing, color contrast audit.
10. **Analytics:** Add Vercel Analytics or Google Analytics.
11. **Favicon:** `apple-touch-icon` currently uses `placehold.co` — replace with real asset.
12. **Mobile menu improvement:** Current implementation is a simple dropdown — could be full-screen overlay with animation.
