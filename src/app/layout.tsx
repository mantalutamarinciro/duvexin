import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { CookieBanner } from '@/components/cookie-banner';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL('https://demenagementduvexin.fr'),
  title: 'DemDuVexin - Votre Partenaire Déménagement',
  description: 'Déménagement pour particuliers et entreprises dans le Val-d’Oise, l’Oise, l’Eure et toute la France. Obtenez votre devis gratuit.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Déménagement du Vexin",
    "url": "https://demenagementduvexin.fr",
    "logo": "https://demenagementduvexin.fr/images/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+33130751235",
      "contactType": "customer service",
      "areaServed": "FR",
      "availableLanguage": "French"
    },
    "sameAs": [
      "https://www.facebook.com/demenagementduvexin",
      "https://www.instagram.com/demenagementduvexin"
    ]
  };

  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet" />
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
            {children}
            <CookieBanner />
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
