
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Home, Users, Building, Truck, Ship } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Dubois", text: "Notre déménagement à Ouistreham a été une vraie réussite. L'équipe a géré l'accès près de la plage avec beaucoup de professionnalisme.", rating: 5, createTime: "il y a 2 mois", avatarUrl: `https://i.pravatar.cc/48?u=Dubois14` },
    { id: "fallback-2", name: "Marc D.", text: "Très bonne expérience pour ma maison. Devis clair et service impeccable. Un déménagement sans stress, même en pleine saison estivale. Merci !", rating: 5, createTime: "il y a 7 mois", avatarUrl: `https://i.pravatar.cc/48?u=MarcD14O` },
    { id: "fallback-3", name: "Sophie C.", text: "Efficacité, soin et bonne humeur. Je recommande Déménagement du Vexin pour leur sérieux.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=SophieC14` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise d'Ouistreham",
        description: "Du port de plaisance au centre-ville en passant par Riva-Bella, nous connaissons les accès et spécificités de la ville."
    },
    {
        icon: <Ship className="h-8 w-8 text-primary"/>,
        title: "Logistique Portuaire",
        description: "Nous avons l'habitude d'intervenir dans la zone du terminal du ferry, avec une planification rigoureuse pour ne pas perturber l'activité."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Gestion des zones saisonnières",
        description: "Nous gérons les autorisations de stationnement et planifions nos interventions en tenant compte de l'affluence touristique."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "La Proximité de l'Agence d'Évreux",
        description: "Notre base locale nous permet d'être réactifs et compétitifs pour tous vos projets sur la Côte de Nacre."
    }
];

const faqItems = [
    {
        question: "Comment se passe un déménagement en pleine saison touristique à Ouistreham ?",
        answer: "La clé est l'anticipation. Nous déposons les demandes d'autorisation de stationnement très en amont et nous pouvons planifier les interventions tôt le matin ou en semaine pour éviter les pics de fréquentation. Notre connaissance du terrain nous permet de rester efficaces en toute saison."
    },
    {
        question: "Assurez-vous les déménagements en provenance ou à destination de l'Angleterre via le ferry ?",
        answer: "Oui, nous avons l'expérience des déménagements internationaux, y compris vers le Royaume-Uni. Nous pouvons coordonner la logistique de votre déménagement de part et d'autre de la Manche. Contactez-nous pour discuter des formalités spécifiques."
    },
    {
        question: "Je déménage dans une maison en front de mer, y a-t-il des précautions particulières ?",
        answer: "Absolument. Nous portons une attention particulière à la protection contre le sable et le vent. Nous nous assurons que vos biens sont parfaitement emballés et nous protégeons les accès de votre domicile pour un emménagement impeccable."
    },
    {
        question: "Quelles sont vos formules pour un petit appartement ou une résidence secondaire ?",
        answer: "Nous proposons des formules flexibles. Notre formule 'Économique' est une excellente solution pour maîtriser votre budget : vous vous chargez de l'emballage, et nos professionnels assurent la manutention et le transport sécurisé de vos biens."
    }
];


export default function OuistrehamPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/ouistreham/1920/500"
                    alt="Le phare de Ouistreham"
                    fill
                    className="object-cover"
                    data-ai-hint="ouistreham lighthouse"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Ouistreham (14150)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte pour votre projet à Ouistreham Riva-Bella.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-calvados-14" className="hover:text-primary">Calvados (14)</Link>
                <span className="mx-2">&gt;</span>
                <span>Ouistreham</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui connaît Ouistreham, entre terre et mer</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Ouistreham, c'est choisir une station balnéaire dynamique, un port animé et un lieu chargé d'histoire sur la plage de Sword Beach. Cette triple identité demande une logistique polyvalente et une excellente connaissance du terrain.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Grâce à notre agence d'Évreux, nous sommes votre expert de proximité. Que vous emménagiez dans une villa en bord de mer, un appartement en centre-ville ou que vous soyez un professionnel lié à l'activité portuaire, nous vous garantissons un déménagement serein et parfaitement organisé.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/ouistreham-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Ouistreham"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team seaside town"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-ouistreham" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Ouistreham</h2>
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
                            src="https://picsum.photos/seed/ouistreham-packing/600/400"
                            alt="Déménageur emballant avec soin des objets fragiles"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing seaside"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux habitants d'Ouistreham</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement de maisons et appartements</h4>
                                    <p className="text-muted-foreground">Une expertise particulière pour les déménagements en bord de mer, avec protection contre le sable et l'air marin.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'entreprises et commerces</h4>
                                    <p className="text-muted-foreground">Nous organisons le transfert de votre activité pour minimiser l'impact et assurer une reprise rapide.</p>
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
            <section id="faq-ouistreham" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Ouistreham</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Ouistreham.</p>
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
            <section id="contact-ouistreham" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Ouistreham</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Ouistreham</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
