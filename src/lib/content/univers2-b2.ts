// ── Mission 1 — Régler sa boussole ──────────────────────────────────────────
export const questionsBoussole: string[] = [
  'Quelle compétence utilisez-vous sans vous en rendre compte ?',
  'Quel projet vous a rendu fier ?',
  'Quel type d\'entreprise vous attire ?',
  'Quelle compétence aimeriez-vous développer cette année ?',
  'Quelle situation professionnelle vous met le plus à l\'aise ?',
  'Qu\'est-ce que vos proches diraient que vous faites naturellement bien ?',
  'Quel a été votre meilleur apprentissage de l\'année dernière ?',
  'Dans quel environnement de travail vous sentez-vous le plus efficace ?',
  'Quelle qualité personnelle pourrait devenir un vrai atout professionnel ?',
  'Quel métier vous ferait peur, mais vous attire en même temps ?',
  'Si vous deviez choisir une seule mission à défendre devant un recruteur, laquelle serait-ce ?',
  'Quel domaine aimeriez-vous explorer avant de vous fermer des portes ?',
  'Quelle critique avez-vous reçue qui, finalement, vous a fait progresser ?',
  'Quelle est la différence entre ce que vous savez faire et ce que vous aimez faire ?',
  'Quel collègue ou professeur a changé votre vision du travail ?',
]

// ── Mission 2 — Ouvrir son carnet de bord (Tribunal du recruteur) ──────────
export interface ProfilTribunal {
  id: number
  elements: string[]
  question: string
}

export const profilsTribunal: ProfilTribunal[] = [
  { id: 1, elements: ['Profil complet', 'Aucune photo', 'Titre : « Étudiant »'], question: 'Je contacte ou je ne contacte pas ?' },
  { id: 2, elements: ['Photo professionnelle', 'Titre clair et précis', 'Aucune activité récente'], question: 'Quelle impression cela donne-t-il ?' },
  { id: 3, elements: ['Photo de soirée entre amis', 'Titre : « Disponible immédiatement »', 'Résumé vide'], question: 'Que manque-t-il pour inspirer confiance ?' },
  { id: 4, elements: ['Pas de photo', 'Titre détaillé avec mots-clés métier', '3 recommandations visibles'], question: 'Le manque de photo est-il rédhibitoire ici ?' },
  { id: 5, elements: ['Photo professionnelle', 'Bannière personnalisée', 'Aucune expérience renseignée'], question: 'Le contenant compense-t-il l\'absence de contenu ?' },
  { id: 6, elements: ['Titre copié-collé d\'un camarade', 'Photo correcte', '2 publications partagées sans commentaire'], question: 'Qu\'est-ce que ce profil révèle sur la personne ?' },
  { id: 7, elements: ['Profil 100% complété', 'Photo professionnelle', 'Une publication originale par mois'], question: 'Qu\'est-ce qui distingue ce profil des autres ?' },
  { id: 8, elements: ['Aucune photo', 'Titre vague : « À la recherche d\'opportunités »', 'Beaucoup de contacts mais 0 interaction'], question: 'Quel est le problème principal de ce profil ?' },
]

// ── Mission 3 — Régler sa longue-vue (Salle des urgences LinkedIn) ─────────
export interface SituationUrgence {
  id: number
  titre: string
  contexte: string
  question: string
  choix?: string[]
}

export const situationsUrgence: SituationUrgence[] = [
  {
    id: 1,
    titre: 'Forum entreprise demain',
    contexte: 'Vous participez demain à un forum entreprise. Vous ne pouvez améliorer qu\'un seul élément de votre profil.',
    question: 'Lequel choisissez-vous ? Pourquoi ?',
    choix: ['Photo', 'Bannière', 'Titre', 'Résumé'],
  },
  {
    id: 2,
    titre: '15 secondes chrono',
    contexte: 'Un recruteur consulte votre profil pendant 15 secondes.',
    question: 'Que doit-il retenir de vous en si peu de temps ?',
  },
  {
    id: 3,
    titre: 'Alternance dans 2 mois',
    contexte: 'Vous recherchez une alternance dans 2 mois.',
    question: 'Quels sont les trois éléments prioritaires à améliorer dès maintenant ?',
  },
  {
    id: 4,
    titre: 'Commencer à publier',
    contexte: 'Vous souhaitez commencer à publier sur LinkedIn pour la première fois.',
    question: 'Quel sujet pourriez-vous aborder naturellement, sans forcer ?',
  },
  {
    id: 5,
    titre: 'Visite du dirigeant',
    contexte: 'Votre profil est visité par le dirigeant d\'une entreprise qui vous intéresse particulièrement.',
    question: 'Quelle est votre plus grande force visible sur votre profil aujourd\'hui ?',
  },
  {
    id: 6,
    titre: 'Une rubrique à supprimer',
    contexte: 'Vous devez supprimer une rubrique de votre profil pour le simplifier.',
    question: 'Laquelle retirez-vous en dernier ? Pourquoi celle-là est-elle la plus précieuse ?',
  },
  {
    id: 7,
    titre: '30 minutes chrono',
    contexte: 'Vous n\'avez que 30 minutes pour améliorer votre profil avant un entretien important.',
    question: 'Que faites-vous en priorité, dans cet ordre précis ?',
  },
]
