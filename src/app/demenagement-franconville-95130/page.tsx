
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Home, Users, Building, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Lebrun", text: "Déménagement de notre maison à Franconville sans aucun accroc. L'équipe a été très professionnelle et efficace. Nous les recommandons vivement.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Lebrun95` },
    { id: "fallback-2", name: "Sophie D.", text: "Un grand merci pour votre aide précieuse. Devis clair, équipe ponctuelle et un déménagement qui s'est déroulé dans la bonne humeur.", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=SophieD95` },
    { id: "fallback-3", name: "Marc T.", text: "Service impeccable pour mon appartement. Ils ont géré les accès et le stationnement de manière très pro. Je ferai de nouveau appel à eux.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=MarcT95F` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Franconville",
        description: "Des quartiers pavillonnaires aux résidences du centre, nous connaissons les accès et les spécificités de Franconville."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Maîtrise des axes (A15/A115)",
        description: "Nous planifions nos interventions en tenant compte du trafic local pour garantir une ponctualité et une organisation sans faille."
    },
    {
        icon: <Building className="h-8 w-8 text-primary"/>,
        title: "Solutions pour tous logements",
        description: "Que vous soyez en appartement ou en pavillon, nous avons les véhicules et le matériel adaptés à votre déménagement."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité administrative",
        description: "Nous gérons pour vous les demandes d'autorisation de stationnement, une démarche clé pour déménager sereinement."
    }
];

const faqItems = [
    {
        question: "Comment se déroule un déménagement dans un quartier pavillonnaire de Franconville ?",
        answer: "Nous sommes spécialisés dans le déménagement de pavillons. Nous effectuons une visite technique pour évaluer le volume et les accès. Le jour J, nous protégeons vos sols, vos murs et vos extérieurs, et nous utilisons des véhicules adaptés pour ne pas gêner le voisinage."
    },
    {
        question: "Est-ce difficile d'obtenir une autorisation de stationnement à Franconville ?",
        answer: "Comme dans beaucoup de communes de la petite couronne, cela demande de l'anticipation. Mais ne vous inquiétez pas, nous nous en chargeons. Nous avons l'habitude des démarches auprès des services de la mairie et nous nous assurons d'avoir les autorisations à temps pour le jour J."
    },
    {
        question: "Déménagez-vous aussi les entreprises et les commerces de la zone d'activités ?",
        answer: "Oui, nous avons une offre B2B dédiée. Franconville est un pôle économique dynamique, et nous sommes habitués à réaliser des transferts de bureaux. Nous planifions l'opération avec vous pour assurer une transition rapide et limiter au maximum l'interruption de votre activité."
    },
    {
        question: "Quelles sont vos formules pour un petit budget ?",
        answer: "Nous proposons des formules flexibles. Notre formule 'Économique', où vous vous chargez de l'emballage et nous de la manutention lourde et du transport, est une excellente solution pour maîtriser votre budget tout en bénéficiant de notre savoir-faire professionnel."
    }
];


export default function FranconvillePage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/franconville/1920/500"
                    alt="Vue sur la ville de Franconville"
                    fill
                    className="object-cover"
                    data-ai-hint="franconville cityscape france"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Franconville (95130)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte et locale pour votre projet à Franconville, au cœur de la vallée de Montmorency.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-val-d-oise-95" className="hover:text-primary">Val-d'Oise (95)</Link>
                <span className="mx-2">&gt;</span>
                <span>Franconville</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui connaît le dynamisme de Franconville</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Franconville, ville carrefour du Val-d'Oise, demande une approche logistique rigoureuse. Appréciée pour sa qualité de vie, ses commerces et sa desserte, la ville combine des zones pavillonnaires tranquilles et des résidences plus denses.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous sommes fiers de notre expertise locale. Que vous emménagiez dans une maison avec jardin ou un appartement en centre-ville, nous vous garantissons un déménagement serein, rapide et efficace, adapté aux réalités de la ville.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/franconville-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Franconville"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team suburban france"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-franconville" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Franconville</h2>
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
                            src="https://picsum.photos/seed/franconville-packing/600/400"
                            alt="Déménageur emballant avec soin des objets fragiles"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux habitants de Franconville</h2>
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
            <section id="faq-franconville" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Franconville</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Franconville.</p>
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
            <section id="contact-franconville" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Franconville</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Franconville</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
