
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Truck, Users, Building, Brush } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Dubois", text: "Déménagement de notre appartement à Vitry parfaitement orchestré. L'équipe a géré les accès à l'immeuble avec une grande efficacité. Un grand merci !", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Dubois94` },
    { id: "fallback-2", name: "Marc T.", text: "Très bonne expérience. De la prise de contact au jour J, tout a été fluide et sans stress. Une entreprise sérieuse et fiable pour un déménagement à Vitry.", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=MarcT94` },
    { id: "fallback-3", name: "Atelier Créa", text: "Le transfert de notre atelier d'artiste a été une réussite. L'équipe a pris un soin particulier de nos œuvres et de notre matériel. Des vrais pros !", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Crea94` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Vitry-sur-Seine",
        description: "Du centre-ville aux zones plus résidentielles, nous connaissons les rues, les accès et les réglementations pour une logistique sans faille."
    },
    {
        icon: <Building className="h-8 w-8 text-primary"/>,
        title: "Gestion des immeubles denses",
        description: "Nos équipes sont habituées aux contraintes des grands ensembles et des résidences, avec des solutions de monte-meubles si nécessaire."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Logistique et Monte-Meubles",
        description: "Nous gérons les autorisations de stationnement et déployons des solutions de levage pour un service efficace et sécurisé en toutes circonstances."
    },
    {
        icon: <Brush className="h-8 w-8 text-primary"/>,
        title: "Soin et attention",
        description: "Vitry étant une ville d'art, nous portons un soin particulier à tous vos biens, des plus standards aux plus fragiles comme les œuvres d'art."
    }
];

const faqItems = [
    {
        question: "Comment se déroule un déménagement dans un grand immeuble à Vitry ?",
        answer: "C'est notre spécialité. La préparation est la clé. Nous effectuons une visite technique (ou une analyse à distance) pour évaluer la situation, nous nous renseignons sur le règlement de copropriété pour les horaires et nous réservons les ascenseurs ou un emplacement pour monte-meubles."
    },
    {
        question: "Le stationnement est-il difficile à obtenir pour un déménagement à Vitry ?",
        answer: "Le stationnement en ville dense est toujours un défi, mais c'est notre métier de le surmonter. Nous nous occupons de la demande d'autorisation de stationnement auprès de la mairie de Vitry-sur-Seine bien à l'avance pour garantir un emplacement le jour J."
    },
    {
        question: "J'ai des œuvres d'art à déménager, avez-vous une expertise particulière ?",
        answer: "Oui, Vitry-sur-Seine est une ville reconnue pour le street-art et l'art en général, et nous avons développé une expertise dans le transport d'objets fragiles et de valeur. Nous utilisons des emballages spécifiques (caisses sur mesure, papier de soie, etc.) pour garantir une protection maximale."
    },
    {
        question: "Quelles sont vos formules pour un petit appartement ou un déménagement d'étudiant ?",
        answer: "Nous proposons des formules flexibles pour tous les budgets. Notre formule Économique, où vous gérez l'emballage et nous la manutention et le transport, est une solution très appréciée pour maîtriser les coûts tout en bénéficiant d'un service professionnel."
    }
];


export default function VitrySurSeinePage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/vitry/1920/500"
                    alt="Vue sur la ville de Vitry-sur-Seine"
                    fill
                    className="object-cover"
                    data-ai-hint="vitry sur seine cityscape"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement à Vitry</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Vitry-sur-Seine</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution efficace et locale pour votre projet à Vitry-sur-Seine (94400), ville d'art et de dynamisme.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-val-de-marne-94" className="hover:text-primary">Val-de-Marne (94)</Link>
                <span className="mx-2">&gt;</span>
                <span>Vitry-sur-Seine</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur expert pour la ville de Vitry-sur-Seine</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Vitry-sur-Seine, la plus grande ville du Val-de-Marne, demande une connaissance approfondie de son tissu urbain dense et varié. Ville d'art et de culture, en pleine transformation, elle présente des défis logistiques que seuls des professionnels peuvent relever avec brio.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous connaissons parfaitement Vitry. Que vous emménagiez dans un appartement en centre-ville, un pavillon ou un atelier d'artiste, nous planifions chaque détail pour un déménagement fluide, rapide et sans stress.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/vitry-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Vitry-sur-Seine"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team urban art city"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-vitry" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Vitry</h2>
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
                            src="https://picsum.photos/seed/vitry-packing/600/400"
                            alt="Déménageur emballant avec soin des objets pour un déménagement à Vitry"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing art"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux particuliers et professionnels de Vitry</h2>
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
                                    <h4 className="font-semibold">Transfert d'ateliers et de bureaux</h4>
                                    <p className="text-muted-foreground">Un service efficace pour les artistes et les entreprises, planifié pour minimiser l'impact sur votre activité.</p>
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
            <section id="faq-vitry" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Vitry</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Vitry-sur-Seine.</p>
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
            <section id="contact-vitry" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Vitry-sur-Seine</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Vitry-sur-Seine</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
