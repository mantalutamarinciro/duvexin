
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Home, Users, Building, Truck, Train } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Chevalier", text: "Déménagement de notre maison à Eaubonne très bien géré. L'équipe a été efficace, ponctuelle et très soigneuse. Un service de grande qualité que nous recommandons.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Chevalier95` },
    { id: "fallback-2", name: "Pauline V.", text: "Service impeccable pour mon appartement près de la gare. Le devis était clair, l'équipe sympathique et professionnelle. Zéro stress !", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=PaulineV95` },
    { id: "fallback-3", name: "M. Lefort", text: "Efficacité et professionnalisme. Je ferai de nouveau appel à eux pour un prochain déménagement dans le Val-d'Oise.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Lefort95E` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise d'Eaubonne",
        description: "Du centre-ville aux quartiers pavillonnaires comme le Clos de l'Olive, nous connaissons les accès et spécificités de la ville."
    },
    {
        icon: <Train className="h-8 w-8 text-primary"/>,
        title: "Maîtrise du pôle gare",
        description: "Nous gérons efficacement la logistique dans le secteur très fréquenté de la gare d'Ermont-Eaubonne, partagée avec la commune voisine."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Solutions pour tous les logements",
        description: "Que vous soyez en appartement, en résidence ou en pavillon, nous avons les véhicules et le matériel adaptés à votre déménagement."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité administrative",
        description: "Nous gérons pour vous les demandes d'autorisation de stationnement, une démarche clé pour déménager sereinement."
    }
];

const faqItems = [
    {
        question: "Comment se déroule un déménagement près de la gare d'Ermont-Eaubonne ?",
        answer: "C'est un secteur très fréquenté que nous connaissons parfaitement. L'anticipation est la clé : nous déposons la demande d'autorisation de stationnement très en amont et nous planifions l'intervention pour minimiser la gêne. Nos équipes sont habituées à travailler rapidement et efficacement dans ce type d'environnement."
    },
    {
        question: "Est-ce difficile d'obtenir une autorisation de stationnement à Eaubonne ?",
        answer: "Cela demande de l'anticipation, surtout en centre-ville, mais ne vous inquiétez pas, c'est notre métier. Nous avons l'habitude des démarches auprès des services de la mairie et nous nous assurons d'avoir les autorisations à temps pour le jour J."
    },
    {
        question: "Déménagez-vous les maisons avec des accès compliqués ?",
        answer: "Oui, c'est une situation fréquente dans les zones pavillonnaires d'Eaubonne. Une visite technique nous permet d'évaluer la meilleure approche. Nous disposons de véhicules de différentes tailles et nos équipes sont expertes en manutention, même lorsque les accès sont étroits."
    },
    {
        question: "Quelles sont vos formules pour un petit budget ?",
        answer: "Nous proposons des formules flexibles. Notre formule 'Économique' est une excellente solution pour maîtriser votre budget : vous vous chargez de l'emballage, et nos professionnels assurent la manutention lourde et le transport sécurisé de vos biens."
    }
];


export default function EaubonnePage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/eaubonne/1920/500"
                    alt="Vue sur la ville d'Eaubonne"
                    fill
                    className="object-cover"
                    data-ai-hint="eaubonne cityscape france"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Eaubonne (95600)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte et locale pour votre projet à Eaubonne, au cœur de la vallée de Montmorency.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-val-d-oise-95" className="hover:text-primary">Val-d'Oise (95)</Link>
                <span className="mx-2">&gt;</span>
                <span>Eaubonne</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui connaît le calme et l'effervescence d'Eaubonne</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Eaubonne, c'est choisir une ville au cadre de vie recherché, appréciée pour ses quartiers pavillonnaires et sa proximité avec Paris, notamment grâce au pôle gare d'Ermont-Eaubonne. Cette double facette demande une logistique de déménagement flexible et précise.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous sommes fiers de notre expertise locale. Que vous emménagiez dans une maison avec jardin ou un appartement près du centre, nous vous garantissons un déménagement serein, rapide et efficace, adapté aux réalités de la ville.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/eaubonne-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Eaubonne"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team suburban residential"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-eaubonne" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Eaubonne</h2>
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
                            src="https://picsum.photos/seed/eaubonne-packing/600/400"
                            alt="Déménageur emballant avec soin des objets fragiles à Eaubonne"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux habitants d'Eaubonne</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement de maisons et pavillons</h4>
                                    <p className="text-muted-foreground">Une expertise particulière pour les déménagements de maisons avec un soin apporté à la protection de vos biens et de votre propriété.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'appartements</h4>
                                    <p className="text-muted-foreground">Nous gérons les contraintes liées aux étages et aux accès en immeuble, avec des solutions de monte-meubles si nécessaire.</p>
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
            <section id="faq-eaubonne" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Eaubonne</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Eaubonne.</p>
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
            <section id="contact-eaubonne" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Eaubonne</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Eaubonne</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
