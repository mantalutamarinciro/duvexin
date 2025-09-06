
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Truck, Users, Building, Wifi } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Chevalier", text: "Déménagement de notre appartement à Issy-les-Moulineaux géré à la perfection. L'équipe a été très pro, rapide et a su s'adapter aux accès parfois compliqués. Je recommande vivement !", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Chevalier92` },
    { id: "fallback-2", name: "Agence MédiaCom", text: "Le transfert de nos bureaux a été une réussite. Une équipe discrète, efficace et qui a respecté notre planning à la minute près. Un vrai service professionnel.", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=MediaCom92` },
    { id: "fallback-3", name: "Sophie D.", text: "Très bonne expérience pour mon déménagement. De la prise de contact au jour J, tout a été fluide et sans stress. Merci à toute l'équipe !", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=SophieD92` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise d'Issy",
        description: "Des quais de Seine aux Forts d'Issy, nous connaissons les rues, les accès et les réglementations de stationnement pour une logistique parfaite."
    },
    {
        icon: <Wifi className="h-8 w-8 text-primary"/>,
        title: "Spécialiste des Pôles Média",
        description: "Nous avons l'expérience des transferts d'entreprises du secteur numérique et des médias, très présents à Issy-les-Moulineaux."
    },
    {
        icon: <Building className="h-8 w-8 text-primary"/>,
        title: "Gestion des immeubles modernes",
        description: "Nos équipes sont habituées aux contraintes des résidences neuves et des immeubles de grande hauteur, avec des solutions de monte-meubles si nécessaire."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité administrative",
        description: "Nous gérons pour vous les demandes d'autorisation de stationnement auprès de la mairie, une démarche essentielle à Issy."
    }
];

const faqItems = [
    {
        question: "Comment se déroule un déménagement dans les nouveaux quartiers comme les Forts d'Issy ?",
        answer: "Nous connaissons bien ces quartiers modernes. Nous planifions l'intervention en amont, en prenant si nécessaire contact avec le syndic pour connaître les règles d'emménagement (horaires, réservation d'ascenseur...). Notre objectif est d'assurer une intervention fluide qui respecte le règlement de votre nouvelle résidence."
    },
    {
        question: "Proposez-vous des services pour les entreprises à Issy-les-Moulineaux ?",
        answer: "Oui, c'est l'un de nos points forts. Issy-les-Moulineaux étant un pôle majeur pour les entreprises de médias et de technologie, nous avons développé une expertise dans le transfert de bureaux, de matériel informatique sensible et d'archives, en garantissant la confidentialité et la rapidité."
    },
    {
        question: "Est-il difficile de stationner un camion de déménagement à Issy ?",
        answer: "Comme dans beaucoup de villes de la petite couronne, cela peut être complexe. C'est pourquoi nous intégrons systématiquement la demande d'autorisation de stationnement à notre prestation. Nous nous assurons d'avoir un emplacement réservé pour le jour J, ce qui vous évite du stress et nous fait gagner en efficacité."
    },
    {
        question: "J'habite au dernier étage d'un immeuble, est-ce un problème ?",
        answer: "Absolument pas. Nos équipes sont entraînées pour le portage en étage. De plus, nous proposons des solutions avec monte-meubles, qui sont souvent idéales pour les étages élevés. Cela protège vos biens les plus lourds et les parties communes de l'immeuble. Nous évaluons la meilleure solution lors de notre visite technique."
    }
];


export default function IssyLesMoulineauxPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/issy/1920/500"
                    alt="Vue sur la ville d'Issy-les-Moulineaux"
                    fill
                    className="object-cover"
                    data-ai-hint="issy les moulineaux cityscape"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement à Issy</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Issy-les-Moulineaux</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte et sur-mesure pour votre déménagement à Issy-les-Moulineaux (92130).</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-hauts-de-seine-92" className="hover:text-primary">Hauts-de-Seine (92)</Link>
                <span className="mx-2">&gt;</span>
                <span>Issy-les-Moulineaux</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur expert pour la ville connectée d'Issy-les-Moulineaux</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Issy-les-Moulineaux, c'est s'installer au cœur d'un hub numérique et médiatique majeur, aux portes de Paris. Entre les sièges sociaux de grandes entreprises, les éco-quartiers modernes et les zones résidentielles, la ville présente une forte densité et des défis logistiques spécifiques.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous avons l'expertise nécessaire pour naviguer dans cet environnement urbain exigeant. Que vous soyez un professionnel transférant vos bureaux ou un particulier s'installant dans un appartement neuf, nous planifions chaque détail pour un déménagement fluide, rapide et sans stress.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/issy-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Issy-les-Moulineaux"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="modern urban moving team"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-issy" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Issy</h2>
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
                            src="https://picsum.photos/seed/issy-packing/600/400"
                            alt="Déménageur emballant du matériel informatique pour un transfert de bureau"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover packing computer"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux spécificités d'Issy-les-Moulineaux</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'appartements</h4>
                                    <p className="text-muted-foreground">Solutions sur-mesure pour les appartements de toutes tailles, des résidences neuves aux immeubles plus anciens.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Transfert de bureaux et d'entreprises</h4>
                                    <p className="text-muted-foreground">Un service efficace et discret, planifié pour minimiser l'impact sur votre activité professionnelle.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Formules personnalisées</h4>
                                    <p className="text-muted-foreground">De la prestation économique à la formule tout confort, nous nous adaptons à vos besoins précis.</p>
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
            <section id="faq-issy" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Issy</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Issy-les-Moulineaux.</p>
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
            <section id="contact-issy" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Planifiez votre déménagement à Issy-les-Moulineaux</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Issy-les-Moulineaux</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
