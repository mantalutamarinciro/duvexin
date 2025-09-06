
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Home, Users, Building, Truck, Briefcase } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Société TechMove", text: "Le transfert de nos bureaux à Inovel Parc a été une réussite. Une équipe discrète, rapide et très organisée. Des professionnels de confiance.", rating: 5, createTime: "il y a 6 mois", avatarUrl: `https://i.pravatar.cc/48?u=TechMove78` },
    { id: "fallback-2", name: "Laura et Kevin", text: "Déménagement de notre appartement à Vélizy sans aucun stress. L'équipe a été super efficace et sympathique. Nous recommandons !", rating: 5, createTime: "il y a 9 mois", avatarUrl: `https://i.pravatar.cc/48?u=LauraK78` },
    { id: "fallback-3", name: "M. Brunet", text: "Service de qualité, devis respecté et une équipe très pro. Mon déménagement s'est parfaitement déroulé.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Brunet78` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Vélizy",
        description: "Nous connaissons parfaitement la ville, de la zone d'emplois Inovel Parc aux quartiers résidentiels."
    },
    {
        icon: <Briefcase className="h-8 w-8 text-primary"/>,
        title: "Spécialiste du déménagement d'entreprise",
        description: "Nous avons l'expérience des transferts de bureaux dans les parcs d'activités tertiaires de Vélizy."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Logistique et accès",
        description: "Nous maîtrisons les accès via les grands axes (A86, N118) pour une ponctualité et une efficacité maximales."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité et sécurité",
        description: "Nous assurons la protection de votre matériel professionnel sensible comme de vos biens personnels avec le plus grand soin."
    }
];

const faqItems = [
    {
        question: "Comment organisez-vous un déménagement d'entreprise à Vélizy ?",
        answer: "Nous avons une méthodologie éprouvée pour les transferts de bureaux. Nous établissons un planning détaillé avec vous pour minimiser l'impact sur votre activité. Nous pouvons intervenir en dehors des heures de bureau, le week-end ou la nuit. L'étiquetage, l'emballage du matériel informatique et la coordination sont nos points forts."
    },
    {
        question: "Déménagez-vous aussi les particuliers à Vélizy-Villacoublay ?",
        answer: "Oui, bien sûr. Nous déménageons de nombreux particuliers qui travaillent et vivent à Vélizy. Que vous habitiez en appartement ou en maison, nous avons la formule qui correspond à vos besoins, de la plus économique à la prestation tout confort."
    },
    {
        question: "La proximité de l'aéroport est-elle une contrainte ?",
        answer: "La proximité de l'aéroport de Villacoublay ne pose généralement pas de problème pour les déménagements, mais nous tenons compte de la circulation spécifique dans cette zone lors de la planification de nos itinéraires pour garantir notre ponctualité."
    },
    {
        question: "Comment se passe la réservation de stationnement à Vélizy ?",
        answer: "Nous nous occupons de cette démarche administrative pour vous. Nous contactons les services de la mairie pour obtenir une autorisation de stationnement, ce qui garantit un emplacement pour notre camion au plus près de votre domicile ou de vos bureaux le jour J."
    }
];


export default function VelizyVillacoublayPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/velizy/1920/500"
                    alt="Zone d'affaires de Vélizy-Villacoublay"
                    fill
                    className="object-cover"
                    data-ai-hint="modern business park"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Vélizy-Villacoublay</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte pour votre projet à Vélizy-Villacoublay (78140).</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-yvelines-78" className="hover:text-primary">Yvelines (78)</Link>
                <span className="mx-2">&gt;</span>
                <span>Vélizy-Villacoublay</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur expert pour le pôle d'affaires de Vélizy</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Vélizy-Villacoublay, c'est s'installer au cœur de l'un des plus grands pôles d'emplois d'Île-de-France. Que vous soyez une entreprise transférant ses bureaux ou un particulier s'installant à proximité de son lieu de travail, la logistique doit être impeccable.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous avons une solide expérience des déménagements à Vélizy. Nous maîtrisons les contraintes des zones d'activités et des quartiers résidentiels pour vous offrir un service fluide, rapide et sécurisé.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/velizy-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Vélizy"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team business park"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-velizy" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Vélizy</h2>
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
                            src="https://picsum.photos/seed/velizy-packing/600/400"
                            alt="Déménageur emballant du matériel de bureau"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover packing office equipment"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux particuliers et professionnels</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Transfert de bureaux</h4>
                                    <p className="text-muted-foreground">Une expertise pointue pour le déménagement de votre entreprise, planifié pour minimiser l'impact sur votre activité.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement de particuliers</h4>
                                    <p className="text-muted-foreground">Que vous soyez en appartement ou en maison, nous avons une solution sur-mesure pour vous.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Formules flexibles</h4>
                                    <p className="text-muted-foreground">De la prestation économique à la formule tout confort, nous nous adaptons à vos attentes et votre budget.</p>
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
            <section id="faq-velizy" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Vélizy-Villacoublay</h2>
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
            <section id="contact-velizy" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Vélizy-Villacoublay</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Vélizy-Villacoublay</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
