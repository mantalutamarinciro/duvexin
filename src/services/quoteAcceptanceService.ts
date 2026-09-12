'use server';

import { getQuoteById, updateQuoteStatus } from './quoteService';
import { createInvoice } from './invoiceService';
import { createBookingFromQuote } from './bookingService';

export async function acceptQuote(id: string): Promise<{ awaitingDate: boolean }> {
  // Read current server data rather than the potentially stale table row.
  const quote = await getQuoteById(id);
  if (!quote) throw new Error('Devis introuvable.');
  if (quote.moveDate && Number.isNaN(new Date(quote.moveDate).getTime())) {
    throw new Error('La date du devis est invalide.');
  }
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 30);
  await createInvoice({
    quoteId: id,
    clientName: quote.clientName,
    amountTTC: quote.quote,
    dueDate: dueDate.toISOString(),
  });
  if (quote.moveDate) await createBookingFromQuote(quote);
  await updateQuoteStatus(id, 'Accepté');
  return { awaitingDate: !quote.moveDate };
}
