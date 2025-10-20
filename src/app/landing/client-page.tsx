
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
]

export function LandingPageClient({ reviews }: { reviews: FormattedReview[] }) {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center bg-gray-50">
                <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl md:text-6xl font-headline font-bold leading-tight">
                            Le déménagement,
                            <br />
                            <span className="text-primary">la sérénité en plus.</span>
                        </h1>
                        <p className="mt-6 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 text-muted-foreground">
                            Confiez-nous votre projet pour une expérience fluide et sécurisée. 
                            Notre expertise au service de votre tranquillité, partout en France.
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
                            <Button size="lg" asChild>
                                <Link href="/demande-devis">Obtenir mon devis gratuit</Link>
                            </Button>
                            <Button size="lg" variant="ghost" asChild>
                                <Link href="#services">
                                    Découvrir nos services <ArrowRight className="ml-2"/>
                                </Link>
                            </Button>
                        </div>
                    </div>
                     <div className="relative h-64 md:h-80 lg:h-[450px] w-full">
                        <Image 
                            src="https://picsum.photos/seed/hero-image/800/600"
                            alt="Équipe de déménageurs professionnels souriants"
                            fill
                            className="object-cover rounded-2xl shadow-xl"
                            data-ai-hint="professional movers smiling"
                            priority
                        />
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
