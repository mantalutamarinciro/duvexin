import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionTitle } from "@/components/section-title";

// Icons
import { 
  CheckCircle2, 
  Building2, 
  Globe2, 
  Store, 
  Factory, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Server, 
  FileText,
  Truck,
  LayoutDashboard
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement d'Entreprise & Transfert de Bureaux | Marne Transdem",
  description: "Expert en transfert d'entreprise : bureaux, informatique, archives et industries. Solutions sur-mesure avec continuité d'activité garantie. Devis pro sous 24h.",
};

const enterpriseServices = [
  { title: "Ingénierie de transfert", icon: LayoutDashboard, description: "Cahier des charges précis, rétroplanning et pilotage complet de votre projet." },
  { title: "Parc Informatique", icon: Server, description: "Déconnexion, emballage antistatique et reconnexion de vos serveurs et postes." },
  { title: "Mobilier & Montage", icon: Building2, description: "Démontage et remontage de vos postes de travail et espaces collaboratifs." },
  { title: "Gestion d'Archives", icon: FileText, description: "Transfert sécurisé et confidentiel de vos documents avec inventaire rigoureux." },
  { title: "Logistique Adaptée", icon: Truck, description: "Véhicules capitonnés et monte-meubles pour une manutention sans risque." },
  { title: "Aménagement Final", icon: CheckCircle2, description: "Installation selon vos plans d'implantation pour une reprise immédiate." },
];

const enterpriseTypes = [
  { icon: Building2, title: "Tertiaire & PME", description: "Déménagement de bureaux agile pour minimiser l'impact sur vos collaborateurs." },
  { icon: Globe2, title: "Multi-sites", description: "Coordination de transferts complexes entre plusieurs pôles géographiques." },
  { icon: Store, title: "Retail & Commerces", description: "Gestion des stocks, présentoirs et mobilier commercial avec rapidité." },
  { icon: Factory, title: "Industrie & Ateliers", description: "Transfert de machines-outils et équipements lourds avec levage spécialisé." },
];

const faqItems = [
  {
    question: "Comment garantissez-vous la continuité de notre activité ?",
    answer: "Nous proposons des interventions en horaires décalés : soirées, week-ends ou jours fériés. L'objectif est que vos collaborateurs quittent leurs bureaux le vendredi soir et retrouvent leur poste opérationnel le lundi matin."
  },
  {
    question: "Gérez-vous le matériel informatique sensible ?",
    answer: "Oui, c'est un point critique. Nous utilisons des bacs de protection scellés, des protections antistatiques et des chariots informatiques spécifiques. Nous pouvons travailler de concert avec votre DSI pour le rackage de vos serveurs."
  },
  {
    question: "Quelle assurance couvre le matériel professionnel ?",
    answer: "En plus de notre RC Professionnelle, nous proposons systématiquement une assurance 'Ad Valorem'. Elle garantit votre matériel à sa valeur d'usage ou à neuf selon vos besoins, couvrant l'intégralité des risques liés au transport."
  },
  {
    question: "Pouvez-vous recycler le mobilier obsolète ?",
    answer: "Absolument. Dans une démarche RSE, nous proposons l'évacuation de votre ancien mobilier vers des centres de tri agréés ou des associations partenaires pour le réemploi."
  }
];

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": item.answer }
  }))
};

export default function DemenagementEntreprisePage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      {/* --- HERO SECTION --- */}
      <section className="relative h-[450px] flex items-center justify-center text-white overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/corporate-move/1920/1080"
          alt="Transfert de bureaux professionnel"
          fill
          priority
          className="object-cover opacity-40 mix-blend-luminosity grayscale-[40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#00ad9f]/20 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-[#00ad9f] backdrop-blur-md border border-[#00ad9f]/30">
              <Clock className="h-4 w-4" />
              Continuité d'activité garantie
            </div>
            <SectionTitle as="h1" className="text-white text-4xl md:text-6xl font-extrabold leading-tight">
              Transfert d'<u>Entreprise</u> & Bureaux
            </SectionTitle>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl font-light">
              Parce que votre temps est précieux, nous orchestrons votre déménagement pro avec une précision chirurgicale. Zéro interruption, efficacité totale.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="rounded-full h-14 px-8 text-base bg-[#00ad9f] hover:bg-[#009286] text-white shadow-xl transition-all hover:scale-105" asChild>
                <Link href="/demande-devis">Estimation Professionnelle <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* --- BREADCRUMB --- */}
      <div className="bg-white border-b">
        <div className="container py-4 text-xs font-medium text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <Link href="/" className="hover:text-[#00ad9f] transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-[#00ad9f] transition-colors">Services</Link>
          <span>/</span>
          <span className="text-slate-900">Transfert Entreprise</span>
        </div>
      </div>

      {/* --- INTRO SECTION --- */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-block p-3 rounded-2xl bg-teal-50">
                <ShieldCheck className="h-8 w-8 text-[#00ad9f]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Le transfert de vos locaux, <br />
                <span className="text-[#00ad9f]">sans aucune perte de productivité.</span>
              </h2>
              <div className="space-y-4 text-slate-600 text-lg font-light leading-relaxed">
                <p>
                  Un déménagement d'entreprise n'est pas qu'une affaire de cartons. C'est un défi logistique et humain qui impacte directement vos résultats. 
                </p>
                <p>
                  Chez **Marne Transdem**, nous traitons chaque transfert comme un projet stratégique. Nos chefs de projets dédiés collaborent avec vos services (Moyens Généraux, DSI, RH) pour garantir que votre infrastructure informatique et vos espaces de travail soient opérationnels dès la première heure à votre nouvelle adresse.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div>
                  <p className="text-3xl font-bold text-slate-900">24h</p>
                  <p className="text-sm text-slate-500 uppercase tracking-tighter">Réponse devis pro</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-slate-900">100%</p>
                  <p className="text-sm text-slate-500 uppercase tracking-tighter">Salariés formés</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-2 transform -z-10" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl">
                <Image
                  src="https://picsum.photos/seed/office-relocation/800/600"
                  alt="Planification de transfert de bureaux"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Une expertise à <span className="text-[#00ad9f]">360 degrés</span></h2>
            <p className="text-slate-400 text-lg font-light">Nous prenons en charge l'intégralité de la chaîne logistique de votre transfert.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {enterpriseServices.map((service, i) => (
              <div key={i} className="group p-8 rounded-[2rem] bg-slate-800/50 border border-slate-700 hover:border-[#00ad9f]/50 hover:bg-slate-800 transition-all">
                <div className="h-12 w-12 rounded-xl bg-[#00ad9f]/10 flex items-center justify-center mb-6 group-hover:bg-[#00ad9f] transition-colors duration-300">
                  <service.icon className="h-6 w-6 text-[#00ad9f] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-light">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTOR ADAPTABILITY --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Adapté à votre <span className="text-[#00ad9f]">secteur d'activité</span></h2>
              <p className="mt-4 text-slate-500 font-light">Chaque métier possède ses propres contraintes. Nous avons l'expérience pour y répondre.</p>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {enterpriseTypes.map((type, i) => (
              <Card key={i} className="border-none shadow-lg rounded-[2.5rem] p-8 bg-slate-50 hover:bg-white hover:shadow-xl transition-all group">
                <div className="h-16 w-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <type.icon className="h-8 w-8 text-[#00ad9f]" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{type.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{type.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight italic">Expertise & FAQ</h2>
            <p className="text-slate-500 font-light">Tout ce que vous devez savoir pour un transfert réussi.</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-white border-none rounded-3xl px-6 shadow-sm overflow-hidden">
                <AccordionTrigger className="text-left font-bold text-slate-900 hover:no-underline hover:text-[#00ad9f] py-6 transition-colors">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-6 font-light">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative rounded-[3.5rem] bg-slate-900 p-12 md:p-24 text-center overflow-hidden isolate shadow-2xl">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-[#00ad9f]/20 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] -z-10" />
            
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-8">
              Planifiez votre transfert <br />
              <span className="text-[#00ad9f]">dès aujourd'hui.</span>
            </h2>
            <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Nos experts vous accompagnent pour établir un devis détaillé basé sur votre cahier des charges spécifique. Réponse assurée sous 24 heures ouvrées.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button size="lg" className="rounded-full h-14 px-10 text-base font-bold bg-[#00ad9f] text-white hover:bg-[#009286] transition-all shadow-[0_0_40px_-10px_rgba(0,173,159,0.5)]" asChild>
                <Link href="/demande-devis">Parler à un expert transfert</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}