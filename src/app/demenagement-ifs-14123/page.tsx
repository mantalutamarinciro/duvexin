
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Home, Users, Building, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Simon", text: "Déménagement de notre maison à Ifs parfaitement organisé. L'équipe a été très professionnelle et efficace. Un service de grande qualité.", rating: 5, createTime: "il y a 6 mois", avatarUrl: `https://i.pravatar.cc/48?u=Simon14` },
    { id: "fallback-2", name: "Marc D.", text: "Très bonne expérience pour mon appartement. Devis clair et service impeccable. Un déménagement sans stress, même avec un grand volume. Merci !", rating: 5, createTime: "il y a 10 mois", avatarUrl: `https://i.pravatar.cc/48?u=MarcD14I` },
    { id: "fallback-3", name: "Société Sud-Caen", text: "Le transfert de nos bureaux a été mené avec rigueur et efficacité. Une équipe qui connaît bien le secteur et ses accès.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=SudCaen14` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise d'Ifs",
        description: "Des quartiers résidentiels aux zones d'activités, nous connaissons les accès et spécificités de la ville pour une logistique sans faille."
    },
    {
        icon: <Building className="h-8 w-8 text-primary"/>,
        title: "Gestion des immeubles et pavillons",
        description: "Nos équipes sont habituées aux contraintes des résidences récentes et des zones pavillonnaires denses."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Logistique Adaptée",
        description: "Nous utilisons des véhicules de tailles variées et gérons les autorisations de stationnement pour une intervention efficace."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "La Proximité de l'Agence d'Évreux",
        description: "Notre base locale nous permet d'être réactifs et compétitifs pour tous vos projets à Ifs et dans l'agglomération caennaise."
    }
];

const faqItems = [
    {
        question: "Comment se déroule un déménagement dans un quartier résidentiel d'Ifs ?",
        answer: "Nous connaissons bien l'urbanisme d'Ifs. Nous planifions l'intervention pour garantir la fluidité, en choisissant des véhicules adaptés et en protégeant les abords de votre domicile. Nos équipes sont formées pour travailler avec soin et discrétion."
    },
    {
        question: "Déménagez-vous aussi les entreprises de la zone d'activités Object'Ifs Sud ?",
        answer: "Oui, nous avons une offre B2B dédiée. Nous réalisons des transferts de bureaux en planifiant l'opération avec vous pour assurer une transition rapide et limiter au maximum l'interruption de votre activité."
    },
    {
        question: "Quelles sont vos formules pour un petit appartement ?",
        answer: "Nous proposons des formules flexibles pour tous les volumes. Notre formule 'Économique' est une excellente solution pour maîtriser votre budget : vous vous chargez de l'emballage, et nos professionnels assurent la manutention et le transport."
    },
    {
        question: "Comment sont protégés mes meubles fragiles ?",
        answer: "La protection de vos biens est notre priorité. Nous utilisons des couvertures épaisses, des housses spécifiques pour matelas et canapés, et du matériel d'emballage professionnel pour tous les objets délicats."
    }
];


export default function IfsPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/ifs/1920/500"
                    alt="Vue sur la ville d'Ifs"
                    fill
                    className="object-cover"
                    data-ai-hint="Ifs cityscape suburb"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Ifs (14123)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte pour votre projet à Ifs, au sud de l'agglomération caennaise.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-calvados-14" className="hover:text-primary">Calvados (14)</Link>
                <span className="mx-2">&gt;</span>
                <span>Ifs</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui connaît la commune d'Ifs</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Ifs, ville dynamique et résidentielle au sud de Caen, demande une approche logistique rigoureuse. Son développement constant et sa proximité avec les grands axes en font un lieu de vie et de travail attractif.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Grâce à notre agence d'Évreux, nous sommes votre expert de proximité. Que vous emménagiez dans un appartement ou une maison, ou que vous transfériez votre entreprise, nous vous garantissons un déménagement serein et parfaitement orchestré.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/ifs-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Ifs"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team suburban town"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-ifs" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Ifs</h2>
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
                            src="https://picsum.photos/seed/ifs-packing/600/400"
                            alt="Déménageur emballant avec soin des objets fragiles"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing home"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux habitants d'Ifs</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'appartements et maisons</h4>
                                    <p className="text-muted-foreground">Une expertise particulière pour les déménagements en immeubles et dans les zones pavillonnaires.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'entreprises</h4>
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
            <section id="faq-ifs" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Ifs</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Ifs.</p>
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
            <section id="contact-ifs" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Ifs</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Ifs</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
