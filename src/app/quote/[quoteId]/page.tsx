import { getQuoteById } from "@/services/quoteService";
import { notFound } from "next/navigation";
import { ClientQuoteView } from "./client-quote-view";

export default async function PublicQuotePage({ params }: { params: Promise<{ quoteId: string }> }) {
  const resolvedParams = await params;
  const quote = await getQuoteById(resolvedParams.quoteId);

  if (!quote) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <ClientQuoteView quote={quote} />
    </div>
  );
}
