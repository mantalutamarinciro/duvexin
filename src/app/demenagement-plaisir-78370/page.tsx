
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, ShoppingCart, Users, Building, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Caron", text: "Déménagement de notre maison à Plaisir parfaitement géré. L'équipe a été efficace, très soigneuse et sympathique. Un grand merci !", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Caron78` },
    { id: "fallback-2", name: "Marc T.", text: "Très bonne expérience pour mon appartement. Devis clair et équipe ponctuelle. Le déménagement s'est fait sans aucun stress.", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=MarcTPL` },
    { id: "fallback-3", name: "Entreprise Innov", text: "Le transfert de nos bureaux dans la zone d'activité a été très bien organisé. Une équipe professionnelle sur qui on peut compter.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=InnovPL` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Plaisir",
        description: "Des quartiers résidentiels aux zones d'activités, nous connaissons les accès et les spécificités de Plaisir."
    },
    {
        icon: <ShoppingCart className="h-8 w-8 text-primary"/>,
        title: "Logistique efficace",
        description: "Nous maîtrisons les accès via les grands axes (N12, D11) et autour des grandes zones commerciales pour une ponctualité optimale."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Solutions sur Mesure",
        description: "Que vous soyez en appartement ou en pavillon, nous adaptons nos véhicules et nos équipes à la configuration de votre logement."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité Administrative",
        description: "Nous gérons pour vous les demandes d'autorisation de stationnement, une démarche importante pour déménager sereinement."
    }
];

const faqItems = [
    {
        question: "Comment se passe un déménagement dans un quartier pavillonnaire de Plaisir ?",
        answer: "Nous portons une attention particulière à la protection de votre propriété. Nous utilisons des véhicules de taille adaptée pour ne pas encombrer les rues résidentielles, et notre planification se fait en concertation avec vous pour minimiser toute gêne pour le voisinage."
    },
    {
        question: "Déménagez-vous également des entreprises dans les zones d'activités de Plaisir ?",
        answer: "Oui, nous avons une offre B2B dédiée. Plaisir est un pôle économique important des Yvelines et nous sommes habitués à réaliser des transferts de bureaux. Nous planifions l'opération avec vous pour assurer une transition rapide et limiter au maximum l'interruption de votre activité."
    },
    {
        question: "Quelles solutions proposez-vous pour les déménagements longue distance depuis ou vers Plaisir ?",
        answer: "Nous assurons des déménagements sur toutes les distances en France. Pour les longues distances, nous organisons des tournées optimisées pour vous offrir un tarif compétitif et un service de haute qualité, avec le même niveau de soin que pour un déménagement local."
    },
    {
        question: "Comment sont protégés mes meubles les plus fragiles ?",
        answer: "La protection de vos biens est notre priorité. Nous utilisons des couvertures de protection épaisses, des housses spéciales pour la literie et les canapés, et du film à bulles ou des cartons renforcés pour les objets les plus délicats comme la vaisselle, les cadres ou les miroirs."
    }
];


export default function PlaisirPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/plaisir/1920/500"
                    alt="Vue sur la ville de Plaisir"
                    fill
                    className="object-cover"
                    data-ai-hint="plaisir cityscape yvelines"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement à Plaisir</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Plaisir (78370)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte et locale pour votre déménagement à Plaisir, ville dynamique des Yvelines.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-yvelines-78" className="hover:text-primary">Yvelines (78)</Link>
                <span className="mx-2">&gt;</span>
                <span>Plaisir</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui connaît le dynamisme de Plaisir</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Plaisir, c'est choisir une ville attractive au cœur de Saint-Quentin-en-Yvelines, qui combine un cadre de vie agréable, de vastes zones commerciales et un important pôle d'activités. Cette diversité demande une approche logistique flexible.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous sommes fiers de notre expertise locale. Que vous emménagiez dans un pavillon, un appartement, ou que vous transfériez votre entreprise, nous vous garantissons un déménagement serein et parfaitement adapté à votre nouvelle adresse à Plaisir.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/plaisir-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Plaisir"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team city dynamic"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-plaisir" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Plaisir</h2>
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
                            src="https://picsum.photos/seed/plaisir-packing/600/400"
                            alt="Déménageur emballant avec soin des objets fragiles à Plaisir"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux particuliers et professionnels de Plaisir</h2>
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
            <section id="faq-plaisir" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Plaisir</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Plaisir.</p>
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
            <section id="contact-plaisir" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Plaisir</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Plaisir</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
