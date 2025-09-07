
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Truck, Users, Waves, PawPrint } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Berger", text: "Déménagement de notre maison à Maisons-Alfort très bien géré. L'équipe a été professionnelle, rapide et particulièrement soigneuse. Un service de grande qualité.", rating: 5, createTime: "il y a 4 mois", avatarUrl: `https://i.pravatar.cc/48?u=Berger94` },
    { id: "fallback-2", name: "Lucas, étudiant vétérinaire", text: "Super service pour mon petit studio. Formule économique parfaite pour mon budget, et l'équipe a été super sympa et efficace. Je recommande !", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=LucasVeto` },
    { id: "fallback-3", name: "Mme. Fournier", text: "Très satisfaite de la prestation. Ils ont géré les accès sur les quais de Marne avec brio. Une entreprise sérieuse que je n'hésiterai pas à recontacter.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=FournierMA` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Maisons-Alfort",
        description: "De Charentonneau à Alfort, nous connaissons les rues, les accès et les réglementations pour une logistique sans faille."
    },
    {
        icon: <Waves className="h-8 w-8 text-primary"/>,
        title: "Spécialiste Bords de Marne",
        description: "Nous avons l'habitude de gérer les déménagements dans les quartiers pavillonnaires et les résidences qui longent la Marne."
    },
    {
        icon: <PawPrint className="h-8 w-8 text-primary"/>,
        title: "Proximité École Vétérinaire",
        description: "Nous proposons des formules adaptées aux étudiants et au personnel de l'École Nationale Vétérinaire d'Alfort."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité administrative",
        description: "Nous gérons pour vous les demandes d'autorisation de stationnement, une démarche clé pour un déménagement apaisé."
    }
];

const faqItems = [
    {
        question: "Comment se déroule un déménagement dans les rues étroites du centre de Maisons-Alfort ?",
        answer: "C'est une situation que nous maîtrisons. Nous effectuons une visite technique (ou une analyse à distance) pour choisir le véhicule le plus adapté. Nous nous chargeons également de la demande d'autorisation de stationnement, ce qui est crucial pour garantir une place et une intervention efficace."
    },
    {
        question: "Je suis étudiant à l'École Vétérinaire, avez-vous des offres spéciales ?",
        answer: "Oui, nous proposons régulièrement des offres pour les étudiants et nous avons des formules économiques parfaitement adaptées aux petits volumes (studios, T1). Elles vous permettent de bénéficier d'un service professionnel tout en maîtrisant votre budget."
    },
    {
        question: "Déménagez-vous les maisons avec jardin à Maisons-Alfort ?",
        answer: "Absolument. Nous sommes équipés pour déménager des maisons de toutes tailles. Nous accordons un soin particulier à la protection de vos accès, de vos jardins et bien sûr de votre mobilier, qu'il soit lourd ou fragile."
    },
    {
        question: "Quelles protections utilisez-vous pour les biens fragiles ?",
        answer: "La protection de vos affaires est notre priorité. Nous utilisons des couvertures de protection épaisses, des housses spéciales pour la literie et les canapés, et du film à bulles ou des cartons renforcés (cartons barrels pour la vaisselle) pour tous vos objets délicats."
    }
];


export default function MaisonsAlfortPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/maisons-alfort/1920/500"
                    alt="Vue des bords de Marne à Maisons-Alfort"
                    fill
                    className="object-cover"
                    data-ai-hint="maisons alfort marne river"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Maisons-Alfort</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution efficace et locale pour votre projet à Maisons-Alfort (94700).</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-val-de-marne-94" className="hover:text-primary">Val-de-Marne (94)</Link>
                <span className="mx-2">&gt;</span>
                <span>Maisons-Alfort</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur expert pour la ville de Maisons-Alfort</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Maisons-Alfort, c'est choisir une ville prisée du Val-de-Marne pour sa qualité de vie, ses bords de Marne aménagés et sa proximité immédiate avec Paris. Cette attractivité demande une organisation sans faille pour un déménagement réussi.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous connaissons parfaitement les spécificités de Maisons-Alfort. Que vous emménagiez dans une maison de caractère, un appartement en centre-ville ou un logement étudiant près de l'École Vétérinaire, nous planifions chaque détail pour garantir un service fluide, rapide et soigné.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/maisons-alfort-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Maisons-Alfort"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team suburban riverside"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-maisons-alfort" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Maisons-Alfort</h2>
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
                            src="https://picsum.photos/seed/maisons-alfort-packing/600/400"
                            alt="Déménageur emballant avec soin des objets pour un déménagement à Maisons-Alfort"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing boxes"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux habitants de Maisons-Alfort</h2>
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
                                    <p className="text-muted-foreground">De la prestation économique pour étudiants à la formule tout confort, nous nous adaptons à vos besoins.</p>
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
            <section id="faq-maisons-alfort" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Maisons-Alfort</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Maisons-Alfort.</p>
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
            <section id="contact-maisons-alfort" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Maisons-Alfort</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Maisons-Alfort</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
