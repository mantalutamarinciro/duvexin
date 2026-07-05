"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

// UI Components
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { QuoteForm } from "@/components/quote-form"
import type { QuoteRequestFormData } from "@/types/quote"

// Icons
import { 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ArrowLeft, 
  Star, 
  Calculator,
  MessageCircle
} from "lucide-react"

export default function PublicQuotePage() {
  const [saving, setSaving] = useState(false)
  const [quoteId, setQuoteId] = useState<string | null>(null)
  const { toast } = useToast()
  
  async function onSubmit(values: QuoteRequestFormData) {
    setSaving(true);
    setQuoteId(null);
    try {
      // On sauvegarde dans la collection `requests` plutôt que `quotes`
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: values.clientName,
          clientEmail: values.clientEmail,
          clientPhone: values.clientPhone,
          originAddress: values.originAddress,
          destinationAddress: values.destinationAddress,
          moveDate: values.moveDate || undefined,
          volume: values.volume || 0,
          details: values.details || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("La demande n'a pas pu être enregistrée.");
      }

      const result = await response.json() as { id?: string; requestId?: string };
      const savedRequestId = result.id || result.requestId;
      if (!savedRequestId) {
        throw new Error("La demande a été enregistrée sans référence de retour.");
      }
      
      // Simulation of a small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 600));
      
      setQuoteId(savedRequestId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du devis:", error);
      toast({
        variant: "destructive",
        title: "Oups, une erreur est survenue",
        description: "Impossible d'envoyer votre demande. Veuillez vérifier votre connexion ou réessayer dans un instant.",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      
      {/* HEADER SIMPLIFIÉ (Pour garder le focus sur le formulaire) */}
      <div className="bg-white border-b border-slate-200">
         <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-[#00ad9f] transition-colors">
               <ArrowLeft className="mr-2 h-4 w-4" />
               Retour au site
            </Link>
            
            {/* Petit badge de confiance Google */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-full">
               <div className="flex text-amber-400"><Star className="h-3.5 w-3.5 fill-current" /></div>
               <span className="text-xs font-bold text-slate-700">4.9/5</span>
               <span className="text-xs text-slate-500">Avis Google</span>
            </div>
         </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start max-w-7xl mx-auto">
          
          {/* --- COLONNE GAUCHE : RÉASSURANCE (Sticky sur Desktop) --- */}
          <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00ad9f] mb-6 shadow-sm">
                <Calculator className="h-4 w-4" />
                Estimation rapide
              </div>
              <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                Votre devis <br/>
                <span className="text-[#00ad9f]">gratuit.</span>
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed">
                Remplissez ce formulaire pour nous détailler votre projet. Nos experts l'analyseront pour vous proposer la formule la plus adaptée.
              </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-slate-200">
              {/* Argument 1 */}
              <div className="flex gap-5">
                <div className="mt-1 h-12 w-12 rounded-2xl bg-[#00ad9f]/10 flex items-center justify-center shrink-0">
                   <Clock className="h-6 w-6 text-[#00ad9f]" />
                </div>
                <div>
                   <h3 className="font-bold text-slate-900 text-lg">Réponse sous 24h</h3>
                   <p className="text-slate-500 mt-1">Nous nous engageons à traiter votre demande dans les plus brefs délais (jours ouvrés).</p>
                </div>
              </div>
              {/* Argument 2 */}
              <div className="flex gap-5">
                <div className="mt-1 h-12 w-12 rounded-2xl bg-[#00ad9f]/10 flex items-center justify-center shrink-0">
                   <ShieldCheck className="h-6 w-6 text-[#00ad9f]" />
                </div>
                <div>
                   <h3 className="font-bold text-slate-900 text-lg">Sans aucun engagement</h3>
                   <p className="text-slate-500 mt-1">Vous êtes libre d'accepter ou de décliner notre proposition, en toute transparence.</p>
                </div>
              </div>
              {/* Argument 3 */}
              <div className="flex gap-5">
                <div className="mt-1 h-12 w-12 rounded-2xl bg-[#00ad9f]/10 flex items-center justify-center shrink-0">
                   <MessageCircle className="h-6 w-6 text-[#00ad9f]" />
                </div>
                <div>
                   <h3 className="font-bold text-slate-900 text-lg">Un conseiller dédié</h3>
                   <p className="text-slate-500 mt-1">Un expert vous accompagnera du premier contact jusqu'à la fin de votre déménagement.</p>
                </div>
              </div>
            </div>
          </div>

          {/* --- COLONNE DROITE : LE FORMULAIRE --- */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {quoteId ? (
                // --- ÉTAT DE SUCCÈS (Whaou Effect) ---
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-2xl border border-slate-100 text-center relative overflow-hidden isolate"
                >
                  {/* Décors fond succès */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-gradient-to-b from-[#00ad9f]/10 to-transparent -z-10" />
                  
                  <div className="mx-auto w-24 h-24 bg-[#00ad9f]/10 rounded-full flex items-center justify-center mb-8 relative">
                    <div className="absolute inset-0 bg-[#00ad9f]/20 rounded-full animate-ping opacity-75" />
                    <CheckCircle2 className="w-12 h-12 text-[#00ad9f] relative z-10" />
                  </div>
                  
                  <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
                    C'est dans la boîte !
                  </h2>
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg mx-auto">
                    Merci pour votre confiance. Votre demande a bien été transmise à notre équipe sous la référence :
                    <br/>
                    <span className="inline-block mt-4 px-4 py-2 bg-slate-100 text-slate-800 font-mono font-bold rounded-xl border border-slate-200 shadow-inner">
                      #{quoteId.split('-')[0].toUpperCase()}
                    </span>
                  </p>

                  <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left text-sm text-slate-600 border border-slate-100">
                    <p className="font-bold text-slate-900 mb-2">Et maintenant ?</p>
                    <ul className="space-y-2">
                      <li className="flex gap-2"><span>1.</span> Un expert étudie votre volume et vos accès.</li>
                      <li className="flex gap-2"><span>2.</span> Si besoin, nous vous appelons pour affiner les détails.</li>
                      <li className="flex gap-2"><span>3.</span> Vous recevez votre devis ferme par email sous 24h.</li>
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      onClick={() => setQuoteId(null)} 
                      variant="outline" 
                      className="rounded-full h-12 px-8 border-slate-300 text-slate-700 hover:bg-slate-50"
                    >
                      Nouvelle demande
                    </Button>
                    <Button 
                      asChild 
                      className="rounded-full h-12 px-8 bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20"
                    >
                      <Link href="/">Retour à l'accueil</Link>
                    </Button>
                  </div>
                </motion.div>
              ) : (
                // --- LE FORMULAIRE ---
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-2xl border border-slate-100"
                >
                  <QuoteForm 
                    onSubmit={onSubmit}
                    submitButtonText="Envoyer ma demande de devis"
                    isSaving={saving}
                    isDashboard={false} // Force simplified public view
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
        </div>
      </div>
    </main>
  )
}
