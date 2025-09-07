
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Truck, Users, Building, Factory } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Simon", text: "Déménagement de notre appartement à Ivry géré avec une grande efficacité. L'équipe a été rapide, pro et a su s'adapter à la circulation. Un grand bravo.", rating: 5, createTime: "il y a 2 mois", avatarUrl: `https://i.pravatar.cc/48?u=Simon94` },
    { id: "fallback-2", name: "Entreprise Print-Solution", text: "Le transfert de notre imprimerie a été une opération complexe, mais l'équipe a été à la hauteur. Matériel lourd, machines... tout a été parfaitement géré.", rating: 5, createTime: "il y a 7 mois", avatarUrl: `https://i.pravatar.cc/48?u=PrintSolution94` },
    { id: "fallback-3", name: "Lucie D.", text: "Très bonne expérience. Devis clair et service impeccable. Je recommande Déménagement du Vexin pour tout projet à Ivry.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=LucieD94` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise d'Ivry-sur-Seine",
        description: "Du centre-ville aux zones d'activités en passant par les quais, nous connaissons les accès et réglementations de cette ville en mutation."
    },
    {
        icon: <Building className="h-8 w-8 text-primary"/>,
        title: "Gestion des accès denses",
        description: "Nos équipes sont habituées aux contraintes des rues et immeubles d'Ivry, avec des solutions de monte-meubles pour optimiser l'intervention."
    },
    {
        icon: <Factory className="h-8 w-8 text-primary"/>,
        title: "Déménagement d'entreprise",
        description: "Nous avons une grande expérience dans le transfert d'ateliers, de bureaux et d'entrepôts dans les zones d'activités d'Ivry."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité administrative",
        description: "Nous nous occupons des demandes d'autorisation de stationnement, une démarche indispensable aux portes de Paris."
    }
];

const faqItems = [
    {
        question: "Comment se déroule un déménagement dans une rue fréquentée d'Ivry ?",
        answer: "La clé est la planification. Nous effectuons une visite technique ou une analyse sur photos pour évaluer les contraintes. Nous demandons l'autorisation de stationnement bien en amont et nous pouvons planifier l'intervention à des heures creuses pour minimiser la gêne. L'efficacité de nos équipes fait le reste."
    },
    {
        question: "Déménagez-vous les entreprises et les ateliers à Ivry-sur-Seine ?",
        answer: "Oui, c'est une de nos forces. Nous avons l'expertise pour déménager tous types de locaux professionnels, y compris les ateliers avec du matériel lourd ou les bureaux avec beaucoup de postes informatiques. Nous planifions l'opération pour limiter l'interruption de votre activité."
    },
    {
        question: "Proposez-vous des formules adaptées aux étudiants ou aux petits appartements ?",
        answer: "Absolument. Nos formules sont flexibles. La formule Économique est parfaite pour les petits volumes : vous emballez vos affaires, et nous nous occupons de la manutention professionnelle et du transport sécurisé. C'est une excellente solution pour maîtriser son budget."
    },
    {
        question: "Comment protégez-vous les parties communes de mon immeuble ?",
        answer: "C'est une priorité absolue. Nos équipes protègent systématiquement les zones de passage comme les ascenseurs (capitonnage), les couloirs et les cages d'escalier (avec des couvertures et protections adaptées) pour ne laisser aucune trace de notre passage."
    }
];


export default function IvrySurSeinePage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/ivry/1920/500"
                    alt="Vue sur la ville d'Ivry-sur-Seine"
                    fill
                    className="object-cover"
                    data-ai-hint="ivry sur seine cityscape"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement à Ivry</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Ivry-sur-Seine</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution efficace et professionnelle pour votre déménagement à Ivry-sur-Seine (94200).</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-val-de-marne-94" className="hover:text-primary">Val-de-Marne (94)</Link>
                <span className="mx-2">&gt;</span>
                <span>Ivry-sur-Seine</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur expert pour la dynamique Ivry-sur-Seine</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Ivry-sur-Seine, c'est s'installer dans une ville en pleine effervescence, au contact direct de Paris. Son héritage industriel, sa scène culturelle riche et ses grands projets de rénovation urbaine en font un territoire aux défis logistiques variés.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous avons l'expertise pour naviguer dans cet environnement urbain complexe. Que vous emménagiez dans un loft, un appartement moderne ou que vous transfériez votre entreprise, nous planifions chaque détail pour un déménagement fluide, rapide et maîtrisé.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/ivry-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Ivry-sur-Seine"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="urban moving professional"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-ivry" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Ivry</h2>
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
                            src="https://picsum.photos/seed/ivry-packing/600/400"
                            alt="Déménageur emballant du matériel pour un déménagement d'entreprise"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover packing business equipment"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux spécificités d'Ivry-sur-Seine</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'appartements</h4>
                                    <p className="text-muted-foreground">Solutions sur-mesure pour les appartements de toutes tailles, des immeubles anciens aux résidences neuves.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Transfert de bureaux et d'ateliers</h4>
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
            <section id="faq-ivry" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Ivry</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Ivry-sur-Seine.</p>
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
            <section id="contact-ivry" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Planifiez votre déménagement à Ivry-sur-Seine</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Ivry-sur-Seine</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
