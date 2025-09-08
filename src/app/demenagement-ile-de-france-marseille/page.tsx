
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Truck, Users, Sun, Building } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Dubois", text: "Le grand saut de Paris à Marseille s'est fait sans la moindre anicroche. Une équipe professionnelle, ponctuelle et qui a pris grand soin de nos affaires sur ce long trajet. Chapeau !", rating: 5, createTime: "il y a 2 mois", avatarUrl: `https://i.pravatar.cc/48?u=Dubois13` },
    { id: "fallback-2", name: "Antoine L.", text: "Service impeccable pour mon déménagement étudiant. La formule groupée était parfaite pour mon budget et tout est arrivé en parfait état à Marseille. Je recommande.", rating: 5, createTime: "il y a 6 mois", avatarUrl: `https://i.pravatar.cc/48?u=AntoineL13` },
    { id: "fallback-3", name: "Société MedTec", text: "Le transfert de notre agence francilienne vers Marseille a été une réussite. Une logistique bien huilée et une équipe efficace. Des vrais pros de la longue distance.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=MedTec13` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de l'Axe Nord-Sud",
        description: "Nous effectuons des liaisons régulières entre Paris et Marseille, garantissant une logistique optimisée et des délais fiables."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Transport Longue Distance Sécurisé",
        description: "Nos camions sont équipés pour les longs trajets et vos biens sont soigneusement arrimés pour un voyage sans encombre."
    },
    {
        icon: <Building className="h-8 w-8 text-primary"/>,
        title: "Adaptabilité aux Deux Villes",
        description: "Nous connaissons aussi bien les contraintes des immeubles parisiens que celles des résidences marseillaises, avec ou sans ascenseur."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Gestion Complète",
        description: "Nous gérons les autorisations de stationnement au départ comme à l'arrivée, pour une tranquillité d'esprit totale."
    }
];

const faqItems = [
    {
        question: "Combien de temps dure un déménagement entre l'Île-de-France et Marseille ?",
        answer: "Le déménagement se fait généralement sur 2 à 3 jours. Le premier jour est dédié au chargement en Île-de-France. Le transport s'effectue ensuite, suivi de la livraison à Marseille le jour suivant. Nous adaptons toujours le planning à vos impératifs."
    },
    {
        question: "Le déménagement en groupage est-il une bonne option pour Marseille ?",
        answer: "Oui, c'est une excellente option pour les petits volumes (étudiants, studios...). En partageant le camion avec d'autres clients faisant le même trajet, vous bénéficiez d'un tarif très avantageux. C'est une solution flexible et économique que nous proposons régulièrement sur l'axe Paris-Marseille."
    },
    {
        question: "Comment est calculé le prix d'un déménagement Paris-Marseille ?",
        answer: "Le tarif dépend principalement du volume à déménager (en m³) et de la formule de service que vous choisissez (de l'économique au tout confort). La distance étant fixe sur ce trajet, nous optimisons nos tournées pour vous offrir un prix très compétitif. Un devis détaillé et gratuit vous sera fourni après évaluation de vos besoins."
    },
    {
        question: "Comment mes affaires sont-elles protégées pendant 800 km ?",
        answer: "La protection pour la longue distance est notre priorité. Chaque meuble est emballé sous des couvertures de protection épaisses et spécifiques. L'arrimage dans le camion est réalisé par des professionnels pour qu'absolument rien ne bouge pendant le transport. Vos biens les plus fragiles bénéficient d'un emballage sur-mesure."
    }
];


export default function MarseillePage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/marseille/1920/500"
                    alt="Vue sur le Vieux-Port de Marseille"
                    fill
                    className="object-cover"
                    data-ai-hint="marseille vieux port"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Spécialiste de la longue distance</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Île-de-France → Marseille</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution fiable et optimisée pour votre nouvelle vie sous le soleil de la cité phocéenne.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/services" className="hover:text-primary">Services</Link>
                <span className="mx-2">&gt;</span>
                 <Link href="/demenagement-national" className="hover:text-primary">Déménagement National</Link>
                <span className="mx-2">&gt;</span>
                <span>Destination Marseille</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">De la capitale à la cité phocéenne, un déménagement maîtrisé</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Partir de l'Île-de-France pour s'installer à Marseille est un projet magnifique qui marque un vrai changement de vie. Confier ce long trajet à des professionnels est la clé pour démarrer cette nouvelle aventure sur des bases sereines.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Forts de notre expérience sur les axes longue distance, nous avons fait de la liaison Île-de-France - Marseille l'une de nos spécialités. Nous vous garantissons une organisation rigoureuse, un transport sécurisé et une équipe dédiée pour que votre déménagement se passe dans les meilleures conditions.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/marseille-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Marseille"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team city sea"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-marseille" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour votre déménagement vers Marseille</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Notre connaissance de l'axe Paris-Marseille est votre meilleure garantie.</p>
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
                            src="https://picsum.photos/seed/marseille-packing/600/400"
                            alt="Déménageur emballant avec soin des objets pour un déménagement longue distance"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing long distance"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux déménagements longue distance</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement dédié ou groupé</h4>
                                    <p className="text-muted-foreground">Choisissez entre un camion entièrement dédié à votre déménagement ou une formule de groupage plus économique pour les petits volumes.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Formules flexibles</h4>
                                    <p className="text-muted-foreground">De la formule économique où vous emballez vos cartons à la prestation tout confort, c'est vous qui choisissez.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Emballage professionnel</h4>
                                    <p className="text-muted-foreground">Pour les longs trajets, la qualité de l'emballage est primordiale. Nous utilisons du matériel renforcé pour une protection optimale.</p>
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
            <section id="faq-marseille" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement vers Marseille</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi vers le sud.</p>
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
            <section id="contact-marseille" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement vers Marseille</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Marseille</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
