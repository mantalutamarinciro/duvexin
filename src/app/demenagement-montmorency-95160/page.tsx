
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Home, Users, Building, Truck, TreePine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Dufour", text: "Déménagement de notre maison à Montmorency parfaitement géré. L'équipe a été très professionnelle et attentive, respectant la tranquillité du quartier. Super service.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Dufour95` },
    { id: "fallback-2", name: "Charles G.", text: "Très bonne expérience pour mon appartement. Devis clair et équipe ponctuelle. Un déménagement sans le moindre stress, je recommande.", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=CharlesG95` },
    { id: "fallback-3", name: "Mme. Laroche", text: "Efficacité, soin et bonne humeur. Une entreprise sérieuse que je n'hésiterai pas à recontacter pour un futur projet.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Laroche95` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Montmorency",
        description: "Du centre historique aux quartiers résidentiels en lisière de forêt, nous connaissons les accès et spécificités de la ville."
    },
    {
        icon: <TreePine className="h-8 w-8 text-primary"/>,
        title: "Respect de l'environnement",
        description: "Nous intervenons avec un soin particulier pour respecter votre jardin et le cadre de vie exceptionnel de la forêt de Montmorency."
    },
    {
        icon: <Home className="h-8 w-8 text-primary"/>,
        title: "Spécialiste du Pavillonnaire",
        description: "Nous avons l'expérience des déménagements de maisons de caractère, avec des accès parfois complexes."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité Administrative",
        description: "Nous gérons les demandes d'autorisation de stationnement, une démarche importante pour déménager sereinement."
    }
];

const faqItems = [
    {
        question: "Comment se déroule un déménagement dans une rue en pente ou étroite à Montmorency ?",
        answer: "C'est une configuration que nous connaissons bien. Une visite technique est essentielle pour évaluer les accès et choisir le véhicule le plus adapté. Nos équipes sont formées pour travailler en toute sécurité dans ces conditions et nos camions sont équipés pour cela."
    },
    {
        question: "Est-ce difficile d'obtenir une autorisation de stationnement à Montmorency ?",
        answer: "Certaines rues peuvent être complexes. Nous nous en chargeons pour vous. Nous avons l'habitude des démarches auprès de la mairie et nous nous assurons d'avoir les autorisations à temps pour le jour J."
    },
    {
        question: "Déménagez-vous les maisons avec des objets de valeur ?",
        answer: "Oui, c'est l'une de nos spécialités. Nous proposons un service d'emballage professionnel pour vos biens les plus fragiles (vaisselle, œuvres d'art, etc.) et nos équipes sont formées pour manipuler les meubles de valeur avec le plus grand soin."
    },
    {
        question: "Quelles sont vos formules pour un petit budget ?",
        answer: "Nous proposons des formules flexibles. Notre formule 'Économique', où vous vous chargez de l'emballage et nous de la manutention lourde et du transport, est une excellente solution pour maîtriser votre budget."
    }
];


export default function MontmorencyPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/montmorency/1920/500"
                    alt="Vue sur la ville de Montmorency et sa forêt"
                    fill
                    className="object-cover"
                    data-ai-hint="montmorency cityscape forest"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Montmorency (95160)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte et locale pour votre projet à Montmorency, au cœur de la forêt.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-val-d-oise-95" className="hover:text-primary">Val-d'Oise (95)</Link>
                <span className="mx-2">&gt;</span>
                <span>Montmorency</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui connaît le charme de Montmorency</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Montmorency, c'est choisir un cadre de vie privilégié, réputé pour son histoire, son lac et sa majestueuse forêt. Cette ville au caractère résidentiel et verdoyant demande une approche du déménagement qui allie soin, respect de l'environnement et efficacité.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous sommes fiers de notre expertise locale. Que vous emménagiez dans un pavillon de caractère, un appartement avec vue ou une résidence au calme, nous vous garantissons un déménagement serein, sécurisé et parfaitement adapté.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/montmorency-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Montmorency"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team forest town"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-montmorency" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Montmorency</h2>
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
                            src="https://picsum.photos/seed/montmorency-packing/600/400"
                            alt="Déménageur emballant avec soin des objets fragiles"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing boxes"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux habitants de Montmorency</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement de maisons et pavillons</h4>
                                    <p className="text-muted-foreground">Une expertise particulière pour les déménagements de maisons avec jardin, avec le plus grand soin pour vos biens et votre propriété.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'appartements</h4>
                                    <p className="text-muted-foreground">Nous gérons les contraintes liées aux étages et aux accès en résidence, avec des solutions de monte-meubles si nécessaire.</p>
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
            <section id="faq-montmorency" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Montmorency</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Montmorency.</p>
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
            <section id="contact-montmorency" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Montmorency</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Montmorency</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
