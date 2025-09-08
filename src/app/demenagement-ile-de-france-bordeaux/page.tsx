
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Truck, Users, Wine, Building } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Dupuis", text: "Le déménagement de nos vies de Paris à Bordeaux a été une réussite totale. L'équipe a été d'un professionnalisme exemplaire du début à la fin. Un grand merci !", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Dupuis33` },
    { id: "fallback-2", name: "Antoine G.", text: "Service impeccable pour mon déménagement longue distance. La formule groupage était parfaite pour mon budget et tout est arrivé sans une égratignure. Je recommande.", rating: 5, createTime: "il y a 7 mois", avatarUrl: `https://i.pravatar.cc/48?u=AntoineG33` },
    { id: "fallback-3", name: "Cave & Châteaux", text: "Le transfert de notre stock a été géré avec un soin particulier. Une équipe qui comprend les contraintes du transport de biens fragiles. Des vrais pros.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=CaveChateaux33` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de l'Axe Paris-Bordeaux",
        description: "Nous réalisons des liaisons régulières vers la Nouvelle-Aquitaine, garantissant une logistique optimisée et des délais fiables."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Transport Longue Distance Sécurisé",
        description: "Nos camions modernes et nos techniques d'arrimage professionnelles assurent un voyage sans encombre pour vos biens."
    },
    {
        icon: <Building className="h-8 w-8 text-primary"/>,
        title: "Adaptabilité aux Deux Régions",
        description: "Nous connaissons les contraintes des déménagements en Île-de-France et les spécificités de l'habitat bordelais."
    },
    {
        icon: <Wine className="h-8 w-8 text-primary"/>,
        title: "Soin Particulier",
        description: "Nous portons une attention spéciale à vos biens fragiles, y compris les caves à vin, avec des solutions d'emballage dédiées."
    }
];

const faqItems = [
    {
        question: "Combien de temps faut-il prévoir pour un déménagement Île-de-France - Bordeaux ?",
        answer: "Un déménagement vers Bordeaux s'organise généralement sur deux jours. Nous consacrons le premier jour au chargement soigné de vos affaires en Île-de-France. Le second jour est dédié au transport et à la livraison et l'installation dans votre nouveau domicile bordelais."
    },
    {
        question: "Le groupage est-il une option intéressante pour Bordeaux ?",
        answer: "Oui, c'est une solution très avantageuse pour les petits volumes. En partageant le camion avec d'autres clients, vous réduisez considérablement le coût du transport. Nous organisons fréquemment des tournées de groupage vers la Nouvelle-Aquitaine."
    },
    {
        question: "Comment est calculé le prix d'un déménagement vers Bordeaux ?",
        answer: "Le tarif se base sur le volume (m³), la distance et la formule de service choisie. Grâce à nos trajets réguliers sur cet axe, nous optimisons la logistique pour vous proposer un devis très compétitif. Une évaluation précise par téléphone, vidéo ou visite technique nous permettra de vous donner un prix ferme."
    },
    {
        question: "J'ai une cave à vin à déménager, comment faites-vous ?",
        answer: "Nous avons l'habitude de transporter des caves et des bouteilles de vin. Nous utilisons des cartons spécifiques avec des croisillons (cartons barrels) qui protègent chaque bouteille individuellement des chocs et des variations de température. Vos grands crus voyageront en première classe !"
    }
];


export default function BordeauxPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/bordeaux/1920/500"
                    alt="La Place de la Bourse à Bordeaux"
                    fill
                    className="object-cover"
                    data-ai-hint="bordeaux water mirror"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Spécialiste de la longue distance</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Île-de-France → Bordeaux</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution fiable et optimisée pour votre nouvelle vie au cœur du vignoble bordelais.</p>
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
                <span>Destination Bordeaux</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">De la Seine à la Garonne, un déménagement en toute confiance</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Changer de région pour s'installer à Bordeaux est un projet de vie enthousiasmant. Pour que cette transition soit une réussite, un déménagement longue distance doit être parfaitement maîtrisé. C'est là que notre savoir-faire entre en jeu.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Forts de notre expérience sur les grands axes nationaux, nous avons fait de la liaison Île-de-France - Bordeaux une de nos spécialités. Nous vous assurons une organisation rigoureuse, un transport sécurisé et une équipe à votre écoute pour que vous puissiez vous concentrer sur l'essentiel : votre nouvelle vie en Gironde.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/bordeaux-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Bordeaux"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team city historic"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-bordeaux" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour votre déménagement vers Bordeaux</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Notre connaissance de l'axe Paris-Bordeaux est votre meilleure garantie.</p>
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
                            src="https://picsum.photos/seed/bordeaux-packing/600/400"
                            alt="Déménageur emballant avec soin des bouteilles de vin"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover packing wine bottles"
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
            <section id="faq-bordeaux" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement vers Bordeaux</h2>
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
            <section id="contact-bordeaux" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement vers Bordeaux</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Bordeaux</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
