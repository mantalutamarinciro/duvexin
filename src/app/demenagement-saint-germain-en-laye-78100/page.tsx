
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Castle, Users, Building, Truck, TreePine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Lambert", text: "Le déménagement de notre maison à Saint-Germain-en-Laye a été parfaitement exécuté. Une équipe professionnelle, soigneuse et très à l'écoute.", rating: 5, createTime: "il y a 2 mois", avatarUrl: `https://i.pravatar.cc/48?u=Lambert78` },
    { id: "fallback-2", name: "Alice D.", text: "Service impeccable pour mon appartement dans le centre. Ils ont géré les accès difficiles avec brio. Je recommande vivement leurs services.", rating: 5, createTime: "il y a 6 mois", avatarUrl: `https://i.pravatar.cc/48?u=AliceD78` },
    { id: "fallback-3", name: "M. Fournier", text: "Efficacité et professionnalisme sont les maîtres mots. Mon déménagement s'est déroulé sans le moindre stress. Une entreprise de confiance.", rating: 5, createTime: "il y a 11 mois", avatarUrl: `https://i.pravatar.cc/48?u=Fournier78` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Saint-Germain",
        description: "Du centre historique aux quartiers résidentiels, nous connaissons les rues, les accès et les réglementations pour une logistique parfaite."
    },
    {
        icon: <Castle className="h-8 w-8 text-primary"/>,
        title: "Respect des Demeures de Caractère",
        description: "Nous intervenons avec soin dans les immeubles de standing et les maisons de maître, protégeant l'architecture et vos biens précieux."
    },
    {
        icon: <TreePine className="h-8 w-8 text-primary"/>,
        title: "Gestion des Accès complexes",
        description: "Nous maîtrisons la logistique pour les rues étroites, les cours pavées et le déploiement de monte-meubles quand c'est nécessaire."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Tranquillité Administrative",
        description: "Nous nous chargeons des demandes d'autorisation de stationnement, une démarche indispensable dans cette ville historique."
    }
];

const faqItems = [
    {
        question: "Est-ce difficile de déménager dans le centre historique de Saint-Germain-en-Laye ?",
        answer: "Le centre historique présente des défis, notamment des rues étroites et un stationnement limité. C'est pourquoi notre expertise locale est cruciale. Nous effectuons une visite technique pour planifier l'intervention et utilisons des véhicules adaptés. La gestion de l'autorisation de stationnement, que nous prenons en charge, est la clé d'un déménagement réussi."
    },
    {
        question: "Déménagez-vous les pianos et autres objets lourds dans les appartements sans ascenseur ?",
        answer: "Oui, c'est une de nos spécialités. Nos équipes sont formées et équipées pour la manutention d'objets lourds et fragiles. Nous utilisons des techniques de portage sécurisées et, si nécessaire, un monte-meubles pour garantir la sécurité de votre piano et de l'immeuble."
    },
    {
        question: "Intervenez-vous également dans les communes avoisinantes comme Le Vésinet ou Marly-le-Roi ?",
        answer: "Absolument. Notre connaissance des Yvelines s'étend à toutes les communes environnantes. Que vous déménagiez au Vésinet, à Marly-le-Roi, au Pecq ou à Maisons-Laffitte, nous vous offrons le même niveau d'expertise et de service."
    },
    {
        question: "Comment protégez-vous les sols et les parties communes lors d'un déménagement ?",
        answer: "Le respect des lieux est une priorité. Nous protégeons systématiquement les sols avec des tapis ou des moquettes de protection, ainsi que les angles de murs et les cages d'escalier dans les parties communes. Notre objectif est de laisser les lieux, de départ comme d'arrivée, en parfait état."
    }
];


export default function SaintGermainPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/saint-germain/1920/500"
                    alt="Le Château de Saint-Germain-en-Laye"
                    fill
                    className="object-cover"
                    data-ai-hint="saint germain en laye chateau"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">L'expert de votre déménagement à Saint-Germain</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Saint-Germain-en-Laye</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">Un service d'excellence pour un déménagement à la hauteur du prestige de la ville royale (78100).</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-yvelines-78" className="hover:text-primary">Yvelines (78)</Link>
                <span className="mx-2">&gt;</span>
                <span>Saint-Germain-en-Laye</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui comprend le cachet de Saint-Germain-en-Laye</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Saint-Germain-en-Laye, ville royale au patrimoine exceptionnel, requiert une approche alliant savoir-faire, soin et discrétion. Les rues pavées du centre, les immeubles de caractère et les belles demeures demandent une expertise logistique que seuls des professionnels expérimentés peuvent offrir.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous sommes fiers de notre connaissance approfondie de Saint-Germain-en-Laye. Nous planifions chaque déménagement avec une attention particulière pour préserver l'intégrité de votre patrimoine et des lieux, tout en assurant une efficacité et une sérénité maximales.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/saint-germain-move/600/400"
                            alt="Équipe de déménagement professionnelle intervenant à Saint-Germain-en-Laye"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team historic town"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-saint-germain" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire privilégié pour déménager à Saint-Germain</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Notre expertise est à la hauteur de vos exigences.</p>
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
                            src="https://picsum.photos/seed/saint-germain-packing/600/400"
                            alt="Déménageur emballant avec soin des objets fragiles"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover packing fragile items"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des prestations sur-mesure pour votre projet</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'appartements de standing</h4>
                                    <p className="text-muted-foreground">Une expertise pointue pour la protection de vos biens et des parties communes prestigieuses.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement de maisons et villas</h4>
                                    <p className="text-muted-foreground">Une logistique adaptée aux grands volumes et à la manipulation d'objets de valeur ou encombrants.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Formule "Prestige" clé en main</h4>
                                    <p className="text-muted-foreground">Nous nous occupons de tout, de l'emballage à la réinstallation, pour votre confort absolu.</p>
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
            <section id="faq-saint-germain" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement St-Germain</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Saint-Germain-en-Laye.</p>
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
            <section id="contact-saint-germain" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Saint-Germain-en-Laye</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos conseillers pour une étude personnalisée de votre projet et obtenez un devis à la hauteur de vos attentes.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Saint-Germain-en-Laye</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
