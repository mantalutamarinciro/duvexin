
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ShieldCheck, Truck, Piano, Gem, Square, ScanSearch, Cog, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionTitle } from "@/components/section-title";

const heavyObjects = [
    {
        icon: <Piano className="h-8 w-8 text-primary"/>,
        title: "Pianos (droits et à queue)",
        description: "Transport sécurisé de votre instrument avec un équipement adapté (sangles, luges, housses)."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Coffres-forts",
        description: "Manutention et transport de coffres-forts de toutes tailles avec des techniques de levage sécurisées."
    },
     {
        icon: <Gem className="h-8 w-8 text-primary"/>,
        title: "Billards & Baby-foot",
        description: "Démontage, transport et remontage de vos équipements de loisir lourds et encombrants."
    },
    {
        icon: <Square className="h-8 w-8 text-primary"/>,
        title: "Œuvres d'art & Sculptures",
        description: "Emballage sur-mesure et manutention délicate pour vos objets de valeur les plus précieux."
    },
];

const methodologySteps = [
    {
        icon: <ScanSearch className="h-10 w-10 text-primary mb-4" />,
        title: "Évaluation et Planification",
        description: "Chaque projet commence par une analyse précise des contraintes (poids, dimensions, accès) pour établir un plan d'action sur-mesure et sans faille."
    },
    {
        icon: <Cog className="h-10 w-10 text-primary mb-4" />,
        title: "Matériel Spécifique",
        description: "Nous utilisons des équipements de pointe : monte-meubles, grues, chariots robustes, sangles renforcées et protections adaptées pour chaque type d'objet."
    },
    {
        icon: <Users className="h-10 w-10 text-primary mb-4" />,
        title: "Équipes Formées et Expérimentées",
        description: "Nos déménageurs sont spécialement formés aux techniques de manutention lourde, garantissant une intervention en toute sécurité pour vos biens et nos équipes."
    }
];

const faqItems = [
    {
        question: "Comment déplacez-vous un piano dans un escalier étroit ?",
        answer: "C'est une opération délicate qui nécessite une expertise. Nous utilisons des techniques de portage spécifiques avec des sangles et des 'sledge' de déménagement. Si l'escalier est trop étroit, nous préconisons le passage par fenêtre à l'aide d'un monte-meubles, ce qui est souvent plus sûr pour l'instrument et pour l'immeuble."
    },
    {
        question: "Mon coffre-fort est scellé, pouvez-vous le déménager ?",
        answer: "Oui, nous pouvons gérer le descellement et le re-scellement de coffres-forts. Cette prestation est étudiée lors de la visite technique. Nos équipes disposent de l'outillage nécessaire pour réaliser cette opération en toute sécurité."
    },
    {
        question: "Le transport d'objets lourds est-il plus cher qu'un déménagement classique ?",
        answer: "Le coût dépend de la complexité de l'opération. Le poids, la valeur de l'objet, les accès et le matériel nécessaire (monte-meubles, grue...) sont pris en compte. Nous vous fournissons toujours un devis détaillé et transparent avant toute intervention."
    },
    {
        question: "Mon objet est extrêmement fragile et de grande valeur. Quelles sont les garanties ?",
        answer: "Pour les objets d'exception, nous proposons des emballages sur-mesure (comme des caisses en bois capitonnées) et une assurance 'ad valorem' qui couvre la valeur réelle de l'objet. La sécurité de votre patrimoine est notre priorité absolue."
    }
];

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer
    }
  }))
};

export default function ObjetsLourdsPage() {
    return (
        <div className="bg-background text-foreground">
             <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
            />
            {/* Hero Section */}
            <section className="relative h-80 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/heavy-move-piano/1920/500"
                    alt="Déménagement d'un piano à queue avec une équipe de professionnels"
                    fill
                    className="object-cover"
                    data-ai-hint="moving grand piano"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <SectionTitle as="h1" className="text-white">Déménagement d'<u>Objets Lourds</u></SectionTitle>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">Pianos, coffres-forts, œuvres d'art... La force tranquille de nos experts au service de vos biens les plus précieux.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/services" className="hover:text-primary">Services</Link>
                <span className="mx-2">&gt;</span>
                <span>Objets lourds</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <SectionTitle as="h2">La manutention <u>délicate</u>, notre savoir-faire.</SectionTitle>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Certains objets, de par leur poids, leur volume ou leur fragilité, ne peuvent être traités comme le reste de votre mobilier. Un piano, un coffre-fort ou une sculpture de valeur demandent une expertise, un matériel et des techniques spécifiques pour être déplacés sans risque.
                        </p>
                         <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous avons développé une compétence reconnue dans la manutention et le transport d'objets lourds et précieux. Nos équipes spécialisées sont formées pour planifier et exécuter ces missions complexes en toute sécurité.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/safe-moving/600/400"
                            alt="Équipe déplaçant un coffre-fort avec du matériel adapté"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving safe equipment"
                        />
                    </div>
                </div>
            </section>

             {/* Objects Section */}
            <section id="objects" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <SectionTitle>Une expertise pour chaque <u>type d'objet</u></SectionTitle>
                        <p className="mt-4 text-muted-foreground text-lg">Nous maîtrisons les techniques adaptées à une grande variété d'objets lourds et fragiles.</p>
                    </div>
                    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {heavyObjects.map((item, i) => (
                            <Card key={i} className="text-center p-6">
                                {item.icon}
                                <h3 className="text-xl font-semibold mt-4">{item.title}</h3>
                                <p className="mt-2 text-muted-foreground text-sm">{item.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Methodology Section */}
             <section className="py-16">
                 <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <SectionTitle>Notre méthodologie : <u>la sécurité</u> avant tout</SectionTitle>
                        <p className="mt-4 text-muted-foreground text-lg">Chaque intervention pour un objet lourd suit un protocole rigoureux pour garantir un risque zéro.</p>
                    </div>
                    <div className="mt-16 grid md:grid-cols-3 gap-8">
                        {methodologySteps.map((step, index) => (
                           <div key={index} className="text-center">
                               {step.icon}
                               <h3 className="text-lg font-bold">{step.title}</h3>
                               <p className="text-muted-foreground mt-2 text-sm">{step.description}</p>
                           </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq-heavy" className="py-16 bg-muted/50">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <SectionTitle>Vos <u>questions</u>, nos <u>réponses</u></SectionTitle>
                        <p className="mt-4 text-muted-foreground text-lg">Tout ce que vous devez savoir sur le déménagement d'objets lourds.</p>
                    </div>
                    <Accordion type="single" collapsible className="w-full mt-12">
                        {faqItems.map((item, i) => (
                            <AccordionItem value={`item-${i}`} key={i}>
                                <AccordionTrigger className="text-lg text-left hover:no-underline">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-base text-muted-foreground">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

             {/* CTA Section */}
            <section id="contact-heavy" className="py-16">
                <div className="container text-center">
                    <SectionTitle>Vous avez un objet <u>hors-norme</u> à déplacer ?</SectionTitle>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Ne prenez aucun risque. Contactez nos spécialistes pour une évaluation précise et un devis gratuit pour le transport de votre bien le plus précieux.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/demande-devis">Demander un devis spécialisé</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
