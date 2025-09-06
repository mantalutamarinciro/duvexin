
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckCircle, MapPin, ShieldCheck, Star, Users, ArrowRight, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";
import type { FormattedReview } from "@/app/api/reviews/route";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Claire B.", text: "Déménager dans le Marais relevait du défi. L'équipe a été incroyable, obtenant les autorisations et utilisant un monte-meubles avec une efficacité redoutable. Je recommande à 1000%.", rating: 5, createTime: "il y a 2 mois", avatarUrl: `https://i.pravatar.cc/48?u=ClaireB` },
    { id: "fallback-2", name: "Julien & Marc", text: "Service impeccable pour notre déménagement dans le 15ème. Ponctuels, professionnels et surtout, ils connaissent Paris sur le bout des doigts. Rien n'a été un problème pour eux.", rating: 5, createTime: "il y a 5 mois", avatarUrl: `https://i.pravatar.cc/48?u=JulienMarc` },
    { id: "fallback-3", name: "Entreprise Innovatech", text: "Transfert de nos bureaux près de La Défense sans aucune interruption de notre activité. Une planification parfaite et une exécution sans faille. Bravo à toute l'équipe.", rating: 5, createTime: "il y a 10 mois", avatarUrl: `https://i.pravatar.cc/48?u=Innovatech` },
];

const parisArrondissements = ["Le Marais (3e, 4e)", "Quartier Latin (5e)", "Saint-Germain (6e)", "Opéra (9e)", "Montmartre (18e)", "Batignolles (17e)", "Passy (16e)", "Vaugirard (15e)", "Buttes-Chaumont (19e)", "Bercy (12e)", "La Villette (19e)", "Et tous les autres arrondissements..."];

const whyChooseUsItems = [
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Maîtrise des contraintes parisiennes",
        description: "Rues étroites, cours intérieures, étages élevés, sens uniques... Nous connaissons les défis de Paris et nous avons les solutions (monte-meubles, véhicules adaptés)."
    },
    {
        icon: <CheckCircle className="h-8 w-8 text-primary"/>,
        title: "Gestion des autorisations",
        description: "Nous prenons en charge l'intégralité des demandes d'autorisation de stationnement auprès des mairies d'arrondissement, une démarche souvent complexe à Paris."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Protection & Sécurité",
        description: "Dans l'agitation parisienne, la sécurité de vos biens est primordiale. Nous utilisons un matériel de protection de pointe et des techniques éprouvées."
    },
    {
        icon: <Users className="h-8 w-8 text-primary"/>,
        title: "Des équipes dédiées",
        description: "Nos déménageurs sont des professionnels salariés, expérimentés et formés pour opérer efficacement et discrètement dans l'environnement parisien."
    }
];

const faqItems = [
    {
        question: "Comment gérez-vous le stationnement du camion à Paris ?",
        answer: "C'est notre spécialité ! Nous effectuons systématiquement une demande d'autorisation de stationnement auprès de la mairie de l'arrondissement concerné, pour le départ comme pour l'arrivée. Cela nous permet de réserver un emplacement au plus près de votre domicile et de garantir la légalité et la sécurité de l'opération."
    },
    {
        question: "L'utilisation d'un monte-meubles est-elle souvent nécessaire à Paris ?",
        answer: "Très souvent. Pour les étages élevés sans ascenseur, les cages d'escalier étroites ou pour protéger les parties communes, le monte-meubles est la solution idéale. Il assure la sécurité de vos biens (canapé, piano, etc.) et un gain de temps considérable. Nous évaluons ce besoin lors de notre visite technique gratuite."
    },
    {
        question: "Quels sont les meilleurs jours pour déménager à Paris ?",
        answer: "Pour éviter les embouteillages et les difficultés de circulation, nous recommandons si possible de déménager en milieu de semaine (mardi, mercredi, jeudi). Nous évitons les heures de pointe pour les trajets. Nous pouvons bien sûr nous adapter à vos contraintes."
    },
    {
        question: "Intervenez-vous dans tous les arrondissements de Paris ?",
        answer: "Oui, sans exception. Du 1er au 20ème, que ce soit en hyper-centre ou dans les quartiers périphériques, nous avons l'expérience et l'équipement pour intervenir partout dans Paris."
    }
];


export default function ParisPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/paris/1920/500"
                    alt="Vue sur les toits de Paris avec la Tour Eiffel"
                    fill
                    className="object-cover"
                    data-ai-hint="paris rooftops eiffel tower"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">L'expert de votre déménagement parisien</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Paris (75)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">Confiez votre déménagement à Paris à des professionnels qui maîtrisent la capitale. Sérénité et efficacité garanties.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/zones-intervention" className="hover:text-primary">Zones d'intervention</Link>
                <span className="mx-2">&gt;</span>
                <span>Paris (75)</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Déménager à Paris : un défi qui demande un savoir-faire unique</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager dans la Ville Lumière est un projet exaltant, mais aussi une opération logistique complexe. Circulation dense, rues étroites, réglementations de stationnement strictes, étages sans ascenseur... les défis sont nombreux. Chez Déménagement du Vexin, nous avons fait de ces contraintes notre terrain d'expertise.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Forts de notre expérience, nous planifions chaque déménagement parisien avec une rigueur militaire. De l'obtention des autorisations nécessaires à l'utilisation de matériel adapté comme les monte-meubles, nous anticipons chaque détail pour vous assurer une transition fluide, rapide et sans le moindre stress.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/paris-street/600/400"
                            alt="Camion de déménagement dans une rue typique de Paris"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving truck paris street"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-paris" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Votre déménageur de confiance à Paris</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Notre approche est conçue pour répondre spécifiquement aux exigences d'un déménagement dans la capitale.</p>
                    </div>
                    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {whyChooseUsItems.map((item, i) => (
                             <div key={i} className="text-center">
                                {item.icon}
                                <h3 className="text-xl font-semibold mt-4">{item.title}</h3>
                                <p className="mt-2 text-muted-foreground">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Intervention Arrondissements Section */}
             <section id="arrondissements-paris" className="py-16">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Nous intervenons dans tous les arrondissements de Paris</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Que vous emménagiez sur la Rive Gauche ou la Rive Droite, notre connaissance de Paris est votre meilleur atout.</p>
                    </div>
                    <div className="mt-12 flex flex-wrap justify-center gap-3">
                        {parisArrondissements.map((arr) => (
                            <div key={arr} className="bg-background border rounded-full px-4 py-2 text-sm font-medium shadow-sm">
                                {arr}
                            </div>
                        ))}
                    </div>
                </div>
             </section>

             {/* Services Section */}
            <section className="py-16 bg-muted/50">
                 <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1">
                        <Image
                            src="https://picsum.photos/seed/monte-meuble/600/400"
                            alt="Utilisation d'un monte-meubles sur une façade d'immeuble parisien"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="furniture lift paris building"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des prestations pensées pour Paris</h2>
                         <p className="mt-4 text-muted-foreground text-lg">Nos services sont spécialement adaptés pour surmonter les obstacles d'un déménagement parisien.</p>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Location de monte-meubles</h4>
                                    <p className="text-muted-foreground">La solution indispensable pour les étages élevés et les accès difficiles, assurant rapidité et sécurité.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'appartement</h4>
                                    <p className="text-muted-foreground">Du studio à l'appartement haussmannien, nous adaptons notre logistique à chaque type de bien.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Formules sur-mesure</h4>
                                    <p className="text-muted-foreground">Choisissez le niveau de service qui vous convient, de la simple location de camion avec chauffeur à la prestation tout inclus.</p>
                                </div>
                            </li>
                        </ul>
                         <Button asChild className="mt-8" variant="outline">
                            <Link href="/services">Explorer tous nos services</Link>
                         </Button>
                    </div>
                </div>
            </section>
            
            <TestimonialsSection reviews={fallbackTestimonials} />
            
            {/* FAQ Section */}
            <section id="faq-paris" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes sur le déménagement à Paris</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Les réponses claires à vos questions pour déménager dans la capitale.</p>
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
            <section id="contact-paris" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Planifiez votre déménagement à Paris dès aujourd'hui !</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Ne laissez pas la complexité d'un déménagement parisien vous stresser. Contactez nos experts pour une consultation gratuite et recevez un devis détaillé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Mon devis gratuit pour Paris</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
