
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Home, Users, Building, Truck, Landmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Leclair", text: "Déménagement dans le centre ancien de Bayeux géré avec un professionnalisme remarquable. L'équipe a pris un soin infini de nos affaires et des lieux. Un grand merci !", rating: 5, createTime: "il y a 5 mois", avatarUrl: `https://i.pravatar.cc/48?u=Leclair14` },
    { id: "fallback-2", name: "Jean-Eudes R.", text: "Très bonne expérience pour mon appartement. Devis clair, équipe ponctuelle et du matériel de qualité. Une entreprise sérieuse pour une ville historique.", rating: 5, createTime: "il y a 10 mois", avatarUrl: `https://i.pravatar.cc/48?u=JER14` },
    { id: "fallback-3", name: "Sophie B.", text: "Efficacité et professionnalisme. Je recommande vivement Déménagement du Vexin pour leur sérieux et leur respect du patrimoine.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=SophieB14` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Bayeux",
        description: "Du centre médiéval aux quartiers plus récents, nous connaissons les accès et spécificités de la ville et de ses alentours."
    },
    {
        icon: <Landmark className="h-8 w-8 text-primary"/>,
        title: "Respect du Patrimoine",
        description: "Nous intervenons avec un soin particulier dans le secteur sauvegardé, en protégeant les lieux et vos biens les plus précieux."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Logistique Adaptée",
        description: "Nous utilisons des véhicules de tailles variées pour nous adapter aux rues étroites du centre historique."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "La Proximité de nos Agences",
        description: "Avec notre base d'Évreux, nous sommes votre partenaire de proximité pour tout projet à Bayeux et dans le Bessin."
    }
];

const faqItems = [
    {
        question: "Comment se passe un déménagement dans le centre médiéval de Bayeux ?",
        answer: "Le centre de Bayeux, avec ses rues pavées et parfois très étroites, demande une excellente planification. Nous effectuons systématiquement une visite technique ou une analyse à distance pour choisir le véhicule le plus adapté. Nous nous chargeons également de la réservation de stationnement auprès de la mairie pour garantir une place et une intervention efficace, dans le plus grand respect du patrimoine."
    },
    {
        question: "Déménagez-vous les maisons de caractère typiques du Bessin ?",
        answer: "Oui, c'est une de nos spécialités. Nous avons l'habitude d'intervenir dans les belles demeures en pierre de Caen. Nos équipes sont formées pour protéger les sols anciens, les boiseries et les accès parfois délicats de ces maisons."
    },
    {
        question: "Assurez-vous les déménagements depuis l'étranger vers Bayeux ?",
        answer: "Oui, nous gérons des déménagements internationaux. Bayeux étant une ville très appréciée des étrangers, nous avons l'habitude de coordonner des déménagements depuis le Royaume-Uni, la Belgique ou d'autres pays, en gérant la logistique de bout en bout."
    },
    {
        question: "Quelles sont vos formules pour les petits appartements ?",
        answer: "Nous proposons des formules flexibles. Notre formule 'Économique' est une excellente solution pour maîtriser votre budget : vous vous chargez de l'emballage, et nos professionnels assurent la manutention lourde et le transport sécurisé de vos biens."
    }
];


export default function BayeuxPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/bayeux/1920/500"
                    alt="La cathédrale de Bayeux"
                    fill
                    className="object-cover"
                    data-ai-hint="Bayeux cathedral"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement à Bayeux</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Bayeux (14400)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte pour votre projet au cœur de l'histoire de Normandie.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-calvados-14" className="hover:text-primary">Calvados (14)</Link>
                <span className="mx-2">&gt;</span>
                <span>Bayeux</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui connaît la richesse de Bayeux</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Bayeux, ville au patrimoine médiéval exceptionnel et première ville libérée de France, demande une approche alliant respect de l'histoire et logistique moderne. Son centre préservé est un joyau qui impose un savoir-faire expert.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Grâce à notre ancrage normand, nous sommes votre expert local. Que vous emménagiez dans une maison à colombages, un appartement de caractère ou un pavillon récent, nous vous garantissons un déménagement serein et parfaitement orchestré.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/bayeux-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Bayeux"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team medieval town"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-bayeux" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Bayeux</h2>
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
                            src="https://picsum.photos/seed/bayeux-packing/600/400"
                            alt="Déménageur emballant avec soin des objets anciens"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing antique"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux habitants de Bayeux</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement de maisons et appartements</h4>
                                    <p className="text-muted-foreground">Une expertise particulière pour les déménagements en centre-ville et dans les maisons de caractère.</p>
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
            <section id="faq-bayeux" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Bayeux</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Bayeux.</p>
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
            <section id="contact-bayeux" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Bayeux</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Bayeux</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
