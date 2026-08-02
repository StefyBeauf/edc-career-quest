// ── Cours 4 — Enquête jobboards (PGE2 uniquement, S2, détective) ───────────

export const JOBBOARDS = [
  'LinkedIn Jobs', 'Welcome to the Jungle', 'Indeed', 'JobTeaser',
  'Sites carrières entreprises', 'Apec', 'France Travail', 'FashionJobs',
  'Sportcarriere', 'Plateformes école', 'Candidature spontanée', 'Réseau alumni',
] as const

export interface ObjectifRecherche {
  id: string
  objectif: string
  recommandes: string[]
  avantages: string
  limites: string
  reflexe: string
}

export const objectifsRecherche: ObjectifRecherche[] = [
  {
    id: 'startup',
    objectif: 'Stage en start-up',
    recommandes: ['Welcome to the Jungle', 'LinkedIn Jobs', 'Réseau alumni'],
    avantages: "Cultures d'entreprise visibles, offres qualitatives et détaillées.",
    limites: "Moins de volume que les grands jobboards généralistes.",
    reflexe: "Candidater vite (les postes se pourvoient rapidement) et se renseigner sur la culture avant de postuler.",
  },
  {
    id: 'luxe',
    objectif: 'Stage dans le luxe',
    recommandes: ['FashionJobs', 'Sites carrières entreprises', 'Réseau alumni'],
    avantages: 'Offres spécialisées et ciblées sur le secteur.',
    limites: 'Marché fermé, où le réseau compte souvent plus que la candidature spontanée.',
    reflexe: "Soigner particulièrement sa présentation et activer son réseau école dès que possible.",
  },
  {
    id: 'international',
    objectif: "Stage à l'international",
    recommandes: ['LinkedIn Jobs', 'Sites carrières entreprises', 'Plateformes école'],
    avantages: 'Bonne visibilité sur les offres multi-pays.',
    limites: 'Procédures administratives (visa, convention) souvent plus longues.',
    reflexe: 'Anticiper les démarches de visa et vérifier le niveau de langue requis avant de postuler.',
  },
  {
    id: 'sport',
    objectif: 'Stage dans le sport ou l\'événementiel',
    recommandes: ['Sportcarriere', 'Réseau alumni', 'Candidature spontanée'],
    avantages: 'Marché de niche où le réseau et la motivation font la différence.',
    limites: 'Peu d\'offres publiées largement — beaucoup restent informelles.',
    reflexe: 'Multiplier les candidatures spontanées et se rendre visible lors des événements du secteur.',
  },
  {
    id: 'grand-groupe',
    objectif: 'Stage en grande entreprise ou service public',
    recommandes: ['Apec', 'France Travail', 'Sites carrières entreprises'],
    avantages: "Volume d'offres important, process de candidature structuré.",
    limites: 'Process parfois long, forte concurrence sur les offres visibles.',
    reflexe: "Adapter précisément son CV aux mots-clés de l'offre pour passer les filtres.",
  },
]

export interface FicheJobboard {
  id: string
  nom: string
  indices: string[]
  interetPrincipal: string
  typeOffres: string
  profilPertinent: string
  limites: string
  bonUsage: string
}

export const fichesJobboards: FicheJobboard[] = [
  {
    id: 'wttj',
    nom: 'Welcome to the Jungle',
    indices: [
      'Pages entreprises très détaillées, avec photos et témoignages',
      'Interface soignée, orientée découverte de la culture d\'entreprise',
      'Beaucoup d\'offres en start-up et scale-up',
    ],
    interetPrincipal: 'Découvrir la culture et l\'ambiance d\'une entreprise avant de postuler.',
    typeOffres: 'Start-up, scale-up, entreprises tech et créatives.',
    profilPertinent: 'Étudiants en quête de sens, sensibles à la culture d\'entreprise.',
    limites: 'Moins présent sur les grands groupes traditionnels ou le secteur public.',
    bonUsage: "L'utiliser pour cibler des entreprises dont la culture correspond à ses valeurs.",
  },
  {
    id: 'apec',
    nom: 'Apec',
    indices: [
      'Site institutionnel, orienté cadres et jeunes diplômés',
      'Nombreux conseils et ateliers en complément des offres',
      'Offres provenant de tous types d\'entreprises',
    ],
    interetPrincipal: 'Accéder à un grand volume d\'offres avec un accompagnement méthodologique.',
    typeOffres: 'Tous secteurs, profils cadres et futurs cadres.',
    profilPertinent: 'Étudiants qui cherchent une recherche structurée, avec des ressources d\'accompagnement.',
    limites: 'Moins d\'informations sur la culture d\'entreprise que sur Welcome to the Jungle.',
    bonUsage: 'L\'utiliser pour une recherche large et méthodique, en complément d\'un ciblage plus fin ailleurs.',
  },
  {
    id: 'jobteaser',
    nom: 'JobTeaser',
    indices: [
      'Accessible via le compte étudiant de l\'école',
      'Offres souvent partenaires directs de l\'établissement',
      'Fonctionnalités de suivi de candidature intégrées',
    ],
    interetPrincipal: "Accéder à des offres réservées ou recommandées par l'école.",
    typeOffres: "Stages et alternances, souvent avec des entreprises partenaires de l'EDC.",
    profilPertinent: 'Étudiants qui veulent capitaliser sur le réseau et les partenariats de leur école.',
    limites: "Offre moins large que les jobboards généralistes en dehors du réseau école.",
    bonUsage: "Le consulter en priorité pour repérer les entreprises déjà en lien avec l'école.",
  },
]

export const PLAN_CHAMPS = [
  { cle: 'jobboards', label: '3 jobboards prioritaires', placeholder: 'Ex. Welcome to the Jungle, LinkedIn Jobs, réseau alumni' },
  { cle: 'motsCles', label: '2 mots-clés de recherche', placeholder: 'Ex. stage marketing digital, stage relation client' },
  { cle: 'entreprises', label: '2 entreprises à cibler', placeholder: 'Ex. deux entreprises correspondant au profil' },
  { cle: 'actionReseau', label: '1 action réseau', placeholder: 'Ex. contacter un alumni sur LinkedIn' },
  { cle: 'candidatureSpontanee', label: '1 candidature spontanée possible', placeholder: 'Ex. une entreprise à qui écrire directement' },
] as const

export const PROFIL_ENQUETE = {
  public: 'PGE2',
  recherche: 'marketing / communication',
  disponibilite: 'Juin',
  interet: 'Sport et événementiel',
}
