import { getInvoiceById } from "@/services/invoiceService";
import { getQuoteById } from "@/services/quoteService";
import { InvoicePDF } from "@/components/invoice-pdf";
import { notFound } from "next/navigation";

export default async function PrintInvoicePage({ params }: { params: Promise<{ invoiceId: string }> }) {
  const { invoiceId } = await params;
  
  const invoiceData = await getInvoiceById(invoiceId);
  if (!invoiceData) {
    notFound();
  }

  const quoteData = await getQuoteById(invoiceData.quoteId);
  if (!quoteData) {
    notFound();
  }

  // Combine Quote data and Invoice ID to match the Booking structure expected by InvoicePDF
  const mappedData = {
    id: invoiceData.id,
    clientName: invoiceData.clientName,
    clientEmail: quoteData.clientEmail,
    clientPhone: quoteData.clientPhone || '',
    moveDate: quoteData.moveDate || new Date().toISOString(),
    volume: quoteData.volume || 0,
    quoteId: invoiceData.quoteId,
    originAddress: quoteData.originAddress || '',
    destinationAddress: quoteData.destinationAddress || '',
    serviceType: quoteData.serviceType || 'basic',
    total: invoiceData.amountTTC, // Use invoice total
  };

  return (
    <div className="bg-white min-h-screen">
      <InvoicePDF data={mappedData as any} />
    </div>
  );
}
