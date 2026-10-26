import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, Building2, CheckCircle2, MapPin, Ruler, Truck } from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const FAQS = [
  {
    question: "Comment préparer le stationnement du camion au Havre ?",
    answer:
      "Les besoins dépendent de l'adresse, de la durée de l'intervention et des règles applicables au moment du déménagement. Le repérage des accès permet d'anticiper l'emplacement du véhicule et les éventuelles démarches de stationnement.",
  },
  {
    question: "Quels éléments déterminent le prix d'un déménagement au Havre ?",
    answer:
      "Le devis tient notamment compte du volume, de la distance, des étages, de la présence d'un ascenseur, du portage, de la formule choisie et des moyens de manutention nécessaires.",
  },
  {
    question: "Un monte-meubles est-il toujours nécessaire ?",
    answer:
      "Non. Son intérêt est étudié selon la cage d'escalier, l'ascenseur, la façade, la possibilité de positionner l'équipement et les autorisations éventuellement requises.",
  },
  {
    question: "Le groupage est-il possible pour un départ ou une arrivée au Havre ?",
    answer:
      "Cette option peut être étudiée pour certains volumes et certaines destinations, lorsque les dates et les contraintes logistiques sont compatibles. Elle est proposée uniquement si elle convient réellement au projet.",
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Déménagement au Havre",
    serviceType: "Service de déménagement",
    url: "https://demenagementduvexin.fr/demenagement-le-havre-76600",
    provider: {
      "@type": "MovingCompany",
      name: "Déménagement du Vexin",
      url: "https://demenagementduvexin.fr",
    },
    areaServed: {
      "@type": "City",
      name: "Le Havre",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  },
];

const PREPARATION_POINTS = [
  {
    icon: Ruler,
    title: "Volume et formule",
    text: "L'inventaire du mobilier et des cartons sert à dimensionner le véhicule, l'équipe et le niveau de prestation.",
  },
  {
    icon: Building2,
    title: "Étages et manutention",
    text: "Ascenseur, escaliers, largeur des passages et objets encombrants sont examinés avant de retenir les moyens adaptés.",
  },
  {
    icon: MapPin,
    title: "Accès et stationnement",
    text: "La distance de portage et l'emplacement possible du camion sont intégrés à l'étude du déménagement.",
  },
];

export default function LeHavrePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Script
        id="le-havre-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="relative overflow-hidden bg-[#0b0f19] pb-20 pt-32 text-white lg:pb-24 lg:pt-40">
        <Image
          src="/images/zones/demenagement-seine-maritime.webp"
          alt="Préparation d'un déménagement en Seine-Maritime"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/90 to-[#0b0f19]/55" />
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/65" aria-label="Fil d’Ariane">
            <Link href="/" className="transition-colors hover:text-white">Accueil</Link>
            <span aria-hidden="true">/</span>
            <Link href="/demenagement-seine-maritime-76" className="transition-colors hover:text-white">Seine-Maritime (76)</Link>
            <span aria-hidden="true">/</span>
            <span className="text-teal-300">Le Havre</span>
          </nav>

          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-teal-300">Projet local ou longue distance</p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Votre déménageur au Havre (76600)
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200 md:text-xl">
              Une étude personnalisée du volume, des accès et du stationnement pour organiser votre départ ou votre arrivée au Havre avec les moyens adaptés.
            </p>
            <Button asChild size="lg" className="mt-9 h-14 rounded-full bg-[#00ad9f] px-8 font-bold text-white hover:bg-[#009286]">
              <Link href="/demande-devis">Demander un devis personnalisé <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container mx-auto grid gap-14 px-4 md:px-6 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#008f84]">Une organisation adaptée à l'adresse</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">Préparer un déménagement au Havre sans sous-estimer les accès</h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-slate-600">
              <p>
                Un appartement du centre reconstruit, une rue de Saint-François, une maison à Sanvic ou un logement à Graville ne présentent pas les mêmes conditions de manutention. Les étages, l'ascenseur et la distance entre le logement et le camion peuvent modifier l'organisation nécessaire.
              </p>
              <p>
                Avant le chiffrage, nous recueillons les informations utiles sur les deux adresses et le mobilier à transporter. Cette préparation permet de proposer une formule cohérente, qu'il s'agisse d'un déménagement dans l'agglomération havraise ou d'une liaison vers une autre région.
              </p>
            </div>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-bold">Les points vérifiés avant le devis</h2>
            <div className="mt-7 space-y-7">
              {PREPARATION_POINTS.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-[#008f84]">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="mt-1 leading-relaxed text-slate-600">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#008f84]">Du besoin au jour du départ</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">Une prestation calibrée pour votre projet</h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">Le périmètre de la prestation est défini clairement dans le devis, selon ce que vous souhaitez réaliser vous-même et ce que vous confiez aux déménageurs.</p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
            {[
              ["Déménagement local", "Pour changer de quartier ou rejoindre une commune proche, avec une organisation proportionnée à la distance et aux accès."],
              ["Départ ou arrivée au Havre", "Pour une liaison avec l'Île-de-France, la Normandie ou une autre région, en direct ou avec une solution de groupage lorsqu'elle est pertinente."],
              ["Options de préparation", "Emballage, démontage, remontage et protection spécifique peuvent être intégrés selon la formule retenue."],
            ].map(([title, text]) => (
              <article key={title} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <CheckCircle2 className="h-7 w-7 text-[#00ad9f]" />
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-3 leading-relaxed text-slate-600">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/demenagement-seine-maritime-76" className="font-semibold text-[#007f76] underline decoration-teal-300 underline-offset-4 hover:text-[#006b63]">
              Voir notre zone d'intervention en Seine-Maritime
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <div className="text-center">
            <Truck className="mx-auto h-9 w-9 text-[#00ad9f]" />
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">Questions fréquentes sur le déménagement au Havre</h2>
          </div>
          <Accordion type="single" collapsible className="mt-10 w-full">
            {FAQS.map((item, index) => (
              <AccordionItem key={item.question} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-bold hover:no-underline">{item.question}</AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-slate-600">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="bg-[#0b0f19] py-16 text-white">
        <div className="container mx-auto px-4 text-center md:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight">Faites étudier votre déménagement au Havre</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">Indiquez les adresses, le volume estimé et les contraintes connues pour recevoir une proposition adaptée à votre projet.</p>
          <Button asChild size="lg" className="mt-8 h-14 rounded-full bg-[#00ad9f] px-8 font-bold text-white hover:bg-[#009286]">
            <Link href="/demande-devis">Décrire mon projet <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
