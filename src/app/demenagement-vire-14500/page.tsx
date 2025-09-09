
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Home, Users, Building, Truck, Trees } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Leconte", text: "Notre déménagement dans une maison du bocage près de Vire a été une réussite. L'équipe a été très professionnelle et a su gérer les accès parfois compliqués.", rating: 5, createTime: "il y a 4 mois", avatarUrl: `https://i.pravatar.cc/48?u=Leconte14V` },
    { id: "fallback-2", name: "Jean-Pierre D.", text: "Très bonne expérience pour mon appartement à Vire. Devis clair et équipe ponctuelle. Un déménagement sans stress.", rating: 5, createTime: "il y a 10 mois", avatarUrl: `https://i.pravatar.cc/48?u=JPD14V` },
    { id: "fallback-3", name: "Sophie M.", text: "Efficacité et professionnalisme. Je recommande vivement Déménagement du Vexin pour leur sérieux et leur connaissance de la région.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=SophieM14V` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Vire",
        description: "Du centre-ville reconstruit aux campagnes du Bocage, nous connaissons les accès et spécificités de la région viroise."
    },
    {
        icon: <Trees className="h-8 w-8 text-primary"/>,
        title: "Spécialiste du Bocage",
        description: "Nous avons l'habitude d'intervenir dans des maisons et fermes en milieu rural, avec des solutions pour les accès difficiles."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Logistique Adaptée",
        description: "Nous utilisons des véhicules de tailles variées pour nous adapter à toutes les configurations, du centre-ville aux chemins de campagne."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "La Proximité de l'Agence d'Évreux",
        description: "Notre base locale nous permet d'être réactifs et compétitifs pour tous vos projets à Vire et dans ses environs."
    }
];

const faqItems = [
    {
        question: "Comment se passe un déménagement dans une maison de campagne du Bocage Virois ?",
        answer: "C'est une situation que nous rencontrons souvent. Une visite technique nous permet d'évaluer les accès qui peuvent être étroits ou non goudronnés. Nous disposons de véhicules adaptés et nos équipes sont expertes en manutention pour protéger vos biens et votre propriété, quel que soit l'environnement."
    },
    {
        question: "Assurez-vous les déménagements longue distance depuis Vire ?",
        answer: "Oui, notre expertise ne se limite pas au local. Que vous quittiez Vire pour une autre région ou que vous y arriviez, nous gérons votre déménagement de A à Z avec la même rigueur et le même professionnalisme, en nous appuyant sur notre agence d'Évreux."
    },
    {
        question: "Je déménage dans le centre reconstruit de Vire, y a-t-il des contraintes ?",
        answer: "Le centre de Vire est bien accessible, mais nous restons vigilants sur le stationnement. Nous nous chargeons de la demande d'autorisation auprès de la mairie pour garantir une place et une intervention fluide."
    },
    {
        question: "Quelles sont vos formules pour les petits budgets ?",
        answer: "Nous proposons des formules flexibles. Notre formule 'Économique' est une excellente solution pour maîtriser votre budget : vous vous chargez de l'emballage, et nos professionnels assurent la manutention lourde et le transport sécurisé de vos biens."
    }
];


export default function VirePage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/vire/1920/500"
                    alt="La Porte Horloge de Vire"
                    fill
                    className="object-cover"
                    data-ai-hint="Vire clock gate"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement à Vire</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Vire (14500)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte et locale pour votre projet au cœur du Bocage Normand.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-calvados-14" className="hover:text-primary">Calvados (14)</Link>
                <span className="mx-2">&gt;</span>
                <span>Vire</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui connaît le cœur du Bocage Virois</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Vire, capitale du Bocage Normand, c'est choisir une ville de caractère reconstruite avec soin, entourée d'une nature préservée. Cette situation unique demande une approche du déménagement qui allie logistique urbaine et expertise rurale.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Grâce à notre agence d'Évreux, nous sommes votre expert de proximité pour Vire et ses environs. Que vous emménagiez dans le centre-ville, un appartement moderne ou une maison de campagne, nous vous garantissons un déménagement serein et parfaitement orchestré.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/vire-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Vire"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team normandy town"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-vire" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Vire</h2>
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
                            src="https://picsum.photos/seed/vire-packing/600/400"
                            alt="Déménageur emballant avec soin des objets fragiles"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing boxes"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux habitants de Vire</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement de maisons et appartements</h4>
                                    <p className="text-muted-foreground">Une expertise particulière pour les déménagements en centre-ville comme en pleine campagne.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'entreprises et commerces</h4>
                                    <p className="text-muted-foreground">Nous organisons le transfert de votre activité pour minimiser l'impact et assurer une reprise rapide.</p>
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
            <section id="faq-vire" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Vire</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Vire.</p>
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
            <section id="contact-vire" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Vire</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Vire</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
