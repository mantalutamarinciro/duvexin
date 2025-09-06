
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Truck, Users, Building } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Lefebvre", text: "Le déménagement de notre appartement à Levallois a été une réussite totale. L'équipe a géré les accès et le monte-meubles avec un professionnalisme impressionnant. Je recommande !", rating: 5, createTime: "il y a 2 mois", avatarUrl: `https://i.pravatar.cc/48?u=Lefebvre92` },
    { id: "fallback-2", name: "Alexandre P.", text: "Service impeccable et très réactif pour mon déménagement. Devis clair et équipe ponctuelle et efficace. Parfait pour une ville comme Levallois.", rating: 5, createTime: "il y a 6 mois", avatarUrl: `https://i.pravatar.cc/48?u=AlexandreP92` },
    { id: "fallback-3", name: "Start-up Connect", text: "Le transfert de nos bureaux s'est fait sans accroc. L'équipe a été discrète et a respecté notre planning serré. Une prestation de grande qualité.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=ConnectLP` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Levallois",
        description: "Nous connaissons les rues, les sens uniques et les réglementations de stationnement de Levallois pour une logistique sans faille."
    },
    {
        icon: <Building className="h-8 w-8 text-primary"/>,
        title: "Spécialiste des immeubles haussmanniens",
        description: "Nos équipes sont habituées aux contraintes des appartements anciens : étages élevés, escaliers étroits et cours intérieures."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Solutions de Monte-Meubles",
        description: "Nous gérons l'installation et les autorisations pour un passage par fenêtre rapide et sécurisé, essentiel à Levallois."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Tranquillité administrative",
        description: "Nous prenons en charge la demande d'autorisation de stationnement auprès de la mairie, une démarche indispensable."
    }
];

const faqItems = [
    {
        question: "Est-il compliqué d'obtenir une autorisation de stationnement à Levallois ?",
        answer: "C'est une démarche qui demande de l'anticipation, mais ne vous inquiétez pas, nous nous en occupons. Nous avons l'habitude des procédures avec la mairie de Levallois-Perret et nous nous assurons d'obtenir les autorisations à temps pour garantir un emplacement le jour J."
    },
    {
        question: "L'utilisation d'un monte-meubles est-elle indispensable à Levallois ?",
        answer: "Dans de nombreux cas, oui. Pour les immeubles sans ascenseur, ou avec des ascenseurs trop petits, le monte-meubles est la solution la plus sûre et la plus rapide. Il protège vos biens et les parties communes, et nous permet de travailler beaucoup plus efficacement."
    },
    {
        question: "Déménagez-vous les entreprises à Levallois-Perret ?",
        answer: "Oui, nous proposons des services spécifiques pour le transfert de bureaux et de sociétés. Nous comprenons l'importance de minimiser l'impact sur votre activité et pouvons planifier l'intervention en dehors de vos heures de travail."
    },
    {
        question: "Quelle est la meilleure période pour déménager à Levallois ?",
        answer: "Pour éviter les difficultés de circulation, nous conseillons d'éviter les heures de pointe. Déménager en milieu de semaine est souvent plus simple qu'un samedi. Nous planifierons avec vous le meilleur créneau en fonction de votre adresse et de vos contraintes."
    }
];


export default function LevalloisPerretPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/levallois/1920/500"
                    alt="Vue sur la ville de Levallois-Perret"
                    fill
                    className="object-cover"
                    data-ai-hint="levallois perret cityscape"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement à Levallois</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Levallois-Perret</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte et sereine pour votre déménagement à Levallois-Perret (92300).</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-hauts-de-seine-92" className="hover:text-primary">Hauts-de-Seine (92)</Link>
                <span className="mx-2">&gt;</span>
                <span>Levallois-Perret</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur expert pour les défis de Levallois-Perret</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Levallois-Perret, une des villes les plus denses d'Europe, est une opération qui ne tolère aucune improvisation. Entre les rues à sens unique, les immeubles haussmanniens et la circulation intense, chaque détail compte pour une logistique réussie.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous avons fait de ces contraintes notre spécialité. Nos équipes sont expertes dans la gestion des déménagements en milieu urbain complexe. De l'obtention des autorisations de stationnement à l'utilisation de monte-meubles, nous planifions tout pour vous assurer un service fluide, rapide et sans stress.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/levallois-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Levallois-Perret"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="urban moving team street"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-levallois" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Levallois</h2>
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
                            src="https://picsum.photos/seed/levallois-packing/600/400"
                            alt="Déménageur emballant avec soin un objet fragile à Levallois"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover packing fragile item"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux spécificités de Levallois</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'appartements</h4>
                                    <p className="text-muted-foreground">Solutions sur-mesure pour les appartements de toutes tailles, avec une expertise des immeubles anciens.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Transfert de bureaux</h4>
                                    <p className="text-muted-foreground">Un service efficace pour les entreprises, planifié pour minimiser l'impact sur votre activité.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Formules personnalisées</h4>
                                    <p className="text-muted-foreground">De la prestation économique à la formule tout confort, nous nous adaptons à vos besoins précis.</p>
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
            <section id="faq-levallois" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Levallois</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Levallois-Perret.</p>
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
            <section id="contact-levallois" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Planifiez votre déménagement à Levallois-Perret</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Levallois</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
