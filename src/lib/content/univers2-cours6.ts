// ── Cours 6 — Stratégie 30 jours (PGE2 uniquement, S2, détective) ──────────

export interface ItemDiagnostic {
  id: string
  label: string
}

export const itemsDiagnostic: ItemDiagnostic[] = [
  { id: 'cv', label: 'CV à jour' },
  { id: 'linkedin', label: 'Profil LinkedIn optimisé' },
  { id: 'secteur', label: 'Secteur ciblé' },
  { id: 'type-stage', label: 'Type de stage défini' },
  { id: 'liste-entreprises', label: "Liste d'entreprises commencée" },
  { id: 'jobboards', label: 'Jobboards identifiés' },
  { id: 'alertes', label: 'Alertes créées' },
  { id: 'candidatures', label: 'Candidatures envoyées' },
  { id: 'relances', label: 'Relances faites' },
  { id: 'reseau', label: 'Réseau activé' },
  { id: 'pitch', label: 'Pitch prêt' },
  { id: 'entretien', label: 'Entretien préparé' },
]

export interface NiveauDiagnostic {
  seuilMin: number
  emoji: string
  label: string
  conseil: string
}

export const niveauxDiagnostic: NiveauDiagnostic[] = [
  { seuilMin: 0, emoji: '🟥', label: 'Enquête à lancer', conseil: "Commencez par le socle : CV à jour et profil LinkedIn optimisé, avant toute campagne de candidatures." },
  { seuilMin: 4, emoji: '🟧', label: 'Enquête en cours', conseil: "Le socle est posé — concentrez-vous maintenant sur le ciblage : secteur, entreprises et jobboards." },
  { seuilMin: 7, emoji: '🟩', label: 'Enquête structurée', conseil: "La méthode est là — l'enjeu maintenant est la régularité : relances et activation du réseau." },
  { seuilMin: 10, emoji: '🕵️', label: 'Enquête avancée', conseil: "Vous êtes prêt à passer à l'oral — affinez votre pitch et préparez vos entretiens en priorité." },
]

export interface Obstacle {
  id: string
  label: string
  explication: string
  actions: string[]
  conseil: string
  priorite: 'Haute' | 'Moyenne' | 'Basse à moyenne'
}

export const obstacles: Obstacle[] = [
  {
    id: 'pas-objectif',
    label: 'Je ne sais pas quoi chercher',
    explication: "Un objectif flou rend toute recherche inefficace et difficile à cibler.",
    actions: ['Définir précisément secteur et type de stage', 'Lister 3 métiers qui vous intéressent', 'Comparer ces métiers aux compétences déjà acquises'],
    conseil: 'Repartez du Cours 1 (la boussole professionnelle) pour clarifier votre direction.',
    priorite: 'Haute',
  },
  {
    id: 'cv-pas-pret',
    label: "Mon CV n'est pas prêt",
    explication: "Sans support à jour, impossible de candidater rapidement quand une opportunité se présente.",
    actions: ['Finaliser le CV cette semaine', 'Le faire relire par un pair ou l\'intervenante', 'L\'adapter au secteur ciblé'],
    conseil: 'Visez une version prête avant toute campagne de candidatures.',
    priorite: 'Haute',
  },
  {
    id: 'pas-de-reponse',
    label: "Je postule mais je n'ai pas de réponse",
    explication: "Le nombre de candidatures ne suffit pas si elles ne sont pas ciblées ou relancées.",
    actions: ["Vérifier l'adaptation du CV à l'offre", 'Relancer après 7 jours', 'Diversifier les canaux', 'Demander un retour'],
    conseil: 'La qualité et le suivi comptent plus que le volume.',
    priorite: 'Moyenne',
  },
  {
    id: 'oser-contacter',
    label: "Je n'ose pas contacter des professionnels",
    explication: "Le réseau reste un des leviers les plus efficaces pour un stage, mais demande de sortir de sa zone de confort.",
    actions: ['Préparer un message court avant de contacter', "Commencer par des alumni ou des contacts indirects", 'S\'entraîner avec un pair'],
    conseil: 'Revoyez le Cours 5 pour adapter votre message à chaque interlocuteur.',
    priorite: 'Moyenne',
  },
  {
    id: 'pitch-difficile',
    label: 'Je ne sais pas comment me présenter à l\'oral',
    explication: "Un pitch mal préparé fait perdre en clarté et en impact dès le premier contact.",
    actions: ['Reprendre la structure en 5 points du Cours 5', 'S\'entraîner à voix haute', 'Chronométrer son pitch'],
    conseil: "La régularité de l'entraînement compte plus que la perfection.",
    priorite: 'Moyenne',
  },
  {
    id: 'manque-temps',
    label: 'Je manque de temps pour chercher',
    explication: "Sans créneaux dédiés, la recherche de stage passe après tout le reste.",
    actions: ['Bloquer 2 créneaux fixes par semaine', 'Créer des alertes automatiques sur les jobboards', 'Préparer des candidatures type à personnaliser rapidement'],
    conseil: "La régularité prime sur l'intensité ponctuelle.",
    priorite: 'Basse à moyenne',
  },
]

export const PLAN_30_JOURS_CHAMPS = [
  { cle: 'objectif', label: 'Mon objectif à 30 jours', placeholder: 'Ex. Trouver un stage en marketing ou relation client d\'ici 30 jours' },
  { cle: 'semaine1', label: 'Semaine 1', placeholder: 'Ex. Finaliser CV, optimiser LinkedIn, identifier 20 entreprises, créer 3 alertes' },
  { cle: 'semaine2', label: 'Semaine 2', placeholder: 'Ex. Envoyer 10 candidatures ciblées, contacter 3 alumni, améliorer le pitch' },
  { cle: 'semaine3', label: 'Semaine 3', placeholder: 'Ex. Relancer, élargir les secteurs, préparer les entretiens' },
  { cle: 'semaine4', label: 'Semaine 4', placeholder: 'Ex. Faire le point, ajuster, relancer, préparer les prochaines opportunités' },
  { cle: 'actionsPrioritaires', label: '3 actions prioritaires', placeholder: 'Les 3 actions à ne surtout pas repousser' },
  { cle: 'obstaclesSolutions', label: '2 obstacles possibles et leur solution', placeholder: 'Ex. manque de temps → bloquer 2 créneaux fixes par semaine' },
  { cle: 'engagement', label: '1 engagement concret dès la fin du cours', placeholder: 'Ex. envoyer ma première candidature avant vendredi' },
] as const
