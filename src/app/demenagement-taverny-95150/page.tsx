
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Home, Users, Building, Truck, TreePine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Renaud", text: "Un grand merci à l'équipe pour notre déménagement à Taverny. Tout a été géré avec professionnalisme et efficacité. Nous sommes très satisfaits.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Renaud95` },
    { id: "fallback-2", name: "Sophie B.", text: "Service impeccable pour mon appartement. Le devis était clair et l'équipe ponctuelle et très soigneuse. Je recommande sans hésiter.", rating: 5, createTime: "il y a 7 mois", avatarUrl: `https://i.pravatar.cc/48?u=SophieB95` },
    { id: "fallback-3", name: "Marc T.", text: "Efficacité et bonne humeur. Mon déménagement s'est déroulé dans les meilleures conditions. Une entreprise de confiance.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=MarcT95T` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Taverny",
        description: "Du centre-ville aux quartiers pavillonnaires, nous connaissons les accès et les spécificités de chaque quartier de Taverny."
    },
    {
        icon: <TreePine className="h-8 w-8 text-primary"/>,
        title: "Proximité de la Forêt",
        description: "Nous avons l'habitude d'intervenir dans les zones résidentielles calmes et verdoyantes en bordure de la forêt de Montmorency."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Solutions pour tous les logements",
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
        question: "Comment se déroule un déménagement dans un quartier pavillonnaire de Taverny ?",
        answer: "Nous sommes spécialisés dans le déménagement de pavillons. Nous effectuons une visite technique pour évaluer le volume et les accès. Le jour J, nous protégeons vos sols, vos murs et vos extérieurs, et nous utilisons des véhicules adaptés pour ne pas gêner le voisinage."
    },
    {
        question: "Est-ce difficile d'obtenir une autorisation de stationnement à Taverny ?",
        answer: "Comme dans beaucoup de communes de la petite couronne, cela demande de l'anticipation. Nous nous en chargeons pour vous. Nous avons l'habitude des démarches auprès des services de la mairie et nous nous assurons d'avoir les autorisations à temps pour le jour J."
    },
    {
        question: "Déménagez-vous aussi les entreprises et les commerces de la zone d'activités ?",
        answer: "Oui, nous avons une offre B2B dédiée. Taverny est un pôle économique dynamique, et nous sommes habitués à réaliser des transferts de bureaux. Nous planifions l'opération avec vous pour assurer une transition rapide et limiter au maximum l'interruption de votre activité."
    },
    {
        question: "Quelles sont vos formules pour un petit budget ?",
        answer: "Nous proposons des formules flexibles. Notre formule 'Économique', où vous vous chargez de l'emballage et nous de la manutention lourde et du transport, est une excellente solution pour maîtriser votre budget tout en bénéficiant de notre savoir-faire professionnel."
    }
];


export default function TavernyPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/taverny/1920/500"
                    alt="Vue sur la ville de Taverny"
                    fill
                    className="object-cover"
                    data-ai-hint="taverny cityscape france"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Taverny (95150)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte et locale pour votre projet à Taverny, au cœur de la vallée de Montmorency.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-val-d-oise-95" className="hover:text-primary">Val-d'Oise (95)</Link>
                <span className="mx-2">&gt;</span>
                <span>Taverny</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui connaît le cadre de vie de Taverny</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Taverny, c'est choisir une ville qui allie parfaitement le dynamisme urbain à la tranquillité de la nature, avec la forêt de Montmorency à ses portes. Cette qualité de vie attire de nombreuses familles et demande une approche du déménagement qui soit à la fois efficace et respectueuse.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous sommes fiers de notre expertise locale. Que vous emménagiez dans une maison avec jardin, un appartement en centre-ville ou une résidence neuve, nous vous garantissons un déménagement serein, rapide et adapté aux réalités de la ville.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/taverny-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Taverny"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team suburban"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-taverny" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Taverny</h2>
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
                            src="https://picsum.photos/seed/taverny-packing/600/400"
                            alt="Déménageur emballant avec soin des objets fragiles"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux habitants de Taverny</h2>
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
            <section id="faq-taverny" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Taverny</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Taverny.</p>
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
            <section id="contact-taverny" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Taverny</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Taverny</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
