
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Ship, Users, Building, Truck, Factory } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Girard", text: "Notre déménagement à Louviers a été une totale réussite. L'équipe connaît bien le secteur et a géré les accès du centre-ville sans problème. Très pro !", rating: 5, createTime: "il y a 2 mois", avatarUrl: `https://i.pravatar.cc/48?u=Girard27` },
    { id: "fallback-2", name: "Marc D.", text: "Très bonne expérience pour mon appartement. Devis clair et équipe ponctuelle. Un déménagement réalisé sans stress.", rating: 5, createTime: "il y a 7 mois", avatarUrl: `https://i.pravatar.cc/48?u=MarcD27` },
    { id: "fallback-3", name: "Entreprise Inov'Plast", text: "Le transfert de notre atelier a été mené avec efficacité. Une équipe sérieuse et fiable que je recommande pour les déménagements d'entreprise dans l'Eure.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=InovPlast27` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Louviers",
        description: "Du centre historique aux zones d'activités, nous connaissons les accès et spécificités de la ville et de son agglomération."
    },
    {
        icon: <Factory className="h-8 w-8 text-primary"/>,
        title: "Déménagement d'Entreprises",
        description: "Nous avons une grande expérience dans le transfert de bureaux et d'ateliers, nombreux dans le bassin industriel de Louviers."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Logistique sur mesure",
        description: "Nous utilisons des véhicules de tailles variées et gérons les autorisations de stationnement pour une intervention sans faille."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "La Proximité de l'Agence d'Évreux",
        description: "Notre base locale nous permet d'être réactifs et compétitifs pour tous vos projets à Louviers et dans ses environs."
    }
];

const faqItems = [
    {
        question: "Comment se passe un déménagement dans le centre-ville de Louviers ?",
        answer: "Le centre de Louviers a beaucoup de charme mais peut présenter des défis d'accès. Nous effectuons une analyse en amont pour choisir le véhicule le plus adapté. Nous nous chargeons également de la réservation de stationnement auprès de la mairie pour garantir une place et une intervention efficace."
    },
    {
        question: "Assurez-vous les déménagements longue distance depuis Louviers ?",
        answer: "Oui, notre agence d'Évreux nous sert de base pour toute la Normandie, mais notre expertise est nationale. Que vous quittiez Louviers pour une autre région ou que vous y arriviez, nous gérons votre déménagement de A à Z avec la même rigueur."
    },
    {
        question: "Je déménage dans un pavillon avec un accès étroit, comment faites-vous ?",
        answer: "C'est une situation courante. Nous disposons de plusieurs tailles de véhicules. Si l'accès est vraiment trop difficile pour le camion principal, nous pouvons organiser un transbordement avec un véhicule plus petit pour les derniers mètres. La visite technique nous permet d'anticiper ce genre de besoin."
    },
    {
        question: "Quelles sont vos formules pour les petits budgets ?",
        answer: "Nous proposons des formules flexibles. Notre formule 'Économique' est une excellente solution pour maîtriser votre budget : vous vous chargez de l'emballage, et nos professionnels assurent la manutention lourde et le transport sécurisé de vos biens."
    }
];


export default function LouviersPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/louviers/1920/500"
                    alt="Vue sur l'église Notre-Dame de Louviers"
                    fill
                    className="object-cover"
                    data-ai-hint="Louviers church cityscape"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement à Louviers</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Louviers (27400)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte et locale pour votre projet à Louviers, ville dynamique de l'Eure.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-eure-27" className="hover:text-primary">Eure (27)</Link>
                <span className="mx-2">&gt;</span>
                <span>Louviers</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui connaît le dynamisme de Louviers</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Louviers, c'est choisir une ville au riche passé industriel qui a su se réinventer. Au cœur de l'Eure, son centre-ville de caractère et ses zones d'activités importantes demandent une approche logistique précise et polyvalente.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Avec notre agence d'Évreux à proximité, Déménagement du Vexin est votre expert local pour ce secteur. Que vous emménagiez dans une maison de ville, un appartement moderne ou que vous transfériez votre entreprise, nous vous garantissons un déménagement serein et parfaitement orchestré.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/louviers-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Louviers"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team normandy town"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-louviers" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Louviers</h2>
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
                            src="https://picsum.photos/seed/louviers-packing/600/400"
                            alt="Déménageur emballant avec soin du matériel professionnel"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing business"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux particuliers et entreprises</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'entreprises et d'ateliers</h4>
                                    <p className="text-muted-foreground">Une expertise particulière pour le transfert de matériel professionnel et de bureaux.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement de maisons et appartements</h4>
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
            <section id="faq-louviers" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Louviers</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Louviers.</p>
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
            <section id="contact-louviers" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Louviers</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Louviers</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
