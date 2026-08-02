// ── Cours 1 — La boussole professionnelle (B2 + PGE2, S1, aventure) ────────

export interface DirectionBoussole {
  code: 'nord' | 'est' | 'sud' | 'ouest'
  label: string
  theme: string
  icone: string
  questions: string[]
  exemples: string[]
}

export const directionsBoussole: DirectionBoussole[] = [
  {
    code: 'nord',
    label: 'Nord',
    theme: 'Qui suis-je ?',
    icone: '🧭',
    questions: [
      'Quelles sont tes principales qualités ?',
      'Comment tes proches te décriraient-ils ?',
      'Quelle valeur défends-tu naturellement, sans même y penser ?',
    ],
    exemples: ['Curieux', 'Organisé', 'Fiable', 'À l\'écoute', 'Déterminé'],
  },
  {
    code: 'est',
    label: 'Est',
    theme: 'Ce que je sais faire',
    icone: '🧭',
    questions: [
      'Quelles compétences as-tu déjà développées ?',
      'Que sais-tu faire grâce à tes stages, jobs, projets ?',
      'Quelle tâche te demande le moins d\'effort, alors qu\'elle en demande beaucoup aux autres ?',
    ],
    exemples: ['Travailler en équipe', 'Utiliser Canva', 'Présenter à l\'oral', 'Organiser un événement'],
  },
  {
    code: 'sud',
    label: 'Sud',
    theme: 'Ce qui me motive',
    icone: '🧭',
    questions: [
      'Qu\'est-ce qui te donne envie d\'avancer ?',
      'Quelles missions apprécies-tu ?',
      'Dans quel contexte perds-tu la notion du temps ?',
    ],
    exemples: ['Résoudre des problèmes', 'Créer du lien', 'Voir un résultat concret', 'Apprendre en continu'],
  },
  {
    code: 'ouest',
    label: 'Ouest',
    theme: 'Où je veux aller',
    icone: '🧭',
    questions: [
      'Quel secteur t\'attire aujourd\'hui ?',
      'Quel type de métier aimerais-tu découvrir ?',
      'Si aucune porte ne t\'était fermée, quelle direction explorerais-tu en premier ?',
    ],
    exemples: ['Marketing digital', 'Relation client', 'Événementiel', 'Communication', 'Ressources humaines'],
  },
]

export interface ProfilAventurier {
  id: string
  nom: string
  emoji: string
  description: string
  forces: string[]
  environnements: string[]
  vigilance: string
  phrase: string
}

export const profilsAventuriers: ProfilAventurier[] = [
  {
    id: 'explorateur',
    nom: "L'explorateur curieux",
    emoji: '🔎',
    description: 'Tu aimes découvrir, apprendre, tester de nouvelles pistes avant de te fixer.',
    forces: ['Ouverture d\'esprit', 'Adaptabilité', 'Envie d\'apprendre'],
    environnements: ['Start-up', 'Poste polyvalent', 'Secteurs en évolution rapide'],
    vigilance: 'Peut avoir du mal à se fixer sur une seule direction trop tôt.',
    phrase: "Je suis quelqu'un de curieux, à l'aise pour découvrir de nouveaux environnements et apprendre vite.",
  },
  {
    id: 'batisseur',
    nom: 'Le bâtisseur organisé',
    emoji: '🧱',
    description: 'Tu structures, planifies, et aimes que les choses avancent avec méthode.',
    forces: ['Organisation', 'Fiabilité', 'Sens du détail'],
    environnements: ['Gestion de projet', 'Administration', 'Grands groupes structurés'],
    vigilance: 'Peut se sentir mal à l\'aise face à l\'imprévu ou au changement rapide.',
    phrase: 'Je suis une personne organisée et fiable, à l\'aise pour structurer un projet du début à la fin.',
  },
  {
    id: 'communicant',
    nom: 'Le communicant',
    emoji: '🗣️',
    description: 'Tu aimes échanger, convaincre, mettre en relation.',
    forces: ['Aisance relationnelle', 'Sens de l\'écoute', 'Clarté à l\'oral'],
    environnements: ['Relation client', 'Communication', 'Événementiel'],
    vigilance: 'Peut privilégier la relation au détriment du fond si elle n\'y prend pas garde.',
    phrase: 'Je suis une personne à l\'aise avec les autres, qui aime créer du lien et faire circuler l\'information.',
  },
  {
    id: 'createur',
    nom: 'Le créatif',
    emoji: '🎨',
    description: 'Tu proposes des idées, tu aimes sortir des sentiers battus.',
    forces: ['Créativité', 'Sens esthétique', 'Prise d\'initiative'],
    environnements: ['Marketing digital', 'Communication', 'Design'],
    vigilance: 'Peut avoir besoin d\'un cadre pour transformer ses idées en actions concrètes.',
    phrase: 'Je suis une personne créative, qui aime proposer des idées et sortir du cadre habituel.',
  },
  {
    id: 'strategue',
    nom: 'Le stratège',
    emoji: '♟️',
    description: 'Tu analyses avant d\'agir, tu cherches à comprendre les enjeux avant de te lancer.',
    forces: ['Analyse', 'Esprit de synthèse', 'Prise de recul'],
    environnements: ['Conseil', 'Finance', 'Étude de marché'],
    vigilance: 'Peut prendre trop de temps à analyser avant de passer à l\'action.',
    phrase: 'Je suis une personne analytique, qui prend le temps de comprendre une situation avant d\'agir.',
  },
  {
    id: 'connecteur',
    nom: 'Le connecteur',
    emoji: '🤝',
    description: 'Tu aimes fédérer, mettre les bonnes personnes en relation, faire avancer un groupe.',
    forces: ['Esprit d\'équipe', 'Sens du collectif', 'Diplomatie'],
    environnements: ['Ressources humaines', 'Management de projet', 'Associatif'],
    vigilance: 'Peut avoir tendance à s\'effacer derrière le collectif plutôt que de se mettre en avant.',
    phrase: 'Je suis une personne fédératrice, qui aime faire avancer un groupe et créer des ponts entre les gens.',
  },
]

export const CAP_CHAMPS = [
  { cle: 'caracterise', label: 'Ce qui me caractérise', placeholder: 'Ex. curieux, organisé, à l\'aise en équipe…' },
  { cle: 'saisFaire', label: 'Ce que je sais faire', placeholder: 'Ex. gérer un projet, prendre la parole en public…' },
  { cle: 'motive', label: 'Ce qui me motive', placeholder: 'Ex. résoudre des problèmes concrets, créer du lien…' },
  { cle: 'direction', label: 'La direction à explorer', placeholder: 'Ex. marketing digital, relation client…' },
] as const
