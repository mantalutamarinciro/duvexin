
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckCircle, MapPin, ShieldCheck, Star, Users, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";
import type { FormattedReview } from "@/app/api/reviews/route";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Lefevre", text: "Le déménagement de notre maison de Paris au Havre a été une vraie réussite. L'équipe a été très professionnelle et a parfaitement géré la longue distance. Bravo !", rating: 5, createTime: "il y a 4 mois", avatarUrl: `https://i.pravatar.cc/48?u=Lefevre76` },
    { id: "fallback-2", name: "Sophie G.", text: "Un service client au top et une équipe de déménageurs très efficace pour mon appartement à Rouen. Je recommande vivement Déménagement du Vexin.", rating: 5, createTime: "il y a 9 mois", avatarUrl: `https://i.pravatar.cc/48?u=SophieG76` },
    { id: "fallback-3", name: "Marc D.", text: "Devis clair, équipe ponctuelle et matériel de qualité. Mon déménagement s'est déroulé sans stress grâce à leur organisation.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=MarcD76` },
];

const seineMaritimeCities = ["Le Havre", "Rouen", "Dieppe", "Sotteville-lès-Rouen", "Saint-Étienne-du-Rouvray", "Le Grand-Quevilly", "Le Petit-Quevilly", "Fécamp", "Elbeuf", "Mont-Saint-Aignan", "Barentin", "Yvetot"];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de la Vallée de la Seine",
        description: "De Rouen au Havre, nous connaissons les défis logistiques des villes portuaires et des centres historiques de la Seine-Maritime."
    },
    {
        icon: <Users className="h-8 w-8 text-primary"/>,
        title: "Équipes Normandes Expérimentées",
        description: "Grâce à notre agence d'Évreux, nos équipes locales sont réactives et connaissent parfaitement la région pour un service de proximité."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Soin et Protection",
        description: "Que vous déménagiez un appartement à Rouen ou une maison sur la côte d'Albâtre, nous protégeons vos biens avec le plus grand soin."
    },
    {
        icon: <Star className="h-8 w-8 text-primary"/>,
        title: "Qualité et Fiabilité",
        description: "Un interlocuteur unique, un devis transparent et un service client à votre écoute pour un déménagement maîtrisé."
    }
];

const faqItems = [
    {
        question: "Comment se déroule un déménagement dans le centre historique de Rouen ?",
        answer: "Le centre de Rouen, avec ses rues pavées et parfois étroites, demande une expertise que nous possédons. Nous réalisons une visite technique en amont pour choisir le véhicule adapté. Nous nous chargeons également de la réservation de stationnement auprès de la mairie, ce qui est indispensable pour une intervention fluide."
    },
    {
        question: "Assurez-vous les déménagements depuis l'Île-de-France vers Le Havre ?",
        answer: "Oui, c'est un axe que nous pratiquons très régulièrement. Nous organisons des voyages optimisés, en déménagement dédié ou en groupage pour les plus petits volumes, afin de vous offrir un service de haute qualité à un tarif compétitif pour cette longue distance."
    },
    {
        question: "Intervenez-vous sur toute la côte d'Albâtre, de Dieppe à Fécamp ?",
        answer: "Absolument. Notre couverture s'étend sur tout le département de la Seine-Maritime. Nous sommes équipés pour intervenir dans les villes côtières, en nous adaptant aux contraintes spécifiques de stationnement et d'accès durant la haute saison touristique."
    },
    {
        question: "Quels sont les avantages de votre agence d'Évreux pour un déménagement en Seine-Maritime ?",
        answer: "Notre agence d'Évreux est notre base opérationnelle pour toute la Normandie. Elle nous permet une grande réactivité pour organiser des visites techniques, une meilleure planification logistique et une connaissance approfondie des particularités régionales, ce qui est un gage de qualité et de sérénité pour nos clients."
    }
];


export default function SeineMaritimePage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/seine-maritime/1920/500"
                    alt="Les falaises d'Étretat en Seine-Maritime (76)"
                    fill
                    className="object-cover"
                    data-ai-hint="etretat cliffs normandy"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Votre déménageur expert en Normandie</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Seine-Maritime (76)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">De Rouen au Havre, Déménagement du Vexin vous accompagne pour votre projet dans toute la Seine-Maritime.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/zones-intervention" className="hover:text-primary">Zones d'intervention</Link>
                <span className="mx-2">&gt;</span>
                <span>Seine-Maritime (76)</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Votre déménagement en Seine-Maritime, de la vallée de la Seine à la côte d'Albâtre</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           La Seine-Maritime (76) est un département de caractère, structuré par la Seine et ouvert sur la mer. Déménager à Rouen, Le Havre ou Dieppe demande une expertise logistique pour gérer les contraintes des centres historiques et des zones portuaires.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Fort de notre ancrage normand avec notre agence d'Évreux, nous vous offrons un service de proximité et une connaissance fine du territoire. Que vous soyez un particulier ou une entreprise, nous avons la solution pour un déménagement réussi en Seine-Maritime.
                        </p>
                         <Button asChild className="mt-6">
                            <Link href="/demenagement-du-vexin-evreux">Découvrir notre agence d'Évreux</Link>
                         </Button>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/rouen-moving/600/400"
                            alt="Équipe de déménagement professionnelle intervenant à Rouen"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team old town"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-seinemaritime" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">L'expert normand pour votre projet dans le 76</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nous sommes un acteur local, et cela fait toute la différence.</p>
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
             <section id="cities-seinemaritime" className="py-16">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Nous couvrons l'ensemble de la Seine-Maritime</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos équipes d'Évreux interviennent sur toutes les communes du département.</p>
                    </div>
                     <div className="mt-12 flex flex-wrap justify-center gap-3">
                        {seineMaritimeCities.map((city) => (
                            <div key={city} className="bg-background border rounded-full px-4 py-2 text-sm font-medium shadow-sm hover:bg-primary hover:text-primary-foreground transition-colors">
                                {city}
                            </div>
                        ))}
                    </div>
                </div>
             </section>

             {/* Services Section */}
            <section className="py-16 bg-muted/50">
                 <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1">
                        <Image
                            src="https://picsum.photos/seed/le-havre-packing/600/400"
                            alt="Déménageur protégeant un meuble pour un transport"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover protecting furniture"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Nos services pour votre projet en Seine-Maritime</h2>
                         <p className="mt-4 text-muted-foreground text-lg">Nous proposons une gamme complète de prestations pour répondre à tous vos besoins.</p>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement pour particuliers</h4>
                                    <p className="text-muted-foreground">Des formules sur-mesure pour s'adapter à votre budget et à vos besoins spécifiques.</p>
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
                                    <h4 className="font-semibold">Garde-meubles près de chez vous</h4>
                                    <p className="text-muted-foreground">Besoin d'une solution de stockage ? Nous proposons des box sécurisés pour de courtes ou longues durées.</p>
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
            <section id="faq-seinemaritime" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Seine-Maritime</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Vos interrogations, nos réponses claires pour un projet dans le 76.</p>
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
            <section id="contact-seinemaritime" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Lancez votre déménagement en Seine-Maritime !</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez notre agence normande pour une étude personnalisée et recevez un devis gratuit pour votre projet dans le 76.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Mon devis pour la Seine-Maritime</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
