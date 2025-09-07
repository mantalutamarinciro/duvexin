
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Home, Users, Building, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Roger", text: "Notre déménagement à Cormeilles s'est très bien passé. L'équipe a su gérer les accès en pente de notre rue avec un grand professionnalisme. Service impeccable.", rating: 5, createTime: "il y a 2 mois", avatarUrl: `https://i.pravatar.cc/48?u=Roger95` },
    { id: "fallback-2", name: "Julien M.", text: "Très bonne expérience pour mon appartement. Devis clair et équipe ponctuelle et efficace. Je recommande cette entreprise sérieuse.", rating: 5, createTime: "il y a 6 mois", avatarUrl: `https://i.pravatar.cc/48?u=JulienM95C` },
    { id: "fallback-3", name: "Mme. Vincent", text: "Efficacité, soin et bonne humeur. Un déménagement sans stress, je ferai de nouveau appel à eux sans hésiter.", rating: 5, createTime: "il y a 11 mois", avatarUrl: `https://i.pravatar.cc/48?u=Vincent95C` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Cormeilles",
        description: "Des bords de Seine aux hauteurs des buttes du Parisis, nous connaissons les accès et spécificités de chaque quartier de la ville."
    },
    {
        icon: <Home className="h-8 w-8 text-primary"/>,
        title: "Spécialiste du Pavillonnaire",
        description: "Nous avons l'expérience des déménagements de maisons avec des accès parfois en pente ou étroits, fréquents à Cormeilles."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Logistique Adaptée",
        description: "Nous utilisons des véhicules de tailles variées et des monte-meubles pour nous adapter à toutes les configurations."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité Administrative",
        description: "Nous gérons pour vous les demandes d'autorisation de stationnement, une démarche clé pour déménager sereinement."
    }
];

const faqItems = [
    {
        question: "Comment se passe un déménagement sur les buttes du Parisis ?",
        answer: "C'est une zone que nous connaissons bien, avec ses rues parfois pentues. Une visite technique est souvent utile pour évaluer les accès. Nos équipes sont formées pour travailler en toute sécurité dans ces conditions et nous choisissons le véhicule le plus adapté pour l'intervention."
    },
    {
        question: "Est-ce difficile d'obtenir une autorisation de stationnement à Cormeilles-en-Parisis ?",
        answer: "Comme dans beaucoup de communes de la région, cela demande de l'anticipation. Nous nous en chargeons pour vous. Nous avons l'habitude des démarches auprès des services de la mairie et nous nous assurons d'avoir les autorisations à temps pour le jour J."
    },
    {
        question: "Proposez-vous des formules pour les petits appartements ?",
        answer: "Oui, nous avons des formules flexibles pour tous les volumes. Notre formule Économique est une excellente solution pour maîtriser son budget : vous vous chargez de l'emballage, et nos professionnels assurent la manutention et le transport."
    },
    {
        question: "Comment protégez-vous les meubles fragiles ?",
        answer: "La protection de vos biens est notre priorité. Nous utilisons des couvertures épaisses, des housses spécifiques pour matelas et canapés, et du matériel d'emballage professionnel (cartons renforcés, film à bulles) pour tous les objets fragiles."
    }
];


export default function CormeillesEnParisisPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/cormeilles/1920/500"
                    alt="Vue sur la ville de Cormeilles-en-Parisis"
                    fill
                    className="object-cover"
                    data-ai-hint="cormeilles en parisis cityscape"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Cormeilles-en-Parisis</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte et locale pour votre projet à Cormeilles-en-Parisis (95240).</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-val-d-oise-95" className="hover:text-primary">Val-d'Oise (95)</Link>
                <span className="mx-2">&gt;</span>
                <span>Cormeilles-en-Parisis</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui connaît les reliefs de Cormeilles-en-Parisis</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Cormeilles-en-Parisis, c'est s'installer dans une ville au cadre de vie agréable, marquée par les buttes du Parisis. Cette topographie unique, avec ses rues parfois en pente et ses quartiers pavillonnaires, demande une expertise logistique que nous maîtrisons.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous sommes fiers de notre connaissance de Cormeilles. Que vous emménagiez dans une maison sur les hauteurs ou un appartement en centre-ville, nous vous garantissons un déménagement serein, sécurisé et parfaitement adapté.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/cormeilles-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Cormeilles-en-Parisis"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team suburban hill"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-cormeilles" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Cormeilles</h2>
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
                            src="https://picsum.photos/seed/cormeilles-packing/600/400"
                            alt="Déménageur emballant avec soin des objets fragiles"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux habitants de Cormeilles</h2>
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
                                    <p className="text-muted-foreground">Nous gérons les contraintes liées aux étages et aux accès en immeuble, avec des solutions de monte-meubles si nécessaire.</p>
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
            <section id="faq-cormeilles" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Cormeilles</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Cormeilles-en-Parisis.</p>
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
            <section id="contact-cormeilles" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Cormeilles-en-Parisis</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Cormeilles-en-Parisis</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
