
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Truck, Users, Building, Castle, TreePine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Chevalier", text: "Déménager à Vincennes, près du château, demande des pros. L'équipe a été exceptionnelle : discrète, efficace et très soigneuse. Un service irréprochable.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Chevalier94` },
    { id: "fallback-2", name: "Hélène B.", text: "Le service était parfait. Ils ont géré les accès difficiles de ma rue et protégé les parties communes de l'immeuble avec un soin impressionnant. Je recommande à 100%.", rating: 5, createTime: "il y a 7 mois", avatarUrl: `https://i.pravatar.cc/48?u=HeleneB94` },
    { id: "fallback-3", name: "Cabinet d'avocats", text: "Le transfert de notre cabinet s'est déroulé à la perfection. Ponctualité, efficacité et confidentialité. Une entreprise sur qui l'on peut compter.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Avocats94` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Vincennes",
        description: "Du Carré Magique au quartier des Vignerons, nous connaissons les rues, les accès et les réglementations pour une logistique d'excellence."
    },
    {
        icon: <Castle className="h-8 w-8 text-primary"/>,
        title: "Respect du Patrimoine",
        description: "Nous intervenons avec un soin infini dans les immeubles de caractère, en protégeant parquets, moulures et parties communes."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Maîtrise des accès complexes",
        description: "Monte-meubles, véhicules adaptés... Nous avons les solutions pour les rues étroites et les cours intérieures du centre-ville."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Confidentialité & Sécurité",
        description: "Nous garantissons une discrétion absolue et une sécurité maximale pour le déménagement de vos biens les plus précieux."
    }
];

const faqItems = [
    {
        question: "Comment gérez-vous un déménagement dans les rues étroites autour du château ?",
        answer: "C'est une situation que nous maîtrisons parfaitement. La clé est une visite technique en amont pour définir la meilleure logistique. Nous utilisons des véhicules de taille adaptée et nous nous chargeons de la demande d'autorisation de stationnement auprès de la mairie, ce qui est indispensable pour une intervention réussie."
    },
    {
        question: "Le monte-meubles est-il souvent nécessaire à Vincennes ?",
        answer: "Oui, c'est un outil essentiel pour de nombreux déménagements à Vincennes. Beaucoup d'immeubles, même prestigieux, n'ont pas d'ascenseur adapté. Le monte-meubles garantit la sécurité de vos meubles, protège les magnifiques cages d'escalier et optimise le temps de l'intervention."
    },
    {
        question: "Faites-vous preuve de discrétion pendant vos interventions ?",
        answer: "La discrétion est une de nos priorités absolues, surtout dans une ville comme Vincennes. Nos équipes sont formées pour travailler de manière efficace, silencieuse et respectueuse de votre tranquillité et de celle de votre voisinage."
    },
    {
        question: "Quelles garanties offrez-vous pour les objets de valeur et le mobilier ancien ?",
        answer: "Nous proposons des assurances sur mesure (ad valorem) pour couvrir vos biens à leur juste valeur. De plus, nos équipes utilisent des techniques d'emballage professionnelles avec du matériel de pointe (caisses pour tableaux, papier de soie, bull-kraft) pour une protection maximale."
    }
];


export default function VincennesPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/vincennes/1920/500"
                    alt="Le Château de Vincennes"
                    fill
                    className="object-cover"
                    data-ai-hint="vincennes castle"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Déménageur d'exception à Vincennes</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Vincennes (94300)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">Un service haut de gamme pour votre déménagement dans la cité royale, aux portes de Paris.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-val-de-marne-94" className="hover:text-primary">Val-de-Marne (94)</Link>
                <span className="mx-2">&gt;</span>
                <span>Vincennes</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un service d'excellence pour déménager à Vincennes</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Vincennes, ville prestigieuse au patrimoine historique exceptionnel, requiert un niveau de soin, de discrétion et de savoir-faire à la hauteur des lieux. Les immeubles de caractère, les rues charmantes et le voisinage exigeant imposent de faire appel à des déménageurs experts.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous avons une connaissance aiguë des particularités de Vincennes. Nous planifions chaque intervention avec une rigueur absolue pour préserver votre patrimoine et celui de la ville, tout en garantissant un service fluide et sans stress.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/vincennes-move/600/400"
                            alt="Équipe de déménagement professionnelle intervenant à Vincennes"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team historic city"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-vincennes" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire privilégié pour votre déménagement à Vincennes</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Notre expertise est votre meilleure garantie pour un déménagement serein.</p>
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
                            src="https://picsum.photos/seed/vincennes-packing/600/400"
                            alt="Déménageur emballant avec soin une œuvre d'art"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover packing artwork"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des prestations sur-mesure pour un déménagement de prestige</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'appartements de standing</h4>
                                    <p className="text-muted-foreground">Une expertise pointue pour la protection de vos biens et des parties communes prestigieuses.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement de maisons de ville</h4>
                                    <p className="text-muted-foreground">Une logistique adaptée aux grands volumes et à la manipulation d'objets de valeur.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Formule "Prestige" clé en main</h4>
                                    <p className="text-muted-foreground">Nous gérons tout, de l'emballage à la réinstallation, pour votre confort absolu.</p>
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
            <section id="faq-vincennes" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Vincennes</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Vincennes.</p>
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
            <section id="contact-vincennes" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Vincennes</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos conseillers pour une étude personnalisée de votre projet et obtenez un devis à la hauteur de vos attentes.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Vincennes</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
