
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Truck, Users, Building, Rocket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Boyer", text: "Déménagement de la région parisienne à Toulouse parfaitement réussi. L'équipe a été d'un grand professionnalisme, à la fois pour le chargement et la livraison. Service impeccable.", rating: 5, createTime: "il y a 5 mois", avatarUrl: `https://i.pravatar.cc/48?u=Boyer31` },
    { id: "fallback-2", name: "Vincent R.", text: "Service impeccable pour mon déménagement longue distance. La formule groupée était idéale et tout est arrivé à Toulouse sans le moindre souci. Je recommande fortement.", rating: 5, createTime: "il y a 9 mois", avatarUrl: `https://i.pravatar.cc/48?u=VincentR31` },
    { id: "fallback-3", name: "AeroSolutions", text: "Le transfert de notre bureau d'études a été mené avec une grande rigueur. Une équipe qui comprend les enjeux d'un déménagement pour une entreprise technologique.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=AeroSolutions31` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de l'Axe Paris-Toulouse",
        description: "Nous réalisons des liaisons régulières vers l'Occitanie, garantissant une logistique optimisée et des délais fiables."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Transport Longue Distance Sécurisé",
        description: "Nos camions modernes et nos techniques d'emballage professionnelles assurent un voyage en toute sécurité pour vos biens."
    },
    {
        icon: <Building className="h-8 w-8 text-primary"/>,
        title: "Adaptabilité aux Deux Régions",
        description: "Nous connaissons les contraintes des déménagements en Île-de-France et les spécificités de l'habitat toulousain."
    },
    {
        icon: <Rocket className="h-8 w-8 text-primary"/>,
        title: "Soins pour Biens Technologiques",
        description: "Nous portons une attention spéciale à vos biens fragiles, y compris le matériel informatique ou professionnel sensible."
    }
];

const faqItems = [
    {
        question: "Combien de temps faut-il prévoir pour un déménagement Île-de-France - Toulouse ?",
        answer: "Un déménagement vers Toulouse se déroule généralement sur deux jours. Le premier jour est consacré au chargement minutieux en Île-de-France. Le second jour est dédié au transport et à la livraison dans votre nouveau logement toulousain, pour une installation en douceur."
    },
    {
        question: "Proposez-vous une formule de groupage pour Toulouse ?",
        answer: "Oui, c'est une solution très avantageuse que nous proposons pour les petits volumes. En mutualisant le transport, vous bénéficiez d'un tarif très compétitif. C'est une option idéale pour les étudiants ou les déménagements de petits appartements."
    },
    {
        question: "Comment est calculé le prix d'un déménagement vers Toulouse ?",
        answer: "Le tarif est principalement basé sur le volume (en m³), la distance et la formule de service que vous choisissez. Grâce à notre expérience sur cet axe, nous optimisons la logistique pour vous proposer un devis très compétitif. Une évaluation précise, par téléphone, vidéo ou visite, nous permettra de vous donner un prix ferme."
    },
    {
        question: "Comment gérez-vous le déménagement dans les rues parfois étroites du centre de Toulouse ?",
        answer: "Nous connaissons bien les défis du centre-ville toulousain. Une bonne planification est essentielle. Nous nous chargeons de la demande d'autorisation de stationnement et nous pouvons utiliser des véhicules de plus petite taille pour les accès difficiles, en complétant avec de la manutention."
    }
];


export default function ToulousePage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/toulouse/1920/500"
                    alt="Le Pont Neuf et la Garonne à Toulouse"
                    fill
                    className="object-cover"
                    data-ai-hint="toulouse garonne bridge"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Spécialiste de la longue distance</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Île-de-France → Toulouse</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution fiable et optimisée pour votre nouvelle vie dans la Ville Rose.</p>
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
                <span>Destination Toulouse</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">De l'Île-de-France au cœur de l'Occitanie</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Quitter la région parisienne pour s'installer à Toulouse est un projet de vie stimulant. Pour que cette transition se fasse en toute sérénité, un déménagement longue distance doit être parfaitement orchestré.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Forts de notre expérience des grands axes nationaux, nous avons fait de la liaison Île-de-France - Toulouse une de nos spécialités. Nous vous assurons une organisation rigoureuse, un transport sécurisé et une équipe à votre écoute pour que vous puissiez vous concentrer sur l'essentiel : votre installation dans la Ville Rose.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/toulouse-move/600/400"
                            alt="Équipe de déménagement professionnelle intervenant à Toulouse"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team city southern"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-toulouse" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour votre déménagement vers Toulouse</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Notre connaissance de l'axe Paris-Toulouse est votre meilleure garantie.</p>
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
                            src="https://picsum.photos/seed/toulouse-packing/600/400"
                            alt="Déménageur emballant avec soin du matériel informatique pour un déménagement longue distance"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover packing computer long distance"
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
                                    <p className="text-muted-foreground">De la formule économique où vous emballez vos cartons à la prestation tout confort, c'est vous qui décidez.</p>
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
            <section id="faq-toulouse" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement vers Toulouse</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi vers le Sud-Ouest.</p>
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
            <section id="contact-toulouse" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement vers Toulouse</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Toulouse</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
