
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Castle, Users, Building, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Royer", text: "Déménager à Versailles était un rêve et grâce à vous, ça a été une expérience sans stress. L'équipe a été très respectueuse des lieux et de nos affaires.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Royer78` },
    { id: "fallback-2", name: "M. Lefèvre", text: "Très professionnels, ils ont su gérer les accès compliqués de ma rue dans le quartier Saint-Louis. Service impeccable, je recommande vivement.", rating: 5, createTime: "il y a 7 mois", avatarUrl: `https://i.pravatar.cc/48?u=Lefevre78` },
    { id: "fallback-3", name: "Cabinet d'architectes", text: "Le transfert de nos bureaux près du château s'est déroulé à la perfection. Discrétion et efficacité, une équipe au top.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Architectes78` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Versailles",
        description: "Du quartier Notre-Dame à Saint-Louis, nous connaissons les rues, les réglementations et les secrets d'un déménagement réussi à Versailles."
    },
    {
        icon: <Castle className="h-8 w-8 text-primary"/>,
        title: "Respect du Patrimoine",
        description: "Nous intervenons avec un soin extrême dans les immeubles anciens et les hôtels particuliers, en protégeant les parquets, moulures et parties communes."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Gestion des Accès",
        description: "Nous maîtrisons la logistique pour les rues étroites et le déploiement de monte-meubles, indispensables dans de nombreux quartiers versaillais."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité Administrative",
        description: "Nous gérons pour vous les demandes d'autorisation de stationnement auprès de la mairie, une démarche essentielle dans la Cité Royale."
    }
];

const faqItems = [
    {
        question: "Comment gérez-vous un déménagement dans le quartier historique de Saint-Louis ?",
        answer: "C'est un secteur que nous connaissons très bien pour ses accès qui peuvent être compliqués. Nous effectuons toujours une visite technique en amont pour définir la meilleure stratégie. Nous utilisons des véhicules de taille adaptée et nous nous chargeons de la demande d'autorisation de stationnement, qui est cruciale dans ce quartier."
    },
    {
        question: "Le monte-meubles est-il souvent nécessaire pour un déménagement à Versailles ?",
        answer: "Oui, c'est une solution que nous utilisons fréquemment. Beaucoup d'immeubles versaillais, bien que magnifiques, n'ont pas d'ascenseur ou des cages d'escalier très étroites. Le monte-meubles est la garantie d'un déménagement rapide, sécurisé pour vos biens et respectueux des parties communes."
    },
    {
        question: "Déménagez-vous les objets d'art et les meubles anciens ?",
        answer: "Absolument. C'est l'une de nos spécialités. Nos équipes sont spécifiquement formées pour l'emballage et la manipulation d'objets de valeur. Nous utilisons des matériaux de protection professionnels (caisses sur-mesure, papier de soie, etc.) pour assurer une sécurité maximale à votre patrimoine."
    },
    {
        question: "Quels sont les délais pour organiser un déménagement à Versailles ?",
        answer: "Compte tenu des démarches administratives pour le stationnement, nous recommandons de nous contacter au moins 3 à 4 semaines à l'avance. Cela nous permet de tout organiser sereinement. Cependant, n'hésitez pas à nous appeler pour des besoins plus urgents, nous ferons notre possible pour trouver une solution."
    }
];


export default function VersaillesPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/versailles-chateau/1920/500"
                    alt="Le Château de Versailles au lever du soleil"
                    fill
                    className="object-cover"
                    data-ai-hint="versailles palace sunrise"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement à Versailles</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Versailles (78000)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">L'expertise d'un professionnel pour un déménagement d'exception dans la Cité Royale.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-yvelines-78" className="hover:text-primary">Yvelines (78)</Link>
                <span className="mx-2">&gt;</span>
                <span>Versailles</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un service d'excellence pour déménager à Versailles</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Versailles, ville chargée d'histoire et de prestige, requiert un savoir-faire particulier. Les contraintes d'urbanisme, le respect du patrimoine et les accès parfois complexes des quartiers historiques exigent de faire appel à des professionnels aguerris.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous avons une connaissance approfondie de la ville de Versailles et de ses quartiers. Nous planifions chaque intervention avec le plus grand soin pour préserver votre patrimoine et celui de la ville, tout en vous assurant un déménagement efficace et sans stress.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/versailles-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Versailles"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team historic street"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-versailles" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Versailles</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Notre expertise est à la hauteur du prestige de votre adresse.</p>
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
                            src="https://picsum.photos/seed/versailles-packing/600/400"
                            alt="Déménageur emballant avec soin une pendule ancienne à Versailles"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover packing antique clock"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des prestations sur-mesure pour votre projet versaillais</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'appartements de caractère</h4>
                                    <p className="text-muted-foreground">Une expertise pointue pour la protection de vos biens et des parties communes des immeubles anciens.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement de maisons et hôtels particuliers</h4>
                                    <p className="text-muted-foreground">Une logistique adaptée aux grands volumes et à la manipulation d'objets de grande valeur.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Formule "Prestige" clé en main</h4>
                                    <p className="text-muted-foreground">Nous nous occupons de tout, de l'emballage de vos biens les plus fragiles à la réinstallation complète de votre domicile.</p>
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
            <section id="faq-versailles" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Versailles</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Versailles.</p>
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
            <section id="contact-versailles" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Versailles</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos conseillers spécialisés pour une étude personnalisée de votre projet et obtenez un devis à la hauteur de vos attentes.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Versailles</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
