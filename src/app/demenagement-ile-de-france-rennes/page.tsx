
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Truck, Users, Anchor, Building } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Le Drian", text: "Le déménagement de notre famille d'Antony à Rennes a été une vraie réussite. L'équipe a été d'un grand professionnalisme, à l'écoute et très efficace. Nous recommandons !", rating: 5, createTime: "il y a 2 mois", avatarUrl: `https://i.pravatar.cc/48?u=LeDrian35` },
    { id: "fallback-2", name: "Camille J.", text: "Service impeccable pour mon déménagement étudiant. La formule groupage était une solution économique parfaite et tout est arrivé à Rennes en parfait état. Un grand merci !", rating: 5, createTime: "il y a 6 mois", avatarUrl: `https://i.pravatar.cc/48?u=CamilleJ35` },
    { id: "fallback-3", name: "Société Ouest-Innov", text: "Le transfert de notre agence de La Défense vers la zone Atalante a été mené de main de maître. Une équipe fiable et organisée.", rating: 5, createTime: "il y a 10 mois", avatarUrl: `https://i.pravatar.cc/48?u=OuestInnov35` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de l'Axe Paris-Rennes",
        description: "Nous effectuons des liaisons très régulières vers la Bretagne, garantissant une logistique optimisée et des délais fiables."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Transport Longue Distance Sécurisé",
        description: "Nos camions modernes et nos techniques d'emballage professionnelles assurent un voyage en toute sécurité pour vos biens."
    },
    {
        icon: <Building className="h-8 w-8 text-primary"/>,
        title: "Adaptabilité aux Deux Régions",
        description: "Nous connaissons les contraintes des déménagements en Île-de-France et les spécificités de l'habitat rennais."
    },
    {
        icon: <Anchor className="h-8 w-8 text-primary"/>,
        title: "Votre Porte d'Entrée en Bretagne",
        description: "Nous portons une attention spéciale à vos biens, pour que votre nouvelle vie en Bretagne commence sous les meilleurs auspices."
    }
];

const faqItems = [
    {
        question: "Combien de temps faut-il prévoir pour un déménagement Île-de-France - Rennes ?",
        answer: "Un déménagement vers Rennes s'organise généralement sur une seule journée pour les volumes courants. Nous chargeons vos affaires le matin en Île-de-France et nous vous livrons dans l'après-midi à Rennes, vous permettant de dormir dans votre nouveau domicile le soir même."
    },
    {
        question: "Le groupage est-il une option intéressante pour un petit volume vers Rennes ?",
        answer: "Oui, c'est une excellente solution. L'axe Paris-Rennes est très fréquenté, ce qui nous permet d'organiser facilement des déménagements groupés. C'est une option économique et écologique idéale pour les étudiants ou les petits appartements."
    },
    {
        question: "Comment gérez-vous le déménagement dans les rues étroites du centre historique de Rennes ?",
        answer: "Nous connaissons bien les défis du centre-ville rennais. Une analyse de l'adresse nous permet de choisir le véhicule le plus adapté. Nous nous chargeons également de la réservation de stationnement auprès de la mairie de Rennes, ce qui est essentiel pour une intervention efficace."
    },
    {
        question: "Comment est calculé le prix d'un déménagement vers Rennes ?",
        answer: "Le tarif se base sur le volume (en m³), la distance et la formule de service choisie. Grâce à nos trajets très réguliers sur cet axe, nous optimisons la logistique pour vous proposer des devis très compétitifs. Une évaluation précise nous permettra de vous donner un prix ferme et détaillé."
    }
];


export default function RennesPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/rennes/1920/500"
                    alt="Le centre historique de Rennes"
                    fill
                    className="object-cover"
                    data-ai-hint="rennes historic center"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Spécialiste de la longue distance</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Île-de-France → Rennes</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution fiable et optimisée pour votre nouvelle vie au cœur de la Bretagne.</p>
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
                <span>Destination Rennes</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">De l'effervescence parisienne au dynamisme breton</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Changer de région pour s'installer à Rennes, capitale de la Bretagne, est un projet de vie de plus en plus prisé. Pour que cette transition soit une réussite, un déménagement longue distance doit être parfaitement organisé.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Forts de notre expérience sur les grands axes nationaux, nous avons fait de la liaison Île-de-France - Rennes une de nos spécialités. Nous vous assurons une organisation rigoureuse, un transport rapide et sécurisé, et une équipe à votre écoute pour que vous puissiez vous concentrer sur l'essentiel : votre nouvelle vie en Ille-et-Vilaine.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/rennes-move/600/400"
                            alt="Équipe de déménagement professionnelle intervenant à Rennes"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team city old"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-rennes" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour votre déménagement vers Rennes</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Notre connaissance de l'axe Paris-Rennes est votre meilleure garantie.</p>
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
                            src="https://picsum.photos/seed/rennes-packing/600/400"
                            alt="Déménageur emballant avec soin des objets pour un déménagement longue distance"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover packing long distance"
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
            <section id="faq-rennes" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement vers Rennes</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi en Bretagne.</p>
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
            <section id="contact-rennes" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement vers Rennes</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Rennes</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
