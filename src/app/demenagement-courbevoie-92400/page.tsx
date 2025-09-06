
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Users, Building, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Société Vision IT", text: "Le transfert de notre siège dans une des tours de Courbevoie a été parfaitement orchestré. Discrétion, rapidité et professionnalisme. Je recommande pour tout déménagement d'entreprise à La Défense.", rating: 5, createTime: "il y a 2 mois", avatarUrl: `https://i.pravatar.cc/48?u=VisionIT92` },
    { id: "fallback-2", name: "Valérie et Luc", text: "Déménagement de notre 4 pièces à Courbevoie sans le moindre souci. L'équipe a été très prudente avec nos affaires et a géré le monte-meubles de manière très pro.", rating: 5, createTime: "il y a 7 mois", avatarUrl: `https://i.pravatar.cc/48?u=ValerieLuc92` },
    { id: "fallback-3", name: "Julien R.", text: "Excellent service pour mon déménagement au Faubourg de l'Arche. Devis respecté, équipe ponctuelle et efficace. Rien à redire.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=JulienR92` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Courbevoie",
        description: "Du Faubourg de l'Arche au quartier de Bécon, nous maîtrisons les accès et spécificités de chaque quartier de Courbevoie."
    },
    {
        icon: <Building className="h-8 w-8 text-primary"/>,
        title: "Spécialiste La Défense",
        description: "Nous avons une grande expérience des déménagements dans les tours et les immeubles de grande hauteur du quartier d'affaires."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Logistique et Monte-Meubles",
        description: "Nous gérons les autorisations de stationnement et déployons des monte-meubles pour un service rapide et sécurisé."
    },
    {
        icon: <Users className="h-8 w-8 text-primary"/>,
        title: "Équipes fiables et discrètes",
        description: "Nos déménageurs salariés sont formés pour intervenir efficacement dans les environnements professionnels et résidentiels exigeants."
    }
];

const faqItems = [
    {
        question: "Comment organisez-vous un déménagement dans une tour à La Défense, côté Courbevoie ?",
        answer: "Nous avons une méthodologie spécifique. La planification est essentielle : nous prenons contact avec le syndic et les services de sécurité de l'immeuble bien en amont pour réserver les monte-charges, définir les plages horaires d'intervention et respecter toutes les procédures internes. Nos équipes sont habituées à ces contraintes et travaillent de manière discrète et efficace pour ne pas gêner les autres occupants."
    },
    {
        question: "L'utilisation d'un monte-meubles est-elle courante à Courbevoie ?",
        answer: "Oui, c'est une solution très fréquente à Courbevoie, que ce soit pour les immeubles de grande hauteur à La Défense ou pour les appartements dans des bâtiments plus anciens avec des accès étroits. Le monte-meubles garantit la sécurité de vos biens les plus volumineux et protège les parties communes, tout en optimisant la durée du déménagement."
    },
    {
        question: "Déménagez-vous aussi dans les quartiers pavillonnaires comme Bécon-les-Bruyères ?",
        answer: "Absolument. Notre expertise ne se limite pas aux grands immeubles. Nous intervenons régulièrement dans les quartiers résidentiels et pavillonnaires de Courbevoie. Nous adaptons nos véhicules et notre logistique aux contraintes des rues plus calmes pour un service tout aussi efficace."
    },
    {
        question: "Comment se passe la demande d'autorisation de stationnement à Courbevoie ?",
        answer: "Nous nous en occupons pour vous. La demande doit être faite plusieurs jours à l'avance auprès des services de la mairie. Nous remplissons tous les formulaires nécessaires et nous nous assurons que l'emplacement pour le camion de déménagement est bien réservé et balisé pour le jour J, vous libérant ainsi de cette contrainte administrative."
    }
];


export default function CourbevoiePage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/courbevoie/1920/500"
                    alt="Vue sur le quartier de La Défense depuis Courbevoie"
                    fill
                    className="object-cover"
                    data-ai-hint="courbevoie la defense cityscape"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement à Courbevoie</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Courbevoie (92400)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte pour votre déménagement de bureaux ou de résidence à Courbevoie et La Défense.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-hauts-de-seine-92" className="hover:text-primary">Hauts-de-Seine (92)</Link>
                <span className="mx-2">&gt;</span>
                <span>Courbevoie</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur expert pour les défis de Courbevoie et La Défense</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Courbevoie est une ville de contrastes, alliant le dynamisme du premier quartier d'affaires européen, La Défense, à des zones résidentielles prisées comme Bécon. Déménager à Courbevoie demande une expertise pointue pour gérer la verticalité des tours, les accès réglementés et la densité urbaine.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous sommes spécialisés dans ce type d'environnement complexe. Que vous soyez une entreprise transférant ses locaux dans une tour de La Défense ou un particulier emménageant dans un appartement, nous possédons le savoir-faire et l'équipement (monte-meubles, matériel de protection) pour mener à bien votre projet en toute sérénité.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/courbevoie-move/600/400"
                            alt="Équipe de déménagement professionnelle intervenant à Courbevoie"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="urban moving team building"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-courbevoie" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Courbevoie</h2>
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
                            src="https://picsum.photos/seed/la-defense-office-move/600/400"
                            alt="Déménageur préparant du matériel informatique pour un transfert de bureau à La Défense"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover packing office equipment"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux particuliers et professionnels de Courbevoie</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Transfert d'entreprises</h4>
                                    <p className="text-muted-foreground">Planification rigoureuse et exécution en dehors des heures de bureau pour une transition sans couture.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'appartements</h4>
                                    <p className="text-muted-foreground">Solutions avec monte-meubles pour les étages élevés et protection soignée de vos biens.</p>
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
            <section id="faq-courbevoie" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Courbevoie</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Courbevoie et La Défense.</p>
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
            <section id="contact-courbevoie" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Courbevoie</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Courbevoie</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
