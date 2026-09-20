const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.join(__dirname, '..');
function load(file, stubs = {}, env = {}) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const context = { exports: {}, process: { env }, console: { warn() {}, error() {} },
    require(name) { if (name === 'server-only') return {}; if (name in stubs) return stubs[name]; if (name === 'zod') return require('zod'); throw Error(`Unmocked dependency ${name}`); } };
  vm.runInNewContext(code, context);
  return context.exports;
}
function guard(identity, error, env) {
  const calls = [];
  const api = load('src/lib/require-crm-admin.ts', { '@/lib/firebase': { auth: {
    async verifyIdToken(...args) { calls.push(args); if (error) throw error; return identity; },
  } } }, env);
  return { ...api, calls };
}
test('admin gate rejects missing, invalid, revoked, unauthorized and unverified identities', async () => {
  const valid = { uid: 'admin', email: 'mantalutamarinciro@gmail.com', email_verified: true };
  for (const token of [undefined, '', {}, 'x'.repeat(10001)]) {
    const g = guard(valid);
    await assert.rejects(() => g.requireCrmAdmin(token));
    assert.equal(g.calls.length, 0);
  }
  for (const identity of [{ ...valid, email: 'other@example.com' }, { ...valid, email_verified: false }, { uid: 'anonymous' }]) {
    await assert.rejects(() => guard(identity).requireCrmAdmin('token'));
  }
  await assert.rejects(() => guard(valid, Error('revoked')).requireCrmAdmin('token'), /Accès administrateur requis/);
});
test('admin gate verifies revocation and honors a restrictive server allowlist', async () => {
  const user = { uid: 'admin', email: 'Admin@Example.com', email_verified: true };
  const g = guard(user, null, { SUPER_ADMIN_EMAILS: 'admin@example.com' });
  assert.equal((await g.requireCrmAdmin('token')).uid, 'admin');
  assert.equal(g.calls[0][1], true);
  await assert.rejects(() => guard(user, null, { SUPER_ADMIN_EMAILS: '' }).requireCrmAdmin('token'));
});
const provenance = load('src/lib/request-provenance.ts');
function service(permit = false, data = {}) {
  let accesses = 0;
  const writes = [];
  const ref = { update: async value => writes.push(value) };
  const db = {
    collection() { accesses++; return { doc: () => ref, orderBy: () => ({ get: async () => ({ docs: [{ id: 'one', data: () => data }] }) }) }; },
    async runTransaction(fn) { return fn({ get: async () => ({ exists: true, data: () => data }), update: (r, value) => writes.push(value) }); },
  };
  const api = load('src/services/requestService.ts', {
    '@/lib/firebase': { db, admin: { firestore: { Timestamp: { now: () => 'now' } } } },
    '@/lib/require-crm-admin': { requireCrmAdmin: async () => { if (!permit) throw Error('Unauthorized'); return { uid: 'admin' }; } },
    '@/lib/request-provenance': provenance,
    '@/lib/ga4-measurement-protocol': { trackLeadLifecycleEvent: async () => true },
    '@/services/customerService': {}, resend: {},
  });
  return { api, writes, accesses: () => accesses };
}
test('all administrative request actions deny access before touching Firestore', async () => {
  const s = service();
  for (const run of [() => s.api.getRequests('bad'), () => s.api.updateRequestStatus('one', 'Archivé', 'bad'),
    () => s.api.updateRequestVolume('one', 10, undefined, 'bad'), () => s.api.setRequestTest('one', true, 'bad')]) {
    await assert.rejects(run, /Unauthorized/);
  }
  assert.equal(s.accesses(), 0);
  await assert.rejects(() => s.api.createRequest({}, undefined), /Unauthorized/);
  assert.equal(s.accesses(), 0);
});
test('authorized test marking records actor without deleting or changing the dossier status', async () => {
  const s = service(true);
  await s.api.setRequestTest('one', true, 'token');
  assert.equal(s.writes[0].isTest, true);
  assert.equal(s.writes[0].testClassification.updatedBy, 'admin');
  assert.equal(s.writes[0].status, undefined);
  await s.api.setRequestTest('one', false, 'token');
  assert.equal(s.writes[1].isTest, false);
});
test('test classification refuses concurrent lifecycle sending and invalid inputs', async () => {
  const busy = service(true, { analyticsEvents: { qualify_lead: { status: 'sending' } } });
  await assert.rejects(() => busy.api.setRequestTest('one', true, 'token'), /Envoi Analytics/);
  assert.equal(busy.writes.length, 0);
  const s = service(true);
  await assert.rejects(() => s.api.setRequestTest('../other', true, 'token'));
  await assert.rejects(() => s.api.setRequestTest('one', 'true', 'token'));
  await assert.rejects(() => s.api.updateRequestVolume('one', -1, undefined, 'token'));
  assert.equal(s.accesses(), 0);
});
test('provenance never invents organic or direct traffic when evidence is missing', () => {
  assert.equal(provenance.requestProvenance({}), 'Provenance inconnue');
  assert.equal(provenance.requestProvenance(null), 'Provenance inconnue');
  assert.match(provenance.requestProvenance({ gclid: 'click' }), /Google Ads/);
  assert.equal(provenance.requestProvenance({ source: 'google', medium: 'organic' }), 'google / organic (UTM)');
});
test('read projection exposes classification and summary, not raw GA identifiers', async () => {
  const { api } = service(true, { isTest: true, analyticsAttribution: { gclid: 'secret-click', clientId: 'id' } });
  const rows = await api.getRequests('token');
  assert.equal(rows[0].isTest, true);
  assert.match(rows[0].provenance, /Google Ads/);
  assert.equal(rows[0].analyticsAttribution, undefined);
});
test('loading legacy statuses is read-only', async () => {
  const s = service(true, { status: 'A traiter' });
  const rows = await s.api.getRequests('token');
  assert.equal(rows[0].status, 'À traiter');
  assert.equal(s.writes.length, 0);
});
test('test requests are skipped before reserving or sending lifecycle events', async () => {
  let updates = 0;
  const api = load('src/lib/ga4-measurement-protocol.ts', { '@/lib/firebase': {
    admin: {}, db: { collection: () => ({ doc: () => ({}) }), runTransaction: fn => fn({
      get: async () => ({ exists: true, data: () => ({ isTest: true, analyticsAttribution: { clientId: 'id' } }) }),
      update: () => updates++,
    }) },
  } }, { GA4_MEASUREMENT_PROTOCOL_API_SECRET: 'unit-test-only' });
  for (const eventName of ['qualify_lead', 'close_convert_lead']) {
    assert.equal(await api.trackLeadLifecycleEvent({ requestId: 'one', eventName }), false);
  }
  assert.equal(updates, 0);
});
