"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"

// UI Components
import { useToast } from "@/hooks/use-toast"
import { QuoteForm } from "@/components/quote-form"
import type { QuoteRequestFormData } from "@/types/quote"
import { getLeadAttribution, markGenerateLeadPending } from "@/lib/analytics"

// Icons
import { 
  Clock, 
  ShieldCheck, 
  ArrowLeft, 
  Calculator,
  MessageCircle
} from "lucide-react"

const QUOTE_FAQS = [
  {
    question: "Quelles informations faut-il fournir pour préparer un devis de déménagement ?",
    answer: "Les adresses de départ et d’arrivée sont indispensables. Pour affiner l’étude, indiquez aussi le type de logement, les étages, les ascenseurs, le stationnement, la date souhaitée et les objets lourds ou fragiles.",
  },
  {
    question: "La demande de devis est-elle gratuite et sans engagement ?",
    answer: "Oui. La demande permet d’étudier votre projet et ne vous oblige pas à accepter la proposition reçue.",
  },
  {
    question: "Quels éléments influencent le prix d’un déménagement ?",
    answer: "Le volume à transporter, la distance, les conditions d’accès, le stationnement, la période et le niveau de prestation demandé font partie des principaux éléments examinés.",
  },
]

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://demenagementduvexin.fr/" },
      { "@type": "ListItem", position: 2, name: "Demande de devis", item: "https://demenagementduvexin.fr/demande-devis" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: QUOTE_FAQS.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  },
]

export default function PublicQuotePage() {
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  
  async function onSubmit(values: QuoteRequestFormData) {
    setSaving(true);
    try {
      const analyticsAttribution = await getLeadAttribution().catch(() => ({}))
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
          analyticsAttribution,
        }),
      });

      if (!response.ok) {
        throw new Error("La demande n'a pas pu être enregistrée.");
      }

      const result = await response.json() as { id?: string; requestId?: string };
      if (!result.id && !result.requestId) {
        throw new Error("La demande a été enregistrée sans référence de retour.");
      }

      markGenerateLeadPending({
        formName: "public_quote_request",
        requestId: (result.requestId || result.id)!,
      });

      router.push("/remerciements");
      
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* HEADER SIMPLIFIÉ (Pour garder le focus sur le formulaire) */}
      <div className="bg-white border-b border-slate-200">
         <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-[#00ad9f] transition-colors">
               <ArrowLeft className="mr-2 h-4 w-4" />
               Retour au site
            </Link>
            
            {/* Réassurance factuelle */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-full">
               <ShieldCheck className="h-4 w-4 text-[#00ad9f]" />
               <span className="text-xs font-bold text-slate-700">Demande gratuite et sans engagement</span>
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
                Devis personnalisé
              </div>
              <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                Demande de devis <br/>
                <span className="text-[#00ad9f]">déménagement.</span>
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed">
                Décrivez votre trajet et vos contraintes pour recevoir une proposition adaptée à votre volume, à vos accès et au niveau de prestation souhaité.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-500">
                Vous hésitez sur les informations à préparer ? Consultez notre <Link href="/calculateur-volume" className="font-semibold text-[#008f84] underline underline-offset-4">calculateur de volume</Link> et les <Link href="/tarif-demenagement" className="font-semibold text-[#008f84] underline underline-offset-4">éléments qui déterminent le prix</Link>.
              </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-slate-200">
              {/* Argument 1 */}
              <div className="flex gap-5">
                <div className="mt-1 h-12 w-12 rounded-2xl bg-[#00ad9f]/10 flex items-center justify-center shrink-0">
                   <Clock className="h-6 w-6 text-[#00ad9f]" />
                </div>
                <div>
                   <h3 className="font-bold text-slate-900 text-lg">Réponse dans les meilleurs délais</h3>
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-2xl border border-slate-100"
            >
              <QuoteForm
                onSubmit={onSubmit}
                submitButtonText="Envoyer ma demande de devis"
                isSaving={saving}
                isDashboard={false}
              />
            </motion.div>
          </div>
          
        </div>

        <section aria-labelledby="quote-faq-title" className="mx-auto mt-16 max-w-4xl border-t border-slate-200 pt-12 lg:mt-20">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#008f84]">Préparer votre demande</p>
            <h2 id="quote-faq-title" className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">Questions fréquentes sur le devis</h2>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {QUOTE_FAQS.map(({ question, answer }) => (
              <article key={question} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-bold leading-snug text-slate-900">{question}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{answer}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
