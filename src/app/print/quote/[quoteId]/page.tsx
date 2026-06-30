import { getQuoteById } from "@/services/quoteService";
import { QuotePDF } from "@/components/quote-pdf";
import { notFound } from "next/navigation";

export default async function PrintQuotePage({ params }: { params: Promise<{ quoteId: string }> }) {
  const { quoteId } = await params;
  const quoteData = await getQuoteById(quoteId);

  if (!quoteData) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      <QuotePDF data={quoteData as any} quote={quoteData.quote || 0} />
    </div>
  );
}
