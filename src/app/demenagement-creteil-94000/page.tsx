
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Truck, Users, Building, Landmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Traoré", text: "Déménagement de notre appartement à Créteil parfaitement géré. L'équipe a su gérer les accès à l'immeuble avec professionnalisme et rapidité. Un grand merci !", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Traore94` },
    { id: "fallback-2", name: "Société Juricap", text: "Le transfert de nos bureaux près du Tribunal a été une réussite. L'équipe a été discrète, efficace et a respecté notre planning à la lettre.", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=Juricap94` },
    { id: "fallback-3", name: "Marc A.", text: "Très bonne expérience pour mon déménagement. De la prise de contact au jour J, tout a été fluide et sans stress. Je recommande cette entreprise sérieuse.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=MarcA94` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Créteil",
        description: "Du quartier du Lac aux zones pavillonnaires, nous connaissons les rues, les accès et les réglementations pour une logistique sans faille."
    },
    {
        icon: <Building className="h-8 w-8 text-primary"/>,
        title: "Gestion des immeubles",
        description: "Nos équipes sont habituées aux contraintes des grands ensembles et des résidences, avec des solutions de monte-meubles si nécessaire."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Logistique et Monte-Meubles",
        description: "Nous gérons les autorisations de stationnement et déployons des solutions de levage pour un service efficace et sécurisé en toutes circonstances."
    },
    {
        icon: <Landmark className="h-8 w-8 text-primary"/>,
        title: "Sérénité administrative",
        description: "Nous gérons pour vous les demandes d'autorisation de stationnement, une démarche essentielle dans la préfecture du Val-de-Marne."
    }
];

const faqItems = [
    {
        question: "Comment se déroule un déménagement dans un grand immeuble à Créteil ?",
        answer: "Nous avons une grande expérience de ce type d'intervention. La clé est la préparation. Nous effectuons une visite technique, nous nous renseignons sur le règlement de copropriété pour les horaires, et nous réservons les ascenseurs si possible. L'utilisation d'un monte-meubles est souvent la solution la plus efficace pour les étages élevés."
    },
    {
        question: "Déménagez-vous les entreprises et les administrations à Créteil ?",
        answer: "Oui, Créteil étant la préfecture et un pôle économique majeur, nous proposons des services dédiés aux professionnels. Nous avons l'expérience du transfert de bureaux, de matériel administratif et d'archives, en garantissant la confidentialité et une planification rigoureuse pour limiter l'impact sur votre activité."
    },
    {
        question: "Est-ce difficile d'obtenir une autorisation de stationnement à Créteil ?",
        answer: "Cela demande de l'anticipation, mais c'est une démarche que nous maîtrisons parfaitement. Nous nous chargeons de la demande auprès des services de la mairie pour garantir un emplacement réservé le jour J. Vous n'avez à vous soucier de rien."
    },
    {
        question: "Quelles sont vos formules pour un petit appartement ou un déménagement d'étudiant ?",
        answer: "Nous proposons des formules flexibles pour tous les budgets. Notre formule Économique, où vous gérez l'emballage et nous la manutention et le transport, est une solution très appréciée des étudiants et des jeunes actifs pour maîtriser les coûts tout en bénéficiant d'un service professionnel."
    }
];


export default function CreteilPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/creteil/1920/500"
                    alt="Vue sur le lac de Créteil"
                    fill
                    className="object-cover"
                    data-ai-hint="creteil lake cityscape"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement à Créteil</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Créteil (94000)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte et locale pour votre projet à Créteil, préfecture du Val-de-Marne.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-val-de-marne-94" className="hover:text-primary">Val-de-Marne (94)</Link>
                <span className="mx-2">&gt;</span>
                <span>Créteil</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur expert pour la préfecture du Val-de-Marne</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Créteil, une ville dynamique et un pôle administratif et économique majeur, demande une logistique rigoureuse. Avec son urbanisme caractéristique, ses grands ensembles, ses zones pavillonnaires et son lac, Créteil présente des défis variés.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous connaissons parfaitement Créteil. Que vous emménagiez dans un appartement avec vue sur le lac ou dans une maison du vieux Créteil, nous planifions chaque détail, de l'autorisation de stationnement à la gestion des accès, pour un déménagement fluide et sans stress.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/creteil-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Créteil"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team modern city"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-creteil" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Créteil</h2>
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
                            src="https://picsum.photos/seed/creteil-packing/600/400"
                            alt="Déménageur emballant avec soin des objets pour un déménagement à Créteil"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing boxes"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux particuliers et professionnels de Créteil</h2>
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
                                    <h4 className="font-semibold">Déménagement de maisons et pavillons</h4>
                                    <p className="text-muted-foreground">Nous gérons les déménagements de maisons avec jardin et accès spécifiques, avec le plus grand soin.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Transfert de bureaux</h4>
                                    <p className="text-muted-foreground">Un service efficace pour les entreprises et administrations, planifié pour minimiser l'impact sur votre activité.</p>
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
            <section id="faq-creteil" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Créteil</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Créteil.</p>
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
            <section id="contact-creteil" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Créteil</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Créteil</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
