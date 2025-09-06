
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckCircle, MapPin, ShieldCheck, Star, Users, Building, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";
import type { FormattedReview } from "@/app/api/reviews/route";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Société HexaCorp", text: "Le transfert de nos bureaux à La Défense a été un succès total. L'équipe a été discrète, rapide et incroyablement organisée. Aucune interruption d'activité.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=HexaCorp92` },
    { id: "fallback-2", name: "Famille Petit", text: "Un grand merci pour notre déménagement à Boulogne-Billancourt. Équipe très soigneuse et professionnelle. Le monte-meubles a été une solution parfaite pour notre piano.", rating: 5, createTime: "il y a 5 mois", avatarUrl: `https://i.pravatar.cc/48?u=Petit92` },
    { id: "fallback-3", name: "Anne-Sophie V.", text: "Service impeccable pour mon appartement à Neuilly-sur-Seine. Le devis était clair et l'équipe a été ponctuelle et efficace. Je recommande chaudement.", rating: 5, createTime: "il y a 9 mois", avatarUrl: `https://i.pravatar.cc/48?u=AnneSophie92` },
];

const hautsDeSeineCities = [
    { name: "Boulogne-Billancourt", link: "/demenagement-boulogne-billancourt-92100"},
    { name: "Nanterre", link: "/demenagement-nanterre-92000"},
    { name: "Courbevoie", link: "/demenagement-courbevoie-92400"},
    { name: "Colombes", link: "/demenagement-colombes-92700"},
    { name: "Asnières-sur-Seine", link: "/demenagement-asnieres-sur-seine-92600"},
    { name: "Rueil-Malmaison", link: "/demenagement-rueil-malmaison-92500"},
    { name: "Levallois-Perret", link: "/demenagement-levallois-perret-92300"},
    { name: "Issy-les-Moulineaux", link: "/demenagement-issy-les-moulineaux-92130"},
    { name: "Neuilly-sur-Seine", link: "/demenagement-neuilly-sur-seine-92200"},
    { name: "Antony", link: "#"},
    { name: "Clichy", link: "#"},
    { name: "Puteaux", link: "#"}
];


const whyChooseUsItems = [
    {
        icon: <Building className="h-8 w-8 text-primary"/>,
        title: "Expertise en milieu urbain dense",
        description: "Nous gérons parfaitement la circulation, le stationnement et les accès complexes de villes comme Boulogne, Neuilly ou Levallois."
    },
    {
        icon: <Users className="h-8 w-8 text-primary"/>,
        title: "Équipes spécialisées pour pros et particuliers",
        description: "Nos équipes sont formées pour le transfert de bureaux à La Défense comme pour le déménagement d'appartements familiaux à Rueil-Malmaison."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Solutions logistiques avancées",
        description: "Utilisation de monte-meubles, véhicules adaptés et planification rigoureuse pour une efficacité maximale dans le 92."
    },
    {
        icon: <Star className="h-8 w-8 text-primary"/>,
        title: "Qualité de service premium",
        description: "Un interlocuteur unique, des devis transparents et un service client réactif pour une expérience de déménagement haut de gamme."
    }
];

const faqItems = [
    {
        question: "Comment gérez-vous les déménagements d'entreprise à La Défense ?",
        answer: "Nous avons une grande expérience du quartier d'affaires. Nous planifions les déménagements en dehors des heures de bureau, le soir ou le week-end, pour minimiser l'impact sur votre activité. Nous nous occupons de la logistique complexe des accès livraison, des monte-charges et des autorisations spécifiques au parvis."
    },
    {
        question: "Le monte-meubles est-il souvent nécessaire dans les Hauts-de-Seine ?",
        answer: "Oui, c'est une solution que nous utilisons fréquemment dans le 92, en particulier dans les immeubles anciens sans ascenseur ou avec des escaliers étroits à Neuilly, Levallois ou Courbevoie. Cela garantit la sécurité de vos biens et des parties communes, tout en accélérant considérablement le déménagement."
    },
    {
        question: "Qu'est-ce qui rend un déménagement dans le 92 différent des autres départements ?",
        answer: "La densité de population et la concentration d'entreprises sont les principaux défis. La gestion du stationnement est cruciale et requiert une anticipation. La circulation peut aussi être un facteur. Notre connaissance des réglementations de chaque ville (Nanterre, Boulogne, etc.) et notre planification précise sont des atouts clés pour un déménagement réussi."
    },
    {
        question: "Pouvez-vous déménager des objets de valeur ou fragiles dans un appartement à Boulogne-Billancourt ?",
        answer: "Absolument. La protection de vos biens est notre priorité. Nous disposons de matériel d'emballage spécialisé pour les objets fragiles, les tableaux ou les équipements high-tech. Nos équipes sont formées aux techniques de manipulation et d'emballage les plus sûres pour garantir que tout arrive en parfait état."
    }
];


export default function HautsDeSeinePage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/hauts-de-seine/1920/500"
                    alt="Le quartier d'affaires de La Défense dans les Hauts-de-Seine (92)"
                    fill
                    className="object-cover"
                    data-ai-hint="la defense skyline"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">L'expert de votre déménagement dans le 92</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Hauts-de-Seine (92)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution professionnelle pour votre déménagement à La Défense, Boulogne, Neuilly et dans tout le 92.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/zones-intervention" className="hover:text-primary">Zones d'intervention</Link>
                <span className="mx-2">&gt;</span>
                <span>Hauts-de-Seine (92)</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Maîtriser la complexité d'un déménagement dans les Hauts-de-Seine</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager dans les Hauts-de-Seine (92), département le plus dense de la petite couronne, est une opération qui ne s'improvise pas. Entre les gratte-ciels de La Défense, les avenues chics de Neuilly-sur-Seine et les rues animées de Boulogne-Billancourt, chaque ville a ses propres contraintes.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous avons développé une expertise pointue pour naviguer dans cet environnement exigeant. Que vous soyez une entreprise transférant ses locaux ou un particulier emménageant dans un nouvel appartement, nous apportons des solutions logistiques sur-mesure pour un déménagement fluide, sécurisé et sans stress.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/boulogne-moving/600/400"
                            alt="Équipe de déménagement en intervention à Boulogne-Billancourt"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team urban environment"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-hautsdeseine" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">L'avantage d'un professionnel pour votre déménagement dans le 92</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Notre savoir-faire est votre meilleure garantie pour un projet réussi.</p>
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
             <section id="cities-hautsdeseine" className="py-16">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Nous intervenons sur l'ensemble des Hauts-de-Seine</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Découvrez nos services dédiés pour les principales villes du 92.</p>
                    </div>
                    <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {hautsDeSeineCities.map((city) => (
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
                            src="https://picsum.photos/seed/la-defense-packing/600/400"
                            alt="Déménageur préparant du matériel informatique pour un transfert de bureau à La Défense"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover packing office equipment"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des prestations de pointe pour le 92</h2>
                         <p className="mt-4 text-muted-foreground text-lg">Nous offrons une gamme de services spécialement pensés pour les besoins des particuliers et professionnels des Hauts-de-Seine.</p>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Transfert d'entreprises et de bureaux</h4>
                                    <p className="text-muted-foreground">Service clé-en-main pour les professionnels, avec une planification rigoureuse pour ne pas impacter votre productivité.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'appartements de standing</h4>
                                    <p className="text-muted-foreground">Prestations haut de gamme avec emballage soigné des objets fragiles et protection des parties communes.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Mise à disposition de monte-meubles</h4>
                                    <p className="text-muted-foreground">Pour les accès difficiles et les étages élevés, nous déployons nos solutions de levage avec des techniciens qualifiés.</p>
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
            <section id="faq-hautsdeseine" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Hauts-de-Seine</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Vos interrogations, nos réponses claires pour un projet dans le 92.</p>
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
            <section id="contact-hautsdeseine" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement dans les Hauts-de-Seine</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet dans le 92 et obtenez rapidement un devis compétitif et détaillé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis pour les Hauts-de-Seine</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
