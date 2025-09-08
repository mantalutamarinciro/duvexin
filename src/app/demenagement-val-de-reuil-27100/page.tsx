
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Factory, Users, Building, Truck, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Dufour", text: "Notre déménagement à Val-de-Reuil a été une réussite. L'équipe a été très professionnelle et a su s'adapter à la configuration de la ville nouvelle.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Dufour27` },
    { id: "fallback-2", name: "Société Pharma-Log", text: "Le transfert de notre site de production a été géré avec une grande rigueur. Une équipe qui connaît bien les enjeux des zones d'activités.", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=PharmaLog27` },
    { id: "fallback-3", name: "Marc T.", text: "Service impeccable pour mon appartement. Devis clair et équipe ponctuelle. Un déménagement sans stress.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=MarcT27VDR` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Val-de-Reuil",
        description: "Nous connaissons l'urbanisme unique de la ville nouvelle, de ses zones résidentielles à ses grands pôles d'activités."
    },
    {
        icon: <Factory className="h-8 w-8 text-primary"/>,
        title: "Spécialiste du Déménagement d'Entreprise",
        description: "Nous avons une grande expérience des transferts industriels et de bureaux dans les zones d'activités rolivaloises."
    },
    {
        icon: <Home className="h-8 w-8 text-primary"/>,
        title: "Solutions pour tous les logements",
        description: "Que vous soyez en appartement ou en pavillon, nous avons les véhicules et le matériel adaptés à votre déménagement."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "La Proximité de l'Agence d'Évreux",
        description: "Notre base locale nous permet d'être réactifs et compétitifs pour tous vos projets à Val-de-Reuil et ses environs."
    }
];

const faqItems = [
    {
        question: "Comment se déroule un déménagement dans un quartier résidentiel de Val-de-Reuil ?",
        answer: "Nous connaissons bien l'urbanisme des villes nouvelles. Les accès sont généralement bons, ce qui nous permet de travailler efficacement. Nous planifions l'intervention pour garantir la fluidité et nous utilisons du matériel de protection pour préserver vos biens et votre logement."
    },
    {
        question: "Déménagez-vous les entreprises du pôle pharmaceutique ?",
        answer: "Oui, c'est l'une de nos spécialités dans le secteur. Nous avons l'expertise pour le transfert de bureaux, de laboratoires ou d'unités de production, en garantissant la sécurité de votre matériel sensible et en planifiant l'opération pour minimiser l'impact sur votre activité."
    },
    {
        question: "Assurez-vous les déménagements longue distance depuis ou vers Val-de-Reuil ?",
        answer: "Absolument. Que vous arriviez d'une autre région ou que vous quittiez la Normandie, nous gérons votre déménagement de A à Z. Notre expérience des longues distances garantit un transport sécurisé et une logistique optimisée."
    },
    {
        question: "Quelles sont vos formules pour un petit budget ?",
        answer: "Nous proposons des formules flexibles. Notre formule 'Économique' est une excellente solution pour maîtriser votre budget : vous vous chargez de l'emballage, et nos professionnels assurent la manutention lourde et le transport sécurisé de vos biens."
    }
];


export default function ValDeReuilPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/val-de-reuil/1920/500"
                    alt="Vue sur la ville nouvelle de Val-de-Reuil"
                    fill
                    className="object-cover"
                    data-ai-hint="Val-de-Reuil modern cityscape"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Val-de-Reuil (27100)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte et locale pour votre projet à Val-de-Reuil, pôle économique de l'Eure.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-eure-27" className="hover:text-primary">Eure (27)</Link>
                <span className="mx-2">&gt;</span>
                <span>Val-de-Reuil</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui connaît le dynamisme de Val-de-Reuil</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Val-de-Reuil, la plus jeune commune de France, c'est s'installer au cœur d'un bassin économique et industriel majeur en Normandie. Son urbanisme moderne et ses vastes zones d'activités demandent une approche logistique rigoureuse.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Grâce à notre agence d'Évreux, nous avons une connaissance parfaite de Val-de-Reuil. Que vous soyez un particulier emménageant dans un appartement ou un pavillon, ou une entreprise s'installant sur le parc d'activités, nous vous garantissons un déménagement serein et parfaitement orchestré.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/val-de-reuil-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Val-de-Reuil"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team modern town"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-val-de-reuil" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Val-de-Reuil</h2>
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
                            src="https://picsum.photos/seed/val-de-reuil-packing/600/400"
                            alt="Déménageur emballant avec soin du matériel professionnel"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing industrial"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux particuliers et entreprises</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'entreprises et d'usines</h4>
                                    <p className="text-muted-foreground">Une expertise particulière pour le transfert de matériel professionnel, de bureaux et de lignes de production.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement de maisons et appartements</h4>
                                    <p className="text-muted-foreground">Nous gérons tous les types de déménagements résidentiels avec des solutions adaptées à l'urbanisme de la ville.</p>
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
            <section id="faq-val-de-reuil" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Val-de-Reuil</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Val-de-Reuil.</p>
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
            <section id="contact-val-de-reuil" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Val-de-Reuil</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Val-de-Reuil</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
