
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Home, Users, Building, Truck, Rocket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Traoré", text: "Déménagement de notre pavillon aux Mureaux très bien organisé. L'équipe a été super efficace et très sympathique. Rien à redire, service parfait.", rating: 5, createTime: "il y a 2 mois", avatarUrl: `https://i.pravatar.cc/48?u=Traore78` },
    { id: "fallback-2", name: "Julien P.", text: "Très bonne expérience pour mon appartement. Le devis était clair et l'équipe ponctuelle. Un déménagement sans le moindre stress.", rating: 5, createTime: "il y a 5 mois", avatarUrl: `https://i.pravatar.cc/48?u=JulienP78` },
    { id: "fallback-3", name: "Aéro-Club des Mureaux", text: "Le transfert de notre matériel a été géré avec soin et professionnalisme. Une entreprise sérieuse que nous recommandons.", rating: 5, createTime: "il y a 10 mois", avatarUrl: `https://i.pravatar.cc/48?u=AeroClub78` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise des Mureaux",
        description: "Du centre-ville aux nouveaux éco-quartiers, nous connaissons les accès et les spécificités de la ville."
    },
    {
        icon: <Rocket className="h-8 w-8 text-primary"/>,
        title: "Logistique et accès A13/A14",
        description: "Nous maîtrisons les accès via les grands axes pour une ponctualité et une organisation sans faille."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Solutions pour tous les logements",
        description: "Que vous soyez en appartement, en pavillon ou en résidence neuve, nous avons le matériel adapté."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité administrative",
        description: "Nous gérons pour vous les demandes d'autorisation de stationnement, une démarche clé pour un déménagement réussi."
    }
];

const faqItems = [
    {
        question: "Comment se déroule un déménagement dans un pavillon aux Mureaux ?",
        answer: "Nous sommes spécialisés dans le déménagement de pavillons. Nous effectuons une visite technique pour évaluer le volume et les accès. Le jour J, nous protégeons vos sols, vos murs et votre jardin, et nous utilisons des véhicules adaptés pour ne pas gêner le voisinage."
    },
    {
        question: "Intervenez-vous dans les nouveaux quartiers comme Molière ?",
        answer: "Oui, nous suivons de près le développement de la ville. Nous intervenons régulièrement dans les résidences neuves et connaissons les standards d'accès. Nous pouvons nous coordonner avec les promoteurs ou les syndics pour respecter les procédures."
    },
    {
        question: "Déménagez-vous aussi les entreprises de la zone d'activités des Garennes ?",
        answer: "Absolument. Nous avons une offre dédiée aux professionnels pour le transfert de bureaux ou d'ateliers. Nous planifions l'opération avec vous pour assurer une transition rapide et limiter l'interruption de votre activité."
    },
    {
        question: "Quelles sont vos formules pour les petits budgets ?",
        answer: "Nous proposons des formules flexibles. Notre formule 'Économique', où vous vous chargez de l'emballage et nous de la manutention lourde et du transport, est une excellente solution pour maîtriser votre budget tout en bénéficiant de notre savoir-faire professionnel."
    }
];


export default function LesMureauxPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/les-mureaux/1920/500"
                    alt="Vue sur la ville des Mureaux"
                    fill
                    className="object-cover"
                    data-ai-hint="Les Mureaux cityscape"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Les Mureaux</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte et locale pour votre projet aux Mureaux (78130).</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-yvelines-78" className="hover:text-primary">Yvelines (78)</Link>
                <span className="mx-2">&gt;</span>
                <span>Les Mureaux</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui connaît le renouveau des Mureaux</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager aux Mureaux, c'est choisir une ville en pleine mutation, alliant un riche passé industriel à des projets d'avenir ambitieux. Cette transformation demande une approche logistique flexible, capable de s'adapter à la diversité de son habitat.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous sommes fiers de notre expertise locale. Que vous emménagiez dans un pavillon traditionnel, un appartement en centre-ville ou un éco-quartier flambant neuf, nous vous garantissons un déménagement serein, efficace et parfaitement adapté à votre nouvelle adresse.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/les-mureaux-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention aux Mureaux"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team city renewal"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-les-mureaux" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager aux Mureaux</h2>
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
                            src="https://picsum.photos/seed/les-mureaux-packing/600/400"
                            alt="Déménageur emballant avec soin des objets fragiles aux Mureaux"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover suburban packing"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux particuliers et professionnels</h2>
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
                                    <p className="text-muted-foreground">Nous gérons les contraintes liées aux étages et aux accès en immeuble, anciens comme neufs.</p>
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
            <section id="faq-les-mureaux" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Les Mureaux</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi.</p>
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
            <section id="contact-les-mureaux" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement aux Mureaux</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Les Mureaux</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
