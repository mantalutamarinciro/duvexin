
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Home, Users, Building, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Fernandes", text: "Déménagement de notre pavillon à Villiers-le-Bel géré avec beaucoup de professionnalisme. L'équipe a été efficace et très soigneuse. Un grand merci !", rating: 5, createTime: "il y a 5 mois", avatarUrl: `https://i.pravatar.cc/48?u=Fernandes95` },
    { id: "fallback-2", name: "Sandra M.", text: "Très bonne expérience pour mon appartement. Le devis était clair et l'équipe super sympa et rapide. Je recommande leurs services.", rating: 5, createTime: "il y a 9 mois", avatarUrl: `https://i.pravatar.cc/48?u=SandraM95` },
    { id: "fallback-3", name: "M. Traoré", text: "Service impeccable. Ils ont trouvé une solution pour le stationnement et tout s'est déroulé sans accroc. Une entreprise sérieuse.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Traore95VLB` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Villiers-le-Bel",
        description: "Des quartiers pavillonnaires aux grands ensembles, nous connaissons les accès et les spécificités de la ville."
    },
    {
        icon: <Building className="h-8 w-8 text-primary"/>,
        title: "Gestion des immeubles denses",
        description: "Nos équipes sont expertes des déménagements en appartements et en étages, avec des solutions de monte-meubles si nécessaire."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Logistique et accès",
        description: "Nous maîtrisons la logistique locale pour assurer une ponctualité et une organisation exemplaires de votre déménagement."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité administrative",
        description: "Nous gérons pour vous les demandes d'autorisation de stationnement, une démarche indispensable dans cette ville active."
    }
];

const faqItems = [
    {
        question: "Comment se déroule un déménagement dans un grand immeuble à Villiers-le-Bel ?",
        answer: "C'est une situation que nous gérons très régulièrement. La clé est une bonne préparation : visite technique pour évaluer les accès, les ascenseurs, et si besoin, la mise en place d'un monte-meubles. Nous planifions l'intervention pour être rapides, efficaces et pour respecter la tranquillité du voisinage."
    },
    {
        question: "Le stationnement est-il compliqué pour un déménagement à Villiers-le-Bel ?",
        answer: "Dans certains secteurs, cela peut être un enjeu. C'est pourquoi nous incluons la gestion des autorisations de stationnement dans nos prestations. Nous nous occupons des démarches auprès de la mairie pour vous garantir un emplacement, ce qui vous évite du stress et nous permet de travailler dans les meilleures conditions."
    },
    {
        question: "Quelles sont vos formules pour un petit budget ?",
        answer: "Nous proposons des formules flexibles pour tous les besoins. Notre formule 'Économique' est une excellente solution pour maîtriser votre budget : vous vous chargez de l'emballage, et nos professionnels assurent la manutention lourde et le transport sécurisé de vos biens."
    },
    {
        question: "Comment protégez-vous les parties communes de mon immeuble ?",
        answer: "Le respect des lieux est une priorité. Nos équipes protègent systématiquement les zones de passage : ascenseurs (capitonnage), couloirs, cages d'escalier, avec des couvertures et des protections de sol adaptées pour ne laisser aucune trace de notre passage."
    }
];


export default function VilliersLeBelPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/villiers-le-bel/1920/500"
                    alt="Vue sur la ville de Villiers-le-Bel"
                    fill
                    className="object-cover"
                    data-ai-hint="villiers le bel cityscape"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Villiers-le-Bel</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution efficace et fiable pour votre projet à Villiers-le-Bel (95400).</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-val-d-oise-95" className="hover:text-primary">Val-d'Oise (95)</Link>
                <span className="mx-2">&gt;</span>
                <span>Villiers-le-Bel</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui connaît la diversité de Villiers-le-Bel</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Villiers-le-Bel, c'est s'installer dans une ville aux multiples facettes, avec un héritage historique et des quartiers en plein renouveau. Son urbanisme varié, entre zones pavillonnaires et grands ensembles, demande une expertise logistique que nous maîtrisons parfaitement.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous sommes fiers de notre connaissance approfondie de Villiers-le-Bel. Que vous emménagiez dans un appartement, une maison de ville ou un pavillon, nous vous garantissons un déménagement serein, rapide et efficace, adapté aux réalités locales.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/villiers-le-bel-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Villiers-le-Bel"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team diverse city"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-villiers-le-bel" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Villiers-le-Bel</h2>
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
                            src="https://picsum.photos/seed/villiers-le-bel-packing/600/400"
                            alt="Déménageur emballant avec soin des objets pour un déménagement à Villiers-le-Bel"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing urban"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux habitants de Villiers-le-Bel</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'appartements</h4>
                                    <p className="text-muted-foreground">Solutions avec monte-meubles pour les étages élevés et protection soignée de vos biens et des parties communes.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement de maisons et pavillons</h4>
                                    <p className="text-muted-foreground">Nous gérons les déménagements de maisons avec jardin et accès spécifiques, avec le plus grand soin.</p>
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
            <section id="faq-villiers-le-bel" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Villiers-le-Bel</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Villiers-le-Bel.</p>
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
            <section id="contact-villiers-le-bel" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Villiers-le-Bel</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Villiers-le-Bel</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
