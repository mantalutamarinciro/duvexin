
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Castle, Users, Building, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Lecomte", text: "Notre déménagement à Gisors a été une réussite. L'équipe a été très professionnelle et a su gérer les accès du centre-ville sans aucun problème.", rating: 5, createTime: "il y a 4 mois", avatarUrl: `https://i.pravatar.cc/48?u=Lecomte27` },
    { id: "fallback-2", name: "Sophie G.", text: "Très bonne expérience pour mon appartement. Devis clair, équipe ponctuelle et du matériel de qualité. Je recommande Déménagement du Vexin.", rating: 5, createTime: "il y a 9 mois", avatarUrl: `https://i.pravatar.cc/48?u=SophieG27` },
    { id: "fallback-3", name: "Marc T.", text: "Efficacité et professionnalisme. Mon déménagement s'est déroulé sans stress grâce à leur organisation.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=MarcT27` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Gisors",
        description: "Du centre historique aux zones pavillonnaires, nous connaissons les accès et spécificités de la capitale du Vexin normand."
    },
    {
        icon: <Castle className="h-8 w-8 text-primary"/>,
        title: "Respect du Patrimoine",
        description: "Nous intervenons avec un soin particulier dans le centre ancien, en protégeant les lieux et vos biens les plus précieux."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Logistique Adaptée",
        description: "Nous utilisons des véhicules de tailles variées et gérons les autorisations de stationnement pour une intervention sans faille."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "La Proximité de nos Agences",
        description: "Avec nos bases dans l'Eure et le Val-d'Oise, nous sommes votre partenaire de proximité pour tout projet à Gisors."
    }
];

const faqItems = [
    {
        question: "Comment se passe un déménagement dans le centre-ville de Gisors ?",
        answer: "Le centre de Gisors, avec son château et ses rues charmantes, peut présenter des défis d'accès. Nous effectuons une analyse en amont pour choisir le véhicule le plus adapté. Nous nous chargeons également de la réservation de stationnement auprès de la mairie pour garantir une place et une intervention efficace."
    },
    {
        question: "Assurez-vous les déménagements longue distance depuis Gisors ?",
        answer: "Oui, notre expertise ne se limite pas au local. Que vous quittiez Gisors pour une autre région ou que vous y arriviez, nous gérons votre déménagement de A à Z avec la même rigueur et le même professionnalisme."
    },
    {
        question: "Je déménage dans un pavillon avec un accès étroit, comment faites-vous ?",
        answer: "C'est une situation courante dans la région. Nous disposons de plusieurs tailles de véhicules. Si l'accès est vraiment trop difficile pour le camion principal, nous pouvons organiser un transbordement avec un véhicule plus petit pour les derniers mètres."
    },
    {
        question: "Quelles sont vos formules pour les petits budgets ?",
        answer: "Nous proposons des formules flexibles. Notre formule 'Économique' est une excellente solution pour maîtriser votre budget : vous vous chargez de l'emballage, et nos professionnels assurent la manutention lourde et le transport sécurisé de vos biens."
    }
];


export default function GisorsPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/gisors/1920/500"
                    alt="Le château de Gisors"
                    fill
                    className="object-cover"
                    data-ai-hint="Gisors castle"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement à Gisors</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Gisors (27140)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte pour votre projet à Gisors, au carrefour de la Normandie et de l'Oise.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-eure-27" className="hover:text-primary">Eure (27)</Link>
                <span className="mx-2">&gt;</span>
                <span>Gisors</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui connaît l'histoire de Gisors</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Gisors, c'est choisir une ville au riche passé historique, célèbre pour son château et sa position stratégique. Cette ville de caractère demande une approche du déménagement qui soit à la fois respectueuse de son patrimoine et logistiquement efficace.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous avons une connaissance approfondie de Gisors et de ses environs. Que vous emménagiez dans le centre historique ou dans un quartier plus résidentiel, nous vous garantissons un déménagement serein et parfaitement orchestré.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/gisors-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Gisors"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team normandy town"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-gisors" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Gisors</h2>
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
                            src="https://picsum.photos/seed/gisors-packing/600/400"
                            alt="Déménageur emballant avec soin des objets fragiles à Gisors"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux habitants de Gisors</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement de maisons et pavillons</h4>
                                    <p className="text-muted-foreground">Une expertise particulière pour les déménagements de maisons avec un soin apporté à la protection de vos biens et de votre propriété.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'appartements</h4>
                                    <p className="text-muted-foreground">Nous gérons les contraintes liées aux étages et aux accès en centre-ville avec des solutions adaptées.</p>
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
            <section id="faq-gisors" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Gisors</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Gisors.</p>
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
            <section id="contact-gisors" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Gisors</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Gisors</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
