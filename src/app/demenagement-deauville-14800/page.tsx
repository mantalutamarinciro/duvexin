
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Home, Users, Building, Truck, Gem, Waves } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Dufour", text: "Notre déménagement de Paris à notre résidence secondaire de Deauville a été géré de main de maître. L'équipe a été très professionnelle et discrète. Un service à la hauteur du lieu.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Dufour14` },
    { id: "fallback-2", name: "H. de la Roche", text: "Excellent service. Ils ont su gérer le stationnement en pleine saison et le déménagement de mon appartement s'est fait sans une égratignure. Je recommande vivement.", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=HdeLaRoche14` },
    { id: "fallback-3", name: "Boutique de Luxe", text: "Le transfert de notre boutique a été réalisé avec un soin infini pour notre stock et notre mobilier. Une équipe de confiance.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Luxe14` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Deauville",
        description: "Des Planches au centre-ville, nous connaissons les accès et les réglementations de la plus célèbre des stations balnéaires."
    },
    {
        icon: <Gem className="h-8 w-8 text-primary"/>,
        title: "Respect des Biens de Prestige",
        description: "Nous intervenons avec un soin particulier dans les villas et appartements de standing, en protégeant les lieux et vos biens de valeur."
    },
    {
        icon: <Waves className="h-8 w-8 text-primary"/>,
        title: "Gestion de la Saisonnalité",
        description: "Nous planifions nos interventions en tenant compte de l'affluence estivale et gérons les autorisations de stationnement en conséquence."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "La Proximité de l'Agence d'Évreux",
        description: "Notre base locale nous permet d'être réactifs et compétitifs pour tous vos projets sur la Côte Fleurie."
    }
];

const faqItems = [
    {
        question: "Comment se passe un déménagement en pleine saison à Deauville ?",
        answer: "La clé est une planification rigoureuse. Nous déposons les demandes d'autorisation de stationnement très en avance et nous privilégions les interventions en début ou en fin de journée pour éviter les pics d'affluence. Notre efficacité sur place permet de minimiser le temps d'intervention."
    },
    {
        question: "Déménagez-vous les résidences secondaires ?",
        answer: "Oui, c'est une grande partie de notre activité sur la Côte Fleurie. Nous pouvons nous coordonner avec vous ou une personne de confiance sur place pour l'organisation du déménagement, même si vous n'êtes pas présent en permanence."
    },
    {
        question: "J'ai du mobilier de valeur, comment le protégez-vous ?",
        answer: "Nous avons une expertise reconnue dans la protection des biens de valeur. Nous utilisons des emballages sur-mesure, des caisses pour les objets les plus fragiles et nos équipes sont formées aux techniques de manutention les plus délicates. La sécurité de votre patrimoine est notre priorité."
    },
    {
        question: "Quelles sont vos formules pour un appartement à Deauville ?",
        answer: "Nous proposons toutes nos formules, de la plus économique à la prestation 'Prestige' où nous nous occupons de tout. Pour les appartements en étage, fréquents à Deauville, nous évaluons systématiquement le besoin d'un monte-meubles pour une intervention rapide et sûre."
    }
];


export default function DeauvillePage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/deauville/1920/500"
                    alt="Les Planches de Deauville"
                    fill
                    className="object-cover"
                    data-ai-hint="Deauville boardwalk"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement à Deauville</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Deauville (14800)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">Un service d'excellence pour votre projet dans la plus glamour des stations normandes.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-calvados-14" className="hover:text-primary">Calvados (14)</Link>
                <span className="mx-2">&gt;</span>
                <span>Deauville</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui connaît l'élégance de Deauville</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Deauville, c'est s'installer dans un cadre de vie prestigieux et internationalement reconnu. Ce standing exige un service de déménagement à la hauteur, alliant discrétion, soin extrême et une logistique impeccable.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Grâce à notre agence normande, nous sommes votre expert de proximité pour Deauville. Que vous emménagiez dans une villa normande, un appartement avec vue sur mer ou une résidence secondaire, nous vous garantissons un déménagement serein et parfaitement orchestré.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/deauville-move/600/400"
                            alt="Équipe de déménagement professionnelle intervenant à Deauville"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team luxury seaside"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-deauville" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Deauville</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Notre connaissance du terrain est la clé de votre tranquillité d'esprit.</p>
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
            
             {/* Services Section */}
            <section className="py-16">
                 <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1">
                        <Image
                            src="https://picsum.photos/seed/deauville-packing/600/400"
                            alt="Déménageur emballant avec soin des objets de luxe"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing luxury"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux résidents de Deauville</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement de résidences principales et secondaires</h4>
                                    <p className="text-muted-foreground">Une expertise particulière pour les déménagements de villas et d'appartements de standing.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Transport d'objets de valeur</h4>
                                    <p className="text-muted-foreground">Nous organisons le transport sécurisé de vos œuvres d'art, mobilier de designer et caves à vin.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Formule "Prestige" clé en main</h4>
                                    <p className="text-muted-foreground">De la mise en caisse à la réinstallation complète, nous nous occupons de tout pour votre confort absolu.</p>
                                </div>
                            </li>
                        </ul>
                         <Button asChild className="mt-8" variant="outline">
                            <Link href="/services">Découvrir tous nos services</Link>
                         </Button>
                    </div>
                </div>
            </section>
            
            <TestimonialsSection reviews={fallbackTestimonials} />
            
            {/* FAQ Section */}
            <section id="faq-deauville" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Deauville</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Deauville.</p>
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
            <section id="contact-deauville" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Deauville</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Deauville</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
