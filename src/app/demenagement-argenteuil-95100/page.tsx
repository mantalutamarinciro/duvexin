
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Home, Users, Building, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Dubois", text: "Déménagement très bien géré à Argenteuil. L'équipe a été très professionnelle et efficace, malgré les difficultés de circulation. Un grand bravo !", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Dubois95` },
    { id: "fallback-2", name: "Sophie G.", text: "Un service client à l'écoute et une équipe de déménageurs au top pour mon appartement en centre-ville. Je recommande Déménagement du Vexin.", rating: 5, createTime: "il y a 9 mois", avatarUrl: `https://i.pravatar.cc/48?u=SophieG95A` },
    { id: "fallback-3", name: "Marc T.", text: "Devis clair, équipe ponctuelle et matériel de qualité. Mon déménagement s'est déroulé sans stress grâce à leur organisation.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=MarcT95A` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise d'Argenteuil",
        description: "Du Val d'Argent aux Coteaux, nous connaissons les rues, les accès et les réglementations pour une logistique sans faille dans la plus grande ville du 95."
    },
    {
        icon: <Building className="h-8 w-8 text-primary"/>,
        title: "Gestion des zones denses",
        description: "Nos équipes sont expertes des déménagements en milieu urbain très dense, avec des solutions de monte-meubles adaptées."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Logistique et accès A15/A86",
        description: "Nous maîtrisons les accès via les grands axes pour une ponctualité et une organisation exemplaires."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité administrative",
        description: "Nous gérons pour vous les demandes d'autorisation de stationnement, une démarche indispensable pour déménager sereinement à Argenteuil."
    }
];

const faqItems = [
    {
        question: "Le stationnement est-il compliqué pour un déménagement à Argenteuil ?",
        answer: "Le stationnement peut être un véritable défi à Argenteuil, mais c'est notre métier de le gérer. Nous nous chargeons de la demande d'autorisation auprès de la mairie bien en amont pour réserver un emplacement le jour J. Cela vous garantit la tranquillité et nous permet de travailler dans les meilleures conditions."
    },
    {
        question: "Déménagez-vous les appartements dans les grands ensembles d'Argenteuil ?",
        answer: "Oui, nous avons une grande expérience de ce type d'intervention. La clé est une bonne préparation : visite technique, évaluation des accès, réservation des ascenseurs si possible, et utilisation de monte-meubles pour les étages élevés afin de garantir une opération rapide et sécurisée."
    },
    {
        question: "Quelles sont vos formules pour les petits appartements ?",
        answer: "Nous avons des formules pour tous les besoins et budgets. Notre formule Économique est parfaite pour les petits volumes : vous emballez vos affaires, et nos professionnels s'occupent de la manutention lourde et du transport. C'est une solution idéale pour les étudiants ou les jeunes actifs."
    },
    {
        question: "Comment protégez-vous les parties communes de mon immeuble ?",
        answer: "Le respect des lieux est une priorité. Nos équipes protègent systématiquement les zones de passage : ascenseurs, couloirs, cages d'escalier... avec des couvertures et des protections de sol adaptées pour ne laisser aucune trace de notre passage."
    }
];


export default function ArgenteuilPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/argenteuil/1920/500"
                    alt="Vue sur la ville d'Argenteuil"
                    fill
                    className="object-cover"
                    data-ai-hint="argenteuil cityscape"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement à Argenteuil</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Argenteuil (95100)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte et fiable pour votre projet dans la ville la plus dynamique du Val-d'Oise.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-val-d-oise-95" className="hover:text-primary">Val-d'Oise (95)</Link>
                <span className="mx-2">&gt;</span>
                <span>Argenteuil</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui relève les défis d'Argenteuil</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Argenteuil, la commune la plus peuplée du Val-d'Oise, est un projet qui demande une expertise logistique de premier plan. La densité de la ville, la diversité de son habitat et la complexité de la circulation sont des défis que nous maîtrisons parfaitement.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous sommes fiers de notre connaissance approfondie d'Argenteuil. Que vous emménagiez dans un appartement en centre-ville, un pavillon sur les hauteurs ou que vous transfériez votre entreprise, nous vous garantissons un déménagement serein, rapide et efficace.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/argenteuil-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Argenteuil"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team dense city"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-argenteuil" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Argenteuil</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Notre connaissance du terrain est la clé de votre tranquillité d'esprit.</p>
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
                            src="https://picsum.photos/seed/argenteuil-packing/600/400"
                            alt="Déménageur emballant avec soin des objets fragiles à Argenteuil"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux habitants d'Argenteuil</h2>
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
            <section id="faq-argenteuil" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Argenteuil</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Argenteuil.</p>
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
            <section id="contact-argenteuil" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Argenteuil</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Argenteuil</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
