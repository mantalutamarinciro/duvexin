import Link from "next/link";

const guides = {
  mery: {
    city: "Méry-sur-Oise",
    href: "/demenagement-mery-sur-oise-95540",
    title: "À Méry-sur-Oise, préparer les accès et les dépendances",
    intro: "Pour votre devis, pensez au contenu de l’ensemble du logement : le garage, la cave et l’abri de jardin peuvent représenter une part importante du volume à transporter.",
    checks: [
      ["Faire un inventaire complet", "Listez séparément les meubles, les cartons, les outils et le mobilier extérieur. Signalez les objets lourds ou encombrants qui nécessitent une préparation particulière."],
      ["Mesurer le passage jusqu’au logement", "Précisez la largeur du portail, les marches et la distance entre le véhicule et la porte. Quelques photos permettent de préparer l’évaluation des accès."],
      ["Préparer aussi l’arrivée", "Indiquez les mêmes informations pour votre nouvelle adresse, même si elle est proche : un trajet court ne réduit pas les besoins de manutention."],
    ],
  },
  cergy: {
    city: "Cergy",
    href: "/demenagement-cergy-95000",
    title: "À Cergy, anticiper un déménagement en résidence",
    intro: "Pour un studio ou un appartement, la surface ne suffit pas à préparer le transport. Les accès à la résidence et les dimensions des meubles comptent aussi dans l’organisation.",
    checks: [
      ["Décrire l’ascenseur et les parties communes", "Indiquez l’étage, les dimensions utiles de l’ascenseur et les éventuels escaliers entre l’entrée et le logement. Vérifiez les conditions d’accès auprès du gestionnaire de la résidence."],
      ["Signaler les accès contrôlés", "Précisez la présence d’une barrière, d’un badge ou d’une entrée distincte pour les livraisons. Un parking souterrain n’est pas nécessairement accessible au véhicule de déménagement."],
      ["Choisir ce que vous préparez", "Pour un petit volume, comparez les formules selon l’emballage, le démontage et le remontage souhaités. Signalez les écrans et autres objets fragiles dans votre inventaire."],
    ],
  },
  pontoise: {
    city: "Pontoise",
    href: "/demenagement-pontoise-95300",
    title: "À Pontoise, vérifier le passage du mobilier avant le départ",
    intro: "Si votre logement se situe dans une rue étroite ou dans un immeuble ancien, décrivez précisément le parcours entre la rue et chaque pièce. Cela aide à identifier les difficultés avant le jour du déménagement.",
    checks: [
      ["Mesurer les passages difficiles", "Relevez la largeur des portes, les tournants d’escalier et les paliers. Comparez-les aux dimensions des meubles qui ne peuvent pas être démontés."],
      ["Évaluer la distance de portage", "Joignez des photos de la rue et de l’entrée, sans supposer que le camion pourra stationner devant la porte. L’emplacement disponible doit être vérifié pendant la préparation."],
      ["Étudier les solutions d’accès", "Si un meuble ne passe pas par l’escalier, signalez-le dès la demande. Le recours à un monte-meubles dépend de la configuration et des conditions d’installation ; il ne peut pas être présumé."],
    ],
  },
} as const;

export function LocalMovingGuide({ city }: { city: keyof typeof guides }) {
  const guide = guides[city];
  return (
    <section className="bg-white py-16 md:py-20" aria-labelledby={`moving-guide-${city}`}>
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <h2 id={`moving-guide-${city}`} className="text-3xl font-bold tracking-tight text-slate-900">{guide.title}</h2>
        <p className="mt-5 max-w-3xl leading-relaxed text-slate-600">{guide.intro}</p>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {guide.checks.map(([title, text]) => (
            <div key={title}>
              <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
              <p className="mt-3 leading-relaxed text-slate-600">{text}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 leading-relaxed text-slate-600">
          Pour comparer les devis, utilisez le même inventaire et le même niveau de prestation.
          Consultez <Link className="underline underline-offset-4" href="/formules-de-demenagement">nos formules de déménagement</Link>, puis indiquez vos dates, vos deux adresses et vos contraintes dans votre <Link className="underline underline-offset-4" href="/demande-devis">demande de devis</Link>.
        </p>
        <nav aria-label={`Autres communes près de ${guide.city}`} className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-slate-200 pt-6">
          {Object.entries(guides).filter(([key]) => key !== city).map(([key, nearby]) => (
            <Link key={key} href={nearby.href} className="text-slate-700 underline underline-offset-4">Déménagement à {nearby.city}</Link>
          ))}
          <Link href="/demenagement-val-d-oise-95" className="text-slate-700 underline underline-offset-4">Toutes nos interventions dans le Val-d’Oise</Link>
        </nav>
      </div>
    </section>
  );
}
