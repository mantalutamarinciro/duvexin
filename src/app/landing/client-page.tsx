
"use client";

import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Package, ShieldCheck, Star, Map, Globe, Building, Paintbrush, CheckCircle, Rocket, Users, Handshake, BriefcaseBusiness, Award, Smile, Clock, HelpCircle, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "./contact-form";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import type { FormattedReview } from "@/app/api/reviews/route";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


const services = [
    {
        icon: <Map className="h-10 w-10 text-primary" />,
        title: "Déménagement Local",
        description: "Déménagez rapidement et sereinement dans le Val-d’Oise avec des experts locaux."
    },
     {
        icon: <BriefcaseBusiness className="h-10 w-10 text-primary" />,
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

const engagementItems = [
    {
        icon: <Users className="h-8 w-8 text-primary"/>,
        title: "Équipe 100% Salariée",
        description: "Pas de sous-traitance ni d'intérim. Nos propres équipes pour une qualité maîtrisée."
    },
    {
        icon: <Package className="h-8 w-8 text-primary"/>,
        title: "Matériel Professionnel",
        description: "Nous utilisons des couvertures, housses et cartons adaptés pour une protection optimale."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Assurance Garantie",
        description: "Vos biens sont précieux. Ils sont couverts par notre assurance tout au long du déménagement."
    },
    {
        icon: <Handshake className="h-8 w-8 text-primary"/>,
        title: "Devis Transparent",
        description: "Recevez un devis détaillé, gratuit et sans surprise pour une maîtrise totale de votre budget."
    }
]

const faqItems = [
  {
    question: "Quand dois-je réserver mon déménagement ?",
    answer: "Nous recommandons de réserver votre déménagement au moins 3 à 4 semaines à l'avance, surtout pendant la haute saison (de mai à septembre) pour garantir la disponibilité de nos équipes."
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
            <section className="relative min-h-[80vh] flex items-center justify-center text-center text-white py-20">
                <Image 
                    src="https://picsum.photos/seed/movers/1920/1080"
                    alt="Équipe de déménageurs professionnels chargeant un camion"
                    fill
                    className="object-cover"
                    data-ai-hint="professional movers truck"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
                <div className="relative z-10 container">
                    <p className="font-semibold text-primary drop-shadow-md">Déménagements dans le Val-d’Oise (95), l’Oise (60), l’Eure (27) et plus...</p>
                    <h1 className="text-4xl md:text-6xl font-headline font-bold mt-2 leading-tight drop-shadow-lg">Votre déménagement, notre engagement.</h1>
                    <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto drop-shadow-sm">Déménagement 100 % réalisé par nos propres équipes, sans sous-traitance ni intérim, pour une qualité et une sérénité garanties.</p>
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
            <section className="py-8 bg-background border-b">
                <div className="container">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="flex items-center justify-center gap-3">
                            <Clock className="h-6 w-6 text-primary"/>
                            <span className="font-semibold">Devis rapide et déplacement gratuit</span>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <Users className="h-6 w-6 text-primary"/>
                            <span className="font-semibold">Une équipe dédiée, sans intermédiaire</span>
                        </div>
                         <div className="flex items-center justify-center gap-3">
                            <div className="flex items-center gap-1 text-amber-400">
                                <Star size={20} fill="currentColor"/>
                            </div>
                            <div>
                                <span className="font-bold text-foreground">4.9 / 5</span>
                                <span className="text-muted-foreground"> sur 231 avis Google</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="about" className="py-16 md:py-24 bg-muted/50">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1">
                         <h2 className="text-3xl font-bold">Votre partenaire de confiance pour un déménagement sans stress</h2>
                         <p className="mt-4 text-muted-foreground text-lg">
                            Basée dans le Val-d’Oise (95), notre entreprise familiale de déménagement intervient également dans l’Oise (60), l’Eure (27), les Yvelines (78), Paris (75) et les Hauts-de-Seine (92). Que vous soyez un particulier ou une entreprise, nous vous accompagnons dans tous vos projets de déménagement, en Île-de-France, partout en France et même à l’international.
                         </p>
                         <Button asChild className="mt-6">
                            <Link href="#contact">Contactez-nous pour en savoir plus</Link>
                         </Button>
                    </div>
                    <div className="order-1 lg:order-2">
                        <Image
                            src="https://picsum.photos/seed/team-portrait/600/400"
                            alt="Notre équipe de déménageurs professionnels"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="professional moving team"
                        />
                    </div>
                </div>
            </section>

             {/* Engagements Section */}
            <section id="engagements" className="py-16 md:py-24">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Nos Engagements Qualité</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Votre sérénité est notre priorité. Voici ce que nous vous garantissons à chaque étape.</p>
                    </div>
                    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {engagementItems.map((item, i) => (
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
            <section id="services" className="py-16 md:py-24 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Nos services de déménagement sur mesure</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Découvrez nos solutions adaptées à toutes les situations, que vous soyez un particulier ou une entreprise.</p>
                    </div>
                    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, i) => (
                             <Card key={i} className="text-center p-6 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="flex justify-center mb-4">{service.icon}</div>
                                <h3 className="text-xl font-semibold">{service.title}</h3>
                                <p className="mt-2 text-muted-foreground flex-grow">{service.description}</p>
                                <Button variant="link" className="mt-4">En savoir plus</Button>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Zone d'intervention Section */}
            <section id="zone" className="py-16 md:py-24">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                         <h2 className="text-3xl font-bold">Une présence locale forte en Île-de-France et Normandie</h2>
                         <p className="mt-4 text-muted-foreground text-lg">
                            Ancrés localement, nous intervenons principalement dans les départements suivants, tout en assurant des déménagements nationaux et internationaux.
                         </p>
                         <ul className="mt-6 space-y-3">
                            <li className="flex items-center gap-3"><MapPin className="h-5 w-5 text-primary"/><span>Val-d'Oise (95) - Notre fief</span></li>
                            <li className="flex items-center gap-3"><MapPin className="h-5 w-5 text-primary"/><span>Oise (60)</span></li>
                            <li className="flex items-center gap-3"><MapPin className="h-5 w-5 text-primary"/><span>Eure (27)</span></li>
                            <li className="flex items-center gap-3"><MapPin className="h-5 w-5 text-primary"/><span>Yvelines (78) et Paris (75)</span></li>
                         </ul>
                    </div>
                    <div>
                        <Image
                            src="https://picsum.photos/seed/map/600/400"
                            alt="Carte de notre zone d'intervention principale"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="map region France"
                        />
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
                            {reviews && reviews.map((review) => (
                                <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3">
                                     <Card className="h-full p-6 flex flex-col sm:flex-row gap-6">
                                        <Avatar className="h-12 w-12 hidden sm:block">
                                            <AvatarImage src={review.avatarUrl} alt={review.name} />
                                            <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <StarRating rating={review.rating} />
                                            <p className="italic text-muted-foreground mt-2 line-clamp-4">"{review.text}"</p>
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

             {/* FAQ Section */}
            <section id="faq" className="py-16 md:py-24">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions Fréquentes</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Trouvez ici les réponses aux questions que vous vous posez le plus souvent.</p>
                    </div>
                    <Accordion type="single" collapsible className="w-full mt-12">
                        {faqItems.map((item, i) => (
                            <AccordionItem value={`item-${i}`} key={i}>
                                <AccordionTrigger className="text-lg text-left hover:no-underline">
                                  <div className="flex items-center gap-3">
                                    <HelpCircle className="h-5 w-5 text-primary"/>
                                    {item.question}
                                  </div>
                                </AccordionTrigger>
                                <AccordionContent className="text-base text-muted-foreground pl-8">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
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
