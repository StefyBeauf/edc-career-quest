// ── Cours 2 — Profil LinkedIn réaliste (B2 + PGE2, S1, aventure) ───────────

export type CategorieProfil = 'credible' | 'ameliorer' | 'generique'

export interface ProfilClassement {
  id: string
  nom: string
  titre: string
  resume: string
  categorie: CategorieProfil
  explication: string
}

export const profilsClassement: ProfilClassement[] = [
  {
    id: 'p1',
    nom: 'Profil A',
    titre: 'Étudiante en Marketing Digital | Recherche stage en gestion de communauté et relation client',
    resume: "Actuellement en 2ème année à l'EDC Paris, je m'intéresse à la communication digitale et à la relation client. J'ai animé les réseaux sociaux d'une association étudiante pendant un semestre.",
    categorie: 'credible',
    explication: "Titre clair et orienté stage, résumé appuyé sur une expérience réelle, ton naturel : ce profil donne une image crédible et précise.",
  },
  {
    id: 'p2',
    nom: 'Profil B',
    titre: "Passionné d'excellence et d'innovation disruptive",
    resume: 'Toujours en quête de nouveaux défis, je souhaite mettre ma passion et mon énergie au service d\'un projet ambitieux.',
    categorie: 'generique',
    explication: "Formulations vagues et interchangeables, aucun lien avec un secteur ou une expérience concrète : ce profil ne dit rien de précis sur la personne.",
  },
  {
    id: 'p3',
    nom: 'Profil C',
    titre: 'Étudiant en 2ème année EDC Paris | Bénévole événementiel, intérêt pour le sport business',
    resume: "Impliqué depuis un an au sein du BDE comme responsable événementiel, j'organise des soirées et compétitions sportives inter-écoles. Je recherche un stage dans le sport ou l'événementiel.",
    categorie: 'credible',
    explication: 'Expérience concrète et vérifiable, secteur cible clair, ton simple et sincère : ce profil inspire confiance.',
  },
  {
    id: 'p4',
    nom: 'Profil D',
    titre: 'Étudiant à l\'EDC Paris',
    resume: "Je cherche un stage. N'hésitez pas à me contacter.",
    categorie: 'ameliorer',
    explication: "Le profil n'est pas faux, mais il manque de précision : aucun secteur, aucune compétence, aucune expérience mentionnée.",
  },
  {
    id: 'p5',
    nom: 'Profil E',
    titre: 'Future Business Leader | Ambitieuse et déterminée',
    resume: 'Je veux devenir une leader inspirante et avoir un impact fort sur le monde de demain.',
    categorie: 'ameliorer',
    explication: 'Le ton est ambitieux mais reste flou : aucune information concrète sur le parcours, le secteur visé ou le type de stage recherché.',
  },
]

export const CATEGORIES_LABELS: Record<CategorieProfil, { emoji: string; label: string }> = {
  credible: { emoji: '🟢', label: 'Crédible' },
  ameliorer: { emoji: '🟠', label: 'À améliorer' },
  generique: { emoji: '🔴', label: 'Trop générique' },
}

// ── Exercice 2 — Atelier profil LinkedIn guidé ──────────────────────────────

export const ATELIER_CHAMPS = [
  { cle: 'titre', label: 'Mon titre', placeholder: 'Ex. Étudiant en 2ème année EDC Paris | Recherche stage en marketing digital', min: 20 },
  { cle: 'resume', label: 'Mon résumé (2 phrases)', placeholder: 'Ex. Actuellement en 2ème année à l\'EDC Paris, je m\'intéresse à… J\'ai notamment…', min: 40 },
  { cle: 'competences', label: 'Mes compétences (3)', placeholder: 'Ex. Gestion de projet, Canva, prise de parole en public', min: 15 },
  { cle: 'coherence', label: 'Ma cohérence avec mon stage', placeholder: 'Ex. Ces expériences montrent que je suis prêt(e) pour un stage en…', min: 20 },
] as const

const MOTS_GENERIQUES = [
  'passionné', 'passionnée', 'disruptif', 'disruptive', 'excellence',
  'ambitieux', 'ambitieuse', 'déterminé', 'déterminée', 'proactif', 'proactive',
  'dynamique et motivé', 'leader inspirant', 'leader inspirante', 'impact fort',
]

export interface FeedbackFormulation {
  verdict: 'a-preciser' | 'trop-generique' | 'clair'
  message: string
}

export function evaluerFormulation(cle: string, valeur: string, minLength: number): FeedbackFormulation {
  const texte = valeur.trim()
  if (texte.length < minLength) {
    return { verdict: 'a-preciser', message: 'À préciser — ajoute un élément concret (secteur, expérience, exemple) pour que ce soit parlant.' }
  }
  const contientMotGenerique = MOTS_GENERIQUES.some(mot => texte.toLowerCase().includes(mot))
  if (contientMotGenerique) {
    return { verdict: 'trop-generique', message: 'Trop générique — remplace les formules toutes faites par quelque chose de concret sur toi et ton parcours.' }
  }
  return { verdict: 'clair', message: 'Clair et crédible — cette formulation donne une image précise de toi.' }
}
