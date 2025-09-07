
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

const valDOiseCities = [
    { name: "Cergy", link: "/demenagement-cergy-95000" },
    { name: "Pontoise", link: "/demenagement-pontoise-95300" },
    { name: "Argenteuil", link: "/demenagement-argenteuil-95100" },
    { name: "Sarcelles", link: "/demenagement-sarcelles-95200" },
    { name: "Garges-lès-Gonesse", link: "/demenagement-garges-les-gonesse-95140" },
    { name: "Franconville", link: "/demenagement-franconville-95130" },
    { name: "Goussainville", link: "/demenagement-goussainville-95190" },
    { name: "Ermont", link: "#" },
    { name: "Taverny", link: "#" },
    { name: "Villiers-le-Bel", link: "#" },
    { name: "L'Isle-Adam", link: "#" },
    { name: "Méry-sur-Oise", link: "#" }
];


const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Notre Département, Notre Expertise",
        description: "Basés au cœur du Val-d'Oise, nous connaissons chaque ville, chaque route, chaque quartier. Cette expertise locale est un gage d'efficacité et de sérénité pour vous."
    },
    {
        icon: <Users className="h-8 w-8 text-primary"/>,
        title: "Une Équipe du Vexin",
        description: "Nos déménageurs sont des professionnels salariés de la région, fiers de leur travail et engagés à fournir un service de la plus haute qualité."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Protection Adaptée",
        description: "Que vous soyez en appartement à Cergy ou dans une maison du Vexin, nous adaptons nos techniques et notre matériel pour protéger parfaitement vos biens."
    },
    {
        icon: <Star className="h-8 w-8 text-primary"/>,
        title: "La Confiance de nos Voisins",
        description: "Notre excellente réputation dans le 95 est notre plus grande fierté. Nous nous engageons à honorer la confiance que nos clients nous accordent chaque jour."
    }
];

const faqItems = [
    {
        question: "Gérez-vous les déménagements dans les nouveaux quartiers de Cergy-Pontoise ?",
        answer: "Oui, parfaitement. Nous connaissons bien l'agglomération de Cergy-Pontoise, y compris les résidences les plus récentes. Nous nous renseignons sur les règlements de copropriété pour les accès et horaires, et nous planifions l'intervention pour une efficacité maximale."
    },
    {
        question: "Comment se déroule un déménagement dans un village du Vexin avec des accès étroits ?",
        answer: "C'est notre cœur de métier. Une visite technique est souvent réalisée pour évaluer les accès. Nous disposons de véhicules de plus petite taille pour nous approcher au plus près et nos équipes sont expertes en manutention, même sur de longues distances de portage."
    },
    {
        question: "Est-ce que vous intervenez dans des villes denses comme Argenteuil ou Sarcelles ?",
        answer: "Absolument. Nous maîtrisons les défis des zones urbaines denses du Val-d'Oise. Nous gérons les demandes d'autorisation de stationnement et nous pouvons utiliser des monte-meubles pour les étages élevés, garantissant un déménagement rapide et sécurisé."
    },
    {
        question: "Quels sont vos délais pour un déménagement au sein du Val-d'Oise ?",
        answer: "En tant qu'acteur local, nous offrons une grande réactivité. Idéalement, contactez-nous 2 à 3 semaines à l'avance. Cependant, nous nous efforçons toujours de trouver des solutions pour des besoins plus urgents. N'hésitez pas à nous appeler pour connaître nos disponibilités."
    }
];


export default function ValDOisePage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/val-d-oise/1920/500"
                    alt="Paysage du Vexin Français dans le Val-d'Oise"
                    fill
                    className="object-cover"
                    data-ai-hint="vexin landscape france"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Votre déménageur de confiance dans le Val-d'Oise</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Val-d'Oise (95)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">L'expertise d'un acteur local pour un déménagement serein à Cergy, Pontoise, Argenteuil et dans tout le 95.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/zones-intervention" className="hover:text-primary">Zones d'intervention</Link>
                <span className="mx-2">&gt;</span>
                <span>Val-d'Oise (95)</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Votre déménagement dans le Val-d'Oise, notre terrain d'excellence</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Le Val-d'Oise (95), notre département d'origine, est un territoire que nous connaissons sur le bout des doigts. De la ville nouvelle de Cergy-Pontoise aux villages de charme du Vexin français, en passant par les zones denses d'Argenteuil et Sarcelles, nous maîtrisons la diversité et les spécificités de chaque secteur.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Faire appel à Déménagement du Vexin, c'est choisir un partenaire qui parle le même langage que vous, qui comprend les enjeux locaux et qui met un point d'honneur à servir sa communauté avec un professionnalisme et une fiabilité sans faille.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/pontoise-moving/600/400"
                            alt="Équipe de Déménagement du Vexin à Pontoise"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team old town"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-valdoise" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le choix de l'expert local pour votre déménagement dans le 95</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nous sommes d'ici, et ça fait toute la différence.</p>
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
             <section id="cities-valdoise" className="py-16">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Nous couvrons l'ensemble du Val-d'Oise</h2>
                        <p className="mt-4 text-muted-foreground text-lg">De l'aéroport de Roissy aux boucles de la Seine, nos équipes sont chez elles dans tout le département.</p>
                    </div>
                    <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {valDOiseCities.map((city) => (
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
                            src="https://picsum.photos/seed/cergy-packing/600/400"
                            alt="Déménageur protégeant un meuble dans un appartement à Cergy"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover protecting furniture apartment"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Nos services pour votre projet dans le 95</h2>
                         <p className="mt-4 text-muted-foreground text-lg">Nous proposons une gamme complète de prestations pour répondre à tous vos besoins de mobilité.</p>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement pour particuliers</h4>
                                    <p className="text-muted-foreground">Des formules sur-mesure, de la plus économique à la plus complète, pour s'adapter à vos besoins.</p>
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
                                    <p className="text-muted-foreground">Besoin de stocker vos affaires ? Profitez de nos solutions de stockage sécurisées.</p>
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
            <section id="faq-valdoise" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Val-d'Oise</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Les réponses à vos interrogations pour un déménagement serein dans le 95.</p>
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
            <section id="contact-valdoise" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Lancez votre déménagement dans le Val-d'Oise !</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez votre expert local pour une étude personnalisée de votre projet et recevez un devis gratuit et sans engagement.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Mon devis pour le Val-d'Oise</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
