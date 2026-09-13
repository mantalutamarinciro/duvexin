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
  herblay: {
    city: "Herblay-sur-Seine",
    href: "/demenagement-herblay-sur-seine-95220",
    title: "À Herblay-sur-Seine, inventorier la maison au-delà des pièces de vie",
    intro: "Pour préparer un départ de maison, rassemblez les informations sur les dépendances et les accès extérieurs. Pour un appartement, indiquez plutôt les étages et le parcours dans les parties communes.",
    checks: [
      ["Inclure le garage et le jardin", "Ajoutez à votre liste les étagères, outils, vélos et meubles de terrasse à transporter. Distinguez ce qui part de ce qui reste sur place pour éviter de surestimer le volume."],
      ["Photographier le parcours extérieur", "Montrez le portail, les marches et le chemin jusqu’à la porte. Précisez si le véhicule doit rester dans la rue : cette distance compte dans la préparation de la manutention."],
      ["Repérer les meubles à démonter", "Notez les dimensions des armoires, lits et tables, puis les passages disponibles. Indiquez dans la demande de devis si vous souhaitez réaliser le démontage vous-même ou le confier à l’équipe."],
    ],
  },
  cormeilles: {
    city: "Cormeilles-en-Parisis",
    href: "/demenagement-cormeilles-en-parisis-95240",
    title: "À Cormeilles-en-Parisis, décrire les accès avant de choisir les moyens",
    intro: "Un escalier extérieur, une allée en pente ou une entrée en retrait peuvent modifier l’organisation du transport. Signalez ces situations si elles concernent votre adresse, au départ comme à l’arrivée.",
    checks: [
      ["Montrer les différences de niveau", "Prenez des photos de l’accès depuis la rue jusqu’au logement. Indiquez les marches, les paliers et la présence d’une pente, plutôt que de vous limiter à la mention « rez-de-chaussée »."],
      ["Vérifier l’emplacement du véhicule", "Décrivez l’espace disponible et les restrictions d’accès connues. Si une réservation sur la voie publique est nécessaire, faites préciser les démarches et leur responsable avant de confirmer l’organisation."],
      ["Ne pas présumer du monte-meubles", "Donnez les dimensions des objets qui ne passent pas par l’intérieur et des ouvertures utilisables. Une solution par l’extérieur doit être étudiée selon l’espace d’installation et les contraintes du bâtiment."],
    ],
  },
  ermont: {
    city: "Ermont",
    href: "/demenagement-ermont-95120",
    title: "À Ermont, préparer le départ d’un appartement en résidence",
    intro: "Pour votre devis, distinguez le volume à déplacer des conditions d’accès à l’immeuble. Un ascenseur présent dans la résidence ne signifie pas que tous les meubles pourront y entrer.",
    checks: [
      ["Relever les dimensions utiles", "Indiquez l’étage, la largeur de la porte et les dimensions de la cabine de l’ascenseur. Ajoutez les escaliers ou les couloirs à traverser avant de l’atteindre."],
      ["Coordonner l’accès à la résidence", "Vérifiez auprès du gestionnaire les consignes pour les parties communes, les horaires d’accès et les badges nécessaires. Transmettez ces informations avant la date prévue."],
      ["Intégrer la cave et le stationnement", "Listez le contenu de la cave ou du box séparément. Précisez leur niveau et leur accès : la hauteur d’un parking souterrain peut empêcher le véhicule de déménagement d’y entrer."],
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
