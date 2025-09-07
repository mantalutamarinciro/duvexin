
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Truck, Users, Mountain, Building } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Girard", text: "Notre déménagement Paris-Lyon a été une vraie réussite. L'équipe a été très professionnelle, ponctuelle et a pris grand soin de nos affaires. Un grand bravo.", rating: 5, createTime: "il y a 4 mois", avatarUrl: `https://i.pravatar.cc/48?u=Girard69` },
    { id: "fallback-2", name: "Sophie G.", text: "Un service client à l'écoute et une équipe au top pour mon déménagement longue distance. Je recommande Déménagement du Vexin.", rating: 5, createTime: "il y a 9 mois", avatarUrl: `https://i.pravatar.cc/48?u=SophieG69` },
    { id: "fallback-3", name: "Marc T.", text: "Devis clair, équipe efficace et matériel de qualité. Mon déménagement s'est déroulé sans stress grâce à leur organisation.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=MarcT69` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de l'Axe Paris-Lyon",
        description: "Nous réalisons des déménagements réguliers entre l'Île-de-France et la région lyonnaise, pour une logistique optimisée et des tarifs compétitifs."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Transport sécurisé longue distance",
        description: "Nos véhicules sont adaptés aux longs trajets et nos équipes sont formées pour garantir la sécurité de vos biens sur des centaines de kilomètres."
    },
    {
        icon: <Building className="h-8 w-8 text-primary"/>,
        title: "Solutions pour tous les logements",
        description: "Que vous déménagiez dans un appartement à la Croix-Rousse ou une maison dans les Monts d'Or, nous avons les solutions."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité administrative",
        description: "Nous gérons les autorisations de stationnement nécessaires, que ce soit au départ en Île-de-France ou à l'arrivée à Lyon."
    }
];

const faqItems = [
    {
        question: "Quels sont les délais pour un déménagement entre Paris et Lyon ?",
        answer: "Un déménagement entre Paris et Lyon se déroule généralement sur deux jours. Le premier jour est consacré au chargement en Île-de-France, et le second à la livraison et à l'installation à Lyon. Nous pouvons adapter ce planning à vos besoins."
    },
    {
        question: "Proposez-vous des formules de groupage pour Lyon ?",
        answer: "Oui, pour les petits volumes, nous pouvons proposer des déménagements en groupage. Cela consiste à partager le camion avec d'autres clients, ce qui permet de réduire significativement les coûts. C'est une solution flexible et économique pour les étudiants ou les petites surfaces."
    },
    {
        question: "Comment est calculé le prix d'un déménagement longue distance ?",
        answer: "Le tarif est principalement basé sur le volume de vos biens (en m³) et la distance à parcourir. Nous optimisons nos tournées pour vous proposer le prix le plus juste. Une visite technique (ou une évaluation détaillée par vidéo) nous permet de vous fournir un devis précis et ferme."
    },
    {
        question: "Comment sont protégés mes meubles pendant un si long trajet ?",
        answer: "La protection de vos biens est notre priorité absolue sur les longues distances. Tous vos meubles sont emballés sous des couvertures de protection épaisses et sanglés dans le camion. Les objets les plus fragiles bénéficient d'un emballage spécifique pour ne subir aucun dommage."
    }
];


export default function LyonPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/lyon/1920/500"
                    alt="Vue sur la ville de Lyon avec la basilique de Fourvière"
                    fill
                    className="object-cover"
                    data-ai-hint="lyon cityscape fourviere"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement national</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Lyon (69)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte et fiable pour votre projet entre l'Île-de-France et Lyon.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/zones-intervention" className="hover:text-primary">Zones d'intervention</Link>
                <span className="mx-2">&gt;</span>
                <span>Déménagement National</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur francilien qui connaît la route de Lyon</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Quitter l'Île-de-France pour s'installer à Lyon est un projet de vie majeur. Ce déménagement longue distance demande une organisation rigoureuse, une logistique sans faille et un partenaire de confiance pour s'assurer que tous vos biens arrivent à bon port en parfait état.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous sommes fiers de notre expertise sur l'axe Paris-Lyon. Nous réalisons de nombreux déménagements entre ces deux grandes métropoles et nous vous garantissons une prestation maîtrisée, de votre porte en Île-de-France jusqu'à votre nouveau domicile lyonnais.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/lyon-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Lyon"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team city bridge"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-lyon" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour votre déménagement à Lyon</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Notre connaissance de l'axe Paris-Lyon est la clé de votre tranquillité d'esprit.</p>
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
                            src="https://picsum.photos/seed/lyon-packing/600/400"
                            alt="Déménageur emballant avec soin des objets pour un déménagement longue distance"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux déménagements longue distance</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement de maisons et appartements</h4>
                                    <p className="text-muted-foreground">Une expertise pour tous types de logements, avec des solutions de monte-meubles si nécessaire à Lyon.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Formules de groupage</h4>
                                    <p className="text-muted-foreground">Pour les plus petits volumes, nous proposons des déménagements groupés pour des tarifs très avantageux.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Formules flexibles</h4>
                                    <p className="text-muted-foreground">De la prestation économique au service tout confort, nous nous adaptons à vos attentes.</p>
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
            <section id="faq-lyon" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Lyon</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi vers Lyon.</p>
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
            <section id="contact-lyon" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Lyon</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Lyon</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
