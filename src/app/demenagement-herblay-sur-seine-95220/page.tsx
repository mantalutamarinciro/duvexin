
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Home, Users, Building, Truck, Waves } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Gaudin", text: "Notre déménagement à Herblay s'est déroulé à merveille. L'équipe a été très professionnelle et a su s'adapter aux accès des quais de Seine. Un service de grande qualité.", rating: 5, createTime: "il y a 4 mois", avatarUrl: `https://i.pravatar.cc/48?u=Gaudin95` },
    { id: "fallback-2", name: "Antoine C.", text: "Très bonne expérience pour mon appartement. Devis clair, équipe ponctuelle et matériel de qualité. Déménager à Herblay a été bien plus simple que je l'imaginais.", rating: 5, createTime: "il y a 9 mois", avatarUrl: `https://i.pravatar.cc/48?u=AntoineC95` },
    { id: "fallback-3", name: "Mme. Rousseau", text: "Efficacité et bonne humeur. Je recommande Déménagement du Vexin pour tout projet à Herblay-sur-Seine. Des vrais pros !", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Rousseau95` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise d'Herblay",
        description: "Des quais de Seine aux zones pavillonnaires, nous connaissons les accès et spécificités de chaque quartier de la ville."
    },
    {
        icon: <Waves className="h-8 w-8 text-primary"/>,
        title: "Spécialiste Bords de Seine",
        description: "Nous avons l'habitude de gérer les déménagements le long des quais, avec des solutions adaptées aux contraintes de circulation et de stationnement."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Logistique Adaptée",
        description: "Nous gérons les autorisations et utilisons des véhicules adaptés, que ce soit pour le centre-ville ou les zones résidentielles."
    },
    {
        icon: <Users className="h-8 w-8 text-primary"/>,
        title: "Équipes fiables et soignées",
        description: "Nos déménageurs salariés sont formés pour travailler avec soin et efficacité, en respectant vos biens et votre voisinage."
    }
];

const faqItems = [
    {
        question: "Comment se passe un déménagement sur les quais de Seine à Herblay ?",
        answer: "C'est une zone que nous connaissons bien. La planification est essentielle : nous évaluons les accès, souvent via une visite technique. Nous nous chargeons de la demande d'autorisation de stationnement pour garantir l'emplacement nécessaire et planifions l'intervention pour minimiser l'impact sur la circulation locale."
    },
    {
        question: "Déménagez-vous les maisons avec des accès compliqués ?",
        answer: "Oui, c'est une situation fréquente dans les zones pavillonnaires d'Herblay. Nous disposons de véhicules de différentes tailles et nos équipes sont expertes en manutention, même lorsque la distance de portage est importante. Nous protégeons systématiquement les accès et les jardins."
    },
    {
        question: "Quelles sont vos formules pour un petit appartement à Herblay-sur-Seine ?",
        answer: "Nous avons des formules pour tous les besoins. Notre formule Économique est parfaite pour les petits volumes et les budgets maîtrisés : vous vous chargez de l'emballage, et nos professionnels assurent la manutention et le transport sécurisé. C'est une solution idéale pour les jeunes actifs."
    },
    {
        question: "Comment sont protégés mes meubles pendant le déménagement ?",
        answer: "La protection de vos biens est notre priorité. Tous vos meubles sont emballés sous des couvertures de protection épaisses. Les éléments plus fragiles (matelas, canapés) sont mis sous housses. Nous utilisons également du film à bulles et des cartons spéciaux pour la vaisselle ou les objets de valeur."
    }
];


export default function HerblaySurSeinePage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/herblay/1920/500"
                    alt="Vue sur les bords de Seine à Herblay-sur-Seine"
                    fill
                    className="object-cover"
                    data-ai-hint="herblay sur seine cityscape"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement à Herblay</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Herblay-sur-Seine</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte et locale pour votre projet à Herblay-sur-Seine (95220).</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-val-d-oise-95" className="hover:text-primary">Val-d'Oise (95)</Link>
                <span className="mx-2">&gt;</span>
                <span>Herblay-sur-Seine</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui connaît le cadre de vie d'Herblay</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Herblay-sur-Seine, c'est choisir un cadre de vie prisé, alliant le charme des bords de Seine à un dynamisme économique et commercial. Cette situation attractive demande une logistique de déménagement flexible et une excellente connaissance du terrain.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous sommes fiers de notre expertise locale. Que vous emménagiez dans un appartement en centre-ville, un pavillon sur les hauteurs ou que vous transfériez votre entreprise, nous vous garantissons un déménagement serein, efficace et parfaitement adapté à votre nouvelle adresse.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/herblay-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Herblay-sur-Seine"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team seine riverside"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-herblay" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Herblay</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Notre expertise locale est votre meilleur atout pour un déménagement réussi.</p>
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
                            src="https://picsum.photos/seed/herblay-packing/600/400"
                            alt="Déménageur emballant avec soin des objets fragiles à Herblay"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux particuliers et professionnels d'Herblay</h2>
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
            <section id="faq-herblay" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Herblay</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Herblay-sur-Seine.</p>
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
            <section id="contact-herblay" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Herblay-sur-Seine</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Herblay</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
