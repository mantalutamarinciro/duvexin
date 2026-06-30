import { getQuoteById } from "@/services/quoteService";
import { notFound } from "next/navigation";
import { CheckCircle2, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default async function SuccessQuotePage({ params }: { params: Promise<{ quoteId: string }> }) {
  const resolvedParams = await params;
  const quote = await getQuoteById(resolvedParams.quoteId);

  if (!quote) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="rounded-[2rem] border-none shadow-2xl bg-white dark:bg-slate-900 overflow-hidden text-center">
          <div className="h-2 w-full bg-emerald-500" />
          <CardContent className="pt-12 pb-10 px-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-100 text-emerald-600 mb-8 mx-auto">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
              Devis validé !
            </h1>
            
            <p className="text-slate-500 mb-8 leading-relaxed">
              Merci {quote.clientName} ! Votre paiement a bien été traité et votre devis est officiellement accepté. Nous venons de vous envoyer la facture d'acompte par email.
            </p>

            <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 mb-8 text-left flex items-center gap-4">
              <div className="bg-white dark:bg-slate-900 p-3 rounded-xl shadow-sm">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Réf. {quote.id.substring(0, 8).toUpperCase()}</p>
                <p className="text-xs text-slate-500">Réservation confirmée</p>
              </div>
            </div>

            <Button asChild className="w-full h-14 rounded-xl text-base font-bold shadow-lg shadow-primary/20">
              <Link href="/">
                Retourner sur le site <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
