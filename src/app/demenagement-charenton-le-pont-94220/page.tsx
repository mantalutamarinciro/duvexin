
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Truck, Users, Building, TreePine, Waves } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Dubois", text: "Un déménagement parfaitement géré à Charenton. L'équipe a été très professionnelle et a su s'adapter à notre rue. Service de grande qualité.", rating: 5, createTime: "il y a 2 mois", avatarUrl: `https://i.pravatar.cc/48?u=Dubois94220` },
    { id: "fallback-2", name: "Sophie M.", text: "Très satisfaite de la prestation. Efficaces, rapides et sympathiques. Ils ont rendu mon déménagement beaucoup moins stressant. Je recommande.", rating: 5, createTime: "il y a 6 mois", avatarUrl: `https://i.pravatar.cc/48?u=SophieM94` },
    { id: "fallback-3", name: "Cabinet Conseil", text: "Le transfert de nos bureaux a été mené avec rigueur et discrétion. Une équipe professionnelle sur qui l'on peut compter.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Conseil94` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Charenton",
        description: "Du Pont de Charenton aux bords de Marne, nous connaissons les accès et les réglementations pour une logistique sans faille."
    },
    {
        icon: <Building className="h-8 w-8 text-primary"/>,
        title: "Gestion des immeubles de standing",
        description: "Nous intervenons avec un soin particulier, en protégeant les parties communes et en utilisant des monte-meubles si nécessaire."
    },
    {
        icon: <TreePine className="h-8 w-8 text-primary"/>,
        title: "Proximité du Bois de Vincennes",
        description: "Nous maîtrisons les accès spécifiques des rues bordant le bois, en alliant efficacité et respect de cet environnement privilégié."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité administrative",
        description: "Nous gérons pour vous les demandes d'autorisation de stationnement, une démarche indispensable aux portes de Paris."
    }
];

const faqItems = [
    {
        question: "Le stationnement est-il difficile à obtenir pour un déménagement à Charenton-le-Pont ?",
        answer: "Le stationnement peut être un vrai défi, mais c'est notre métier de le gérer. Nous nous chargeons de la demande d'autorisation auprès de la mairie bien en amont pour réserver un emplacement le jour J. Cela vous garantit la tranquillité et nous permet de travailler dans les meilleures conditions."
    },
    {
        question: "Proposez-vous des formules pour les petits appartements ?",
        answer: "Oui, absolument. Nous avons des formules économiques qui sont idéales pour les plus petits volumes. Elles vous permettent de bénéficier de notre savoir-faire professionnel pour la partie la plus physique (transport, manutention) tout en maîtrisant votre budget."
    },
    {
        question: "Vous occupez-vous des déménagements d'entreprises à Charenton ?",
        answer: "Oui, Charenton accueille de nombreuses entreprises. Nous avons une grande expérience dans le transfert de bureaux. Nous planifions l'opération avec vous pour minimiser l'impact sur votre activité, en intervenant si besoin en dehors des heures de bureau."
    },
    {
        question: "Comment protégez-vous les parties communes de mon immeuble ?",
        answer: "Le respect des lieux est une priorité. Nos équipes protègent systématiquement les zones de passage : ascenseurs, couloirs, cages d'escalier... avec des couvertures et des protections adaptées pour ne laisser aucune trace de notre passage."
    }
];


export default function CharentonLePontPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/charenton/1920/500"
                    alt="Vue sur Charenton-le-Pont et la Marne"
                    fill
                    className="object-cover"
                    data-ai-hint="charenton le pont cityscape"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Charenton-le-Pont</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution efficace et professionnelle pour votre projet à Charenton-le-Pont (94220).</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-val-de-marne-94" className="hover:text-primary">Val-de-Marne (94)</Link>
                <span className="mx-2">&gt;</span>
                <span>Charenton-le-Pont</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur expert pour la ville de Charenton-le-Pont</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Charenton-le-Pont, c'est s'installer dans une ville prisée, idéalement située aux portes de Paris, au confluent de la Seine et de la Marne. Cet emplacement stratégique implique une forte densité et des défis logistiques que seuls des professionnels expérimentés peuvent maîtriser.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous avons l'expertise pour naviguer dans cet environnement urbain complexe. Que vous emménagiez dans un appartement de standing ou que vous transfériez vos bureaux, nous planifions chaque détail pour un déménagement fluide, rapide et sans stress.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/charenton-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Charenton-le-Pont"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="urban moving team riverside"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-charenton" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Charenton</h2>
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
                            src="https://picsum.photos/seed/charenton-packing/600/400"
                            alt="Déménageur emballant avec soin des objets pour un déménagement"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover careful packing urban"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux spécificités de Charenton</h2>
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
            <section id="faq-charenton" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Charenton</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Charenton-le-Pont.</p>
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
            <section id="contact-charenton" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Planifiez votre déménagement à Charenton-le-Pont</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Charenton</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
