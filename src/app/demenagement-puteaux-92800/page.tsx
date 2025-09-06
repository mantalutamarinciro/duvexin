
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Users, Building, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Société DataSys", text: "Le transfert de nos serveurs et bureaux à Puteaux a été une opération critique, parfaitement maîtrisée par Déménagement du Vexin. Leur expertise de La Défense est incontestable.", rating: 5, createTime: "il y a 4 mois", avatarUrl: `https://i.pravatar.cc/48?u=DataSys92` },
    { id: "fallback-2", name: "Hortense F.", text: "Déménagement de mon appartement sur l'esplanade de La Défense. L'équipe a été incroyablement professionnelle, gérant les accès monte-charge et les autorisations. Service premium.", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=HortenseF92` },
    { id: "fallback-3", name: "Julien V.", text: "Excellent service pour mon déménagement dans le vieux Puteaux. Ils ont su s'adapter aux rues plus étroites. Je recommande leur sérieux et leur efficacité.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=JulienV92` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Puteaux",
        description: "Du quartier de La Défense au vieux Puteaux, nous maîtrisons la topographie et les contraintes spécifiques de la ville."
    },
    {
        icon: <Building className="h-8 w-8 text-primary"/>,
        title: "Spécialiste de La Défense",
        description: "Nous avons une grande expérience des déménagements dans les tours, avec une gestion rigoureuse des accès et de la sécurité."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Logistique et Monte-Meubles",
        description: "Nous gérons les autorisations et déployons des monte-meubles pour un service rapide et sécurisé, même en grande hauteur."
    },
    {
        icon: <Users className="h-8 w-8 text-primary"/>,
        title: "Équipes discrètes et fiables",
        description: "Nos déménageurs sont formés pour intervenir avec soin et discrétion dans les environnements professionnels et résidentiels les plus exigeants."
    }
];

const faqItems = [
    {
        question: "Comment organisez-vous un déménagement d'entreprise sur l'esplanade de La Défense ?",
        answer: "C'est une de nos spécialités. La clé est l'anticipation. Nous contactons la gestion de l'immeuble et les services de sécurité bien en amont pour réserver les accès livraison et les monte-charges. Nous planifions l'intervention, souvent la nuit ou le week-end, pour ne causer aucune perturbation pour votre entreprise et vos voisins."
    },
    {
        question: "Je déménage dans le vieux Puteaux, les rues sont étroites. Est-ce un problème ?",
        answer: "Absolument pas. Nous connaissons bien le centre historique de Puteaux. Nous utilisons des véhicules de plus petite taille, adaptés à ces rues, et nos équipes sont expertes en manutention dans des espaces restreints. La visite technique nous permet de choisir la logistique la plus adaptée."
    },
    {
        question: "L'autorisation de stationnement est-elle nécessaire à Puteaux ?",
        answer: "Oui, elle est indispensable dans la quasi-totalité de la ville. Nous nous occupons intégralement de cette démarche administrative auprès de la mairie de Puteaux. Cela vous garantit un emplacement pour le camion et la légalité de l'opération, pour un déménagement sans stress."
    },
    {
        question: "Quelles formules proposez-vous pour un appartement à Puteaux ?",
        answer: "Nous proposons toutes nos formules, de l'économique (vous emballez, nous transportons) à la formule confort (nous nous occupons de tout, y compris l'emballage et le déballage). Pour Puteaux, où les appartements peuvent avoir des accès complexes, notre formule Standard avec gestion du monte-meubles est très populaire."
    }
];


export default function PuteauxPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/puteaux/1920/500"
                    alt="Vue sur Puteaux et le quartier de La Défense"
                    fill
                    className="object-cover"
                    data-ai-hint="puteaux la defense cityscape"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement à Puteaux</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Puteaux (92800)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte pour votre déménagement de bureaux ou de résidence à Puteaux et La Défense.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-hauts-de-seine-92" className="hover:text-primary">Hauts-de-Seine (92)</Link>
                <span className="mx-2">&gt;</span>
                <span>Puteaux</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur expert pour la verticalité de Puteaux</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Puteaux, c'est embrasser un environnement unique, où le quartier d'affaires de La Défense côtoie un centre-ville historique et des bords de Seine réaménagés. Cette diversité demande une expertise logistique pointue pour gérer la verticalité des tours, les accès réglementés et les rues plus anciennes.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous sommes spécialisés dans cet environnement complexe. Que vous soyez une entreprise s'installant dans une tour ou un particulier emménageant avec vue sur la Seine, nous avons le savoir-faire et l'équipement pour faire de votre projet une totale réussite.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/puteaux-move/600/400"
                            alt="Équipe de déménagement professionnelle intervenant au pied d'une tour à Puteaux"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team modern building"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-puteaux" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Puteaux</h2>
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
                            src="https://picsum.photos/seed/puteaux-office-move/600/400"
                            alt="Déménageur préparant du matériel informatique pour un transfert de bureau à Puteaux"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover packing computer equipment"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux particuliers et professionnels de Puteaux</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Transfert d'entreprises</h4>
                                    <p className="text-muted-foreground">Planification rigoureuse et exécution en dehors des heures de bureau pour une transition sans couture à La Défense.</p>
                                </div>
                            </li>
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
            <section id="faq-puteaux" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Puteaux</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Puteaux et La Défense.</p>
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
            <section id="contact-puteaux" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Puteaux</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Puteaux</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
