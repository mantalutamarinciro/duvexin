
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { CookieBanner } from '@/components/cookie-banner';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { Poppins } from 'next/font/google';
import Script from 'next/script';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

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
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${poppins.variable} font-body antialiased`}>
        <FirebaseClientProvider>
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
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
