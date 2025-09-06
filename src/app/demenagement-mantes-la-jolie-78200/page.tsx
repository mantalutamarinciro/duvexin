
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Ship, Users, Building, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Dubois", text: "Très bonne expérience pour notre déménagement à Mantes-la-Jolie. L'équipe a été efficace, ponctuelle et très professionnelle. Nous recommandons vivement.", rating: 5, createTime: "il y a 5 mois", avatarUrl: `https://i.pravatar.cc/48?u=Dubois78` },
    { id: "fallback-2", name: "Sophie G.", text: "Un service client parfait et une équipe de déménageurs au top pour mon appartement. Ils ont su gérer les accès du centre-ville sans problème.", rating: 5, createTime: "il y a 9 mois", avatarUrl: `https://i.pravatar.cc/48?u=SophieG78` },
    { id: "fallback-3", name: "Entreprise Mantois BTP", text: "Le transfert de nos bureaux a été rapide et bien organisé. Une équipe sérieuse sur qui on peut compter.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=MantoisBTP` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise du Mantois",
        description: "Du centre-ville historique aux nouveaux quartiers, nous connaissons les accès et les spécificités de Mantes-la-Jolie et ses alentours."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Maîtrise des axes routiers",
        description: "Nous planifions nos interventions en tenant compte de la proximité de l'A13 pour une logistique et une ponctualité optimales."
    },
    {
        icon: <Building className="h-8 w-8 text-primary"/>,
        title: "Solutions pour tous les logements",
        description: "Que vous soyez en appartement en centre-ville ou dans un pavillon en périphérie, nous avons le matériel et l'équipe adaptés."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité administrative",
        description: "Nous nous occupons des demandes d'autorisation de stationnement auprès de la mairie, une démarche clé pour un déménagement sans stress."
    }
];

const faqItems = [
    {
        question: "Comment se passe un déménagement dans le centre-ville de Mantes-la-Jolie ?",
        answer: "Le centre de Mantes peut présenter des défis d'accès. Nous effectuons systématiquement une analyse en amont, souvent via une visite technique, pour choisir le véhicule le plus adapté. La réservation de stationnement, que nous gérons, est cruciale pour garantir une place et une intervention efficace."
    },
    {
        question: "Déménagez-vous aussi des entreprises dans la zone d'activités ?",
        answer: "Oui, nous avons une offre B2B dédiée. Mantes-la-Jolie est un pôle économique important, et nous sommes habitués à réaliser des transferts de bureaux. Nous planifions l'opération avec vous pour assurer une transition rapide et limiter au maximum l'interruption de votre activité."
    },
    {
        question: "Quelles solutions proposez-vous pour les déménagements longue distance depuis ou vers Mantes-la-Jolie ?",
        answer: "Nous assurons des déménagements sur toutes les distances en France. Pour les longues distances, nous organisons des tournées groupées ou des voyages spéciaux selon vos contraintes, pour vous offrir un tarif compétitif et un service de haute qualité."
    },
    {
        question: "Comment sont protégés mes meubles les plus fragiles ?",
        answer: "La protection de vos biens est notre priorité. Nous utilisons des couvertures de protection épaisses, des housses spéciales pour la literie et les canapés, et du film à bulles ou des cartons renforcés pour les objets les plus délicats comme la vaisselle, les cadres ou les miroirs."
    }
];


export default function MantesLaJoliePage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/mantes-la-jolie/1920/500"
                    alt="Vue sur la Collégiale Notre-Dame de Mantes-la-Jolie"
                    fill
                    className="object-cover"
                    data-ai-hint="mantes la jolie church"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement à Mantes-la-Jolie</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Mantes-la-Jolie</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte et locale pour votre déménagement au cœur du Mantois (78200).</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-yvelines-78" className="hover:text-primary">Yvelines (78)</Link>
                <span className="mx-2">&gt;</span>
                <span>Mantes-la-Jolie</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui connaît les atouts de Mantes-la-Jolie</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Mantes-la-Jolie, c'est choisir une ville au riche passé historique, aujourd'hui un pôle économique majeur de l'ouest francilien. Cette situation demande une approche logistique qui allie connaissance du centre ancien et efficacité dans les quartiers plus modernes.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous sommes fiers de notre expertise locale. Que vous emménagiez dans un appartement en centre-ville, un pavillon ou que vous transfériez votre entreprise, nous vous garantissons un déménagement serein, efficace et parfaitement adapté à votre nouvelle adresse.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/mantes-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Mantes-la-Jolie"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team city center"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-mantes" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Mantes-la-Jolie</h2>
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
                            src="https://picsum.photos/seed/mantes-packing/600/400"
                            alt="Déménageur emballant avec soin des objets fragiles à Mantes-la-Jolie"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing city"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux particuliers et professionnels du Mantois</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'appartements</h4>
                                    <p className="text-muted-foreground">Solutions avec monte-meubles pour les étages élevés et protection soignée de vos biens.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement de maisons et pavillons</h4>
                                    <p className="text-muted-foreground">Nous gérons les déménagements de maisons avec jardin et accès spécifiques.</p>
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
            <section id="faq-mantes" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Mantes</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Mantes-la-Jolie.</p>
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
            <section id="contact-mantes" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Mantes-la-Jolie</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Mantes-la-Jolie</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
