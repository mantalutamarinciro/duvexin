import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Calculator,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock,
  Euro,
  FileText,
  Home,
  MapPin,
  PackageCheck,
  Phone,
  Route,
  Scale,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
  Warehouse,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const BASE_URL = "https://demenagementduvexin.fr";

export const metadata: Metadata = {
  title: "Devis déménagement gratuit | Estimation personnalisée sous 24h",
  description:
    "Obtenez un devis de déménagement gratuit, clair et personnalisé : volume, distance, accès, formule, assurance et prix ferme après validation technique.",
  alternates: {
    canonical: `${BASE_URL}/devis-demenagement`,
  },
  openGraph: {
    title: "Devis déménagement gratuit | Déménagement du Vexin",
    description:
      "Demandez une estimation personnalisée pour votre déménagement : analyse du volume, des accès, de la distance, des options et des garanties.",
    url: `${BASE_URL}/devis-demenagement`,
    type: "website",
  },
  keywords: [
    "devis déménagement",
    "devis déménagement gratuit",
    "devis déménagement en ligne",
    "devis déménageur professionnel",
    "estimation déménagement",
    "prix devis déménagement",
    "devis déménagement m3",
  ],
};

const trustSignals = [
  { label: "Devis gratuit", detail: "sans engagement", icon: Euro },
  { label: "Réponse sous 24h", detail: "jours ouvrés", icon: Clock },
  { label: "Prix détaillé", detail: "volume, accès, distance", icon: FileText },
  { label: "Équipes salariées", detail: "zéro sous-traitance", icon: Users },
];

const steps = [
  {
    title: "1. Vous décrivez votre projet",
    text: "Adresses de départ et d'arrivée, date souhaitée, type de logement, étage, ascenseur, stationnement, objets particuliers et volume estimé.",
    icon: ClipboardCheck,
  },
  {
    title: "2. Nous analysons les contraintes",
    text: "Un conseiller vérifie les accès, la distance, la formule adaptée, les besoins en emballage, monte-meubles, garde-meubles ou groupage.",
    icon: Route,
  },
  {
    title: "3. Vous recevez un devis clair",
    text: "Le devis précise la prestation, les moyens prévus, les garanties, le prix et les conditions. Vous décidez ensuite librement.",
    icon: PackageCheck,
  },
];

const priceFactors = [
  {
    title: "Le volume en m³",
    text: "C'est la base du calcul : taille du camion, nombre de déménageurs, matériel d'emballage et durée de manutention.",
    icon: Calculator,
  },
  {
    title: "La distance",
    text: "Un trajet local, régional, national ou international n'implique pas les mêmes coûts de carburant, péages, temps d'équipe et organisation.",
    icon: Route,
  },
  {
    title: "Les accès",
    text: "Étage élevé, ascenseur étroit, long portage, rue piétonne, cour intérieure ou stationnement réglementé modifient fortement la charge réelle.",
    icon: Home,
  },
  {
    title: "La formule",
    text: "Économique, standard, confort ou prise en charge complète : plus nous emballons et préparons, plus le devis doit intégrer du temps qualifié.",
    icon: Sparkles,
  },
  {
    title: "La période",
    text: "Les fins de mois, week-ends, vacances scolaires et périodes estivales demandent plus d'anticipation pour sécuriser le planning.",
    icon: Clock,
  },
  {
    title: "Les options techniques",
    text: "Monte-meubles, démontage, protection renforcée, piano, coffre, œuvre d'art ou stockage temporaire nécessitent une préparation spécifique.",
    icon: ShieldCheck,
  },
];

const sampleBudgets = [
  {
    project: "Studio ou chambre",
    volume: "10 à 15 m³",
    situation: "trajet local, accès simples",
    budget: "environ 450 à 850 €",
  },
  {
    project: "Appartement T2 / T3",
    volume: "20 à 30 m³",
    situation: "formule standard, distance courte",
    budget: "environ 800 à 1 600 €",
  },
  {
    project: "Appartement familial",
    volume: "35 à 45 m³",
    situation: "étages, démontage et fragile",
    budget: "environ 1 400 à 2 400 €",
  },
  {
    project: "Maison ou longue distance",
    volume: "50 m³ et plus",
    situation: "visite technique conseillée",
    budget: "sur devis personnalisé",
  },
];

const formulas = [
  {
    name: "Économique",
    target: "Vous emballez vos cartons et objets non fragiles.",
    includes: "Protection du mobilier, manutention, chargement, transport et livraison.",
  },
  {
    name: "Standard",
    target: "Vous voulez déléguer le fragile et les meubles complexes.",
    includes: "Formule économique + emballage du fragile, démontage et remontage selon besoin.",
  },
  {
    name: "Confort",
    target: "Vous manquez de temps ou déménagez un logement complet.",
    includes: "Prise en charge élargie de l'emballage, préparation méthodique et accompagnement renforcé.",
  },
  {
    name: "Prestige",
    target: "Vous souhaitez une prestation très encadrée, discrète et complète.",
    includes: "Organisation avancée, protection premium, objets sensibles, coordination fine et remise en place.",
  },
];

const legalPoints = [
  "références de l'entreprise et coordonnées du client",
  "date ou période prévue pour le déménagement",
  "lieux de chargement et de livraison, avec distance à l'aller",
  "date d'établissement du devis",
  "volume du mobilier estimé",
  "type de voyage : spécial ou organisé",
  "définition exacte de la prestation choisie",
  "modalités de paiement, responsabilité et garanties",
  "montant HT et TTC, avec prix définitif et absence de frais supplémentaires",
];

const localLinks = [
  { label: "Val-d'Oise (95)", href: "/demenagement-val-d-oise-95" },
  { label: "Oise (60)", href: "/demenagement-oise-60" },
  { label: "Yvelines (78)", href: "/demenagement-yvelines-78" },
  { label: "Eure (27)", href: "/demenagement-eure-27" },
  { label: "Paris (75)", href: "/demenagement-paris-75" },
  { label: "Hauts-de-Seine (92)", href: "/demenagement-hauts-de-seine-92" },
  { label: "Val-de-Marne (94)", href: "/demenagement-val-de-marne-94" },
  { label: "Seine-Saint-Denis (93)", href: "/demenagement-seine-saint-denis-93" },
];

const preparationItems = [
  "listez les meubles volumineux pièce par pièce",
  "notez les étages, ascenseurs, caves, greniers et distances de portage",
  "précisez les objets fragiles, lourds ou de valeur",
  "indiquez si un stationnement est possible devant chaque adresse",
  "estimez votre volume avec le calculateur si vous hésitez",
  "ajoutez les contraintes de date : préavis, vente, remise des clés, urgence",
];

const faqItems = [
  {
    question: "Un devis de déménagement est-il gratuit ?",
    answer:
      "Oui, pour une prestation de déménagement, le devis est gratuit. Chez Déménagement du Vexin, la demande en ligne est également sans engagement : vous recevez une proposition claire, puis vous décidez librement.",
  },
  {
    question: "Combien de temps faut-il pour recevoir un devis ?",
    answer:
      "Nous traitons généralement les demandes sous 24h ouvrées. Si le projet nécessite une visite technique ou des informations complémentaires, un conseiller vous contacte pour affiner le chiffrage avant envoi.",
  },
  {
    question: "Pourquoi deux devis peuvent-ils être très différents ?",
    answer:
      "Parce qu'ils ne couvrent pas toujours le même périmètre : volume, nombre de déménageurs, formule, assurance, accès, monte-meubles, démontage ou emballage. Il faut comparer le détail de la prestation, pas uniquement le montant final.",
  },
  {
    question: "Peut-on faire un devis sans connaître précisément le volume ?",
    answer:
      "Oui, mais le volume reste l'un des critères majeurs. Vous pouvez utiliser notre calculateur de volume, joindre des photos ou demander une visite technique pour fiabiliser l'estimation.",
  },
  {
    question: "Le prix indiqué est-il ferme ?",
    answer:
      "Le prix devient ferme lorsque les informations techniques sont validées : volume, accès, adresses, formule et options. Si les informations fournies sont incomplètes ou erronées, le devis doit être ajusté pour rester réaliste.",
  },
  {
    question: "Faut-il demander un devis pour un petit déménagement ?",
    answer:
      "Oui. Même pour un studio, un meuble isolé ou un petit volume, le devis permet de clarifier le véhicule, la main-d'œuvre, les accès, l'assurance et le créneau d'intervention.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Devis déménagement", item: `${BASE_URL}/devis-demenagement` },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Devis déménagement gratuit",
  serviceType: "Déménagement professionnel",
  provider: {
    "@type": "MovingCompany",
    name: "Déménagement du Vexin",
    url: BASE_URL,
    telephone: "+33130751235",
  },
  areaServed: ["Île-de-France", "Val-d'Oise", "Oise", "Yvelines", "Eure", "Normandie", "France"],
  offers: {
    "@type": "Offer",
    name: "Demande de devis déménagement gratuit",
    price: "0",
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    url: `${BASE_URL}/devis-demenagement`,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function DevisDemenagementPage() {
  const jsonLd = [breadcrumbSchema, serviceSchema, faqSchema];

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-primary/20 selection:text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative overflow-hidden bg-[#0b0f19] pt-32 pb-20 text-white lg:pt-44 lg:pb-28">
        <Image
          src="/images/entete-pages.webp"
          alt="Préparation d'un devis de déménagement professionnel"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b0f19] via-[#0b0f19]/90 to-[#071f1d]/80" />
        <div className="absolute -right-24 top-20 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <nav className="mb-8 flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-white/50" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-white">Accueil</Link>
            <ChevronRight className="mx-3 h-3 w-3 opacity-50" />
            <span className="text-primary">Devis déménagement</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-4xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-teal-200 backdrop-blur-md">
                <FileText className="h-4 w-4" />
                Estimation gratuite et personnalisée
              </div>

              <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl">
                Devis déménagement gratuit :{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-200">
                  un prix clair, pas une surprise.
                </span>
              </h1>

              <p className="mt-8 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
                Un bon devis de déménagement ne se limite pas à un montant. Il doit expliquer le volume retenu,
                la distance, les accès, la formule choisie, les protections prévues, les options utiles et les
                garanties. Notre rôle : transformer votre projet en proposition lisible, exploitable et réaliste.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="h-14 rounded-full bg-primary px-8 text-base font-black text-white shadow-xl shadow-primary/25 hover:bg-primary/90" asChild>
                  <Link href="/demande-devis">
                    Demander mon devis gratuit <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 rounded-full border-white/20 bg-white/10 px-8 text-base font-bold text-white hover:bg-white/20 hover:text-white" asChild>
                  <Link href="tel:+33130751235">
                    <Phone className="mr-2 h-5 w-5" />
                    01 30 75 12 35
                  </Link>
                </Button>
              </div>
            </div>

            <aside className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-md lg:p-8">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-teal-200">Ce que nous vérifions</p>
              <div className="mt-6 grid gap-4">
                {trustSignals.map((signal) => (
                  <div key={signal.label} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                      <signal.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-extrabold text-white">{signal.label}</p>
                      <p className="text-sm text-slate-300">{signal.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-[#020617]/60 p-5 text-sm leading-relaxed text-slate-300">
                Le devis est gratuit et sans engagement. Un prix ferme nécessite une validation technique du volume,
                des accès, des adresses et de la formule retenue.
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">Intention de recherche</span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                Vous ne cherchez pas “un devis”. Vous cherchez une décision fiable.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                La requête “devis déménagement” cache souvent une inquiétude très concrète : combien cela va coûter,
                que comprend le prix, comment éviter les frais imprévus et à qui confier ses biens. Cette page répond
                à ces questions avant de vous orienter vers le formulaire.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {steps.map((step) => (
                <article key={step.title} className="rounded-[2rem] border border-slate-100 bg-slate-50 p-7 shadow-sm">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                    <step.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900">{step.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">Calcul du prix</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              Les critères qui font varier un devis de déménagement
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Deux logements de même surface peuvent générer deux devis très différents. Le vrai coût dépend de la
              manutention réelle, du trajet, de la préparation et des moyens techniques à mobiliser.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {priceFactors.map((factor) => (
              <article key={factor.title} className="group rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <factor.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">{factor.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{factor.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button className="h-14 rounded-full bg-slate-900 px-7 font-bold text-white hover:bg-slate-800" asChild>
              <Link href="/calculateur-volume">
                <Calculator className="mr-2 h-4 w-4" />
                Calculer mon volume
              </Link>
            </Button>
            <Button variant="outline" className="h-14 rounded-full border-slate-200 px-7 font-bold" asChild>
              <Link href="/tarif-demenagement">Voir les tarifs moyens</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">Transparence</span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                Ce qu'un devis de déménagement sérieux doit contenir
              </h2>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-600">
                <p>
                  Un devis utile doit vous permettre de comparer deux propositions sans zone floue. Il doit montrer
                  ce qui est compris, ce qui ne l'est pas, et les hypothèses retenues pour calculer le prix.
                </p>
                <p>
                  La réglementation française prévoit qu'avant le déménagement, le professionnel remette au consommateur
                  un devis et les conditions générales du contrat. Les informations attendues incluent notamment les
                  adresses, la distance, le volume, la formule choisie, les modalités de paiement et le montant HT/TTC.
                </p>
                <p>
                  Source officielle :{" "}
                  <a
                    href="https://entreprendre.service-public.gouv.fr/vosdroits/F31144"
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-primary underline underline-offset-4"
                  >
                    Service Public Entreprendre
                  </a>
                  .
                </p>
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-slate-100 bg-slate-50 p-6 shadow-sm md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                  <Scale className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">Checklist d'un devis exploitable</h3>
                  <p className="text-sm text-slate-500">À vérifier avant de comparer les prix.</p>
                </div>
              </div>
              <ul className="grid gap-3">
                {legalPoints.map((point) => (
                  <li key={point} className="flex gap-3 rounded-2xl bg-white p-4 text-sm font-medium leading-relaxed text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0f172a] py-20 text-white lg:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">Budget indicatif</span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-5xl">
                Des fourchettes pour cadrer, un devis pour décider
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-300">
                Les prix ci-dessous donnent un ordre d'idée pour un déménagement local avec des accès classiques.
                Ils ne remplacent pas une étude personnalisée : le volume réel, les accès et la formule peuvent faire
                évoluer le montant.
              </p>
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-relaxed text-slate-300">
                Pour une estimation plus fine, commencez par le{" "}
                <Link href="/calculateur-volume" className="font-bold text-primary underline underline-offset-4">
                  calculateur de volume
                </Link>
                , puis transmettez votre demande de devis.
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
              <div className="grid grid-cols-4 bg-white/10 px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-300">
                <span>Projet</span>
                <span>Volume</span>
                <span>Situation</span>
                <span className="text-right">Budget</span>
              </div>
              {sampleBudgets.map((row) => (
                <div key={row.project} className="grid grid-cols-1 gap-2 border-t border-white/10 px-5 py-5 text-sm md:grid-cols-4 md:gap-4">
                  <span className="font-extrabold text-white">{row.project}</span>
                  <span className="text-slate-300">{row.volume}</span>
                  <span className="text-slate-300">{row.situation}</span>
                  <span className="font-black text-primary md:text-right">{row.budget}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">Formules</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              Un devis doit correspondre à votre niveau d'implication
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Le bon devis n'est pas forcément le moins cher : c'est celui qui couvre exactement ce que vous voulez
              déléguer, sans doublon ni oubli.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {formulas.map((formula) => (
              <article key={formula.name} className="flex flex-col rounded-[2rem] border border-slate-100 bg-slate-50 p-7">
                <h3 className="text-2xl font-extrabold text-slate-900">{formula.name}</h3>
                <p className="mt-4 text-sm font-semibold leading-relaxed text-slate-700">{formula.target}</p>
                <p className="mt-5 flex-1 text-sm leading-relaxed text-slate-500">{formula.includes}</p>
                <Link href="/formules-de-demenagement" className="mt-7 inline-flex items-center text-sm font-black text-primary">
                  Comparer les formules <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">Maillage local</span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                Des devis adaptés à votre zone de départ et d'arrivée
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                Un déménagement à Paris, dans le Val-d'Oise, dans l'Oise ou vers la Normandie ne se prépare pas de
                la même façon. Les contraintes de stationnement, de circulation, d'accès et de distance sont intégrées
                dans chaque estimation.
              </p>
              <Button className="mt-8 h-14 rounded-full bg-primary px-7 font-bold text-white hover:bg-primary/90" asChild>
                <Link href="/zones-intervention">
                  Voir toutes les zones <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {localLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
                >
                  <span className="flex items-center gap-3 font-extrabold text-slate-800">
                    <MapPin className="h-5 w-5 text-primary" />
                    {item.label}
                  </span>
                  <ArrowRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div className="rounded-[2.5rem] bg-slate-900 p-8 text-white lg:p-10">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 text-primary">
                <Truck className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
                Comment préparer une demande de devis plus précise ?
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-300">
                Plus les informations sont claires au départ, plus le devis est stable. Une demande bien préparée évite
                les oublis, les appels inutiles et les ajustements de dernière minute.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button className="rounded-full bg-primary px-7 font-bold text-white hover:bg-primary/90" asChild>
                  <Link href="/demande-devis">Remplir le formulaire</Link>
                </Button>
                <Button variant="outline" className="rounded-full border-white/20 bg-white/10 px-7 font-bold text-white hover:bg-white/20 hover:text-white" asChild>
                  <Link href="/calculateur-volume">Estimer le m³</Link>
                </Button>
              </div>
            </div>

            <ul className="grid gap-4">
              {preparationItems.map((item) => (
                <li key={item} className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5 text-sm font-semibold leading-relaxed text-slate-700">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">Questions fréquentes</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              Tout comprendre avant de demander votre devis
            </h2>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-4">
            {faqItems.map((item) => (
              <details key={item.question} className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-extrabold text-slate-900">
                  {item.question}
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-50 text-primary transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative overflow-hidden rounded-[3rem] bg-[#0b0f19] px-6 py-14 text-center text-white shadow-2xl md:px-12 lg:py-20">
            <Image
              src="/images/services/demenagement-national.webp"
              alt="Camion de déménagement et préparation logistique"
              fill
              sizes="100vw"
              className="object-cover opacity-20 grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0b0f19] via-[#0b0f19]/90 to-primary/30" />
            <div className="relative z-10 mx-auto max-w-3xl">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-primary backdrop-blur">
                <Warehouse className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
                Prêt à obtenir un devis de déménagement vraiment exploitable ?
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-300">
                Envoyez votre demande maintenant. Nous analysons votre projet, vérifions les contraintes et vous
                répondons avec une proposition personnalisée.
              </p>
              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" className="h-14 rounded-full bg-primary px-9 text-base font-black text-white hover:bg-primary/90" asChild>
                  <Link href="/demande-devis">
                    Obtenir mon devis gratuit <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 rounded-full border-white/20 bg-white/10 px-9 text-base font-bold text-white hover:bg-white/20 hover:text-white" asChild>
                  <Link href="/tarif-demenagement">Comparer les tarifs</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
