
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Home, Users, Building, Truck, Palette } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Le Gall", text: "Déménagement dans le centre de Honfleur parfaitement géré. L'équipe a été très professionnelle et a su s'adapter aux rues étroites et à l'affluence.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=LeGall14` },
    { id: "fallback-2", name: "Marc D.", text: "Très bonne expérience. Devis clair et service impeccable. Un déménagement sans stress dans cette ville magnifique. Merci !", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=MarcD14H` },
    { id: "fallback-3", name: "Galerie du Port", text: "Le transport de nos œuvres a été mené avec un soin et une rigueur exemplaires. Une équipe de confiance.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Galerie14` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Honfleur",
        description: "Du Vieux Bassin aux hauteurs de la Côte de Grâce, nous connaissons les accès et spécificités de la ville pour une logistique sans faille."
    },
    {
        icon: <Palette className="h-8 w-8 text-primary"/>,
        title: "Respect du Patrimoine",
        description: "Nous intervenons avec un soin particulier dans le secteur sauvegardé, en protégeant les lieux et vos biens les plus précieux."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Logistique Adaptée",
        description: "Nous utilisons des véhicules de tailles variées et des monte-meubles pour nous adapter aux rues pittoresques du centre historique."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "La Proximité de l'Agence d'Évreux",
        description: "Notre base locale nous permet d'être réactifs et compétitifs pour tous vos projets à Honfleur et sur la Côte Fleurie."
    }
];

const faqItems = [
    {
        question: "Comment se passe un déménagement dans le centre historique de Honfleur ?",
        answer: "Le centre de Honfleur, avec ses rues pavées et ses bâtiments classés, demande une planification experte. Nous effectuons systématiquement une visite technique pour choisir le véhicule le plus adapté et planifier les accès. Nous nous chargeons de la réservation de stationnement, indispensable dans ce secteur très fréquenté."
    },
    {
        question: "Assurez-vous les déménagements sur la Côte Fleurie, de Honfleur à Deauville ?",
        answer: "Oui, Honfleur est notre porte d'entrée sur la Côte Fleurie. Nous couvrons l'ensemble du littoral, de Deauville-Trouville à Cabourg. Notre connaissance de la région et de ses contraintes saisonnières est un atout majeur."
    },
    {
        question: "Je déménage des objets d'art, comment faites-vous ?",
        answer: "C'est une situation fréquente à Honfleur, cité des peintres. Nous disposons d'emballages spécifiques (caisses pour tableaux, etc.) et nos équipes sont formées à la manipulation d'objets fragiles et de valeur. La sécurité de votre patrimoine est notre priorité."
    },
    {
        question: "Quelles sont vos formules pour les petits appartements ou résidences secondaires ?",
        answer: "Nous proposons des formules flexibles. Notre formule 'Économique' est une excellente solution pour maîtriser votre budget : vous vous chargez de l'emballage, et nos professionnels assurent la manutention lourde et le transport sécurisé de vos biens."
    }
];


export default function HonfleurPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/honfleur/1920/500"
                    alt="Le Vieux Bassin de Honfleur"
                    fill
                    className="object-cover"
                    data-ai-hint="Honfleur old harbor"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement à Honfleur</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Honfleur (14600)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte pour votre projet dans la cité des peintres.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-calvados-14" className="hover:text-primary">Calvados (14)</Link>
                <span className="mx-2">&gt;</span>
                <span>Honfleur</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui connaît le joyau de l'estuaire</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Honfleur, c'est s'installer dans une ville au charme intemporel, qui a inspiré des générations d'artistes. Son port pittoresque, ses ruelles et ses maisons à colombages exigent une approche du déménagement qui allie respect du patrimoine et logistique précise.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Grâce à notre agence d'Évreux, nous sommes votre expert local pour Honfleur. Que vous emménagiez dans le centre historique ou sur les hauteurs, nous vous garantissons un déménagement serein et parfaitement orchestré, à la hauteur du cadre.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/honfleur-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Honfleur"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team historic harbor"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-honfleur" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Honfleur</h2>
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
                            src="https://picsum.photos/seed/honfleur-packing/600/400"
                            alt="Déménageur emballant avec soin une peinture"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing painting"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux habitants de Honfleur</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement de maisons et appartements</h4>
                                    <p className="text-muted-foreground">Une expertise particulière pour les déménagements en centre-ville historique et dans les maisons de caractère.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement de galeries d'art et commerces</h4>
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
            <section id="faq-honfleur" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Honfleur</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Honfleur.</p>
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
            <section id="contact-honfleur" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Honfleur</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Honfleur</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
