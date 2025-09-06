
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Ship, Users, Building, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Sophie et Thomas", text: "Notre déménagement à Asnières s'est déroulé à merveille. L'équipe a géré les accès près des quais avec une grande expertise. Très professionnels et sympathiques.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=SophieT92` },
    { id: "fallback-2", name: "Entreprise Connect", text: "Transfert de nos bureaux à Asnières sans aucune fausse note. Planification parfaite, exécution rapide. Une équipe sur qui on peut compter.", rating: 5, createTime: "il y a 9 mois", avatarUrl: `https://i.pravatar.cc/48?u=Connect92` },
    { id: "fallback-3", name: "David L.", text: "Excellent service pour mon appartement. Devis clair et respecté. Je recommande Déménagement du Vexin pour tout projet à Asnières-sur-Seine.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=DavidL92` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Connaissance d'Asnières",
        description: "Du centre-ville historique aux quartiers plus récents, nous connaissons parfaitement la topographie et les réglementations d'Asnières."
    },
    {
        icon: <Ship className="h-8 w-8 text-primary"/>,
        title: "Gestion des Quais de Seine",
        description: "Nous avons l'habitude de gérer les déménagements le long de la Seine, avec des solutions adaptées aux contraintes de circulation et de stationnement."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Logistique et Monte-Meubles",
        description: "Nous gérons les autorisations et déployons si nécessaire des monte-meubles pour les appartements en étage, une solution fréquente à Asnières."
    },
    {
        icon: <Users className="h-8 w-8 text-primary"/>,
        title: "Équipes fiables et soignées",
        description: "Nos déménageurs salariés sont formés pour travailler avec soin et efficacité, en respectant vos biens et votre voisinage."
    }
];

const faqItems = [
    {
        question: "Comment se passe un déménagement dans une rue à sens unique ou étroite à Asnières ?",
        answer: "Nous réalisons une visite technique en amont (ou une analyse sur plan/photos) pour évaluer les accès. Nous choisissons alors le véhicule le plus adapté de notre flotte pour minimiser l'impact sur la circulation. Nous nous occupons également de la réservation de stationnement pour garantir l'emplacement nécessaire."
    },
    {
        question: "Déménager près des quais de Seine à Asnières pose-t-il un problème ?",
        answer: "Non, c'est une zone que nous connaissons bien. Nous sommes conscients des contraintes de circulation et de stationnement sur les quais. Nous planifions nos interventions pour être les plus efficaces possible, souvent en évitant les heures de pointe et en sécurisant notre zone de travail."
    },
    {
        question: "Proposez-vous des formules de déménagement pour les étudiants à Asnières ?",
        answer: "Oui, absolument. Nous avons des formules économiques et des solutions pour les petits volumes (studios, T1) qui sont idéales pour les étudiants ou les jeunes actifs. N'hésitez pas à nous demander un devis, il est gratuit et sans engagement."
    },
    {
        question: "Comment sont protégés mes meubles pendant un déménagement à Asnières ?",
        answer: "La protection de vos biens est notre priorité. Tous vos meubles sont systématiquement protégés sous des couvertures de déménagement épaisses. Les éléments plus fragiles (matelas, canapés) sont placés dans des housses spécifiques. Nous utilisons également du film à bulles et des cartons spéciaux pour la vaisselle ou les objets de valeur."
    }
];


export default function AsnieresPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/asnieres/1920/500"
                    alt="Vue des quais de Seine à Asnières-sur-Seine"
                    fill
                    className="object-cover"
                    data-ai-hint="asnieres sur seine cityscape"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement à Asnières</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Asnières-sur-Seine</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte et locale pour les particuliers et les entreprises à Asnières-sur-Seine (92600).</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-hauts-de-seine-92" className="hover:text-primary">Hauts-de-Seine (92)</Link>
                <span className="mx-2">&gt;</span>
                <span>Asnières-sur-Seine</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui connaît les charmes et les défis d'Asnières</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Asnières-sur-Seine, c'est choisir une ville dynamique en bord de Seine, alliant quartiers résidentiels cossus, zones pavillonnaires et centre-ville animé. Cette diversité demande une approche logistique flexible et une excellente connaissance du terrain.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous sommes fiers de notre expertise locale. Nous maîtrisons les spécificités d'Asnières, de la gestion des accès sur les quais à la réservation de stationnement dans les rues commerçantes. Nous vous garantissons un déménagement serein, efficace et parfaitement adapté à votre adresse de départ ou d'arrivée.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/asnieres-move/600/400"
                            alt="Équipe de déménagement professionnelle intervenant à Asnières-sur-Seine"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team urban street house"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-asnieres" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Asnières</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Notre expertise locale est votre meilleur atout pour un déménagement réussi.</p>
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
                            src="https://picsum.photos/seed/asnieres-packing/600/400"
                            alt="Déménageur emballant avec soin des objets pour un déménagement à Asnières"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux particuliers et professionnels d'Asnières</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'appartements</h4>
                                    <p className="text-muted-foreground">Solutions avec monte-meubles pour les étages élevés et protection soignée de vos biens.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement de maisons et pavillons</h4>
                                    <p className="text-muted-foreground">Nous gérons les déménagements de maisons avec jardin et accès spécifiques.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Formules flexibles</h4>
                                    <p className="text-muted-foreground">De la prestation économique au service tout confort, nous nous adaptons à vos attentes et votre budget.</p>
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
            <section id="faq-asnieres" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Asnières</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Asnières-sur-Seine.</p>
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
            <section id="contact-asnieres" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Asnières-sur-Seine</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Asnières</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
