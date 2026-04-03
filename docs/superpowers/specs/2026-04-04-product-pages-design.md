# Product Pages Design Spec

## Overview
Create individual product pages for all 3 collection items (Vas Sculpted, Cesti Ceramica, Ghivci Geometric) plus a shopping cart page, using separate HTML files that share the existing Nido Home brand identity.

## Architecture

### Files
- `index.html` — homepage (update collection links to point to product pages)
- `vas-sculpted.html` — Vas Sculpted product detail page
- `cesti-ceramica.html` — Cesti Ceramica product detail page
- `ghivci-geometric.html` — Ghivci Geometric product detail page
- `cart.html` — Shopping cart page
- `css/product-shared.css` — Shared styles for product pages
- `js/cart.js` — Cart logic (localStorage: add, remove, quantity, getCart)

### Product Page Layout (two-column)
- **Left column:** Large main product image + thumbnail gallery (4 images) below
- **Right column:** Product title, price, description, quantity selector (+/-), Add to Cart button, accordion for details (dimensions, material, care instructions)
- **Below fold:** Related products section (links to other 2 products)
- Navbar and footer match existing `index.html` design

### Cart System
- `localStorage`-based, no backend
- Cart badge on navbar icon showing item count
- Cart page: item list, quantity adjust (+/-  or remove), subtotal, "Trimite Comanda" button
- Shared `js/cart.js` across all pages

### Design Constraints
- Same color palette: cream, warm-taupe, dark-taupe, brass, dark-wood
- Same typography: EB Garamond / Playfair Display for headings, system-ui for body
- Placeholder images via `https://placehold.co/`
- Mobile-first responsive

## Data Flow
1. User browses collection grid on index.html → clicks product → lands on product page
2. Product page sets quantity (default 1) → clicks "Add to Cart" → `cart.js` writes to localStorage
3. Navbar badge updates with item count
4. User visits `cart.html` → reads cart from localStorage → renders items
5. User adjusts quantities or removes items → localStorage updates

## Error Handling
- If localStorage unavailable, show inline warning
- Quantity defaults to 1, minimum 1, maximum 99
- Empty cart page shows "Coșul tău este gol" message with link back to collection
- Cart page handles malformed localStorage data gracefully (clear and reset)
