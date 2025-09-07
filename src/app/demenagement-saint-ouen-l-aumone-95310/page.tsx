
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Home, Users, Building, Truck, Factory } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Petit", text: "Déménagement de notre maison à Saint-Ouen-l'Aumône parfaitement géré. L'équipe a été efficace et très soigneuse. Un service de qualité que nous recommandons.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Petit95` },
    { id: "fallback-2", name: "Entreprise Innovatec", text: "Le transfert de nos bureaux dans le parc des Béthunes a été une réussite totale. Une planification rigoureuse et une exécution rapide. Des vrais professionnels.", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=Innovatec95` },
    { id: "fallback-3", name: "Marc D.", text: "Très bonne expérience pour mon appartement. De la prise de contact au jour J, tout a été fluide et sans stress. Je recommande.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=MarcD95SOA` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Saint-Ouen-l'Aumône",
        description: "Du centre ancien au grand pôle économique, nous connaissons les accès et les spécificités de chaque quartier de la ville."
    },
    {
        icon: <Factory className="h-8 w-8 text-primary"/>,
        title: "Spécialiste des Parcs d'Activités",
        description: "Nous avons une grande expérience des transferts d'entreprises dans les parcs des Béthunes, du Vert Galant et d'Épluches."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Solutions pour tous les logements",
        description: "Que vous soyez en appartement ou en pavillon, nous avons les véhicules et le matériel adaptés à votre déménagement."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité administrative",
        description: "Nous gérons pour vous les demandes d'autorisation de stationnement, une démarche importante pour déménager sereinement."
    }
];

const faqItems = [
    {
        question: "Comment se déroule un déménagement d'entreprise à Saint-Ouen-l'Aumône ?",
        answer: "C'est une de nos spécialités. Nous planifions l'intervention avec vous pour minimiser l'impact sur votre activité (intervention en horaires décalés, le week-end...). Nous avons l'habitude de gérer le matériel de bureau, les archives et le matériel de production avec des protections adaptées."
    },
    {
        question: "Je déménage dans un pavillon. Comment protégez-vous les accès et le jardin ?",
        answer: "Nous portons une attention particulière à la protection de votre propriété. Nous utilisons des tapis de sol, des protections pour les angles de murs et, si nécessaire, des plaques de roulage pour ne pas endommager votre pelouse. Nos équipes sont formées pour travailler avec le plus grand soin."
    },
    {
        question: "Déménagez-vous depuis ou vers Saint-Ouen-l'Aumône sur de longues distances ?",
        answer: "Oui. Notre expertise locale est un atout, mais nous assurons des déménagements sur toutes les distances en France et en Europe. Que vous arriviez de province ou que vous partiez pour une autre région, nous gérons votre projet avec la même rigueur."
    },
    {
        question: "Quelles sont vos formules pour un petit budget ?",
        answer: "Nous proposons des formules flexibles. Notre formule 'Économique' est une excellente solution pour maîtriser votre budget : vous vous chargez de l'emballage, et nos professionnels assurent la manutention lourde et le transport sécurisé de vos biens."
    }
];


export default function SaintOuenLAumonePage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/saint-ouen-l-aumone/1920/500"
                    alt="Vue sur la ville de Saint-Ouen-l'Aumône"
                    fill
                    className="object-cover"
                    data-ai-hint="cityscape business park"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Saint-Ouen-l'Aumône</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte et locale pour votre projet à Saint-Ouen-l'Aumône (95310).</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-val-d-oise-95" className="hover:text-primary">Val-d'Oise (95)</Link>
                <span className="mx-2">&gt;</span>
                <span>Saint-Ouen-l'Aumône</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur expert pour le pôle économique de Saint-Ouen-l'Aumône</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Saint-Ouen-l'Aumône, c'est s'installer dans une ville au double visage : un cœur historique de caractère et l'un des plus grands parcs d'activités d'Île-de-France. Cette dualité demande une grande polyvalence et une logistique impeccable.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous sommes fiers de notre expertise sur ce territoire. Que vous soyez un particulier emménageant dans un pavillon, ou une entreprise transférant ses locaux dans le parc des Béthunes, nous vous garantissons un déménagement serein, efficace et adapté.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/soa-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Saint-Ouen-l'Aumône"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team business"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-soa" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Saint-Ouen-l'Aumône</h2>
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
                            src="https://picsum.photos/seed/soa-packing/600/400"
                            alt="Déménageur emballant avec soin du matériel d'entreprise"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing business"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux particuliers et professionnels</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'entreprises</h4>
                                    <p className="text-muted-foreground">Une expertise pointue pour le transfert de bureaux, d'ateliers ou de stocks dans les parcs d'activités.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement de maisons et appartements</h4>
                                    <p className="text-muted-foreground">Nous gérons les déménagements de toutes tailles, avec le plus grand soin pour vos biens personnels.</p>
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
            <section id="faq-soa" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement St-Ouen-l'Aumône</h2>
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
            <section id="contact-soa" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Saint-Ouen-l'Aumône</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Saint-Ouen-l'Aumône</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
