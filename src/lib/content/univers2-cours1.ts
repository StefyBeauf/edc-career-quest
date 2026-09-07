// ── Cours 1 — La boussole professionnelle (B2 + PGE2, S1, aventure) ────────

export interface QuestionBoussole {
  texte: string
  aide: string
  pistes: string[]
  relance: string
}

export interface DirectionBoussole {
  code: 'nord' | 'est' | 'sud' | 'ouest'
  label: string
  theme: string
  icone: string
  questions: QuestionBoussole[]
}

export const directionsBoussole: DirectionBoussole[] = [
  {
    code: 'nord',
    label: 'Nord',
    theme: 'Qui suis-je ?',
    icone: '🧭',
    questions: [
      {
        texte: 'Quelles sont tes principales qualités ?',
        aide: 'Pense à ce que les autres remarquent chez toi sans que tu aies besoin de le dire.',
        pistes: [
          'Une qualité que ton entourage cite souvent à ton sujet',
          'Une qualité que tu mobilises naturellement dans un travail de groupe',
          'Une qualité révélée par une situation difficile que tu as traversée',
          'Une qualité que tu sous-estimes mais que les autres valorisent',
        ],
        relance: 'Peux-tu relier cette qualité à une situation concrète que tu pourrais raconter en entretien ?',
      },
      {
        texte: 'Comment tes proches te décriraient-ils ?',
        aide: 'Imagine un ami, un membre de ta famille et un professeur qui parlent de toi séparément.',
        pistes: [
          'Ce que dirait un ami proche sur ta façon d\'être en groupe',
          'Ce que dirait un professeur sur ta façon de travailler',
          'Ce que dirait un membre de ta famille sur ta personnalité au quotidien',
          'Un point commun entre ces trois regards',
        ],
        relance: 'Y a-t-il un écart entre l\'image que tu as de toi et celle que les autres renvoient ?',
      },
      {
        texte: 'Quelle valeur défends-tu naturellement, sans même y penser ?',
        aide: 'Pense à une situation où tu as réagi fort, positivement ou négativement, face à une injustice ou un manque de respect.',
        pistes: [
          'Une valeur que tu défends même quand ce n\'est pas confortable',
          'Une règle que tu ne transiges jamais, même sous pression',
          'Une situation où cette valeur a guidé une décision que tu as prise',
          'Une valeur que tu recherches chez les personnes avec qui tu travailles',
        ],
        relance: 'Comment cette valeur pourrait-elle transparaître dans le choix de ton futur environnement de travail ?',
      },
    ],
  },
  {
    code: 'est',
    label: 'Est',
    theme: 'Ce que je sais faire',
    icone: '🧭',
    questions: [
      {
        texte: 'Quelles compétences as-tu déjà développées ?',
        aide: 'Pense à un moment où tu as dû apprendre quelque chose de nouveau.',
        pistes: [
          'Un projet d\'équipe où tu as dû te faire entendre',
          'Un stage ou une alternance où tu as acquis une vraie expertise',
          'Un projet scolaire où tu as pris un rôle de leader ou d\'expert',
          'Une activité extrascolaire qui t\'a permis de développer une force',
        ],
        relance: 'Comment peux-tu illustrer cette compétence lors d\'un entretien d\'embauche ?',
      },
      {
        texte: 'Que sais-tu faire grâce à tes stages, jobs, projets ?',
        aide: 'Reviens sur une expérience concrète, même courte, et sur ce qu\'elle t\'a appris à faire.',
        pistes: [
          'Une tâche que tu maîtrises mieux aujourd\'hui qu\'il y a un an',
          'Un outil ou une méthode que tu as appris à utiliser sur le terrain',
          'Une situation où on t\'a confié une responsabilité inattendue',
          'Un retour positif reçu sur une compétence précise',
        ],
        relance: 'Cette compétence est-elle transférable à d\'autres secteurs que celui où tu l\'as développée ?',
      },
      {
        texte: 'Quelle tâche te demande le moins d\'effort, alors qu\'elle en demande beaucoup aux autres ?',
        aide: 'Cherche une activité où tu es souvent celui ou celle qu\'on sollicite en premier.',
        pistes: [
          'Une tâche technique que tu exécutes plus vite que la moyenne',
          'Une tâche relationnelle où on te sollicite naturellement',
          'Un rôle que tu prends spontanément dans un groupe (organiser, structurer, arbitrer)',
          'Une compétence que tu n\'as jamais pensé à valoriser sur un CV',
        ],
        relance: 'Pourquoi cette facilité pourrait-elle être une vraie valeur ajoutée pour un employeur ?',
      },
    ],
  },
  {
    code: 'sud',
    label: 'Sud',
    theme: 'Ce qui me motive',
    icone: '🧭',
    questions: [
      {
        texte: 'Qu\'est-ce qui te donne envie d\'avancer ?',
        aide: 'Pense à un moment où tu t\'es senti particulièrement engagé, sans avoir besoin qu\'on te pousse.',
        pistes: [
          'Un projet où tu t\'es investi bien au-delà de ce qui était demandé',
          'Un objectif personnel qui t\'a poussé à te dépasser',
          'Un moment où atteindre un résultat concret t\'a procuré une vraie satisfaction',
          'Une cause ou un sujet qui t\'anime particulièrement',
        ],
        relance: 'Dans quel type de mission retrouverais-tu ce même moteur ?',
      },
      {
        texte: 'Quelles missions apprécies-tu ?',
        aide: 'Distingue ce que tu fais par obligation de ce que tu ferais même sans y être obligé.',
        pistes: [
          'Une mission où le temps passe vite pour toi',
          'Une mission qui te permet de créer quelque chose de concret',
          'Une mission où tu travailles avec ou pour d\'autres personnes',
          'Une mission qui te fait apprendre en continu',
        ],
        relance: 'Ce type de mission existe-t-il dans le secteur que tu envisages aujourd\'hui ?',
      },
      {
        texte: 'Dans quel contexte perds-tu la notion du temps ?',
        aide: 'Repense à une activité, professionnelle ou non, où tu étais totalement absorbé.',
        pistes: [
          'Un contexte où tu es en autonomie sur une tâche précise',
          'Un contexte où tu résous un problème concret étape par étape',
          'Un contexte où tu es en interaction directe avec d\'autres personnes',
          'Un contexte créatif où tu peux proposer, tester, ajuster',
        ],
        relance: 'Qu\'est-ce que ce contexte révèle sur l\'environnement de travail qui te correspond ?',
      },
    ],
  },
  {
    code: 'ouest',
    label: 'Ouest',
    theme: 'Où je veux aller',
    icone: '🧭',
    questions: [
      {
        texte: 'Quel secteur t\'attire aujourd\'hui ?',
        aide: 'Pense à un secteur dont tu suis l\'actualité, même sans lien direct avec tes études.',
        pistes: [
          'Un secteur que tu observes déjà par curiosité (actualités, réseaux, discussions)',
          'Un secteur en lien avec une expérience ou une rencontre marquante',
          'Un secteur qui correspond à une valeur ou une cause qui te tient à cœur',
          'Un secteur que tu n\'as jamais exploré mais qui t\'intrigue',
        ],
        relance: 'Quelle serait ta prochaine action concrète pour en apprendre plus sur ce secteur ?',
      },
      {
        texte: 'Quel type de métier aimerais-tu découvrir ?',
        aide: 'Pense à un métier que tu connais mal, mais dont le quotidien t\'intrigue.',
        pistes: [
          'Un métier découvert lors d\'un stage, d\'un cours ou d\'une rencontre',
          'Un métier qui combine deux de tes centres d\'intérêt',
          'Un métier que tu associes à une personne qui t\'inspire',
          'Un métier dont tu ne connais que le nom, à approfondir',
        ],
        relance: 'Qui pourrais-tu contacter pour en savoir plus sur le quotidien réel de ce métier ?',
      },
      {
        texte: 'Si aucune porte ne t\'était fermée, quelle direction explorerais-tu en premier ?',
        aide: 'Mets de côté un instant les contraintes (diplôme, expérience, réseau) et pense grand.',
        pistes: [
          'Une direction qui te semble ambitieuse mais qui te fait rêver',
          'Une direction proche de ce que tu fais déjà, mais poussée plus loin',
          'Une direction totalement différente de ton parcours actuel',
          'Une direction que tu explorerais d\'abord en freelance, associatif ou bénévolat',
        ],
        relance: 'Quelle est la première étape réaliste pour te rapprocher de cette direction ?',
      },
    ],
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
