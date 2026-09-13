const assert = require('node:assert/strict');
const { readFileSync, existsSync } = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');
const ts = require('typescript');
const root = path.join(__dirname, '..');

function load(relative) {
  const filename = path.join(root, relative);
  const source = readFileSync(filename, 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const context = {
    exports: {}, process: { env: { NODE_ENV: 'production' } },
    require(name) {
      assert.ok(name.startsWith('@/lib/'), `Unexpected import: ${name}`);
      return load(`src/${name.slice(2)}.ts`);
    },
  };
  vm.runInNewContext(compiled, context, { filename });
  return context.exports;
}

test('sitemap includes priority pages, unique URLs and existing public routes', () => {
  const entries = load('src/app/sitemap.ts').default();
  const urls = entries.map(entry => entry.url);
  assert.equal(new Set(urls).size, urls.length);
  for (const route of ['demenagement-cergy-95000', 'demenagement-hauts-de-seine-92', 'demenagement-paris-75']) {
    assert.ok(urls.includes(`https://demenagementduvexin.fr/${route}`));
  }
  for (const entry of entries) {
    const url = new URL(entry.url);
    assert.equal(url.origin, 'https://demenagementduvexin.fr');
    assert.ok(existsSync(path.join(root, 'src/app', url.pathname, 'page.tsx')), entry.url);
    assert.ok(!/^\/(dashboard|crew|track|api|login|remerciements)(\/|$)/.test(url.pathname));
    if (!url.pathname.startsWith('/blog/')) assert.equal(entry.lastModified, undefined);
    else assert.ok(Number.isFinite(Number(entry.lastModified)), entry.url);
  }
});

test('legacy local URLs redirect permanently to existing pages without chains', async () => {
  const redirects = await load('next.config.ts').default.redirects();
  for (const [source, destination] of [
    ['/demande-de-devis', '/demande-devis'],
    ['/zones', '/zones-intervention'],
    ['/demenagement-enghien-95880', '/demenagement-enghien-les-bains-95880'],
    ["/demenagement-l'isle-adam-95290", '/demenagement-lisle-adam-95290'],
  ]) {
    const redirect = redirects.find(item => item.source === source);
    assert.equal(redirect?.destination, destination);
    assert.equal(redirect?.permanent, true);
    assert.ok(existsSync(path.join(root, 'src/app', destination, 'page.tsx')));
    assert.ok(!redirects.some(item => item.source === destination));
  }
});

test('audited layouts declare a self-referencing canonical', () => {
  for (const route of ['demande-devis', 'galerie', 'mentions-legales', 'politique-confidentialite',
    'demenagement-garde-meubles', 'demenagement-international', 'demenagement-du-vexin-evreux',
    'demenagement-france-monaco', 'demenagement-france-suisse', 'demenagement-france-andorre',
    'demenagement-vire-14500']) {
    const source = readFileSync(path.join(root, `src/app/${route}/layout.tsx`), 'utf8');
    assert.ok(source.includes(`canonical: "https://demenagementduvexin.fr/${route}"`), route);
  }
});

test('priority town breadcrumbs link to their department', () => {
  for (const route of ['demenagement-cergy-95000', 'demenagement-herblay-sur-seine-95220',
    'demenagement-cormeilles-en-parisis-95240', 'demenagement-ermont-95120']) {
    const source = readFileSync(path.join(root, 'src/app', route, 'page.tsx'), 'utf8');
    assert.match(source, /href="\/demenagement-val-d-oise-95"[^>]*>Val-d'Oise \(95\)<\/Link>/);
  }
});

test('Val-de-Marne pages use coherent offers and qualified FAQ answers', () => {
  for (const route of ['demenagement-nogent-sur-marne-94130', 'demenagement-vitry-sur-seine-94400']) {
    const source = readFileSync(path.join(root, 'src/app', route, 'page.tsx'), 'utf8');
    assert.match(source, /href="\/demenagement-val-de-marne-94"[^>]*>Val-de-Marne \(94\)<\/Link>/);
    assert.ok(source.includes(`canonical: "https://demenagementduvexin.fr/${route}"`));
    assert.doesNotMatch(source, /24h|48h|30%|Confort|sécurité absolue|15 jours|emplacement exclusif/);
    // Both the visible accordion and JSON-LD must continue to use the same answers.
    assert.equal((source.match(/FAQS\.map\(/g) || []).length, 2);
    const ast = ts.createSourceFile('page.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const declaration = ast.statements.filter(ts.isVariableStatement)
      .flatMap(statement => Array.from(statement.declarationList.declarations))
      .find(declaration => declaration.name.getText(ast) === 'FAQS');
    assert.ok(declaration && ts.isArrayLiteralExpression(declaration.initializer));
    assert.equal(declaration.initializer.elements.length, 4);
    for (const entry of declaration.initializer.elements) {
      assert.ok(ts.isObjectLiteralExpression(entry));
      for (const key of ['question', 'answer']) {
        const property = entry.properties.find(property => property.name?.getText(ast) === key);
        assert.ok(property && ts.isStringLiteral(property.initializer));
        assert.ok(property.initializer.text.length > 20);
      }
    }
  }
});

test('review statistics are validated and unknown values are never invented', () => {
  const { reviewSummary } = load('src/lib/review-summary.ts');
  assert.equal(reviewSummary(4.9, 282).ratingValue, 4.9);
  assert.equal(reviewSummary(4.9, 282).reviewCount, 282);
  for (const [rating, count] of [[0, 0], [4.9, 0], [undefined, 282], [NaN, 282],
    [Infinity, 282], [6, 282], [-1, 282], ['4.9', 282], [4.9, -1], [4.9, 1.5]]) {
    assert.equal(reviewSummary(rating, count), null);
  }
});

test('homepage Journal cards match existing articles and image files', () => {
  const source = readFileSync(path.join(root, 'src/app/(home)/landing-page-client.tsx'), 'utf8');
  const tree = ts.createSourceFile('home.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const declaration = tree.statements.find(statement => ts.isVariableStatement(statement) &&
    statement.declarationList.declarations.some(item => item.name.getText(tree) === 'ARTICLES'));
  assert.ok(declaration);
  const compiled = ts.transpileModule(declaration.getText(tree) + '\nexports.cards = ARTICLES;', {
    compilerOptions: { target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const blogPosts = load('src/lib/blog-posts.ts').blogPosts;
  const context = { exports: {}, blogPosts };
  vm.runInNewContext(compiled, context);
  const cards = context.exports.cards;
  assert.equal(cards.length, 3);
  assert.equal(new Set(cards.map(card => card.href)).size, 3);
  for (const card of cards) {
    const post = blogPosts.find(item => item.link === card.href);
    assert.equal(card.title, post.title);
    assert.ok(existsSync(path.join(root, 'src/app', card.href, 'page.tsx')));
    assert.ok(existsSync(path.join(root, 'public', card.image)));
  }
});

test('local guides render distinct content and links to existing pages', () => {
  const React = require('react');
  const { renderToStaticMarkup } = require('react-dom/server');
  const source = readFileSync(path.join(root, 'src/components/local-moving-guide.tsx'), 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const context = { exports: {}, require(name) {
    if (name === 'react/jsx-runtime') return require(name);
    if (name === 'next/link') return { default: props => React.createElement('a', props) };
    throw new Error(`Unexpected import: ${name}`);
  } };
  vm.runInNewContext(compiled, context);
  const rendered = [];
  for (const [city, route] of [['mery', 'demenagement-mery-sur-oise-95540'],
    ['cergy', 'demenagement-cergy-95000'], ['pontoise', 'demenagement-pontoise-95300'],
    ['herblay', 'demenagement-herblay-sur-seine-95220'],
    ['cormeilles', 'demenagement-cormeilles-en-parisis-95240'], ['ermont', 'demenagement-ermont-95120']]) {
    const html = renderToStaticMarkup(React.createElement(context.exports.LocalMovingGuide, { city }));
    rendered.push(html);
    assert.ok(html.includes(`id="moving-guide-${city}"`));
    assert.equal((html.match(/<h3/g) || []).length, 3);
    assert.ok(!html.includes(`href="/${route}"`), 'No redundant self-link');
    for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
      assert.ok(existsSync(path.join(root, 'src/app', href, 'page.tsx')), href);
    }
    const page = readFileSync(path.join(root, 'src/app', route, 'page.tsx'), 'utf8');
    assert.ok(page.includes(`<LocalMovingGuide city="${city}" />`));
    assert.ok(!page.includes('/demande-de-devis'));
  }
  assert.equal(new Set(rendered).size, 6);
});

test('homepage has a local heading and links to all three priority towns', () => {
  const source = readFileSync(path.join(root, 'src/app/(home)/landing-page-client.tsx'), 'utf8');
  assert.equal((source.match(/<h1\b/g) || []).length, 1);
  assert.match(source, /<h1[\s\S]*?Votre déménageur[\s\S]*?dans le Val-d’Oise[\s\S]*?<\/h1>/);
  for (const route of ['demenagement-mery-sur-oise-95540', 'demenagement-cergy-95000', 'demenagement-pontoise-95300']) {
    assert.ok(source.includes(`href="/${route}"`));
  }
});

test('public pages never link to the broken quote and zone aliases', () => {
  const { readdirSync } = require('node:fs');
  function walk(directory) {
    return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
      const file = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(file) : [file];
    });
  }
  for (const file of walk(path.join(root, 'src/app')).filter(file => file.endsWith('.tsx'))) {
    assert.doesNotMatch(readFileSync(file, 'utf8'), /href\s*=\s*["']\/(demande-de-devis|zones)["']/, file);
  }
});

test('Essonne preserves twelve towns without links to nonexistent city pages', () => {
  const source = readFileSync(path.join(root, 'src/app/demenagement-essonne-91/page.tsx'), 'utf8');
  const tree = ts.createSourceFile('essonne.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const statement = tree.statements.find(item => ts.isVariableStatement(item) &&
    item.declarationList.declarations.some(d => d.name.getText(tree) === 'ESSONNE_CITIES'));
  const cities = statement.declarationList.declarations[0].initializer;
  assert.ok(ts.isArrayLiteralExpression(cities));
  assert.equal(cities.elements.length, 12);
  assert.ok(cities.elements.every(item => ts.isStringLiteral(item)));
  assert.equal(new Set(cities.elements.map(item => item.text)).size, 12);
  assert.ok(!source.includes('href={city.link}'));
  assert.ok(source.includes('Demander un devis pour l’Essonne'));
});

test('question links use the published contact email instead of a missing contact page', () => {
  const email = 'mailto:demenagementduvexin@gmail.com';
  assert.ok(readFileSync(path.join(root, 'src/app/mentions-legales/page.tsx'), 'utf8').includes(email));
  for (const route of ['politique-confidentialite', 'demenagement-entreprise-bureau',
    'blog/comment-choisir-la-bonne-formule-de-demenagement',
    'blog/demenager-avec-des-enfants-nos-conseils-pour-une-transition-en-douceur']) {
    const source = readFileSync(path.join(root, 'src/app', route, 'page.tsx'), 'utf8');
    assert.ok(source.includes(`href="${email}"`), route);
    assert.ok(!source.includes('href="/contact"'), route);
  }
});

test('remaining audited service and agency links resolve to existing pages', () => {
  for (const [route, destination, oldPath] of [
    ['demenagement-paris-75', 'demenagement-objets-lourds', '/services/monte-meubles'],
    ['demenagement-orne-61', 'demenagement-du-vexin-evreux', '/notre-agence-evreux'],
  ]) {
    const source = readFileSync(path.join(root, 'src/app', route, 'page.tsx'), 'utf8');
    assert.ok(source.includes(`href="/${destination}"`));
    assert.ok(!source.includes(`href="${oldPath}"`));
    assert.ok(existsSync(path.join(root, 'src/app', destination, 'page.tsx')));
  }
  const nav = readFileSync(path.join(root, 'src/components/main--nav.tsx'), 'utf8');
  assert.ok(!nav.includes('href="/landing'));
  assert.ok(nav.includes('href="/"'));
  assert.ok(nav.includes('href="mailto:demenagementduvexin@gmail.com"'));
});

test('legacy redirects have unique sources, existing destinations and no chains', async () => {
  const redirects = await load('next.config.ts').default.redirects();
  assert.equal(new Set(redirects.map(item => item.source)).size, redirects.length);
  for (const item of redirects) {
    assert.equal(item.permanent, true);
    assert.notEqual(item.source, item.destination);
    assert.ok(existsSync(path.join(root, 'src/app', item.destination, 'page.tsx')), item.destination);
    assert.ok(!redirects.some(other => other.source === item.destination), item.source);
  }
  for (const missing of ['/demenagement-evry-91000', '/demenagement-massy-91300', '/wp-content/:path*']) {
    assert.ok(!redirects.some(item => item.source === missing));
  }
  assert.ok(redirects.some(item => item.source === '/calcul-volume-demenagement' && item.destination === '/calculateur-volume'));
  assert.ok(redirects.some(item => item.source === '/devis' && item.destination === '/demande-devis'));
});
