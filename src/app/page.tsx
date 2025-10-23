"use client";

import * as React from "react";
import { ArrowRight, Star, CheckCircle, Users, FileText, ShieldCheck, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";
import type { FormattedReview } from "@/app/api/reviews/route";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionTitle } from "@/components/section-title";

// --- Data ---
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
    title: "Garde-Meubles & Stockage",
    description: "Des solutions de stockage flexibles et sécurisées pour vos biens, de courte ou longue durée.",
    link: "/demenagement-garde-meubles",
    imageUrl: "https://picsum.photos/seed/storage-unit/800/600",
    aiHint: "storage unit boxes"
  },
];

const engagements = [
    {
        icon: Users,
        title: "Équipe 100% Salariée",
        description: "Fiabilité et qualité constantes grâce à nos propres équipes formées et expérimentées."
    },
    {
        icon: FileText,
        title: "Devis Transparent",
        description: "Une estimation claire, détaillée et sans surprise. Vous savez exactement pour quoi vous payez."
    },
    {
        icon: ShieldCheck,
        title: "Protection Garantie",
        description: "Matériel professionnel et assurance incluse pour une tranquillité d'esprit totale."
    },
    {
        icon: Lightbulb,
        title: "Sérénité Assurée",
        description: "Nous gérons les autorisations et la logistique complexe pour un déménagement sans stress."
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
        id: "fallback-1", name: "Clotilde Duran",
        text: "Une équipe très réactive et très professionnelle, vraiment rien à dire, du très bon travail! Les affaires ont été emballées avec le plus grand soin. Nous conseillons les yeux fermés!",
        rating: 5, createTime: "il y a 2 ans", avatarUrl: `https://i.pravatar.cc/48?u=Clotilde`
    },
    {
        id: "fallback-2", name: "Jean-michel Marot",
        text: "Un déménagement en Bretagne parfaitement réalisé. Professionnel du début jusqu'à la livraison finale. Très bon contact. Équipe efficace, rapide, et sympathique. Travail de qualité.",
        rating: 5, createTime: "il y a 2 ans", avatarUrl: `https://i.pravatar.cc/48?u=Jean-michel`
    },
    {
        id: "fallback-3", name: "Robert GALAND",
        text: "Une interlocutrice réactive, une équipe ultra efficace, des affaires très bien protégées. Rapidité, professionnalisme. On voit le côté 'familial' sans prestataire ou intérimaire. Sincèrement je suis bluffé. Je recommande totalement. MERCI",
        rating: 5, createTime: "il y a 19 jours", avatarUrl: `https://i.pravatar.cc/48?u=Robert`
    },
    {
        id: "fallback-4", name: "Nadine Mirlier",
        text: "Un très grand merci à toute l'équipe. Ravie d'avoir fait appel à eux. Tout était parfait. Tout était bien emballé et protéger.L'équipe très professionnelle. Très bon rapport qualité prix.Je recommande à 200 %.",
        rating: 5, createTime: "il y a environ un mois", avatarUrl: `https://i.pravatar.cc/48?u=Nadine`
    }
];

// --- Components ---

const HeroSection = () => (
    <section className="bg-background">
        <div className="container grid lg:grid-cols-2 items-center gap-12 py-24 sm:py-32">
            <div className="relative z-10 text-center lg:text-left">
                <h1 className="text-4xl md:text-6xl font-headline font-bold leading-tight text-foreground">
                   Le déménagement,
                   <br />
                   <span className="font-light">la sérénité en plus.</span>
                </h1>
                <p className="mt-6 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 text-muted-foreground">
                    Confiez-nous votre projet pour une expérience fluide et sécurisée. 
                    Notre expertise au service de votre tranquillité, partout en France.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
                    <Button size="lg" asChild>
                        <Link href="/demande-devis">Obtenir mon devis gratuit</Link>
                    </Button>
                </div>
                <div className="mt-12 flex justify-center lg:justify-start items-center gap-4">
                    <div className="flex -space-x-2">
                        <Image className="inline-block h-10 w-10 rounded-full ring-2 ring-background" src="https://i.pravatar.cc/48?u=client1" alt="Témoin 1" width={40} height={40}/>
                        <Image className="inline-block h-10 w-10 rounded-full ring-2 ring-background" src="https://i.pravatar.cc/48?u=client2" alt="Témoin 2" width={40} height={40}/>
                        <Image className="inline-block h-10 w-10 rounded-full ring-2 ring-background" src="https://i.pravatar.cc/48?u=client3" alt="Témoin 3" width={40} height={40}/>
                    </div>
                    <div className="text-sm text-left">
                        <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />)}
                        </div>
                        <p className="text-muted-foreground">Basé sur <span className="font-semibold text-foreground">150+ avis</span> sur Google</p>
                    </div>
                </div>
            </div>
            <div className="relative h-64 lg:h-auto lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                    src="https://picsum.photos/seed/hero-image/1200/1500"
                    alt="Équipe de déménageurs professionnels souriants chargeant un camion"
                    fill
                    className="object-cover"
                    data-ai-hint="professional movers smiling"
                    priority
                />
            </div>
        </div>
    </section>
);

const ServicesSection = () => (
    <section id="services" className="py-24 bg-muted/30">
        <div className="container">
            <div className="text-center max-w-3xl mx-auto">
                 <SectionTitle>Un savoir-faire pour <u>chaque projet</u></SectionTitle>
                <p className="mt-4 text-muted-foreground text-lg">
                    Que vous soyez un particulier ou une entreprise, que vous déménagiez à côté ou à l'autre bout de la France, nous avons la solution sur-mesure.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                {services.map((service) => (
                    <Link href={service.link} key={service.title} className="group block">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
                             <Image 
                                src={service.imageUrl}
                                alt={service.title}
                                fill
                                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                                data-ai-hint={service.aiHint}
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-bold font-headline">{service.title}</h3>
                            <p className="mt-1 text-muted-foreground text-sm">{service.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="text-center mt-12">
                <Button asChild variant="outline">
                     <Link href="/services">Découvrir tous nos services</Link>
                </Button>
            </div>
        </div>
    </section>
);

const EngagementsSection = () => (
     <section className="py-24">
        <div className="container grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-96 lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                 <Image
                    src="https://picsum.photos/seed/engagements/800/1200"
                    alt="Déménageur protégeant un meuble avec soin"
                    fill
                    className="object-cover"
                    data-ai-hint="mover protecting furniture"
                />
            </div>
             <div className="max-w-xl">
                 <SectionTitle>La qualité comme <u>signature</u>. La sérénité comme <u>promesse</u>.</SectionTitle>
                 <p className="mt-6 text-muted-foreground text-lg">
                    Notre réputation s'est bâtie sur la confiance, la fiabilité et une obsession pour le travail bien fait. Chaque déménagement est une promesse tenue.
                </p>
                <div className="mt-8 space-y-6">
                    {engagements.map((engagement) => (
                        <div key={engagement.title} className="flex items-start gap-4">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <engagement.icon className="h-5 w-5"/>
                            </div>
                            <div>
                               <h4 className="font-bold text-foreground">{engagement.title}</h4>
                               <p className="mt-1 text-muted-foreground">{engagement.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

const FaqSection = () => (
    <section id="faq" className="py-24 bg-muted/30">
        <div className="container max-w-4xl mx-auto">
            <div className="text-center">
                 <SectionTitle>Vos <u>questions</u>, nos <u>réponses</u></SectionTitle>
                <p className="mt-4 text-muted-foreground text-lg">Nous avons rassemblé ici les questions les plus fréquentes pour vous aider à préparer votre projet en toute sérénité.</p>
            </div>
            <Accordion type="single" collapsible className="w-full mt-12">
                {faqItems.map((item, i) => (
                    <AccordionItem value={`item-${i}`} key={i}>
                        <AccordionTrigger className="text-lg text-left font-semibold text-foreground hover:no-underline">
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
);

const CtaSection = () => (
    <section id="contact" className="py-24">
        <div className="container">
            <div className="bg-background border rounded-2xl p-8 md:p-16 text-center">
                 <SectionTitle>Prêt pour un déménagement <u>sans stress</u> ?</SectionTitle>
                <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">
                    Notre équipe est prête à vous accompagner. Obtenez une estimation gratuite et personnalisée pour votre projet.
                </p>
                <div className="mt-8 flex justify-center">
                    <Button size="lg" asChild>
                        <Link href="/demande-devis">Obtenir mon devis gratuit</Link>
                    </Button>
                </div>
            </div>
        </div>
    </section>
);

export default function LandingPage() {
    const reviews: FormattedReview[] = fallbackTestimonials;
    
    return (
        <div className="bg-background text-foreground">
            <HeroSection />
            <ServicesSection />
            <EngagementsSection />
            <TestimonialsSection reviews={reviews} />
            <FaqSection />
            <CtaSection />
        </div>
    );
}
