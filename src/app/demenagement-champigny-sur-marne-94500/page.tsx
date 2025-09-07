
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Truck, Users, Building, Waves } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Lecomte", text: "Déménagement de notre maison à Champigny, au bord de la Marne. L'équipe a été super, très pro et a pris grand soin de nos affaires. Un service au top.", rating: 5, createTime: "il y a 5 mois", avatarUrl: `https://i.pravatar.cc/48?u=Lecomte94` },
    { id: "fallback-2", name: "Patrick G.", text: "Très bonne expérience pour mon appartement. Devis clair et équipe ponctuelle et efficace. Le déménagement s'est fait sans aucun stress, je recommande.", rating: 5, createTime: "il y a 9 mois", avatarUrl: `https://i.pravatar.cc/48?u=PatrickG94` },
    { id: "fallback-3", name: "Société BâtiPro", text: "Le transfert de nos bureaux a été mené avec rigueur et efficacité. Une équipe professionnelle sur qui on peut compter pour un déménagement sans accroc.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=BatiPro94` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Champigny",
        description: "Du Plant au Maroc, en passant par le Tremblay, nous connaissons les rues, les accès et les réglementations de chaque quartier de la ville."
    },
    {
        icon: <Waves className="h-8 w-8 text-primary"/>,
        title: "Spécialiste Bords de Marne",
        description: "Nous avons l'habitude de gérer les déménagements dans les quartiers pavillonnaires et les résidences qui longent la Marne."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Logistique et Monte-Meubles",
        description: "Nous gérons les autorisations et déployons des solutions de levage pour un service efficace et sécurisé en toutes circonstances."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité administrative",
        description: "Nous gérons pour vous les demandes d'autorisation de stationnement, une démarche clé pour déménager sereinement à Champigny."
    }
];

const faqItems = [
    {
        question: "Comment se déroule un déménagement dans un pavillon des bords de Marne ?",
        answer: "Nous connaissons bien ces quartiers recherchés. Nous effectuons une visite technique pour évaluer les accès et protéger au mieux votre propriété. Nos équipes sont équipées pour la manutention de mobilier dans les jardins et nous utilisons des véhicules adaptés pour les rues résidentielles."
    },
    {
        question: "Intervenez-vous dans les appartements des grands ensembles de Champigny ?",
        answer: "Oui, absolument. Nous avons une grande expérience des déménagements en immeuble. Nous planifions l'intervention en amont, nous nous renseignons sur les règles de la copropriété et nous pouvons utiliser un monte-meubles si c'est la solution la plus efficace et la plus sûre."
    },
    {
        question: "Déménagez-vous aussi des entreprises à Champigny-sur-Marne ?",
        answer: "Oui, nous avons une offre spécifique pour les professionnels. Que ce soit pour des bureaux, des commerces ou des ateliers, nous organisons le transfert de votre activité pour minimiser les interruptions et garantir une reprise rapide."
    },
    {
        question: "Quelles sont vos formules pour un petit budget ?",
        answer: "Nous proposons des formules flexibles. Notre formule 'Économique' est une excellente solution pour maîtriser votre budget : vous vous chargez de l'emballage et du déballage, et nos professionnels assurent la manutention lourde et le transport sécurisé de vos biens."
    }
];


export default function ChampignySurMarnePage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/champigny/1920/500"
                    alt="Vue sur les bords de Marne à Champigny-sur-Marne"
                    fill
                    className="object-cover"
                    data-ai-hint="champigny sur marne cityscape"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Spécialiste de votre déménagement à Champigny</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Champigny-sur-Marne</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution efficace et locale pour votre projet à Champigny-sur-Marne (94500).</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-val-de-marne-94" className="hover:text-primary">Val-de-Marne (94)</Link>
                <span className="mx-2">&gt;</span>
                <span>Champigny-sur-Marne</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur expert pour la ville de Champigny-sur-Marne</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Champigny-sur-Marne, c'est s'installer dans une ville dynamique, appréciée pour son cadre de vie agréable le long de la Marne. Son urbanisme varié, entre grands ensembles, centre-ville animé et quartiers pavillonnaires, demande une connaissance approfondie du terrain.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous maîtrisons ces spécificités. Que vous emménagiez dans un appartement ou une maison sur les bords de Marne, nous planifions chaque détail pour garantir un déménagement rapide, efficace et sans stress.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/champigny-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Champigny-sur-Marne"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team suburban riverside"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-champigny" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Champigny</h2>
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
                            src="https://picsum.photos/seed/champigny-packing/600/400"
                            alt="Déménageur emballant avec soin des objets pour un déménagement à Champigny"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing boxes"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux habitants de Champigny</h2>
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
            <section id="faq-champigny" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Champigny</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Champigny-sur-Marne.</p>
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
            <section id="contact-champigny" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Champigny-sur-Marne</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Champigny-sur-Marne</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
