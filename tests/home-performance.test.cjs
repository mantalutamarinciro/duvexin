const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const root = path.join(__dirname, '..');
test('optimized assets are smaller and mobile hero is limited to 768 pixels', async () => {
  for (const [name, original] of [
    ['logo', 'logo.png'], ['hero-mobile', 'accueil/equipe-demenagement-du-vexin.webp'],
    ['hero-desktop', 'accueil/equipe-demenagement-du-vexin.webp'], ['national', 'services/demenagement-national.webp'],
  ]) {
    const optimized = path.join(root, 'public/images/optimized', `${name}.webp`);
    assert.ok(fs.statSync(optimized).size < fs.statSync(path.join(root, 'public/images', original)).size);
    const meta = await sharp(optimized).metadata();
    assert.equal(meta.format, 'webp');
    if (name === 'hero-mobile') assert.ok(meta.width <= 768);
  }
});
test('hero is visible on first render and its mobile source loads eagerly', () => {
  const source = fs.readFileSync(path.join(root, 'src/app/(home)/landing-page-client.tsx'), 'utf8');
  assert.ok(source.includes('srcSet="/images/optimized/hero-mobile.webp"'));
  assert.ok(source.includes('fetchPriority="high"'));
  assert.ok(source.includes('loading="eager"'));
  assert.match(source, /<div\s+className="max-w-3xl"/);
});
test('static homepage stays server-rendered without animation hydration', () => {
  const source = fs.readFileSync(path.join(root, 'src/app/(home)/landing-page-client.tsx'), 'utf8');
  assert.doesNotMatch(source, /["']use client["']/);
  assert.doesNotMatch(source, /framer-motion|useReducedMotion|whileInView|<motion\./);
  assert.ok(source.includes('<TestimonialsSection reviews={safeReviews} />'));
  assert.ok(source.includes('href="/demande-devis"'));
  assert.ok(source.includes('group-hover:'), 'CSS hover styling stays intact');
});
