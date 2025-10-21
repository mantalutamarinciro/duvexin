import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
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
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet" />
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
                <div className="container h-16 flex items-center justify-between">
                    <Logo />
                    <MainNav />
                     <Button asChild className="hidden lg:inline-flex bg-accent hover:bg-accent/90 text-accent-foreground">
                        <Link href="/demande-devis">Obtenir un devis</Link>
                    </Button>
                </div>
            </header>
            <main className="flex-1">
                {children}
            </main>
            { /* The footer is now part of the individual landing page layouts to avoid showing it on dashboard pages */ }
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
