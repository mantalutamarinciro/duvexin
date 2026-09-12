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

test('Cergy breadcrumb links to its department', () => {
  const source = readFileSync(path.join(root, 'src/app/demenagement-cergy-95000/page.tsx'), 'utf8');
  assert.match(source, /href="\/demenagement-val-d-oise-95"[^>]*>Val-d'Oise \(95\)<\/Link>/);
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
