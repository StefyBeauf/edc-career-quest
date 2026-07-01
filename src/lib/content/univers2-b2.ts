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

// ── Mission 2 — Illustrations de profil ─────────────────────────────────────
export interface ProfilAvatar {
  emoji: string
  bgHex: string
  label: string
}
export const profilsAvatars: Record<number, ProfilAvatar> = {
  1: { emoji: '👩‍🎓', bgHex: '#3b82f6', label: 'L\'étudiant standard' },
  2: { emoji: '👨‍💼', bgHex: '#10b981', label: 'Le sobre discret' },
  3: { emoji: '🎉', bgHex: '#f59e0b', label: 'Le profil décalé' },
  4: { emoji: '🎯', bgHex: '#8b5cf6', label: 'Le stratège sans visage' },
  5: { emoji: '✨', bgHex: '#06b6d4', label: 'La belle vitrine vide' },
  6: { emoji: '🪞', bgHex: '#f43f5e', label: 'Le clone' },
  7: { emoji: '⭐', bgHex: '#22c55e', label: 'Le profil modèle' },
  8: { emoji: '👻', bgHex: '#6b7280', label: 'Le fantôme connecté' },
}

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

// ── Mission 3 — Thématiques de post LinkedIn ──────────────────────────────
export interface ThematiquePost {
  id: number
  icone: string
  angle: string
  invite: string
}

export const thematiquesPostLinkedIn: ThematiquePost[] = [
  { id: 1, icone: '🧭', angle: 'Rétrospective', invite: 'Quel apprentissage inattendu avez-vous fait cette année — et que vous n\'attendiez pas du tout ?' },
  { id: 2, icone: '💡', angle: 'Conviction', invite: 'Quelle idée reçue sur votre secteur d\'activité avez-vous envie de déconstruire ?' },
  { id: 3, icone: '🤔', angle: 'Question ouverte', invite: 'Si vous pouviez poser une seule question à un professionnel de votre secteur, laquelle serait-ce ?' },
  { id: 4, icone: '🔁', angle: 'Avant / Après', invite: 'Comment votre vision d\'un métier ou d\'un secteur a-t-elle changé depuis que vous êtes en école ?' },
  { id: 5, icone: '🎯', angle: 'Décision', invite: 'Qu\'avez-vous décidé d\'arrêter de faire — ou de commencer — pour progresser professionnellement ?' },
  { id: 6, icone: '📚', angle: 'Ressource', invite: 'Quel contenu (livre, podcast, article, vidéo) a changé votre façon de voir votre carrière ?' },
  { id: 7, icone: '🧑‍🤝‍🧑', angle: 'Rencontre', invite: 'Une personne qui vous a appris quelque chose d\'essentiel sur le monde professionnel — sans être votre prof.' },
  { id: 8, icone: '🚀', angle: 'Ambition', invite: 'Dans quel domaine voulez-vous devenir vraiment compétent d\'ici deux ans, et pourquoi ?' },
  { id: 9, icone: '😬', angle: 'Erreur apprise', invite: 'Une erreur que vous avez commise et qui vous a finalement appris plus que n\'importe quel cours.' },
  { id: 10, icone: '🌍', angle: 'Tendance', invite: 'Quelle évolution du marché du travail vous préoccupe — ou au contraire vous enthousiasme — pour les 5 prochaines années ?' },
  { id: 11, icone: '🎭', angle: 'Décalage', invite: 'Quelle est la plus grande différence entre ce que vous imaginiez du monde pro avant l\'école et ce que vous observez aujourd\'hui ?' },
  { id: 12, icone: '⚡', angle: 'Prise de position', invite: 'Sur quoi avez-vous un avis tranché en matière de travail, de management ou de recherche d\'emploi ?' },
]
