const assert = require('node:assert/strict');
const { test } = require('node:test');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

function load(file, mocks) {
  const source = readFileSync(path.join(__dirname, '../src/services', file), 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const context = { exports: {}, Date, console, process: { env: {} }, require: name => {
    if (!(name in mocks)) throw new Error(`Unexpected import ${name}`);
    return mocks[name];
  } };
  vm.runInNewContext(code, context);
  return context.exports;
}

for (const moveDate of [null, '2026-10-01T10:00:00.000Z']) {
  test(`acceptance with date ${moveDate} creates only appropriate records`, async () => {
    const calls = [];
    const service = load('quoteAcceptanceService.ts', {
      './quoteService': {
        getQuoteById: async () => ({ id: 'test', clientName: 'Test', quote: 10, moveDate }),
        updateQuoteStatus: async (id, status) => calls.push(['status', id, status]),
      },
      './invoiceService': { createInvoice: async data => { assert.equal(data.amountTTC, 10); calls.push(['invoice']); } },
      './bookingService': { createBookingFromQuote: async () => calls.push(['booking']) },
    });
    const result = await service.acceptQuote('test');
    assert.equal(result.awaitingDate, !moveDate);
    assert.deepEqual(calls.map(c => c[0]), moveDate ? ['invoice', 'booking', 'status'] : ['invoice', 'status']);
  });
}

test('invalid date fails before any write', async () => {
  const fail = async () => assert.fail('No write expected');
  const service = load('quoteAcceptanceService.ts', {
    './quoteService': { getQuoteById: async () => ({ moveDate: 'invalid' }), updateQuoteStatus: fail },
    './invoiceService': { createInvoice: fail },
    './bookingService': { createBookingFromQuote: fail },
  });
  await assert.rejects(service.acceptQuote('test'), /date/);
});

test('invoice creation reuses legacy invoices and repeated requests without overwriting', async () => {
  let existing = [];
  let writes = 0;
  let locks = 0;
  const quoteRef = {};
  const query = {};
  const db = {
    collection: name => name === 'quotes' ? { doc: () => quoteRef } : {
      doc: () => ({ id: 'new-invoice' }),
      where: () => ({ limit: () => query }),
    },
    runTransaction: async fn => fn({
      get: async ref => ref === quoteRef ? { exists: true } : { empty: !existing.length, docs: existing },
      set: (ref, data) => { writes++; assert.equal(data.amountTTC, 10); existing = [ref]; },
      update: ref => { assert.equal(ref, quoteRef); locks++; },
    }),
  };
  const service = load('invoiceService.ts', {
    '@/lib/firebase': { db, admin: { firestore: { Timestamp: { now: () => 0, fromDate: d => d } } } },
    resend: {}, './quoteService': {},
  });
  const input = { quoteId: 'test', clientName: 'Test', amountTTC: 10, dueDate: '2026-10-01' };
  assert.equal((await service.createInvoice(input)).id, 'new-invoice');
  assert.equal((await service.createInvoice(input)).id, 'new-invoice');
  assert.equal(writes, 1);
  assert.equal(locks, 1);
  existing = [{ id: 'legacy-invoice' }];
  assert.equal((await service.createInvoice(input)).id, 'legacy-invoice');
  assert.equal(writes, 1);
});
