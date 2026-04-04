# Nido Home — Complete Website Design Spec

## Overview
Complete the Nido Home static website (Romanian interior design brand) with all pages, functionality, and fixes. Site deploys to Vercel as static HTML with Tailwind CDN + CSS.

## New Pages

| Page | Purpose |
|---|---|
| `collections.html` | Full product catalog with grid, filters, sort |
| `about.html` | Full brand story with timeline, team, values |
| `contact.html` | Contact form + info + map |
| `checkout.html` | Checkout flow: address, shipping, review, confirmation |
| `journal-1.html`, `journal-2.html`, `journal-3.html` | Individual blog article pages |
| `terms.html` | Terms and conditions (legal) |
| `privacy.html` | Privacy policy (GDPR) |
| `shipping.html` | Shipping and returns info |
| `faq.html` | FAQ accordion |
| `wishlist.html` | Wishlist page |

## New Functionality

- **Search modal**: Opens from navbar search icon, filters products in real-time
- **Wishlist system**: localStorage-based, heart icon toggle, badge, wishlist page
- **Newsletter**: Confirmation toast on submit, saves to localStorage
- **Toast notification system**: Reusable for cart add, wishlist, newsletter
- **Enhanced cart**: Product images, footer links, remove button

## Bug Fixes & Corrections

- `.thumb` class missing proper styling → add cursor-pointer, border-radius, object-fit
- Mobile menu → full-screen overlay with close button and animation
- `transition-all` on `.btn` → replace with specific transitions
- Search icon non-functional → opens modal
- Heart icon non-functional → toggle wishlist
- Missing SEO meta tags → Open Graph, description, keywords
- Unused brand assets (`1-5.jpeg`) → integrate into pages

## Improvements

- Scroll progress indicator on product/article pages
- Parallax on full-width image sections
- Hover zoom on product main image (lightbox)
- Consistent footer across all pages with complete links
- All `#` placeholder links replaced with real page URLs

## Brand Guidelines

- Palette: cream `#F3F3EF`, warm-taupe `#D9D4C6`, dark-taupe `#6C6158`, brass `#C3A848`, grey-blue `#737B7B`, dark-wood `#43221B`
- Typography: EB Garamond (body), Playfair Display (headings), system-ui (fallback)
- Nav text: 11px, letter-spacing 2.5px, uppercase
- No default Tailwind palettes, no `transition-all`, no flat shadows
- Pollinations.ai images for placeholders
