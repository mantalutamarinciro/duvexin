const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');
const vm = require('node:vm');
const ts = require('typescript');

async function policy(environment) {
  const source = readFileSync(path.join(__dirname, '../next.config.ts'), 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  const context = { exports: {}, process: { env: { NODE_ENV: environment } } };
  vm.runInNewContext(compiled, context);
  const routes = await context.exports.default.headers();
  assert.equal(routes[0].source, '/(.*)');
  const value = routes[0].headers.find(h => h.key === 'Content-Security-Policy').value;
  return new Map(value.split('; ').map(directive => {
    const [name, ...sources] = directive.split(' ');
    return [name, sources];
  }));
}

test('production permits the Google endpoints blocked in the supplied console log', async () => {
  const csp = await policy('production');
  for (const host of ['https://stats.g.doubleclick.net', 'https://ad.doubleclick.net', 'https://www.googleadservices.com']) {
    assert.ok(csp.get('connect-src').includes(host), `Missing connection origin: ${host}`);
  }
  for (const host of ['https://www.google.fr', 'https://www.googleadservices.com']) {
    assert.ok(csp.get('img-src').includes(host), `Missing image origin: ${host}`);
  }
});

test('production retains restrictive defaults and does not permit arbitrary origins', async () => {
  const csp = await policy('production');
  for (const [name, expected] of [['default-src', "'self'"], ['object-src', "'none'"], ['base-uri', "'self'"], ['form-action', "'self'"], ['frame-ancestors', "'none'"]]) {
    assert.deepEqual(csp.get(name), [expected]);
  }
  for (const name of ['connect-src', 'img-src']) {
    for (const broad of ['*', 'http:', 'https:', 'https://*.doubleclick.net', 'https://*.googleadservices.com']) {
      assert.ok(!csp.get(name).includes(broad), `${name} must not allow ${broad}`);
    }
  }
  assert.ok(csp.get('connect-src').includes('https://*.google-analytics.com'));
  assert.ok(csp.has('upgrade-insecure-requests'));
});

test('development retains its existing local networking support', async () => {
  const csp = await policy('development');
  for (const scheme of ['ws:', 'wss:', 'http:', 'https:']) {
    assert.ok(csp.get('connect-src').includes(scheme));
  }
});
