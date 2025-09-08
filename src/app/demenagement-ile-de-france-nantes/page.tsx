
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Truck, Users, Anchor, Building } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Le Gall", text: "Le déménagement de notre famille de la région parisienne à Nantes a été une réussite. L'équipe a été très professionnelle et sympathique. Un grand merci pour votre efficacité.", rating: 5, createTime: "il y a 4 mois", avatarUrl: `https://i.pravatar.cc/48?u=LeGall44` },
    { id: "fallback-2", name: "Marion D.", text: "Super service pour mon déménagement étudiant. La formule groupage était idéale pour mon budget et tout est arrivé à Nantes en parfait état. Je recommande vivement.", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=MarionD44` },
    { id: "fallback-3", name: "Société Ouest-Innov", text: "Le transfert de notre bureau a été mené de manière très professionnelle. Une équipe qui comprend les enjeux d'un déménagement d'entreprise longue distance.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=OuestInnov44` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de l'Axe Paris-Nantes",
        description: "Nous réalisons des liaisons régulières vers la Loire-Atlantique, garantissant une logistique optimisée et des délais fiables."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Transport Longue Distance Sécurisé",
        description: "Nos camions modernes et nos techniques d'emballage professionnelles assurent un voyage en toute sécurité pour vos biens."
    },
    {
        icon: <Building className="h-8 w-8 text-primary"/>,
        title: "Adaptabilité aux Deux Régions",
        description: "Nous connaissons les contraintes des déménagements en Île-de-France et les spécificités de l'habitat nantais."
    },
    {
        icon: <Anchor className="h-8 w-8 text-primary"/>,
        title: "Un Service Fiable et Soigné",
        description: "Nous portons une attention spéciale à vos biens fragiles, avec des solutions d'emballage dédiées pour un voyage sans encombre."
    }
];

const faqItems = [
    {
        question: "Combien de temps faut-il prévoir pour un déménagement Île-de-France - Nantes ?",
        answer: "Un déménagement vers Nantes s'organise généralement sur un ou deux jours. Pour les petits volumes, nous pouvons charger le matin en Île-de-France et livrer l'après-midi à Nantes. Pour les plus grands volumes, nous préconisons un chargement le premier jour et une livraison le lendemain pour plus de sérénité."
    },
    {
        question: "Le groupage est-il une option intéressante pour un petit volume vers Nantes ?",
        answer: "Oui, c'est une solution très avantageuse. En partageant le camion avec d'autres clients, vous réduisez considérablement le coût du transport. Nous organisons fréquemment des tournées de groupage vers les Pays de la Loire."
    },
    {
        question: "Comment gérez-vous le déménagement dans les rues parfois étroites du centre de Nantes ?",
        answer: "Nous connaissons bien les défis du centre-ville nantais. Une analyse de l'adresse nous permet de choisir le véhicule le plus adapté. Nous nous chargeons également de la réservation de stationnement auprès de la mairie de Nantes, ce qui est essentiel pour une intervention efficace."
    },
    {
        question: "Comment est calculé le prix d'un déménagement vers Nantes ?",
        answer: "Le tarif se base sur le volume à déménager (en m³), la distance et la formule de service choisie (Économique, Standard, Confort). Grâce à nos trajets réguliers sur cet axe, nous optimisons la logistique pour vous proposer un devis très compétitif."
    }
];


export default function NantesPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/nantes/1920/500"
                    alt="Les Machines de l'île à Nantes"
                    fill
                    className="object-cover"
                    data-ai-hint="nantes city elephant"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Spécialiste de la longue distance</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Île-de-France → Nantes</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution fiable et optimisée pour votre nouvelle vie dans la Cité des Ducs de Bretagne.</p>
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
                <span>Destination Nantes</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">De la capitale à la métropole de l'Ouest, un déménagement serein</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Quitter la région parisienne pour s'installer à Nantes est un projet attractif. Pour que cette transition soit une parfaite réussite, un déménagement longue distance doit être orchestré avec soin et professionnalisme.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Forts de notre expérience sur les grands axes nationaux, nous avons fait de la liaison Île-de-France - Nantes une de nos spécialités. Nous vous assurons une organisation rigoureuse, un transport sécurisé et une équipe à votre écoute pour que vous puissiez vous concentrer sereinement sur votre nouvelle vie nantaise.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/nantes-move/600/400"
                            alt="Équipe de déménagement professionnelle intervenant à Nantes"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team city river"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-nantes" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour votre déménagement vers Nantes</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Notre connaissance de l'axe Paris-Nantes est votre meilleure garantie.</p>
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
                            src="https://picsum.photos/seed/nantes-packing/600/400"
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
            <section id="faq-nantes" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement vers Nantes</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi vers le Grand Ouest.</p>
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
            <section id="contact-nantes" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement vers Nantes</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Nantes</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
