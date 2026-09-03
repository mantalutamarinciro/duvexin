import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, Clock3, Mail, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Merci pour votre demande | Déménagement du Vexin",
  description: "Votre demande de devis a bien été transmise à Déménagement du Vexin.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function RemerciementsPage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-slate-50 selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <div className="border-b border-slate-200 bg-white">
        <div className="container mx-auto flex h-20 items-center px-4 md:px-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-slate-500 transition-colors hover:text-[#00ad9f]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au site
          </Link>
        </div>
      </div>

      <section className="relative flex flex-1 items-center py-12 lg:py-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#00ad9f]/10 blur-3xl" />

        <div className="container relative mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white p-7 text-center shadow-2xl sm:p-10 md:p-14">
            <div className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-full bg-[#00ad9f]/10">
              <CheckCircle2 className="h-12 w-12 text-[#00ad9f]" aria-hidden="true" />
            </div>

            <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-[#00ad9f]">
              Demande bien reçue
            </p>
            <h1 className="mb-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Merci pour votre confiance&nbsp;!
            </h1>
            <p className="mx-auto mb-9 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Votre demande de devis a bien été transmise à notre équipe. Un conseiller va
              l&apos;étudier et vous recontactera rapidement pour préciser votre projet.
            </p>

            <div className="mb-9 grid gap-4 text-left sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <Clock3 className="mb-3 h-6 w-6 text-[#00ad9f]" aria-hidden="true" />
                <h2 className="font-bold text-slate-900">Réponse sous 24h</h2>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">
                  Nous revenons vers vous dans les meilleurs délais, pendant nos jours ouvrés.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <Mail className="mb-3 h-6 w-6 text-[#00ad9f]" aria-hidden="true" />
                <h2 className="font-bold text-slate-900">Surveillez votre messagerie</h2>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">
                  Votre conseiller pourra vous écrire ou vous appeler pour compléter l&apos;estimation.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild className="h-12 rounded-full bg-[#00ad9f] px-8 text-white shadow-lg shadow-[#00ad9f]/20 hover:bg-[#009286]">
                <Link href="/">Retour à l&apos;accueil</Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full border-slate-300 px-8 text-slate-700">
                <a href="tel:+33130751235">
                  <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                  01 30 75 12 35
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
