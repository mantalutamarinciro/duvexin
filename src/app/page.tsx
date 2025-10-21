
"use client";

import * as React from "react";
import { ArrowRight, Star, Quote, Users, FileText, ShieldCheck, Truck, Lightbulb, Package, BriefcaseBusiness, Globe, Warehouse, Paintbrush, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";
import type { FormattedReview } from "@/app/api/reviews/route";
import { ContactForm } from "./landing/contact-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionTitle } from "@/components/section-title";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Déménagement Particuliers",
    description: "Une expertise pour chaque étape de votre vie, de votre premier studio à la maison familiale.",
    link: "/demenagement-particuliers",
    imageUrl: "https://picsum.photos/seed/particuliers/800/600",
    aiHint: "happy couple new home"
  },
  {
    title: "Déménagement d'Entreprise",
    description: "Transferts de bureaux, d'archives ou de matériel sensible pour une continuité parfaite de votre activité.",
    link: "/demenagement-entreprise-bureau",
    imageUrl: "https://picsum.photos/seed/entreprise/800/600",
    aiHint: "modern office interior"
  },
  {
    title: "Déménagement National",
    description: "Une solution fiable pour vos projets longue distance, partout en France.",
    link: "/demenagement-national",
    imageUrl: "https://picsum.photos/seed/national/800/600",
    aiHint: "highway france landscape"
  },
  {
    title: "Déménagement International",
    description: "Votre déménagement en Europe, géré de A à Z par nos experts.",
    link: "#",
    imageUrl: "https://picsum.photos/seed/international/800/600",
    aiHint: "europe map logistics"
  },
];

const engagements = [
    {
        icon: Users,
        title: "Équipe 100% Salariée",
        description: "Fiabilité et qualité constantes grâce à nos propres équipes formées et expérimentées, qui partagent nos valeurs."
    },
    {
        icon: FileText,
        title: "Devis Transparent",
        description: "Une estimation claire, détaillée et sans surprise. Vous savez exactement pour quoi vous payez, sans frais cachés."
    },
    {
        icon: ShieldCheck,
        title: "Protection Garantie",
        description: "Utilisation de matériel professionnel et assurance incluse pour une tranquillité d'esprit totale du début à la fin."
    },
    {
        icon: Lightbulb,
        title: "Sérénité Assurée",
        description: "Nous gérons les autorisations et la logistique complexe pour que votre seule préoccupation soit votre nouvelle vie."
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

const fallbackTestimonials: FormattedReview[] = [
    {
        id: "fallback-1",
        name: "Clotilde Duran",
        text: "Une équipe très réactive et très professionnelle, vraiment rien à dire, du très bon travail! Les affaires ont été emballées avec le plus grand soin. Nous conseillons les yeux fermés!",
        rating: 5,
        createTime: "il y a 2 ans",
        avatarUrl: `https://i.pravatar.cc/48?u=Clotilde`
    },
    {
        id: "fallback-2",
        name: "Jean-michel Marot",
        text: "Un déménagement en Bretagne parfaitement réalisé. Professionnel du début jusqu'à la livraison finale. Très bon contact. Équipe efficace, rapide, et sympathique. Travail de qualité.",
        rating: 5,
        createTime: "il y a 2 ans",
        avatarUrl: `https://i.pravatar.cc/48?u=Jean-michel`
    },
     {
        id: "fallback-3",
        name: "Robert GALAND",
        text: "Une interlocutrice réactive, une équipe ultra efficace, des affaires très bien protégées. Rapidité, professionnalisme. On voit le côté 'familial' sans prestataire ou intérimaire. Sincèrement je suis bluffé. Je recommande totalement. MERCI",
        rating: 5,
        createTime: "il y a 19 jours",
        avatarUrl: `https://i.pravatar.cc/48?u=Robert`
    },
    {
        id: "fallback-4",
        name: "Nadine Mirlier",
        text: "Un très grand merci à toute l'équipe. Ravie d'avoir fait appel à eux. Tout était parfait. Tout était bien emballé et protéger.L'équipe très professionnelle. Très bon rapport qualité prix.Je recommande à 200 %.",
        rating: 5,
        createTime: "il y a environ un mois",
        avatarUrl: `https://i.pravatar.cc/48?u=Nadine`
    }
];

export default function LandingPage() {
    let reviews: FormattedReview[] = fallbackTestimonials;
    
    /*
    // Pour l'instant, nous utilisons les données de secours pour éviter l'erreur.
    // L'étape suivante consistera à dé-commenter ce bloc une fois les variables d'environnement
    // GOOGLE_ACCOUNT_ID, GOOGLE_LOCATION_ID, et GOOGLE_API_KEY correctement configurées.
    
    try {
        const googleReviews = await getGoogleReviews();
        if (googleReviews.length > 0) {
            reviews = googleReviews;
        } else {
            console.warn("No Google Reviews found, using fallback testimonials.");
        }
    } catch (error) {
        console.error("Could not fetch Google Reviews, using fallback testimonials:", error);
    }
    */
   
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
                        la <span className="font-light text-primary">sérénité</span> en plus.
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
                        <SectionTitle>Un savoir-faire pour <span className="text-primary font-light">chaque projet</span></SectionTitle>
                        <p className="mt-4 text-muted-foreground text-lg">
                            Que vous soyez un particulier ou une entreprise, que vous déménagiez à côté ou à l'autre bout de la France, nous avons la solution sur-mesure.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mt-12">
                        {services.map((service) => (
                            <Link href={service.link} key={service.title} className="group block relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                                <Image
                                    src={service.imageUrl}
                                    alt={service.title}
                                    fill
                                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                                    data-ai-hint={service.aiHint}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                                <div className="absolute bottom-0 left-0 p-6 text-white flex flex-col justify-end h-full w-full">
                                    <div>
                                        <h3 className="text-2xl font-bold font-headline transition-transform duration-300 group-hover:-translate-y-16">{service.title}</h3>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-6 left-6 right-6">
                                            <p className="text-white/80 text-sm max-w-sm">{service.description}</p>
                                            <div className="mt-4 text-primary font-semibold flex items-center gap-2">
                                                En savoir plus <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Button asChild size="lg" variant="outline">
                            <Link href="/services">Découvrir tous nos services</Link>
                        </Button>
                    </div>
                </div>
            </section>
            
            {/* Engagement Section */}
            <section className="py-24 bg-muted/50">
                <div className="container">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="max-w-md">
                           <SectionTitle>La <span className="text-primary font-light">qualité</span> comme signature. La <span className="text-primary font-light">sérénité</span> comme promesse.</SectionTitle>
                           <p className="mt-6 text-muted-foreground text-lg">
                               Notre réputation s'est bâtie sur la confiance, la fiabilité et une obsession pour le travail bien fait. Chaque déménagement est une promesse tenue.
                           </p>
                        </div>
                         <div className="space-y-8">
                           {engagements.map((engagement) => (
                               <div key={engagement.title} className="relative pl-12">
                                   <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                       <engagement.icon className="h-5 w-5"/>
                                   </div>
                                   <h4 className="font-bold text-lg">{engagement.title}</h4>
                                   <p className="mt-1 text-muted-foreground">{engagement.description}</p>
                                   <div className="absolute left-4 top-8 bottom-0 w-px bg-border -z-10"></div>
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
                         <SectionTitle>Vos <span className="text-primary font-light">questions</span>, nos <span className="text-primary font-light">réponses</span></SectionTitle>
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
                         <SectionTitle className="text-primary-foreground">Prêt pour un déménagement <span className="font-light text-white">sans stress</span> ?</SectionTitle>
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
