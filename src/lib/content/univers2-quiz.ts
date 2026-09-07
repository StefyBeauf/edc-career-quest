// ── Cours 1 — Mini quiz de personnalité professionnelle (B2 + PGE2, S1, aventure, Temps 2) ────────

export type LettreProfil = 'A' | 'B' | 'C' | 'D'

export interface ReponseQuiz {
  lettre: LettreProfil
  texte: string
}

export interface QuestionQuiz {
  id: number
  texte: string
  reponses: ReponseQuiz[]
}

export interface ResultatProfil {
  nom: string
  emoji: string
  traduction: string
  apports: string[]
  valorisation: string[]
  vigilance: string
  phrase: string
}

export const QUIZ_INTRO =
  "Répondez spontanément aux 20 questions. Il n'y a pas de bonne ou de mauvaise réponse. Ce quiz vous aide à identifier votre profil professionnel dominant et vos points d'appui pour progresser."

export const QUIZ_PRECAUTION =
  "Ce résultat n'est pas une étiquette définitive. Il sert à t'aider à mieux comprendre tes points d'appui et à préparer ta présentation orale."

export const questionsQuiz: QuestionQuiz[] = [
  {
    id: 1,
    texte: 'Dans un projet de groupe, tu es plutôt celui/celle qui…',
    reponses: [
      { lettre: 'A', texte: "lance l'action" },
      { lettre: 'B', texte: 'organise les étapes' },
      { lettre: 'C', texte: 'propose des idées' },
      { lettre: 'D', texte: 'fait circuler la parole' },
    ],
  },
  {
    id: 2,
    texte: "Face à une deadline serrée, ton premier réflexe est de…",
    reponses: [
      { lettre: 'A', texte: 'te lancer immédiatement pour avancer vite' },
      { lettre: 'B', texte: 'découper la tâche en étapes planifiées' },
      { lettre: 'C', texte: 'chercher un raccourci ou une méthode différente' },
      { lettre: 'D', texte: "vérifier que tout le monde est aligné avant de foncer" },
    ],
  },
  {
    id: 3,
    texte: "Un imprévu bouleverse ton planning. Tu réagis en…",
    reponses: [
      { lettre: 'A', texte: "improvisant une solution sur le moment" },
      { lettre: 'B', texte: 'réajustant méthodiquement le planning' },
      { lettre: 'C', texte: 'y voyant une occasion de faire autrement' },
      { lettre: 'D', texte: "prévenant les autres pour s'organiser ensemble" },
    ],
  },
  {
    id: 4,
    texte: 'Dans une réunion, tu prends la parole surtout pour…',
    reponses: [
      { lettre: 'A', texte: 'pousser à la décision et à l\'action' },
      { lettre: 'B', texte: 'rappeler les objectifs et le cadre' },
      { lettre: 'C', texte: 'apporter une idée à laquelle personne n\'a pensé' },
      { lettre: 'D', texte: "t'assurer que chacun a pu s'exprimer" },
    ],
  },
  {
    id: 5,
    texte: "Ce qui te motive le plus dans un projet, c'est…",
    reponses: [
      { lettre: 'A', texte: 'voir un résultat concret rapidement' },
      { lettre: 'B', texte: 'un cadre clair et une progression maîtrisée' },
      { lettre: 'C', texte: 'la possibilité d\'explorer et d\'innover' },
      { lettre: 'D', texte: 'la qualité des échanges avec l\'équipe' },
    ],
  },
  {
    id: 6,
    texte: 'Quand un membre du groupe est en difficulté, tu…',
    reponses: [
      { lettre: 'A', texte: "prends le relais pour que ça avance" },
      { lettre: 'B', texte: 'lui proposes une méthode ou un plan clair' },
      { lettre: 'C', texte: "cherches avec lui une autre manière de faire" },
      { lettre: 'D', texte: "prends le temps de l'écouter d'abord" },
    ],
  },
  {
    id: 7,
    texte: "Ton style de travail préféré ressemble plutôt à…",
    reponses: [
      { lettre: 'A', texte: "un rythme rapide, orienté résultats" },
      { lettre: 'B', texte: "une organisation carrée, avec des points d'étape" },
      { lettre: 'C', texte: 'une liberté pour tester et ajuster' },
      { lettre: 'D', texte: 'un travail en lien constant avec les autres' },
    ],
  },
  {
    id: 8,
    texte: "Face à un désaccord dans l'équipe, tu as tendance à…",
    reponses: [
      { lettre: 'A', texte: 'trancher pour ne pas perdre de temps' },
      { lettre: 'B', texte: "t'appuyer sur les règles ou les faits établis" },
      { lettre: 'C', texte: 'proposer une troisième option inattendue' },
      { lettre: 'D', texte: 'chercher un compromis qui satisfasse tout le monde' },
    ],
  },
  {
    id: 9,
    texte: 'On te confie une tâche floue, sans consignes précises. Tu…',
    reponses: [
      { lettre: 'A', texte: "commences par agir, tu ajusteras en chemin" },
      { lettre: 'B', texte: 'demandes un cadrage précis avant de démarrer' },
      { lettre: 'C', texte: "l'interprètes à ta façon, avec créativité" },
      { lettre: 'D', texte: "en discutes avec d'autres pour clarifier ensemble" },
    ],
  },
  {
    id: 10,
    texte: 'Ce que tes camarades apprécient le plus chez toi en groupe, c\'est…',
    reponses: [
      { lettre: 'A', texte: "ton énergie et ta capacité à faire avancer les choses" },
      { lettre: 'B', texte: 'ta fiabilité et ton sens de l\'organisation' },
      { lettre: 'C', texte: 'tes idées et ta capacité à sortir du cadre' },
      { lettre: 'D', texte: 'ton écoute et ta capacité à fédérer' },
    ],
  },
  {
    id: 11,
    texte: 'Devant un échec ou un résultat décevant, ta première réaction est de…',
    reponses: [
      { lettre: 'A', texte: 'rebondir tout de suite sur une nouvelle action' },
      { lettre: 'B', texte: 'analyser précisément ce qui a dysfonctionné' },
      { lettre: 'C', texte: "chercher une approche complètement différente" },
      { lettre: 'D', texte: "en parler avec le groupe pour en tirer des leçons ensemble" },
    ],
  },
  {
    id: 12,
    texte: "Dans une négociation ou une prise de parole difficile, tu es plutôt…",
    reponses: [
      { lettre: 'A', texte: 'direct·e, tu vas droit au but' },
      { lettre: 'B', texte: "structuré·e, tu prépares des arguments solides" },
      { lettre: 'C', texte: "original·e, tu trouves un angle différent" },
      { lettre: 'D', texte: "diplomate, tu cherches à préserver la relation" },
    ],
  },
  {
    id: 13,
    texte: 'Un nouvel outil ou une nouvelle méthode arrive dans ton équipe. Tu…',
    reponses: [
      { lettre: 'A', texte: "l'adoptes vite si elle fait gagner du temps" },
      { lettre: 'B', texte: "prends le temps de bien la maîtriser avant de l'utiliser" },
      { lettre: 'C', texte: "explores toutes ses possibilités, même détournées" },
      { lettre: 'D', texte: "regardes comment les autres s'en servent avant de te lancer" },
    ],
  },
  {
    id: 14,
    texte: "Ce qui t'agace le plus dans un travail de groupe, c'est…",
    reponses: [
      { lettre: 'A', texte: "la lenteur ou l'absence de décision" },
      { lettre: 'B', texte: "le manque d'organisation et les imprévus mal gérés" },
      { lettre: 'C', texte: "les idées imposées sans discussion" },
      { lettre: 'D', texte: "les tensions non exprimées entre les membres" },
    ],
  },
  {
    id: 15,
    texte: "Pour préparer une présentation orale, tu préfères…",
    reponses: [
      { lettre: 'A', texte: 'aller à l\'essentiel, sans trop de détails' },
      { lettre: 'B', texte: 'construire un plan précis, étape par étape' },
      { lettre: 'C', texte: 'trouver une accroche originale pour capter l\'attention' },
      { lettre: 'D', texte: "penser d'abord à ce qui va parler à ton auditoire" },
    ],
  },
  {
    id: 16,
    texte: 'Dans une équipe, le rôle que tu prends le plus naturellement est…',
    reponses: [
      { lettre: 'A', texte: 'moteur, tu donnes le tempo' },
      { lettre: 'B', texte: "pilier, tu structures et sécurises l'avancement" },
      { lettre: 'C', texte: "sherpa d'idées, tu ouvres des pistes" },
      { lettre: 'D', texte: "lien, tu relies les personnes entre elles" },
    ],
  },
  {
    id: 17,
    texte: "Quand tu reçois un retour critique sur ton travail, tu…",
    reponses: [
      { lettre: 'A', texte: "l'intègres vite pour passer à l'action suivante" },
      { lettre: 'B', texte: "l'analyses point par point avant de corriger" },
      { lettre: 'C', texte: "le prends comme une occasion de repenser ton approche" },
      { lettre: 'D', texte: "en discutes pour bien comprendre l'intention derrière" },
    ],
  },
  {
    id: 18,
    texte: 'Ton énergie professionnelle est la plus forte quand…',
    reponses: [
      { lettre: 'A', texte: "il y a un objectif clair à atteindre vite" },
      { lettre: 'B', texte: "tout est cadré et bien préparé" },
      { lettre: 'C', texte: "tu peux proposer, tester, réinventer" },
      { lettre: 'D', texte: "tu travailles avec et pour d'autres personnes" },
    ],
  },
  {
    id: 19,
    texte: "Face à une décision à prendre rapidement en groupe, tu…",
    reponses: [
      { lettre: 'A', texte: "proposes de trancher pour avancer" },
      { lettre: 'B', texte: "listes les critères objectifs pour décider" },
      { lettre: 'C', texte: "suggères une option à laquelle personne n'avait pensé" },
      { lettre: 'D', texte: "t'assures que la décision est acceptée par tous" },
    ],
  },
  {
    id: 20,
    texte: 'Dans dix ans, tu aimerais qu\'on se souvienne de toi comme quelqu\'un qui…',
    reponses: [
      { lettre: 'A', texte: 'a fait avancer les choses concrètement' },
      { lettre: 'B', texte: "a été un point d'appui fiable pour son équipe" },
      { lettre: 'C', texte: 'a apporté des idées neuves' },
      { lettre: 'D', texte: "a su réunir et faire grandir les gens autour de lui/elle" },
    ],
  },
]

export const resultatsQuiz: Record<LettreProfil, ResultatProfil> = {
  A: {
    nom: "Le moteur de l'expédition",
    emoji: '🚀',
    traduction: 'Orienté action, initiative et résultat',
    apports: [
      "Une énergie qui donne le tempo et débloque les situations qui stagnent",
      "Une capacité à transformer une idée en action concrète, rapidement",
      "Une prise d'initiative naturelle quand personne ne se lance",
      "Une orientation résultat qui garde le groupe focalisé sur l'objectif",
    ],
    valorisation: [
      'Prise de décision rapide',
      'Sens du résultat',
      'Autonomie',
      'Capacité à motiver par l\'action',
      'Gestion de l\'urgence',
    ],
    vigilance: "Peut avancer trop vite et bousculer des membres de l'équipe qui ont besoin de plus de cadrage ou de concertation.",
    phrase: "Dans un contexte professionnel, mon énergie peut m'aider à…",
  },
  B: {
    nom: 'Le gardien de la carte',
    emoji: '🗺️',
    traduction: 'Organisé, fiable et structurant',
    apports: [
      "Une méthode claire qui sécurise l'avancement du groupe",
      "Une fiabilité qui rassure sur le respect des délais et des engagements",
      "Un sens du détail qui évite les oublis et les erreurs coûteuses",
      "Une capacité à transformer un objectif flou en plan d'action concret",
    ],
    valorisation: [
      'Organisation et planification',
      'Fiabilité',
      'Rigueur',
      'Gestion des priorités',
      'Anticipation des risques',
    ],
    vigilance: "Peut se sentir mal à l'aise face à l'imprévu et avoir du mal à lâcher le cadre quand la situation change vite.",
    phrase: "Dans un contexte professionnel, ma rigueur peut m'aider à…",
  },
  C: {
    nom: "L'éclaireur d'idées",
    emoji: '💡',
    traduction: 'Créatif, curieux et adaptable',
    apports: [
      "Un regard neuf qui débloque les problèmes où les solutions habituelles échouent",
      "Une curiosité qui pousse le groupe à explorer d'autres pistes",
      "Une adaptabilité qui facilite les changements de direction",
      "Une capacité à reformuler un problème pour le rendre plus simple",
    ],
    valorisation: [
      'Créativité',
      'Adaptabilité',
      'Esprit d\'innovation',
      'Curiosité',
      'Capacité à sortir du cadre',
    ],
    vigilance: "Peut se disperser entre plusieurs idées et avoir besoin d'un cadre extérieur pour aller au bout d'une proposition.",
    phrase: "Dans un contexte professionnel, ma créativité peut m'aider à…",
  },
  D: {
    nom: 'Le créateur de liens',
    emoji: '🤝',
    traduction: 'Relationnel, coopératif et communicant',
    apports: [
      "Une écoute qui permet à chacun de trouver sa place dans le groupe",
      "Une capacité à désamorcer les tensions avant qu'elles ne s'installent",
      "Un sens du collectif qui aligne les efforts individuels vers l'objectif commun",
      "Une communication claire qui fait circuler l'information utile",
    ],
    valorisation: [
      'Aisance relationnelle',
      'Communication',
      'Esprit d\'équipe',
      'Médiation',
      'Sens de l\'écoute',
    ],
    vigilance: "Peut privilégier l'harmonie du groupe au détriment d'une décision nécessaire, même si elle est inconfortable.",
    phrase: "Dans un contexte professionnel, mon relationnel peut m'aider à…",
  },
}
