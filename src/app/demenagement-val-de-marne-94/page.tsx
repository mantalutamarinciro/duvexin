
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckCircle, MapPin, ShieldCheck, Star, Users, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";
import type { FormattedReview } from "@/app/api/reviews/route";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Martin", text: "Déménagement de notre maison à Saint-Maur-des-Fossés géré avec un grand professionnalisme. L'équipe était efficace et très soigneuse avec nos affaires.", rating: 5, createTime: "il y a 4 mois", avatarUrl: `https://i.pravatar.cc/48?u=Martin94` },
    { id: "fallback-2", name: "M. Dubois", text: "Service impeccable pour mon appartement à Vincennes. Ils ont géré les contraintes de stationnement sans aucun problème. Je recommande sans hésiter.", rating: 5, createTime: "il y a 7 mois", avatarUrl: `https://i.pravatar.cc/48?u=Dubois94` },
    { id: "fallback-3", name: "Société Innov+", text: "Transfert de nos bureaux à Créteil réalisé dans les temps. L'équipe a été rapide et a minimisé l'impact sur notre activité. Parfait.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Innov94` },
];

const valDeMarneCities = [
    { name: "Créteil", link: "/demenagement-creteil-94000"},
    { name: "Vitry-sur-Seine", link: "/demenagement-vitry-sur-seine-94400"},
    { name: "Champigny-sur-Marne", link: "/demenagement-champigny-sur-marne-94500"},
    { name: "Saint-Maur-des-Fossés", link: "/demenagement-saint-maur-des-fosses-94100"},
    { name: "Ivry-sur-Seine", link: "/demenagement-ivry-sur-seine-94200"},
    { name: "Maisons-Alfort", link: "/demenagement-maisons-alfort-94700"},
    { name: "Fontenay-sous-Bois", link: "/demenagement-fontenay-sous-bois-94120"},
    { name: "Vincennes", link: "/demenagement-vincennes-94300" },
    { name: "Alfortville", link: "/demenagement-alfortville-94140" },
    { name: "Choisy-le-Roi", link: "/demenagement-choisy-le-roi-94600" },
    { name: "Le Perreux-sur-Marne", link: "/demenagement-le-perreux-sur-marne-94170" },
    { name: "Nogent-sur-Marne", link: "/demenagement-nogent-sur-marne-94130" },
    { name: "Saint-Mandé", link: "/demenagement-saint-mande-94220" },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise du Val-de-Marne",
        description: "De la densité de la petite couronne aux zones pavillonnaires, nous connaissons les particularités de chaque ville du 94 pour une logistique optimisée."
    },
    {
        icon: <Users className="h-8 w-8 text-primary"/>,
        title: "Équipes professionnelles dédiées",
        description: "Nos déménageurs sont des salariés expérimentés et formés, garantissant un service fiable et une qualité constante pour votre déménagement."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sécurité de vos biens",
        description: "Nous utilisons du matériel de protection de haute qualité et des techniques d'emballage éprouvées pour que tout arrive à destination en parfait état."
    },
    {
        icon: <Star className="h-8 w-8 text-primary"/>,
        title: "Satisfaction client prouvée",
        description: "Notre réputation dans le Val-de-Marne s'est construite sur la satisfaction de nos clients. Votre sérénité est notre meilleure récompense."
    }
];

const faqItems = [
    {
        question: "Comment gérez-vous le stationnement dans les zones denses comme Vincennes ou Saint-Mandé ?",
        answer: "Nous avons une grande expérience des communes denses du Val-de-Marne. Nous nous chargeons de toutes les démarches pour obtenir les autorisations de stationnement nécessaires auprès des mairies. Cela nous permet de sécuriser un emplacement pour notre camion au plus près de votre domicile et d'assurer un déroulement fluide le jour J."
    },
    {
        question: "Proposez-vous des solutions pour les déménagements en appartement dans les grands ensembles de Créteil ou Vitry ?",
        answer: "Oui, absolument. Nous sommes équipés pour intervenir dans tous types d'habitations. Nous évaluons en amont les accès, la présence d'ascenseurs et si nécessaire, nous pouvons déployer un monte-meubles pour passer par la fenêtre. Cela permet de protéger les parties communes et de déménager rapidement et en toute sécurité."
    },
    {
        question: "Quels sont vos délais d'intervention pour un déménagement dans le 94 ?",
        answer: "Grâce à notre proximité, nous sommes très réactifs dans le Val-de-Marne. Nous conseillons de nous contacter 3 à 4 semaines à l'avance pour planifier sereinement. Cependant, n'hésitez pas à nous appeler pour des besoins plus urgents, nous ferons de notre mieux pour trouver une solution."
    },
    {
        question: "Déménagez-vous aussi les maisons avec jardin dans des villes comme Saint-Maur ou La Varenne-Saint-Hilaire ?",
        answer: "Bien sûr. Notre expertise couvre aussi bien les appartements que les pavillons. Pour les maisons, nous prêtons une attention particulière à la protection des sols, des murs et des jardins lors du passage de vos meubles. Nous adaptons notre logistique à la configuration de votre domicile."
    }
];


export default function ValDeMarnePage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/val-de-marne/1920/500"
                    alt="Vue sur les bords de Marne, symbole du Val-de-Marne (94)"
                    fill
                    className="object-cover"
                    data-ai-hint="river Marne cityscape"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Votre déménageur de confiance dans le 94</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Val-de-Marne (94)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">De Vincennes à Créteil, Déménagement du Vexin est votre expert local pour un déménagement efficace et serein dans le Val-de-Marne.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/zones-intervention" className="hover:text-primary">Zones d'intervention</Link>
                <span className="mx-2">&gt;</span>
                <span>Val-de-Marne (94)</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménagement sur-mesure dans le Val-de-Marne</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Le Val-de-Marne (94) est un département aux multiples facettes, mêlant l'effervescence des villes proches de Paris comme Vincennes et Ivry, le dynamisme de grands centres comme Créteil, et le calme des zones pavillonnaires le long de la Marne. Déménager dans le 94 requiert une adaptabilité et une connaissance précise du terrain.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous mettons notre expertise locale à votre service. Nous connaissons les réglementations de chaque commune, les astuces pour optimiser la logistique et les meilleures approches pour chaque type de logement, de l'appartement en centre-ville à la maison en bord de Marne.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/creteil-move/600/400"
                            alt="Équipe de déménagement travaillant à Créteil"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team urban"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-valdemarne" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">L'avantage Déménagement du Vexin dans le 94</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nous combinons la puissance d'un réseau structuré avec l'agilité et la connaissance d'un acteur local.</p>
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
             <section id="cities-valdemarne" className="py-16">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Nous couvrons tout le Val-de-Marne</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos équipes interviennent quotidiennement dans l'ensemble des communes du département.</p>
                    </div>
                    <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {valDeMarneCities.sort((a, b) => a.name.localeCompare(b.name)).map((city) => (
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
                            src="https://picsum.photos/seed/vincennes-packing/600/400"
                            alt="Déménageur emballant avec soin un objet fragile pour un déménagement à Vincennes"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover packing fragile"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Nos services pour votre déménagement dans le 94</h2>
                         <p className="mt-4 text-muted-foreground text-lg">Nous proposons une gamme complète de prestations pour répondre à tous vos besoins.</p>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement de particuliers et entreprises</h4>
                                    <p className="text-muted-foreground">Formules adaptées, de l'économique au tout-compris, pour les familles et les professionnels.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Location de monte-meubles</h4>
                                    <p className="text-muted-foreground">Indispensable pour les étages élevés et les accès difficiles, nous gérons tout pour vous.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Garde-meubles et stockage</h4>
                                    <p className="text-muted-foreground">Besoin de stocker vos affaires ? Profitez de nos solutions de stockage sécurisées dans le 94.</p>
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
            <section id="faq-valdemarne" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Val-de-Marne</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses à vos questions les plus courantes pour un projet dans le 94.</p>
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
            <section id="contact-valdemarne" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement dans le Val-de-Marne</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez-nous pour une visite technique gratuite ou pour recevoir un devis détaillé et personnalisé pour votre projet dans le 94.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Mon devis pour le Val-de-Marne</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
