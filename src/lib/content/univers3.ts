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

// ═══════════════════════════════════════════════════════════════════════════
// Spécialisations B3 — configuration unique (CLAUDE.md, section 3.4)
// ═══════════════════════════════════════════════════════════════════════════
// Le routeur (MissionShell.tsx), le compteur de l'admin et les titres affichés lisent
// cette configuration. Pour ajouter Finance au T2 : remplir `missions`, passer `actif`
// à true, puis enregistrer ses composants dans MissionShell.tsx.

export type SpecialisationB3Id = 'negociation' | 'marketing-digital' | 'finance'

export interface MissionParcoursB3 {
  numero: number
  titre: string
  thematique: string
  statut: 'disponible' | 'a-venir'
}

export interface SpecialisationB3 {
  id: SpecialisationB3Id
  label: string
  actif: boolean
  // Valeurs du champ `specialization` des groupes (Supabase) qui ouvrent ce parcours.
  codesGroupe: string[]
  missions: MissionParcoursB3[]
}

export const B3_SPECIALISATIONS: SpecialisationB3[] = [
  {
    // Configuration de production, inchangée : 6 missions.
    id: 'negociation',
    label: 'Négociation',
    actif: true,
    codesGroupe: ['negociation'],
    missions: [
      { numero: 1, titre: 'Se vendre sans se survendre', thematique: 'Positionnement commercial', statut: 'disponible' },
      { numero: 2, titre: 'Conduite de réunion efficace', thematique: 'Réunion', statut: 'disponible' },
      { numero: 3, titre: '48h pour reprendre le contrôle', thematique: 'Mission immersive', statut: 'disponible' },
      { numero: 4, titre: 'Mission à venir', thematique: 'À définir', statut: 'a-venir' },
      { numero: 5, titre: 'Mission à venir', thematique: 'À définir', statut: 'a-venir' },
      { numero: 6, titre: 'Mission à venir', thematique: 'À définir', statut: 'a-venir' },
    ],
  },
  {
    // 5 missions exactement. Missions 3 à 5 : contenus décidés plus tard par Stéphanie.
    id: 'marketing-digital',
    label: 'Marketing Digital',
    actif: true,
    codesGroupe: ['marketing', 'marketing-digital'],
    missions: [
      { numero: 1, titre: 'Trouver sa signature digitale', thematique: 'Positionnement professionnel et culture marketing digital', statut: 'disponible' },
      // M2 (2026-11-24) : remplace « Communication professionnelle », thématique supprimée du parcours.
      { numero: 2, titre: 'Marketing Under Pressure', thematique: 'Garder le contrôle sous pression — business game STRYDE', statut: 'disponible' },
      { numero: 3, titre: 'Organisation et priorisation', thematique: 'Gestion des tâches, priorités, charge de travail, délais', statut: 'a-venir' },
      { numero: 4, titre: 'Animation et efficacité collective', thematique: "Réunion, collaboration, suivi d'actions, coordination projet", statut: 'a-venir' },
      { numero: 5, titre: 'Mission immersive de synthèse', thematique: 'Mise en situation professionnelle globale', statut: 'a-venir' },
    ],
  },
  {
    // Prévue au T2 : entrée inactive, sans contenu. Les groupes Finance ouvrent le repli.
    id: 'finance',
    label: 'Finance',
    actif: false,
    codesGroupe: ['finance'],
    missions: [],
  },
]

const SPECIALISATION_B3_REPLI: SpecialisationB3Id = 'negociation'

// Repli sûr : un groupe B3 sans spécialisation reconnue (ou dont le parcours est inactif)
// ouvre le parcours Négociation, comme en production. Aucune erreur bloquante.
export function specialisationB3(codeGroupe?: string | null): SpecialisationB3 {
  const trouvee = B3_SPECIALISATIONS.find(s => s.actif && codeGroupe != null && s.codesGroupe.includes(codeGroupe))
  if (trouvee) return trouvee
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`[B3] Spécialisation « ${codeGroupe ?? 'absente'} » non reconnue ou inactive : repli sur le parcours Négociation.`)
  }
  return B3_SPECIALISATIONS.find(s => s.id === SPECIALISATION_B3_REPLI)!
}

// ═══════════════════════════════════════════════════════════════════════════
// B3 Marketing Digital — Mission 1 « Trouver sa signature digitale »
// ═══════════════════════════════════════════════════════════════════════════
// Textes repris à l'identique de fiche-mission-b3-marketing-digital-signature-v2.docx.
// Les contenus rédigés par Claude Code sont signalés « À VALIDER PAR STÉPHANIE ».

export type ProfilDigitalId = 'creatif' | 'stratege' | 'analyste' | 'pilote' | 'explorateur' | 'activateur'
export interface ProfilDigital { id: ProfilDigitalId; nom: string; traduction: string }
export interface QuestionQuizDigital { id: number; question: string; reponses: { texte: string; profils: ProfilDigitalId[] }[] }
export interface FicheProfilDigital {
  profilId: ProfilDigitalId
  traduction: string
  forces: [string, string, string]
  vigilance: string
  phrase: string
  questionReflexion: string
}
export interface PhraseVague { texte: string; exemple: string }
export interface CarteFeedbackPairs { id: string; label: string; signification: string }
export type VerdictDigital = 'vague' | 'pretentieux' | 'long' | 'clair'
export type ActionCoach = 'profil' | 'formulation' | 'pitch-tester' | 'pitch-clair' | 'pitch-metier' | 'pitch-reduire'
export interface ReponseCoach { verdict?: VerdictDigital; message: string; question?: string }

export const mission1SignatureDigitale = {
  // ILO : hypothèse reprise de Négociation — À VALIDER PAR STÉPHANIE.
  meta: { ilo: ['C13', 'C7'], duree: '3h', niveau: 'B3', specialisation: 'marketing-digital' } as const,
  titre: '🎯 Trouver sa signature digitale',
  // Promesse proposée — À VALIDER PAR STÉPHANIE.
  promesse: 'Clarifie ton profil marketing digital et construis un pitch crédible',

  microTextes: {
    lancement: 'Mission lancée. Ton objectif : clarifier ta signature digitale.',
    apresProfil: "Un bon profil marketing digital ne dit pas seulement « j'aime les réseaux sociaux ». Il sait expliquer ce qu'il peut apporter.",
    apresForces: "Se positionner, ce n'est pas se survendre. C'est être clair, crédible et concret.",
    pitch: "Ton pitch doit donner envie d'en savoir plus, pas raconter tout ton parcours.",
    transversal: 'En marketing digital, une idée doit toujours être reliée à une cible, un canal et un objectif.',
  },
  // Invitation à ne saisir aucune donnée identifiante (CLAUDE.md, section 4) — À VALIDER PAR STÉPHANIE.
  rappelConfidentialite: "N'indique aucun nom de personne ou d'entreprise réelle.",

  // ── Étape 1 — Quiz ──
  profils: [
    { id: 'creatif', nom: 'Le créatif de contenu', traduction: 'idées, formats, storytelling, production de contenus.' },
    { id: 'stratege', nom: 'Le stratège de marque', traduction: 'image, positionnement, cohérence éditoriale, message.' },
    { id: 'analyste', nom: "L'analyste digital", traduction: 'données, KPI, reporting, performance, optimisation.' },
    { id: 'pilote', nom: 'Le pilote de projet digital', traduction: 'coordonner, planifier, suivre des actions.' },
    { id: 'explorateur', nom: "L'explorateur de tendances", traduction: 'veille sur les usages, plateformes, formats et innovations.' },
    { id: 'activateur', nom: "L'activateur de communauté", traduction: 'réseaux sociaux, engagement, interaction, animation.' },
  ] satisfies ProfilDigital[],
  consigneQuiz: "Répondez spontanément. Il n'y a pas de bon ou de mauvais profil. L'objectif est d'identifier votre style professionnel dans le marketing digital et ce que vous pouvez en faire concrètement.",

  // Questions 1 à 10 : fiche mission. Questions 11 à 15 : rédigées par Claude Code — À VALIDER PAR STÉPHANIE.
  // Matrice de scoring (toutes questions) : rédigée par Claude Code — À VALIDER PAR STÉPHANIE.
  // Chaque réponse donne 1 point à chacun de ses profils. La matrice est équilibrée :
  // sur les 15 questions, chaque profil peut recevoir 11 points au maximum.
  questions: [
    { id: 1, question: 'Dans un projet digital, tu es plutôt celui/celle qui…', reponses: [
      { texte: 'propose des idées de contenus', profils: ['creatif'] },
      { texte: 'structure le planning', profils: ['pilote'] },
      { texte: 'analyse les résultats', profils: ['analyste'] },
      { texte: 'anime les échanges', profils: ['activateur'] },
    ] },
    { id: 2, question: "Ce qui t'intéresse le plus dans le marketing digital, c'est…", reponses: [
      { texte: 'créer des formats', profils: ['creatif'] },
      { texte: 'comprendre une cible', profils: ['stratege'] },
      { texte: 'mesurer la performance', profils: ['analyste'] },
      { texte: 'suivre les tendances', profils: ['explorateur'] },
    ] },
    { id: 3, question: "Face à une campagne digitale, tu regardes d'abord…", reponses: [
      { texte: 'le message', profils: ['stratege'] },
      { texte: 'le visuel', profils: ['creatif'] },
      { texte: 'les résultats', profils: ['analyste'] },
      { texte: 'le parcours utilisateur', profils: ['explorateur', 'stratege'] },
    ] },
    { id: 4, question: 'Dans un groupe, on peut compter sur toi pour…', reponses: [
      { texte: 'apporter des idées', profils: ['creatif'] },
      { texte: 'organiser les étapes', profils: ['pilote'] },
      { texte: 'vérifier les données', profils: ['analyste'] },
      { texte: 'créer du lien', profils: ['activateur'] },
    ] },
    { id: 5, question: 'Sur les réseaux sociaux, tu fais surtout attention à…', reponses: [
      { texte: 'la créativité', profils: ['creatif'] },
      { texte: 'la cohérence de marque', profils: ['stratege'] },
      { texte: "l'engagement", profils: ['activateur'] },
      { texte: 'les tendances', profils: ['explorateur'] },
    ] },
    { id: 6, question: 'Quand un contenu ne fonctionne pas, tu veux comprendre…', reponses: [
      { texte: "si l'idée était assez forte", profils: ['creatif'] },
      { texte: 'si la cible était claire', profils: ['stratege'] },
      { texte: 'ce que disent les chiffres', profils: ['analyste'] },
      { texte: 'comment améliorer le format', profils: ['explorateur', 'analyste'] },
    ] },
    { id: 7, question: 'Ton point fort naturel est plutôt…', reponses: [
      { texte: "l'imagination", profils: ['creatif'] },
      { texte: "l'organisation", profils: ['pilote'] },
      { texte: "l'analyse", profils: ['analyste'] },
      { texte: 'la communication', profils: ['activateur'] },
    ] },
    { id: 8, question: 'Dans une équipe marketing, tu aimerais contribuer à…', reponses: [
      { texte: 'créer des contenus', profils: ['creatif'] },
      { texte: 'piloter un projet', profils: ['pilote'] },
      { texte: 'analyser une campagne', profils: ['analyste'] },
      { texte: 'animer une communauté', profils: ['activateur'] },
    ] },
    { id: 9, question: "Ce qui te motive le plus, c'est…", reponses: [
      { texte: 'créer quelque chose', profils: ['creatif'] },
      { texte: 'voir un projet avancer', profils: ['pilote'] },
      { texte: 'comprendre ce qui fonctionne', profils: ['analyste'] },
      { texte: 'engager une audience', profils: ['activateur'] },
    ] },
    // Question 10 : chaque axe de progression pointe vers les profils qui en ont le plus souvent besoin.
    { id: 10, question: 'Ton axe de progression pourrait être…', reponses: [
      { texte: 'structurer tes idées', profils: ['creatif', 'explorateur'] },
      { texte: 'oser davantage', profils: ['analyste', 'pilote'] },
      { texte: 'mieux analyser les données', profils: ['activateur', 'stratege'] },
      { texte: 'mieux prioriser', profils: ['explorateur'] },
    ] },
    { id: 11, question: 'Une marque se lance sur une nouvelle plateforme. Ton premier réflexe…', reponses: [
      { texte: 'définir le ton et le message de la marque', profils: ['stratege'] },
      { texte: 'observer les formats qui y fonctionnent déjà', profils: ['explorateur'] },
      { texte: 'poser un rétroplanning avec les étapes clés', profils: ['pilote'] },
      { texte: 'repérer les communautés à qui parler', profils: ['activateur'] },
    ] },
    { id: 12, question: "Dans un brief, tu lis d'abord…", reponses: [
      { texte: 'le positionnement de la marque', profils: ['stratege'] },
      { texte: 'les délais et les livrables', profils: ['pilote'] },
      { texte: 'les objectifs chiffrés (KPI)', profils: ['analyste'] },
      { texte: 'les références et exemples du moment', profils: ['explorateur'] },
    ] },
    { id: 13, question: 'Un commentaire négatif arrive sous une publication. Tu…', reponses: [
      { texte: 'réponds vite, avec le bon ton', profils: ['activateur'] },
      { texte: "vérifies que la réponse reste cohérente avec l'image de la marque", profils: ['stratege'] },
      { texte: "préviens l'équipe et organises qui fait quoi", profils: ['pilote'] },
      { texte: "regardes comment d'autres marques ont géré la même situation", profils: ['explorateur'] },
    ] },
    { id: 14, question: 'Ton rituel de travail préféré…', reponses: [
      { texte: 'faire ta veille et partager une découverte', profils: ['explorateur'] },
      { texte: 'mettre à jour le tableau de suivi du projet', profils: ['pilote'] },
      { texte: 'échanger avec la communauté ou les abonnés', profils: ['activateur'] },
      { texte: 'relire la ligne éditoriale avant de publier', profils: ['stratege'] },
    ] },
    { id: 15, question: "Ce qu'on retient de toi après un projet…", reponses: [
      { texte: 'tu as gardé le cap sur le message', profils: ['stratege'] },
      { texte: "tu as tenu les délais et coordonné l'équipe", profils: ['pilote'] },
      { texte: 'tu as apporté une idée de format inattendue', profils: ['creatif', 'explorateur'] },
      { texte: "tu as fait réagir et participer l'audience", profils: ['activateur'] },
    ] },
  ] satisfies QuestionQuizDigital[],

  // ── Étape 2 — Fiches profils (base affichée + repli si l'IA est indisponible) ──
  // Fiche « créatif » : fiche mission (sauf questionReflexion). Les 5 autres fiches et les
  // 6 questions de réflexion : rédigées par Claude Code — À VALIDER PAR STÉPHANIE.
  fichesProfils: [
    {
      profilId: 'creatif',
      traduction: "tu sembles à l'aise pour imaginer des idées, trouver des formats et raconter une histoire.",
      forces: ['créativité', 'storytelling', 'sens du format'],
      vigilance: "ne pas rester uniquement dans l'idée. Il faut aussi penser objectif, cible et résultat.",
      phrase: 'Je peux apporter des idées de contenus adaptées à une cible et à un objectif de communication.',
      questionReflexion: "Quelle idée de contenu as-tu déjà eue, et à quelle cible s'adressait-elle ?",
    },
    {
      profilId: 'stratege',
      traduction: "tu sembles à l'aise pour clarifier un positionnement, garder un message cohérent et penser l'image d'une marque.",
      forces: ['sens du message', 'cohérence éditoriale', 'compréhension de la cible'],
      vigilance: "ne pas rester dans la réflexion. Il faut aussi produire, tester et accepter d'ajuster.",
      phrase: "Je peux aider à garder un message cohérent avec le positionnement d'une marque et les attentes de sa cible.",
      questionReflexion: "Quelle marque trouves-tu cohérente dans sa communication, et qu'est-ce qui le montre concrètement ?",
    },
    {
      profilId: 'analyste',
      traduction: "tu sembles à l'aise pour lire des chiffres, suivre des KPI et comprendre ce qui fonctionne.",
      forces: ['lecture des données', 'rigueur', "sens de l'optimisation"],
      vigilance: "ne pas t'arrêter aux chiffres. Il faut aussi les relier à une cible, un message et une décision.",
      phrase: "Je peux suivre les résultats d'une campagne et proposer des pistes d'optimisation à partir des KPI.",
      questionReflexion: 'Quel indicateur regarderais-tu en premier pour juger un contenu, et pourquoi celui-là ?',
    },
    {
      profilId: 'pilote',
      traduction: "tu sembles à l'aise pour organiser un projet, planifier les étapes et suivre l'avancement des actions.",
      forces: ['organisation', 'coordination', 'suivi des actions'],
      vigilance: "ne pas te limiter au planning. Il faut aussi comprendre le fond : la cible, le message et l'objectif.",
      phrase: 'Je peux aider à coordonner un projet digital en suivant les étapes, les délais et les livrables.',
      questionReflexion: "Dans quel projet as-tu déjà aidé un groupe à tenir ses délais, et comment t'y es-tu pris ?",
    },
    {
      profilId: 'explorateur',
      traduction: "tu sembles à l'aise pour repérer les nouveaux usages, les plateformes et les formats qui émergent.",
      forces: ['curiosité', 'veille', 'sens des usages'],
      vigilance: "ne pas suivre une tendance pour elle-même. Il faut vérifier qu'elle sert une cible et un objectif.",
      phrase: "Je peux faire de la veille sur les formats et les usages, et proposer comment une marque peut s'en inspirer.",
      questionReflexion: 'Quelle tendance récente as-tu repérée, et pour quelle marque serait-elle pertinente ?',
    },
    {
      profilId: 'activateur',
      traduction: "tu sembles à l'aise pour créer du lien, faire réagir une audience et animer les échanges.",
      forces: ['sens du contact', "écoute de l'audience", 'animation'],
      vigilance: "ne pas confondre activité et résultat. L'engagement doit servir un objectif de la marque.",
      phrase: "Je peux contribuer à animer une communauté en adaptant le ton et les formats à l'audience.",
      questionReflexion: "Quelle communauté en ligne trouves-tu bien animée, et qu'est-ce qui donne envie d'y participer ?",
    },
  ] satisfies FicheProfilDigital[],
  nuanceChamps: [
    "Qu'est-ce qui te correspond vraiment ?",
    "Qu'est-ce qui te correspond moins ?",
    'Quelle phrase veux-tu garder, modifier ou reformuler ?',
  ],

  // ── Étape 3 — Ce que j'apporte vraiment ──
  // Seuls les 2 exemples de la fiche mission sont renseignés (aucun exemple inventé).
  phrasesVagues: [
    { texte: 'Je suis créatif.', exemple: 'Je peux proposer des idées de contenus adaptées à une cible, un message et un canal.' },
    { texte: "Je suis à l'aise avec les réseaux sociaux.", exemple: '' },
    { texte: 'Je suis organisé.', exemple: '' },
    { texte: 'Je suis curieux.', exemple: '' },
    { texte: 'Je suis dynamique.', exemple: '' },
    { texte: 'Je sais communiquer.', exemple: '' },
    { texte: 'Je connais TikTok.', exemple: 'Je peux analyser les formats qui fonctionnent sur TikTok et réfléchir à leur adaptation pour une marque.' },
    { texte: 'Je suis fait pour le marketing.', exemple: '' },
    { texte: "Je peux gérer toute la communication d'une marque.", exemple: '' },
    { texte: 'Je suis meilleur que les autres en digital.', exemple: '' },
  ] satisfies PhraseVague[],
  formulationAmorce: 'Cette qualité peut se traduire professionnellement par…',
  verdictsLabels: { vague: 'Trop vague', pretentieux: 'Trop prétentieux', long: 'Trop long', clair: 'Clair' } satisfies Record<VerdictDigital, string>,
  // Messages de référence : affichés tels quels quand l'IA est indisponible.
  feedbacksVerdict: {
    vague: { type: 'alert', message: "C'est encore trop général. Ajoute une action concrète, un canal, une cible ou un objectif." },
    pretentieux: { type: 'alert', message: 'La formulation manque de nuance. Rends-la plus crédible et plus professionnelle.' },
    long: { type: 'alert', message: 'Ton idée est intéressante, mais ton message doit être plus direct.' },
    clair: { type: 'success', message: 'Bonne formulation : tu relies une qualité à une contribution professionnelle concrète.' },
  } satisfies Record<VerdictDigital, FeedbackMission>,

  // ── Étape 4 — Pitch 45 secondes ──
  amorcesPitch: [
    { id: 'presentation', amorce: 'Je suis étudiant en B3 Marketing Digital.' },
    { id: 'profil', amorce: 'Mon profil est plutôt…' },
    { id: 'apport', amorce: 'Je peux apporter…' },
    { id: 'progression', amorce: 'Je souhaite progresser sur…' },
    { id: 'experience', amorce: 'Je recherche une expérience où je pourrai…' },
  ] satisfies AmorcePitch[],
  pitchMotsCible: [90, 120] as [number, number],
  pitchMotsParMinute: 130,
  pitchTropCourt: 'Un peu court : ajoute une contribution concrète, une cible ou un canal.',
  pitchTropLong: "Trop long pour 45 s : coupe ce qui n'apporte pas de valeur.",
  boutonsCoachPitch: [
    { action: 'pitch-tester', label: 'Tester mon pitch' },
    { action: 'pitch-clair', label: 'Rendre mon pitch plus clair' },
    { action: 'pitch-metier', label: 'Rendre mon pitch plus métier' },
    { action: 'pitch-reduire', label: 'Réduire mon pitch à 45 secondes' },
  ] satisfies { action: ActionCoach; label: string }[],

  // ── Étape 5 — Feedback entre pairs ──
  cartesFeedback: [
    { id: 'clair', label: 'Clair', signification: "j'ai compris ton positionnement" },
    { id: 'credible', label: 'Crédible', signification: 'tu ne te survends pas' },
    { id: 'metier', label: 'Métier', signification: 'on comprend ton lien avec le marketing digital' },
    { id: 'a-preciser', label: 'À préciser', signification: 'il manque un exemple, une cible, un canal ou une compétence' },
    { id: 'trop-vague', label: 'Trop vague', signification: "on pourrait dire la même chose de beaucoup d'étudiants" },
    { id: 'trop-long', label: 'Trop long', signification: "va plus vite à l'essentiel" },
  ] satisfies CarteFeedbackPairs[],
  cartesMinimum: 2,

  // ── Étape 6 — Axe de progression et fiche finale ──
  axesProgression: [
    'stratégie de contenu', 'storytelling', 'création de visuels', 'rédaction web', 'réseaux sociaux',
    'community management', 'veille digitale', 'analyse des KPI', 'reporting', 'SEO',
    'acquisition digitale', 'CRM', 'e-commerce', 'gestion de projet', 'organisation',
    'prise de parole', 'posture professionnelle', 'brief créatif', 'compréhension de la cible',
    'coordination avec une équipe',
  ] satisfies string[],
  axeChamps: [
    { cle: 'progresser', label: 'Cette année, je veux progresser sur…' },
    { cle: 'pourquoi', label: 'Parce que…' },
    { cle: 'action', label: 'Ma première action sera…' },
  ] as const,
  ficheTitre: 'Mon positionnement marketing digital',
  ficheRubriques: [
    'Mon profil digital dominant',
    'Mes 3 forces professionnelles',
    'Ce que je peux apporter à une équipe marketing / communication',
    'Mon pitch professionnel en 45 secondes',
    'Mon axe de progression cette année',
    'Le feedback que je retiens',
  ],
  messageFin: "Présente ta fiche à ton intervenante. Rappel de l'évaluation : 50 % note orale individuelle + 50 % note groupe écrite.",

  // Limite d'appels au coach IA par étudiant et par étape : au-delà, le feedback heuristique prend le relais.
  limiteAppelsCoach: 5,
}

// ─── Scoring du quiz (côté client, déterministe sauf tirage final) ──────────
// 1. Chaque réponse donne 1 point à chacun de ses profils.
// 2. Égalité en tête : on garde le profil le plus présent dans les 3 dernières réponses.
// 3. Égalité persistante : tirage au sort avec Math.random().
// `reponses[i]` = index de la réponse choisie à la question i.
export function scoresQuizDigital(reponses: number[]): Record<ProfilDigitalId, number> {
  const M = mission1SignatureDigitale
  const scores = Object.fromEntries(M.profils.map(p => [p.id, 0])) as Record<ProfilDigitalId, number>
  reponses.forEach((r, i) => {
    M.questions[i]?.reponses[r]?.profils.forEach(p => { scores[p] += 1 })
  })
  return scores
}

export function profilDominantDigital(reponses: number[]): ProfilDigitalId {
  const scores = scoresQuizDigital(reponses)
  const max = Math.max(...Object.values(scores))
  let candidats = (Object.keys(scores) as ProfilDigitalId[]).filter(p => scores[p] === max)
  if (candidats.length > 1) {
    const debut = Math.max(0, reponses.length - 3)
    const recents = scoresQuizDigital(reponses.map((r, i) => (i >= debut ? r : -1)))
    const maxRecent = Math.max(...candidats.map(p => recents[p]))
    candidats = candidats.filter(p => recents[p] === maxRecent)
  }
  return candidats[Math.floor(Math.random() * candidats.length)]
}

// ─── Heuristiques de repli (côté client, sans IA) ───────────────────────────
// Utilisées quand le coach IA est indisponible, trop lent, renvoie une réponse invalide,
// ou quand la limite d'appels est atteinte. Listes et seuils : première version rédigée
// par Claude Code — À VALIDER PAR STÉPHANIE après la première séance.
// Les textes sont comparés après normalisation (minuscules, accents retirés).

// Marqueurs de survente → verdict « trop prétentieux » (prioritaire).
export const MARQUEURS_SURVENTE_DIGITAL = [
  'toute la communication', 'toute la strategie', 'tous les reseaux', 'tous les outils', 'tous les canaux',
  'meilleur que', 'meilleure que', 'le meilleur', 'la meilleure', 'parfaitement', 'parfait', 'excellent',
  'expert', 'imbattable', 'incontournable', "n'importe quel", 'aucun defaut', 'maitrise tout', 'sans effort',
]

// Racines d'action : la formulation doit dire ce que l'étudiant FAIT.
export const RACINES_ACTION_DIGITAL = [
  'propos', 'analys', 'creer', 'creation', 'concevoir', 'concoi', 'redig', 'redaction', 'anim', 'suivre', 'suivi',
  'coordon', 'planifi', 'organis', 'mesur', 'optimis', 'adapt', 'produi', 'reper', 'identifi', 'contribu',
  'aider a', 'realis', 'publi', 'tester', 'structur', 'veille', 'imagin', 'declin', 'compar', 'constru', 'prepar',
]

// Repères métier : la formulation doit être reliée à une cible, un canal, un format ou un objectif.
export const REPERES_METIER_DIGITAL = [
  'contenu', 'cible', 'canal', 'canaux', 'format', 'audience', 'communaut', 'engagement', 'kpi', 'campagne',
  'marque', 'reseau', 'brief', 'editorial', 'tendance', 'donnee', 'reporting', 'seo', 'crm', 'newsletter',
  'publication', 'post', 'video', 'visuel', 'storytelling', 'message', 'planning', 'calendrier', 'projet',
  'objectif', 'tiktok', 'instagram', 'linkedin', 'youtube', 'site', 'e-commerce', 'acquisition', 'equipe',
]

export const MOTS_MIN_FORMULATION_DIGITAL = 8
export const MOTS_MAX_FORMULATION_DIGITAL = 40
export const MOTS_MAX_PITCH_DIGITAL = 130

export function contientSurventeDigital(texte: string): boolean {
  const t = normaliserTexte(texte)
  return MARQUEURS_SURVENTE_DIGITAL.some(m => t.includes(m))
}

export function compterReperesMetier(texte: string): number {
  const t = normaliserTexte(texte)
  return REPERES_METIER_DIGITAL.filter(r => t.includes(r)).length
}

// Ordre des règles : prétentieux → trop long → vague (trop court, sans action ou sans repère métier) → clair.
export function evaluerFormulationDigital(texte: string, motsMax = MOTS_MAX_FORMULATION_DIGITAL): VerdictDigital {
  if (contientSurventeDigital(texte)) return 'pretentieux'
  if (compterMots(texte) > motsMax) return 'long'
  const t = normaliserTexte(texte)
  if (compterMots(texte) < MOTS_MIN_FORMULATION_DIGITAL) return 'vague'
  if (!RACINES_ACTION_DIGITAL.some(r => t.includes(r))) return 'vague'
  if (compterReperesMetier(texte) === 0) return 'vague'
  return 'clair'
}

export function dureePitchSecondes(nbMots: number): number {
  return Math.round((nbMots / mission1SignatureDigitale.pitchMotsParMinute) * 60)
}

// Repli des 4 boutons de coaching du pitch : diagnostic ou question, jamais de réécriture.
// Messages rédigés par Claude Code — À VALIDER PAR STÉPHANIE.
export function coachPitchHeuristique(action: ActionCoach, pitch: string, apport: string): ReponseCoach {
  const M = mission1SignatureDigitale
  const nbMots = compterMots(pitch)
  const duree = dureePitchSecondes(nbMots)

  if (action === 'pitch-clair') {
    const phrases = pitch.split(/(?<=[.!?…])\s+/).filter(Boolean)
    const plusLongue = Math.max(0, ...phrases.map(compterMots))
    if (plusLongue > 25) return { message: `Ta phrase la plus longue fait ${plusLongue} mots. Coupe-la en deux idées.` }
    return { message: 'Tes phrases sont courtes : bon point.', question: "Qu'est-ce qu'une personne qui ne te connaît pas retiendrait en une phrase ?" }
  }
  if (action === 'pitch-metier') {
    if (compterReperesMetier(pitch) < 2) return { message: 'Ton pitch contient peu de vocabulaire métier. Ajoute une cible, un canal, un format ou un KPI.' }
    return { message: 'Tu utilises déjà du vocabulaire métier.', question: 'Chaque terme est-il relié à une action que tu peux réaliser ?' }
  }
  if (action === 'pitch-reduire') {
    if (nbMots > M.pitchMotsCible[1]) {
      return { message: `Ton pitch fait ${nbMots} mots, soit environ ${duree} secondes. Retire environ ${nbMots - M.pitchMotsCible[1]} mots, en commençant par les détails de ton parcours.` }
    }
    return { message: `Ton pitch tient déjà dans le temps (environ ${duree} secondes).`, question: "Quelle phrase pourrais-tu retirer sans perdre l'essentiel ?" }
  }
  // pitch-tester : mêmes verdicts que les formulations.
  let verdict: VerdictDigital = 'clair'
  if (contientSurventeDigital(pitch)) verdict = 'pretentieux'
  else if (nbMots > MOTS_MAX_PITCH_DIGITAL) verdict = 'long'
  else if (evaluerFormulationDigital(apport, MOTS_MAX_PITCH_DIGITAL) === 'vague') verdict = 'vague'
  return { verdict, message: M.feedbacksVerdict[verdict].message }
}
