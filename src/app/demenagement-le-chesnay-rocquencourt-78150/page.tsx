
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Home, Users, Building, Truck, Hospital } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Richard", text: "Déménagement très bien géré au Chesnay. L'équipe a été très professionnelle et soigneuse, notamment pour l'accès à notre résidence. Nous sommes très satisfaits.", rating: 5, createTime: "il y a 5 mois", avatarUrl: `https://i.pravatar.cc/48?u=Richard78` },
    { id: "fallback-2", name: "Dr. Aline L.", text: "Service impeccable pour mon installation près de l'hôpital Mignot. Ponctualité, efficacité et bonne humeur. Je recommande sans hésiter.", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=AlineL78` },
    { id: "fallback-3", name: "M. Petit", text: "Une équipe au top pour mon déménagement à Rocquencourt. Le devis était clair et le service irréprochable.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=PetitLCR` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de la commune",
        description: "Nous connaissons les quartiers du Chesnay et de Rocquencourt, des résidences de Parly 2 aux zones pavillonnaires."
    },
    {
        icon: <Hospital className="h-8 w-8 text-primary"/>,
        title: "Proximité des grands centres",
        description: "Notre logistique est optimisée pour les accès près du centre commercial Westfield Parly 2 et de l'Hôpital Mignot."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Solutions pour tous les accès",
        description: "Que vous soyez en appartement ou en maison, nous avons les véhicules et le matériel adaptés à la configuration des lieux."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Gestion administrative",
        description: "Nous gérons les demandes d'autorisation de stationnement, une démarche importante pour déménager sereinement dans la commune."
    }
];

const faqItems = [
    {
        question: "Comment se déroule un déménagement dans une grande résidence comme Parly 2 ?",
        answer: "Nous avons une grande expérience de ce type de résidence. Nous planifions l'intervention en amont, en prenant contact avec le syndic si nécessaire pour connaître les règles (horaires, réservation d'ascenseur, etc.). Notre objectif est d'être aussi efficaces et discrets que possible pour respecter le voisinage."
    },
    {
        question: "Déménagez-vous les maisons avec des accès compliqués ?",
        answer: "Oui, c'est une situation fréquente dans les zones pavillonnaires du Chesnay-Rocquencourt. Une visite technique nous permet d'évaluer la meilleure approche. Nous disposons de véhicules de différentes tailles pour nous adapter aux rues plus étroites et nos équipes sont formées à la manutention soignée."
    },
    {
        question: "Quels sont vos délais d'intervention ?",
        answer: "Grâce à notre forte présence dans les Yvelines, nous sommes très réactifs. Il est préférable de nous contacter 3 à 4 semaines à l'avance pour une planification optimale, mais nous nous efforçons toujours de trouver une solution pour des besoins plus urgents."
    },
    {
        question: "Comment protégez-vous les meubles fragiles ?",
        answer: "La protection de vos biens est notre priorité. Nous utilisons des couvertures épaisses, des housses spécifiques pour matelas et canapés, et du film à bulles ou des cartons renforcés pour les objets les plus délicats (vaisselle, cadres, miroirs...)."
    }
];


export default function LeChesnayRocquencourtPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/le-chesnay/1920/500"
                    alt="Vue sur la ville du Chesnay-Rocquencourt"
                    fill
                    className="object-cover"
                    data-ai-hint="Le Chesnay-Rocquencourt cityscape"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Spécialiste de votre déménagement</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Le Chesnay-Rocquencourt</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte et locale pour votre projet au Chesnay-Rocquencourt (78150).</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-yvelines-78" className="hover:text-primary">Yvelines (78)</Link>
                <span className="mx-2">&gt;</span>
                <span>Le Chesnay-Rocquencourt</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui connaît les atouts du Chesnay-Rocquencourt</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager au Chesnay-Rocquencourt, c'est choisir une ville prisée des Yvelines, réputée pour son cadre de vie verdoyant, sa proximité avec Versailles et ses quartiers résidentiels de qualité. Cette configuration demande une approche logistique rigoureuse.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous sommes fiers de notre expertise locale. Que vous emménagiez dans une résidence, un appartement ou un pavillon, nous vous garantissons un déménagement serein, efficace et parfaitement adapté à votre nouvelle adresse.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/le-chesnay-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention au Chesnay-Rocquencourt"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team suburban residential"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-le-chesnay" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager au Chesnay-Rocquencourt</h2>
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
                            src="https://picsum.photos/seed/le-chesnay-packing/600/400"
                            alt="Déménageur emballant avec soin des objets fragiles"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing boxes"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux particuliers et professionnels</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'appartements</h4>
                                    <p className="text-muted-foreground">Solutions avec monte-meubles pour les étages élevés et protection soignée de vos biens et des parties communes.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement de maisons et pavillons</h4>
                                    <p className="text-muted-foreground">Nous gérons les déménagements de maisons avec jardin et accès spécifiques, avec le plus grand soin.</p>
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
            <section id="faq-le-chesnay" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Le Chesnay-Rocquencourt</h2>
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
            <section id="contact-le-chesnay" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement au Chesnay-Rocquencourt</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Le Chesnay-Rocquencourt</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
