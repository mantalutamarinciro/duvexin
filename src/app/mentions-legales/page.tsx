import { ShieldCheck, Info, Scale, Building2, Globe, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function MentionsLegalesPage() {
  return (
    <main className="bg-slate-50 min-h-screen pb-20 selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      {/* --- HERO / HEADER --- */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 bg-[#0b0f19] text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00ad9f]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <nav className="flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-white/50 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
              <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
              <span className="text-[#00ad9f]">Mentions Légales</span>
            </nav>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Mentions <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                Légales.
              </span>
            </h1>
            <p className="text-lg text-slate-300 font-light max-w-2xl leading-relaxed">
              Informations obligatoires concernant l'éditeur et l'hébergeur du site internet demenagementduvexin.fr.
            </p>
          </div>
        </div>
      </section>

      {/* --- CONTENT --- */}
      <section className="container mx-auto px-4 md:px-6 -mt-12 relative z-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-8 md:p-16 space-y-12 text-slate-600 font-light leading-relaxed">
            
            {/* Éditeur */}
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-teal-50 flex items-center justify-center text-[#00ad9f] mb-6">
                <Building2 className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Éditeur et Propriétaire du site</h2>
              <p>
                Le site <strong>demenagementduvexin.fr</strong> est la propriété exclusive de la société <strong>Déménagement du Vexin (DDV)</strong>, spécialisée dans les services de déménagement.
              </p>
              <ul className="space-y-2">
                <li><strong>Siège social :</strong> 9 Rue de Pontoise, 95540 Méry-sur-Oise, France</li>
                <li><strong>Téléphone :</strong> 01 30 75 12 35</li>
                <li><strong>Email :</strong> <a href="mailto:demenagementduvexin@gmail.com" className="text-primary font-medium hover:underline">demenagementduvexin@gmail.com</a></li>
                <li><strong>Gérant et Directeur de la publication :</strong> Marin Mantaluta</li>
              </ul>
            </div>

            {/* Hébergement */}
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
                <Globe className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Hébergement du site</h2>
              <p>Ce site est hébergé par :</p>
              <ul className="space-y-2">
                <li><strong>Google Cloud Platform (Firebase)</strong></li>
                <li><strong>Google Ireland Limited</strong></li>
                <li>Gordon House, Barrow Street, Dublin 4, Ireland</li>
                <li>Site web : <a href="https://cloud.google.com/" target="_blank" className="text-primary font-medium hover:underline">cloud.google.com</a></li>
              </ul>
            </div>

            {/* Conditions d'utilisation */}
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-900 mb-6">
                <Info className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Conditions d’utilisation</h2>
              <p>
                L’utilisation du site <strong>demenagementduvexin.fr</strong> implique l’acceptation pleine et entière des présentes conditions générales d’utilisation. Ces conditions sont susceptibles d’être modifiées ou complétées à tout moment. Les utilisateurs du site sont invités à les consulter régulièrement afin de prendre connaissance de toute mise à jour.
              </p>
            </div>

            {/* Droits d'auteur */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">Droits d’auteur</h2>
              <p>
                Tous les éléments présents sur le site <strong>demenagementduvexin.fr</strong>, y compris, mais sans s’y limiter, les textes, images, photographies, vidéos, arborescences, mises en forme, et autres éléments de contenu sont la propriété exclusive de <strong>Déménagement du Vexin</strong> ou de ses partenaires. Toute reproduction ou utilisation de ces éléments sans l’autorisation écrite préalable de la société Déménagement du Vexin est strictement interdite.
              </p>
            </div>

            {/* Protection des données */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">Protection des données personnelles</h2>
              <p>
                Déménagement du Vexin s’engage à respecter la confidentialité des informations personnelles fournies par les utilisateurs sur son site. Conformément à la Loi n° 78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux libertés, l’utilisateur dispose d’un droit d’accès, de rectification et de suppression des données personnelles le concernant.
              </p>
              <p>
                Pour exercer ce droit, il suffit de contacter Déménagement du Vexin par email à <span className="font-bold text-slate-900">demenagementduvexin@gmail.com</span> ou de consulter notre <Link href="/politique-confidentialite" className="text-primary hover:underline">Politique de Confidentialité</Link>.
              </p>
            </div>

            {/* Limitation de responsabilité */}
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 mb-6">
                <Scale className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Limitation de responsabilité</h2>
              <p>
                Déménagement du Vexin met tout en œuvre pour garantir que les informations présentes sur le site soient aussi précises et à jour que possible. Toutefois, Déménagement du Vexin ne pourra être tenu responsable en cas d’omissions, d’inexactitudes ou de carences dans la mise à jour des informations, que celles-ci soient dues à des erreurs humaines, des tiers partenaires ou tout autre facteur externe.
              </p>
            </div>

            {/* Cookies */}
            <div className="space-y-4 pb-12">
              <h2 className="text-2xl font-bold text-slate-900">Cookies</h2>
              <p>
                Le site utilise des cookies pour améliorer l’expérience utilisateur. Ces cookies permettent de personnaliser le contenu et d’analyser le trafic. L’utilisateur peut désactiver les cookies dans les paramètres de son navigateur, bien que cela puisse affecter certaines fonctionnalités du site.
              </p>
            </div>

            {/* Pied de page spécifique */}
            <div className="pt-12 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-400">
                Ces mentions légales sont destinées à informer les utilisateurs du site des règles de fonctionnement et des responsabilités de Déménagement du Vexin. En utilisant le site, vous acceptez les termes de ces mentions.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
