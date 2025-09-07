
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Home, Users, Building, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Diallo", text: "Déménagement de notre appartement à Sarcelles parfaitement géré. L'équipe a été très professionnelle et a su s'adapter aux accès de l'immeuble. Un grand bravo.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Diallo95` },
    { id: "fallback-2", name: "Sophie G.", text: "Très bonne expérience. Devis clair et service impeccable. Un déménagement sans stress, même avec un grand volume. Merci !", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=SophieG95S` },
    { id: "fallback-3", name: "Marc T.", text: "Efficacité, rapidité et professionnalisme. Je recommande Déménagement du Vexin pour tout projet à Sarcelles.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=MarcT95S` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Sarcelles",
        description: "Du Grand Ensemble au Village, en passant par les Chardonnerettes, nous connaissons les rues, les accès et les réglementations."
    },
    {
        icon: <Building className="h-8 w-8 text-primary"/>,
        title: "Gestion des grands ensembles",
        description: "Nos équipes sont expertes des déménagements en appartements et en étages, avec des solutions de monte-meubles adaptées."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Logistique et accès",
        description: "Nous maîtrisons la logistique autour des grands axes (N16, RD301) et des gares RER pour assurer une ponctualité exemplaire."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité administrative",
        description: "Nous gérons pour vous les demandes d'autorisation de stationnement, une démarche indispensable dans cette ville dense."
    }
];

const faqItems = [
    {
        question: "Comment se déroule un déménagement dans un grand immeuble à Sarcelles ?",
        answer: "C'est notre spécialité. La clé est la préparation : visite technique pour évaluer les accès, réservation des ascenseurs si possible et, si nécessaire, mise en place d'un monte-meubles pour les étages élevés. Cela garantit une intervention rapide, sécurisée et respectueuse du voisinage."
    },
    {
        question: "Le stationnement est-il compliqué pour un déménagement à Sarcelles ?",
        answer: "Dans certains secteurs, le stationnement peut être un défi. C'est pourquoi nous incluons systématiquement la gestion des autorisations de stationnement dans nos prestations. Nous nous occupons des démarches auprès de la mairie pour vous garantir un emplacement le jour J."
    },
    {
        question: "Déménagez-vous aussi dans les quartiers pavillonnaires comme le Village ?",
        answer: "Oui, absolument. Nous adaptons notre logistique et la taille de nos véhicules pour intervenir avec le même soin et la même efficacité dans les zones pavillonnaires et les rues plus calmes que dans les grands ensembles."
    },
    {
        question: "Quelles sont vos formules pour un petit budget ?",
        answer: "Nous proposons des formules flexibles. Notre formule 'Économique' est une excellente solution pour maîtriser votre budget : vous vous chargez de l'emballage, et nos professionnels assurent la manutention lourde et le transport sécurisé de vos biens."
    }
];


export default function SarcellesPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/sarcelles/1920/500"
                    alt="Vue sur la ville de Sarcelles"
                    fill
                    className="object-cover"
                    data-ai-hint="sarcelles cityscape france"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement à Sarcelles</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Sarcelles (95200)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution efficace et fiable pour votre projet dans l'une des plus grandes villes du Val-d'Oise.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-val-d-oise-95" className="hover:text-primary">Val-d'Oise (95)</Link>
                <span className="mx-2">&gt;</span>
                <span>Sarcelles</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui maîtrise les défis de Sarcelles</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Sarcelles, sous-préfecture et ville majeure du Val-d'Oise, est un projet qui demande une expertise logistique de premier plan. La densité de la ville, la diversité de son habitat, des grands ensembles aux zones pavillonnaires, sont des défis que nous maîtrisons parfaitement.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous sommes fiers de notre connaissance approfondie de Sarcelles. Que vous emménagiez dans un appartement en hauteur, une maison de ville ou que vous transfériez votre entreprise, nous vous garantissons un déménagement serein, rapide et efficace.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/sarcelles-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Sarcelles"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team urban city"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-sarcelles" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Sarcelles</h2>
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
                            src="https://picsum.photos/seed/sarcelles-packing/600/400"
                            alt="Déménageur emballant avec soin des objets pour un déménagement à Sarcelles"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing boxes"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux habitants de Sarcelles</h2>
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
            <section id="faq-sarcelles" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Sarcelles</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Sarcelles.</p>
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
            <section id="contact-sarcelles" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Sarcelles</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Sarcelles</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
