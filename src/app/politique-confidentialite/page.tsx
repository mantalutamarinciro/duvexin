
import { ShieldCheck, Lock, Eye, Mail, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
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
              <span className="text-[#00ad9f]">Confidentialité</span>
            </nav>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Politique de <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                Confidentialité.
              </span>
            </h1>
            <p className="text-lg text-slate-300 font-light max-w-2xl leading-relaxed">
              La protection de vos données personnelles est au cœur de nos engagements. 
              Nous traitons vos informations avec la même rigueur que vos biens.
            </p>
          </div>
        </div>
      </section>

      {/* --- CONTENT --- */}
      <section className="container mx-auto px-4 md:px-6 -mt-12 relative z-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-8 md:p-16 space-y-12 text-slate-600 font-light leading-relaxed">
            
            {/* Introduction */}
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-teal-50 flex items-center justify-center text-[#00ad9f] mb-6">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Introduction</h2>
              <p>
                La présente Politique de confidentialité a pour but de vous informer sur la manière dont <strong>Déménagement du Vexin</strong> collecte, utilise et protège vos données personnelles lorsque vous utilisez notre site internet et nos services. 
                Conformément au Règlement Général sur la Protection des Données (RGPD), nous nous engageons à assurer la sécurité et la confidentialité de vos données.
              </p>
            </div>

            {/* Collecte des données */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">1. Collecte des données</h2>
              <p>Nous collectons les informations que vous nous fournissez directement via nos formulaires de devis, de contact ou lors de la réservation d'un déménagement :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Identité :</strong> Nom, prénom.</li>
                <li><strong>Contact :</strong> Adresse e-mail, numéro de téléphone.</li>
                <li><strong>Déménagement :</strong> Adresses de départ et d'arrivée, inventaire des biens, volume estimé, dates souhaitées.</li>
              </ul>
            </div>

            {/* Utilisation des données */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">2. Finalités du traitement</h2>
              <p>Vos données sont traitées pour les raisons suivantes :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Établissement de devis personnalisés.</li>
                <li>Gestion et exécution de vos contrats de déménagement.</li>
                <li>Communication relative à votre projet (confirmations, rappels).</li>
                <li>Amélioration de nos services et de votre expérience utilisateur.</li>
              </ul>
            </div>

            {/* Sécurité et Stockage */}
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
                <Lock className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">3. Sécurité et Conservation</h2>
              <p>
                Vos données sont stockées de manière sécurisée via l'infrastructure <strong>Firebase (Google Cloud)</strong>. 
                Nous mettons en œuvre des mesures techniques et organisationnelles rigoureuses pour empêcher tout accès non autorisé, perte ou altération de vos données.
              </p>
              <p>
                Nous conservons vos données uniquement pour la durée nécessaire aux finalités pour lesquelles elles ont été collectées, conformément aux obligations légales et contractuelles.
              </p>
            </div>

            {/* Droits des utilisateurs */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">4. Vos Droits</h2>
              <p>Conformément à la réglementation, vous disposez des droits suivants sur vos données :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Droit d'accès :</strong> Obtenir une copie de vos données.</li>
                <li><strong>Droit de rectification :</strong> Corriger des données inexactes.</li>
                <li><strong>Droit à l'effacement :</strong> Demander la suppression de vos données.</li>
                <li><strong>Droit d'opposition :</strong> Refuser le traitement de vos données pour des motifs légitimes.</li>
              </ul>
              <p className="pt-4 italic">
                Pour exercer vos droits, contactez-nous à l'adresse suivante : <span className="font-bold text-slate-900">contact@demenagementduvexin.fr</span>.
              </p>
            </div>

            {/* Cookies */}
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 mb-6">
                <Eye className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">5. Cookies</h2>
              <p>
                Notre site utilise des cookies techniques essentiels au bon fonctionnement de l'interface (comme la sauvegarde de votre inventaire de volume) et des cookies d'analyse anonymisés pour mesurer l'audience. 
                Vous pouvez gérer vos préférences en matière de cookies via les réglages de votre navigateur.
              </p>
            </div>

            {/* Contact */}
            <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-white">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="text-sm">
                  <p className="font-bold text-slate-900">Responsable du traitement</p>
                  <p>Déménagement du Vexin - Protection des données</p>
                </div>
              </div>
              <Button asChild variant="outline" className="rounded-full border-slate-200">
                <Link href="/contact">Poser une question</Link>
              </Button>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
