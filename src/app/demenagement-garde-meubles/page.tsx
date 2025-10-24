
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ShieldCheck, Box, CalendarDays, Lock, Truck, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionTitle } from "@/components/section-title";

const features = [
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sécurité Maximale",
        description: "Nos entrepôts sont sous surveillance 24/7, avec alarmes et détection incendie pour une protection totale."
    },
    {
        icon: <CalendarDays className="h-8 w-8 text-primary"/>,
        title: "Flexibilité Totale",
        description: "Stockez vos affaires pour une semaine, plusieurs mois ou des années. Nous nous adaptons à la durée de votre besoin."
    },
    {
        icon: <Box className="h-8 w-8 text-primary"/>,
        title: "Conteneurs Individuels",
        description: "Vos biens sont stockés dans des conteneurs individuels en bois, scellés, ventilés et à l'abri de la poussière et de l'humidité."
    },
    {
        icon: <Lock className="h-8 w-8 text-primary"/>,
        title: "Accès Sécurisé",
        description: "L'accès à vos biens se fait sur rendez-vous, accompagné par notre personnel, garantissant une sécurité et une confidentialité maximales."
    }
];

const processSteps = [
    {
        icon: <Search className="h-8 w-8"/>,
        title: "Évaluation de vos besoins",
        description: "Nous estimons ensemble le volume à stocker pour vous proposer la solution la plus adaptée."
    },
    {
        icon: <Package className="h-8 w-8"/>,
        title: "Emballage Professionnel",
        description: "Nos équipes protègent et emballent vos meubles et objets pour garantir leur conservation."
    },
    {
        icon: <Truck className="h-8 w-8"/>,
        title: "Transport Sécurisé",
        description: "Nous transportons vos biens de votre domicile jusqu'à notre entrepôt de stockage."
    },
    {
        icon: <Warehouse className="h-8 w-8"/>,
        title: "Mise en conteneur",
        description: "Vos affaires sont inventoriées et rangées avec soin dans votre conteneur individuel et scellé."
    }
];

const faqItems = [
    {
        question: "Qu'est-ce qu'un garde-meubles exactement ?",
        answer: "C'est une solution de stockage professionnelle où vos biens sont placés dans des conteneurs en bois individuels et scellés, entreposés dans un local sécurisé. Contrairement au self-stockage, l'accès se fait généralement sur rendez-vous, ce qui garantit un niveau de sécurité plus élevé."
    },
    {
        question: "Puis-je accéder à mes affaires pendant la période de stockage ?",
        answer: "Oui, l'accès à vos biens est possible. Il vous suffit de nous prévenir 48h à l'avance pour que nous puissions mettre votre conteneur à votre disposition dans notre zone de transit."
    },
    {
        question: "Quelle est la durée minimale et maximale de stockage ?",
        answer: "Nous offrons une grande flexibilité. Vous pouvez stocker vos affaires pour une durée aussi courte qu'une semaine ou aussi longue que plusieurs années. La facturation est mensuelle et vous pouvez arrêter le service quand vous le souhaitez, en respectant un court préavis."
    },
    {
        question: "Comment sont protégés mes biens contre l'humidité et les nuisibles ?",
        answer: "Nos entrepôts sont modernes, secs et ventilés. Les conteneurs en bois permettent une bonne circulation de l'air, évitant la condensation. De plus, nos locaux sont traités régulièrement contre tous types de nuisibles pour garantir une conservation parfaite de vos affaires."
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

export default function GardeMeublesPage() {
    return (
        <div className="bg-background text-foreground">
             <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
            />
            {/* Hero Section */}
            <section className="relative h-80 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/storage-hero/1920/500"
                    alt="Entrepôt de garde-meubles sécurisé et bien rangé"
                    fill
                    className="object-cover"
                    data-ai-hint="secure storage warehouse"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <SectionTitle as="h1" className="text-white">Garde-Meubles et <u>Stockage</u></SectionTitle>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution flexible et sécurisée pour conserver vos biens en toute sérénité.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/services" className="hover:text-primary">Services</Link>
                <span className="mx-2">&gt;</span>
                <span>Garde-Meubles</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <SectionTitle as="h2">Besoin d'espace ? <u>Nous l'avons.</u></SectionTitle>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Que ce soit pour une transition entre deux logements, des travaux de rénovation, un départ à l'étranger ou simplement pour libérer de l'espace, notre service de garde-meubles vous offre une solution de stockage professionnelle, souple et 100% sécurisée.
                        </p>
                         <p className="mt-4 text-muted-foreground">
                           Confiez-nous vos biens en toute confiance. Nous les conservons dans des conditions optimales, dans nos entrepôts dédiés, jusqu'à ce que vous soyez prêt à les récupérer.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/storage-boxes/600/400"
                            alt="Conteneurs de stockage en bois individuels"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="wooden storage containers"
                        />
                    </div>
                </div>
            </section>

             {/* Features Section */}
            <section id="features" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <SectionTitle>La tranquillité d'esprit, <u>notre priorité</u></SectionTitle>
                        <p className="mt-4 text-muted-foreground text-lg">Découvrez les avantages de notre service de garde-meubles professionnel.</p>
                    </div>
                    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, i) => (
                             <div key={i} className="text-center">
                                {feature.icon}
                                <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
                                <p className="mt-2 text-muted-foreground">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Process Section */}
             <section className="py-16">
                 <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <SectionTitle>Un processus <u>simple et transparent</u></SectionTitle>
                        <p className="mt-4 text-muted-foreground text-lg">Nous prenons en charge la totalité de la logistique, de votre porte à notre entrepôt.</p>
                    </div>
                    <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {processSteps.map((step, index) => (
                           <Card key={index} className="text-center p-6 bg-card">
                               <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                                   {step.icon}
                               </div>
                               <h3 className="text-lg font-bold">{step.title}</h3>
                               <p className="text-muted-foreground mt-2 text-sm">{step.description}</p>
                           </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq-storage" className="py-16 bg-muted/50">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <SectionTitle>Questions <u>fréquentes</u></SectionTitle>
                        <p className="mt-4 text-muted-foreground text-lg">Vos interrogations, nos réponses claires sur le service de garde-meubles.</p>
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
            <section id="contact-storage" className="py-16">
                <div className="container text-center">
                    <SectionTitle>Besoin d'une solution de <u>stockage</u> ?</SectionTitle>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez-nous pour évaluer votre besoin en volume et obtenez un devis gratuit pour notre service de garde-meubles.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/demande-devis">Demander un devis de stockage</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
