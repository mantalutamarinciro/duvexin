
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckCircle, MapPin, ShieldCheck, Star, Users, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";
import type { FormattedReview } from "@/app/api/reviews/route";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Gauthier", text: "Un déménagement de la région parisienne vers notre nouvelle maison dans l'Orne qui s'est déroulé à merveille. L'équipe a été très professionnelle et attentionnée.", rating: 5, createTime: "il y a 4 mois", avatarUrl: `https://i.pravatar.cc/48?u=Gauthier61` },
    { id: "fallback-2", name: "Sophie D.", text: "Service impeccable et réactif. Notre agence d'Évreux est un vrai plus pour la région. Je recommande sans hésiter.", rating: 5, createTime: "il y a 9 mois", avatarUrl: `https://i.pravatar.cc/48?u=SophieD61` },
    { id: "fallback-3", name: "Marc L.", text: "Devis clair, équipe ponctuelle et matériel de qualité. Mon déménagement s'est déroulé sans stress grâce à leur organisation.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=MarcL61` },
];

const orneCities = ["Alençon", "Flers", "Argentan", "L'Aigle", "La Ferté-Macé", "Mortagne-au-Perche", "Sées", "Vimoutiers", "Gacé", "Domfront en Poiraie"];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de l'Orne",
        description: "Du Perche aux collines de Normandie, notre agence d'Évreux nous offre une connaissance approfondie de l'Orne pour une logistique parfaite."
    },
    {
        icon: <Users className="h-8 w-8 text-primary"/>,
        title: "Équipes Normandes Expérimentées",
        description: "Nos équipes locales sont réactives et connaissent la région, garantissant un service de proximité de haute qualité."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Soin et Protection",
        description: "Que vous déménagiez un appartement à Alençon ou une longère dans le Perche, nous protégeons vos biens avec le plus grand soin."
    },
    {
        icon: <Star className="h-8 w-8 text-primary"/>,
        title: "Qualité et Fiabilité",
        description: "Un interlocuteur unique, un devis transparent et un service client à votre écoute pour un déménagement maîtrisé."
    }
];

const faqItems = [
    {
        question: "Comment se déroule un déménagement dans une maison de campagne dans l'Orne avec des accès difficiles ?",
        answer: "C'est une situation que nous connaissons très bien en Normandie. Nous réalisons systématiquement une visite technique gratuite pour évaluer les accès. Nous disposons de véhicules de différentes tailles pour nous adapter aux chemins ruraux ou aux cours de ferme étroites. Nos équipes sont expertes en manutention délicate pour protéger vos biens et votre propriété."
    },
    {
        question: "Intervenez-vous sur tout le département de l'Orne ?",
        answer: "Oui, notre agence d'Évreux nous permet de rayonner sur l'ensemble de l'Orne (61). D'Alençon à Flers, en passant par Argentan et les communes plus rurales, nos équipes se déplacent partout où votre projet de vie vous mène."
    },
    {
        question: "Je quitte l'Orne pour une autre région, pouvez-vous m'aider ?",
        answer: "Absolument. Nous sommes des spécialistes du déménagement national. Que vous partiez pour Paris, la Bretagne, le Sud de la France ou ailleurs, nous organisons votre déménagement longue distance au départ de l'Orne avec le même professionnalisme et la même rigueur."
    },
    {
        question: "Quels sont les avantages de votre agence d'Évreux pour un déménagement dans l'Orne ?",
        answer: "Notre agence d'Évreux est notre base pour toute la Normandie. Sa position nous permet d'être très réactifs pour organiser des visites techniques, de planifier efficacement la logistique et de vous offrir un service de proximité par des équipes qui connaissent votre région."
    }
];


export default function OrnePage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/orne-landscape/1920/500"
                    alt="Paysage vallonné de l'Orne"
                    fill
                    className="object-cover"
                    data-ai-hint="normandy countryside"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Votre déménageur expert en Normandie</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Orne (61)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">D'Alençon à Flers, Déménagement du Vexin vous accompagne pour votre projet dans tout le département de l'Orne.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/zones-intervention" className="hover:text-primary">Zones d'intervention</Link>
                <span className="mx-2">&gt;</span>
                <span>Orne (61)</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Votre déménagement dans l'Orne en toute confiance avec notre agence normande</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager dans l'Orne (61), c'est choisir un département au riche patrimoine naturel et historique, au cœur de la Normandie. Pour réussir ce projet, il est essentiel de s'appuyer sur un partenaire qui connaît le territoire.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Grâce à notre agence d'Évreux, Déménagement du Vexin est votre interlocuteur privilégié. Notre équipe locale vous apporte son expertise du terrain, sa réactivité et une qualité de service irréprochable pour que votre déménagement, que ce soit à Alençon, Flers, ou n'importe où dans l'Orne, soit une parfaite réussite.
                        </p>
                         <Button asChild className="mt-6">
                            <Link href="/demenagement-du-vexin-evreux">Découvrir notre agence d'Évreux</Link>
                         </Button>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/alencon-moving/600/400"
                            alt="Équipe de déménagement professionnelle intervenant à Alençon"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team historic town"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-orne" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">L'expert normand pour votre projet dans le 61</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nous sommes un acteur local, et cela fait toute la différence.</p>
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
             <section id="cities-orne" className="py-16">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Nous couvrons l'ensemble du département de l'Orne</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos équipes d'Évreux interviennent sur toutes les communes du département.</p>
                    </div>
                     <div className="mt-12 flex flex-wrap justify-center gap-3">
                        {orneCities.map((city) => (
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
                            src="https://picsum.photos/seed/orne-packing/600/400"
                            alt="Déménageur protégeant un meuble ancien"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover protecting antique furniture"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Nos services pour votre projet dans l'Orne</h2>
                         <p className="mt-4 text-muted-foreground text-lg">Nous proposons une gamme complète de prestations pour répondre à tous vos besoins.</p>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement pour particuliers</h4>
                                    <p className="text-muted-foreground">Des formules sur-mesure pour s'adapter à votre budget et à vos besoins spécifiques.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'entreprise</h4>
                                    <p className="text-muted-foreground">Nous organisons le transfert de vos bureaux ou de votre commerce pour minimiser l'impact sur votre activité.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Garde-meubles près de chez vous</h4>
                                    <p className="text-muted-foreground">Besoin d'une solution de stockage ? Nous proposons des box sécurisés pour de courtes ou longues durées.</p>
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
            <section id="faq-orne" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Orne</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Vos interrogations, nos réponses claires pour un projet dans le 61.</p>
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
            <section id="contact-orne" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Lancez votre déménagement dans l'Orne !</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez notre agence normande pour une étude personnalisée et recevez un devis gratuit pour votre projet dans le 61.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Mon devis pour l'Orne</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
