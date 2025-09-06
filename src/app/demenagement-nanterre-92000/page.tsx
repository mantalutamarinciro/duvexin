
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Star, Users, Building, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Société ProDev", text: "Le transfert de nos bureaux à Nanterre, près de La Défense, a été un succès. Planification rigoureuse et exécution rapide. Une équipe très professionnelle.", rating: 5, createTime: "il y a 6 mois", avatarUrl: `https://i.pravatar.cc/48?u=ProDev92` },
    { id: "fallback-2", name: "Marc et Hélène", text: "Déménagement de notre pavillon à Nanterre géré de main de maître. L'équipe a été prudente et efficace. Nous sommes très satisfaits du service.", rating: 5, createTime: "il y a 4 mois", avatarUrl: `https://i.pravatar.cc/48?u=MarcHelene92` },
    { id: "fallback-3", name: "Cécile D.", text: "Service impeccable pour mon appartement dans le centre de Nanterre. Le devis était clair et l'équipe ponctuelle. Je recommande sans hésiter.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=CecileD92` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Nanterre",
        description: "Du centre ancien au quartier de l'Université, nous connaissons chaque secteur de la préfecture pour une logistique parfaite."
    },
    {
        icon: <Users className="h-8 w-8 text-primary"/>,
        title: "Équipes polyvalentes",
        description: "Nos équipes sont formées pour déménager aussi bien les pavillons que les appartements ou les bureaux d'entreprises."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Logistique optimisée",
        description: "Nous maîtrisons les accès autour des grands axes (A86, A14) et les solutions pour les rues plus étroites du vieux centre."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Gestion des autorisations",
        description: "Nous nous occupons des demandes de stationnement auprès de la mairie de Nanterre, une étape essentielle pour un déménagement serein."
    }
];

const faqItems = [
    {
        question: "Comment gérez-vous un déménagement dans le quartier de l'Université de Nanterre ?",
        answer: "C'est un secteur que nous connaissons très bien. Nous planifions les interventions en tenant compte du calendrier universitaire pour éviter les jours de forte affluence. Nous gérons les accès aux résidences étudiantes et aux logements privés avec efficacité, que ce soit pour des petits ou des grands volumes."
    },
    {
        question: "Est-il possible de déménager des bureaux à Nanterre, près de La Défense ?",
        answer: "Oui, c'est une de nos spécialités. Nous proposons un service de transfert d'entreprise complet à Nanterre. Nous planifions l'opération pour minimiser l'impact sur votre activité, en intervenant si nécessaire en dehors des heures de bureau ou le week-end, et nous assurons une gestion sécurisée de votre matériel informatique et de vos archives."
    },
    {
        question: "Quelles solutions proposez-vous pour les maisons individuelles à Nanterre ?",
        answer: "Nanterre comporte de nombreuses zones pavillonnaires. Nous sommes équipés pour déménager des maisons de toutes tailles, avec un soin particulier pour la protection des accès, des jardins et des biens volumineux. Une visite technique gratuite nous permet de définir la meilleure stratégie pour votre déménagement."
    },
    {
        question: "Quels sont vos délais d'intervention pour un déménagement à Nanterre ?",
        answer: "Grâce à notre forte présence dans les Hauts-de-Seine, nous sommes très réactifs. Nous recommandons de nous contacter 3 à 4 semaines à l'avance, ce qui nous laisse le temps de gérer sereinement les autorisations de stationnement. Nous pouvons souvent trouver des créneaux pour des besoins plus urgents."
    }
];


export default function NanterrePage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/nanterre/1920/500"
                    alt="Vue sur la ville de Nanterre"
                    fill
                    className="object-cover"
                    data-ai-hint="nanterre cityscape"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement à Nanterre</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Nanterre (92000)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution professionnelle et fiable pour votre déménagement à Nanterre, préfecture des Hauts-de-Seine.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-hauts-de-seine-92" className="hover:text-primary">Hauts-de-Seine (92)</Link>
                <span className="mx-2">&gt;</span>
                <span>Nanterre</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Votre déménagement à Nanterre, une ville aux multiples facettes</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Nanterre, c'est s'adapter à une ville plurielle : préfecture administrative, pôle universitaire majeur, et porte d'entrée du quartier d'affaires de La Défense. Cette diversité se reflète dans son urbanisme, mêlant quartiers pavillonnaires, grands ensembles et zones d'activités.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous avons l'expérience et la flexibilité nécessaires pour répondre à tous les cas de figure. Qu'il s'agisse d'un déménagement étudiant, d'un transfert de bureaux ou de l'installation de votre famille dans une nouvelle maison, nous déployons une logistique sur-mesure pour une prestation impeccable.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/nanterre-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Nanterre"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="urban moving team"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-nanterre" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Votre déménageur de confiance à Nanterre</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Notre connaissance du terrain est votre meilleure garantie de sérénité.</p>
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
                            src="https://picsum.photos/seed/nanterre-packing/600/400"
                            alt="Déménageur emballant du matériel de bureau à Nanterre"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover packing office items"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés à tous vos projets à Nanterre</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement pour particuliers</h4>
                                    <p className="text-muted-foreground">Appartements, maisons, résidences... nous nous adaptons à votre logement et à vos besoins.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Transfert de bureaux</h4>
                                    <p className="text-muted-foreground">Un service efficace et discret pour les nombreuses entreprises de Nanterre et ses environs.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Formules personnalisées</h4>
                                    <p className="text-muted-foreground">De la formule économique à la prestation clé en main, vous choisissez ce qui vous convient le mieux.</p>
                                </div>
                            </li>
                        </ul>
                         <Button asChild className="mt-8" variant="outline">
                            <Link href="/services">Explorer tous nos services</Link>
                         </Button>
                    </div>
                </div>
            </section>
            
            <TestimonialsSection reviews={fallbackTestimonials} />
            
            {/* FAQ Section */}
            <section id="faq-nanterre" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Nanterre</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses à vos questions pour un déménagement réussi à Nanterre.</p>
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
            <section id="contact-nanterre" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Lancez votre projet de déménagement à Nanterre</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Nanterre</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
