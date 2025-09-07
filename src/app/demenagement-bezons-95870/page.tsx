
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Home, Users, Building, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Société ConnectIT", text: "Déménagement de nos bureaux à Bezons parfaitement géré. L'équipe a été rapide, professionnelle et très efficace. Une transition sans le moindre souci.", rating: 5, createTime: "il y a 4 mois", avatarUrl: `https://i.pravatar.cc/48?u=ConnectIT95` },
    { id: "fallback-2", name: "Nathalie D.", text: "Très bonne expérience pour mon appartement. Devis clair et service impeccable. Un déménagement sans stress, même dans un quartier dense.", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=NathalieD95` },
    { id: "fallback-3", name: "M. Lefevre", text: "Je recommande Déménagement du Vexin pour leur sérieux et leur professionnalisme. Ils ont trouvé des solutions pour les accès et le stationnement.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Lefevre95B` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Bezons",
        description: "Du Pont de Bezons au centre-ville, nous connaissons les rues, les accès et les réglementations pour une logistique sans faille."
    },
    {
        icon: <Building className="h-8 w-8 text-primary"/>,
        title: "Proximité de La Défense",
        description: "Nous avons une grande expérience des déménagements pour les entreprises et les salariés du plus grand quartier d'affaires d'Europe."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Gestion des accès denses",
        description: "Nos équipes sont expertes des déménagements en milieu urbain très dense, avec des solutions de monte-meubles adaptées si nécessaire."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité administrative",
        description: "Nous gérons pour vous les demandes d'autorisation de stationnement, une démarche indispensable dans cette ville à la circulation intense."
    }
];

const faqItems = [
    {
        question: "Comment se déroule un déménagement près du Pont de Bezons ?",
        answer: "C'est une zone très fréquentée que nous connaissons bien. La clé est l'anticipation : nous déposons la demande d'autorisation de stationnement très en amont et nous planifions l'intervention pour minimiser la gêne sur la circulation. Nos équipes sont habituées à travailler rapidement et efficacement dans ce type d'environnement."
    },
    {
        question: "Déménagez-vous les entreprises à Bezons ?",
        answer: "Oui, c'est un de nos points forts. Bezons accueille de nombreuses entreprises profitant de la proximité de La Défense. Nous proposons des services de transfert de bureaux planifiés pour minimiser l'impact sur votre activité, y compris en dehors des heures de bureau."
    },
    {
        question: "Est-ce difficile d'obtenir une autorisation de stationnement à Bezons ?",
        answer: "Cela demande de l'anticipation, mais ne vous inquiétez pas, nous nous en chargeons. Nous avons l'habitude des démarches auprès des services de la mairie et nous nous assurons d'avoir les autorisations à temps pour le jour J."
    },
    {
        question: "Quelles sont vos formules pour un petit appartement ?",
        answer: "Nous proposons des formules flexibles. Notre formule 'Économique', où vous vous chargez de l'emballage et nous de la manutention lourde et du transport, est une excellente solution pour maîtriser votre budget tout en bénéficiant de notre savoir-faire professionnel."
    }
];


export default function BezonsPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/bezons/1920/500"
                    alt="Vue sur la ville de Bezons et le pont"
                    fill
                    className="object-cover"
                    data-ai-hint="bezons cityscape bridge"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Bezons (95870)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte et locale pour votre projet à Bezons, aux portes de Paris et de La Défense.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-val-d-oise-95" className="hover:text-primary">Val-d'Oise (95)</Link>
                <span className="mx-2">&gt;</span>
                <span>Bezons</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui connaît la position stratégique de Bezons</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Bezons, c'est s'installer à un carrefour stratégique entre le Val-d'Oise et les Hauts-de-Seine. Sa proximité immédiate avec La Défense et Paris en fait une ville dense, dynamique, mais qui présente d'importants défis logistiques en matière de circulation et de stationnement.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous avons l'expertise pour naviguer dans cet environnement urbain complexe. Que vous soyez une entreprise ou un particulier, nous planifions chaque détail pour un déménagement fluide, rapide et maîtrisé.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/bezons-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Bezons"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team urban dense"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-bezons" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Bezons</h2>
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
                            src="https://picsum.photos/seed/bezons-packing/600/400"
                            alt="Déménageur emballant avec soin des objets fragiles"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing boxes"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux habitants et entreprises de Bezons</h2>
                         <ul className="mt-6 space-y-4">
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
                                    <h4 className="font-semibold">Transfert de bureaux</h4>
                                    <p className="text-muted-foreground">Un service efficace, planifié pour minimiser l'impact sur votre activité professionnelle, idéal pour la proximité avec La Défense.</p>
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
            <section id="faq-bezons" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Bezons</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Bezons.</p>
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
            <section id="contact-bezons" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Bezons</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Bezons</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
