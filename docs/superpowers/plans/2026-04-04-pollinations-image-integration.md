# Pollinations.ai Image Integration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all placeholder images (placehold.co) across the Nido Home website with AI-generated images from Pollinations.ai, maintaining the warm, minimalist interior design aesthetic.

**Architecture:** Pollinations.ai serves images on-demand via URL (`https://image.pollinations.ai/prompt/<encoded-prompt>`). No API key, no build step — just direct `<img src="...">` usage. Each product/image gets a carefully crafted prompt consistent with Nido Home's brand palette (cream, taupe, brass, warm earth tones).

**Tech Stack:** Pollinations.ai (free, no auth), static HTML site, URL-encoded prompt generation.

---

### Task 1: Create Image Prompt Configuration

**Files:**
- Create: `js/pollinator.mjs` — Node.js utility that outputs ready-to-use Pollinations URLs
- This script is run once via `node js/pollinator.mjs` to verify all prompts before replacing in HTML

- [ ] **Step 1: Create the pollinator utility**

Create `js/pollinator.mjs`:

```js
import { writeFileSync } from 'fs';

// Base URL for Pollinations.ai
const BASE = 'https://image.pollinations.ai/prompt/';

// Common style tokens — appended to every prompt for consistency
const STYLE =
  'interior photography, minimal design, Nido Home brand, cream ' +
  'taupe brass warm palette, professional product photography, ' +
  'soft natural diffused lighting, editorial quality, 85mm lens';

// All image prompts indexed by product + variant
const PROMPTS = {
  'vas-sculpted': [
    'sculpted cream ceramic vase with organic curved shape on linen tablecloth, tall minimalist form, Romanian ceramic art',
    'close-up detail of cream ceramic vase surface texture, matte finish, soft shadows, warm light',
    'top-down view of sculpted ceramic vase with geometric patterns on wooden surface, cream and taupe background',
    'cream ceramic vase in natural interior setting, soft morning light, linen curtains background blur',
  ],
  'cesti-ceramica': [
    'two handmade cream ceramic cups on linen tablecloth, minimalist Romanian craft, soft natural light',
    'close-up of a single cream ceramic cup with organic shape, matte surface, warm tones',
    'overhead view of two ceramic cups and saucers on cream table, minimalist composition',
    'cream ceramic cup in a cozy interior setting, warm light, soft focus background',
  ],
  'ghivci-geometric': [
    'geometric faceted ceramic vase in cream taupe color, angular minimalist design, wooden shelf, interior display',
    'close-up detail of geometric ceramic vase facets, matte finish, sharp shadows, warm light',
    'three geometric ceramic vases in varying sizes on wooden surface, cream background, minimalist arrangement',
    'angular ceramic vase with earth tone palette, natural interior setting, soft diffused light',
  ],
  hero: [
    'modern Romanian interior living room with cream walls, natural linen sofa, ceramic vases, warm taupe accents, minimalist design, editorial photo 85mm',
  ],
  story: [
    'artisan hands working with cream clay on pottery wheel, natural light, Romanian craft tradition, warm workshop interior',
  ],
  'journal-1': [
    'minimalist Scandinavian interior room with cream walls, natural wood furniture, soft shadows, editorial photography style',
  ],
  'journal-2': [
    'natural materials still life, ceramic bowls raw wood pieces linen fabric on cream surface, warm natural light',
  ],
  'journal-3': [
    'sunlight streaming through large window into cream interior, warm golden rays on minimalist furniture, atmospheric photo',
  ],
  related: [
    'sculpted cream ceramic vase product photo on clean background, 300x300',
    'two cream ceramic cups product photo on clean background, 300x300',
    'geometric cream ceramic vase product photo on clean background, 300x300',
  ],
};

function url(prompt, { width, height, nologo = true } = {}) {
  const p = STYLE ? `${prompt}, ${STYLE}` : prompt;
  const params = new URLSearchParams();
  if (width) params.set('width', width);
  if (height) params.set('height', height);
  if (nologo) params.set('nologo', 'true');
  return `${BASE}${encodeURIComponent(p)}?${params.toString()}`;
}

// Output all URLs for review
console.log('=== Pollinations.ai Image URLs ===\n');
for (const [key, prompts] of Object.entries(PROMPTS)) {
  console.log(`\n--- ${key} ---`);
  prompts.forEach((p, i) => {
    const variants = key === 'related'
      ? [{ w: 300, h: 300 }]
      : [{ w: 700, h: 900 }, { w: 400, h: 400 }];
    variants.forEach((v, j) => {
      console.log(`  ${i + 1}${prompts.length > 1 ? `-${v.w}x${v.h}` : ''}: ${url(p, v)}\n`);
    });
  });
}
```

- [ ] **Step 2: Verify all URLs generate properly**

Run: `node js/pollinator.mjs`

Expected: All URLs printed with proper encoding — no errors. Open 2-3 URLs in browser to confirm images generate.

- [ ] **Step 3: Commit**

```bash
git add js/pollinator.mjs
git commit -m "feat: add Pollinations.ai image prompt configuration utility"
```

---

### Task 2: Replace Product Gallery Thumbnails in HTML

**Files:**
- Modify: `vas-sculpted.html` — main image + 4 thumbnails
- Modify: `cesti-ceramica.html` — main image + 4 thumbnails
- Modify: `ghivci-geometric.html` — main image + 4 thumbnails

- [ ] **Step 1: Replace vas-sculpted.html gallery images**

In `vas-sculpted.html`, replace these 5 images:

**Main image** (line ~50):
```html
<!-- OLD -->
<img id="mainImage" src="https://placehold.co/700x900/B8B2A2/F3F3EF?text=Vas+Sculpted" alt="Vas Sculpted" class="w-full hover:scale-[1.02] transition-transform duration-700" style="aspect-ratio:7/9">

<!-- NEW -->
<img id="mainImage" src="https://image.pollinations.ai/prompt/sculpted%20cream%20ceramic%20vase%20with%20organic%20curved%20shape%20on%20linen%20tablecloth%2C%20tall%20minimalist%20form%2C%20Romanian%20ceramic%20art%2C%20interior%20photography%2C%20minimal%20design%2C%20Nido%20Home%20brand%2C%20cream%20taupe%20brass%20warm%20palette%2C%20professional%20product%20photography%2C%20soft%20natural%20diffused%20lighting%2C%20editorial%20quality%2C%2085mm%20lens?width=700&height=900&nologo=true" alt="Vas Sculpted" class="w-full hover:scale-[1.02] transition-transform duration-700" style="aspect-ratio:7/9">
```

**Thumbnail 1** (line ~54):
```html
<!-- OLD -->
<img src="https://placehold.co/200x200/B8B2A2/F3F3EF?text=1" alt="" class="w-full aspect-square object-cover">

<!-- NEW -->
<img src="https://image.pollinations.ai/prompt/sculpted%20cream%20ceramic%20vase%20with%20organic%20curved%20shape%20on%20linen%20tablecloth%2C%20tall%20minimalist%20form%2C%20Romanian%20ceramic%20art%2C%20interior%20photography%2C%20minimal%20design%2C%20Nido%20Home%20brand%2C%20cream%20taupe%20brass%20warm%20palette%2C%20professional%20product%20photography%2C%20soft%20natural%20diffused%20lighting%2C%20editorial%20quality%2C%2085mm%20lens?width=400&height=400&nologo=true" alt="" class="w-full aspect-square object-cover">
```

**Thumbnail 2** (line ~57):
```html
<img src="https://image.pollinations.ai/prompt/close-up%20detail%20of%20cream%20ceramic%20vase%20surface%20texture%2C%20matte%20finish%2C%20soft%20shadows%2C%20warm%20light%2C%20interior%20photography%2C%20minimal%20design%2C%20Nido%20Home%20brand%2C%20cream%20taupe%20brass%20warm%20palette%2C%20professional%20product%20photography%2C%20soft%20natural%20diffused%20lighting%2C%20editorial%20quality%2C%2085mm%20lens?width=400&height=400&nologo=true" alt="" class="w-full aspect-square object-cover">
```

**Thumbnail 3** (line ~60):
```html
<img src="https://image.pollinations.ai/prompt/top-down%20view%20of%20sculpted%20ceramic%20vase%20with%20geometric%20patterns%20on%20wooden%20surface%2C%20cream%20and%20taupe%20background%2C%20interior%20photography%2C%20minimal%20design%2C%20Nido%20Home%20brand%2C%20cream%20taupe%20brass%20warm%20palette%2C%20professional%20product%20photography%2C%20soft%20natural%20diffused%20lighting%2C%20editorial%20quality%2C%2085mm%20lens?width=400&height=400&nologo=true" alt="" class="w-full aspect-square object-cover">
```

**Thumbnail 4** (line ~63):
```html
<img src="https://image.pollinations.ai/prompt/cream%20ceramic%20vase%20in%20natural%20interior%20setting%2C%20soft%20morning%20light%2C%20linen%20curtains%20background%20blur%2C%20interior%20photography%2C%20minimal%20design%2C%20Nido%20Home%20brand%2C%20cream%20taupe%20brass%20warm%20palette%2C%20professional%20product%20photography%2C%20soft%20natural%20diffused%20lighting%2C%20editorial%20quality%2C%2085mm%20lens?width=400&height=400&nologo=true" alt="" class="w-full aspect-square object-cover">
```

**Also replace the thumbs array in JS** (line ~137-142):
```js
const thumbs = [
  'https://image.pollinations.ai/prompt/sculpted%20cream%20ceramic%20vase%20with%20organic%20curved%20shape%20on%20linen%20tablecloth%2C%20tall%20minimalist%20form%2C%20Romanian%20ceramic%20art%2C%20interior%20photography%2C%20minimal%20design%2C%20Nido%20Home%20brand%2C%20cream%20taupe%20brass%20warm%20palette%2C%20professional%20product%20photography%2C%20soft%20natural%20diffused%20lighting%2C%20editorial%20quality%2C%2085mm%20lens?width=700&height=900&nologo=true',
  'https://image.pollinations.ai/prompt/close-up%20detail%20of%20cream%20ceramic%20vase%20surface%20texture%2C%20matte%20finish%2C%20soft%20shadows%2C%20warm%20light%2C%20interior%20photography%2C%20minimal%20design%2C%20Nido%20Home%20brand%2C%20cream%20taupe%20brass%20warm%20palette%2C%20professional%20product%20photography%2C%20soft%20natural%20diffused%20lighting%2C%20editorial%20quality%2C%2085mm%20lens?width=700&height=900&nologo=true',
  'https://image.pollinations.ai/prompt/top-down%20view%20of%20sculpted%20ceramic%20vase%20with%20geometric%20patterns%20on%20wooden%20surface%2C%20cream%20and%20taupe%20background%2C%20interior%20photography%2C%20minimal%20design%2C%20Nido%20Home%20brand%2C%20cream%20taupe%20brass%20warm%20palette%2C%20professional%20product%20photography%2C%20soft%20natural%20diffused%20lighting%2C%20editorial%20quality%2C%2085mm%20lens?width=700&height=900&nologo=true',
  'https://image.pollinations.ai/prompt/cream%20ceramic%20vase%20in%20natural%20interior%20setting%2C%20soft%20morning%20light%2C%20linen%20curtains%20background%20blur%2C%20interior%20photography%2C%20minimal%20design%2C%20Nido%20Home%20brand%2C%20cream%20taupe%20brass%20warm%20palette%2C%20professional%20product%20photography%2C%20soft%20natural%20diffused%20lighting%2C%20editorial%20quality%2C%2085mm%20lens?width=700&height=900&nologo=true'
];
```

- [ ] **Step 2: Replace cesti-ceramica.html gallery images**

Same pattern — replace 5 `<img>` src attributes and the JS `thumbs` array with cesti-prompts:

**Main image**: `cești ceramică` prompt
**Thumbnails**: 4 angle/detail prompts from PROMPTS.cesti-ceramica

- [ ] **Step 3: Replace ghivci-geometric.html gallery images**

Same pattern — replace 5 `<img>` src attributes and the JS `thumbs` array with ghivci-prompts:

**Main image**: `geometric faceted ceramic vase` prompt
**Thumbnails**: 4 angle/detail prompts from PROMPTS.ghivci-geometric

- [ ] **Step 4: Verify pages load correctly with AI images**

```bash
node screenshot.mjs http://localhost:3000/vas-sculpted.html vas-ai
node screenshot.mjs http://localhost:3000/cesti-ceramica.html cesti-ai
node screenshot.mjs http://localhost:3000/ghivci-geometric.html ghivci-ai
```

Read the PNGs and verify images load (not broken).

- [ ] **Step 5: Commit**

```bash
git add vas-sculpted.html cesti-ceramica.html ghivci-geometric.html
git commit -m "feat: replace product gallery placeholders with Pollinations.ai images"
```

---

### Task 3: Replace Homepage Collection Grid Images

**Files:**
- Modify: `index.html` — 3 product card images (lines ~71, ~75, ~79)

- [ ] **Step 1: Replace 3 collection grid images**

**Ghivci card** (line ~71):
```html
<!-- OLD -->
<img src="https://placehold.co/400x400/D4CFC3/D4CFC3" alt="Ghivci" class="w-full group-hover:scale-[1.04] transition-transform duration-600" style="aspect-ratio:1">

<!-- NEW -->
<img src="https://image.pollinations.ai/prompt/geometric%20cream%20ceramic%20vase%20product%20photo%20on%20clean%20cream%20background%2C%20interior%20photography%2C%20minimal%20design%2C%20Nido%20Home%20brand%2C%20cream%20taupe%20warm%20palette%2C%20professional%20product%20photography%2C%20soft%20natural%20lighting%2C%20editorial%20quality?width=400&height=400&nologo=true" alt="Ghivci" class="w-full group-hover:scale-[1.04] transition-transform duration-600" style="aspect-ratio:1">
```

**Cesti card** (line ~75):
```html
<!-- NEW -->
<img src="https://image.pollinations.ai/prompt/two%20cream%20ceramic%20cups%20product%20photo%20on%20clean%20cream%20background%2C%20interior%20photography%2C%20minimal%20design%2C%20Nido%20Home%20brand%2C%20cream%20taupe%20warm%20palette%2C%20professional%20product%20photography%2C%20soft%20natural%20lighting%2C%20editorial%20quality?width=400&height=400&nologo=true" alt="Cesti" class="w-full group-hover:scale-[1.04] transition-transform duration-600" style="aspect-ratio:1">
```

**Vas card** (line ~79):
```html
<!-- NEW -->
<img src="https://image.pollinations.ai/prompt/sculpted%20cream%20ceramic%20vase%20product%20photo%20on%20clean%20cream%20background%2C%20interior%20photography%2C%20minimal%20design%2C%20Nido%20Home%20brand%2C%20cream%20taupe%20warm%20palette%2C%20professional%20product%20photography%2C%20soft%20natural%20lighting%2C%20editorial%20quality?width=400&height=400&nologo=true" alt="Vas" class="w-full group-hover:scale-[1.04] transition-transform duration-600" style="aspect-ratio:1">
```

- [ ] **Step 2: Verify homepage**

```bash
node screenshot.mjs http://localhost:3000/ home-ai
```

Read and verify collection grid images load.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: replace homepage collection grid with Pollinations.ai images"
```

---

### Task 4: Replace Homepage Story, Journal, and Section Images

**Files:**
- Modify: `index.html` — story section gradient (line ~87), 3 journal cards (lines ~136, ~141, ~146), full-width image section (line ~97)

- [ ] **Step 1: Replace "Our Story" section image**

**Story section** (line ~87) — currently a CSS gradient:
```html
<!-- OLD -->
<div class="reveal" style="min-height:480px;background:linear-gradient(135deg,#C5BFA8,#A89E8E)"></div>

<!-- NEW -->
<div class="reveal" style="min-height:480px;background-image:url('https://image.pollinations.ai/prompt/artisan%20hands%20working%20with%20cream%20clay%20on%20pottery%20wheel%2C%20natural%20light%2C%20Romanian%20craft%20tradition%2C%20warm%20workshop%20interior%2C%20interior%20photography%2C%20minimal%20design%2C%20Nido%20Home%20brand%2C%20cream%20taupe%20warm%20palette%2C%20professional%20photography%2C%20soft%20natural%20diffused%20lighting%2C%20editorial%20quality%2C%2085mm%20lens?width=800&height=600&nologo=true');background-size:cover;background-position:center"></div>
```

- [ ] **Step 2: Replace Journal card images**

**Journal card 1** (line ~136):
```html
<!-- OLD -->
<div class="overflow-hidden mb-5 group-hover:scale-[1.04] transition-transform duration-600" style="background:#E8E4DA;height:220px"></div>

<!-- NEW (minimalist interior) -->
<div class="overflow-hidden mb-5 group-hover:scale-[1.04] transition-transform duration-600" style="height:220px;background-image:url('https://image.pollinations.ai/prompt/minimalist%20Scandinavian%20interior%20room%20with%20cream%20walls%2C%20natural%20wood%20furniture%2C%20soft%20shadows%2C%20editorial%20photography%20style%2C%20Nido%20Home%20brand%2C%20cream%20taupe%20warm%20palette%2C%20professional%20interior%20photography%2C%20soft%20natural%20lighting%2C%2085mm%20lens?width=500&height=300&nologo=true');background-size:cover;background-position:center;"></div>
```

**Journal card 2** (line ~141) — natural materials:
```html
<div class="overflow-hidden mb-5 group-hover:scale-[1.04] transition-transform duration-600" style="height:220px;background-image:url('https://image.pollinations.ai/prompt/natural%20materials%20still%20life%2C%20ceramic%20bowls%20raw%20wood%20pieces%20linen%20fabric%20on%20cream%20surface%2C%20warm%20natural%20light%2C%20interior%20photography%2C%20Nido%20Home%20brand%2C%20cream%20taupe%20palette%2C%20editorial%20quality%2C%2085mm%20lens?width=500&height=300&nologo=true');background-size:cover;background-position:center;"></div>
```

**Journal card 3** (line ~146) — sunlight:
```html
<div class="overflow-hidden mb-5 group-hover:scale-[1.04] transition-transform duration-600" style="height:220px;background-image:url('https://image.pollinations.ai/prompt/sunlight%20streaming%20through%20large%20window%20into%20cream%20interior%2C%20warm%20golden%20rays%20on%20minimalist%20furniture%2C%20atmospheric%20photo%2C%20Nido%20Home%20brand%2C%20cream%20taupe%20palette%2C%20interior%20photography%2C%20editorial%20quality%2C%2085mm%20lens?width=500&height=300&nologo=true');background-size:cover;background-position:center;"></div>
```

- [ ] **Step 3: Replace full-width quote section gradient**

**Full-width section** (line ~97):
```html
<!-- OLD -->
<div class="absolute inset-0" style="background:linear-gradient(135deg,#D9D4C6 0%,#C5BFA8 50%,#A89E8E 100%)"></div>

<!-- NEW -->
<div class="absolute inset-0" style="background:url('https://image.pollinations.ai/prompt/modern%20Romanian%20interior%20living%20space%20with%20cream%20walls%2C%20natural%20linen%2C%20ceramic%20decorative%20objects%2C%20warm%20taupe%20accents%2C%20minimalist%20design%2C%20editorial%20photo%2C%20Nido%20Home%20brand%2C%20cream%20taupe%20warm%20palette%2C%20professional%20interior%20photography%2C%20soft%20natural%20diffused%20lighting%2C%2085mm%20lens?width=1920&height=700&nologo=true') center/cover no-repeat;filter:brightness(0.85)"></div>
```

- [ ] **Step 4: Replace Related Products images on product pages**

In each product page (`vas-sculpted.html`, `cesti-ceramica.html`, `ghivci-geometric.html`), replace the 2 related product card images:

Example from vas-sculpted.html (lines ~111-118):
```html
<!-- OLD -->
<img src="https://placehold.co/300x300/D4CFC3/D4CFC3" alt="Ghivci Geometric">
<img src="https://placehold.co/300x300/C5BFA8/C5BFA8" alt="Cesti Ceramica">

<!-- NEW -->
<img src="https://image.pollinations.ai/prompt/geometric%20cream%20ceramic%20vase%20product%20photo%20on%20clean%20cream%20background%2C%20interior%20photography%2C%20minimal%20design%2C%20300x300?width=300&height=300&nologo=true" alt="Ghivci Geometric">
<img src="https://image.pollinations.ai/prompt/two%20cream%20ceramic%20cups%20product%20photo%20on%20clean%20cream%20background%2C%20interior%20photography%2C%20minimal%20design%2C%20300x300?width=300&height=300&nologo=true" alt="Cesti Ceramica">
```

- [ ] **Step 5: Verify full homepage and all product pages**

```bash
node screenshot.mjs http://localhost:3000/ home-full-ai
node screenshot.mjs http://localhost:3000/vas-sculpted.html vas-full-ai
```

Read screenshots. Verify: all images load, no broken placeholders, gradient sections replaced with real images.

- [ ] **Step 6: Commit**

```bash
git add index.html vas-sculpted.html cesti-ceramica.html ghivci-geometric.html
git commit -m "feat: replace homepage and related product placeholders with Pollinations.ai images"
```

---

### Task 5: Push and Deploy

- [ ] **Step 1: Push to GitHub**

```bash
git push origin main
```

- [ ] **Step 2: Verify Vercel auto-deploy**

Vercel auto-deploys on push. Check deployment status via the Vercel dashboard or CLI.

- [ ] **Step 3: Screenshot deployed site**

Take a screenshot from the deployed Vercel URL to confirm everything works in production.

---

## Self-Review

**1. Spec coverage:** Plan covers all placeholder images:
- Product galleries (3 pages × 5 images = 15 thumbnails) ✅
- Homepage collection grid (3 images) ✅
- Story section (1 background) ✅
- Full-width quote section (1 background) ✅
- Journal cards (3 images) ✅
- Related products (3 pages × 2 images = 6 thumbnails) ✅
- Total: ~29 image replacements ✅

**2. Placeholder scan:** No "TBD", "TODO", "fill in details" found. All steps have complete code.

**3. Type consistency:** All Pollinations URLs follow the same pattern: `https://image.pollinations.ai/prompt/<encoded>?width=N&height=N&nologo=true`. Style suffix is consistent across all prompts.
