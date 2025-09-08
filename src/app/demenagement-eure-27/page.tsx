
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckCircle, MapPin, ShieldCheck, Star, Users, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";
import type { FormattedReview } from "@/app/api/reviews/route";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Clotilde Duran", text: "Une équipe très réactive et très professionnelle, vraiment rien à dire, du très bon travail! Les affaires ont été emballées avec le plus grand soin. Nous conseillons les yeux fermés!", rating: 5, createTime: "il y a 2 ans", avatarUrl: `https://i.pravatar.cc/48?u=Clotilde` },
    { id: "fallback-2", name: "Jean-michel Marot", text: "Un déménagement en Bretagne parfaitement réalisé. Professionnel du début jusqu'à la livraison finale. Très bon contact. Équipe efficace, rapide, et sympathique. Travail de qualité.", rating: 5, createTime: "il y a 2 ans", avatarUrl: `https://i.pravatar.cc/48?u=Jean-michel` },
    { id: "fallback-3", name: "Robert GALAND", text: "Une interlocutrice réactive, une équipe ultra efficace, des affaires très bien protégées. Rapidité, professionnalisme. On voit le côté 'familial' sans prestataire ou intérimaire. Sincèrement je suis bluffé. Je recommande totalement. MERCI", rating: 5, createTime: "il y a 19 jours", avatarUrl: `https://i.pravatar.cc/48?u=Robert` },
];

const eureCities = [
    { name: "Évreux", link: "/demenagement-evreux-27000"},
    { name: "Vernon", link: "/demenagement-vernon-27200"},
    { name: "Louviers", link: "/demenagement-louviers-27400"},
    { name: "Val-de-Reuil", link: "/demenagement-val-de-reuil-27100"},
    { name: "Gisors", link: "#"},
    { name: "Bernay", link: "#"},
    { name: "Pont-Audemer", link: "#"},
    { name: "Les Andelys", link: "#"},
    { name: "Gaillon", link: "#"},
    { name: "Verneuil d'Avre et d'Iton", link: "#"}
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Votre Agence Locale à Évreux",
        description: "Notre agence à Évreux nous permet une réactivité et une connaissance inégalées du terrain dans tout le département de l'Eure."
    },
    {
        icon: <Users className="h-8 w-8 text-primary"/>,
        title: "Des Équipes Normandes",
        description: "Nos déménageurs sont des professionnels locaux, engagés à fournir un service de qualité et de proximité à leurs voisins."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Expertise Urbaine et Rurale",
        description: "Nous sommes aussi à l'aise pour un déménagement en centre-ville d'Évreux que pour une maison en campagne dans le Vexin normand."
    },
    {
        icon: <Star className="h-8 w-8 text-primary"/>,
        title: "La Qualité avant Tout",
        description: "Un interlocuteur unique, un devis transparent et un service client réactif pour une expérience de déménagement sans stress."
    }
];

const faqItems = [
    {
        question: "Quels sont les avantages de votre agence à Évreux pour un déménagement dans l'Eure ?",
        answer: "Notre agence d'Évreux est notre base pour toute la Normandie. Cela nous permet d'être extrêmement réactifs pour réaliser des visites techniques gratuites, de mieux planifier la logistique et de vous offrir des tarifs compétitifs en minimisant les frais d'approche. C'est l'assurance d'un service de proximité par des gens qui connaissent votre région."
    },
    {
        question: "Comment se passe un déménagement dans une maison normande avec des accès difficiles ?",
        answer: "C'est une situation que nous rencontrons souvent. Nous effectuons une visite en amont pour évaluer les accès. Nous disposons d'une flotte de véhicules de différentes tailles pour nous adapter aux routes de campagne ou aux cours de ferme étroites. Nos équipes sont expertes en manutention délicate pour protéger vos biens et votre propriété."
    },
    {
        question: "Intervenez-vous sur tout le département de l'Eure ?",
        answer: "Oui, notre agence d'Évreux rayonne sur l'ensemble du département de l'Eure (27) et sur toute la Normandie. De Vernon à Bernay, de Louviers à Gisors, nos équipes se déplacent partout où votre projet de vie vous mène."
    },
    {
        question: "Je quitte l'Eure pour une autre région, pouvez-vous m'aider ?",
        answer: "Absolument. Nous sommes des spécialistes du déménagement national. Que vous partiez pour Paris, la Bretagne, le Sud de la France ou ailleurs, nous organisons votre déménagement longue distance au départ de l'Eure avec le même professionnalisme et la même rigueur."
    }
];


export default function EurePage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/eure-landscape/1920/500"
                    alt="Paysage de campagne dans l'Eure (27)"
                    fill
                    className="object-cover"
                    data-ai-hint="normandy landscape france"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Votre déménageur de proximité dans l'Eure</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Eure (27)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">Avec notre agence à Évreux, bénéficiez d'un service expert et local pour votre déménagement dans l'Eure et toute la Normandie.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/zones-intervention" className="hover:text-primary">Zones d'intervention</Link>
                <span className="mx-2">&gt;</span>
                <span>Eure (27)</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Votre déménagement dans l'Eure en toute confiance avec notre agence d'Évreux</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager dans l'Eure (27), c'est choisir un département au riche patrimoine, entre la vallée de la Seine et la campagne normande. Pour réussir ce projet, il est essentiel de s'appuyer sur un partenaire qui connaît parfaitement le territoire.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Grâce à notre agence implantée à Évreux, Déménagement du Vexin est votre interlocuteur privilégié. Notre équipe locale vous apporte son expertise du terrain, sa réactivité et une qualité de service irréprochable pour que votre déménagement, que ce soit à Vernon, Louviers, ou n'importe où dans l'Eure, soit une parfaite réussite.
                        </p>
                         <Button asChild className="mt-6">
                            <Link href="/demenagement-du-vexin-evreux">Découvrir notre agence d'Évreux</Link>
                         </Button>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/evreux-team/600/400"
                            alt="Agence Déménagement du Vexin à Évreux"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="local office building"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-eure" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">L'avantage d'un expert local pour votre projet dans le 27</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nous sommes un acteur normand, et cela fait toute la différence.</p>
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
             <section id="cities-eure" className="py-16">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Nous couvrons l'ensemble de l'Eure et de la Normandie</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos équipes d'Évreux interviennent sur toutes les communes du département et au-delà.</p>
                    </div>
                     <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {eureCities.map((city) => (
                            <Button asChild variant="outline" className="justify-start" key={city.name}>
                                <Link href={city.link}>
                                    {city.name}
                                    <ArrowRight className="ml-auto h-4 w-4" />
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
             </section>

             {/* Services Section */}
            <section className="py-16 bg-muted/50">
                 <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1">
                        <Image
                            src="https://picsum.photos/seed/eure-packing/600/400"
                            alt="Déménageur protégeant une armoire normande"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover packing antique furniture"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Nos services pour votre projet dans l'Eure</h2>
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
                                    <h4 className="font-semibold">Garde-meubles à Évreux</h4>
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
            <section id="faq-eure" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Eure</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Vos interrogations, nos réponses claires pour un projet dans le 27.</p>
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
            <section id="contact-eure" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Lancez votre déménagement dans l'Eure !</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez notre agence d'Évreux pour une étude personnalisée et recevez un devis gratuit et sans engagement.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Mon devis pour l'Eure</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
