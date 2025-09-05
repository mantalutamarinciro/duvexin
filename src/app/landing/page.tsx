
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Package, ShieldCheck, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "./contact-form";

const features = [
    {
        icon: <Truck className="h-10 w-10 text-primary" />,
        title: "Déménagement Particuliers & Entreprises",
        description: "Nous gérons des déménagements de toutes tailles, du studio à la grande entreprise, avec professionnalisme et efficacité."
    },
    {
        icon: <Package className="h-10 w-10 text-primary" />,
        title: "Service d'emballage complet",
        description: "Gagnez du temps et de la sérénité. Nos experts emballent vos biens les plus fragiles avec le plus grand soin."
    },
    {
        icon: <ShieldCheck className="h-10 w-10 text-primary" />,
        title: "Assurance et Fiabilité",
        description: "Vos biens sont précieux. C'est pourquoi nous incluons une assurance complète pour un déménagement en toute tranquillité."
    }
]

export default function LandingPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative h-[70vh] flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/1600/900"
                    alt="Équipe de déménageurs chargeant un camion"
                    fill
                    className="object-cover"
                    data-ai-hint="moving team truck"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold">Votre déménagement, notre priorité.</h1>
                    <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">DemDuVexin, l'expert du déménagement dans le Vexin et ses environs. Simple, rapide et sécurisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Obtenir un devis gratuit</Link>
                    </Button>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-16 md:py-24 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Des services adaptés à vos besoins</h2>
                        <p className="mt-4 text-muted-foreground">Que vous soyez un particulier ou un professionnel, nous avons la solution pour un déménagement sans stress.</p>
                    </div>
                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        {features.map((feature, i) => (
                             <Card key={i} className="text-center p-6">
                                <div className="flex justify-center mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold">{feature.title}</h3>
                                <p className="mt-2 text-muted-foreground">{feature.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
             <section className="py-16 md:py-24">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Ils nous ont fait confiance</h2>
                         <p className="mt-4 text-muted-foreground">La satisfaction de nos clients est notre meilleure publicité.</p>
                    </div>
                    <div className="mt-12 grid lg:grid-cols-3 gap-8">
                        <Card className="p-6">
                            <CardContent className="p-0">
                                <div className="flex items-center gap-1 text-amber-400 mb-2">
                                   <Star size={16} fill="currentColor"/> <Star size={16} fill="currentColor"/> <Star size={16} fill="currentColor"/> <Star size={16} fill="currentColor"/> <Star size={16} fill="currentColor"/>
                                </div>
                                <p className="italic">"Une équipe au top, professionnelle et très sympathique. Le déménagement s'est déroulé sans aucun accroc. Je recommande les yeux fermés !"</p>
                                <p className="mt-4 font-semibold">- Famille Dubois, Pontoise</p>
                            </CardContent>
                        </Card>
                         <Card className="p-6">
                             <CardContent className="p-0">
                               <div className="flex items-center gap-1 text-amber-400 mb-2">
                                   <Star size={16} fill="currentColor"/> <Star size={16} fill="currentColor"/> <Star size={16} fill="currentColor"/> <Star size={16} fill="currentColor"/> <Star size={16} fill="currentColor"/>
                                </div>
                                <p className="italic">"Rapides, efficaces et très soigneux avec nos affaires. Le service client avant et pendant le déménagement était excellent."</p>
                                <p className="mt-4 font-semibold">- M. Martin, Gisors</p>
                            </CardContent>
                        </Card>
                         <Card className="p-6">
                             <CardContent className="p-0">
                                <div className="flex items-center gap-1 text-amber-400 mb-2">
                                   <Star size={16} fill="currentColor"/> <Star size={16} fill="currentColor"/> <Star size={16} fill="currentColor"/> <Star size={16} fill="currentColor"/> <Star size={16} fill="currentColor"/>
                                </div>
                                <p className="italic">"Le déménagement de nos bureaux a été une réussite grâce à DemDuVexin. Ponctualité et organisation parfaite."</p>
                                <p className="mt-4 font-semibold">- Société Innovatech, Cergy</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-16 md:py-24 bg-muted/50">
                 <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Contactez-nous</h2>
                        <p className="mt-4 text-muted-foreground">Une question ? Une demande de devis ? Remplissez ce formulaire et notre équipe vous recontactera dans les plus brefs délais pour discuter de votre projet.</p>
                         <div className="mt-8 space-y-4 text-muted-foreground">
                            <p><strong>Adresse :</strong> 12 Rue de la République, 75001 Paris</p>
                            <p><strong>Email :</strong> contact@demduvexin.fr</p>
                            <p><strong>Téléphone :</strong> 01 23 45 67 89</p>
                        </div>
                    </div>
                    <div>
                        <Card>
                            <CardContent className="p-6">
                                <ContactForm />
                            </CardContent>
                        </Card>
                    </div>
                 </div>
            </section>
        </>
    );
}
