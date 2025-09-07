
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Truck, Users, Building, TreePine, Gem } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Dufresne", text: "Un déménagement géré de A à Z avec un professionnalisme rare. L'équipe a été particulièrement soigneuse avec nos meubles anciens et a respecté la quiétude de l'immeuble. Service impeccable à Saint-Mandé.", rating: 5, createTime: "il y a 2 mois", avatarUrl: `https://i.pravatar.cc/48?u=Dufresne94` },
    { id: "fallback-2", name: "Charles E.", text: "Très satisfait de la prestation. Ils ont obtenu l'autorisation de stationnement dans une rue compliquée et le déménagement s'est déroulé rapidement et sans aucun souci. Je recommande vivement.", rating: 5, createTime: "il y a 6 mois", avatarUrl: `https://i.pravatar.cc/48?u=CharlesE94` },
    { id: "fallback-3", name: "Cabinet Médical", text: "Le transfert de notre matériel s'est fait avec discrétion et efficacité. Une équipe très professionnelle et à l'écoute de nos contraintes. Parfait.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=MedicalSM` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Saint-Mandé",
        description: "Nous connaissons les rues, les sens uniques et les réglementations de stationnement pour une logistique d'une précision chirurgicale."
    },
    {
        icon: <Gem className="h-8 w-8 text-primary"/>,
        title: "Respect des immeubles de standing",
        description: "Nous intervenons avec un soin infini, en protégeant les parquets, moulures et parties communes des magnifiques bâtiments de la ville."
    },
    {
        icon: <TreePine className="h-8 w-8 text-primary"/>,
        title: "Proximité du Bois de Vincennes",
        description: "Nous maîtrisons les accès spécifiques des rues bordant le bois, en alliant efficacité et respect de cet environnement privilégié."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Discrétion et Confidentialité",
        description: "Nous garantissons une discrétion absolue et une sécurité maximale pour le déménagement de votre patrimoine."
    }
];

const faqItems = [
    {
        question: "Le stationnement est-il très compliqué à Saint-Mandé ?",
        answer: "Le stationnement est en effet l'un des défis majeurs à Saint-Mandé. C'est pourquoi nous intégrons systématiquement la gestion complète des autorisations de stationnement dans nos prestations. Nous nous chargeons de tout auprès de la mairie pour vous assurer une tranquillité totale le jour J."
    },
    {
        question: "Comment déménagez-vous les objets fragiles dans des appartements anciens ?",
        answer: "C'est notre spécialité. Nous utilisons des emballages sur-mesure (caisses pour tableaux, barrels pour la vaisselle) et nos équipes sont formées aux techniques de manipulation les plus délicates. L'utilisation d'un monte-meubles est souvent privilégiée pour éviter les cages d'escalier étroites et protéger vos biens de valeur."
    },
    {
        question: "Faites-vous preuve de discrétion lors de vos interventions ?",
        answer: "La discrétion est une règle d'or pour nos équipes, particulièrement à Saint-Mandé. Nous travaillons de manière efficace, organisée et la plus silencieuse possible pour respecter votre quiétude et celle de votre voisinage. Nos véhicules sont neutres et nos équipes en tenue professionnelle."
    },
    {
        question: "Quels sont vos délais pour un déménagement à Saint-Mandé ?",
        answer: "Étant donné la nécessité d'anticiper les demandes d'autorisation, nous vous conseillons de nous contacter au moins 4 semaines à l'avance. Cela nous permet de planifier l'intervention dans les meilleures conditions. Pour toute urgence, n'hésitez pas à nous appeler, nous chercherons toujours une solution."
    }
];


export default function SaintMandePage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/saint-mande/1920/500"
                    alt="Rue élégante de Saint-Mandé"
                    fill
                    className="object-cover"
                    data-ai-hint="elegant street parisian"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Déménageur d'exception à Saint-Mandé</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Saint-Mandé (94220)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">Un service haut de gamme pour votre déménagement dans l'une des villes les plus prisées du Val-de-Marne.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-val-de-marne-94" className="hover:text-primary">Val-de-Marne (94)</Link>
                <span className="mx-2">&gt;</span>
                <span>Saint-Mandé</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un service d'excellence pour déménager à Saint-Mandé</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Saint-Mandé, véritable écrin de verdure et d'architecture aux portes de Paris, est un projet qui exige un niveau de service irréprochable. La beauté des immeubles, la quiétude des rues et la proximité du Bois de Vincennes imposent de faire appel à des professionnels qui allient efficacité, soin et discrétion.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous avons une parfaite connaissance des exigences d'un déménagement à Saint-Mandé. Nous planifions chaque intervention avec une précision méticuleuse pour préserver l'harmonie des lieux et vous garantir une installation en toute sérénité.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/saint-mande-move/600/400"
                            alt="Équipe de déménagement professionnelle intervenant à Saint-Mandé"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team elegant city"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-saint-mande" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire privilégié pour votre déménagement à Saint-Mandé</h2>
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
                            src="https://picsum.photos/seed/saint-mande-packing/600/400"
                            alt="Déménageur emballant avec soin une lampe de designer"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover packing designer lamp"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des prestations sur-mesure pour votre projet saint-mandéen</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'appartements de prestige</h4>
                                    <p className="text-muted-foreground">Une expertise pointue pour la protection de vos biens et des parties communes des immeubles de caractère.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Manutention d'objets de valeur</h4>
                                    <p className="text-muted-foreground">Nos équipes sont formées à la manipulation de mobilier de designer, d'œuvres d'art et d'objets fragiles.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Formule "Sérénité" clé en main</h4>
                                    <p className="text-muted-foreground">Nous nous occupons de tout, de l'emballage intégral à la réinstallation, pour votre confort absolu.</p>
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
            <section id="faq-saint-mande" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Saint-Mandé</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement d'exception à Saint-Mandé.</p>
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
            <section id="contact-saint-mande" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Saint-Mandé</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos conseillers pour une étude personnalisée de votre projet et obtenez un devis à la hauteur de vos attentes.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Saint-Mandé</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
