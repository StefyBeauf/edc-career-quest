// ── Cours 3 — Révélateur d'idées LinkedIn (B2 + PGE2, S1, aventure) ────────

export interface CategoriePost {
  id: string
  label: string
  icone: string
  declencheurs: string[]
}

export const categoriesPost: CategoriePost[] = [
  {
    id: 'cours', label: 'Cours', icone: '📚',
    declencheurs: [
      "Quel cours t'a fait voir une entreprise différemment ?",
      "Quelle notion vue en cours t'a surpris(e) au point de vouloir creuser le sujet ?",
      "Quel travail de groupe t'a appris quelque chose sur ta façon de travailler ?",
    ],
  },
  {
    id: 'projet', label: 'Projet', icone: '🛠️',
    declencheurs: [
      "Quel projet t'a demandé de sortir de ta zone de confort ?",
      "Qu'as-tu appris en gérant un imprévu dans un projet de groupe ?",
      "Quel résultat de projet es-tu le plus fier(e) d'avoir obtenu ?",
    ],
  },
  {
    id: 'voyage', label: 'Voyage', icone: '🌍',
    declencheurs: [
      "Qu'est-ce qu'un voyage t'a appris sur ta façon de t'adapter ?",
      "Quelle rencontre en voyage a changé ta vision d'un secteur ou d'un métier ?",
    ],
  },
  {
    id: 'competence', label: 'Compétence', icone: '🎯',
    declencheurs: [
      "Quelle compétence as-tu développée sans t'en rendre compte ?",
      "Quelle compétence aimerais-tu montrer que tu ne mets jamais en avant ?",
    ],
  },
  {
    id: 'experience', label: 'Expérience', icone: '💼',
    declencheurs: [
      "Quelle expérience professionnelle t'a le plus appris sur toi-même ?",
      "Quel retour d'un maître de stage ou manager t'a marqué(e) ?",
    ],
  },
  {
    id: 'association', label: 'Association', icone: '🤝',
    declencheurs: [
      "Quel rôle associatif t'a fait progresser sans que tu t'y attendes ?",
      "Quelle difficulté dans une asso t'a appris à mieux collaborer ?",
    ],
  },
  {
    id: 'difficulte', label: 'Difficulté', icone: '⚡',
    declencheurs: [
      "Quelle difficulté as-tu surmontée récemment, et comment ?",
      "Quel échec t'a finalement appris plus qu'une réussite ?",
    ],
  },
  {
    id: 'recherche-stage', label: 'Recherche de stage', icone: '🔎',
    declencheurs: [
      "Quel type de stage recherches-tu ?",
      "Quelle compétence veux-tu développer pendant ce stage ?",
      "Qu'as-tu appris sur toi-même en préparant ta recherche de stage ?",
    ],
  },
  {
    id: 'rencontre', label: 'Rencontre', icone: '👋',
    declencheurs: [
      "Quelle rencontre professionnelle t'a marqué(e) récemment ?",
      "Quel conseil reçu d'un professionnel t'a été le plus utile ?",
    ],
  },
  {
    id: 'decouverte-metier', label: 'Découverte métier', icone: '🧭',
    declencheurs: [
      "Quel métier as-tu découvert récemment et qui t'a surpris(e) ?",
      "Qu'est-ce qui t'attire dans un métier que tu connais encore mal ?",
    ],
  },
]

export type VerdictPost = 'interessant' | 'a-preciser' | 'trop-banal'

export interface IdeePost {
  id: string
  texte: string
  verdict: VerdictPost
  explication: string
}

export const ideesPost: IdeePost[] = [
  {
    id: 'idee1',
    texte: 'Je recherche un stage, contactez-moi.',
    verdict: 'trop-banal',
    explication: "Aucune information concrète, aucun angle personnel : ce message se noie parmi des centaines d'autres identiques.",
  },
  {
    id: 'idee2',
    texte: "Ce que mon dernier projet de groupe m'a appris sur l'organisation et la communication.",
    verdict: 'interessant',
    explication: "Sujet concret, ancré dans une expérience réelle, avec un apprentissage clair à partager.",
  },
  {
    id: 'idee3',
    texte: 'Mon stage de fin d\'année approche, je suis motivé(e) !',
    verdict: 'a-preciser',
    explication: "L'intention est bonne mais il manque un angle : quel secteur, quel apprentissage, quelle question veux-tu poser à ton réseau ?",
  },
  {
    id: 'idee4',
    texte: "3 choses que j'ai comprises sur le monde de l'entreprise en organisant un événement étudiant.",
    verdict: 'interessant',
    explication: "Format clair (liste), expérience concrète, ouverture professionnelle : un post facile à écrire et à lire.",
  },
  {
    id: 'idee5',
    texte: 'Passionné(e) par tout ce qui touche au digital.',
    verdict: 'trop-banal',
    explication: "Formule générique sans exemple ni expérience : ne dit rien de précis sur la personne.",
  },
]

export const ANGLE_CHAMPS = [
  { cle: 'sujet', label: 'De quoi je veux parler', placeholder: 'Ex. ce que mon rôle associatif m\'a appris sur le travail en équipe' },
  { cle: 'pourquoi', label: 'Pourquoi ce sujet est personnel ou utile', placeholder: 'Ex. c\'est une expérience qui m\'a vraiment fait progresser' },
  { cle: 'apprentissage', label: "Ce que j'ai appris", placeholder: 'Ex. à mieux déléguer, à gérer un désaccord…' },
  { cle: 'lien', label: 'Le lien avec mon projet ou ma recherche de stage', placeholder: 'Ex. ça confirme mon envie de travailler en gestion de projet' },
  { cle: 'ouverture', label: 'La question ou ouverture finale', placeholder: 'Ex. et vous, quelle expérience vous a le plus appris sur vous-même ?' },
] as const
