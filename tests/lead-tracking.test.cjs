const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.join(__dirname, '..');
const code = ts.transpileModule(readFileSync(path.join(root, 'src/lib/analytics.ts'), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const key = 'analytics:pending-generate-lead';
function setup({ consent = 'accepted', blocked = false, brokenTag = false, ready = true, storage = new Map(), referrer = '' } = {}) {
  const events = [];
  const sessionStorage = {
    getItem(k) { if (blocked) throw Error('blocked'); return storage.get(k) ?? null; },
    setItem(k, v) { if (blocked) throw Error('blocked'); storage.set(k, v); },
    removeItem(k) { if (blocked) throw Error('blocked'); storage.delete(k); },
  };
  const win = {
    localStorage: { getItem: () => consent }, sessionStorage,
    location: new URL('https://demenagementduvexin.fr/devis?utm_source=google&utm_medium=cpc&email=private#secret'),
    setTimeout: fn => { fn(); return 0; },
  };
  const tag = (...args) => { if (brokenTag) throw Error('tag failure'); events.push(args); };
  if (ready) win.gtag = tag;
  const context = { exports: {}, window: win, document: { referrer }, URL, URLSearchParams, Date, Set };
  vm.runInNewContext(code, context);
  return { api: context.exports, win, events, storage, tag };
}
const lead = { formName: 'public_quote_request', requestId: 'request-123' };
test('no pending submission means no event, regardless of thank-you query', () => {
  const { api, win, events } = setup();
  win.location = new URL('https://demenagementduvexin.fr/remerciements?lead=submitted');
  assert.equal(api.flushPendingGenerateLead(), false);
  assert.equal(events.length, 0);
  const tracker = readFileSync(path.join(root, 'src/components/lead-conversion-tracker.tsx'), 'utf8');
  assert.doesNotMatch(tracker, /markGenerateLeadPending|lead.*submitted/);
});
test('successful submission emits its reference only once across effects and reload', () => {
  const state = setup();
  state.api.markGenerateLeadPending(lead);
  assert.equal(state.api.flushPendingGenerateLead(), true);
  state.api.markGenerateLeadPending(lead);
  assert.equal(state.api.flushPendingGenerateLead(), false);
  assert.equal(state.events.length, 1);
  assert.equal(state.events[0][2].request_id, lead.requestId);
  assert.equal(setup({ storage: state.storage }).api.flushPendingGenerateLead(), false);
});
test('delayed tag can flush a persisted pending submission', () => {
  const state = setup({ ready: false });
  state.api.markGenerateLeadPending(lead);
  assert.equal(state.api.flushPendingGenerateLead(), false);
  const reloaded = setup({ storage: state.storage });
  assert.equal(reloaded.api.flushPendingGenerateLead(), true);
  assert.equal(reloaded.events.length, 1);
});
test('blocked session storage uses memory without breaking attribution or tracking', async () => {
  const { api } = setup({ blocked: true });
  await assert.doesNotReject(() => api.getLeadAttribution());
  assert.doesNotThrow(() => api.markGenerateLeadPending(lead));
  assert.equal(api.flushPendingGenerateLead(), true);
  assert.equal(api.flushPendingGenerateLead(), false);
});
test('malformed, legacy and expired pending records never emit', () => {
  for (const value of ['broken', '"public_quote_request"', '{}', JSON.stringify({ ...lead, createdAt: Date.now() - 3600000 })]) {
    const { api, events } = setup({ storage: new Map([[key, value]]) });
    assert.equal(api.flushPendingGenerateLead(), false);
    assert.equal(events.length, 0);
  }
});
test('denied consent prevents attribution and events, even with a loaded tag', async () => {
  const { api, events, storage } = setup({ consent: 'rejected' });
  assert.equal(Object.keys(await api.getLeadAttribution()).length, 0);
  api.markGenerateLeadPending(lead);
  assert.equal(api.flushPendingGenerateLead(), false);
  assert.equal(events.length, 0);
  assert.equal(storage.size, 0);
});
test('unavailable consent storage fails closed', async () => {
  const { api, win, events } = setup();
  win.localStorage.getItem = () => { throw Error('blocked'); };
  assert.equal(Object.keys(await api.getLeadAttribution()).length, 0);
  api.markGenerateLeadPending(lead);
  assert.equal(api.flushPendingGenerateLead(), false);
  assert.equal(events.length, 0);
});
test('consent withdrawn before dispatch discards the pending lead', () => {
  const { api, win, events, storage } = setup();
  api.markGenerateLeadPending(lead);
  win.localStorage.getItem = () => 'rejected';
  assert.equal(api.flushPendingGenerateLead(), false);
  assert.equal(storage.has(key), false);
  win.localStorage.getItem = () => 'accepted';
  assert.equal(api.flushPendingGenerateLead(), false);
  assert.equal(events.length, 0);
});
test('readable pending marker that cannot be consumed is not repeatedly sent', () => {
  const { api, win, events } = setup();
  api.markGenerateLeadPending(lead);
  win.sessionStorage.removeItem = () => { throw Error('read only'); };
  assert.equal(api.flushPendingGenerateLead(), false);
  assert.equal(api.flushPendingGenerateLead(), false);
  assert.equal(events.length, 0);
});
test('corrupt attribution recovers and landing URL excludes query and fragment', async () => {
  const { api } = setup({ storage: new Map([['analytics:lead-attribution', '{bad']]) });
  const value = await api.getLeadAttribution();
  assert.equal(value.source, 'google');
  assert.equal(value.medium, 'cpc');
  assert.equal(value.landingPage, 'https://demenagementduvexin.fr/devis');
});
test('consented acquisition captures ad click variants and only the external referrer host', async () => {
  const { api, win, storage } = setup({ referrer: 'https://www.google.fr/search?q=private&email=secret' });
  win.location = new URL('https://demenagementduvexin.fr/devis?gbraid=braid-1&wbraid=braid-2');
  const value = await api.getLeadAttribution();
  assert.equal(value.gbraid, 'braid-1');
  assert.equal(value.wbraid, 'braid-2');
  assert.equal(value.referrerHost, 'www.google.fr');
  assert.ok(!storage.get('analytics:lead-attribution').includes('private'));
  win.location = new URL('https://demenagementduvexin.fr/demande-devis');
  assert.equal((await api.getLeadAttribution()).gbraid, 'braid-1');
});
test('same-site referrers are ignored and denied consent stores no acquisition data', async () => {
  const sameSite = setup({ referrer: 'https://demenagementduvexin.fr/private?email=secret' });
  assert.equal((await sameSite.api.getLeadAttribution()).referrerHost, undefined);
  const wwwSite = setup({ referrer: 'https://www.demenagementduvexin.fr/private?email=secret' });
  assert.equal((await wwwSite.api.getLeadAttribution()).referrerHost, undefined);
  const declined = setup({ consent: 'declined', referrer: 'https://www.google.fr/search?q=private' });
  assert.equal(Object.keys(await declined.api.getLeadAttribution()).length, 0);
  assert.equal(declined.storage.size, 0);
});
test('malformed referrers do not discard valid UTM markers', async () => {
  const { api } = setup({ referrer: 'not a URL' });
  const value = await api.getLeadAttribution();
  assert.equal(value.source, 'google');
  assert.equal(value.medium, 'cpc');
  assert.equal(value.referrerHost, undefined);
});
test('throwing analytics tag never rejects attribution or throws during dispatch', async () => {
  const { api } = setup({ brokenTag: true });
  await assert.doesNotReject(() => api.getLeadAttribution());
  api.markGenerateLeadPending(lead);
  assert.equal(api.flushPendingGenerateLead(), false);
});
test('public form queues tracking after successful API response with request ID', () => {
  const form = readFileSync(path.join(root, 'src/app/demande-devis/page.tsx'), 'utf8');
  assert.ok(form.indexOf('markGenerateLeadPending({') > form.indexOf('if (!response.ok)'));
  assert.ok(form.indexOf('markGenerateLeadPending({') > form.indexOf('if (!result.id && !result.requestId)'));
  assert.ok(form.includes('requestId: (result.requestId || result.id)!'));
  assert.ok(form.includes('getLeadAttribution().catch(() => ({}))'));
  assert.ok(form.includes('router.push("/remerciements")'));
});
