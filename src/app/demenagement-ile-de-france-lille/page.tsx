
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Truck, Users, Beer, Building } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Lefevre", text: "Notre déménagement de la région parisienne à Lille a été une vraie réussite. L'équipe a été super, très pro et a su s'adapter aux petites rues du Vieux-Lille.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Lefevre59` },
    { id: "fallback-2", name: "Claire D.", text: "Service impeccable pour mon déménagement longue distance. La formule économique était parfaite et tout est arrivé à Lille sans encombre. Je recommande !", rating: 5, createTime: "il y a 7 mois", avatarUrl: `https://i.pravatar.cc/48?u=ClaireD59` },
    { id: "fallback-3", name: "Start-up Euratech", text: "Le transfert de notre société a été mené avec rigueur et efficacité. Une équipe qui comprend les enjeux d'un déménagement d'entreprise.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Euratech59` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de l'Axe Paris-Lille",
        description: "Nous effectuons des liaisons très régulières vers les Hauts-de-France, garantissant une logistique optimisée et des délais fiables."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Transport Longue Distance Sécurisé",
        description: "Nos camions modernes et nos techniques d'emballage professionnelles assurent un voyage en toute sécurité pour vos biens."
    },
    {
        icon: <Building className="h-8 w-8 text-primary"/>,
        title: "Adaptabilité Urbaine",
        description: "Nous connaissons les contraintes des déménagements à Paris et nous adaptons parfaitement aux spécificités des rues lilloises."
    },
    {
        icon: <Beer className="h-8 w-8 text-primary"/>,
        title: "Convivialité et Professionnalisme",
        description: "Comme dans le Nord, nous allions la rigueur d'un service professionnel à la chaleur d'un contact humain et amical."
    }
];

const faqItems = [
    {
        question: "Combien de temps faut-il prévoir pour un déménagement Île-de-France - Lille ?",
        answer: "Un déménagement vers Lille se déroule très bien sur une seule et même journée. Le trajet étant plus court que vers le sud de la France, nous chargeons vos affaires le matin en Île-de-France et nous vous livrons à Lille dans l'après-midi, vous permettant de passer votre première nuit dans votre nouveau domicile."
    },
    {
        question: "Le groupage est-il une option intéressante pour un petit volume vers Lille ?",
        answer: "Oui, c'est une excellente solution. L'axe Paris-Lille est très fréquenté, ce qui nous permet d'organiser facilement des déménagements groupés. C'est une option économique et écologique idéale pour les étudiants ou les petits appartements."
    },
    {
        question: "Comment gérez-vous le déménagement dans les rues étroites du Vieux-Lille ?",
        answer: "Nous connaissons bien les défis du Vieux-Lille. Une analyse préalable de l'adresse nous permet de choisir un véhicule de taille adaptée. La réservation de stationnement, que nous gérons, est également essentielle. Nos équipes sont expertes en manutention dans les espaces restreints."
    },
    {
        question: "Comment est calculé le prix d'un déménagement vers Lille ?",
        answer: "Le tarif se base sur le volume (m³), la distance et la formule de service choisie. Grâce à nos trajets très réguliers sur cet axe, nous optimisons la logistique pour vous proposer des devis très compétitifs. Une évaluation précise nous permettra de vous donner un prix ferme et détaillé."
    }
];


export default function LillePage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/lille/1920/500"
                    alt="La Grand'Place de Lille"
                    fill
                    className="object-cover"
                    data-ai-hint="lille grand place"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Spécialiste de la longue distance</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Île-de-France → Lille</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution fiable et optimisée pour votre nouvelle vie dans la capitale des Flandres.</p>
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
                <span>Destination Lille</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">De l'Île-de-France au cœur des Hauts-de-France</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Partir pour Lille, c'est choisir une métropole européenne, dynamique et chaleureuse. Pour que ce nouveau chapitre commence sous les meilleurs auspices, un déménagement longue distance bien préparé est essentiel.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Grâce à notre parfaite maîtrise de l'axe Paris-Lille, Déménagement du Vexin est votre partenaire privilégié. Nous vous assurons une organisation sans faille, un transport rapide et sécurisé, et une équipe dévouée pour que votre installation dans le Nord soit un vrai plaisir.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/lille-move/600/400"
                            alt="Équipe de déménagement professionnelle intervenant à Lille"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team city historic"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-lille" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour votre déménagement vers Lille</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Notre connaissance de l'axe Paris-Lille est votre meilleure garantie.</p>
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
                            src="https://picsum.photos/seed/lille-packing/600/400"
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
            <section id="faq-lille" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement vers Lille</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi vers le Nord.</p>
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
            <section id="contact-lille" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement vers Lille</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Lille</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
