
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Ship, Users, Building, Truck, Waves } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Durand", text: "Notre déménagement à Pont-Audemer a été une réussite. L'équipe a su gérer les accès du centre-ville avec ses canaux. Un grand professionnalisme.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Durand27` },
    { id: "fallback-2", name: "Sophie L.", text: "Très bonne expérience pour mon appartement. Devis clair et équipe ponctuelle. Un déménagement sans stress dans cette ville magnifique.", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=SophieL27` },
    { id: "fallback-3", name: "M. Roger", text: "Efficacité et soin du détail. Je recommande Déménagement du Vexin pour leur sérieux et leur connaissance de la région.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Roger27` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Pont-Audemer",
        description: "Nous connaissons les défis du centre historique, ses canaux et ses rues typiques pour une logistique sans faille."
    },
    {
        icon: <Waves className="h-8 w-8 text-primary"/>,
        title: "Respect de la Venise Normande",
        description: "Nous intervenons avec un soin particulier pour préserver le charme de la ville et la tranquillité de ses habitants."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Logistique Adaptée",
        description: "Nous utilisons des véhicules de tailles variées pour nous adapter à toutes les configurations, même les plus complexes."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "La Proximité de nos Agences",
        description: "Avec notre base d'Évreux, nous sommes votre partenaire de proximité pour tout projet à Pont-Audemer et dans le pays d'Auge."
    }
];

const faqItems = [
    {
        question: "Comment se passe un déménagement dans le centre-ville de Pont-Audemer avec ses canaux ?",
        answer: "C'est une situation qui demande une excellente planification. Nous effectuons une analyse en amont pour choisir le véhicule le plus adapté et le meilleur itinéraire. Nous nous chargeons de la réservation de stationnement auprès de la mairie pour garantir une place et une intervention efficace, en respectant le cadre unique de la ville."
    },
    {
        question: "Assurez-vous les déménagements longue distance depuis Pont-Audemer ?",
        answer: "Oui, notre expertise ne se limite pas au local. Que vous quittiez la région ou que vous y arriviez, nous gérons votre déménagement de A à Z avec la même rigueur et le même professionnalisme, en nous appuyant sur notre agence d'Évreux."
    },
    {
        question: "Je déménage dans une maison normande typique, comment faites-vous ?",
        answer: "C'est une situation que nous rencontrons souvent. Nous disposons d'équipements pour protéger vos biens et les accès parfois étroits de ces belles demeures. La visite technique nous permet d'anticiper toutes les spécificités pour une intervention sur-mesure."
    },
    {
        question: "Quelles sont vos formules pour les petits budgets ?",
        answer: "Nous proposons des formules flexibles. Notre formule 'Économique' est une excellente solution pour maîtriser votre budget : vous vous chargez de l'emballage, et nos professionnels assurent la manutention lourde et le transport sécurisé de vos biens."
    }
];


export default function PontAudemerPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/pont-audemer/1920/500"
                    alt="Vue sur les canaux de Pont-Audemer"
                    fill
                    className="object-cover"
                    data-ai-hint="Pont-Audemer canals normandy"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Pont-Audemer (27500)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte pour votre projet dans la Venise Normande.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-eure-27" className="hover:text-primary">Eure (27)</Link>
                <span className="mx-2">&gt;</span>
                <span>Pont-Audemer</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui connaît le charme de Pont-Audemer</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Pont-Audemer, surnommée la "Venise normande", c'est choisir une ville au charme incomparable avec ses canaux et ses maisons à pans de bois. Ce cadre pittoresque demande une approche du déménagement qui soit à la fois respectueuse et logistiquement astucieuse.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Grâce à notre agence d'Évreux, Déménagement du Vexin est votre expert local. Que vous emménagiez dans le centre historique ou un quartier plus moderne, nous vous garantissons un déménagement serein et parfaitement orchestré.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/pont-audemer-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Pont-Audemer"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team historic normandy town"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-pont-audemer" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Pont-Audemer</h2>
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
                            src="https://picsum.photos/seed/pont-audemer-packing/600/400"
                            alt="Déménageur emballant avec soin des objets fragiles"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing antique"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux habitants de Pont-Audemer</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement de maisons et appartements</h4>
                                    <p className="text-muted-foreground">Une expertise particulière pour les déménagements en centre-ville et dans les maisons de caractère.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'entreprises et commerces</h4>
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
            <section id="faq-pont-audemer" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Pont-Audemer</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Pont-Audemer.</p>
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
            <section id="contact-pont-audemer" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Pont-Audemer</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Pont-Audemer</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
