// Deterministic asset compression; source images remain unchanged.
const sharp = require('sharp');
const path = require('node:path');
const fs = require('node:fs/promises');
const root = path.join(__dirname, '..');
async function main() {
  const out = path.join(root, 'public/images/optimized');
  await fs.mkdir(out, { recursive: true });
  for (const [source, name, width, quality] of [
    ['logo.png', 'logo', 640, 80],
    ['accueil/equipe-demenagement-du-vexin.webp', 'hero-mobile', 768, 72],
    ['accueil/equipe-demenagement-du-vexin.webp', 'hero-desktop', 1600, 78],
    ['services/demenagement-national.webp', 'national', 960, 72],
  ]) {
    const input = path.join(root, 'public/images', source);
    const output = path.join(out, `${name}.webp`);
    await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality }).toFile(output);
    console.log(`${name}: ${(await fs.stat(output)).size} bytes`);
  }
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
