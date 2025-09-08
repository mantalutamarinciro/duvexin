
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckCircle, MapPin, ShieldCheck, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";
import type { FormattedReview } from "@/app/api/reviews/route";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Laetitia F.", text: "Super service pour notre déménagement à Fontainebleau. L'équipe a été très professionnelle et a pris grand soin de nos meubles anciens. Je recommande vivement.", rating: 5, createTime: "il y a 5 mois", avatarUrl: `https://i.pravatar.cc/48?u=Laetitia77` },
    { id: "fallback-2", name: "Marc T.", text: "Efficace et rapide pour mon déménagement à Meaux. Le devis était clair et sans surprise. Le jour J, tout s'est déroulé comme prévu. Merci !", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=MarcT77` },
    { id: "fallback-3", name: "Famille Durand", text: "Nous avons fait appel à eux pour notre déménagement de Paris à Chelles. Rien à redire, ils ont géré l'ensemble du processus de manière exemplaire. Une entreprise familiale sérieuse.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Durand77` },
];

const seineEtMarneCities = ["Meaux", "Chelles", "Melun", "Pontault-Combault", "Savigny-le-Temple", "Bussy-Saint-Georges", "Villeparisis", "Champs-sur-Marne", "Roissy-en-Brie", "Dammarie-les-Lys", "Lagny-sur-Marne", "Fontainebleau"];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Logistique Adaptée au 77",
        description: "Du Grand Paris aux zones rurales, nous planifions nos itinéraires pour une efficacité maximale dans le plus grand département d'Île-de-France."
    },
    {
        icon: <Users className="h-8 w-8 text-primary"/>,
        title: "Équipes Fiables et Formées",
        description: "Nos déménageurs salariés connaissent les défis du 77 et sont formés pour assurer un service de haute qualité, partout et à chaque fois."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sécurité et Soin Avant Tout",
        description: "Nous protégeons vos biens avec le meilleur matériel et des techniques d'emballage qui ont fait leurs preuves, pour une tranquillité d'esprit totale."
    },
    {
        icon: <Star className="h-8 w-8 text-primary"/>,
        title: "Un Service Client Dédié",
        description: "Votre satisfaction est notre priorité. Un conseiller unique vous accompagne du premier contact à la fin de votre emménagement."
    }
];

const faqItems = [
    {
        question: "Comment gérez-vous les longues distances au sein de la Seine-et-Marne ?",
        answer: "La taille du 77 est une spécificité que nous maîtrisons. Nous planifions nos tournées et nos trajets avec soin pour optimiser le temps et garantir la ponctualité, que vous déménagiez de Chelles à Fontainebleau ou de Melun à Meaux. Notre logistique est conçue pour couvrir efficacement tout le département."
    },
    {
        question: "Proposez-vous des services pour les déménagements de maisons avec de grands volumes ?",
        answer: "Absolument. La Seine-et-Marne compte de nombreuses zones pavillonnaires et des maisons de grand volume. Nous disposons de camions de différentes tailles et nos équipes sont expérimentées dans la gestion de déménagements importants. La visite technique gratuite nous permet de calibrer parfaitement nos moyens à vos besoins."
    },
    {
        question: "Quels sont les avantages de faire appel à vous plutôt qu'à une entreprise sans ancrage local dans le 77 ?",
        answer: "Notre connaissance du terrain est un atout majeur. Nous connaissons les axes routiers principaux, les réglementations locales spécifiques à certaines communes (comme Fontainebleau ou les villes du Grand Paris) et pouvons anticiper les difficultés logistiques. Cette expertise locale se traduit par un gain de temps, moins de stress et une meilleure efficacité."
    },
    {
        question: "Est-ce que vous fournissez des cartons et du matériel d'emballage ?",
        answer: "Oui, nous proposons plusieurs formules. De la simple fourniture de matériel professionnel (cartons de diverses tailles, adhésif, papier bulle) à la prise en charge complète de l'emballage de vos biens (formule Confort), nous nous adaptons à vos besoins et à votre budget."
    }
];


export default function SeineEtMarnePage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/seine-et-marne/1920/500"
                    alt="Paysage de Seine-et-Marne avec le château de Fontainebleau"
                    fill
                    className="object-cover"
                    data-ai-hint="fontainebleau castle landscape"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Votre spécialiste déménagement dans le 77</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Seine-et-Marne (77)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">De Meaux à Fontainebleau, Déménagement du Vexin est votre partenaire pour un déménagement maîtrisé dans le plus vaste département francilien.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/zones-intervention" className="hover:text-primary">Zones d'intervention</Link>
                <span className="mx-2">&gt;</span>
                <span>Seine-et-Marne (77)</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Déménager en Seine-et-Marne : un projet d'envergure qui mérite des experts</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           La Seine-et-Marne (77), avec sa diversité de paysages allant des pôles urbains du Grand Paris aux vastes étendues rurales, présente des défis logistiques uniques. Que vous déménagiez vers une ville nouvelle comme Marne-la-Vallée, une cité historique comme Meaux, ou une résidence en pleine nature, chaque projet est différent.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous avons l'expérience et l'équipement nécessaires pour gérer la variété des situations rencontrées dans le 77. Notre planification rigoureuse et notre connaissance des routes et des communes du département garantissent un déménagement fluide, sécurisé et adapté à votre environnement.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/melun-moving/600/400"
                            alt="Équipe de déménagement en action à Melun, Seine-et-Marne"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team city"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-seineetmarne" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le choix de l'efficacité pour votre déménagement dans le 77</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nous mettons notre expertise à votre service pour un déménagement sans stress et parfaitement organisé.</p>
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
            
            {/* Intervention Cities Section */}
             <section id="cities-seineetmarne" className="py-16">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Nous couvrons toute la Seine-et-Marne</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos équipes interviennent régulièrement sur l'ensemble du territoire du 77.</p>
                    </div>
                    <div className="mt-12 flex flex-wrap justify-center gap-3">
                        {seineEtMarneCities.map((city) => (
                            <div key={city} className="bg-background border rounded-full px-4 py-2 text-sm font-medium shadow-sm hover:bg-primary hover:text-primary-foreground transition-colors">
                                {city}
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
                            src="https://picsum.photos/seed/chelles-packing/600/400"
                            alt="Déménageur protégeant un tableau pour un déménagement à Chelles"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover packing painting"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Nos services pour votre projet en Seine-et-Marne</h2>
                         <p className="mt-4 text-muted-foreground text-lg">Nous proposons une gamme complète de prestations pour répondre à tous vos besoins de mobilité.</p>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement pour particuliers</h4>
                                    <p className="text-muted-foreground">Des formules tout inclus ou à la carte pour s'adapter à vos besoins et votre budget.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'entreprise</h4>
                                    <p className="text-muted-foreground">Nous organisons le transfert de vos bureaux pour minimiser l'impact sur votre activité.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Solutions de Garde-meubles</h4>
                                    <p className="text-muted-foreground">Besoin d'espace ? Nous offrons des solutions de stockage sécurisées, flexibles et accessibles.</p>
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
            <section id="faq-seineetmarne" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Seine-et-Marne</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Les réponses à vos interrogations pour un déménagement serein dans le 77.</p>
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
            <section id="contact-seineetmarne" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Lancez votre déménagement en Seine-et-Marne !</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez-nous pour une étude personnalisée de votre projet dans le 77 et recevez un devis gratuit et sans engagement.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Mon devis pour la Seine-et-Marne</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
