
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Mail, LogIn } from "lucide-react";
import Link from "next/link";
import { MainNav } from "@/components/main-nav";

export const metadata: Metadata = {
  title: 'DemDuVexin - Votre Partenaire Déménagement',
  description: 'Déménagement pour particuliers et entreprises dans le Val-d’Oise, l’Oise, l’Eure et toute la France. Obtenez votre devis gratuit.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-svh flex flex-col bg-background">
             <div className="bg-primary text-primary-foreground">
                <div className="container h-10 flex items-center justify-center">
                    <a href="tel:+33130751235" className="flex items-center gap-2 text-sm font-medium hover:opacity-90 transition-opacity">
                       <Phone className="h-4 w-4" />
                       <span>Appelez-nous maintenant (+33)1 30 75 12 35</span>
                    </a>
                </div>
            </div>
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container h-16 flex items-center justify-between gap-4">
                    <Logo />
                    <MainNav />
                     <div className="hidden lg:flex items-center gap-2">
                        <Button asChild variant="ghost">
                           <Link href="/dashboard">
                                <LogIn className="mr-2 h-4 w-4" />
                                Dashboard
                           </Link>
                        </Button>
                        <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                            <Link href="/demande-devis">Obtenir un devis</Link>
                        </Button>
                     </div>
                </div>
            </header>
            <main className="flex-1">
                {children}
            </main>
            <footer className="border-t bg-gray-900 text-gray-300">
                <div className="container py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                   <div className="md:col-span-1">
                     <Logo />
                     <p className="text-sm text-gray-400 mt-4">
                        Votre partenaire de confiance pour un déménagement sans stress.
                     </p>
                   </div>
                   <div className="md:col-span-1">
                        <h4 className="font-semibold mb-2 text-white">Agence Île-de-France</h4>
                        <div className="space-y-2 text-sm text-gray-400">
                            <p className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent"/> 9 Rue de Pontoise, 95540 Méry-sur-Oise</p>
                            <p className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0 text-accent"/> (+33)1 30 75 12 35</p>
                            <p className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0 text-accent"/> contact@demenagementduvexin.fr</p>
                        </div>
                   </div>
                    <div className="md:col-span-1">
                        <h4 className="font-semibold mb-2 text-white">Agence Normandie</h4>
                        <div className="space-y-2 text-sm text-gray-400">
                            <p className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent"/> 22 Rue Isambard, 27000 Évreux, Normandie</p>
                            <p className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0 text-accent"/> (+33) 3 74 47 44 77</p>
                            <p className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0 text-accent"/> demenagementduvexin@evreux.fr</p>
                            <Link href="/demenagement-du-vexin-evreux" className="text-accent font-semibold hover:underline text-xs pt-1">En savoir plus...</Link>
                        </div>
                   </div>
                   <div className="md:col-span-1">
                        <h4 className="font-semibold mb-2 text-white">Navigation</h4>
                        <div className="flex flex-col space-y-1 text-sm text-gray-400">
                           <Link href="/" className="hover:text-accent">Accueil</Link>
                           <Link href="/a-propos-de-demenagement-du-vexin" className="hover:text-accent">À propos</Link>
                           <Link href="/services" className="hover:text-accent">Services</Link>
                           <Link href="/blog" className="hover:text-accent">Blog</Link>
                           <Link href="/#contact" className="hover:text-accent">Contact</Link>
                           <Link href="/demande-devis" className="hover:text-accent">Devis</Link>
                        </div>
                   </div>
                </div>
                <div className="border-t border-gray-700">
                    <div className="container py-4 text-center text-sm text-gray-500">
                        © {new Date().getFullYear()} Déménagement Du Vexin. Réalisé avec ❤️ par Creow.
                    </div>
                </div>
            </footer>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
