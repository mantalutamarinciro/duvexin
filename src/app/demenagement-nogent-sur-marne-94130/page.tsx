
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Truck, Users, Building, Waves, Gem } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Moreau", text: "Un déménagement parfaitement orchestré à Nogent. L'équipe a fait preuve d'un grand soin et d'une efficacité remarquable. Un service vraiment premium.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Moreau94` },
    { id: "fallback-2", name: "Julien C.", text: "Très satisfait de la prestation pour mon appartement. Ils ont géré les accès difficiles avec le sourire et professionnalisme. Je recommande sans hésiter.", rating: 5, createTime: "il y a 7 mois", avatarUrl: `https://i.pravatar.cc/48?u=JulienC94` },
    { id: "fallback-3", name: "Mme. Lefevre", text: "Une équipe ponctuelle, discrète et très respectueuse des lieux. Mon déménagement s'est déroulé dans les meilleures conditions.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Lefevre94` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Nogent",
        description: "Du centre-ville aux bords de Marne, nous connaissons chaque quartier pour une logistique parfaitement maîtrisée."
    },
    {
        icon: <Gem className="h-8 w-8 text-primary"/>,
        title: "Respect des belles demeures",
        description: "Nous intervenons avec un soin particulier dans les appartements de standing et les maisons de caractère."
    },
    {
        icon: <Waves className="h-8 w-8 text-primary"/>,
        title: "Spécialiste Bords de Marne",
        description: "Nous maîtrisons les accès parfois étroits et les contraintes spécifiques liées à la proximité de la rivière."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité administrative",
        description: "Nous gérons pour vous les demandes d'autorisation de stationnement, une démarche clé pour déménager en toute tranquillité."
    }
];

const faqItems = [
    {
        question: "Comment se déroule un déménagement dans les rues étroites du centre de Nogent ?",
        answer: "C'est une situation que nous anticipons. Une visite technique nous permet de choisir le véhicule le plus adapté. La réservation de stationnement, que nous prenons en charge, est essentielle pour garantir une place et une intervention efficace, en minimisant la gêne pour le voisinage."
    },
    {
        question: "Déménagez-vous les maisons avec des objets de valeur ou fragiles ?",
        answer: "Oui, c'est l'une de nos spécialités. Nous proposons un service d'emballage professionnel pour vos biens les plus précieux (vaisselle, œuvres d'art, etc.) et nos équipes sont formées pour manipuler les meubles de valeur avec le plus grand soin. Des assurances complémentaires peuvent aussi être souscrites."
    },
    {
        question: "Est-ce difficile d'obtenir une autorisation de stationnement à Nogent-sur-Marne ?",
        answer: "Le stationnement peut y être réglementé. C'est pourquoi nous incluons la gestion de cette démarche dans nos prestations. Nous nous occupons des formalités auprès de la mairie pour vous garantir un emplacement réservé."
    },
    {
        question: "Quelles sont vos formules pour un appartement en étage élevé ?",
        answer: "Pour les appartements, notamment dans les étages sans ascenseur ou avec un ascenseur non adapté, nous évaluons systématiquement l'utilité d'un monte-meubles. C'est souvent la solution la plus sûre et la plus rapide. Nos formules sont flexibles pour inclure ce service."
    }
];


export default function NogentSurMarnePage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/nogent/1920/500"
                    alt="Bords de Marne à Nogent-sur-Marne"
                    fill
                    className="object-cover"
                    data-ai-hint="nogent sur marne riverside"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement à Nogent</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Nogent-sur-Marne</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">Un service d'excellence pour votre projet à Nogent-sur-Marne (94130).</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-val-de-marne-94" className="hover:text-primary">Val-de-Marne (94)</Link>
                <span className="mx-2">&gt;</span>
                <span>Nogent-sur-Marne</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui comprend le cadre de vie de Nogent</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Nogent-sur-Marne, c'est choisir un cadre de vie privilégié, réputé pour son charme, son port de plaisance et ses guinguettes. Ce caractère résidentiel et haut de gamme demande un service de déménagement à la hauteur, alliant efficacité, soin et discrétion.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous avons une connaissance approfondie de Nogent. Que vous emménagiez dans un appartement de standing, une maison de caractère ou une résidence moderne, nous planifions chaque détail pour préserver votre patrimoine et vous garantir une installation en toute sérénité.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/nogent-move/600/400"
                            alt="Équipe de déménagement professionnelle intervenant à Nogent-sur-Marne"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team luxury suburb"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-nogent" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire privilégié pour déménager à Nogent</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Notre expertise est votre meilleure garantie pour un déménagement sans fausse note.</p>
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
                            src="https://picsum.photos/seed/nogent-packing/600/400"
                            alt="Déménageur emballant avec soin des objets de valeur"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover packing fragile items"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des prestations sur-mesure pour votre projet nogentais</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'appartements et maisons</h4>
                                    <p className="text-muted-foreground">Une logistique adaptée aux grands volumes et à la manipulation d'objets précieux et encombrants.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'objets d'art</h4>
                                    <p className="text-muted-foreground">Une expertise pointue pour la protection et le transport de vos biens les plus précieux.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Formule "Prestige" clé en main</h4>
                                    <p className="text-muted-foreground">Nous nous occupons de tout : emballage intégral, déballage, remontage et installation pour votre confort absolu.</p>
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
            <section id="faq-nogent" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Nogent-sur-Marne</h2>
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
            <section id="contact-nogent" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Nogent-sur-Marne</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos conseillers pour une étude personnalisée de votre projet et obtenez un devis à la hauteur de vos attentes.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Nogent-sur-Marne</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
