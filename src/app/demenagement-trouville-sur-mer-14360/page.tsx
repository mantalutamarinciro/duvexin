
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Home, Users, Fish, Truck, Gem, Waves } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Gaudin", text: "Notre déménagement dans notre maison de Trouville a été géré à la perfection. L'équipe a su s'adapter aux rues étroites et à l'affluence de la saison. Un service irréprochable.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Gaudin14` },
    { id: "fallback-2", name: "H. de la Roche", text: "Excellent service. Ils ont su gérer le stationnement en pleine saison et le déménagement de mon appartement s'est fait sans une égratignure. Je recommande vivement.", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=HdeLaRoche14` },
    { id: "fallback-3", name: "Restaurant Le Quai", text: "Le déménagement de notre matériel de cuisine a été réalisé avec un soin infini. Une équipe de confiance pour les professionnels.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Quai14` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Trouville",
        description: "Des quais au boulevard, nous connaissons les accès et les réglementations de la Reine des Plages."
    },
    {
        icon: <Gem className="h-8 w-8 text-primary"/>,
        title: "Respect des Villas et Demeures",
        description: "Nous intervenons avec un soin particulier dans les villas Belle Époque et les appartements de caractère, en protégeant les lieux et vos biens."
    },
    {
        icon: <Fish className="h-8 w-8 text-primary"/>,
        title: "Gestion des accès portuaires",
        description: "Nous planifions nos interventions en tenant compte de l'activité du port de pêche et de la circulation sur les quais."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "La Proximité de l'Agence d'Évreux",
        description: "Notre base locale nous permet d'être réactifs et compétitifs pour tous vos projets sur la Côte Fleurie."
    }
];

const faqItems = [
    {
        question: "Comment se passe un déménagement en haute saison à Trouville ?",
        answer: "La clé est l'anticipation. Nous déposons les demandes d'autorisation de stationnement très en avance et nous privilégions les interventions en début de semaine pour éviter les pics d'affluence du week-end. Notre efficacité sur place permet de minimiser le temps d'intervention."
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
        question: "Mon appartement se trouve dans une rue piétonne, comment faites-vous ?",
        answer: "C'est une situation que nous gérons en obtenant des autorisations d'accès spécifiques pour des créneaux horaires définis, généralement tôt le matin. Nous utilisons alors des véhicules de plus petite taille et du matériel de manutention adapté pour effectuer le déménagement dans le respect des règles et des riverains."
    }
];


export default function TrouvillePage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/trouville/1920/500"
                    alt="Le port de pêche de Trouville-sur-Mer"
                    fill
                    className="object-cover"
                    data-ai-hint="Trouville harbor fishing boats"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement à Trouville</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Trouville-sur-Mer</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">Un service d'excellence pour votre projet dans la charmante station balnéaire de la Côte Fleurie.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-calvados-14" className="hover:text-primary">Calvados (14)</Link>
                <span className="mx-2">&gt;</span>
                <span>Trouville-sur-Mer</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui connaît l'authenticité de Trouville</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Trouville-sur-Mer, c'est choisir le charme authentique d'un port de pêche et l'élégance d'une station balnéaire historique. Ce cadre unique demande un service de déménagement qui allie respect du patrimoine, discrétion et logistique sans faille.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Grâce à notre agence normande, nous sommes votre expert de proximité pour Trouville. Que vous emménagiez dans une villa sur les hauteurs ou un appartement près du casino, nous vous garantissons un déménagement serein et parfaitement orchestré.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/trouville-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Trouville"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team seaside village"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-trouville" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Trouville</h2>
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
                            src="https://picsum.photos/seed/trouville-packing/600/400"
                            alt="Déménageur emballant avec soin des objets de valeur"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing luxury"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux résidents de Trouville</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement de résidences principales et secondaires</h4>
                                    <p className="text-muted-foreground">Une expertise particulière pour les déménagements de villas et d'appartements de caractère.</p>
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
            <section id="faq-trouville" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Trouville</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Trouville-sur-Mer.</p>
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
            <section id="contact-trouville" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Trouville</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Trouville</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
