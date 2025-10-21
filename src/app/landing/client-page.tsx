
"use client";

import * as React from "react";
import { ArrowRight, Star, Quote, Users, FileText, ShieldCheck, Truck, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";
import type { FormattedReview } from "@/app/api/reviews/route";
import { ContactForm } from "./contact-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Déménagement de Particuliers",
    description: "Une expertise pour chaque étape de votre vie, de votre premier studio à la maison familiale. Nous vous garantissons un service sur-mesure, adapté à vos besoins et à votre budget, pour une transition en toute sérénité.",
    link: "/demenagement-particuliers",
    imageUrl: "https://picsum.photos/seed/particuliers/800/600",
    aiHint: "happy couple new home"
  },
  {
    title: "Déménagement d'Entreprise",
    description: "Transferts de bureaux, d'archives ou de matériel sensible. Notre planification rigoureuse et notre exécution discrète assurent une continuité parfaite de votre activité.",
    link: "/demenagement-entreprise-bureau",
    imageUrl: "https://picsum.photos/seed/entreprise/800/600",
    aiHint: "modern office interior"
  },
  {
    title: "Déménagement National",
    description: "Nous vous accompagnons partout en France. Grâce à nos lignes régulières vers les grandes métropoles, nous offrons une solution fiable et compétitive pour vos projets longue distance.",
    link: "/demenagement-national",
    imageUrl: "https://picsum.photos/seed/national/800/600",
    aiHint: "highway france landscape"
  },
];

const engagements = [
    {
        icon: Users,
        title: "Équipe 100% Salariée",
        description: "Fiabilité et qualité constantes grâce à nos propres équipes formées."
    },
    {
        icon: FileText,
        title: "Devis Transparent",
        description: "Une estimation claire, détaillée et sans surprise pour maîtriser votre budget."
    },
    {
        icon: ShieldCheck,
        title: "Protection Garantie",
        description: "Matériel professionnel et assurance incluse pour une tranquillité d'esprit totale."
    },
    {
        icon: Lightbulb,
        title: "Sérénité Assurée",
        description: "Nous gérons les autorisations et la logistique pour un déménagement sans stress."
    }
];

const faqItems = [
    {
        question: "Quand dois-je commencer à organiser mon déménagement ?",
        answer: "Nous conseillons de nous contacter idéalement 1 à 2 mois à l'avance, surtout si vous déménagez pendant la haute saison (de mai à septembre). Cela nous permet de garantir notre disponibilité et de planifier toutes les étapes sereinement. Pour un petit volume ou en basse saison, 2 à 3 semaines peuvent suffire."
    },
    {
        question: "Comment est calculé le prix de mon déménagement ?",
        answer: "Le tarif d'un déménagement dépend de plusieurs facteurs clés : le volume de vos biens (en m³), la distance entre les deux adresses, la formule choisie (Économique, Standard, Confort), et les conditions d'accès (étages, ascenseur, distance de portage). Notre devis est détaillé et transparent pour que vous compreniez chaque élément du coût."
    },
    {
        question: "La visite technique est-elle obligatoire et payante ?",
        answer: "La visite technique est gratuite et sans engagement. Elle n'est pas toujours obligatoire, notamment pour les petits volumes (studios, T1). Cependant, nous la recommandons fortement pour les volumes plus importants (à partir de 20-25 m³) afin d'éviter toute surprise. Elle permet à notre conseiller d'évaluer précisément le volume, de repérer les difficultés d'accès et de répondre à toutes vos questions."
    },
];


export function LandingPageClient({ reviews }: { reviews: FormattedReview[] }) {
    return (
        <div className="bg-background text-foreground">
            
             {/* Hero Section */}
            <section className="relative min-h-[80vh] flex items-center justify-center text-center text-white py-20">
                <Image
                    src="https://picsum.photos/seed/hero-image/1920/1280"
                    alt="Équipe de déménageurs professionnels souriants chargeant un camion"
                    fill
                    className="object-cover"
                    data-ai-hint="professional movers smiling"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30"></div>
                <div className="container relative z-10">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold leading-tight drop-shadow-md">
                        Le déménagement,
                        <br />
                        <span className="text-primary">la sérénité en plus.</span>
                    </h1>
                    <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-white/90 drop-shadow">
                        Confiez-nous votre projet pour une expérience fluide et sécurisée. 
                        Notre expertise au service de votre tranquillité, partout en France.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Button size="lg" asChild>
                            <Link href="/demande-devis">Obtenir mon devis gratuit</Link>
                        </Button>
                    </div>
                     <div className="mt-12 flex justify-center items-center gap-4">
                        <div className="flex -space-x-2">
                           <Image className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/48?u=client1" alt="Témoin 1" width={40} height={40}/>
                           <Image className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/48?u=client2" alt="Témoin 2" width={40} height={40}/>
                           <Image className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/48?u=client3" alt="Témoin 3" width={40} height={40}/>
                        </div>
                        <div className="text-sm text-left">
                            <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />)}
                            </div>
                            <p className="text-white/80">Basé sur <span className="font-semibold text-white">150+ avis</span> sur Google</p>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Services Section */}
            <section id="services" className="py-24">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-headline font-bold">Un savoir-faire pour chaque projet</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                            Que vous soyez un particulier ou une entreprise, que vous déménagiez à côté ou à l'autre bout de la France, nous avons la solution sur-mesure.
                        </p>
                    </div>
                    <div className="mt-20 space-y-24">
                        {services.map((service, index) => (
                            <div key={service.title} className="grid lg:grid-cols-2 gap-12 items-center">
                                <div className={cn("relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg", index % 2 === 1 && "lg:order-last")}>
                                     <Image 
                                        src={service.imageUrl}
                                        alt={service.title}
                                        fill
                                        className="object-cover"
                                        data-ai-hint={service.aiHint}
                                    />
                                </div>
                                <div className="lg:px-8">
                                    <h3 className="text-2xl font-bold font-headline">{service.title}</h3>
                                    <p className="mt-4 text-muted-foreground">{service.description}</p>
                                    <Button asChild variant="link" className="p-0 mt-4">
                                         <Link href={service.link}>
                                            En savoir plus <ArrowRight className="ml-2 h-4 w-4"/>
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

             {/* Engagement Section */}
            <section className="py-24 relative overflow-hidden bg-gray-900 text-white">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
                >
                    <source src="https://firebasestorage.googleapis.com/v0/b/movesmart-dashboard.appspot.com/o/moving-video.mp4?alt=media&token=24a259c6-13a8-430c-848e-04f7626966f0" type="video/mp4" />
                </video>
                <div className="container relative z-10">
                    <div className="max-w-3xl">
                        <h2 className="text-3xl md:text-4xl font-headline font-bold">La qualité comme signature.
                            <br />
                            La sérénité comme promesse.</h2>
                        <p className="mt-6 text-white/80 text-lg">
                           Notre réputation s'est bâtie sur la confiance, la fiabilité et une obsession pour le travail bien fait. Chaque déménagement est une promesse tenue.
                        </p>
                    </div>
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                       {engagements.map((engagement, index) => (
                           <Card key={engagement.title} className="bg-white/10 backdrop-blur-lg border-white/20 text-white transform hover:-translate-y-2 transition-transform duration-300">
                               <CardContent className="p-6">
                                   <engagement.icon className="h-8 w-8 text-primary mb-4"/>
                                   <h4 className="font-bold text-lg">{engagement.title}</h4>
                                   <p className="mt-2 text-sm text-white/70">{engagement.description}</p>
                               </CardContent>
                           </Card>
                       ))}
                    </div>
                </div>
            </section>


            <TestimonialsSection reviews={reviews} />
            
             {/* FAQ Section */}
            <section id="faq" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Vos questions, nos réponses</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nous avons rassemblé ici les questions les plus fréquentes pour vous aider à préparer votre projet en toute sérénité.</p>
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
            
             {/* CTA / Contact Section */}
            <section id="contact" className="py-24">
                <div className="container">
                    <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-16 text-center shadow-2xl shadow-primary/20">
                         <h2 className="text-4xl md:text-5xl font-headline font-bold">Prêt pour un déménagement sans stress ?</h2>
                        <p className="mt-4 text-lg max-w-2xl mx-auto text-primary-foreground/80">
                            Notre équipe est prête à vous accompagner. Obtenez une estimation gratuite et personnalisée pour votre projet.
                        </p>
                         <div className="mt-8 flex justify-center">
                            <Button size="lg" variant="secondary" asChild>
                                <Link href="/demande-devis">Obtenir mon devis gratuit</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

