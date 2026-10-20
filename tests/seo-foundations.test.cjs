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

test('Val-d’Oise directory links to the four previously omitted towns', () => {
  const source = readFileSync(path.join(root, 'src/app/demenagement-val-d-oise-95/page.tsx'), 'utf8');
  const ast = ts.createSourceFile('page.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const declaration = ast.statements.filter(ts.isVariableStatement)
    .flatMap(statement => Array.from(statement.declarationList.declarations))
    .find(declaration => declaration.name.getText(ast) === 'VAL_D_OISE_CITIES');
  assert.ok(declaration && ts.isArrayLiteralExpression(declaration.initializer));
  const routes = declaration.initializer.elements.map(entry => {
    const link = entry.properties.find(property => property.name?.getText(ast) === 'link');
    assert.ok(link && ts.isStringLiteral(link.initializer));
    return link.initializer.text;
  });
  assert.equal(new Set(routes).size, routes.length);
  for (const route of routes) assert.ok(existsSync(path.join(root, 'src/app', route, 'page.tsx')), route);
  for (const route of ['demenagement-garges-les-gonesse-95140', 'demenagement-goussainville-95190',
    'demenagement-mery-sur-oise-95540', 'demenagement-villiers-le-bel-95400']) {
    assert.ok(routes.includes(`/${route}`), route);
  }
  assert.match(source, /VAL_D_OISE_CITIES\.sort\([^\n]+\)\.map\(/);
  assert.match(source, /href=\{city\.link\}/);
});

test('Val-d’Oise featured links point directly to canonical town routes', () => {
  const source = readFileSync(path.join(root, 'src/app/demenagement-val-d-oise-95/page.tsx'), 'utf8');
  const ast = ts.createSourceFile('page.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const declaration = ast.statements.filter(ts.isVariableStatement)
    .flatMap(statement => Array.from(statement.declarationList.declarations))
    .find(declaration => declaration.name.getText(ast) === 'FEATURED_VAL_D_OISE_CITIES');
  assert.ok(declaration && ts.isArrayLiteralExpression(declaration.initializer));
  const routes = declaration.initializer.elements.map(entry => {
    const link = entry.properties.find(property => property.name?.getText(ast) === 'link');
    assert.ok(link && ts.isStringLiteral(link.initializer));
    return link.initializer.text;
  });
  assert.ok(routes.includes('/demenagement-enghien-les-bains-95880'));
  assert.ok(routes.includes('/demenagement-lisle-adam-95290'));
  assert.ok(!routes.includes('/demenagement-enghien-95880'));
  assert.ok(!routes.includes("/demenagement-l'isle-adam-95290"));
  for (const route of routes) assert.ok(existsSync(path.join(root, 'src/app', route, 'page.tsx')), route);
});

test('Évreux metadata and H1 target the searched déménageur intent', () => {
  const source = readFileSync(path.join(root, 'src/app/demenagement-du-vexin-evreux/page.tsx'), 'utf8');
  assert.match(source, /title:\s*["']Déménageur à Évreux \(27\)/);
  assert.match(source, /description:\s*["']Besoin d’un déménageur à Évreux/);
  assert.match(source, /Votre déménageur à Évreux/);
});

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

test('sitemap covers every indexable static marketing page', () => {
  const { readdirSync } = require('node:fs');
  function walk(directory) {
    return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
      const file = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(file) : [file];
    });
  }

  const sitemapPaths = new Set(load('src/app/sitemap.ts').default()
    .map(entry => new URL(entry.url).pathname));
  const appDirectory = path.join(root, 'src/app');
  const excludedRoute = /^\/(?:dashboard|crew|track|quote|print|login|remerciements)(?:\/|$)/;

  for (const file of walk(appDirectory).filter(file => file.endsWith('page.tsx'))) {
    const relativeDirectory = path.dirname(path.relative(appDirectory, file));
    const segments = relativeDirectory.split(path.sep).filter(segment => !/^\(.+\)$/.test(segment));
    const route = relativeDirectory === '.' || segments.length === 0 ? '/' : `/${segments.join('/')}`;
    if (route.includes('[') || excludedRoute.test(route)) continue;
    assert.ok(sitemapPaths.has(route), `${route} is indexable but missing from sitemap`);
  }
});

test('literal canonicals are self-referencing and match their public route', () => {
  const { readdirSync } = require('node:fs');
  function walk(directory) {
    return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
      const file = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(file) : [file];
    });
  }

  const appDirectory = path.join(root, 'src/app');
  for (const file of walk(appDirectory).filter(file => /(?:page|layout)\.tsx$/.test(file))) {
    const route = path.dirname(path.relative(appDirectory, file)).split(path.sep)
      .filter(segment => !/^\(.+\)$/.test(segment))
      .join('/');
    if (route.includes('[')) continue;

    const source = readFileSync(file, 'utf8');
    for (const match of source.matchAll(/canonical:\s*["']https:\/\/demenagementduvexin\.fr([^"']*)["']/g)) {
      const expectedCanonicalPath = route === '.' ? '' : `/${route}`;
      assert.equal(match[1], expectedCanonicalPath, `${path.relative(root, file)} has a canonical for another URL`);
    }
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

test('public pages never ship invented fallback testimonials', () => {
  const { readdirSync } = require('node:fs');
  function walk(directory) {
    return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
      const file = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(file) : [file];
    });
  }
  for (const file of walk(path.join(root, 'src/app')).filter(file => file.endsWith('.tsx'))) {
    const source = readFileSync(file, 'utf8');
    assert.doesNotMatch(source, /fallbackTestimonials/, file);
    assert.doesNotMatch(source, /i\.pravatar\.cc/, file);
  }
  const section = readFileSync(path.join(root, 'src/components/testimonials-section.tsx'), 'utf8');
  assert.match(section, /fetch\("\/api\/reviews"/);
  assert.match(section, /Les témoignages sont consultables directement sur notre fiche Google/);
});

test('Val-d’Oise pages avoid unverified turnaround and absolute promises', () => {
  for (const route of ['demenagement-val-d-oise-95', 'demenagement-argenteuil-95100',
    'demenagement-bezons-95870', 'demenagement-cergy-95000',
    'demenagement-cormeilles-en-parisis-95240', 'demenagement-eaubonne-95600',
    'demenagement-enghien-les-bains-95880', 'demenagement-ermont-95120',
    'demenagement-franconville-95130', 'demenagement-garges-les-gonesse-95140',
    'demenagement-goussainville-95190', 'demenagement-herblay-sur-seine-95220',
    'demenagement-lisle-adam-95290', 'demenagement-mery-sur-oise-95540',
    'demenagement-montmorency-95160', 'demenagement-pontoise-95300',
    'demenagement-saint-ouen-l-aumone-95310',
    'demenagement-sarcelles-95200', 'demenagement-taverny-95150',
    'demenagement-villiers-le-bel-95400']) {
    const source = readFileSync(path.join(root, 'src/app', route, 'page.tsx'), 'utf8');
    assert.doesNotMatch(source, /24h|24 heures|Marne Transdem/i, route);
    assert.doesNotMatch(source, /priorité absolue|ponctualité (?:absolue|garantie)|protégeant ainsi absolument|sérénité absolue|continuité totale|réactivité imbattable|sans aucune faille|parfaite maîtrise/i, route);
  }
});

test('audited Eure, Oise, Yvelines and Normandy pages avoid unverified commercial promises', () => {
  const routes = [
    'demenagement-eure-27', 'demenagement-bernay-27300',
    'demenagement-evreux-27000', 'demenagement-gaillon-27600',
    'demenagement-gisors-27140', 'demenagement-les-andelys-27700',
    'demenagement-louviers-27400', 'demenagement-pont-audemer-27500',
    'demenagement-val-de-reuil-27100',
    'demenagement-verneuil-davre-et-diton-27130', 'demenagement-vernon-27200',
    'demenagement-yvelines-78', 'demenagement-conflans-sainte-honorine-78700',
    'demenagement-le-chesnay-rocquencourt-78150', 'demenagement-les-mureaux-78130',
    'demenagement-mantes-la-jolie-78200',
    'demenagement-montigny-le-bretonneux-78180', 'demenagement-plaisir-78370',
    'demenagement-poissy-78300', 'demenagement-rambouillet-78120',
    'demenagement-saint-germain-en-laye-78100', 'demenagement-sartrouville-78500',
    'demenagement-velizy-villacoublay-78140', 'demenagement-versailles-78000',
    'demenagement-calvados-14', 'demenagement-caen-14000',
    'demenagement-bayeux-14400', 'demenagement-deauville-14800',
    'demenagement-falaise-14700', 'demenagement-herouville-saint-clair-14200',
    'demenagement-honfleur-14600', 'demenagement-ifs-14123',
    'demenagement-lisieux-14100', 'demenagement-mondeville-14200',
    'demenagement-ouistreham-14150', 'demenagement-trouville-sur-mer-14360',
    'demenagement-vire-14500', 'demenagement-orne-61',
    'demenagement-seine-maritime-76', 'demenagement-du-vexin-evreux',
    'demenagement-paris-75', 'demenagement-hauts-de-seine-92',
    'demenagement-antony-92160', 'demenagement-asnieres-sur-seine-92600',
    'demenagement-boulogne-billancourt-92100', 'demenagement-clichy-92110',
    'demenagement-colombes-92700', 'demenagement-courbevoie-92400',
    'demenagement-issy-les-moulineaux-92130', 'demenagement-levallois-perret-92300',
    'demenagement-nanterre-92000', 'demenagement-neuilly-sur-seine-92200',
    'demenagement-puteaux-92800', 'demenagement-rueil-malmaison-92500',
    'demenagement-val-de-marne-94', 'demenagement-seine-saint-denis-93',
    'demenagement-essonne-91', 'demenagement-seine-et-marne-77',
    'demenagement-alfortville-94140', 'demenagement-arcueil-94110',
    'demenagement-cachan-94230', 'demenagement-champigny-sur-marne-94500',
    'demenagement-charenton-le-pont-94220', 'demenagement-choisy-le-roi-94600',
    'demenagement-creteil-94000', 'demenagement-fontenay-sous-bois-94120',
    'demenagement-ivry-sur-seine-94200', 'demenagement-le-perreux-sur-marne-94170',
    'demenagement-lhay-les-roses-94240', 'demenagement-maisons-alfort-94700',
    'demenagement-nogent-sur-marne-94130', 'demenagement-saint-mande-94220',
    'demenagement-saint-maur-des-fosses-94100', 'demenagement-villejuif-94800',
    'demenagement-vincennes-94300', 'demenagement-vitry-sur-seine-94400',
  ];
  const forbidden = /24h|24 heures|48h|Marne Transdem|protection absolue|ponctualité totale|partenaire numéro 1|réactivité totale|réactivité maximale|extrêmement ponctuelle|sans accroc|sans faille|fluidité exemplaire|discrétion absolue|sécurité maximale|100% (?:sécurisé|sécurisée|clé en main|démarches|villes|salarié|salariée)/i;
  for (const route of routes) {
    const source = readFileSync(path.join(root, 'src/app', route, 'page.tsx'), 'utf8');
    assert.doesNotMatch(source, forbidden, route);
  }
  const oise = readFileSync(path.join(root, 'src/lib/oise-locations.ts'), 'utf8');
  assert.doesNotMatch(oise, forbidden);
});

test('long-distance corridors and core service pages avoid fixed turnaround promises', () => {
  for (const route of [
    'demenagement-ile-de-france-bordeaux', 'demenagement-ile-de-france-lille',
    'demenagement-ile-de-france-lyon', 'demenagement-ile-de-france-marseille',
    'demenagement-ile-de-france-nantes', 'demenagement-ile-de-france-nice',
    'demenagement-ile-de-france-rennes', 'demenagement-ile-de-france-strasbourg',
    'demenagement-ile-de-france-toulouse', 'demenagement-national',
    'demenagement-international', 'demenagement-particuliers',
    'demenagement-entreprise-bureau', 'demenagement-garde-meubles',
    'demenagement-oeuvres-art', 'services', 'devis-demenagement',
    'demande-devis', 'tarif-demenagement',
    'demenagement-france-allemagne', 'demenagement-france-andorre',
    'demenagement-france-belgique', 'demenagement-france-espagne',
    'demenagement-france-irlande', 'demenagement-france-italie',
    'demenagement-france-luxembourg', 'demenagement-france-monaco',
    'demenagement-france-pays-bas', 'demenagement-france-portugal',
    'demenagement-france-royaume-uni', 'demenagement-france-suisse',
  ]) {
    const source = readFileSync(path.join(root, 'src/app', route, 'page.tsx'), 'utf8');
    assert.doesNotMatch(source, /24h|24 heures|48h|72h|Marne Transdem|sans faille|fiabilité absolue|discrétion absolue|efficacité absolue|sécurité maximale|100% sécurisée|continuité d'activité garantie/i, route);
  }
});

test('shared conversion surfaces do not promise an unverified 24-hour turnaround', () => {
  for (const file of [
    'src/components/site-header.tsx', 'src/components/site-footer.tsx',
    'src/components/price-estimator.tsx', 'src/app/remerciements/page.tsx',
    'src/app/zones-intervention/page.tsx',
    'src/app/blog/5-astuces-pour-un-demenagement-sans-stress/page.tsx',
  ]) {
    const source = readFileSync(path.join(root, file), 'utf8');
    assert.doesNotMatch(source, /(?:devis|réponse|étude|chiffrage)[^\n]{0,40}(?:24h|24 heures)/i, file);
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

test('home offers match the reference formulas and use an explicit quote CTA', () => {
  const home = readFileSync(path.join(root, 'src/app/(home)/landing-page-client.tsx'), 'utf8');
  const reference = readFileSync(path.join(root, 'src/app/formules-de-demenagement/page.tsx'), 'utf8');
  function formulaTitles(source) {
    const tree = ts.createSourceFile('page.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const declaration = tree.statements.filter(ts.isVariableStatement)
      .flatMap(statement => [...statement.declarationList.declarations])
      .find(item => item.name.getText(tree) === 'FORMULAS');
    assert.ok(declaration && ts.isArrayLiteralExpression(declaration.initializer));
    return declaration.initializer.elements.map(item =>
      item.properties.find(property => property.name.getText(tree) === 'title').initializer.text);
  }
  assert.deepEqual(formulaTitles(home), formulaTitles(reference));
  assert.deepEqual(formulaTitles(home), ['Économique', 'Standard', 'Prestige']);
  assert.ok(home.includes('Demander un devis'));
  assert.ok(home.includes('Basés à Méry-sur-Oise (95)'));
  assert.doesNotMatch(home, /Devis sous 24h|4 niveaux de|Total Confort|Le plus choisi/);
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
