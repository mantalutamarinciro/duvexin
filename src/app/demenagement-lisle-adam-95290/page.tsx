
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Truck, Users, Gem, Waves } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Meunier", text: "Un déménagement parfaitement orchestré à L'Isle-Adam. L'équipe a été d'un grand professionnalisme et d'une précaution extrême avec nos biens. Un service haut de gamme.", rating: 5, createTime: "il y a 4 mois", avatarUrl: `https://i.pravatar.cc/48?u=Meunier95` },
    { id: "fallback-2", name: "Juliette L.", text: "Le service était impeccable. Ils ont su gérer les accès pas évidents de ma rue et protéger les parties communes avec beaucoup de soin. Une entreprise très sérieuse.", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=JulietteL95` },
    { id: "fallback-3", name: "Dr. Aubert", text: "Ponctualité, efficacité et discrétion. Le déménagement de mon cabinet s'est déroulé sans le moindre souci. Je ferai de nouveau appel à eux.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Aubert95` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de L'Isle-Adam",
        description: "Du centre historique aux quartiers résidentiels, nous connaissons chaque particularité de la ville pour une logistique sans faille."
    },
    {
        icon: <Gem className="h-8 w-8 text-primary"/>,
        title: "Respect des Belles Demeures",
        description: "Nous intervenons avec un soin infini dans les maisons de caractère et les appartements de standing, en protégeant les lieux et vos biens."
    },
    {
        icon: <Waves className="h-8 w-8 text-primary"/>,
        title: "Logistique des Bords de l'Oise",
        description: "Nous maîtrisons les accès parfois étroits et les contraintes spécifiques liées à la proximité de la rivière."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité Administrative",
        description: "Nous nous chargeons des demandes d'autorisation de stationnement, une démarche indispensable dans le centre-ville."
    }
];

const faqItems = [
    {
        question: "Comment se passe un déménagement dans le centre historique de L'Isle-Adam ?",
        answer: "C'est une zone que nous connaissons bien. Une visite technique est essentielle pour évaluer les accès, souvent étroits. Nous utilisons des véhicules adaptés et planifions l'intervention avec soin. La réservation de stationnement, que nous gérons pour vous, est cruciale pour une opération fluide."
    },
    {
        question: "Déménagez-vous des objets fragiles ou de valeur ?",
        answer: "Oui, c'est l'une de nos spécialités. Nos équipes sont formées et équipées pour l'emballage et le transport sécurisé de pianos, tableaux, vaisselle fragile ou mobilier de valeur. Nous pouvons vous proposer des assurances complémentaires sur mesure pour couvrir vos biens."
    },
    {
        question: "Est-il difficile d'obtenir une autorisation de stationnement à L'Isle-Adam ?",
        answer: "Dans le centre-ville, cela peut être nécessaire. Nous nous chargeons intégralement de cette démarche auprès de la mairie. Vous n'avez à vous soucier de rien, nous nous assurons que tout est en ordre pour le jour J."
    },
    {
        question: "Quelles sont vos formules pour un appartement ?",
        answer: "Nous proposons des formules flexibles pour tous les volumes. Pour les appartements, notamment en étage, nous pouvons proposer l'utilisation d'un monte-meubles. De la formule Économique à la formule Confort, nous avons la solution qui correspond à vos besoins et à votre budget."
    }
];


export default function LisleAdamPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/lisle-adam/1920/500"
                    alt="La plage de L'Isle-Adam au bord de l'Oise"
                    fill
                    className="object-cover"
                    data-ai-hint="L'Isle-Adam riverside beach"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Déménageur d'exception à L'Isle-Adam</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement L'Isle-Adam (95290)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">Un service haut de gamme pour votre déménagement dans la perle du Val-d'Oise.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-val-d-oise-95" className="hover:text-primary">Val-d'Oise (95)</Link>
                <span className="mx-2">&gt;</span>
                <span>L'Isle-Adam</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un service d'excellence pour déménager à L'Isle-Adam</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à L'Isle-Adam, l'une des plus belles villes du Val-d'Oise, demande une approche alliant savoir-faire, soin et discrétion. Le charme de ses rues, ses demeures de caractère et son cadre de vie exceptionnel imposent un service à la hauteur.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous avons une connaissance aiguë des particularités de L'Isle-Adam. Nous planifions chaque intervention avec une rigueur absolue pour préserver l'intégrité de votre patrimoine et des lieux, tout en vous garantissant un déménagement efficace et serein.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/lisle-adam-move/600/400"
                            alt="Équipe de déménagement professionnelle intervenant à L'Isle-Adam"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team charming town"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-lisle-adam" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire privilégié pour déménager à L'Isle-Adam</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Notre expertise locale est votre meilleure garantie pour un déménagement sans fausse note.</p>
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
                            src="https://picsum.photos/seed/lisle-adam-packing/600/400"
                            alt="Déménageur emballant avec soin une œuvre d'art"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover packing artwork"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des prestations sur-mesure pour votre projet adamois</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'appartements et maisons de caractère</h4>
                                    <p className="text-muted-foreground">Une expertise pointue pour la protection de vos biens et des lieux prestigieux.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Manutention d'objets de valeur</h4>
                                    <p className="text-muted-foreground">Nos équipes sont formées à la manipulation de mobilier ancien, d'œuvres d'art et d'objets fragiles.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Formule "Sérénité" clé en main</h4>
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
            <section id="faq-lisle-adam" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement L'Isle-Adam</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi.</p>
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
            <section id="contact-lisle-adam" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à L'Isle-Adam</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos conseillers pour une étude personnalisée de votre projet et obtenez un devis à la hauteur de vos attentes.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour L'Isle-Adam</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
