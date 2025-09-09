
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Home, Users, Building, Truck, Landmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Levasseur", text: "Notre déménagement à Lisieux a été une réussite. L'équipe a été très professionnelle et a su gérer les accès du centre-ville avec soin.", rating: 5, createTime: "il y a 5 mois", avatarUrl: `https://i.pravatar.cc/48?u=Levasseur14` },
    { id: "fallback-2", name: "Jean-Pierre D.", text: "Très bonne expérience pour mon appartement. Devis clair et équipe ponctuelle. Un déménagement sans stress.", rating: 5, createTime: "il y a 10 mois", avatarUrl: `https://i.pravatar.cc/48?u=JPD14` },
    { id: "fallback-3", name: "Sophie M.", text: "Efficacité et professionnalisme. Je recommande vivement Déménagement du Vexin pour leur sérieux.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=SophieM14` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Lisieux",
        description: "Du centre historique aux quartiers résidentiels, nous connaissons les accès et spécificités de la capitale du Pays d'Auge."
    },
    {
        icon: <Landmark className="h-8 w-8 text-primary"/>,
        title: "Respect du Patrimoine",
        description: "Nous intervenons avec un soin particulier dans le centre ancien, en protégeant les lieux et vos biens les plus précieux."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Logistique Adaptée",
        description: "Nous utilisons des véhicules de tailles variées pour nous adapter à toutes les configurations, même les plus complexes."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "La Proximité de nos Agences",
        description: "Avec notre base d'Évreux, nous sommes votre partenaire de proximité pour tout projet à Lisieux et dans le Calvados."
    }
];

const faqItems = [
    {
        question: "Comment se passe un déménagement dans le centre-ville de Lisieux ?",
        answer: "Le centre de Lisieux, avec ses rues commerçantes, peut présenter des défis d'accès. Nous effectuons une analyse en amont pour choisir le véhicule le plus adapté. Nous nous chargeons également de la réservation de stationnement auprès de la mairie pour garantir une place et une intervention efficace."
    },
    {
        question: "Assurez-vous les déménagements longue distance depuis Lisieux ?",
        answer: "Oui, notre expertise ne se limite pas au local. Que vous quittiez Lisieux pour une autre région ou que vous y arriviez, nous gérons votre déménagement de A à Z avec la même rigueur et le même professionnalisme, en nous appuyant sur notre agence d'Évreux."
    },
    {
        question: "Je déménage dans une longère normande, comment faites-vous ?",
        answer: "C'est une situation que nous rencontrons souvent. Nous disposons de plusieurs tailles de véhicules et d'équipements pour protéger vos biens et les accès parfois étroits de ces belles demeures. La visite technique nous permet d'anticiper toutes les spécificités."
    },
    {
        question: "Quelles sont vos formules pour les petits budgets ?",
        answer: "Nous proposons des formules flexibles. Notre formule 'Économique' est une excellente solution pour maîtriser votre budget : vous vous chargez de l'emballage, et nos professionnels assurent la manutention lourde et le transport sécurisé de vos biens."
    }
];


export default function LisieuxPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/lisieux/1920/500"
                    alt="La basilique Sainte-Thérèse de Lisieux"
                    fill
                    className="object-cover"
                    data-ai-hint="Lisieux basilica"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement à Lisieux</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Lisieux (14100)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte et locale pour votre projet au cœur du Pays d'Auge.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-calvados-14" className="hover:text-primary">Calvados (14)</Link>
                <span className="mx-2">&gt;</span>
                <span>Lisieux</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui connaît le cœur du Pays d'Auge</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Lisieux, capitale du Pays d'Auge et haut lieu de spiritualité, demande une approche respectueuse et une logistique efficace. Son centre-ville animé et ses quartiers résidentiels paisibles offrent une grande diversité d'habitats.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Grâce à notre agence d'Évreux, Déménagement du Vexin est votre expert local. Que vous emménagiez dans une maison de ville, un appartement ou un pavillon, nous vous garantissons un déménagement serein et parfaitement orchestré.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/lisieux-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Lisieux"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team historic town"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-lisieux" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Lisieux</h2>
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
                            src="https://picsum.photos/seed/lisieux-packing/600/400"
                            alt="Déménageur emballant avec soin des objets fragiles"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing antique"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux habitants de Lisieux</h2>
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
                                    <p className="text-muted-foreground">Nous gérons les contraintes liées aux étages et aux accès en centre-ville avec des solutions adaptées.</p>
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
            <section id="faq-lisieux" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Lisieux</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Lisieux.</p>
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
            <section id="contact-lisieux" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Lisieux</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Lisieux</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
