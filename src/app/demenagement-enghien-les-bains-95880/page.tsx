
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Truck, Users, Gem, Building, Waves } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Lefevre", text: "Déménagement dans notre nouvel appartement à Enghien. L'équipe a fait preuve d'un professionnalisme et d'une discrétion exemplaires. Service impeccable.", rating: 5, createTime: "il y a 2 mois", avatarUrl: `https://i.pravatar.cc/48?u=Lefevre95` },
    { id: "fallback-2", name: "Alexandre G.", text: "Très bonne expérience. Ils ont géré les accès difficiles et le stationnement sans aucun problème. Une entreprise sérieuse pour une ville exigeante.", rating: 5, createTime: "il y a 6 mois", avatarUrl: `https://i.pravatar.cc/48?u=AlexandreG95` },
    { id: "fallback-3", name: "Cabinet de conseil", text: "Le transfert de nos bureaux s'est déroulé à la perfection. Efficacité, ponctualité et une équipe très à l'écoute. Nous recommandons.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Conseil95` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise d'Enghien",
        description: "Nous connaissons les rues, les réglementations de stationnement et les accès spécifiques des immeubles de standing de la ville."
    },
    {
        icon: <Gem className="h-8 w-8 text-primary"/>,
        title: "Respect des Biens et des Lieux",
        description: "Nous intervenons avec un soin infini dans les appartements et maisons de caractère, en protégeant les parties communes et vos objets de valeur."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Logistique Haut de Gamme",
        description: "Utilisation de monte-meubles, de véhicules adaptés et d'emballages spécifiques pour une prestation d'excellence."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Discrétion et Confiance",
        description: "Nos équipes sont formées pour travailler avec la plus grande discrétion, respectant votre intimité et celle de votre voisinage."
    }
];

const faqItems = [
    {
        question: "Le stationnement est-il très compliqué à Enghien-les-Bains ?",
        answer: "Le stationnement est en effet l'un des principaux défis. C'est pourquoi nous intégrons systématiquement la gestion complète des autorisations de stationnement dans nos prestations. Nous nous occupons de tout auprès de la mairie pour vous garantir la tranquillité."
    },
    {
        question: "Comment gérez-vous le déménagement d'un appartement dans un immeuble ancien ?",
        answer: "C'est notre spécialité. Une visite technique nous permet de planifier l'intervention en détail. L'utilisation d'un monte-meubles est souvent la solution la plus sûre et efficace pour protéger vos biens et les magnifiques parties communes de ces immeubles."
    },
    {
        question: "Déménagez-vous des objets fragiles comme des pianos ou des œuvres d'art ?",
        answer: "Oui, nous avons une grande expérience dans ce domaine. Nous utilisons des emballages sur mesure (caisses en bois, housses spécifiques) et nos équipes sont formées aux techniques de manutention les plus délicates pour garantir une sécurité maximale à vos biens précieux."
    },
    {
        question: "Quels sont vos délais pour un déménagement à Enghien-les-Bains ?",
        answer: "Compte tenu des démarches administratives pour le stationnement et de la planification minutieuse requise, nous vous conseillons de nous contacter au moins 4 à 6 semaines à l'avance. Cela nous permet d'organiser votre déménagement dans des conditions optimales."
    }
];


export default function EnghienLesBainsPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/enghien/1920/500"
                    alt="Vue sur le lac et le casino d'Enghien-les-Bains"
                    fill
                    className="object-cover"
                    data-ai-hint="enghien les bains lake casino"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Déménageur d'exception à Enghien</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Enghien-les-Bains</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">Un service haut de gamme pour votre déménagement dans la ville thermale du Val-d'Oise (95880).</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-val-d-oise-95" className="hover:text-primary">Val-d'Oise (95)</Link>
                <span className="mx-2">&gt;</span>
                <span>Enghien-les-Bains</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un service d'excellence pour déménager à Enghien-les-Bains</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Enghien-les-Bains, unique station thermale d'Île-de-France, est un projet qui demande un niveau de service, de soin et de discrétion à la hauteur de son prestige. Les appartements de standing, les demeures bourgeoises et les accès parfois complexes exigent l'intervention de véritables experts.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous avons développé un savoir-faire spécifique pour répondre à cette clientèle exigeante. Nous planifions chaque intervention avec une rigueur absolue pour préserver l'intégrité de votre patrimoine et vous garantir une installation en toute sérénité.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/enghien-move/600/400"
                            alt="Équipe de déménagement professionnelle intervenant à Enghien-les-Bains"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team luxury city"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-enghien" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire privilégié pour déménager à Enghien</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Notre expertise est votre meilleure garantie pour un déménagement sans fausse note.</p>
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
                            src="https://picsum.photos/seed/enghien-packing/600/400"
                            alt="Déménageur emballant avec soin des objets de valeur"
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
                                    <h4 className="font-semibold">Formule "Prestige" clé en main</h4>
                                    <p className="text-muted-foreground">Nous nous occupons de tout : emballage intégral, déballage, remontage et installation pour votre confort absolu.</p>
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
            <section id="faq-enghien" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Enghien</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Enghien-les-Bains.</p>
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
            <section id="contact-enghien" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Enghien-les-Bains</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos conseillers pour une étude personnalisée de votre projet et obtenez un devis à la hauteur de vos attentes.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Enghien-les-Bains</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
