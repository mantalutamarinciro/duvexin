
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, TreePine, Users, Truck, Building } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Giraud", text: "Notre déménagement dans une maison à Rueil s'est parfaitement déroulé. L'équipe a été très professionnelle et a su s'adapter aux accès spécifiques de notre rue. Un grand merci !", rating: 5, createTime: "il y a 4 mois", avatarUrl: `https://i.pravatar.cc/48?u=Giraud92` },
    { id: "fallback-2", name: "Claire L.", text: "Un service client à l'écoute et une équipe de déménageurs au top pour mon appartement à Rueil 2000. Je recommande les yeux fermés.", rating: 5, createTime: "il y a 9 mois", avatarUrl: `https://i.pravatar.cc/48?u=ClaireL92` },
    { id: "fallback-3", name: "Marc D.", text: "Devis clair, pas de surprise, et une efficacité redoutable le jour J. Déménager à Rueil-Malmaison a été simple grâce à eux.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=MarcD92` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Connaissance de Rueil",
        description: "De Rueil 2000 au centre historique, nous connaissons les particularités de chaque quartier pour une logistique sans accroc."
    },
    {
        icon: <TreePine className="h-8 w-8 text-primary"/>,
        title: "Gestion des zones pavillonnaires",
        description: "Nous avons l'expérience des déménagements de maisons avec jardin et accès spécifiques, très présents à Rueil-Malmaison."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Maîtrise des accès routiers",
        description: "Nous planifions nos interventions en tenant compte des grands axes comme l'A86 pour une ponctualité irréprochable."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Tranquillité administrative",
        description: "Nous gérons pour vous les demandes d'autorisation de stationnement, une démarche indispensable dans de nombreuses rues de la ville."
    }
];

const faqItems = [
    {
        question: "Comment se passe un déménagement dans le centre ancien de Rueil-Malmaison ?",
        answer: "Nous connaissons bien les défis du centre-ville, avec ses rues parfois plus étroites. Nous effectuons une analyse préalable (visite technique ou sur photos) pour choisir le véhicule le plus adapté. Nous nous chargeons également de la réservation de stationnement pour garantir un emplacement au plus près de votre domicile."
    },
    {
        question: "Intervenez-vous dans l'éco-quartier de l'Arsenal ?",
        answer: "Oui, nous intervenons régulièrement dans les nouvelles constructions de Rueil, y compris l'éco-quartier de l'Arsenal. Nous sommes familiers des standards de ces résidences et pouvons nous coordonner avec les syndics pour respecter les procédures d'emménagement."
    },
    {
        question: "Proposez-vous des solutions pour les entreprises de Rueil 2000 ?",
        answer: "Absolument. Nous avons une offre dédiée aux professionnels pour le transfert de bureaux. Nous planifions l'intervention pour minimiser l'impact sur votre activité, en proposant si nécessaire des déménagements en dehors des heures de bureau ou le week-end."
    },
    {
        question: "Quels types de protection utilisez-vous pour les maisons avec des intérieurs fragiles ?",
        answer: "La protection est notre priorité. Nous utilisons des couvertures de protection épaisses pour tous les meubles, des housses spéciales pour les matelas et canapés, et si nécessaire, des protections pour les angles de murs et les sols. Chaque objet fragile est emballé individuellement avec du matériel adapté."
    }
];


export default function RueilMalmaisonPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/rueil-malmaison/1920/500"
                    alt="Vue sur le centre-ville de Rueil-Malmaison"
                    fill
                    className="object-cover"
                    data-ai-hint="rueil-malmaison cityscape"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement à Rueil</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Rueil-Malmaison</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution fiable et locale pour votre déménagement à Rueil-Malmaison (92500).</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-hauts-de-seine-92" className="hover:text-primary">Hauts-de-Seine (92)</Link>
                <span className="mx-2">&gt;</span>
                <span>Rueil-Malmaison</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui connaît Rueil-Malmaison sur le bout des doigts</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Rueil-Malmaison, ville impériale au cadre de vie verdoyant, est un lieu de résidence très prisé. Déménager ici demande de concilier la tranquillité des quartiers pavillonnaires avec la dynamique d'un pôle économique majeur comme Rueil 2000.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous sommes fiers de notre expertise locale. Nous maîtrisons les spécificités de Rueil, de la gestion des accès dans le centre historique à la planification logistique pour les grandes entreprises. Nous vous garantissons un déménagement serein, efficace et parfaitement adapté à votre environnement.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/rueil-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Rueil-Malmaison"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team elegant suburb"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-rueil" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Rueil-Malmaison</h2>
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
                            src="https://picsum.photos/seed/rueil-packing/600/400"
                            alt="Déménageur emballant avec soin des objets pour un déménagement à Rueil-Malmaison"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover careful packing house"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux particuliers et professionnels de Rueil</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement de maisons et pavillons</h4>
                                    <p className="text-muted-foreground">Une expertise particulière pour les déménagements de maisons avec un soin apporté à la protection de vos biens et de votre propriété.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'appartements</h4>
                                    <p className="text-muted-foreground">Nous gérons les contraintes liées aux étages et aux accès en immeuble, avec des solutions de monte-meubles si nécessaire.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Transfert d'entreprises</h4>
                                    <p className="text-muted-foreground">Un service clé en main pour les entreprises du pôle Rueil 2000 et d'ailleurs, pour une transition sans impact sur votre activité.</p>
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
            <section id="faq-rueil" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Rueil-Malmaison</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Rueil.</p>
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
            <section id="contact-rueil" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Rueil-Malmaison</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Rueil-Malmaison</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
