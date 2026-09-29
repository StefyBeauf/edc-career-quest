// ── Univers 3 — "La Mission" (B3) — V3.3 ────────────────────────────────────
// Contenu 100% statique et scénaristique. Aucun traitement IA (interdiction stricte V3.3).

// ═══ Mission 1 — Communication professionnelle sensible ════════════════════

export interface SituationCommunication {
  id: string
  domaine: 'relance' | 'retard' | 'erreur' | 'désaccord' | 'incompréhension' | 'feedback' | 'clarification'
  domaineLabel: string
  contexte: string
  destinataire: string
  canalRecommande: 'email' | 'message' | 'appel' | 'en personne'
  pourquoiCeCanal: string
}

export const situationsCommunication: SituationCommunication[] = [
  {
    id: 'relance-devis',
    domaine: 'relance',
    domaineLabel: 'Relance',
    contexte: "Vous attendez une réponse d'un partenaire externe depuis 10 jours sur un devis urgent, sans nouvelles.",
    destinataire: 'Un prestataire externe',
    canalRecommande: 'email',
    pourquoiCeCanal: "Une trace écrite est utile pour un suivi commercial, et l'email laisse le temps de répondre sans pression.",
  },
  {
    id: 'retard-livrable',
    domaine: 'retard',
    domaineLabel: 'Retard',
    contexte: "Vous savez que vous allez rendre un livrable avec 2 jours de retard sur une échéance partagée avec votre équipe.",
    destinataire: 'Votre manager',
    canalRecommande: 'message',
    pourquoiCeCanal: "Un message rapide permet d'alerter tôt ; à compléter par un point oral si l'impact est important.",
  },
  {
    id: 'erreur-chiffre',
    domaine: 'erreur',
    domaineLabel: 'Erreur',
    contexte: "Vous réalisez qu'un chiffre erroné a été transmis à un client dans un document envoyé hier.",
    destinataire: 'Un client externe',
    canalRecommande: 'appel',
    pourquoiCeCanal: "Une erreur sensible avec un client se rattrape mieux à l'oral, avant un écrit de confirmation.",
  },
  {
    id: 'desaccord-priorite',
    domaine: 'désaccord',
    domaineLabel: 'Désaccord',
    contexte: "Vous n'êtes pas d'accord avec la priorité fixée par votre responsable sur le projet en cours.",
    destinataire: 'Votre responsable',
    canalRecommande: 'en personne',
    pourquoiCeCanal: "Un désaccord hiérarchique se discute mieux en direct, pour garder le ton et éviter les malentendus écrits.",
  },
  {
    id: 'incomprehension-consigne',
    domaine: 'incompréhension',
    domaineLabel: 'Incompréhension',
    contexte: "Vous ne comprenez pas exactement ce qu'attend un collègue d'une autre équipe sur une tâche partagée.",
    destinataire: "Un collègue d'une autre équipe",
    canalRecommande: 'message',
    pourquoiCeCanal: "Une question de clarification rapide se traite bien par message, sans mobiliser un rendez-vous.",
  },
  {
    id: 'feedback-collegue',
    domaine: 'feedback',
    domaineLabel: 'Feedback',
    contexte: "Vous devez donner un retour constructif à un collègue sur une présentation qui manquait de clarté.",
    destinataire: 'Un pair de votre équipe',
    canalRecommande: 'en personne',
    pourquoiCeCanal: "Un feedback constructif passe mieux en direct, où le ton et l'écoute peuvent s'ajuster.",
  },
  {
    id: 'clarification-mission',
    domaine: 'clarification',
    domaineLabel: 'Demande de clarification',
    contexte: "Le périmètre exact d'une mission qu'on vous a confiée reste flou après le brief initial.",
    destinataire: 'Votre manager',
    canalRecommande: 'email',
    pourquoiCeCanal: "Formaliser la demande par écrit permet d'obtenir un périmètre clair et traçable.",
  },
]

export interface ExempleFormulation {
  id: string
  texte: string
  verdict: 'trop-familier' | 'trop-froid' | 'bien-calibre'
  feedback: string
}

export const exemplesFormulationsSensibles: ExempleFormulation[] = [
  { id: 'f1', texte: "Salut, du coup vous avez pas encore répondu ? Ça devient urgent là 😅", verdict: 'trop-familier', feedback: "Le ton est trop décontracté pour un échange professionnel avec un partenaire externe." },
  { id: 'f2', texte: "Je me permets de revenir vers vous concernant le devis transmis le [date], resté sans réponse à ce jour. Pourriez-vous m'indiquer un délai de retour ?", verdict: 'bien-calibre', feedback: "Formulation claire, factuelle et professionnelle, sans agressivité." },
  { id: 'f3', texte: "Votre absence de réponse pose un vrai problème pour notre planning. J'ai besoin d'un retour immédiat.", verdict: 'trop-froid', feedback: "Le ton est sec et met la pression sans laisser de place au dialogue — risque de braquer l'interlocuteur." },
  { id: 'f4', texte: "Hello, juste pour dire qu'il y a une erreur dans le fichier envoyé hier, à voir quand vous avez 2 min", verdict: 'trop-familier', feedback: "Une erreur transmise à un client mérite une formulation plus posée et un canal plus direct que ce ton informel." },
  { id: 'f5', texte: "Je souhaite vous informer d'une erreur dans le document transmis hier. Je vous propose de vous appeler dans les prochaines minutes pour la corriger avec vous.", verdict: 'bien-calibre', feedback: "Le ton est responsable, orienté solution, et propose le bon canal pour une erreur sensible." },
  { id: 'f6', texte: "Il y a eu une erreur. Ce n'est pas de mon fait, le fichier initial était déjà incorrect.", verdict: 'trop-froid', feedback: "Se justifier avant de corriger l'erreur donne une impression défensive plutôt que responsable." },
]

// ═══ Mission 2 — Conduite de réunion efficace ═══════════════════════════════

export interface ContexteReunion {
  id: string
  intituleFlou: string
  participantsProposes: string[]
  dureeProposee: number
  enjeu: string
}

export const contextesReunion: ContexteReunion[] = [
  {
    id: 'reunion-lancement',
    intituleFlou: "Point sur le projet",
    participantsProposes: ['Chef de projet', 'Deux membres de l\'équipe', 'Un représentant client', 'Le manager de service (non impliqué au quotidien)'],
    dureeProposee: 60,
    enjeu: "Lancer un nouveau projet avec une équipe qui ne s'est jamais réunie.",
  },
  {
    id: 'reunion-arbitrage',
    intituleFlou: "Discussion budget",
    participantsProposes: ['Responsable financier', 'Porteur du projet', 'Deux collaborateurs concernés', 'La direction (à informer seulement)'],
    dureeProposee: 45,
    enjeu: "Arbitrer une répartition budgétaire contestée entre deux équipes.",
  },
  {
    id: 'reunion-suivi',
    intituleFlou: "Réunion d'équipe hebdo",
    participantsProposes: ['Toute l\'équipe (8 personnes)', 'Le manager', 'Un stagiaire non concerné par le sujet du jour'],
    dureeProposee: 90,
    enjeu: "Faire le point hebdomadaire sans que la réunion ne s'éternise ni ne parte dans tous les sens.",
  },
]

export interface ExempleOrdreDuJour {
  id: string
  contenu: string
  verdict: 'incomplet' | 'trop-charge' | 'bien-construit'
  feedback: string
}

export const exemplesOrdresDuJour: ExempleOrdreDuJour[] = [
  { id: 'o1', contenu: "Ordre du jour : discuter du projet.", verdict: 'incomplet', feedback: "Aucun objectif précis, aucune durée, aucun point à traiter : les participants ne peuvent pas se préparer." },
  { id: 'o2', contenu: "Objectif : valider le planning des 3 prochaines semaines. Points : 1) État d'avancement (10 min) 2) Blocages identifiés (15 min) 3) Décisions à prendre sur le planning (20 min) 4) Répartition des actions (10 min). Durée totale : 55 min.", verdict: 'bien-construit', feedback: "Objectif clair, points chronométrés, décisions attendues explicites : les participants savent pourquoi ils viennent." },
  { id: 'o3', contenu: "Ordre du jour : budget, recrutement, planning, satisfaction client, nouveaux outils, organisation des locaux, points RH divers.", verdict: 'trop-charge', feedback: "Trop de sujets sans lien ni priorité pour le temps disponible : la réunion risque de ne rien trancher." },
]

export const CHAMPS_ORDRE_DU_JOUR = [
  { cle: 'objectif', label: 'Objectif de la réunion', placeholder: 'Ex. décider de X, aligner l\'équipe sur Y…' },
  { cle: 'participants', label: 'Participants utiles (et pourquoi)', placeholder: 'Ex. le chef de projet car il valide les priorités…' },
  { cle: 'duree', label: 'Durée prévue', placeholder: 'Ex. 45 minutes' },
  { cle: 'points', label: 'Points à traiter (avec temps estimé)', placeholder: 'Ex. 1) État d\'avancement (10 min)…' },
  { cle: 'decisions', label: 'Décisions attendues en sortie de réunion', placeholder: 'Ex. valider le planning, trancher entre deux options…' },
  { cle: 'roles', label: 'Répartition des rôles (animateur, prise de notes, gardien du temps)', placeholder: 'Ex. animateur : vous ; notes : …' },
  { cle: 'suivi', label: 'Suivi des actions après la réunion', placeholder: 'Ex. compte-rendu envoyé sous 24h avec les actions et échéances' },
] as const

// ═══ Mission 3 — Mission immersive "48h pour reprendre le contrôle" ═════════

export interface ContexteImmersif {
  id: string
  client: string
  equipe: string
  objectif: string
}

export const contextesImmersifs: ContexteImmersif[] = [
  {
    id: 'ctx-strategie',
    client: "un client stratégique du secteur retail",
    equipe: "une équipe de 3 personnes",
    objectif: "finaliser et présenter une recommandation stratégique",
  },
  {
    id: 'ctx-lancement',
    client: "un client dans le lancement d'un nouveau produit",
    equipe: "une équipe de 4 personnes",
    objectif: "livrer un plan de lancement complet et convaincant",
  },
  {
    id: 'ctx-crise',
    client: "un client confronté à une baisse d'activité inattendue",
    equipe: "une équipe de 3 personnes",
    objectif: "proposer un plan d'action correctif chiffré",
  },
]

export interface AlerteImmersive {
  id: string
  type: 'pression' | 'priorites' | 'communication' | 'reunion' | 'erreur' | 'demande-floue' | 'imprevu-collectif'
  label: string
  description: string
  decisionAttendue: string
}

export const alertesImmersives: AlerteImmersive[] = [
  {
    id: 'a-pression',
    type: 'pression',
    label: 'Pression immédiate',
    description: "Le client demande un point d'avancement dans l'heure, alors que rien n'est encore présentable.",
    decisionAttendue: "Que répondez-vous au client dans l'immédiat, et comment réorganisez-vous les 60 prochaines minutes de l'équipe ?",
  },
  {
    id: 'a-priorites',
    type: 'priorites',
    label: 'Priorités multiples',
    description: "Deux tâches critiques arrivent en même temps et un seul membre de l'équipe peut les traiter.",
    decisionAttendue: "Laquelle traitez-vous en premier, et comment justifiez-vous ce choix auprès de l'équipe ?",
  },
  {
    id: 'a-communication',
    type: 'communication',
    label: 'Communication sensible',
    description: "Un membre de l'équipe devient indisponible en pleine mission, sans prévenir à l'avance.",
    decisionAttendue: "Quel message envoyez-vous, à qui, et sur quel canal, pour gérer cette absence sans casser la dynamique ?",
  },
  {
    id: 'a-reunion',
    type: 'reunion',
    label: 'Réunion mal cadrée',
    description: "Une réunion improvisée avec le client tourne au flou : personne ne sait qui décide quoi.",
    decisionAttendue: "Comment recadrez-vous cette réunion en direct pour qu'elle reparte sur des bases claires ?",
  },
  {
    id: 'a-erreur',
    type: 'erreur',
    label: 'Erreur ou oubli',
    description: "Vous découvrez qu'un chiffre transmis plus tôt au client était incorrect.",
    decisionAttendue: "Comment et quand corrigez-vous cette erreur auprès du client ?",
  },
  {
    id: 'a-demande-floue',
    type: 'demande-floue',
    label: 'Demande floue',
    description: "Le client formule une nouvelle demande, mais son message reste ambigu sur ce qu'il attend vraiment.",
    decisionAttendue: "Quelles questions posez-vous pour clarifier cette demande avant de vous engager sur un livrable ?",
  },
  {
    id: 'a-imprevu',
    type: 'imprevu-collectif',
    label: 'Imprévu collectif',
    description: "Une tension émerge entre deux membres de l'équipe sur la direction à prendre, en pleine mission.",
    decisionAttendue: "Comment intervenez-vous pour désamorcer la tension et remettre l'équipe en mouvement ?",
  },
]

export function tirerAlertesAleatoires(nombre = 3): AlerteImmersive[] {
  const shuffled = [...alertesImmersives].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, nombre)
}

export const CHAMPS_NOTE_SYNTHESE = [
  { cle: 'diagnostic', label: 'Diagnostic de la situation', placeholder: "Qu'est-ce qui s'est passé pendant ces 48h ?" },
  { cle: 'posture', label: 'Posture professionnelle attendue', placeholder: "Quelle posture avez-vous adoptée face aux imprévus ?" },
  { cle: 'priorites', label: 'Priorités retenues', placeholder: "Qu'avez-vous choisi de traiter en premier, et pourquoi ?" },
  { cle: 'decisions', label: 'Décisions prises', placeholder: "Quelles décisions concrètes avez-vous prises en équipe ?" },
  { cle: 'message', label: 'Message professionnel sensible', placeholder: "Résumez le message sensible rédigé pendant la mission." },
  { cle: 'reunion', label: 'Réunion efficace à organiser', placeholder: "Quel ordre du jour proposeriez-vous pour la suite ?" },
  { cle: 'plan', label: "Plan d'action final", placeholder: "Quelles sont les prochaines étapes concrètes ?" },
  { cle: 'reflexif', label: 'Retour réflexif', placeholder: "Qu'avez-vous appris sur vous-même en tant qu'équipe ?" },
] as const

// ═══ Mission 1 — Se vendre sans se survendre (remplace « Communication professionnelle sensible ») ═══
// Textes repris à l'identique de fiche-mission-b3-m1-se-vendre-v2.docx.
// Les contenus de l'ancienne Mission 1 ci-dessus sont conservés mais ne sont plus routés.

export interface ProfilCommercial { id: string; nom: string; description: string }
export interface QualiteATransformer { qualite: string; exemple: string }
export interface PhraseAClasser { texte: string; categorie: 'vague' | 'pretentieux' | 'credible' }
export interface AmorcePitch { id: string; amorce: string }
export interface CiblePitch { id: 'recruteur' | 'manager' | 'client'; label: string; question: string }
export interface FeedbackMission { type: 'success' | 'alert' | 'neutral'; message: string }
export interface MetaMission { ilo: string[]; dureeMinutes: [number, number]; niveau: 'B3' }
export type Verdict = 'vague' | 'pretentieux' | 'credible'

export const mission1SeVendre = {
  meta: { ilo: ['C13', 'C7'], dureeMinutes: [25, 35], niveau: 'B3' } as MetaMission,
  titre: '🎯 Se vendre sans se survendre',
  promesse: 'Clarifie ta posture commerciale et construis un pitch crédible',

  profils: [
    { id: 'chasseur', nom: 'Le chasseur', description: "J'aime aller chercher les opportunités, provoquer le contact et prospecter." },
    { id: 'conseiller', nom: 'Le conseiller', description: "J'aime comprendre le besoin, accompagner et rassurer l'interlocuteur." },
    { id: 'negociateur', nom: 'Le négociateur', description: "J'aime argumenter, convaincre et trouver un accord." },
    { id: 'relationnel', nom: 'Le relationnel', description: 'Je crée facilement du lien et je mets les interlocuteurs à l\'aise.' },
    { id: 'structure', nom: 'Le structuré', description: "J'aime organiser, suivre mes actions et sécuriser les étapes." },
    { id: 'challengeur', nom: 'Le challengeur', description: "J'aime les objectifs, la performance et le dépassement." },
  ] satisfies ProfilCommercial[],
  profilsMaxMessage: '2 profils maximum : garde ceux qui te ressemblent le plus.',
  profilsFeedback: { type: 'success', message: "Ton style commercial peut devenir un vrai point d'appui si tu sais l'illustrer par une situation concrète." } satisfies FeedbackMission,
  profilsRelance: 'Quelle situation vécue prouve ce style commercial ?',
  profilsMessageCle: "Attention : un profil commercial n'est pas une étiquette. L'objectif est d'identifier ce que tu peux valoriser et ce que tu dois encore développer.",

  qualites: [
    { qualite: 'motivé', exemple: "Je peux apporter de l'énergie dans la prospection et de la régularité dans les relances." },
    { qualite: 'sociable', exemple: "Je sais créer un premier contact facilement et mettre un interlocuteur à l'aise." },
    { qualite: 'organisé', exemple: 'Je peux suivre mes actions commerciales avec méthode et respecter les relances prévues.' },
    { qualite: 'persévérant', exemple: '' },
    { qualite: 'dynamique', exemple: "Je peux contribuer à maintenir une bonne énergie dans l'équipe et à avancer vers les objectifs." },
    { qualite: "à l'écoute", exemple: '' },
    { qualite: 'ambitieux', exemple: '' },
    { qualite: 'rigoureux', exemple: '' },
    { qualite: 'adaptable', exemple: '' },
    { qualite: 'convaincant', exemple: 'Je sais argumenter, mais je veux encore progresser dans le traitement des objections.' },
  ] satisfies QualiteATransformer[],
  qualiteAmorce: 'Cette qualité peut se traduire professionnellement par…',
  feedbacksFormulation: {
    vague: { type: 'alert', message: "C'est encore trop général. Ajoute une action concrète ou une situation commerciale." },
    pretentieux: { type: 'alert', message: 'La formulation est ambitieuse, mais elle doit rester crédible. Reformule avec nuance.' },
    credible: { type: 'success', message: 'Bonne formulation : tu relies une qualité à une contribution professionnelle concrète.' },
  } satisfies Record<Verdict, FeedbackMission>,

  phrases: [
    { texte: 'Je suis motivé.', categorie: 'vague' },
    { texte: 'Je suis un excellent commercial.', categorie: 'pretentieux' },
    { texte: "J'aime le contact client et je souhaite progresser dans la prospection.", categorie: 'credible' },
    { texte: "Je peux vendre n'importe quoi.", categorie: 'pretentieux' },
    { texte: 'Je suis organisé.', categorie: 'vague' },
    { texte: 'Je sais suivre mes actions commerciales et respecter un plan de relance.', categorie: 'credible' },
    { texte: 'Je suis fait pour le commerce.', categorie: 'vague' },
    { texte: 'Je suis meilleur que les autres.', categorie: 'pretentieux' },
    { texte: "J'aime les objectifs et les situations où il faut créer une relation de confiance.", categorie: 'credible' },
  ] satisfies PhraseAClasser[],
  categoriesLabels: { vague: 'Trop vague', pretentieux: 'Trop prétentieux', credible: 'Crédible' } satisfies Record<Verdict, string>,
  phrasesSynthese: "Se vendre professionnellement, ce n'est pas se surestimer. C'est être capable d'expliquer ce qu'on apporte avec des mots concrets, crédibles et adaptés.",

  amorcesPitch: [
    { id: 'presentation', amorce: 'Je suis étudiant en B3, orienté commerce / négociation.' },
    { id: 'profil', amorce: 'Mon profil commercial est plutôt…' },
    { id: 'apport', amorce: 'Je peux apporter…' },
    { id: 'progression', amorce: 'Je souhaite progresser sur…' },
    { id: 'alternance', amorce: 'Je recherche une alternance où je pourrai…' },
  ] satisfies AmorcePitch[],
  ciblesPitch: [
    { id: 'recruteur', label: 'Recruteur', question: "Qu'est-ce qui prouve, en une phrase, que ton profil correspond au poste ?" },
    { id: 'manager', label: 'Manager', question: "Qu'est-ce que tu peux apporter concrètement à l'équipe dès le premier mois ?" },
    { id: 'client', label: 'Client', question: 'Comment montres-tu que tu as compris son besoin avant de parler de toi ?' },
  ] satisfies CiblePitch[],
  pitchMotsCible: [90, 120] as [number, number],
  pitchTropCourt: 'Un peu court : ajoute une compétence ou une situation concrète.',
  pitchTropLong: "Trop long pour 45 s : coupe ce qui n'apporte pas de valeur.",
  feedbacksPitch: {
    manqueCompetence: { type: 'alert', message: 'Ton pitch est clair, mais il manque une compétence commerciale concrète.' },
    tropGeneral: { type: 'alert', message: "Ton pitch est trop général. Ajoute le type de mission ou d'environnement que tu recherches." },
    credible: { type: 'success', message: 'Ton pitch est crédible : tu expliques ce que tu apportes et ce que tu veux développer.' },
  } satisfies Record<string, FeedbackMission>,
  rappelMode2: 'Présente ton pitch à ton intervenante.',

  competences: [
    'prospection', 'relance', 'écoute active', 'argumentation', 'négociation', 'traitement des objections',
    'prise de parole', 'suivi client', 'organisation commerciale', "utilisation d'un CRM",
    'gestion du stress en rendez-vous', 'closing', 'fidélisation', 'posture professionnelle',
  ] satisfies string[],
  competencesQuestion: 'Quelle compétence commerciale veux-tu renforcer cette année, et pourquoi ?',
  axeChamps: [
    { cle: 'progresser', label: 'Cette année, je veux progresser sur…' },
    { cle: 'pourquoi', label: 'Parce que…' },
    { cle: 'action', label: 'Ma première action sera…' },
  ] as const,

  messageFin: 'Présente ta fiche à ton intervenante. Rappel de l\'évaluation : 50 % note orale individuelle + 50 % note groupe écrite.',
}

// ─── Heuristiques de feedback (côté client, aucune IA) ──────────────────────
// Première version, à ajuster après la première séance. Les textes sont comparés
// après normalisation : minuscules, accents retirés, apostrophes unifiées.

// Marqueurs de survente → verdict « prétentieux » (prioritaire sur les autres).
export const MARQUEURS_SURVENTE = [
  'excellent', 'le meilleur', 'la meilleure', 'meilleur que', 'meilleure que',
  "n'importe quoi", "n'importe qui", 'parfait', 'parfaitement', 'imbattable',
  'expert', 'le plus', 'toujours reussi', 'jamais echoue', 'aucun defaut',
]

// Racines d'actions commerciales : leur absence rend une formulation « vague ».
// Recherche par sous-chaîne, donc « prospect » couvre prospecter, prospection, prospects…
export const RACINES_ACTION_COMMERCIALE = [
  'prospect', 'relanc', 'argument', 'negoci', 'conseil', 'accompagn', 'ecout',
  'suivi', 'suivre', 'organis', 'fideli', 'convain', 'objection', 'client', 'contact',
  'rendez-vous', 'rdv', 'crm', 'objectif', 'vente', 'vendre', 'closing', 'besoin', 'equipe',
]

// Sous ce nombre de mots, une formulation est jugée « vague ».
export const MOTS_MIN_FORMULATION = 8

export function normaliserTexte(texte: string): string {
  return texte
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’‘`´]/g, "'")
}

export function compterMots(texte: string): number {
  return texte.trim().split(/\s+/).filter(Boolean).length
}

export function contientSurvente(texte: string): boolean {
  const t = normaliserTexte(texte)
  return MARQUEURS_SURVENTE.some(m => t.includes(m))
}

// Ordre des règles : prétentieux → vague (moins de 8 mots OU aucune action commerciale) → crédible.
export function evaluerFormulation(texte: string): Verdict {
  if (contientSurvente(texte)) return 'pretentieux'
  const t = normaliserTexte(texte)
  if (compterMots(texte) < MOTS_MIN_FORMULATION) return 'vague'
  if (!RACINES_ACTION_COMMERCIALE.some(r => t.includes(r))) return 'vague'
  return 'credible'
}

// Mélange de Fisher-Yates : ordre aléatoire différent à chaque séance (évite la mémorisation d'un groupe à l'autre).
export function melanger<T>(liste: T[]): T[] {
  const copie = [...liste]
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copie[i], copie[j]] = [copie[j], copie[i]]
  }
  return copie
}
