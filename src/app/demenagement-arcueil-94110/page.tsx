
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Truck, Users, Building, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Sophie B.", text: "Déménagement de mon appartement à Arcueil géré avec une grande efficacité. L'équipe a été rapide, professionnelle et a su s'adapter à la circulation. Je recommande vivement.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=SophieB94` },
    { id: "fallback-2", name: "David L.", text: "Très bonne expérience. Devis clair et service impeccable. Un déménagement sans stress, même avec des accès pas évidents. Merci !", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=DavidL94A` },
    { id: "fallback-3", name: "Entreprise Connectis", text: "Le transfert de nos bureaux près de la Vache Noire a été une réussite. Une planification sans faille et une exécution rapide.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Connectis94` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise d'Arcueil",
        description: "Du centre-ville au quartier du Chaperon Vert, nous connaissons les rues, les accès et les réglementations pour une logistique parfaite."
    },
    {
        icon: <ShoppingCart className="h-8 w-8 text-primary"/>,
        title: "Gestion des zones denses",
        description: "Nos équipes sont habituées aux contraintes de la ville dense et des abords du centre commercial de la Vache Noire."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Solutions de Monte-Meubles",
        description: "Nous gérons les autorisations et déployons des solutions de levage pour un service efficace et sécurisé en toutes circonstances."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité administrative",
        description: "Nous gérons pour vous les demandes d'autorisation de stationnement, une démarche essentielle et souvent complexe à Arcueil."
    }
];

const faqItems = [
    {
        question: "Le stationnement est-il difficile à obtenir pour un déménagement à Arcueil ?",
        answer: "Le stationnement peut être un défi, mais c'est notre métier de le gérer. Nous nous chargeons de la demande d'autorisation auprès de la mairie d'Arcueil bien en amont pour réserver un emplacement le jour J. Cela vous garantit la tranquillité et nous permet de travailler dans les meilleures conditions."
    },
    {
        question: "Proposez-vous des formules pour les petits appartements ou les studios à Arcueil ?",
        answer: "Oui, absolument. Nous avons des formules économiques qui sont idéales pour les plus petits volumes. Elles vous permettent de bénéficier de notre savoir-faire professionnel pour la partie la plus physique (transport, manutention) tout en maîtrisant votre budget."
    },
    {
        question: "Vous occupez-vous des déménagements d'entreprises à Arcueil ?",
        answer: "Oui, Arcueil accueille de nombreuses entreprises, notamment près des grands axes et des zones d'activités. Nous avons une grande expérience dans le transfert de bureaux. Nous planifions l'opération avec vous pour minimiser l'impact sur votre activité."
    },
    {
        question: "Comment protégez-vous les parties communes de mon immeuble ?",
        answer: "Le respect des lieux est une priorité. Nos équipes protègent systématiquement les zones de passage : ascenseurs, couloirs, cages d'escalier... avec des couvertures et des protections adaptées pour ne laisser aucune trace de notre passage."
    }
];


export default function ArcueilPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/arcueil/1920/500"
                    alt="Vue sur la ville d'Arcueil"
                    fill
                    className="object-cover"
                    data-ai-hint="arcueil cityscape france"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement à Arcueil</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Arcueil (94110)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution efficace et professionnelle pour votre déménagement à Arcueil, aux portes de Paris.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-val-de-marne-94" className="hover:text-primary">Val-de-Marne (94)</Link>
                <span className="mx-2">&gt;</span>
                <span>Arcueil</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur expert pour la dynamique ville d'Arcueil</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Arcueil, c'est s'installer dans une ville en plein renouveau, stratégiquement placée au sud de Paris et animée par le pôle d'attraction de la Vache Noire. Cette situation privilégiée implique une forte densité et des défis logistiques que seuls des professionnels peuvent maîtriser.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous avons l'expertise pour naviguer dans cet environnement urbain complexe. Que vous emménagiez dans un appartement neuf ou un pavillon ancien, nous planifions chaque détail pour un déménagement fluide, rapide et sans le moindre stress.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/arcueil-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Arcueil"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="urban moving professional team"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-arcueil" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Arcueil</h2>
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
                            src="https://picsum.photos/seed/arcueil-packing/600/400"
                            alt="Déménageur emballant avec soin des objets pour un déménagement à Arcueil"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover careful packing urban"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux spécificités d'Arcueil</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'appartements</h4>
                                    <p className="text-muted-foreground">Solutions sur-mesure pour les appartements de toutes tailles, des résidences neuves aux immeubles plus anciens.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Transfert de bureaux et de commerces</h4>
                                    <p className="text-muted-foreground">Un service efficace, planifié pour minimiser l'impact sur votre activité professionnelle.</p>
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
            <section id="faq-arcueil" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Arcueil</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Arcueil.</p>
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
            <section id="contact-arcueil" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Planifiez votre déménagement à Arcueil</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Arcueil</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
