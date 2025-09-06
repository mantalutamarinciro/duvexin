
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckCircle, MapPin, ShieldCheck, Star, Users, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";
import type { FormattedReview } from "@/app/api/reviews/route";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Dubois", text: "Notre déménagement de Paris à Versailles a été une réussite totale grâce à Déménagement du Vexin. Ponctuels, soigneux et très sympathiques. On sent l'expertise du secteur.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Dubois` },
    { id: "fallback-2", name: "M. Martin", text: "Très professionnels pour mon déménagement à Saint-Germain-en-Laye. Ils ont parfaitement géré les accès un peu compliqués. Je recommande vivement.", rating: 5, createTime: "il y a 6 mois", avatarUrl: `https://i.pravatar.cc/48?u=Martin` },
    { id: "fallback-3", name: "Sophie L.", text: "Une équipe au top ! Efficaces et à l'écoute pour notre installation à Rambouillet. Tout est arrivé en parfait état. Merci !", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=SophieL` },
];

const yvelinesCities = [
    { name: "Versailles", link: "/demenagement-versailles-78000" },
    { name: "Saint-Germain-en-Laye", link: "/demenagement-saint-germain-en-laye-78100" },
    { name: "Rambouillet", link: "/demenagement-rambouillet-78120" },
    { name: "Poissy", link: "/demenagement-poissy-78300" },
    { name: "Sartrouville", link: "/demenagement-sartrouville-78500" },
    { name: "Mantes-la-Jolie", link: "/demenagement-mantes-la-jolie-78200" },
    { name: "Conflans-Sainte-Honorine", link: "/demenagement-conflans-sainte-honorine-78700" },
    { name: "Plaisir", link: "/demenagement-plaisir-78370" },
    { name: "Le Chesnay-Rocquencourt", link: "/demenagement-le-chesnay-rocquencourt-78150" },
    { name: "Vélizy-Villacoublay", link: "/demenagement-velizy-villacoublay-78140" },
    { name: "Montigny-le-Bretonneux", link: "/demenagement-montigny-le-bretonneux-78180" },
    { name: "Les Mureaux", link: "/demenagement-les-mureaux-78130" }
];


const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Connaissance parfaite des Yvelines",
        description: "De la densité de Versailles aux routes de la forêt de Rambouillet, nous maîtrisons les spécificités de chaque secteur du 78 pour un déménagement fluide et sans surprise."
    },
    {
        icon: <Users className="h-8 w-8 text-primary"/>,
        title: "Équipes 100% intégrées et expérimentées",
        description: "Nos déménageurs sont des salariés de l'entreprise, formés et habitués à travailler ensemble. C'est la garantie d'un service fiable, cohérent et de qualité."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Protection maximale de vos biens",
        description: "Nous utilisons du matériel de protection haut de gamme (housses, couvertures, caisses spécifiques) et nos camions sont capitonnés pour une sécurité optimale."
    },
    {
        icon: <Star className="h-8 w-8 text-primary"/>,
        title: "Service client sur-mesure",
        description: "Chaque déménagement est unique. Nous vous attribuons un conseiller dédié qui vous accompagne de la prise de contact à l'installation dans votre nouveau domicile."
    }
];

const faqItems = [
    {
        question: "Gérez-vous les autorisations de stationnement à Versailles ou Saint-Germain-en-Laye ?",
        answer: "Oui, absolument. Nous savons que l'obtention d'autorisations de stationnement peut être complexe dans des villes historiques comme Versailles. Dans le cadre de nos formules Standard et Confort, nous prenons en charge 100% de ces démarches administratives pour vous garantir une tranquillité d'esprit totale."
    },
    {
        question: "Comment évaluez-vous le coût d'un déménagement dans les Yvelines ?",
        answer: "Le coût est basé sur le volume à déménager (en m³), la distance entre les deux adresses, la formule de service choisie et les conditions d'accès (étages, ascenseur, etc.). Nous proposons une visite technique gratuite et sans engagement dans tout le 78 pour vous fournir un devis précis et transparent."
    },
    {
        question: "Intervenez-vous dans les zones rurales des Yvelines comme la forêt de Rambouillet ?",
        answer: "Bien sûr. Notre expertise ne se limite pas aux grandes villes. Nous sommes parfaitement équipés et habitués à intervenir dans toutes les communes des Yvelines, y compris les zones plus reculées ou avec des accès spécifiques. Nous planifions la logistique en amont pour assurer une intervention efficace où que vous soyez."
    },
    {
        question: "Quels sont vos délais pour organiser un déménagement dans le 78 ?",
        answer: "Nous sommes très réactifs. Idéalement, nous vous conseillons de nous contacter 3 à 4 semaines à l'avance. Cependant, grâce à notre forte présence locale, nous pouvons souvent trouver des solutions pour des déménagements plus urgents. N'hésitez pas à nous appeler pour vérifier nos disponibilités."
    }
];


export default function YvelinesPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/versailles/1920/500"
                    alt="Le Château de Versailles, symbole des Yvelines (78)"
                    fill
                    className="object-cover"
                    data-ai-hint="versailles palace elegant"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Votre déménageur expert dans le 78</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Yvelines (78)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">De Versailles à Rambouillet, Déménagement du Vexin vous offre un service sur-mesure, fiable et professionnel pour votre déménagement dans les Yvelines.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/zones-intervention" className="hover:text-primary">Zones d'intervention</Link>
                <span className="mx-2">&gt;</span>
                <span>Yvelines (78)</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Votre déménagement dans les Yvelines, entre ville et nature, géré par des experts locaux</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Les Yvelines (78) offrent une diversité unique, entre le prestige de Versailles, le dynamisme de Saint-Quentin-en-Yvelines et le charme de la vallée de Chevreuse. Un déménagement dans ce département demande une connaissance approfondie du terrain. C'est ici que Déménagement du Vexin fait la différence.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           En tant qu'entreprise familiale ancrée dans la région, nous ne nous contentons pas de transporter vos biens. Nous vous apportons notre expertise locale pour surmonter chaque obstacle : gestion des rues étroites des centres historiques, planification logistique pour les accès en campagne, obtention des autorisations de stationnement... Nous connaissons parfaitement le secteur et mettons ce savoir-faire à votre service pour un déménagement serein et parfaitement maîtrisé.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/yvelines-team/600/400"
                            alt="Équipe de Déménagement du Vexin intervenant à Saint-Germain-en-Laye"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team chateau"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-yvelines" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Pourquoi nous confier votre déménagement dans le 78 ?</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Notre approche combine la rigueur d'un grand nom du déménagement et la flexibilité d'un artisan local.</p>
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
             <section id="cities-yvelines" className="py-16">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Nous intervenons partout dans les Yvelines</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Notre service de déménagement couvre l'ensemble du département. Voici quelques-unes des villes où nous opérons régulièrement :</p>
                    </div>
                    <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {yvelinesCities.map((city) => (
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
                            src="https://picsum.photos/seed/yvelines-packing/600/400"
                            alt="Déménageur protégeant un meuble pour un transport sécurisé dans les Yvelines"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover packing furniture"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés à votre projet dans le 78</h2>
                         <p className="mt-4 text-muted-foreground text-lg">Que vous déménagiez un appartement à Versailles, une maison à Poissy ou les bureaux de votre entreprise à Saint-Quentin-en-Yvelines, nous avons la solution.</p>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement de particuliers</h4>
                                    <p className="text-muted-foreground">Formules flexibles (de l'économique au tout compris) pour s'adapter à vos besoins et votre budget.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'entreprise</h4>
                                    <p className="text-muted-foreground">Planification rigoureuse pour un transfert de bureaux rapide et efficace, minimisant l'impact sur votre activité.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Garde-meubles sécurisé</h4>
                                    <p className="text-muted-foreground">Besoin de stocker vos biens ? Nous proposons des solutions de stockage flexibles et 100% sécurisées à proximité.</p>
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
            <section id="faq-yvelines" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes sur le déménagement dans les Yvelines</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Les réponses à vos interrogations pour un projet en toute confiance.</p>
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
            <section id="contact-yvelines" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Lancez votre projet de déménagement dans les Yvelines !</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Prêt à déménager vers ou depuis le 78 ? Contactez-nous dès aujourd'hui pour une estimation gratuite, rapide et personnalisée. </p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Obtenir mon devis pour les Yvelines</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
