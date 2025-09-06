
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Ship, Users, Building, Truck, Car } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Martin", text: "Déménagement de notre maison à Poissy parfaitement géré. L'équipe a été efficace et très soigneuse. Une prestation de grande qualité, nous recommandons.", rating: 5, createTime: "il y a 4 mois", avatarUrl: `https://i.pravatar.cc/48?u=Martin78` },
    { id: "fallback-2", name: "Thomas R.", text: "Très bonne expérience pour mon appartement près du centre. Devis clair et équipe ponctuelle. Le déménagement s'est fait sans aucun stress.", rating: 5, createTime: "il y a 9 mois", avatarUrl: `https://i.pravatar.cc/48?u=ThomasR78` },
    { id: "fallback-3", name: "Claire V.", text: "Je recommande Déménagement du Vexin pour leur professionnalisme. Tout a été simple du début à la fin.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=ClaireV78` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Poissy",
        description: "Du centre ancien aux quartiers résidentiels comme Beauregard, nous connaissons les accès et les spécificités de Poissy."
    },
    {
        icon: <Car className="h-8 w-8 text-primary"/>,
        title: "Logistique Efficace",
        description: "Nous maîtrisons les accès via les grands axes (A13, A14) pour une ponctualité et une organisation sans faille de votre déménagement."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Solutions sur Mesure",
        description: "Que vous soyez en appartement ou en pavillon, nous adaptons nos véhicules et nos équipes à la configuration de votre logement."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité Administrative",
        description: "Nous gérons pour vous les demandes d'autorisation de stationnement, une démarche importante pour déménager sereinement à Poissy."
    }
];

const faqItems = [
    {
        question: "Comment se passe un déménagement dans le centre-ville de Poissy ?",
        answer: "Le centre de Poissy a des rues qui peuvent être étroites. Nous effectuons une analyse en amont pour choisir le véhicule le plus adapté. La réservation de stationnement, que nous gérons pour vous, est essentielle pour garantir une place pour notre camion et minimiser l'impact sur la circulation."
    },
    {
        question: "Déménagez-vous également des entreprises à Poissy ?",
        answer: "Oui, nous avons une offre spécifique pour les professionnels. Poissy étant un pôle économique, nous sommes habitués à réaliser des transferts de bureaux. Nous planifions l'opération avec vous pour assurer une transition rapide et limiter l'interruption de votre activité."
    },
    {
        question: "Quelles solutions proposez-vous pour les déménagements longue distance depuis ou vers Poissy ?",
        answer: "Nous assurons des déménagements sur toutes les distances en France et en Europe. Pour les longues distances, nous organisons des tournées optimisées pour vous offrir un tarif compétitif et un service de qualité, avec le même niveau de soin que pour un déménagement local."
    },
    {
        question: "Comment sont protégés mes meubles fragiles ?",
        answer: "La protection de vos biens est notre priorité absolue. Nous utilisons des couvertures de protection épaisses, des housses spéciales pour la literie et les canapés, et du film à bulles ou des cartons renforcés pour les objets les plus fragiles comme la vaisselle, les cadres ou les miroirs."
    }
];


export default function PoissyPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/poissy/1920/500"
                    alt="Vue sur la Collégiale Notre-Dame de Poissy"
                    fill
                    className="object-cover"
                    data-ai-hint="poissy church cityscape"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement à Poissy</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Poissy (78300)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte et locale pour votre déménagement à Poissy, ville d'histoire et de dynamisme.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-yvelines-78" className="hover:text-primary">Yvelines (78)</Link>
                <span className="mx-2">&gt;</span>
                <span>Poissy</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui connaît les atouts de Poissy</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Poissy, c'est choisir une ville qui allie un riche patrimoine historique, un dynamisme économique et un cadre de vie agréable en bord de Seine. Cette diversité demande une approche logistique flexible et une bonne connaissance du terrain.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous sommes fiers de notre expertise locale. Que vous emménagiez dans le centre historique, un quartier pavillonnaire ou une résidence moderne, nous vous garantissons un déménagement serein, efficace et parfaitement adapté à votre nouvelle adresse.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/poissy-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Poissy"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team historic city"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-poissy" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Poissy</h2>
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
                            src="https://picsum.photos/seed/poissy-packing/600/400"
                            alt="Déménageur emballant avec soin des objets fragiles à Poissy"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing boxes"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux particuliers et professionnels de Poissy</h2>
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
            <section id="faq-poissy" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Poissy</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Poissy.</p>
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
            <section id="contact-poissy" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Poissy</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Poissy</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
