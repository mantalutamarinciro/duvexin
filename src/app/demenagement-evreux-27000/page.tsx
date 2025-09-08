
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Star, Users, Building, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Clotilde Duran", text: "Une équipe très réactive et très professionnelle, vraiment rien à dire, du très bon travail! Les affaires ont été emballées avec le plus grand soin. Nous conseillons les yeux fermés!", rating: 5, createTime: "il y a 2 ans", avatarUrl: `https://i.pravatar.cc/48?u=Clotilde` },
    { id: "fallback-2", name: "Jean-michel Marot", text: "Un déménagement en Bretagne parfaitement réalisé. Professionnel du début jusqu'à la livraison finale. Très bon contact. Équipe efficace, rapide, et sympathique. Travail de qualité.", rating: 5, createTime: "il y a 2 ans", avatarUrl: `https://i.pravatar.cc/48?u=Jean-michel` },
    { id: "fallback-3", name: "Robert GALAND", text: "Une interlocutrice réactive, une équipe ultra efficace, des affaires très bien protégées. Rapidité, professionnalisme. On voit le côté 'familial' sans prestataire ou intérimaire. Sincèrement je suis bluffé. Je recommande totalement. MERCI", rating: 5, createTime: "il y a 19 jours", avatarUrl: `https://i.pravatar.cc/48?u=Robert` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Votre Agence Locale",
        description: "Étant basés à Évreux, nous avons une connaissance inégalée de la ville et de ses quartiers, de Navarre à Nétreville."
    },
    {
        icon: <Users className="h-8 w-8 text-primary"/>,
        title: "Des Équipes d'Évreux",
        description: "Nos déménageurs sont des professionnels locaux, fiers de fournir un service de qualité à leur communauté."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Logistique et Accès",
        description: "Nous maîtrisons les accès du centre-ville comme des zones plus résidentielles et nous gérons les autorisations de stationnement."
    },
    {
        icon: <Star className="h-8 w-8 text-primary"/>,
        title: "Qualité et Fiabilité",
        description: "Un interlocuteur unique dans notre agence locale pour un service personnalisé et un déménagement maîtrisé."
    }
];

const faqItems = [
    {
        question: "Quels sont les avantages de faire appel à votre agence d'Évreux pour un déménagement local ?",
        answer: "Faire appel à nous, c'est choisir des gens d'ici. Notre proximité nous permet d'être extrêmement réactifs pour réaliser des visites techniques, de vous fournir rapidement du matériel et de planifier votre déménagement avec une flexibilité que peu peuvent offrir. C'est l'assurance d'un service de confiance, par des professionnels qui connaissent votre ville."
    },
    {
        question: "Comment gérez-vous un déménagement dans le centre-ville d'Évreux ?",
        answer: "Le centre-ville a ses propres règles de circulation et de stationnement. Notre expérience locale nous permet de gérer efficacement les demandes d'autorisation auprès de la mairie et de choisir le véhicule le plus adapté pour les rues concernées, afin d'assurer une intervention fluide et sans stress."
    },
    {
        question: "Intervenez-vous dans les communes autour d'Évreux ?",
        answer: "Oui, notre agence couvre non seulement Évreux mais aussi toute son agglomération et le département de l'Eure. Que vous soyez à Guichainville, Arnières-sur-Iton, ou une autre commune voisine, nous sommes votre partenaire de proximité."
    },
    {
        question: "Je quitte Évreux pour une autre région, assurez-vous les déménagements longue distance ?",
        answer: "Absolument. Nous sommes des spécialistes du déménagement national. Nous organisons votre départ d'Évreux vers n'importe quelle destination en France avec le même soin, la même rigueur et des tarifs compétitifs grâce à nos tournées optimisées."
    }
];


export default function EvreuxPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/evreux-city/1920/500"
                    alt="La cathédrale Notre-Dame d'Évreux"
                    fill
                    className="object-cover"
                    data-ai-hint="evreux cathedral"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Votre déménageur expert et local</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Évreux (27000)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">Avec notre agence au cœur d'Évreux, bénéficiez d'un service de proximité inégalé pour votre projet.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-eure-27" className="hover:text-primary">Eure (27)</Link>
                <span className="mx-2">&gt;</span>
                <span>Évreux</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Déménager à Évreux, le cœur de l'Eure, avec votre expert local</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Capitale de l'Eure, Évreux est une ville qui allie un riche patrimoine historique à un dynamisme économique et culturel. Pour un déménagement réussi dans cette ville que nous connaissons si bien, il est essentiel de s'appuyer sur un partenaire qui maîtrise ses spécificités.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Étant implantés à Évreux même, nous sommes plus que des déménageurs : nous sommes vos voisins. Cette connaissance intime du terrain nous permet de vous offrir une réactivité, une flexibilité et une qualité de service exceptionnelles pour votre projet, qu'il soit résidentiel ou professionnel.
                        </p>
                         <Button asChild className="mt-6">
                            <Link href="/demenagement-du-vexin-evreux">Découvrir notre agence locale</Link>
                         </Button>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/evreux-team-action/600/400"
                            alt="Agence Déménagement du Vexin à Évreux"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="local office building street"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-evreux" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">L'avantage d'un déménageur basé à Évreux</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nous sommes un acteur local, et cela fait toute la différence pour votre déménagement.</p>
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
                            src="https://picsum.photos/seed/evreux-packing/600/400"
                            alt="Déménageur protégeant un meuble avec soin"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover protecting furniture"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Nos services pour votre projet à Évreux</h2>
                         <p className="mt-4 text-muted-foreground text-lg">Nous proposons une gamme complète de prestations pour répondre à tous vos besoins.</p>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement pour particuliers</h4>
                                    <p className="text-muted-foreground">Des formules sur-mesure pour s'adapter à votre budget et à vos besoins spécifiques.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'entreprise</h4>
                                    <p className="text-muted-foreground">Nous organisons le transfert de vos bureaux pour minimiser l'impact sur votre activité.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Garde-meubles à Évreux</h4>
                                    <p className="text-muted-foreground">Besoin d'une solution de stockage ? Nous proposons des box sécurisés pour de courtes ou longues durées.</p>
                                </div>
                            </li>
                        </ul>
                         <Button asChild className="mt-8" variant="outline">
                            <Link href="/services">Explorer tous nos services</Link>
                         </Button>
                    </div>
                </div>
            </section>
            
            <TestimonialsSection reviews={fallbackTestimonials} />
            
            {/* FAQ Section */}
            <section id="faq-evreux" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Évreux</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Vos interrogations, nos réponses claires pour un projet réussi à Évreux.</p>
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
            <section id="contact-evreux" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Lancez votre déménagement à Évreux !</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez votre agence locale pour une étude personnalisée et recevez un devis gratuit et sans engagement.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Mon devis pour Évreux</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
