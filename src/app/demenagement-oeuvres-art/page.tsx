
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ShieldCheck, Truck, Palette, Box, Layers, ScanSearch, Package, Hand } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionTitle } from "@/components/section-title";

const artTypes = [
    {
        icon: <Palette className="h-8 w-8 text-primary"/>,
        title: "Tableaux et Dessins",
        description: "Emballage avec papier de soie, protection des coins et caisses sur-mesure pour les toiles les plus précieuses."
    },
    {
        icon: <Hand className="h-8 w-8 text-primary"/>,
        title: "Sculptures et Statues",
        description: "Caisses de transport capitonnées, calage précis et techniques de levage adaptées au poids et à la fragilité."
    },
     {
        icon: <Layers className="h-8 w-8 text-primary"/>,
        title: "Mobilier Ancien & Design",
        description: "Protection des marqueteries, des dorures et des structures fragiles avec des housses et des couvertures adaptées."
    },
    {
        icon: <Box className="h-8 w-8 text-primary"/>,
        title: "Objets de Collection",
        description: "Emballage individuel méticuleux pour la verrerie, la céramique ou tout autre objet de collection."
    },
];

const methodologySteps = [
    {
        icon: <ScanSearch className="h-10 w-10 text-primary mb-4" />,
        title: "Évaluation & Devis sur-mesure",
        description: "Chaque œuvre est unique. Nous évaluons ses spécificités pour proposer une solution de transport et d'assurance parfaitement adaptée."
    },
    {
        icon: <Package className="h-10 w-10 text-primary mb-4" />,
        title: "Emballage d'Exception",
        description: "Nous fabriquons si nécessaire des caisses en bois sur-mesure et utilisons des matériaux neutres et anti-vibrations pour une protection optimale."
    },
    {
        icon: <Truck className="h-10 w-10 text-primary mb-4" />,
        title: "Transport Sécurisé",
        description: "Nos véhicules sont capitonnés, équipés de suspensions pneumatiques et de systèmes d'arrimage pour un transport en toute sécurité, à l'abri des chocs."
    }
];

const faqItems = [
    {
        question: "Comment emballez-vous un tableau de grande valeur ?",
        answer: "Nous utilisons une technique multi-couches : papier de soie neutre pour ne pas abîmer la surface, papier bulle pour l'absorption des chocs, protection des angles, et enfin une caisse en bois sur-mesure, souvent capitonnée, pour un transport en coque rigide."
    },
    {
        question: "Quelle assurance proposez-vous pour le transport d'art ?",
        answer: "En plus de notre assurance contractuelle de base, nous vous proposons systématiquement une assurance 'ad valorem' qui permet d'assurer vos œuvres à leur valeur réelle agréée. Nous vous accompagnons dans les démarches pour mettre en place cette garantie indispensable."
    },
    {
        question: "Gérez-vous les formalités douanières pour un transport à l'international ?",
        answer: "Oui, pour les déménagements internationaux, nous pouvons prendre en charge ou vous assister dans les démarches douanières spécifiques au transport d'œuvres d'art, en collaboration avec des transitaires spécialisés si nécessaire."
    },
    {
        question: "Faut-il des conditions de température particulières pour le transport ?",
        answer: "Pour les œuvres les plus sensibles, nous pouvons mettre à disposition des véhicules à température et hygrométrie contrôlées. Cette option est évaluée avec vous lors de l'établissement du cahier des charges de votre transport."
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

export default function OeuvresArtPage() {
    return (
        <div className="bg-background text-foreground">
             <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
            />
            {/* Hero Section */}
            <section className="relative h-80 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/art-transport/1920/500"
                    alt="Emballage soigné d'une sculpture pour un transport"
                    fill
                    className="object-cover"
                    data-ai-hint="packing sculpture art"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <SectionTitle as="h1" className="text-white">Déménagement d'<u>Œuvres d'Art</u></SectionTitle>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">L'art du transport, au service de vos biens les plus précieux. Un savoir-faire d'exception pour une sécurité absolue.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/services" className="hover:text-primary">Services</Link>
                <span className="mx-2">&gt;</span>
                <span>Œuvres d'Art</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <SectionTitle as="h2">Quand le déménagement <u>devient un art</u></SectionTitle>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Le transport d'œuvres d'art, de mobilier de designer ou d'antiquités n'est pas un déménagement classique. Il exige une expertise, une discrétion et un niveau de soin qui vont bien au-delà de la simple manutention. Chaque objet est unique, irremplaçable, et sa valeur, qu'elle soit financière ou sentimentale, est inestimable.
                        </p>
                         <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous avons développé une branche spécialisée dans le transport d'art. Nos équipes sont formées par des experts pour maîtriser les techniques d'emballage les plus avancées et les protocoles de manipulation les plus stricts.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/packing-painting/600/400"
                            alt="Main gantée emballant délicatement un tableau"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="gloved hands packing painting"
                        />
                    </div>
                </div>
            </section>

             {/* Objects Section */}
            <section id="objects" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <SectionTitle>Une expertise pour <u>tous types d'œuvres</u></SectionTitle>
                        <p className="mt-4 text-muted-foreground text-lg">Nous adaptons nos techniques et nos emballages à la nature spécifique de chaque objet.</p>
                    </div>
                    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {artTypes.map((item, i) => (
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
                        <SectionTitle>Un processus <u>d'orfèvre</u></SectionTitle>
                        <p className="mt-4 text-muted-foreground text-lg">Chaque transport d'œuvre d'art suit un protocole rigoureux pour garantir un risque zéro.</p>
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
            <section id="faq-art" className="py-16 bg-muted/50">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <SectionTitle>Vos <u>questions</u>, nos <u>réponses</u></SectionTitle>
                        <p className="mt-4 text-muted-foreground text-lg">Tout ce que vous devez savoir sur le transport d'objets de valeur.</p>
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
            <section id="contact-art" className="py-16">
                <div className="container text-center">
                    <SectionTitle>Confiez-nous vos <u>trésors</u></SectionTitle>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes du transport d'art pour une consultation confidentielle et un devis sur-mesure.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/demande-devis">Demander un devis spécialisé</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
