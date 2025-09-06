
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Truck, Users, Building, Diamond } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille de La Roche", text: "Un service irréprochable pour notre déménagement à Neuilly. L'équipe a fait preuve d'une grande discrétion et d'un soin extrême pour nos objets de valeur. C'est un service de prestige.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=LaRoche92` },
    { id: "fallback-2", name: "Hélène B.", text: "Très satisfaite de la prestation. Ils ont géré les accès compliqués de ma rue et protégé les parties communes de l'immeuble avec beaucoup de professionnalisme. Je recommande.", rating: 5, createTime: "il y a 7 mois", avatarUrl: `https://i.pravatar.cc/48?u=HeleneB92` },
    { id: "fallback-3", name: "Cabinet d'avocats G&P", text: "Le transfert de nos archives et de notre mobilier a été mené avec une efficacité et une confidentialité parfaites. Une équipe sur qui l'on peut compter.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=GPavocats` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Neuilly",
        description: "De l'Avenue du Roule à l'Île de la Jatte, nous connaissons chaque rue et ses contraintes pour une logistique d'exception."
    },
    {
        icon: <Diamond className="h-8 w-8 text-primary"/>,
        title: "Prestations Haut de Gamme",
        description: "Nos équipes sont formées pour manipuler les biens de valeur et intervenir avec la plus grande discrétion dans les immeubles de standing."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Maîtrise des accès",
        description: "Monte-meubles, véhicules adaptés... Nous avons toutes les solutions pour les avenues, contre-allées et cours intérieures de Neuilly."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Confidentialité & Sécurité",
        description: "Nous garantissons une discrétion absolue et une sécurité maximale pour le déménagement de votre patrimoine."
    }
];

const faqItems = [
    {
        question: "Comment gérez-vous un déménagement dans un hôtel particulier à Neuilly ?",
        answer: "Nous avons une grande expérience des déménagements de biens de prestige. Une visite technique approfondie est systématiquement réalisée par un de nos responsables pour planifier chaque détail : protection des parquets, des moulures, des escaliers, et utilisation de matériel spécifique pour les objets lourds ou fragiles comme les pianos ou les œuvres d'art."
    },
    {
        question: "Le stationnement est-il un problème sur les grandes avenues de Neuilly ?",
        answer: "Le stationnement à Neuilly est très réglementé, mais ce n'est pas un problème pour nous car nous l'anticipons. Nous nous chargeons intégralement de la demande d'autorisation de stationnement auprès de la mairie pour garantir un emplacement au pied de votre domicile, assurant ainsi une opération fluide et légale."
    },
    {
        question: "Faites-vous preuve de discrétion lors de vos interventions ?",
        answer: "La discrétion est une de nos valeurs fondamentales, particulièrement à Neuilly-sur-Seine. Nos équipes sont formées pour travailler de manière efficace, silencieuse et respectueuse de votre environnement et de votre voisinage. Nos véhicules sont propres et banalisés sur demande."
    },
    {
        question: "Quelles garanties offrez-vous pour les objets de grande valeur ?",
        answer: "Nous proposons des solutions d'assurance sur-mesure (dite 'ad valorem') pour couvrir vos biens à leur valeur réelle. De plus, nous utilisons des techniques d'emballage spécifiques avec des matériaux de pointe (caisses en bois sur mesure, emballages anti-chocs) pour assurer une protection maximale à vos objets les plus précieux."
    }
];


export default function NeuillySurSeinePage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/neuilly/1920/500"
                    alt="Avenue prestigieuse de Neuilly-sur-Seine"
                    fill
                    className="object-cover"
                    data-ai-hint="neuilly sur seine street"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Déménageur d'exception à Neuilly</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Neuilly-sur-Seine</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution haut de gamme pour votre déménagement à Neuilly-sur-Seine (92200).</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-hauts-de-seine-92" className="hover:text-primary">Hauts-de-Seine (92)</Link>
                <span className="mx-2">&gt;</span>
                <span>Neuilly-sur-Seine</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un service d'excellence pour déménager à Neuilly-sur-Seine</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Neuilly-sur-Seine, ville d'élégance et de prestige, requiert un niveau de service, de soin et de discrétion irréprochable. La valeur des biens, la configuration des appartements haussmanniens et des hôtels particuliers, ainsi que les exigences du voisinage imposent de faire appel à de véritables experts.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous avons développé un savoir-faire spécifique pour répondre à cette clientèle exigeante. Nos équipes sont spécialement formées pour manipuler les objets d'art et le mobilier de valeur, planifier les accès complexes et garantir une confidentialité totale.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/neuilly-move/600/400"
                            alt="Équipe de déménagement professionnelle intervenant dans un appartement de standing à Neuilly"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="luxury apartment moving"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-neuilly" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour votre déménagement à Neuilly</h2>
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
                            src="https://picsum.photos/seed/neuilly-packing/600/400"
                            alt="Déménageur emballant avec soin une œuvre d'art à Neuilly"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover packing artwork"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des prestations sur-mesure pour Neuilly-sur-Seine</h2>
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
                                    <h4 className="font-semibold">Déménagement d'hôtels particuliers</h4>
                                    <p className="text-muted-foreground">Planification logistique complète pour les grands volumes et les objets de grande valeur.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Formule "Luxe" clé en main</h4>
                                    <p className="text-muted-foreground">Nous nous occupons de tout, de l'emballage intégral à la réinstallation complète de votre domicile, pour votre confort absolu.</p>
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
            <section id="faq-neuilly" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Neuilly</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement d'exception à Neuilly-sur-Seine.</p>
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
            <section id="contact-neuilly" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Neuilly-sur-Seine</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos conseillers spécialisés pour une étude confidentielle et personnalisée de votre projet et obtenez un devis à la hauteur de vos attentes.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Demander un devis pour Neuilly</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
