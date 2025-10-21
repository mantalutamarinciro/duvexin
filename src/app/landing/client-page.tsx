"use client";

import * as React from "react";
import { ArrowRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";
import type { FormattedReview } from "@/app/api/reviews/route";
import { ContactForm } from "./contact-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const services = [
  {
    title: "Déménagement de Particuliers",
    description: "Une expertise pour chaque étape de votre vie, de votre premier studio à la maison familiale.",
    link: "/demenagement-particuliers",
    imageUrl: "https://picsum.photos/seed/particuliers/800/600",
    aiHint: "happy couple new home"
  },
  {
    title: "Déménagement d'Entreprise",
    description: "Transferts de bureaux planifiés pour une transition fluide et sans interruption de votre activité.",
    link: "/demenagement-entreprise-bureau",
    imageUrl: "https://picsum.photos/seed/entreprise/800/600",
    aiHint: "modern office interior"
  },
  {
    title: "Déménagement National",
    description: "Nous vous accompagnons partout en France avec nos lignes régulières vers les grandes métropoles.",
    link: "/demenagement-national",
    imageUrl: "https://picsum.photos/seed/national/800/600",
    aiHint: "highway france landscape"
  },
];

const engagements = [
    {
        title: "Équipe 100% Salariée",
        description: "Fiabilité et qualité constantes grâce à nos propres équipes formées."
    },
    {
        title: "Devis Transparent",
        description: "Une estimation claire, détaillée et sans surprise pour maîtriser votre budget."
    },
    {
        title: "Protection Garantie",
        description: "Matériel professionnel et assurance incluse pour une tranquillité d'esprit totale."
    },
    {
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
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <Link href={service.link} key={service.title} className="group block">
                                <div className="overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300">
                                    <Image 
                                        src={service.imageUrl}
                                        alt={service.title}
                                        width={800}
                                        height={600}
                                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                                        data-ai-hint={service.aiHint}
                                    />
                                    <div className="p-6 bg-card">
                                        <h3 className="text-xl font-bold">{service.title}</h3>
                                        <p className="mt-2 text-muted-foreground text-sm">{service.description}</p>
                                        <div className="mt-4 text-sm font-semibold text-primary flex items-center">
                                            En savoir plus <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform"/>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

             {/* About/Engagement Section */}
            <section className="py-24 bg-card">
                <div className="container grid lg:grid-cols-2 gap-16 items-center">
                     <div className="relative h-96 w-full hidden lg:block">
                        <Image
                            src="https://picsum.photos/seed/engagement-team/600/800"
                            alt="Un déménageur professionnel de l'équipe Déménagement du Vexin"
                            fill
                            className="object-cover rounded-2xl shadow-lg"
                            data-ai-hint="professional mover portrait"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl md:text-4xl font-headline font-bold">La qualité n'est pas une option, c'est notre engagement.</h2>
                        <p className="mt-6 text-muted-foreground text-lg">
                            Depuis plus de 10 ans, notre entreprise familiale s'engage à offrir un service qui va au-delà du simple transport. Notre réputation s'est bâtie sur la confiance, la fiabilité et une obsession pour le travail bien fait.
                        </p>
                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
                           {engagements.map((engagement) => (
                               <div key={engagement.title}>
                                   <h4 className="font-bold text-lg">{engagement.title}</h4>
                                   <p className="mt-1 text-muted-foreground text-sm">{engagement.description}</p>
                               </div>
                           ))}
                        </div>
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
