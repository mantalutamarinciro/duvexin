
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Truck, Users, Building, GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Robert", text: "Déménagement de notre maison à Cachan parfaitement géré. L'équipe a été efficace, ponctuelle et très soigneuse avec nos affaires. Nous recommandons vivement.", rating: 5, createTime: "il y a 4 mois", avatarUrl: `https://i.pravatar.cc/48?u=Robert94` },
    { id: "fallback-2", name: "Émilie, étudiante ENS", text: "Service impeccable pour mon petit studio. La formule économique était parfaite pour mon budget, et l'équipe a été super rapide et sympa. Zéro stress !", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=EmilieENS` },
    { id: "fallback-3", name: "M. Lefevre", text: "Très bonne expérience. Devis clair et service professionnel du début à la fin. Une entreprise sérieuse pour déménager à Cachan.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Lefevre94` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Cachan",
        description: "Du centre-ville à la Cité-jardin, nous connaissons les rues, les accès et les réglementations pour une logistique sans faille."
    },
    {
        icon: <GraduationCap className="h-8 w-8 text-primary"/>,
        title: "Spécialiste des déménagements étudiants",
        description: "Nous proposons des formules adaptées et des tarifs compétitifs pour les étudiants de l'ENS Paris-Saclay et des autres écoles."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Logistique et gestion des accès",
        description: "Nous maîtrisons la logistique autour des axes fréquentés (A6, N20) pour assurer la ponctualité de nos interventions."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité administrative",
        description: "Nous gérons pour vous les demandes d'autorisation de stationnement, une démarche clé pour un déménagement apaisé à Cachan."
    }
];

const faqItems = [
    {
        question: "Je suis étudiant à l'ENS Paris-Saclay, avez-vous une offre spécifique ?",
        answer: "Oui, absolument. Nous connaissons bien les besoins des étudiants. Nous proposons une formule Économique parfaite pour les petits volumes (studios, T1) et les budgets serrés. Nous pouvons aussi organiser des déménagements groupés pour réduire encore les coûts. Contactez-nous pour une offre personnalisée."
    },
    {
        question: "Comment se déroule un déménagement dans la Cité-jardin de Cachan ?",
        answer: "Nous connaissons bien ce quartier au charme unique. Nous y intervenons avec des véhicules de taille adaptée pour respecter la quiétude et l'étroitesse de certaines voies. Nous protégeons les accès et les jardins pour ne laisser aucune trace de notre passage."
    },
    {
        question: "Le stationnement est-il compliqué pour un déménagement à Cachan ?",
        answer: "Certains secteurs peuvent être denses, notamment près du centre-ville ou des grandes avenues. C'est pourquoi nous incluons la gestion des autorisations de stationnement dans nos prestations. Nous nous occupons des démarches auprès de la mairie pour vous garantir un emplacement, ce qui est essentiel pour une opération efficace."
    },
    {
        question: "Quelles protections utilisez-vous pour les biens fragiles ?",
        answer: "La protection de vos affaires est notre priorité. Nous utilisons des couvertures de protection épaisses, des housses spéciales pour la literie et les canapés, et du film à bulles ou des cartons renforcés pour tous vos objets délicats comme la vaisselle, les cadres ou les miroirs."
    }
];


export default function CachanPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/cachan/1920/500"
                    alt="Vue sur la ville de Cachan"
                    fill
                    className="object-cover"
                    data-ai-hint="cachan cityscape france"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Cachan (94230)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution efficace et locale pour votre projet à Cachan, ville verte et étudiante.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-val-de-marne-94" className="hover:text-primary">Val-de-Marne (94)</Link>
                <span className="mx-2">&gt;</span>
                <span>Cachan</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur expert pour la ville de Cachan</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Cachan, c'est s'installer dans une ville dynamique et appréciée pour sa qualité de vie, sa verdure et sa population étudiante, notamment grâce à l'ENS Paris-Saclay. Cette diversité, entre quartiers pavillonnaires et résidences étudiantes, demande une connaissance approfondie du terrain.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous maîtrisons ces spécificités. Que vous soyez une famille emménageant dans la Cité-jardin, un étudiant s'installant près de son campus ou un professionnel, nous planifions chaque détail pour garantir un déménagement rapide, efficace et sans stress.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/cachan-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Cachan"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team suburban street"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-cachan" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Cachan</h2>
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
                            src="https://picsum.photos/seed/cachan-packing/600/400"
                            alt="Déménageur emballant avec soin des objets pour un déménagement à Cachan"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing boxes"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux habitants de Cachan</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'appartements et maisons</h4>
                                    <p className="text-muted-foreground">Solutions avec monte-meubles pour les étages élevés et protection soignée de vos biens et des parties communes.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Formule Étudiant</h4>
                                    <p className="text-muted-foreground">Des offres économiques et flexibles pour les petits volumes, idéales pour les étudiants et les jeunes actifs.</p>
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
            <section id="faq-cachan" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Cachan</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Cachan.</p>
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
            <section id="contact-cachan" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Cachan</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Cachan</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
