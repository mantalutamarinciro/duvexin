
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Truck, Users, Building, Waves, Train } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Durand", text: "Déménagement de notre maison à Choisy-le-Roi parfaitement organisé. L'équipe a été efficace, ponctuelle et très soigneuse. Un service de grande qualité que nous recommandons.", rating: 5, createTime: "il y a 5 mois", avatarUrl: `https://i.pravatar.cc/48?u=Durand94` },
    { id: "fallback-2", name: "Nathalie P.", text: "Très bonne expérience pour mon appartement près de la gare. Devis clair et équipe sympathique et professionnelle. Le déménagement a été beaucoup moins stressant que prévu !", rating: 5, createTime: "il y a 9 mois", avatarUrl: `https://i.pravatar.cc/48?u=NathalieP94` },
    { id: "fallback-3", name: "Société Innova", text: "Le transfert de nos bureaux a été géré avec rigueur. Une équipe discrète et efficace, qui a su respecter notre planning.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Innova94` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Choisy-le-Roi",
        description: "Du centre-ville aux Gondoles, nous connaissons les rues, les accès et les réglementations pour une logistique sans faille."
    },
    {
        icon: <Train className="h-8 w-8 text-primary"/>,
        title: "Gestion des accès et du trafic",
        description: "Nous maîtrisons la logistique autour des axes fréquentés et de la gare RER C pour assurer la ponctualité de nos interventions."
    },
    {
        icon: <Waves className="h-8 w-8 text-primary"/>,
        title: "Spécialiste Bords de Seine",
        description: "Nous avons l'habitude de gérer les déménagements dans les résidences et pavillons qui longent les quais de Seine."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité administrative",
        description: "Nous gérons pour vous les demandes d'autorisation de stationnement, une démarche clé pour un déménagement apaisé à Choisy."
    }
];

const faqItems = [
    {
        question: "Comment se déroule un déménagement dans une résidence en bord de Seine à Choisy ?",
        answer: "Nous connaissons bien ces résidences. Nous effectuons une visite technique pour évaluer les accès et les besoins (monte-meubles, etc.). Le jour J, nous protégeons les parties communes et nous nous assurons que notre intervention se fasse en toute discrétion et dans le respect du voisinage."
    },
    {
        question: "Le stationnement est-il compliqué à Choisy-le-Roi pour un déménagement ?",
        answer: "Certains secteurs peuvent être denses. C'est pourquoi nous incluons systématiquement la gestion des autorisations de stationnement dans nos prestations. Nous nous occupons des démarches auprès de la mairie pour vous garantir un emplacement réservé, ce qui est essentiel pour une opération efficace."
    },
    {
        question: "Proposez-vous des formules pour les petits appartements ?",
        answer: "Oui, absolument. Nous proposons des formules flexibles pour tous les volumes. Notre formule Économique, où vous vous chargez de l'emballage et nous de la manutention et du transport, est une solution idéale pour maîtriser son budget tout en bénéficiant de notre savoir-faire."
    },
    {
        question: "Quelles protections utilisez-vous pour les biens fragiles ?",
        answer: "La protection de vos affaires est notre priorité. Nous utilisons des couvertures de protection épaisses, des housses spéciales pour la literie et les canapés, et du film à bulles ou des cartons renforcés pour tous vos objets délicats comme la vaisselle, les cadres ou les miroirs."
    }
];


export default function ChoisyLeRoiPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/choisy-le-roi/1920/500"
                    alt="Vue des bords de Seine à Choisy-le-Roi"
                    fill
                    className="object-cover"
                    data-ai-hint="choisy le roi seine river"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Choisy-le-Roi</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution efficace et locale pour votre projet à Choisy-le-Roi (94600).</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-val-de-marne-94" className="hover:text-primary">Val-de-Marne (94)</Link>
                <span className="mx-2">&gt;</span>
                <span>Choisy-le-Roi</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur expert pour la ville de Choisy-le-Roi</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Choisy-le-Roi, c'est s'installer dans une ville dynamique et connectée, bénéficiant d'un cadre de vie agréable en bord de Seine. Son tissu urbain, qui mêle zones pavillonnaires, grands ensembles et centre-ville commerçant, demande une connaissance approfondie du terrain.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous maîtrisons ces spécificités. Que vous emménagiez dans un appartement avec vue sur la Seine ou dans une maison de quartier, nous planifions chaque détail pour garantir un déménagement rapide, efficace et sans stress.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/choisy-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Choisy-le-Roi"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team city riverside"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-choisy" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Choisy-le-Roi</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Notre connaissance du terrain est votre meilleure garantie de sérénité.</p>
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
                            src="https://picsum.photos/seed/choisy-packing/600/400"
                            alt="Déménageur emballant avec soin des objets pour un déménagement à Choisy-le-Roi"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing boxes"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux habitants de Choisy-le-Roi</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'appartements</h4>
                                    <p className="text-muted-foreground">Solutions avec monte-meubles pour les étages élevés et protection soignée de vos biens et des parties communes.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement de maisons et pavillons</h4>
                                    <p className="text-muted-foreground">Nous gérons les déménagements de maisons avec jardin et accès spécifiques, avec le plus grand soin.</p>
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
            <section id="faq-choisy" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Choisy-le-Roi</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi.</p>
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
            <section id="contact-choisy" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Choisy-le-Roi</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Choisy-le-Roi</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
