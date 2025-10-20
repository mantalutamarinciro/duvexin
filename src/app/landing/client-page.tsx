
"use client";

import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Package, ShieldCheck, Star, Map, Globe, Building, CheckCircle, Rocket, Users, Handshake, BriefcaseBusiness, Award, Smile, Clock, HelpCircle, MapPin, Calculator, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "./contact-form";
import type { FormattedReview } from "@/app/api/reviews/route";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TestimonialsSection } from "@/components/testimonials-section";


const services = [
    {
        icon: <Map className="h-8 w-8 text-primary" />,
        title: "Déménagement Local & Régional",
        description: "Experts du Val-d’Oise, des Yvelines et de toute l'Île-de-France pour un service de proximité rapide et fiable.",
        link: "/demenagement-val-d-oise-95",
        imageUrl: "https://picsum.photos/seed/local-move/600/400",
        aiHint: "local moving city"
    },
     {
        icon: <Globe className="h-8 w-8 text-primary" />,
        title: "Déménagement National",
        description: "Nous vous accompagnons partout en France grâce à nos lignes régulières vers les grandes métropoles.",
        link: "/demenagement-national",
        imageUrl: "https://picsum.photos/seed/national-move/600/400",
        aiHint: "national moving highway"
    },
    {
        icon: <BriefcaseBusiness className="h-8 w-8 text-primary" />,
        title: "Déménagement d'Entreprise",
        description: "Transfert de bureaux, d'archives ou de matériel sensible, planifié pour minimiser l'impact sur votre activité.",
        link: "/demenagement-entreprise-bureau",
        imageUrl: "https://picsum.photos/seed/business-move/600/400",
        aiHint: "office moving empty"
    },
];

const engagementItems = [
    {
        icon: <Users className="h-10 w-10 text-primary"/>,
        title: "Équipe 100% Salariée",
        description: "Aucun intermédiaire. Nos propres équipes pour une qualité et une fiabilité maîtrisées de bout en bout."
    },
    {
        icon: <Package className="h-10 w-10 text-primary"/>,
        title: "Matériel Professionnel",
        description: "Nous utilisons des couvertures, housses et cartons adaptés pour une protection optimale de vos biens."
    },
    {
        icon: <ShieldCheck className="h-10 w-10 text-primary"/>,
        title: "Assurance & Garantie",
        description: "Vos biens sont précieux. Ils sont couverts par notre assurance tout au long du déménagement."
    },
    {
        icon: <Handshake className="h-10 w-10 text-primary"/>,
        title: "Devis Clair et Transparent",
        description: "Recevez un devis détaillé, gratuit et sans surprise pour une maîtrise totale de votre budget."
    }
]

const faqItems = [
  {
    question: "Quand dois-je réserver mon déménagement ?",
    answer: "Nous recommandons de nous contacter idéalement 1 à 2 mois à l'avance, surtout si vous déménagez pendant la haute saison (de mai à septembre). Cela nous permet de garantir notre disponibilité et de planifier toutes les étapes sereinement. Pour un petit volume ou en basse saison, 2 à 3 semaines peuvent suffire."
  },
  {
    question: "Fournissez-vous le matériel d'emballage ?",
    answer: "Oui, nous pouvons vous fournir tout le matériel nécessaire : cartons de différentes tailles, papier bulle, adhésif, etc. Selon la formule choisie, nos équipes peuvent même se charger de l'emballage complet de vos biens."
  },
  {
    question: "Comment est calculé le volume de mon déménagement ?",
    answer: "Le volume est une estimation de l'espace que vos biens occuperont dans le camion, calculé en mètres cubes (m³). Vous pouvez utiliser notre calculateur de volume en ligne pour une première estimation, ou un de nos conseillers peut effectuer une visite technique gratuite pour une évaluation précise."
  },
  {
    question: "Mes biens sont-ils assurés pendant le transport ?",
    answer: "Absolument. Tous les déménagements que nous réalisons sont couverts par une assurance responsabilité civile et une assurance marchandise. Nous vous expliquerons les détails et les options de couverture lors de l'établissement du devis."
  }
];

export function LandingPageClient({ reviews }: { reviews: FormattedReview[] }) {
    return (
        <>
            {/* Hero Section */}
            <section className="relative bg-background">
                <div className="container grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-104px)] py-20">
                     <div className="text-center lg:text-left">
                        <p className="font-semibold text-primary">Déménagement Du Vexin</p>
                        <h1 className="text-4xl md:text-6xl font-headline font-bold mt-2 leading-tight">Le déménagement, la sérénité en plus.</h1>
                        <p className="mt-4 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 text-muted-foreground">Experts du déménagement pour particuliers et entreprises. Confiez-nous votre projet pour une expérience fluide, sécurisée et sans stress, partout en France.</p>
                        <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
                            <Button size="lg" asChild>
                                <Link href="/demande-devis">Demander un devis en 2 minutes</Link>
                            </Button>
                             <Button size="lg" variant="ghost" asChild>
                                <Link href="/calculateur-volume">
                                    <Calculator className="mr-2"/>
                                    Calculer mon volume
                                </Link>
                            </Button>
                        </div>
                    </div>
                     <div className="relative h-80 lg:h-[500px] w-full">
                         <Image 
                            src="https://picsum.photos/seed/movers/1920/1080"
                            alt="Équipe de déménageurs professionnels souriants chargeant un camion"
                            fill
                            className="object-cover rounded-2xl shadow-2xl"
                            data-ai-hint="professional movers truck"
                            priority
                        />
                    </div>
                </div>
            </section>
            
            <section id="services" className="py-16 md:py-24 bg-card">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Un service complet pour un déménagement réussi</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Que vous soyez un particulier ou une entreprise, que vous déménagiez à côté ou à l'autre bout de la France, nous avons la solution adaptée à vos besoins.</p>
                    </div>
                    <div className="mt-12 grid sm:grid-cols-1 lg:grid-cols-3 gap-8">
                        {services.map((service, i) => (
                             <Link key={i} href={service.link} className="block group">
                                 <Card className="overflow-hidden relative h-80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                     <Image 
                                        src={service.imageUrl}
                                        alt={service.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        data-ai-hint={service.aiHint}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"/>
                                    <div className="absolute bottom-0 left-0 p-6 text-white">
                                        <h3 className="text-xl font-bold">{service.title}</h3>
                                        <p className="mt-2 text-white/80 text-sm">{service.description}</p>
                                         <div className="mt-4 flex items-center text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            En savoir plus <ArrowRight className="ml-2 h-4 w-4"/>
                                        </div>
                                    </div>
                                 </Card>
                             </Link>
                        ))}
                    </div>
                </div>
            </section>

             <section id="about" className="py-16 md:py-24">
                <div className="container grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <Image
                            src="https://picsum.photos/seed/team-portrait/600/500"
                            alt="Notre équipe de déménageurs professionnels"
                            width={600}
                            height={500}
                            className="rounded-xl shadow-lg"
                            data-ai-hint="professional moving team"
                        />
                    </div>
                     <div>
                         <p className="text-sm font-semibold text-primary uppercase">Notre histoire</p>
                         <h2 className="text-3xl font-bold mt-2">Votre partenaire de confiance depuis des années</h2>
                         <p className="mt-4 text-muted-foreground text-lg">
                            Basée dans le Val-d’Oise (95), notre entreprise familiale de déménagement intervient également dans l’Oise (60), l’Eure (27) et dans toute l'Île-de-France. Que vous soyez un particulier ou une entreprise, nous vous accompagnons dans tous vos projets de déménagement, en local, national ou même international.
                         </p>
                          <p className="mt-4 text-muted-foreground">Notre force ? Une équipe 100% salariée, expérimentée et passionnée, qui s'engage à faire de votre déménagement une expérience positive et sans stress.</p>
                         <Button asChild className="mt-6" variant="outline">
                            <Link href="/a-propos-de-demenagement-du-vexin">Découvrir notre entreprise</Link>
                         </Button>
                    </div>
                </div>
            </section>
            
            <section id="engagements" className="py-16 md:py-24 bg-card">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                         <p className="text-sm font-semibold text-primary uppercase">Notre promesse</p>
                        <h2 className="text-3xl font-bold mt-2">Qualité, Confiance, Sérénité.</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Votre tranquillité d'esprit est notre priorité. Voici nos 4 engagements fondamentaux.</p>
                    </div>
                    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {engagementItems.map((item, i) => (
                            <div key={i} className="text-center flex flex-col items-center">
                                <div className="p-4 bg-primary/10 rounded-full w-fit mb-4">{item.icon}</div>
                                <h3 className="text-xl font-semibold">{item.title}</h3>
                                <p className="mt-2 text-muted-foreground text-sm flex-grow">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

             <TestimonialsSection reviews={reviews} />

             {/* FAQ Section */}
            <section id="faq" className="py-16 md:py-24">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Vos Questions, Nos Réponses</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Trouvez ici les réponses aux interrogations les plus fréquentes pour préparer votre projet en toute sérénité.</p>
                    </div>
                    <Accordion type="single" collapsible className="w-full mt-12">
                        {faqItems.map((item, i) => (
                            <AccordionItem value={`item-${i}`} key={i}>
                                <AccordionTrigger className="text-lg text-left hover:no-underline font-semibold">
                                  {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-base text-muted-foreground pt-2">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-16 md:py-24 bg-card">
                 <div className="container">
                     <Card className="grid lg:grid-cols-2 overflow-hidden shadow-xl border-primary">
                        <div className="p-8 md:p-12 bg-primary text-primary-foreground flex flex-col justify-center">
                            <h2 className="text-3xl font-bold">Prêt à déménager ? Contactez-nous.</h2>
                            <p className="mt-4 text-primary-foreground/80">Nos experts sont à votre disposition pour planifier votre déménagement. Remplissez ce formulaire et obtenez votre devis gratuit en 24H.</p>
                        </div>
                        <div className="p-8 md:p-12">
                            <div >
                                <ContactForm />
                            </div>
                        </div>
                     </Card>
                 </div>
            </section>
        </>
    );
}
