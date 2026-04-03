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
      ? [{ width: 300, height: 300 }]
      : [{ width: 700, height: 900 }, { width: 400, height: 400 }];
    variants.forEach((v, j) => {
      console.log(`  ${i + 1}${prompts.length > 1 ? `-${v.width}x${v.height}` : ''}: ${url(p, v)}\n`);
    });
  });
}
