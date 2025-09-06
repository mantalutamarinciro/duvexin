
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, TreePine, Users, Building, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Moreau", text: "Le déménagement de notre maison à Antony a été une vraie réussite. L'équipe a été très professionnelle et a su s'adapter aux accès de notre rue. Un grand bravo.", rating: 5, createTime: "il y a 4 mois", avatarUrl: `https://i.pravatar.cc/48?u=Moreau92` },
    { id: "fallback-2", name: "Sophie G.", text: "Un service client à l'écoute et une équipe de déménageurs très efficace pour mon appartement près du centre-ville. Je recommande sans la moindre hésitation.", rating: 5, createTime: "il y a 9 mois", avatarUrl: `https://i.pravatar.cc/48?u=SophieG92` },
    { id: "fallback-3", name: "Marc T.", text: "Devis clair, équipe ponctuelle et matériel de qualité. Déménager à Antony a été bien plus simple que je ne l'imaginais grâce à eux.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=MarcT92` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Connaissance d'Antony",
        description: "Du centre-ville aux quartiers résidentiels, nous connaissons les particularités d'Antony pour une logistique fluide et efficace."
    },
    {
        icon: <TreePine className="h-8 w-8 text-primary"/>,
        title: "Spécialiste du Pavillonnaire",
        description: "Nous avons une grande expérience dans le déménagement de maisons avec jardin et accès spécifiques, très nombreuses à Antony."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Maîtrise des accès",
        description: "Nous planifions nos interventions en tenant compte de la proximité des grands axes (A6, A10) et des transports (RER B) pour une ponctualité exemplaire."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Tranquillité d'esprit",
        description: "Nous gérons pour vous les demandes d'autorisation de stationnement auprès de la mairie, un souci en moins pour vous."
    }
];

const faqItems = [
    {
        question: "Comment se déroule un déménagement dans un quartier pavillonnaire d'Antony ?",
        answer: "Nous portons une attention particulière à la protection de votre propriété et de votre voisinage. Nous utilisons des véhicules de taille adaptée pour ne pas encombrer les rues et planifions l'intervention pour minimiser toute gêne. Une visite technique préalable nous permet d'anticiper toutes les spécificités."
    },
    {
        question: "Proposez-vous des formules pour les étudiants ou les petits appartements à Antony ?",
        answer: "Oui, absolument. Nous proposons des formules économiques et des solutions pour les petits volumes, idéales pour les étudiants, les jeunes actifs ou les personnes vivant en appartement. N'hésitez pas à nous contacter pour un devis sur mesure."
    },
    {
        question: "Gérez-vous les déménagements de ou vers la province depuis Antony ?",
        answer: "Oui. Bien que nous soyons des experts locaux, nous assurons des déménagements nationaux depuis Antony vers toutes les régions de France, et inversement. Nous gérons la logistique longue distance avec le même professionnalisme."
    },
    {
        question: "Quels types de protection utilisez-vous pour les biens fragiles ?",
        answer: "La protection de vos affaires est notre priorité. Nous utilisons des couvertures de protection épaisses, des housses spéciales pour matelas et canapés, et du matériel d'emballage professionnel (cartons renforcés, papier bulle) pour tous les objets fragiles comme la vaisselle ou les cadres."
    }
];


export default function AntonyPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/antony/1920/500"
                    alt="Vue sur un quartier résidentiel d'Antony"
                    fill
                    className="object-cover"
                    data-ai-hint="antony cityscape suburb"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement à Antony</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Antony (92160)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution fiable et locale pour les particuliers et les entreprises à Antony.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-hauts-de-seine-92" className="hover:text-primary">Hauts-de-Seine (92)</Link>
                <span className="mx-2">&gt;</span>
                <span>Antony</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui comprend le cadre de vie d'Antony</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Antony, ville appréciée pour son cadre de vie verdoyant et ses nombreux quartiers pavillonnaires, offre un environnement agréable aux portes de Paris. Déménager ici, c'est souvent jongler entre des accès résidentiels spécifiques et la nécessité d'une logistique efficace.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous sommes fiers de notre expertise locale. Nous connaissons les particularités d'Antony, de ses rues calmes à ses axes plus passants. Nous vous garantissons une organisation sans faille pour un déménagement serein, que vous emménagiez dans une maison ou un appartement.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/antony-move/600/400"
                            alt="Équipe de déménagement professionnelle intervenant dans un quartier pavillonnaire à Antony"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team suburban house"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-antony" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Antony</h2>
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
                            src="https://picsum.photos/seed/antony-packing/600/400"
                            alt="Déménageur emballant avec soin des objets pour un déménagement à Antony"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover careful packing"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services pensés pour les habitants d'Antony</h2>
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
                                    <h4 className="font-semibold">Formules sur-mesure</h4>
                                    <p className="text-muted-foreground">De la simple location de camion avec chauffeur à la prestation clé en main, vous choisissez le niveau de service qui vous convient.</p>
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
            <section id="faq-antony" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Antony</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Antony.</p>
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
            <section id="contact-antony" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Antony</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Antony</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
