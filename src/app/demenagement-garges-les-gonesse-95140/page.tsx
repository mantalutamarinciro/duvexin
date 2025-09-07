
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Home, Users, Building, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Yilmaz", text: "Déménagement très bien organisé à Garges-lès-Gonesse. L'équipe a été rapide, professionnelle et a fait très attention à nos affaires. Un grand merci.", rating: 5, createTime: "il y a 4 mois", avatarUrl: `https://i.pravatar.cc/48?u=Yilmaz95` },
    { id: "fallback-2", name: "David M.", text: "Service impeccable. Devis clair et équipe ponctuelle. Le déménagement s'est déroulé sans le moindre stress, je recommande cette entreprise.", rating: 5, createTime: "il y a 9 mois", avatarUrl: `https://i.pravatar.cc/48?u=DavidM95` },
    { id: "fallback-3", name: "Mme. Ait", text: "Efficacité et professionnalisme. Ils ont géré les accès à mon immeuble sans problème. Je ferai de nouveau appel à eux.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Ait95` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Garges-lès-Gonesse",
        description: "Du centre-ville aux quartiers résidentiels, nous connaissons les rues, les accès et les réglementations pour une logistique sans faille."
    },
    {
        icon: <Building className="h-8 w-8 text-primary"/>,
        title: "Gestion des immeubles denses",
        description: "Nos équipes sont expertes des déménagements en appartements et en étages, avec des solutions de monte-meubles adaptées."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Logistique et accès A1/A3",
        description: "Nous maîtrisons les accès via les grands axes pour assurer une ponctualité et une organisation exemplaires."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité administrative",
        description: "Nous gérons pour vous les demandes d'autorisation de stationnement, une démarche indispensable dans cette ville dynamique."
    }
];

const faqItems = [
    {
        question: "Comment se déroule un déménagement dans un grand immeuble à Garges-lès-Gonesse ?",
        answer: "Nous avons une grande expérience de ce type d'intervention. La préparation est la clé : visite technique pour évaluer les accès, réservation des ascenseurs si possible, et si nécessaire, mise en place d'un monte-meubles. Cela garantit une intervention rapide, sécurisée et respectueuse du voisinage."
    },
    {
        question: "Le stationnement est-il compliqué pour un déménagement à Garges ?",
        answer: "Dans certains secteurs, oui. C'est pourquoi nous incluons la gestion des autorisations de stationnement dans nos prestations. Nous nous occupons des démarches auprès de la mairie pour vous garantir un emplacement le jour J, ce qui vous évite du stress et nous fait gagner en efficacité."
    },
    {
        question: "Déménagez-vous aussi les entreprises et les commerces ?",
        answer: "Oui, nous proposons des services dédiés aux professionnels. Que ce soit pour des bureaux, des commerces ou des locaux d'activité, nous organisons le transfert pour minimiser l'impact sur votre activité."
    },
    {
        question: "Quelles sont vos formules pour un petit budget ?",
        answer: "Nous proposons des formules flexibles. Notre formule 'Économique', où vous vous chargez de l'emballage et nous de la manutention lourde et du transport, est une excellente solution pour maîtriser votre budget tout en bénéficiant de notre savoir-faire professionnel."
    }
];


export default function GargesLesGonessePage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/garges/1920/500"
                    alt="Vue sur la ville de Garges-lès-Gonesse"
                    fill
                    className="object-cover"
                    data-ai-hint="garges les gonesse cityscape"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Garges-lès-Gonesse</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution efficace et fiable pour votre projet à Garges-lès-Gonesse (95140).</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-val-d-oise-95" className="hover:text-primary">Val-d'Oise (95)</Link>
                <span className="mx-2">&gt;</span>
                <span>Garges-lès-Gonesse</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui connaît le dynamisme de Garges-lès-Gonesse</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Garges-lès-Gonesse, ville dynamique et cosmopolite du Val-d'Oise, demande une organisation rigoureuse et une connaissance fine du terrain. Son urbanisme dense et sa proximité avec les grands axes et l'aéroport du Bourget en font un secteur logistique exigeant.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous sommes fiers de notre expertise locale. Que vous emménagiez dans un appartement ou un pavillon, nous vous garantissons un déménagement serein, rapide et efficace, adapté aux réalités de la ville.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/garges-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Garges-lès-Gonesse"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team urban city"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-garges" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Garges</h2>
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
                            src="https://picsum.photos/seed/garges-packing/600/400"
                            alt="Déménageur emballant avec soin des objets fragiles"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing boxes"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux habitants de Garges-lès-Gonesse</h2>
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
            <section id="faq-garges" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Garges</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Garges-lès-Gonesse.</p>
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
            <section id="contact-garges" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Garges-lès-Gonesse</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Garges-lès-Gonesse</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
