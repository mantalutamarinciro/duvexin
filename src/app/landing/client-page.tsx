
"use client";

import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Package, ShieldCheck, Star, Map, Globe, Building, Paintbrush, CheckCircle, Rocket, Users, Handshake, Briefcase } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "./contact-form";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { FormattedReview } from "@/services/reviewService";


const services = [
    {
        icon: <Map className="h-10 w-10 text-primary" />,
        title: "Déménagement Local",
        description: "Déménagez rapidement et sereinement dans le Val-d’Oise avec des experts locaux."
    },
     {
        icon: <Briefcase className="h-10 w-10 text-primary" />,
        title: "Déménagement Régional",
        description: "Déménagez en toute tranquillité à travers l’Île-de-France."
    },
    {
        icon: <Globe className="h-10 w-10 text-primary" />,
        title: "Déménagement National",
        description: "Un déménagement rapide et sécurisé, où que vous soyez en France."
    },
    {
        icon: <Rocket className="h-10 w-10 text-primary" />,
        title: "Déménagement International",
        description: "Déménagez partout en Europe avec des experts du transport international."
    },
    {
        icon: <Paintbrush className="h-10 w-10 text-primary" />,
        title: "Déménagement d'Œuvres d'Art",
        description: "Protégez vos œuvres précieuses avec des déménageurs spécialisés."
    },
    {
        icon: <Building className="h-10 w-10 text-primary" />,
        title: "Déménagement d'Entreprise",
        description: "Simplifiez le déménagement de votre entreprise avec un service adapté."
    },
];

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} fill={i < rating ? "currentColor" : "none"} className={i < rating ? "" : "text-gray-300"} />
            ))}
        </div>
    );
}

export function LandingPageClient({ reviews }: { reviews: FormattedReview[] }) {
    const autoplayPlugin = useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    );

    return (
        <>
            {/* Hero Section */}
            <section className="relative min-h-[70vh] flex items-center justify-center text-center text-white py-20">
                <Image 
                    src="https://picsum.photos/seed/move/1920/1080"
                    alt="Équipe de déménageurs souriants"
                    fill
                    className="object-cover"
                    data-ai-hint="moving team truck smiling"
                    priority
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="font-semibold text-primary">Déménagements dans le Val-d’Oise (95), l’Oise (60), l’Eure (27) et plus...</p>
                    <h1 className="text-4xl md:text-6xl font-headline font-bold mt-2 leading-tight">Déménagez en toute sérénité avec nos équipes</h1>
                    <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">Déménagement 100 % réalisé par nos propres équipes, sans sous-traitance ni intérim.</p>
                    <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Button size="lg" asChild>
                            <Link href="#contact">Demandez un devis en 2 minutes</Link>
                        </Button>
                         <Button size="lg" variant="secondary" asChild>
                            <Link href="/dashboard/inventory">Calculez votre volume</Link>
                        </Button>
                    </div>
                </div>
            </section>

             {/* Value Propositions */}
            <section className="py-12 bg-background">
                <div className="container">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="flex items-center justify-center gap-3">
                            <CheckCircle className="h-6 w-6 text-primary"/>
                            <span className="font-semibold">Devis rapide et déplacement gratuit</span>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <Users className="h-6 w-6 text-primary"/>
                            <span className="font-semibold">Une équipe dédiée, sans intermédiaire</span>
                        </div>
                         <div className="flex items-center justify-center gap-3">
                            <div className="flex items-center gap-1 text-amber-400">
                                <Star size={16} fill="currentColor"/>
                                <Star size={16} fill="currentColor"/>
                                <Star size={16} fill="currentColor"/>
                                <Star size={16} fill="currentColor"/>
                                <Star size={16} fill="currentColor"/>
                            </div>
                            <div>
                                <span className="font-bold text-foreground">4.9</span>
                                <span className="text-muted-foreground"> / 5 sur 231 avis Google</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <div id="about" className="py-16 md:py-24 bg-muted/50">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1">
                         <h2 className="text-3xl font-bold">Votre partenaire de confiance pour un déménagement sans stress</h2>
                         <p className="mt-4 text-muted-foreground text-lg">
                            Basée dans le Val-d’Oise (95), notre entreprise familiale de déménagement intervient également dans l’Oise (60), l’Eure (27), les Yvelines (78), Paris (75) et les Hauts-de-Seine (92). Que vous soyez un particulier ou une entreprise, nous vous accompagnons dans tous vos projets de déménagement, en Île-de-France, partout en France et même à l’international.
                         </p>
                         <Button asChild className="mt-6">
                            <Link href="#contact">En savoir plus sur nous</Link>
                         </Button>
                    </div>
                    <div className="order-1 lg:order-2">
                        <Image
                            src="https://picsum.photos/seed/team/600/400"
                            alt="Notre équipe de déménageurs"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team portrait"
                        />
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <section id="services" className="py-16 md:py-24">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Nos services de déménagement adaptés à vos besoins</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Découvrez nos solutions de déménagement sur mesure, adaptées à toutes vos demandes.</p>
                    </div>
                    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, i) => (
                             <Card key={i} className="text-center p-6 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="flex justify-center mb-4">{service.icon}</div>
                                <h3 className="text-xl font-semibold">{service.title}</h3>
                                <p className="mt-2 text-muted-foreground flex-grow">{service.description}</p>
                                <Button variant="link" className="mt-4">Voir ce service →</Button>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

             {/* Testimonials */}
             <section className="py-16 md:py-24 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Nos clients nous recommandent</h2>
                         <p className="mt-4 text-muted-foreground text-lg">La satisfaction de nos clients est notre meilleure publicité. Voici ce qu'ils disent de nous.</p>
                    </div>
                     <Carousel
                        plugins={[autoplayPlugin.current]}
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full max-w-4xl mx-auto mt-12"
                        >
                        <CarouselContent>
                            {reviews.map((review) => (
                                <CarouselItem key={review.id} className="md:basis-1/2">
                                     <Card className="h-full p-6 flex flex-col sm:flex-row gap-6">
                                        <Avatar className="h-12 w-12 hidden sm:block">
                                            <AvatarImage src={review.avatarUrl} alt={review.name} />
                                            <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <StarRating rating={review.rating} />
                                            <p className="italic text-muted-foreground mt-2">"{review.text}"</p>
                                            <p className="mt-4 font-semibold text-sm">{review.name}</p>
                                        </div>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                    <div className="text-center mt-12">
                        <Button variant="outline" asChild>
                            <Link href="https://www.google.com/maps/search/?api=1&query=Google&query_place_id=ChIJy6-L4aF-5kcR3ep22iQJkOE" target="_blank">Voir tous nos avis sur Google</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-16 md:py-24">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Un déménagement réussi en 4 étapes simples</h2>
                         <p className="mt-4 text-muted-foreground text-lg">Nous simplifions votre déménagement en suivant un processus clair et efficace pour garantir une expérience sans stress.</p>
                    </div>
                    <div className="mt-12 grid md:grid-cols-4 gap-8 text-center relative">
                        {/* Connecting lines */}
                        <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-border -z-10"></div>
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4 border-4 border-background ring-4 ring-primary">
                                <span className="text-2xl font-bold">1</span>
                            </div>
                            <h3 className="font-semibold text-xl">Consultation</h3>
                            <p className="text-sm text-muted-foreground mt-1">Nous discutons de vos besoins et planifions ensemble votre déménagement.</p>
                        </div>
                         <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4 border-4 border-background ring-4 ring-primary">
                               <span className="text-2xl font-bold">2</span>
                            </div>
                            <h3 className="font-semibold text-xl">Préparation</h3>
                            <p className="text-sm text-muted-foreground mt-1">Nous vous fournissons le matériel et les conseils pour un emballage réussi.</p>
                        </div>
                         <div className="flex flex-col items-center">
                           <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4 border-4 border-background ring-4 ring-primary">
                                <span className="text-2xl font-bold">3</span>
                            </div>
                            <h3 className="font-semibold text-xl">Réalisation</h3>
                            <p className="text-sm text-muted-foreground mt-1">Nos équipes expertes prennent en charge le jour J avec soin et efficacité.</p>
                        </div>
                         <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4 border-4 border-background ring-4 ring-primary">
                                <span className="text-2xl font-bold">4</span>
                            </div>
                            <h3 className="font-semibold text-xl">Installation</h3>
                            <p className="text-sm text-muted-foreground mt-1">Nous déposons vos biens dans les pièces de votre choix pour une réinstallation facile.</p>
                        </div>
                    </div>
                </div>
            </section>


            {/* Contact Section */}
            <section id="contact" className="py-16 md:py-24 bg-muted/50">
                 <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Prêt à déménager ? Contactez-nous.</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos experts sont à votre disposition pour planifier votre déménagement sans stress. Remplissez ce formulaire et obtenez votre devis gratuit en 24H.</p>
                         <div className="mt-8 space-y-4">
                             <div className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-primary" />
                                <span className="font-semibold">Une équipe expérimentée et professionnelle.</span>
                             </div>
                              <div className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-primary" />
                                <span className="font-semibold">Des solutions personnalisées.</span>
                             </div>
                              <div className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-primary" />
                                <span className="font-semibold">Des tarifs compétitifs sans compromis sur la qualité.</span>
                             </div>
                        </div>
                    </div>
                    <div>
                        <Card className="shadow-lg">
                             <CardHeader>
                                <CardTitle>Demandez votre devis gratuit</CardTitle>
                                <CardDescription>Notre équipe vous recontactera dans les plus brefs délais.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ContactForm />
                            </CardContent>
                        </Card>
                    </div>
                 </div>
            </section>
        </>
    );
}
